// components/ui/color-picker.tsx
import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Optional: for a button trigger
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                    style={{ backgroundColor: value || "#ffffff", color: value ? "white" : "black" }} // Basic styling for color preview
                >
                    {value || "Pick a color"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <HexColorPicker color={value} onChange={onChange} />
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#RRGGBB"
                    className="mt-2"
                />
            </PopoverContent>
        </Popover>
    );
}