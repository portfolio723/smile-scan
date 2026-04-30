
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, ArrowRight } from "lucide-react";

interface ConfirmStepProps {
  image: string;
  onConfirm: () => void;
  onEdit: () => void;
}

export function ConfirmStep({ image, onConfirm, onEdit }: ConfirmStepProps) {
  return (
    <Card className="p-6 md:p-10 flex flex-col gap-8 shadow-xl border-border animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold font-headline text-foreground">Confirm Your Smile</h2>
      </div>

      <div className="relative group rounded-xl overflow-hidden border border-border bg-muted aspect-[4/3] flex items-center justify-center">
        <img 
          src={image} 
          alt="Cropped Preview" 
          className="max-h-full max-w-full object-contain scale-100 group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="flex flex-col gap-4">
        <Button variant="outline" size="lg" onClick={onEdit}>
          Edit Crop
        </Button>
        <Button 
          className="bg-primary hover:bg-primary/90" 
          size="lg" 
          onClick={onConfirm}
        >
          Analyze Smile <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <Shield className="w-3 h-3" />
        <span>Your image will only be used for this analysis.</span>
      </div>
    </Card>
  );
}
