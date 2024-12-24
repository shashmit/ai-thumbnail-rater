"use client"

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { UploadButton, UploadFileResponse } from "@xixixao/uploadstuff/react";
import "@xixixao/uploadstuff/react/styles.css";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast";
import clsx from "clsx";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";


const defaultErrors = {
  title: "",
  imageA: "",
  imageB: ""
}
export default function CreatePage() {

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);
  const getStorageUrl = useMutation(api.files.getStorageUrl);

  const [imageA, setImageA] = useState<string | null>(null);
  const [imageB, setImageB] = useState<string | null>(null);
  const [imageAUrl, setImageAUrl] = useState<string | null>(null);
  const [imageBUrl, setImageBUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState(defaultErrors);

  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (imageA) {
      getStorageUrl({ storageId: imageA }).then(url => setImageAUrl(url));
    }
  }, [imageA]);

  useEffect(() => {
    if (imageB) {
      getStorageUrl({ storageId: imageB }).then(url => setImageBUrl(url));
    }
  }, [imageB]);

  return (

    <div className="mt-16 p-4">
      <h1 className="text-4xl font-bold mb-8">Create a Thumbnail Test</h1>
      <p className="text-lg max-w-md mb-8">
        Create your test so that other people can vote on their favorite thumbnail. And help you redesign or pick the best options.
      </p>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          // const form = e.target as HTMLFormElement;
          const formData = new FormData(e.currentTarget);
          const title = formData.get("title") as string;

          let newErrors = {
            ...defaultErrors
          }
          setErrors(() => newErrors);

          if (!title) {
            newErrors = {
              ...newErrors,
              title: "required"
            }
          }

          if (!imageA) {
            newErrors = {
              ...newErrors,
              imageA: "required"
            }
          }

          if (!imageB) {
            newErrors = {
              ...newErrors,
              imageB: "required"
            }
          }

          setErrors(newErrors);

          const hasErrors = Object.values(newErrors).some(Boolean);

          if (hasErrors) {
            toast({
              title: "Error",
              description: "Please fill out all fields",
              duration: 5000,
              variant: "destructive"
            })
            return;
          }

          const thumbnailId = await createThumbnail({
            aImage: imageA!,
            bImage: imageB!,
            title,
          })

          router.push(`/thumbnails/${thumbnailId}`)
        }}>

        <div className="flex flex-col gap-4 mb-8">
          <Label htmlFor="title">Your Test Title</Label>
          <Input name="title" id="title" type="text" placeholder="Enter your test title" className={clsx("flex flex-col gap-4 rounded p-2", {
            border: errors.title,
            "border-red-500": errors.title,
          })} />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">

          <div className={clsx("flex flex-col gap-4 rounded p-2", {
            border: errors.imageA,
            "border-red-500": errors.imageA,
          })}>
            <h2 className="text-2xl font-bold">Text Image A</h2>
            {
              imageAUrl && (
                <Image
                  width={200}
                  height={200}
                  alt="Image A"
                  src={imageAUrl}
                />
              )
            }
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImageA((uploaded[0].response as any).storageId)
              }}
              onUploadError={(error: unknown) => {
                alert(`ERROR! ${error}`);
              }}
            />
            {errors.imageA && <p className="text-red-500 text-sm">{errors.imageA}</p>}
          </div>
          <div className={clsx("flex flex-col gap-4 rounded p-2", {
            border: errors.imageB,
            "border-red-500": errors.imageB,
          })}>
            <h2 className="text-2xl font-bold">Text Image B</h2>
            {
              imageBUrl && (
                <Image
                  width={200}
                  height={200}
                  alt="Image B"
                  src={imageBUrl}
                />
              )
            }
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={["image/*"]}
              onUploadComplete={async (uploaded: UploadFileResponse[]) => {
                setImageB((uploaded[0].response as any).storageId)
              }}
              onUploadError={(error: unknown) => {
                alert(`ERROR! ${error}`);
              }}
            />
            {errors.imageB && <p className="text-red-500 text-sm">{errors.imageB}</p>}
          </div>
        </div>
        <Button>Create Thumbnail Test</Button>
      </form>
    </div>
  )
}