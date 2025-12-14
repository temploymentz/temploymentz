"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function ImageUploader({ onUpload }) {
    const [preview, setPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFile = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.url) {
                onUpload(data.url);
                toast.success("Uploaded!");
            } else {
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.error("Error uploading");
        }

        setUploading(false);
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                id="uploadInput"
                onChange={handleFile}
            />

            <label
                htmlFor="uploadInput"
                className="cursor-pointer border-2 border-dashed p-5 rounded-xl flex flex-col items-center justify-center text-center bg-white hover:bg-gray-50"
            >
                <p className="text-gray-700">
                    {uploading ? "Uploading..." : "Click to upload image"}
                </p>

                {preview && (
                    <img
                        src={preview}
                        className="mt-3 w-40 h-40 object-cover rounded-xl"
                    />
                )}
            </label>
        </div>
    );
}
