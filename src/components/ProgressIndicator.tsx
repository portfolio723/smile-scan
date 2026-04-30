import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  currentStep: number;
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Step {currentStep} of 5
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {Math.round((currentStep / 5) * 100)}% Complete
        </span>
      </div>
      <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-accent transition-all duration-700 ease-out" 
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}