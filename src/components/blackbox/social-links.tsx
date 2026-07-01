"use client";

import { type SocialLinks } from "./content";

const SOCIAL_META: { key: keyof SocialLinks; label: string; icon: string; placeholder: string }[] = [
  { key: "instagram", label: "Instagram", icon: "photo_camera", placeholder: "https://instagram.com/blackboxapparel" },
  { key: "tiktok", label: "TikTok", icon: "music_note", placeholder: "https://tiktok.com/@blackboxapparel" },
  { key: "facebook", label: "Facebook", icon: "thumb_up", placeholder: "https://facebook.com/blackboxapparel" },
  { key: "youtube", label: "YouTube", icon: "smart_display", placeholder: "https://youtube.com/@blackboxapparel" },
  { key: "twitter", label: "X (Twitter)", icon: "close", placeholder: "https://x.com/blackboxapparel" },
  { key: "linkedin", label: "LinkedIn", icon: "work", placeholder: "https://linkedin.com/company/blackboxapparel" },
  { key: "pinterest", label: "Pinterest", icon: "push_pin", placeholder: "https://pinterest.com/blackboxapparel" },
  { key: "threads", label: "Threads", icon: "alternate_email", placeholder: "https://threads.net/@blackboxapparel" },
];

/**
 * Renders social icons (only those with non-empty URLs).
 * Used in footer, header, hero, etc.
 */
export function SocialLinksDisplay({
  social,
  variant = "light",
  size = "md",
}: {
  social: SocialLinks;
  variant?: "light" | "dark"; // light = dark bg with white icons, dark = light bg with black icons
  size?: "sm" | "md" | "lg";
}) {
  const active = SOCIAL_META.filter((m) => social[m.key]?.trim().length > 0);
  if (active.length === 0) return null;

  const sizeClass = size === "sm" ? "w-8 h-8" : size === "lg" ? "w-12 h-12" : "w-10 h-10";
  const iconSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";

  const borderClass = variant === "light"
    ? "border-white/20 hover:border-[#25D366] hover:bg-[#25D366]/10"
    : "border-[#c4c7c7] hover:border-black hover:bg-black hover:text-white";

  const iconColor = variant === "light" ? "text-white group-hover:text-[#25D366]" : "text-black";

  return (
    <div className="flex flex-wrap gap-3">
      {active.map((m) => (
        <a
          key={m.key}
          href={social[m.key]}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={m.label}
          title={m.label}
          className={`${sizeClass} border ${borderClass} flex items-center justify-center transition-all group`}
        >
          <span className={`material-symbols-outlined ${iconSize} ${iconColor}`}>
            {m.icon}
          </span>
        </a>
      ))}
    </div>
  );
}

/**
 * Inline list of social links (no boxes, just text+icon).
 */
export function SocialLinksInline({ social }: { social: SocialLinks }) {
  const active = SOCIAL_META.filter((m) => social[m.key]?.trim().length > 0);
  if (active.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-4">
      {active.map((m) => (
        <a
          key={m.key}
          href={social[m.key]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-label-caps uppercase text-[#444748] hover:text-black transition-colors group"
        >
          <span className="material-symbols-outlined text-base group-hover:text-[#25D366] transition-colors">
            {m.icon}
          </span>
          {m.label}
        </a>
      ))}
    </div>
  );
}

export { SOCIAL_META };
