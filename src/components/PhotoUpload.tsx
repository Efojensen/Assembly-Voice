import { Camera } from "lucide-react";
import React, { useRef, useState } from "react";

type PhotoUploadProps = {
    onChange?: (file: File) => void;
};

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onChange }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            onChange?.(selectedFile);
        }
    };

    return (
        <div className="w-full">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="hidden"
            />

            <div
                onClick={handleClick}
                className="border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center gap-2 bg-white cursor-pointer hover:bg-primary-pale/30 transition-colors overflow-hidden"
            >
                {preview ? (
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                    />
                ) : (
                    <>
                        <Camera className="text-text-light" size={28} />
                        <div className="text-xs text-text-light font-medium">
                            Tap to take or upload a photo
                        </div>
                        <div className="text-[10px] text-text-light">
                            helps the assembly verify faster
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PhotoUpload;
