
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
      label: "TOOTH COLOR", 
      value: results.keyMetrics.toothColor, 
      color: "text-amber-600",
      bgColor: "bg-amber-50/50",
      borderColor: "border-amber-100"
    },
    { 
      label: "GUM VISIBILITY", 
      value: results.keyMetrics.gumVisibility, 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100"
    },
    { 
      label: "ALIGNMENT", 
      value: results.keyMetrics.alignment, 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100"
    },
    { 
      label: "CLEANLINESS", 
      value: results.keyMetrics.cleanliness, 
      color: "text-emerald-600",
      bgColor: "bg-emerald-50/50",
      borderColor: "border-emerald-100"
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-[600px] mx-auto w-full pb-20">
      <Card className="p-0 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border-none bg-white rounded-[40px] overflow-hidden">
        {/* Actions bar inside card */}
        <div className="flex justify-end items-center px-8 pt-8 pb-0">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="rounded-full h-9 px-4 font-body text-slate-400 hover:text-primary">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full h-9 px-4 font-body text-slate-400 hover:text-primary">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Header Section */}
        <div className="p-8 md:p-12 md:pt-4 flex flex-col gap-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm">
                <img 
                  src="https://picsum.photos/seed/dental-pro/200/200" 
                  alt="Dental Professional" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold font-display text-slate-900 leading-tight tracking-tight">
                  Your Assessment
                </h1>
                <p className="text-sm font-medium text-slate-500 font-body">
                  Professional Review
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-[12px] font-bold border border-emerald-100 flex items-center gap-2 shadow-sm">
              <Check className="w-3.5 h-3.5" />
              Verified Analysis
            </div>
          </div>

          {/* Summary Section */}
          <div className="p-8 rounded-[24px] bg-slate-50/80 border border-slate-100">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 font-display">
              CLINICAL SUMMARY
            </h3>
            <p className="text-[17px] font-medium text-slate-700 leading-relaxed font-body">
              {results.summary}
            </p>
          </div>

          {/* Key Metrics Section */}
          <div className="flex flex-col gap-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">
              KEY INDICATORS
            </h3>
            <div className="grid grid-cols-2 gap-5">
              {metrics.map((metric, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-6 rounded-[24px] border flex flex-col gap-2 transition-all duration-300 hover:shadow-md",
                    metric.bgColor,
                    metric.borderColor
                  )}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-display">
                    {metric.label}
                  </span>
                  <span className={cn("text-lg font-bold font-body", metric.color)}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actionable Steps Section */}
          <div className="p-8 rounded-[32px] bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] flex flex-col gap-6">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 font-display">
              ACTIONABLE STEPS
            </h3>
            <ul className="flex flex-col gap-5">
              {results.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <p className="text-[15px] text-slate-600 font-medium leading-normal font-body">
                    {rec}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 pt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-16 rounded-[20px] shadow-xl shadow-primary/20 transition-all border-none font-body text-base">
              <Calendar className="w-5 h-5 mr-3" />
              Book Professional Consultation
            </Button>
            
            <Button 
              variant="ghost" 
              size="lg" 
              className="text-slate-500 font-body hover:text-primary hover:bg-slate-50 h-14 rounded-[20px]" 
              onClick={onReset}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake Scan / Another Image
            </Button>

            <div className="flex items-center justify-center gap-3 text-xs text-slate-400 font-body mt-2">
              <AlertCircle className="w-4 h-4" />
              <span>Informational Purposes Only</span>
            </div>
          </div>
        </div>
      </Card>

      <footer className="text-center px-8">
        <p className="text-[11px] font-medium text-slate-400 leading-relaxed max-w-[400px] mx-auto font-body">
          This assessment is for informational purposes only. Consult a licensed dentist for medical diagnosis and treatment planning.
        </p>
      </footer>
    </div>
  );
}
