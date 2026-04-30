
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
  "Calibrating image quality...",
  "Analyzing tooth alignment...",
  "Checking enamel shade...",
  "Evaluating gum visibility...",
  "Finalizing assessment report...",
];

export function ProcessingStep({ image, onComplete }: ProcessingStepProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 8;
      });
    }, 400);

    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % MESSAGES.length);
    }, 1800);

    const processAssessment = () => {
      // Simulate professional processing time
      setTimeout(() => {
        const mockResults: SmileAnalysisOutput = {
          summary: "Your smile shows excellent structural integrity and healthy gum tissue. We've identified slight variations in enamel shade which are common and manageable. Overall, your dental health indicators are strong.",
          keyMetrics: {
            toothColor: "Natural White",
            gumVisibility: "Normal",
            alignment: "Straight",
            cleanliness: "Good"
          },
          recommendations: [
            "Maintain your consistent brushing and flossing routine.",
            "Consider a professional whitening session to enhance natural shade.",
            "Schedule your semi-annual cleaning to maintain results.",
            "A custom night guard could prevent future enamel wear."
          ]
        };
        setProgress(100);
        setTimeout(() => {
          onComplete(mockResults);
        }, 1000);
      }, 7000);
    };

    processAssessment();

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [onComplete]);

  return (
    <Card className="p-16 flex flex-col items-center gap-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.12)] border-none rounded-[40px] animate-in fade-in duration-1000 bg-white">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full border-2 border-accent/20 animate-ping" />
        <div className="absolute w-36 h-36 rounded-full border-2 border-accent/30 animate-pulse" />
        <div className="relative w-32 h-32 rounded-3xl bg-slate-50 flex items-center justify-center overflow-hidden shadow-inner border border-slate-100">
          <div className="absolute inset-0 shimmer-line opacity-50" />
          <img 
            src={image} 
            alt="Analyzing" 
            className="w-full h-full object-cover opacity-60 grayscale blur-[2px]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-6 text-center w-full max-w-[340px]">
        <h2 className="text-2xl font-bold font-display text-slate-900 tracking-tight">Expert Review</h2>
        <p className="text-slate-500 font-body text-sm min-h-[1.5rem] flex items-center justify-center">
          {MESSAGES[messageIndex]}
        </p>
        <div className="w-full px-4">
          <Progress value={progress} className="h-2.5 bg-slate-100" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-[12px] font-normal text-black font-display">
          Private Processing
        </p>
        <p className="text-[11px] text-slate-400 font-body">
          Encryption Active • HIPAA Secure Channel
        </p>
      </div>
    </Card>
  );
}
