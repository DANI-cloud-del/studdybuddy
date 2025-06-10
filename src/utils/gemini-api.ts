import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function fetchAIResponse(userInput: string, chatHistory: Array<{ role: string, content: string }> = []) {
  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // ✅ Ensure history starts with a user message
    const formattedHistory = chatHistory.length > 0 
      ? [{ role: "user", parts: [{ text: userInput }] }, ...chatHistory.map(msg => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        }))]
      : [{ role: "user", parts: [{ text: userInput }] }];

    // Start chat session with properly formatted history
    const chat = model.startChat({ history: formattedHistory });

    // Send message
    const result = await chat.sendMessage(userInput);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't process your request. Please try again.";
  }
}
