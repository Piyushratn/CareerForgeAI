"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { callOpenRouter } from "@/lib/openrouter";

// 🔹 Generate Cover Letter
export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
Write a professional cover letter for a ${data.jobTitle} position at ${data.companyName}.

About the candidate:
- Industry: ${user.industry}
- Years of Experience: ${user.experience}
- Skills: ${user.skills?.join(", ")}
- Professional Background: ${user.bio}

Job Description:
${data.jobDescription}

Requirements:
1. Professional and enthusiastic tone
2. Highlight relevant skills and experience
3. Show understanding of company needs
4. Max 400 words
5. Proper business letter formatting in markdown
6. Include measurable achievements
7. Relate background to job requirements

Return ONLY the formatted letter in markdown.
`;

  try {
    const result = await callOpenRouter(prompt);
    const content = result?.trim();

    if (!content) throw new Error("AI returned empty response");

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Cover letter generation failed:", error);
    throw new Error("Failed to generate cover letter");
  }
}

// 🔹 Get All Cover Letters
export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return db.coverLetter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

// 🔹 Get Single Cover Letter
export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return db.coverLetter.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
}

// 🔹 Delete Cover Letter
export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return db.coverLetter.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });
}