import Image from "next/image";
import React from "react";

import { getPlaiceholder } from "plaiceholder";

interface Props {
  src: string;
  className: string;
  alt: string;
  loading?: "eager" | "lazy";
}

export default async function BlurImageServer({
  className,
  src,
  alt,
  loading,
}: Props) {
  const buffer = await fetch(src).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });

  const { base64 } = await getPlaiceholder(buffer);

  return (
    <Image src={src} fill alt="image" placeholder="blur" blurDataURL={base64} />
  );
}
