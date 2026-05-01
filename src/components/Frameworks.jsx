import { OrbitingCircles } from "./OrbitingCircles";
import React, { useMemo } from "react";

// ─── Icon images lazy-loaded so 32 SVGs don't block initial render ──────────
const Icon = React.memo(({ src }) => (
  <img
    src={src}
    loading="lazy"
    decoding="async"
    className="duration-200 rounded-sm hover:scale-110"
    alt=""
  />
));
Icon.displayName = "Icon";

export const Frameworks = React.memo(function Frameworks() {
  const skills = [
    "auth0", "blazor", "cplusplus", "csharp", "css3",
    "dotnet", "dotnetcore", "git", "html5", "javascript",
    "microsoft", "react", "sqlite", "tailwindcss", "vitejs", "wordpress",
  ];

  // ─── Fix: was calling skills.reverse() in render — mutates original array!
  //     Use a stable memoised copy instead ───────────────────────────────────
  const skillsForward  = useMemo(() => skills, []);           // outer orbit
  const skillsReversed = useMemo(() => [...skills].reverse(), []); // inner orbit

  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skillsForward.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skillsReversed.map((skill, index) => (
          <Icon key={index} src={`assets/logos/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
});
