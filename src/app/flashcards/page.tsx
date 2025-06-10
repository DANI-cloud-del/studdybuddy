"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/ui/AppSidebar";
import ModeToggle from "@/components/ModeToggle";
import Notification from "@/components/ui/Notification";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, ImageIcon, Text, FlipHorizontal, CheckCircle, Loader2, Sparkles } from "lucide-react";

// Dummy flashcards data
const initialFlashcards = [
  { id: 1, front: "Photosynthesis equation", back: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂" },
  { id: 2, front: "Newton's First Law", back: "An object at rest stays at rest unless acted upon by an external force" },
  { id: 3, front: "Capital of France", back: "Paris" },
];

export default function FlashcardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resourceType, setResourceType] = useState("pdf");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [flashcards, setFlashcards] = useState(initialFlashcards);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFlashcards(initialFlashcards);
    setShowSuccess(true);
    setIsGenerating(false);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent"
              >
                StudyBuddy
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Notification />
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AppSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className="mt-20 p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Generation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
              Flashcard Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Transform your study materials into interactive flashcards
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resource Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resource Type */}
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FlipHorizontal className="w-5 h-5 text-purple-500" />
                  Resource Type
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "pdf", label: "PDF", icon: FileText },
                    { value: "image", label: "Image", icon: ImageIcon },
                    { value: "text", label: "Text", icon: Text },
                  ].map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setResourceType(type.value)}
                      className={`p-4 rounded-lg flex flex-col items-center transition-all ${
                        resourceType === type.value
                          ? "bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-500"
                          : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <type.icon className="w-6 h-6 mb-2 text-blue-500" />
                      <span className="text-sm font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Upload Content
                </h2>
                <label
                  htmlFor="uploadFile"
                  className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 transition-colors cursor-pointer"
                >
                  {preview ? (
                    resourceType === "pdf" ? (
                      <div className="p-4 text-center">
                        <FileText className="w-12 h-12 text-blue-500 mb-2" />
                        <p className="text-sm">{file?.name}</p>
                      </div>
                    ) : (
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-full w-full object-contain rounded-lg"
                      />
                    )
                  ) : (
                    <div className="text-center p-6">
                      <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        <span className="text-blue-500 text-2xl">+</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click to upload {resourceType === "text" ? "text file" : resourceType}
                      </p>
                    </div>
                  )}
                  <input
                    id="uploadFile"
                    type="file"
                    accept={
                      resourceType === "pdf"
                        ? ".pdf"
                        : resourceType === "image"
                        ? "image/*"
                        : "text/plain"
                    }
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Additional Options */}
            <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4">Generation Options</h2>
              <Textarea
                placeholder="Add specific instructions (e.g., 'Focus on key historical dates', 'Include chemical formulas')"
                className="min-h-[100px]"
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <Button
                type="submit"
                className="gap-2 px-8 py-6 text-lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate Flashcards
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Flashcards Preview */}
        {flashcards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="border-t pt-8">
              <h2 className="text-2xl font-bold mb-6">Generated Flashcards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {flashcards.map((card) => (
                  <motion.div
                    key={card.id}
                    whileHover={{ scale: 1.02 }}
                    className="group relative h-48 [perspective:1000px] cursor-pointer"
                  >
                    <div className="relative w-full h-full transition-all duration-300 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                      {/* Front Side */}
                      <div className="absolute inset-0 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center [backface-visibility:hidden]">
                        <p className="text-lg font-medium text-center">{card.front}</p>
                      </div>
                      {/* Back Side */}
                      <div className="absolute inset-0 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-xl shadow-sm border border-blue-200 dark:border-blue-700 flex items-center justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <p className="text-lg text-center">{card.back}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg"
          >
            <CheckCircle className="w-5 h-5" />
            Successfully generated {flashcards.length} flashcards!
          </motion.div>
        )}
      </main>
    </div>
  );
}