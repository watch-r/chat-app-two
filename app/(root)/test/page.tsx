"use client";
import { Button } from "@/components/ui/button";
import { CldUploadButton, CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

interface CloudinaryResult {
    public_id: string;
}
const TestingComponents = () => {
    const [publicId, setPublicId] = useState("");
    const uploadPhotoHandler = (result: any) => {
        if (result.event !== "success") return;
        const info = result.info as CloudinaryResult;
        console.log(result);
        setPublicId(info.public_id);
    };

    return (
        <>
            {publicId && (
                <CldImage
                    src={publicId}
                    width={160}
                    height={160}
                    alt='a picture'
                    crop='fill'
                />
            )}
            <CldUploadWidget
                options={{
                    maxFiles: 1,
                    sources: ["local"],
                    cropping: true,
                    resourceType: "image",
                }}
                onUpload={uploadPhotoHandler}
                uploadPreset='ffsyomdz'
            >
                {({ open }) => <Button onClick={() => open()}>Upload</Button>}
            </CldUploadWidget>
        </>
    );
};

export default TestingComponents;
