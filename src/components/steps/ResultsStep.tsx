
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SmileAnalysisOutput } from "@/app/page";
import { CheckCircle2, RotateCcw, Calendar, UserRound } from "lucide-react";

interface ResultsStepProps {
  results: SmileAnalysisOutput;
  onReset: () => void;
}

export function ResultsStep({ results, onReset }: ResultsStepProps) {
  const metrics = [
    { label: "Tooth Color", value: results.keyMetrics.toothColor },
    { label: "Gum Visibility", value: results.keyMetrics.gumVisibility },
    { label: "Alignment", value: results.keyMetrics.alignment },
    { label: "Cleanliness", value: results.keyMetrics.cleanliness },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[640px] mx-auto w-full">
      <Card className="p-8 md:p-12 shadow-2xl border-border bg-card flex flex-col gap-10">
        <header className="flex flex-col gap-4 text-center border-b pb-8">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-2">
            <UserRound className="w-8 h-8 text-primary" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-bold font-headline text-foreground">Smile Assessment</h1>
            <p className="text-muted-foreground">Professional analysis report</p>
          </div>
        </header>

        {/* Summary Section */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-accent">Clinical Summary</h3>
          <p className="text-lg font-medium text-foreground leading-relaxed">
            {results.summary}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detailed Observations</h3>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-border/50 flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-tight text-muted-foreground/70">{metric.label}</span>
                <span className="text-sm font-semibold text-foreground">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations List */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Actionable Steps</h3>
          <ul className="flex flex-col gap-3">
            {results.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground font-medium leading-normal">{rec}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4 pt-4 border-t">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold h-14 rounded-xl shadow-lg hover:shadow-xl transition-all">
            <Calendar className="w-5 h-5 mr-2" />
            Book Dental Consultation
          </Button>
          <Button variant="outline" size="lg" className="h-14 border-2 font-semibold rounded-xl hover:bg-secondary transition-all" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            New Assessment
          </Button>
        </div>

        <footer className="text-center">
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Disclaimer: This assessment is informational only. Consult a licensed dentist for medical diagnosis.
          </p>
        </footer>
      </Card>
    </div>
  );
}
