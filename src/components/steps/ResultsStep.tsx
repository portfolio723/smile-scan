"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SmileAnalysisOutput } from "@/ai/flows/smile-analysis-report-generation";
import { CheckCircle2, RotateCcw, Calendar, TrendingUp } from "lucide-react";

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
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Your Smile Analysis</h1>
          <p className="text-muted-foreground">Based on our advanced dental AI assessment.</p>
        </div>
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-accent/10 text-accent font-semibold flex items-center gap-2 self-start md:self-auto">
          <TrendingUp className="w-4 h-4" />
          {results.confidence}% Confidence
        </Badge>
      </header>

      {/* Summary Card */}
      <Card className="p-6 bg-secondary/30 border-none shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Overall Assessment</h3>
        <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed">
          {results.summary}
        </p>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        {metrics.map((metric, idx) => (
          <Card key={idx} className="p-4 flex flex-col gap-1 border-border shadow-sm">
            <span className="text-xs font-medium text-muted-foreground">{metric.label}</span>
            <span className="text-base font-semibold text-foreground">{metric.value}</span>
          </Card>
        ))}
      </div>

      {/* Recommendations List */}
      <Card className="p-6 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Personalized Recommendations</h3>
        <ul className="flex flex-col gap-4">
          {results.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="mt-1 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-accent" />
              </div>
              <p className="text-foreground font-medium leading-snug">{rec}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* CTAs */}
      <div className="flex flex-col gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-semibold h-14 rounded-xl shadow-lg hover:shadow-xl transition-all">
          <Calendar className="w-5 h-5 mr-2" />
          Book Professional Consultation
        </Button>
        <Button variant="outline" size="lg" className="h-14 border-2 font-semibold rounded-xl" onClick={onReset}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Analyze Another Smile
        </Button>
      </div>

      <footer className="text-center py-8">
        <p className="text-xs text-muted-foreground max-w-[400px] mx-auto">
          Note: This analysis is provided for informational purposes only and is not a substitute for professional dental diagnosis.
        </p>
      </footer>
    </div>
  );
}