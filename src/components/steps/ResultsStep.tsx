
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmileAnalysisOutput } from "@/app/page";
import { CheckCircle2, RotateCcw, Calendar, UserRound } from "lucide-react";
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
      color: "text-[#D97706]" // Yellow/Orange for "Medium" feel
    },
    { 
      label: "GUM VISIBILITY", 
      value: results.keyMetrics.gumVisibility, 
      color: "text-[#059669]" // Green for "Good/Safe"
    },
    { 
      label: "ALIGNMENT", 
      value: results.keyMetrics.alignment, 
      color: "text-[#059669]" 
    },
    { 
      label: "CLEANLINESS", 
      value: results.keyMetrics.cleanliness, 
      color: "text-[#059669]" 
    },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[560px] mx-auto w-full pb-12">
      <Card className="p-0 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-none bg-white rounded-[32px] overflow-hidden">
        {/* Header Section */}
        <div className="p-8 md:p-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
                <img 
                  src="https://picsum.photos/seed/dentist/100/100" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-extrabold font-display text-[#1E293B] leading-tight">
                  Your Smile Analysis
                </h1>
                <p className="text-[13px] font-medium text-slate-500 font-body">
                  Reviewed using advanced dental tech
                </p>
              </div>
            </div>
            <div className="bg-[#ECFDF5] text-[#059669] px-3 py-1 rounded-full text-[11px] font-bold border border-[#A7F3D0] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
              85% Confidence
            </div>
          </div>

          {/* Summary Section */}
          <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9]">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8] mb-3 font-display">
              SUMMARY
            </h3>
            <p className="text-[15px] font-medium text-[#475569] leading-relaxed font-body">
              {results.summary}
            </p>
          </div>

          {/* Key Metrics Section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8] font-display">
              KEY METRICS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {metrics.map((metric, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-[#F1F5F9] bg-white flex flex-col gap-1.5 shadow-sm">
                  <span className="text-[10px] font-extrabold uppercase tracking-tight text-[#94A3B8] font-display">
                    {metric.label}
                  </span>
                  <span className={cn("text-base font-bold font-body", metric.color)}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="p-6 rounded-2xl bg-white border border-[#F1F5F9] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-4">
            <h3 className="text-[11px] font-extrabold uppercase tracking-widest text-[#94A3B8] font-display">
              RECOMMENDATIONS
            </h3>
            <ul className="flex flex-col gap-4">
              {results.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3 text-[#D97706]" />
                  </div>
                  <p className="text-[14px] text-[#334155] font-medium leading-normal font-body">
                    {rec}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <Button size="lg" className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold h-14 rounded-2xl shadow-[0_4px_12px_rgba(217,119,6,0.2)] transition-all border-none font-display">
              <Calendar className="w-4 h-4 mr-2" />
              Book Professional Consultation
            </Button>
            <Button variant="outline" size="lg" className="h-14 border-[#E2E8F0] border-2 font-bold rounded-2xl text-[#64748B] hover:bg-slate-50 transition-all font-display" onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Analyze Another Smile
            </Button>
          </div>

          <footer className="text-center mt-4">
            <p className="text-[10px] font-medium text-[#94A3B8] leading-relaxed max-w-[320px] mx-auto font-body">
              This assessment is for informational purposes only and does not replace professional dental advice.
            </p>
          </footer>
        </div>
      </Card>

      <div className="text-center flex flex-col gap-1 opacity-50">
        <p className="text-[11px] font-bold text-slate-500 font-display">
          © 2024 DentalScan • Private & Secure
        </p>
      </div>
    </div>
  );
}
