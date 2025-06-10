// import React, { 
//   useState, 
//   useRef, 
//   useEffect, 
//   ReactNode, 
//   forwardRef 
// } from "react";
// import { ChevronDown } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface DropdownMenuProps {
//   trigger: ReactNode;
//   children: ReactNode;
//   align?: "left" | "right" | "center";
//   className?: string;
// }

// export const DropdownMenu = ({
//   trigger,
//   children,
//   align = "left",
//   className = ""
// }: DropdownMenuProps) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && 
//           !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const alignmentClasses = {
//     left: "left-0",
//     right: "right-0",
//     center: "left-1/2 transform -translate-x-1/2"
//   };

//   return (
//     <div className={`relative inline-block ${className}`} ref={dropdownRef}>
//       <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
//         {trigger}
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//             className={`absolute z-50 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${alignmentClasses[align]}`}
//           >
//             <div className="py-1">
//               {children}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// interface DropdownMenuItemProps {
//   children: ReactNode;
//   onSelect?: () => void;
//   disabled?: boolean;
//   className?: string;
// }

// export const DropdownMenuItem = forwardRef<HTMLDivElement, DropdownMenuItemProps>(
//   ({ children, onSelect, disabled = false, className = "" }, ref) => {
//     return (
//       <div
//         ref={ref}
//         onClick={onSelect}
//         className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
//           disabled 
//             ? "text-gray-400 dark:text-gray-500 cursor-not-allowed" 
//             : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
//         } ${className}`}
//       >
//         {children}
//       </div>
//     );
//   }
// );

// interface DropdownMenuTriggerProps {
//   children: ReactNode;
//   className?: string;
// }

// export const DropdownMenuTrigger = forwardRef<HTMLDivElement, DropdownMenuTriggerProps>(
//   ({ children, className = "" }, ref) => {
//     return (
//       <div 
//         ref={ref}
//         className={`flex items-center justify-between w-full ${className}`}
//       >
//         {children}
//         <ChevronDown className="ml-2 h-4 w-4" />
//       </div>
//     );
//   }
// );

// interface DropdownMenuContentProps {
//   children: ReactNode;
//   className?: string;
// }

// export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
//   ({ children, className = "" }, ref) => {
//     return (
//       <div ref={ref} className={`py-1 ${className}`}>
//         {children}
//       </div>
//     );
//   }
// );