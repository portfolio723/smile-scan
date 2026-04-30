"use client";

import { useState } from "react";
import { UploadStep } from "@/components/steps/UploadStep";
import { CropStep } from "@/components/steps/CropStep";
import { ConfirmStep } from "@/components/steps/ConfirmStep";
import { ProcessingStep } from "@/components/steps/ProcessingStep";
import { ResultsStep } from "@/components/steps/ResultsStep";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { SmileAnalysisOutput } from "@/ai/flows/smile-analysis-report-generation";

export type FlowStep = "upload" | "crop" | "confirm" | "processing" | "results";

export default function SmileScanApp() {
  const [step, setStep] = useState<FlowStep>("upload");
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [results, setResults] = useState<SmileAnalysisOutput | null>(null);

  const stepNumber = {
    upload: 1,
    crop: 2,
    confirm: 3,
    processing: 4,
    results: 5,
  }[step];

  const handleUpload = (imageData: string) => {
    setOriginalImage(imageData);
    setStep("crop");
  };

  const handleCrop = (imageData: string) => {
    setCroppedImage(imageData);
    setStep("confirm");
  };

  const handleConfirm = () => {
    setStep("processing");
  };

  const handleAnalysisComplete = (data: SmileAnalysisOutput) => {
    setResults(data);
    setStep("results");
  };

  const resetFlow = () => {
    setStep("upload");
    setOriginalImage(null);
    setCroppedImage(null);
    setResults(null);
  };

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-16 flex flex-col items-center">
      <div className="w-full max-w-[640px] flex flex-col gap-8">
        {step !== "results" && (
          <header className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">
              SmileScan AI
            </h1>
            <ProgressIndicator currentStep={stepNumber} />
          </header>
        )}

        <div className="w-full transition-all duration-500 ease-in-out">
          {step === "upload" && <UploadStep onUpload={handleUpload} />}
          {step === "crop" && originalImage && (
            <CropStep 
              image={originalImage} 
              onCrop={handleCrop} 
              onCancel={() => setStep("upload")} 
            />
          )}
          {step === "confirm" && croppedImage && (
            <ConfirmStep 
              image={croppedImage} 
              onConfirm={handleConfirm} 
              onEdit={() => setStep("crop")} 
            />
          )}
          {step === "processing" && croppedImage && (
            <ProcessingStep 
              image={croppedImage} 
              onComplete={handleAnalysisComplete} 
            />
          )}
          {step === "results" && results && (
            <ResultsStep 
              results={results} 
              onReset={resetFlow} 
            />
          )}
        </div>
      </div>
    </main>
  );
}