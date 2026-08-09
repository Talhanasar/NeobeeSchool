import Image from "next/image";
import type { Photo } from "./photos";

export function PhotoFrame({
  photo,
  className,
  priority,
  sizes,
}: {
  photo: Photo;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (photo.src) {
    return (
      <div
        className={`photo-frame ${className ?? ""}`.trim()}
        style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={`photo-frame photo-frame-empty ${className ?? ""}`.trim()}
      role="img"
      aria-label={photo.alt}
      style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
    >
      <svg viewBox="0 0 100 72" fill="none" aria-hidden="true">
        <g fill="currentColor">
          <path
            d="M38 0 L62 0 L74 18 L62 36 L38 36 L26 18 Z"
            opacity="0.35"
          />
          <path
            d="M14 18 L38 18 L50 36 L38 54 L14 54 L2 36 Z"
            opacity="0.45"
          />
          <path
            d="M38 18 L62 18 L74 36 L62 54 L38 54 L26 36 Z"
            opacity="0.6"
          />
          <path
            d="M62 18 L86 18 L98 36 L86 54 L62 54 L50 36 Z"
            opacity="0.45"
          />
          <path
            d="M38 36 L62 36 L74 54 L62 72 L38 72 L26 54 Z"
            opacity="0.35"
          />
        </g>
      </svg>
    </div>
  );
}
