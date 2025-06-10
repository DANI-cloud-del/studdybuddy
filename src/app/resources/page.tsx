"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type ResourceType = "Article" | "Video" | "Ebook" | "Practice Tests" | "Cheat Sheet";
type SubjectType = "Mathematics" | "Science" | "History" | "English" | "Computer Science" | "Economics";

interface Resource {
  id: string;
  title: string;
  subject: SubjectType;
  type: ResourceType;
  description: string;
  duration?: string;
  pages?: number;
  videoId?: string; // YouTube video ID for embedded videos
  content?: string; // For articles/ebooks
}

const dummyResources: Resource[] = [
  {
    id: "1",
    title: "Algebra Basics",
    subject: "Mathematics",
    type: "Article",
    description: "Fundamental concepts of Algebra covering equations and expressions.",
    content: "Algebra is the branch of mathematics that deals with symbols and rules..."
  },
  {
    id: "2",
    title: "Newton's Laws Explained",
    subject: "Science",
    type: "Video",
    description: "Visual guide explaining Newton's three laws of motion.",
    duration: "12:45",
    videoId: "k964uNv7mAo"
  },
  {
    id: "3",
    title: "Roman Empire History",
    subject: "History",
    type: "Ebook",
    description: "Comprehensive guide to the rise and fall of the Roman Empire.",
    pages: 120
  },
  {
    id: "4",
    title: "English Grammar Rules",
    subject: "English",
    type: "Cheat Sheet",
    description: "Quick reference for key grammar rules and common mistakes.",
  },
  {
    id: "5",
    title: "Algorithms Visualized",
    subject: "Computer Science",
    type: "Video",
    description: "Animation-based explanation of common algorithms.",
    duration: "18:30",
    videoId: "k0x7XOpdEwI"
  },
  {
    id: "6",
    title: "Calculus Practice Problems",
    subject: "Mathematics",
    type: "Practice Tests",
    description: "Collection of calculus problems with solutions.",
  },
  {
    id: "7",
    title: "Chemistry Reactions Guide",
    subject: "Science",
    type: "Cheat Sheet",
    description: "Common chemical reactions and formulas reference.",
  },
  {
    id: "8",
    title: "World War II Timeline",
    subject: "History",
    type: "Article",
    description: "Detailed timeline of key WWII events.",
    content: "World War II began in 1939 when Germany invaded Poland..."
  },
  {
    id: "9",
    title: "Shakespeare's Plays Analysis",
    subject: "English",
    type: "Ebook",
    description: "In-depth analysis of Shakespeare's most famous works.",
    pages: 95
  },
  {
    id: "10",
    title: "Python Programming Basics",
    subject: "Computer Science",
    type: "Video",
    description: "Beginner-friendly Python tutorial series.",
    duration: "4:26:52",
    videoId: "rfscVS0vtbw"
  },
  {
    id: "11",
    title: "Statistics Practice Tests",
    subject: "Mathematics",
    type: "Practice Tests",
    description: "Probability and statistics problems with explanations.",
  },
  {
    id: "12",
    title: "Biology Concepts Summary",
    subject: "Science",
    type: "Cheat Sheet",
    description: "Essential biology terms and concepts quick reference.",
  },
];

