
"use client";

import { useState, useCallback } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Info, Plus, Minus } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface CropStepProps {
  image: string;
  onCrop: (imageData: string) => void;
  onCancel: () => void;
}

export function CropStep({ image, onCrop, onCancel }: CropStepProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.setAttribute("crossOrigin", "anonymous");
      image.src = url;
    });

  const handleCropConfirm = async () => {
    if (!croppedAreaPixels) return;

    try {
      const imageElement = await createImage(image);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.drawImage(
        imageElement,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );

      const base64Image = canvas.toDataURL("image/jpeg");
      onCrop(base64Image);
    } catch (e) {
      console.error(e);
      // Fallback to original if something fails
      onCrop(image);
    }
  };

  return (
    <Card className="p-6 md:p-10 flex flex-col gap-8 shadow-xl border-border animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col gap-2 text-center">
        <h2 className="text-2xl font-bold font-headline text-foreground">Adjust Your Smile Area</h2>
        <p className="text-muted-foreground">
          Drag and zoom to focus on your teeth for accurate results.
        </p>
      </div>

      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 shadow-inner">
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          classes={{
            containerClassName: "rounded-xl",
            cropAreaClassName: "border-2 border-accent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]",
          }}
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 px-2">
          <Minus className="w-4 h-4 text-muted-foreground" />
          <Slider
            value={[zoom]}
            min={1}
            max={3}
            step={0.1}
            onValueChange={(value) => setZoom(value[0])}
            className="flex-1"
          />
          <Plus className="w-4 h-4 text-muted-foreground" />
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-secondary/30 p-3 rounded-lg">
          <Info className="w-4 h-4 text-accent" />
          <p>The highlighted box shows your analysis area.</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 gap-4">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          className="bg-primary hover:bg-primary/90 text-accent hover:text-white transition-colors flex-1 md:flex-none h-12 px-8 rounded-xl" 
          onClick={handleCropConfirm}
        >
          Confirm Crop <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
}
