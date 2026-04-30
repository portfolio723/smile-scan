
"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, AlertCircle, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadStepProps {
  onUpload: (imageData: string) => void;
}

export function UploadStep({ onUpload }: UploadStepProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onUpload(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Card className="p-6 md:p-10 flex flex-col gap-8 shadow-xl border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold font-headline text-foreground tracking-tight">Smile Assessment</h2>
        <p className="text-muted-foreground text-sm font-body">
          Get a quick, private assessment of your smile in seconds.
        </p>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative group cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-12 gap-4",
          isDragging ? "border-accent bg-accent/5" : "border-border hover:border-accent hover:bg-accent/5",
          "hover:shadow-[0_0_20px_rgba(21,27,64,0.05)]"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-8 h-8 text-primary" />
        </div>

        <div className="text-center">
          <p className="text-lg font-semibold text-foreground font-display">Upload your smile</p>
          <p className="text-sm text-muted-foreground font-body">Drag & drop or choose a photo</p>
        </div>

        <Button 
          className="mt-2 bg-[#151B40] hover:bg-[#151B40]/90 text-accent hover:text-white h-12 px-8 rounded-xl font-body transition-colors" 
          size="lg"
        >
          Select Image
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-8 justify-items-center">
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground font-body">
          <AlertCircle className="w-4 h-4 text-accent" />
          <span>Private and secure</span>
        </div>
        <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground font-body">
          <Timer className="w-4 h-4 text-accent" />
          <span>Takes 30 seconds</span>
        </div>
      </div>
    </Card>
  );
}
