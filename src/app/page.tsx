
"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadStep } from "@/components/steps/UploadStep";
import { CropStep } from "@/components/steps/CropStep";
import { ConfirmStep } from "@/components/steps/ConfirmStep";
import { ProcessingStep } from "@/components/steps/ProcessingStep";
import { ResultsStep } from "@/components/steps/ResultsStep";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export type FlowStep = "upload" | "crop" | "confirm" | "processing" | "results";

export interface SmileAnalysisOutput {
  summary: string;
  keyMetrics: {
    toothColor: string;
    gumVisibility: string;
    alignment: string;
    cleanliness: string;
  };
  recommendations: string[];
}

export default function SmileScanApp() {
  const [step, setStep] = useState<FlowStep>("upload");
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [results, setResults] = useState<SmileAnalysisOutput | null>(null);

  const logo = PlaceHolderImages.find((img) => img.id === "app-logo");

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
    <main className="min-h-screen bg-[#FDFDFD] flex flex-col items-center">
      <div className="w-full max-w-[640px] px-6 py-12 md:py-20 flex flex-col gap-10">
        {step !== "results" && (
          <header className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-4">
              {logo && (
                <div className="w-12 h-12 relative rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-slate-100">
                  <Image
                    src={logo.imageUrl}
                    alt={logo.description}
                    fill
                    className="object-cover"
                    data-ai-hint={logo.imageHint}
                  />
                </div>
              )}
              <h1 className="text-4xl font-extrabold font-display text-primary tracking-tight">
                SmileScan
              </h1>
            </div>
            <div className="w-full max-w-[320px]">
              <ProgressIndicator currentStep={stepNumber} />
            </div>
          </header>
        )}

        <div className="w-full">
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
