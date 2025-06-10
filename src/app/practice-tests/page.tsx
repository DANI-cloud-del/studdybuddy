"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppSidebar } from "@/components/ui/AppSidebar";
import ModeToggle from "@/components/ModeToggle";
import Notification from "@/components/ui/Notification";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// ------------------------
// Enhanced MCQ Generator Component
// ------------------------
function MCQGenerator() {
  const [topic, setTopic] = useState("");
  const [questionType, setQuestionType] = useState("conceptual");
  const [difficulty, setDifficulty] = useState("medium");
  const [numQuestions, setNumQuestions] = useState(5);
  const [includePreviousYear, setIncludePreviousYear] = useState(true);
  const [includeImages, setIncludeImages] = useState(false);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  const handleGenerateMCQ = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate generated questions
    const mockQuestions = Array.from({ length: numQuestions }, (_, i) => ({
      id: i + 1,
      question: `Sample question about ${topic} (${difficulty})`,
      choices: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: "This is the explanation for the correct answer."
    }));
    setGeneratedQuestions(mockQuestions);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>MCQ Generator</CardTitle>
        <CardDescription>Create customized multiple choice questions</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGenerateMCQ} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="topic">Topic/Subject</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="E.g. Quantum Mechanics, World History"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Question Type</Label>
              <Select value={questionType} onValueChange={setQuestionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="conceptual">Conceptual</SelectItem>
                  <SelectItem value="problem-solving">Problem Solving</SelectItem>
                  <SelectItem value="application">Application Based</SelectItem>
                  <SelectItem value="memory">Memory Recall</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty Level</Label>
              <RadioGroup
                value={difficulty}
                onValueChange={setDifficulty}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easy" id="easy" />
                  <Label htmlFor="easy">Easy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hard" id="hard" />
                  <Label htmlFor="hard">Hard</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numQuestions">
                Number of Questions: {numQuestions}
              </Label>
              <Slider
                id="numQuestions"
                defaultValue={[numQuestions]}
                max={20}
                min={1}
                step={1}
                onValueChange={(value) => setNumQuestions(value[0])}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="previousYear"
                checked={includePreviousYear}
                onCheckedChange={setIncludePreviousYear}
              />
              <Label htmlFor="previousYear">Include Previous Year Questions</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="includeImages"
                checked={includeImages}
                onCheckedChange={setIncludeImages}
              />
              <Label htmlFor="includeImages">Include Diagrams/Images</Label>
            </div>
          </div>

          <Button type="submit" className="w-full md:w-auto">
            Generate MCQs
          </Button>
        </form>

        {generatedQuestions.length > 0 && (
          <div className="mt-8 space-y-6">
            <h3 className="font-semibold text-lg">Generated Questions</h3>
            <div className="space-y-4">
              {generatedQuestions.map((q) => (
                <div key={q.id} className="p-4 border rounded-lg">
                  <p className="font-medium">{q.id}. {q.question}</p>
                  <div className="mt-2 space-y-2">
                    {q.choices.map((choice: string, i: number) => (
                      <div key={i} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          id={`q${q.id}-opt${i}`}
                          className="h-4 w-4"
                        />
                        <label htmlFor={`q${q.id}-opt${i}`}>{choice}</label>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <p className="text-sm font-medium">Explanation:</p>
                    <p className="text-sm">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full">
              Export as PDF
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------------------------------
// Enhanced Question Paper Generator Component
// ---------------------------------
function QuestionPaperGenerator() {
  const [subject, setSubject] = useState("");
  const [examType, setExamType] = useState("midterm");
  const [totalMarks, setTotalMarks] = useState(100);
  const [duration, setDuration] = useState(180);
  const [sections, setSections] = useState([
    { type: "mcq", count: 20, marks: 1 },
    { type: "short", count: 5, marks: 4 },
    { type: "long", count: 3, marks: 10 }
  ]);
  const [includeAnswerKey, setIncludeAnswerKey] = useState(false);
  const [instructions, setInstructions] = useState("");

  const handleGeneratePaper = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate paper logic here
    console.log({
      subject,
      examType,
      totalMarks,
      duration,
      sections,
      includeAnswerKey,
      instructions
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Question Paper Generator</CardTitle>
        <CardDescription>Create customized exam papers with multiple sections</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGeneratePaper} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="E.g. Mathematics, Physics"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Exam Type</Label>
              <Select value={examType} onValueChange={setExamType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="midterm">Midterm Exam</SelectItem>
                  <SelectItem value="final">Final Exam</SelectItem>
                  <SelectItem value="practice">Practice Test</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalMarks">Total Marks: {totalMarks}</Label>
              <Slider
                id="totalMarks"
                defaultValue={[totalMarks]}
                max={100}
                min={10}
                step={5}
                onValueChange={(value) => setTotalMarks(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes): {duration}</Label>
              <Slider
                id="duration"
                defaultValue={[duration]}
                max={260}
                min={30}
                step={15}
                onValueChange={(value) => setDuration(value[0])}
              />
            </div>

            {/* <div className="flex items-center space-x-2 md:col-span-2">
              <Switch
                id="answerKey"
                checked={includeAnswerKey}
                onCheckedChange={setIncludeAnswerKey}
              />
              <Label htmlFor="answerKey">Include Answer Key</Label>
            </div> */}
          </div>

          <div className="space-y-4">
            <Label>Paper Sections</Label>
            <div className="space-y-4 border rounded-lg p-4">
              {sections.map((section, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label>Section Type</Label>
                    <Select
                      value={section.type}
                      onValueChange={(value) => {
                        const newSections = [...sections];
                        newSections[index].type = value;
                        setSections(newSections);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mcq">MCQs</SelectItem>
                        <SelectItem value="short">Short Answer</SelectItem>
                        <SelectItem value="long">Long Answer</SelectItem>
                        <SelectItem value="truefalse">True/False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Number of Questions</Label>
                    <Input
                      type="number"
                      value={section.count}
                      onChange={(e) => {
                        const newSections = [...sections];
                        newSections[index].count = parseInt(e.target.value);
                        setSections(newSections);
                      }}
                    />
                  </div>
                  <div>
                    <Label>Marks per Question</Label>
                    <Input
                      type="number"
                      value={section.marks}
                      onChange={(e) => {
                        const newSections = [...sections];
                        newSections[index].marks = parseInt(e.target.value);
                        setSections(newSections);
                      }}
                    />
                  </div>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setSections([...sections, { type: "mcq", count: 5, marks: 1 }])
                }
              >
                Add Section
              </Button>
            </div>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder=""
            />
          </div> */}

          <Button type="submit" className="w-full md:w-auto">
            Generate Question Paper
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

// -------------------------------------------
// Test Correction & Personalized Feedback Component
// -------------------------------------------
function TestCorrectionSection() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleTestCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFeedback(
      `Your ${uploadedFile.name} has been analyzed. Score: 87%. Key areas to improve: 
      - Algebraic manipulations (questions 3, 7)
      - Geometric proofs (question 12)
      - Time management (completed 18/20 questions)`
    );
    setIsLoading(false);
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Test Correction & Feedback</CardTitle>
        <CardDescription>Upload your test for detailed analysis and personalized feedback</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleTestCorrection} className="space-y-6">
          <div className="space-y-2">
            <Label>Upload Your Test</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                onChange={handleFileChange}
                className="max-w-md"
              />
              {uploadedFile && (
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {uploadedFile.name}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="showWork" defaultChecked />
            <Label htmlFor="showWork">Show step-by-step corrections</Label>
          </div>

          <Button type="submit" disabled={!uploadedFile || isLoading}>
            {isLoading ? "Analyzing..." : "Analyze Test"}
          </Button>
        </form>

        {feedback && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              Detailed Feedback
            </h3>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {feedback.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ------------------------------
// Practice Tests Page Component
// ------------------------------
export default function PracticeTestsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent hover:underline"
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

      {/* Main Content */}
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Practice Test Center
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Create customized practice materials and get intelligent feedback on your work
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <MCQGenerator />
          <QuestionPaperGenerator />
          <TestCorrectionSection />
        </div>
      </main>
    </div>
  );
}