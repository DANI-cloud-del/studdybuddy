"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";

export default function GoldenParticles() {
  const [options, setOptions] = useState<ISourceOptions | null>(null);

  useEffect(() => {
    setOptions({
      fullScreen: { enable: true },
      particles: {
        number: { value: 200 },
        color: { value: "#FFD700" },
        shape: { type: "circle" },
        opacity: { value: 1 },
        size: { value: { min: 10, max: 15 } },
        move: { enable: true, speed: 2.5, direction: "none", outModes: "out" },
      },
    });
  }, []);

  return options ? <Particles id="golden-particles" options={options} /> : null;
}
