"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ModeToggle from "@/components/ModeToggle";
import Notification from "@/components/ui/Notification";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Paperclip, Send, Users, Plus, FileText, FileImage, FileVideo, File, Download, Check, X, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

// ------------------------
// Type Definitions
// ------------------------
type UserRole = "member" | "admin" | "pending";
type ResourceType = "pdf" | "image" | "video" | "document" | "other";

interface ChatListItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
  online: boolean;
  isGroup: boolean;
  members?: string[];
  role?: UserRole;
}

export interface ChatMessageType {
  id: string;
  sender: "me" | "friend" | "system";
  content: string;
  type: "text" | "file";
  timestamp: Date;
  fileType?: ResourceType;
  fileName?: string;
  fileSize?: string;
}

interface ResourceItem {
  id: string;
  name: string;
  type: ResourceType;
  size: string;
  uploadedBy: string;
  timestamp: Date;
}

// ------------------------
// ChatListSidebar Component
// ------------------------
const ChatListSidebar = ({
  chats,
  selectedChatId,
  setSelectedChatId,
  setShowCreateGroup
}: {
  chats: ChatListItem[];
  selectedChatId: string;
  setSelectedChatId: (id: string) => void;
  setShowCreateGroup: (show: boolean) => void;
}) => (
  <aside className="w-full md:w-80 lg:w-96 border-r dark:border-gray-700 h-[calc(100vh-5rem)] overflow-y-auto">
    <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
      <h2 className="text-xl font-semibold">Chats</h2>
      <Button 
        onClick={() => setShowCreateGroup(true)}
        size="sm"
        className="gap-1"
      >
        <Users className="w-4 h-4" /> Create Group
      </Button>
    </div>
    <div className="divide-y dark:divide-gray-700">
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => setSelectedChatId(chat.id)}
          className={`w-full text-left p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
            chat.id === selectedChatId ? "bg-blue-50 dark:bg-blue-900/30" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                chat.isGroup 
                  ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                  : "bg-gray-200 dark:bg-gray-600"
              }`}>
                {chat.isGroup ? (
                  <Users className="w-6 h-6" />
                ) : chat.avatar ? (
                  <img src={chat.avatar} alt={chat.name} className="rounded-full w-full h-full" />
                ) : (
                  <span className="text-lg font-medium">
                    {chat.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {!chat.isGroup && chat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-medium truncate">{chat.name}</h3>
                {chat.unread > 0 && (
                  <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs min-w-[1.5rem] text-center">
                    {chat.unread}
                  </span>
                )}
                {chat.role === "pending" && (
                  <span className="bg-yellow-500 text-white rounded-full px-2 py-1 text-xs">
                    Pending
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {chat.lastMessage}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {format(chat.timestamp, "HH:mm")}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  </aside>
);

// ------------------------
// ChatMessage Component
// ------------------------
const ChatMessage = ({ message }: { message: ChatMessageType }) => {
  const getFileIcon = (type?: ResourceType) => {
    switch(type) {
      case "pdf": return <FileText className="w-5 h-5 text-red-500" />;
      case "image": return <FileImage className="w-5 h-5 text-green-500" />;
      case "video": return <FileVideo className="w-5 h-5 text-purple-500" />;
      case "document": return <FileText className="w-5 h-5 text-blue-500" />;
      default: return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: message.sender === "me" ? 20 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[85%] p-4 rounded-2xl ${
          message.sender === "me"
            ? "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100"
            : message.sender === "system"
            ? "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        }`}
      >
        {message.type === "text" ? (
          <p className="break-words">{message.content}</p>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {getFileIcon(message.fileType)}
              <div className="flex-1">
                <p className="font-medium truncate">{message.fileName || message.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{message.fileSize}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-1 mt-2">
              <Download className="w-4 h-4" /> Download
            </Button>
          </div>
        )}
        <p className={`mt-2 text-xs ${
          message.sender === "system" 
            ? "text-gray-500 dark:text-gray-400" 
            : "text-blue-600 dark:text-blue-300"
        }`}>
          {format(message.timestamp, "HH:mm")}
        </p>
      </div>
    </motion.div>
  );
};

// ------------------------
// CreateGroupModal Component
// ------------------------
const CreateGroupModal = ({ 
  show, 
  setShow, 
  createNewGroup 
}: { 
  show: boolean; 
  setShow: (show: boolean) => void; 
  createNewGroup: (name: string) => void;
}) => {
  const [groupName, setGroupName] = useState("");

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Create Study Group</h3>
          <button 
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Group Name</label>
            <input
              type="text"
              placeholder="e.g., Calculus Study Group"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Add Members</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Sarah", "Alex", "Jamie", "Taylor"].map((name) => (
                <div 
                  key={name}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full"
                >
                  <span>{name}</span>
                  <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                    <Plus className="w-4 h-4 rotate-45" />
                  </button>
                </div>
              ))}
              <button className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>
          
          <Button 
            onClick={() => {
              if (groupName.trim()) {
                createNewGroup(groupName);
                setShow(false);
              }
            }}
            className="w-full"
            disabled={!groupName.trim()}
          >
            Create Group
          </Button>
        </div>
      </div>
    </div>
  );
};

// ------------------------
// ResourcesModal Component
// ------------------------
const ResourcesModal = ({ 
  show, 
  setShow, 
  resources, 
  shareResource 
}: { 
  show: boolean; 
  setShow: (show: boolean) => void; 
  resources: ResourceItem[];
  shareResource: (resource: ResourceItem) => void;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h3 className="text-xl font-bold">Shared Resources</h3>
          <button 
            onClick={() => setShow(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="overflow-y-auto flex-grow p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {resources.map((resource) => (
              <div 
                key={resource.id}
                className="border dark:border-gray-700 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    {resource.type === "pdf" && <FileText className="w-6 h-6 text-red-500" />}
                    {resource.type === "image" && <FileImage className="w-6 h-6 text-green-500" />}
                    {resource.type === "video" && <FileVideo className="w-6 h-6 text-purple-500" />}
                    {resource.type === "document" && <FileText className="w-6 h-6 text-blue-500" />}
                    {resource.type === "other" && <File className="w-6 h-6 text-gray-500" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium truncate">{resource.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{resource.size}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {format(resource.timestamp, "MMM d, yyyy")}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Shared by {resource.uploadedBy}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-1"
                  >
                    <Download className="w-4 h-4" /> Download
                  </Button>
                  <Button 
                    size="sm" 
                    className="gap-1"
                    onClick={() => shareResource(resource)}
                  >
                    <Send className="w-4 h-4" /> Share in Chat
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------
// ChatPage Component
// ------------------------
export default function ChatPage() {
  // Dummy chat list data
  const [chats, setChats] = useState<ChatListItem[]>([
    {
      id: "1",
      name: "John Doe",
      avatar: "",
      lastMessage: "Hey there! How's everything?",
      timestamp: new Date(Date.now() - 3600000),
      unread: 0,
      online: true,
      isGroup: false
    },
    {
      id: "2",
      name: "Math Study Group",
      avatar: "",
      lastMessage: "Let's meet tomorrow at 2 PM",
      timestamp: new Date(Date.now() - 7200000),
      unread: 3,
      online: false,
      isGroup: true,
      members: ["You", "John", "Sarah", "Alex"],
      role: "admin"
    },
    {
      id: "3",
      name: "Computer Science Group",
      avatar: "",
      lastMessage: "Sarah shared a resource",
      timestamp: new Date(Date.now() - 86400000),
      unread: 0,
      online: false,
      isGroup: true,
      members: ["You", "Sarah", "Taylor", "Jamie"],
      role: "member"
    },
    {
      id: "4",
      name: "Physics Study Group",
      avatar: "",
      lastMessage: "Request to join pending",
      timestamp: new Date(Date.now() - 172800000),
      unread: 0,
      online: false,
      isGroup: true,
      role: "pending"
    },
    {
      id: "5",
      name: "Jane Smith",
      avatar: "",
      lastMessage: "Thanks for the notes!",
      timestamp: new Date(Date.now() - 172800000),
      unread: 0,
      online: true,
      isGroup: false
    },
  ]);
  
  const [selectedChatId, setSelectedChatId] = useState("1");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Different messages for each chat
  const [messages, setMessages] = useState<Record<string, ChatMessageType[]>>({
    "1": [
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "Hey there! How's the calculus homework going?",
        type: "text",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: crypto.randomUUID(),
        sender: "me",
        content: "I'm stuck on problem 7. Do you understand it?",
        type: "text",
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "I just solved it. I can share my solution with you.",
        type: "text",
        timestamp: new Date(Date.now() - 900000),
      },
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "calculus-solution.pdf",
        type: "file",
        timestamp: new Date(Date.now() - 900000),
        fileType: "pdf",
        fileName: "calculus-solution.pdf",
        fileSize: "2.4 MB"
      },
    ],
    "2": [
      {
        id: crypto.randomUUID(),
        sender: "system",
        content: "You created the group",
        type: "text",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: crypto.randomUUID(),
        sender: "system",
        content: "John joined the group",
        type: "text",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "What time works for everyone to meet?",
        type: "text",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: crypto.randomUUID(),
        sender: "me",
        content: "I'm free after 2 PM tomorrow",
        type: "text",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "Let's meet at 2:30 PM in the library study room",
        type: "text",
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: crypto.randomUUID(),
        sender: "me",
        content: "study-notes.docx",
        type: "file",
        timestamp: new Date(Date.now() - 900000),
        fileType: "document",
        fileName: "study-notes.docx",
        fileSize: "1.2 MB"
      },
    ],
    "3": [
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "Has anyone finished the programming assignment?",
        type: "text",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: crypto.randomUUID(),
        sender: "me",
        content: "I'm working on it now. Stuck on question 3",
        type: "text",
        timestamp: new Date(Date.now() - 7200000),
      },
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "I found this great tutorial that might help",
        type: "text",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "python-tutorial.mp4",
        type: "file",
        timestamp: new Date(Date.now() - 1800000),
        fileType: "video",
        fileName: "python-tutorial.mp4",
        fileSize: "45.7 MB"
      },
      {
        id: crypto.randomUUID(),
        sender: "me",
        content: "This is perfect! Thanks for sharing",
        type: "text",
        timestamp: new Date(Date.now() - 900000),
      },
    ],
    "4": [
      {
        id: crypto.randomUUID(),
        sender: "system",
        content: "Your request to join has been sent to the group admins",
        type: "text",
        timestamp: new Date(Date.now() - 172800000),
      },
    ],
    "5": [
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "Do you have the history notes from yesterday?",
        type: "text",
        timestamp: new Date(Date.now() - 172800000),
      },
      {
        id: crypto.randomUUID(),
        sender: "me",
        content: "Yes, I'll share them with you now",
        type: "text",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: crypto.randomUUID(),
        sender: "me",
        content: "history-notes.pdf",
        type: "file",
        timestamp: new Date(Date.now() - 86400000),
        fileType: "pdf",
        fileName: "history-notes.pdf",
        fileSize: "3.1 MB"
      },
      {
        id: crypto.randomUUID(),
        sender: "friend",
        content: "Thanks! These are super helpful!",
        type: "text",
        timestamp: new Date(Date.now() - 43200000),
      },
    ]
  });
  
  const [newMessage, setNewMessage] = useState("");
  
  // Dummy resources data
  const resources: ResourceItem[] = [
    {
      id: "1",
      name: "Calculus Textbook",
      type: "pdf",
      size: "15.2 MB",
      uploadedBy: "John Doe",
      timestamp: new Date(Date.now() - 86400000)
    },
    {
      id: "2",
      name: "Physics Formula Sheet",
      type: "pdf",
      size: "1.8 MB",
      uploadedBy: "Jane Smith",
      timestamp: new Date(Date.now() - 172800000)
    },
    {
      id: "3",
      name: "Programming Concepts Cheat Sheet",
      type: "document",
      size: "0.8 MB",
      uploadedBy: "You",
      timestamp: new Date(Date.now() - 259200000)
    },
    {
      id: "4",
      name: "Chemistry Lab Results",
      type: "document",
      size: "2.3 MB",
      uploadedBy: "Alex Johnson",
      timestamp: new Date(Date.now() - 345600000)
    }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages[selectedChatId]]);

  // Simulate typing indicator
  useEffect(() => {
    if (selectedChatId && !chats.find(chat => chat.id === selectedChatId)?.isGroup) {
      const typingTimer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 2000);
      }, 3000);
      
      return () => clearTimeout(typingTimer);
    }
  }, [messages[selectedChatId], selectedChatId]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 50 * 1024 * 1024) {
        alert("File size should be less than 50MB");
        return;
      }
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handles sending a new message
  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date();
    let newMessages: ChatMessageType[] = [];
    
    if (selectedFile) {
      const fileType = selectedFile.type.includes("image") ? "image" : 
                      selectedFile.type.includes("pdf") ? "pdf" :
                      selectedFile.type.includes("video") ? "video" :
                      selectedFile.type.includes("text") || 
                      selectedFile.type.includes("document") ? "document" : "other";
      
      newMessages.push({
        id: crypto.randomUUID(),
        sender: "me",
        content: selectedFile.name,
        type: "file",
        timestamp: now,
        fileType,
        fileName: selectedFile.name,
        fileSize: formatFileSize(selectedFile.size)
      });
      setSelectedFile(null);
    }
    
    if (newMessage.trim()) {
      newMessages.push({
        id: crypto.randomUUID(),
        sender: "me",
        content: newMessage.trim(),
        type: "text",
        timestamp: now,
      });
    }
    
    if (newMessages.length > 0) {
      setMessages(prev => ({
        ...prev,
        [selectedChatId]: [...(prev[selectedChatId] || []), ...newMessages]
      }));
      setNewMessage("");
    }
  };

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Create a new group
  const createNewGroup = (name: string) => {
    const newChatId = crypto.randomUUID();
    const newChat: ChatListItem = {
      id: newChatId,
      name,
      avatar: "",
      lastMessage: "Group created",
      timestamp: new Date(),
      unread: 0,
      online: false,
      isGroup: true,
      members: ["You"],
      role: "admin"
    };
    
    setChats(prev => [newChat, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newChatId]: [{
        id: crypto.randomUUID(),
        sender: "system",
        content: "You created the group",
        type: "text",
        timestamp: new Date()
      }]
    }));
    setSelectedChatId(newChatId);
  };

  // Share a resource in chat
  const shareResource = (resource: ResourceItem) => {
    const now = new Date();
    const newMessage: ChatMessageType = {
      id: crypto.randomUUID(),
      sender: "me",
      content: resource.name,
      type: "file",
      timestamp: now,
      fileType: resource.type,
      fileName: resource.name,
      fileSize: resource.size
    };
    
    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] || []), newMessage]
    }));
    setShowResources(false);
  };

  // Get selected chat details
  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/90 dark:bg-gray-800/90 border-b border-gray-200 dark:border-gray-700">
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
            <div className="flex items-center gap-4">
              <Notification />
              <ModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Create Group Modal */}
      <CreateGroupModal 
        show={showCreateGroup} 
        setShow={setShowCreateGroup} 
        createNewGroup={createNewGroup} 
      />
      
      {/* Resources Modal */}
      <ResourcesModal 
        show={showResources} 
        setShow={setShowResources} 
        resources={resources} 
        shareResource={shareResource} 
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden mt-20">
        <ChatListSidebar
          chats={chats}
          selectedChatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
          setShowCreateGroup={setShowCreateGroup}
        />
        
        <main className="flex-1 p-4 sm:p-8 flex flex-col h-[calc(100vh-5rem)]">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="border-b dark:border-gray-700 pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`relative ${
                      selectedChat.isGroup 
                        ? "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                        : "bg-gray-200 dark:bg-gray-600"
                    } w-12 h-12 rounded-full flex items-center justify-center`}>
                      {selectedChat.isGroup ? (
                        <Users className="w-6 h-6" />
                      ) : selectedChat.avatar ? (
                        <img src={selectedChat.avatar} alt={selectedChat.name} className="rounded-full w-full h-full" />
                      ) : (
                        <span className="text-lg font-medium">
                          {selectedChat.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedChat.name}</h2>
                      {selectedChat.isGroup && selectedChat.members && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedChat.members.length} members
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {selectedChat.isGroup && selectedChat.role === "pending" && (
                      <Button size="sm" variant="outline">
                        Request Sent
                      </Button>
                    )}
                    
                    {selectedChat.isGroup && selectedChat.role === "member" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setShowResources(true)}
                        className="gap-1"
                      >
                        <BookOpen className="w-4 h-4" /> Resources
                      </Button>
                    )}
                    
                    {selectedChat.isGroup && selectedChat.role === "admin" && (
                      <Button size="sm">
                        <Users className="w-4 h-4 mr-1" /> Manage Group
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Chat Messages Area */}
              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {(messages[selectedChatId] || []).map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start mb-4"
                  >
                    <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 max-w-[85%] p-4 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                        <span className="text-sm">typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat Input Area */}
              <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
                <div className="flex gap-2">
                  <label className="cursor-pointer p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="Attach file">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </label>
                  
                  {selectedChat.isGroup && (
                    <button 
                      type="button"
                      onClick={() => setShowResources(true)}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      aria-label="Share resource"
                    >
                      <BookOpen className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  )}
                </div>
                
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e as unknown as React.FormEvent<HTMLFormElement>);
                    }
                  }}
                  placeholder={`Message ${selectedChat.name}...`}
                  className="flex-1 resize-none min-h-[46px] max-h-32"
                />
                
                {selectedFile && (
                  <div className="absolute bottom-16 left-0 right-0 mx-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-3 shadow-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <File className="w-5 h-5 text-blue-500" />
                        <span className="truncate max-w-[150px]">{selectedFile.name}</span>
                        <span className="text-xs text-gray-500">{formatFileSize(selectedFile.size)}</span>
                      </div>
                      <button onClick={() => setSelectedFile(null)}>
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>
                )}
                
                <Button
                  type="submit"
                  disabled={!newMessage.trim() && !selectedFile}
                  className="flex items-center gap-1"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center p-8 max-w-md">
                <div className="mx-auto bg-blue-100 dark:bg-blue-900/20 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Chat Selected</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Select a chat from the sidebar or create a new study group to start collaborating
                </p>
                <Button onClick={() => setShowCreateGroup(true)}>
                  <Users className="w-5 h-5 mr-2" /> Create Study Group
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}