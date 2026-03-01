"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/* =======================================================
   OPENROUTER CONFIG
======================================================= */
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

async function callOpenRouter(prompt) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini", // You can change model if needed
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error("OpenRouter API request failed");
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/* =======================================================
   GENERATE QUIZ
======================================================= */
export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
Generate 10 technical interview questions for a ${
    user.industry
  } professional${
    user.skills?.length
      ? ` with expertise in ${user.skills.join(", ")}`
      : ""
  }.

Each question must be multiple choice with exactly 4 options.

Return ONLY valid JSON in this format:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}
`;

  try {
    const text = await callOpenRouter(prompt);

    // Clean markdown wrapping if model adds ```json
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return parsed.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

/* =======================================================
   SAVE QUIZ RESULT
======================================================= */
export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"
Correct Answer: "${q.answer}"
User Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
The user got the following ${user.industry} interview questions wrong:

${wrongQuestionsText}

Provide a concise improvement tip (max 2 sentences).
Be encouraging.
Focus on what to study or practice.
Do not mention the mistakes directly.
`;

    try {
      improvementTip = await callOpenRouter(improvementPrompt);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

/* =======================================================
   GET ASSESSMENTS
======================================================= */
export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    return await db.assessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}