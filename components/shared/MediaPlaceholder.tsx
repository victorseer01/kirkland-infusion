import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Aspect = "video" | "wide" | "square" | "portrait" | "tall";
type Tone = "primary" | "accent" | "navy" | "coral";

const ASPECT: Record<Aspect, string> = {
  video: "aspect-video",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  tall: "aspect-[4/5]",
};

const TONE: Record<Tone, string> = {
  primary: "from-primary via-primary-dark to-navy",
  accent: "from-accent via-primary to-primary-dark",
  navy: "from-navy via-primary-dark to-primary",
  coral: "from-coral via-coral-dark to-primary-dark",
};

export function MediaPlaceholder({
  caption,
  src,
  alt,
  aspect = "video",
  tone = "primary",
  className,
}: {
  caption?: string;
  src?: string;
  alt?: string;
  aspect?: Aspect;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-gradient-to-br",
        ASPECT[aspect],
        TONE[tone],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.95) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <ImageIcon
              className="h-10 w-10 text-white/50"
              strokeWidth={1.5}
              aria-hidden
            />
          </div>
          {caption && (
            <p className="absolute inset-x-3 bottom-3 rounded-md bg-black/30 px-2.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
              {caption}
            </p>
          )}
        </>
      )}
    </div>
  );
}
