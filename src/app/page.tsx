"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { IconCloud } from "@/components/magicui/icon-cloud";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }

    if (isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, router]);

  return (
    
    <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden">
      {/* Render the Equation Cloud (No extra div wrapping) */}
      <IconCloud />

      {/* StudyBuddy Button with White Text */}
      <button
        className="absolute z-10 text-5xl font-bold text-white cursor-pointer hover:scale-105 transition px-4 py-2"
        style={{
          animation: isMobile
            ? "floatMobile 6s infinite alternate ease-in-out"
            : "waveDesktop 8s infinite alternate ease-in-out",
        }}
        onClick={() => router.push("/dashboard")}
      >
        StudyBuddy
      </button>

      {/* CSS Animations for motion */}
      <style jsx>{`
        @keyframes waveDesktop {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          50% { transform: translate(30px, -20px) rotate(5deg); }
          100% { transform: translate(-30px, 20px) rotate(-5deg); }
        }

        @keyframes floatMobile {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      {/* 🔹 Apply global overflow fix WITHOUT moving elements */}
      <style jsx global>{`
        html, body {
          overflow: hidden;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

