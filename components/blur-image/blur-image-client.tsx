"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  src: string;
  className?: string;
  loaderClassName?: string;
  alt: string;
  loading?: "eager" | "lazy";
}

export default function BlurImageClient({
  alt,
  className,
  loaderClassName,
  src,
  loading,
}: Props) {
  const [base64, setBase64] = useState<string | null>(null);

  async function fetchImage() {
    const response = await fetch(src);
    const blob = await response.blob();

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result as string);
    };
    reader.readAsDataURL(blob);
  }

  useEffect(() => {
    fetchImage();
  }, []);

  if (base64)
    return (
      <Image
        src={src}
        fill
        alt={alt}
        className={className}
        placeholder="blur"
        blurDataURL={base64}
        loading={loading}
      />
    );
  else return <Skeleton className={loaderClassName} />;
}