function Page() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | "All">("All");
  const [selectedType, setSelectedType] = useState<ResourceType | "All">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredResources, setFilteredResources] = useState<Resource[]>(dummyResources);
  const [activeResource, setActiveResource] = useState<Resource | null>(null);

  // Filter resources with debounce
  useEffect(() => {
    setIsLoading(true);
    
    const filterTimer = setTimeout(() => {
      const filtered = dummyResources.filter((resource) => {
        const matchesSubject = selectedSubject === "All" || resource.subject === selectedSubject;
        const matchesType = selectedType === "All" || resource.type === selectedType;
        const matchesSearch = searchTerm.trim() === "" || 
          resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesSubject && matchesType && matchesSearch;
      });
      
      setFilteredResources(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(filterTimer);
  }, [selectedSubject, selectedType, searchTerm]);

  // Get icon based on resource type
  const getResourceIcon = (type: ResourceType) => {
    switch(type) {
      case "Article": return "📝";
      case "Video": return "🎬";
      case "Ebook": return "📚";
      case "Practice Tests": return "📝";
      case "Cheat Sheet": return "📋";
      default: return "📄";
    }
  };

  // Format duration for display
  const formatDuration = (duration: string) => {
    const parts = duration.split(':');
    if (parts.length === 2) return `${parts[0]}m ${parts[1]}s`;
    if (parts.length === 3) return `${parts[0]}h ${parts[1]}m ${parts[2]}s`;
    return duration;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Resource Detail Modal */}
      {activeResource && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-xl font-bold">{activeResource.title}</h3>
              <button 
                onClick={() => setActiveResource(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <div className="overflow-y-auto flex-grow p-4">
              {activeResource.type === "Video" && activeResource.videoId ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeResource.videoId}`}
                    className="w-full h-full rounded-lg"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{getResourceIcon(activeResource.type)}</span>
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {activeResource.subject}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          {activeResource.type}
                        </span>
                      </div>
                      {activeResource.duration && (
                        <div className="mt-2 flex items-center text-gray-600 dark:text-gray-300">
                          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {formatDuration(activeResource.duration)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 text-lg">
                    {activeResource.description}
                  </p>
                  
                  {activeResource.content && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className="font-bold mb-2">Content Preview:</h4>
                      <p className="text-gray-600 dark:text-gray-300">{activeResource.content.substring(0, 300)}...</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setActiveResource(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10">
        <Link href="/dashboard" className="text-2xl font-bold hover:underline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          StudyBuddy
        </Link>
        <h1 className="text-2xl font-semibold hidden md:block">Study Resources</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Title and Description */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Knowledge Hub
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover learning resources including videos, articles, ebooks, and practice materials
          </p>
        </div>
        
        {/* Filter Controls */}
        <div className="mb-8 bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Subject Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value as SubjectType | "All")}
                className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="All">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
              </select>
            </div>
            
            {/* Resource Type Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Resource Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ResourceType | "All")}
                className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                <option value="All">All Types</option>
                <option value="Article">Articles</option>
                <option value="Video">Videos</option>
                <option value="Ebook">Ebooks</option>
                <option value="Practice Tests">Practice Tests</option>
                <option value="Cheat Sheet">Cheat Sheets</option>
              </select>
            </div>
            
            {/* Search Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Search Resources</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
                <svg 
                  className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Resources Grid */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {filteredResources.length} Resources Found
            </h2>
            <button 
              onClick={() => {
                setSelectedSubject("All");
                setSelectedType("All");
                setSearchTerm("");
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear Filters
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <p>Finding the best resources...</p>
              </div>
            </div>
          ) : filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <div
                  key={resource.id}
                  className="border border-gray-200 dark:border-gray-700 p-5 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                >
                  <div className="flex items-start mb-3">
                    <span className="text-2xl mr-3">{getResourceIcon(resource.type)}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{resource.title}</h3>
                      <div className="flex items-center mt-1">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mr-2">
                          {resource.subject}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          {resource.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {resource.description}
                  </p>
                  
                  <div className="mt-auto pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <button 
                      onClick={() => setActiveResource(resource)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm flex items-center transition-colors"
                    >
                      {resource.type === "Video" ? "Watch Video" : "View Details"}
                      <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {resource.duration && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {formatDuration(resource.duration)}
                      </span>
                    )}
                    
                    {resource.pages && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                        </svg>
                        {resource.pages} pages
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No resources found</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking for
              </p>
              <button 
                onClick={() => {
                  setSelectedSubject("All");
                  setSelectedType("All");
                  setSearchTerm("");
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Featured Resources */}
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Featured Resources</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-blue-200 dark:border-blue-700 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/30 dark:to-gray-800">
              <div className="p-5">
                <div className="flex items-start">
                  <span className="text-4xl mr-4">🐍</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Python Programming Basics</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Complete beginner's guide to Python programming with practical examples and exercises
                    </p>
                    <button 
                      onClick={() => setActiveResource(dummyResources[9])}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      Start Learning
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-purple-200 dark:border-purple-700 rounded-xl overflow-hidden bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/30 dark:to-gray-800">
              <div className="p-5">
                <div className="flex items-start">
                  <span className="text-4xl mr-4">📚</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Mathematics Mastery</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Comprehensive collection of math resources from algebra to calculus
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedSubject("Mathematics");
                        setSelectedType("All");
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
                    >
                      Explore Math Resources
                      <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Page;