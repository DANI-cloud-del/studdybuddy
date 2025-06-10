"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, useUser } from "@clerk/nextjs";
import { IconCloud } from "@/components/magicui/icon-cloud";
import { LandingNavbar } from "@/components/ui/LandingNavbar";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }

    if (isSignedIn) {
      router.push("/dashboard");
    }
    
    const timer = setTimeout(() => setShowLandingPage(true), 3000);
    return () => clearTimeout(timer);
  }, [isSignedIn, router]);

  const features = [
    {
      title: "📖 AI Tutor",
      description: "Get personalized help on any topic with real-time AI assistance.",
      icon: "🤖"
    },
    {
      title: "⏳ Pomodoro Timer",
      description: "Boost focus with customizable study sessions and breaks.",
      icon: "⏱️"
    },
    {
      title: "📝 Flashcards",
      description: "Create and review interactive flashcards for efficient memorization.",
      icon: "📇"
    },
    {
      title: "📅 Study Calendar",
      description: "Organize your study schedule with intelligent task management.",
      icon: "🗓️"
    },
    {
      title: "🧠 Practice Tests",
      description: "Generate custom quizzes to test your knowledge on any subject.",
      icon: "📝"
    },
    {
      title: "📚 Resource Library",
      description: "Access curated study materials and organized notes.",
      icon: "📚"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center overflow-hidden">
      {!showLandingPage ? (
        <>
          <IconCloud />
          <motion.div
            className="absolute z-10 text-5xl font-bold cursor-pointer text-blue-600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            StudyBuddy
          </motion.div>
        </>
      ) : (
        <>
          <LandingNavbar />
          
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center py-16 text-center px-4">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Revolutionize Your Study Habits
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              The AI-powered study companion that adapts to your learning style for maximum efficiency
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold text-lg shadow-md">
                  Get Started - It's Free
                </button>
              </SignInButton>
            </motion.div>
          </section>

          {/* Problem/Solution Section */}
          <section className="py-16 bg-blue-50 w-full">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  <h2 className="text-3xl font-bold mb-6 text-red-600">The Problem</h2>
                  <p className="text-lg mb-4">
                    Students struggle with optimal time management, especially during exam season. 
                    Existing tools are generic and don't address individual learning needs.
                  </p>
                  <p className="text-lg">
                    Many students find it difficult to organize their study schedules in the final hours before exams, 
                    leading to stress and inefficient preparation.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-8 rounded-xl shadow-lg"
                >
                  <h2 className="text-3xl font-bold mb-6 text-green-600">Our Solution</h2>
                  <p className="text-lg mb-4">
                    Study Buddy is an AI scheduler that adapts to your learning tempo. It helps with concentration using 
                    Pomodoro timers and complements learning through flashcards and personal tutoring.
                  </p>
                  <p className="text-lg">
                    Our personalized approach reduces stress and heightens focus, acting as a virtual study partner 
                    that helps you manage time effectively.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 max-w-6xl w-full">
            <motion.h2 
              className="text-3xl font-bold text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Everything You Need to Succeed
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 rounded-xl bg-white shadow-lg border border-gray-200 hover:border-blue-300 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 bg-gray-50 w-full px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2 
                className="text-3xl font-bold text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                Transform Your Study Routine in 3 Steps
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Set Your Goals", description: "Define what you want to achieve and when" },
                  { step: "2", title: "Plan Your Sessions", description: "Use our smart calendar to schedule study time" },
                  { step: "3", title: "Track & Improve", description: "Monitor progress with analytics and insights" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-8 bg-white rounded-xl border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 px-4 text-center bg-blue-600 text-white">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Ready to Boost Your Grades?
            </motion.h2>
            <motion.p 
              className="text-xl max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {/* Join students who are already acing their exams with StudyBuddy */}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              
              <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
                <button className="px-10 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all font-bold text-xl shadow-lg">
                  Create Free Account
                </button>
              </SignInButton>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="w-full py-10 border-t border-gray-200 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <div className="text-2xl font-bold text-blue-600">StudyBuddy</div>
                  <p className="text-gray-600 mt-2">Your AI-powered study companion</p>
                  <p className="text-gray-500 mt-2 text-sm">
                    Amal Jyothi College of Engineering, Kanjirappally
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="font-semibold mb-3">Team</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>Amal Jose</li>
                      <li>Dani Cherian</li>
                      <li>Joel Jose</li>
                      <li>Nihal Varghese</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Features</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>AI Tutor</li>
                      <li>Study Timer</li>
                      <li>Flashcards</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Resources</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>Blog</li>
                      <li>Tutorials</li>
                      <li>Study Guides</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
                <p>© 2025 StudyBuddy. All rights reserved.</p>
                <p className="mt-2">Department of IT and AI</p>
              </div>
            </div>
          </footer>
        </>
      )}

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
    </div>
  );
}