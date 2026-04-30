"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Info } from "lucide-react";

interface CropStepProps {
  image: string;
  onCrop: (imageData: string) => void;
  onCancel: () => void;
}

export function CropStep({ image, onCrop, onCancel }: CropStepProps) {
  // In a real app with more resources, I'd use a dedicated cropping library.
  // For this high-quality prototype, I will use a simple preview based confirmation
  // that mimics the "Guided Control" look requested in the proposal.
  
  return (
    <Card className="p-6 md:p-10 flex flex-col gap-8 shadow-xl border-border animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold font-headline text-foreground">Adjust Your Smile Area</h2>
        <p className="text-muted-foreground">
          Focus on your teeth for the most accurate results.
        </p>
      </div>

      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black flex items-center justify-center">
        <img 
          src={image} 
          alt="Original" 
          className="max-h-full max-w-full object-contain"
        />
        {/* Visual representation of a crop overlay */}
        <div className="absolute inset-0 border-[40px] border-black/60 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full border-2 border-white shadow-[0_0_0_1000px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white -translate-x-1 -translate-y-1" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white translate-x-1 -translate-y-1" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white -translate-x-1 translate-y-1" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white translate-x-1 translate-y-1" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-lg">
        <Info className="w-4 h-4 text-accent" />
        <p>Keep your teeth centered and clearly visible.</p>
      </div>

      <div className="flex items-center justify-between pt-4 gap-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          className="bg-primary hover:bg-primary/90 flex-1 md:flex-none" 
          onClick={() => onCrop(image)}
        >
          Continue <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}