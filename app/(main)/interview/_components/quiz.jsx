"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { generateQuiz, saveQuizResult } from "@/actions/interview";
import QuizResult from "./quiz-result";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fn: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  /* ✅ Prepare answers safely */
  useEffect(() => {
    if (Array.isArray(quizData) && quizData.length > 0) {
      setAnswers(new Array(quizData.length).fill(null));
      setCurrentQuestion(0);
    }
  }, [quizData]);

  const handleAnswer = (answer) => {
    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestion] = answer;
      return updated;
    });
  };

  const calculateScore = () => {
    if (!Array.isArray(quizData) || quizData.length === 0) return 0;

    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index]?.correctAnswer) {
        correct++;
      }
    });

    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    if (!Array.isArray(quizData) || quizData.length === 0) return;

    const score = calculateScore();

    try {
      await saveQuizResultFn(quizData, answers, score);
      toast.success("Quiz completed!");
    } catch (error) {
      toast.error(error?.message || "Failed to save quiz results");
    }
  };

  const handleNext = () => {
    if (!Array.isArray(quizData)) return;

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplanation(false);
    setResultData(null);
    generateQuizFn();
  };

  /* 🔄 Loading */
  if (generatingQuiz) {
    return <BarLoader className="mt-4" width="100%" color="gray" />;
  }

  /* ✅ Show Results */
  if (resultData) {
    return (
      <div className="mx-2">
        <QuizResult result={resultData} onStartNew={startNewQuiz} />
      </div>
    );
  }

  /* 🟢 Before quiz starts */
  if (!Array.isArray(quizData)) {
    return (
      <Card className="mx-2">
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This quiz contains 10 questions specific to your industry and skills.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={generateQuizFn} className="w-full">
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  /* 🛡️ Safety */
  const question = quizData[currentQuestion];

  if (!question) {
    return <BarLoader className="mt-4" width="100%" color="gray" />;
  }

  return (
    <Card className="mx-2">
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-lg font-medium">
          {question.question || "Question not available"}
        </p>

        <RadioGroup
          onValueChange={handleAnswer}
          value={answers[currentQuestion] || ""}
          className="space-y-2"
        >
          {Array.isArray(question.options) &&
            question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">
              {question.explanation || "No explanation provided."}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!showExplanation && (
          <Button
            onClick={() => setShowExplanation(true)}
            variant="outline"
            disabled={!answers[currentQuestion]}
          >
            Show Explanation
          </Button>
        )}

        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className="ml-auto"
        >
          {savingResult
            ? "Saving..."
            : currentQuestion < quizData.length - 1
            ? "Next Question"
            : "Finish Quiz"}
        </Button>
      </CardFooter>
    </Card>
  );
}