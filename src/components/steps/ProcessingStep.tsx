
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SmileAnalysisOutput } from "@/app/page";

interface ProcessingStepProps {
  image: string;
  onComplete: (results: SmileAnalysisOutput) => void;
}

const MESSAGES = [
  "Reviewing alignment...",
  "Checking tooth shade...",
  "Evaluating gum visibility...",
  "Preparing your results...",
];

export function ProcessingStep({ image, onComplete }: ProcessingStepProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 5;
      });
    }, 400);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 2000);

    const processAssessment = () => {
      setTimeout(() => {
        const mockResults: SmileAnalysisOutput = {
          summary: "Based on the assessment, your smile appears healthy and well-maintained. We've noted natural tooth alignment and healthy gum visibility. Consistent care will help maintain these results.",
          keyMetrics: {
            toothColor: "Natural White",
            gumVisibility: "Normal",
            alignment: "Straight",
            cleanliness: "Good"
          },
          recommendations: [
            "Maintain daily brushing and flossing routines.",
            "Consider a mild whitening treatment for enhancement.",
            "Schedule a professional consultation for a detailed check-up."
          ]
        };
        setProgress(100);
        setTimeout(() => {
          onComplete(mockResults);
        }, 800);
      }, 6000);
    };

    processAssessment();

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <Card className="p-12 flex flex-col items-center gap-10 shadow-xl border-border animate-in fade-in duration-700">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-32 h-32 rounded-full border-2 border-accent/20 animate-ping" />
        <div className="absolute w-28 h-28 rounded-full border-2 border-accent/40 animate-pulse" />
        <div className="relative w-24 h-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 shimmer-line" />
          <img 
            src={image} 
            alt="Analyzing" 
            className="w-full h-full object-cover opacity-50 blur-sm"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 text-center w-full max-w-[300px]">
        <h2 className="text-2xl font-bold font-headline text-foreground">Reviewing Your Smile</h2>
        <p className="text-muted-foreground transition-all duration-500 min-h-[1.5rem]">
          {MESSAGES[messageIndex]}
        </p>
        <Progress value={progress} className="h-2 mt-4" />
      </div>

      <p className="text-sm text-muted-foreground">
        This takes a few seconds. Please stay on this page.
      </p>
    </Card>
  );
}
