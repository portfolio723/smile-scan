
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmileAnalysisOutput } from "@/app/page";
import { 
  CheckCircle2, 
  RotateCcw, 
  Calendar, 
  Share2, 
  Download,
  AlertCircle,
  Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsStepProps {
  results: SmileAnalysisOutput;
  onReset: () => void;
}

export function ResultsStep({ results, onReset }: ResultsStepProps) {
  const metrics = [
    { 
      label: "Tooth Color", 
      value: results.keyMetrics.toothColor, 
      color: "text-amber-600",
      bgColor: "bg-amber-50/50",
      borderColor: "border-amber-100"
    },
    { 
      label: "Gum Visibility", 
      value: results.keyMetrics.gumVisibility, 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100"
    },
    { 
      label: "Alignment", 
      value: results.keyMetrics.alignment, 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100"
    },
    { 
      label: "Cleanliness", 
      value: results.keyMetrics.cleanliness, 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100"
    },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[600px] mx-auto w-full pb-20 px-4 md:px-0">
      <Card className="p-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-none bg-white rounded-[32px] md:rounded-[40px] overflow-hidden">
        {/* Actions bar inside card */}
        <div className="flex justify-end items-center px-6 md:px-8 pt-6 md:pt-8 pb-0">
          <div className="flex gap-1 md:gap-2">
            <Button variant="ghost" size="sm" className="rounded-full h-8 md:h-9 px-3 md:px-4 font-body text-slate-400 hover:text-primary">
              <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full h-8 md:h-9 px-3 md:px-4 font-body text-slate-400 hover:text-primary">
              <Download className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Header Section */}
        <div className="p-6 md:p-12 md:pt-4 flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                <img 
                  src="https://picsum.photos/seed/dental-pro/200/200" 
                  alt="Dental Professional" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-bold font-display text-slate-900 leading-tight tracking-tight">
                  Your Assessment
                </h1>
                <p className="text-[13px] md:text-sm font-medium text-slate-500 font-body">
                  Professional Review
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[11px] md:text-[12px] font-normal border border-emerald-100 flex items-center gap-2 shadow-sm self-start">
              <Check className="w-3 md:w-3.5 h-3 md:h-3.5" />
              Verified Analysis
            </div>
          </div>

          {/* Summary Section */}
          <div className="p-6 md:p-8 rounded-[20px] md:rounded-[24px] bg-slate-50/80 border border-slate-100">
            <h3 className="text-xs md:text-sm font-normal text-black mb-3 md:mb-4 font-display">
              Clinical Summary
            </h3>
            <p className="text-[15px] md:text-[17px] font-normal text-black leading-relaxed font-body">
              {results.summary}
            </p>
          </div>

          {/* Key Metrics Section */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="text-xs md:text-sm font-normal text-black font-display">
              Key Indicators
            </h3>
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {metrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-4 md:p-6 rounded-[20px] md:rounded-[24px] border flex flex-col gap-1 md:gap-2 transition-all duration-300 hover:shadow-md",
                    metric.bgColor,
                    metric.borderColor
                  )}
                >
                  <span className="text-[10px] md:text-xs font-normal text-black font-display">
                    {metric.label}
                  </span>
                  <span className={cn("text-[15px] md:text-lg font-normal font-body text-black")}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Steps Section */}
          <div className="p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-5 md:gap-6">
            <h3 className="text-xs md:text-sm font-normal text-black font-display">
              Actionable Steps
            </h3>
            <ul className="flex flex-col gap-4 md:gap-5">
              {results.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 md:gap-4">
                  <div className="mt-0.5 md:mt-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <CheckCircle2 className="w-3 md:w-3.5 h-3 md:h-3.5 text-accent" />
                  </div>
                  <p className="text-[14px] md:text-[15px] text-black font-normal leading-normal font-body">
                    {rec}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 md:gap-4 pt-4 md:pt-6">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white hover:text-accent transition-colors font-bold h-14 md:h-16 rounded-[16px] md:rounded-[20px] shadow-xl shadow-primary/20 border-none font-body text-sm md:text-base"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
              Book Professional Consultation
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-white border border-slate-200 text-slate-500 font-body hover:text-primary hover:bg-slate-50 h-12 md:h-14 rounded-[16px] md:rounded-[20px] transition-all text-sm md:text-base" 
              onClick={onReset}
            >
              <RotateCcw className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" />
              Retake Scan / Another Image
            </Button>

            <div className="flex items-center justify-center gap-2 md:gap-3 text-[10px] md:text-xs text-black font-normal font-body mt-2">
              <AlertCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>Private And Secure</span>
            </div>
          </div>
        </div>
      </Card>

      <footer className="text-center px-4 md:px-8">
        <p className="text-[10px] md:text-[11px] font-normal text-black leading-relaxed max-w-[400px] mx-auto font-body">
          This assessment is for informational purposes only. Consult a licensed dentist for medical diagnosis and treatment planning.
        </p>
      </footer>
    </div>
  );
}
