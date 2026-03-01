"use client";

import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  const safeScore = Number(result?.quizScore) || 0;
  const safeQuestions = Array.isArray(result?.questions)
    ? result.questions
    : [];

  return (
    <div className="mx-auto">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 w-6 text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">
            {safeScore.toFixed(1)}%
          </h3>
          <Progress value={safeScore} className="w-full" />
        </div>

        {/* Improvement Tip */}
        {result?.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">
              {result.improvementTip}
            </p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>

          {safeQuestions.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No questions available.
            </p>
          )}

          {safeQuestions.map((q, index) => {
            const isCorrect = Boolean(q?.isCorrect);

            return (
              <div
                key={index}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium">
                    {q?.question || "Question not available"}
                  </p>

                  {isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>
                    Your answer: {q?.userAnswer || "N/A"}
                  </p>
                  {!isCorrect && (
                    <p>
                      Correct answer: {q?.answer || "N/A"}
                    </p>
                  )}
                </div>

                <div className="text-sm bg-muted p-2 rounded">
                  <p className="font-medium">Explanation:</p>
                  <p>{q?.explanation || "No explanation available."}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button
            onClick={() => onStartNew?.()}
            className="w-full"
          >
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </div>
  );
}