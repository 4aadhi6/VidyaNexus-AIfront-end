// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Loader2, Sparkles, User } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// // --- NEW IMPORTS ---
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // --- SETUP GEMINI API ---
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// const AIAssistantPage = () => {
//   const [prompt, setPrompt] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!prompt.trim() || loading) return;

//     const newConversation = [
//       ...conversation,
//       { role: "user", content: prompt },
//     ];
//     setConversation(newConversation);
//     const currentPrompt = prompt;
//     setPrompt("");
//     setLoading(true);
//     setError(null);

//     try {
//       // --- REMOVED BACKEND CALL, ADDED DIRECT GEMINI CALL ---
//       const result = await model.generateContent(currentPrompt);
//       const response = await result.response;
//       const text = response.text();

//       setConversation([...newConversation, { role: "ai", content: text }]);
//     } catch (err) {
//       console.error("Gemini API Error:", err);
//       const errorMessage =
//         "Sorry, I ran into an issue. Please check the console for details or try again later.";
//       setError(errorMessage);
//       setConversation([
//         ...newConversation,
//         { role: "ai", content: errorMessage },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[calc(100vh-8rem)]">
//       <Card className="flex-grow flex flex-col">
//         <CardHeader>
//           <CardTitle>VidyaNexus AI Assistant</CardTitle>
//           <CardDescription>
//             Ask me anything about your studies! Powered by Gemini.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="flex-grow overflow-y-auto space-y-4 p-6">
//           {conversation.length === 0 && !loading && (
//             <div className="flex items-center justify-center h-full">
//               <p className="text-center text-muted-foreground">
//                 Ask a question to start the conversation.
//               </p>
//             </div>
//           )}
//           {conversation.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex items-start gap-3 ${
//                 msg.role === "user" ? "justify-end" : ""
//               }`}
//             >
//               {msg.role === "ai" && (
//                 <div className="p-2 bg-primary rounded-full text-primary-foreground flex-shrink-0">
//                   <Sparkles className="h-5 w-5" />
//                 </div>
//               )}
//               <div
//                 className={`max-w-[75%] rounded-lg p-3 ${
//                   msg.role === "user"
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-muted"
//                 }`}
//               >
//                 <div className="prose dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3">
//                   <ReactMarkdown>{msg.content}</ReactMarkdown>
//                 </div>
//               </div>
//               {msg.role === "user" && (
//                 <div className="p-2 bg-muted rounded-full flex-shrink-0">
//                   <User className="h-5 w-5" />
//                 </div>
//               )}
//             </div>
//           ))}
//           {loading && (
//             <div className="flex items-start gap-3">
//               <div className="p-2 bg-primary rounded-full text-primary-foreground flex-shrink-0">
//                 <Sparkles className="h-5 w-5" />
//               </div>
//               <div className="bg-muted rounded-lg p-3 flex items-center">
//                 <Loader2 className="h-5 w-5 animate-spin" />
//               </div>
//             </div>
//           )}
//         </CardContent>
//         <div className="p-4 border-t">
//           <form onSubmit={handleSubmit} className="flex gap-2">
//             <Textarea
//               placeholder="e.g., Explain Newton's third law of motion..."
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSubmit(e);
//                 }
//               }}
//               className="resize-none"
//               rows={1}
//               disabled={loading}
//             />
//             <Button type="submit" disabled={loading || !prompt.trim()}>
//               {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
//             </Button>
//           </form>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default AIAssistantPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { GoogleGenerativeAI } from "@google/generative-ai";

// --- SETUP GEMINI API ---
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const AIAssistantPage = () => {
  const [prompt, setPrompt] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || loading) return;

    const newConversation = [
      ...conversation,
      { role: "user", content: prompt },
    ];
    setConversation(newConversation);
    const currentPrompt = prompt;
    setPrompt("");
    setLoading(true);
    setError(null);

    const tryModel = async (modelName) => {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContentStream([currentPrompt]);
      let text = "";
      for await (const chunk of result.stream) {
        text += chunk.text();
      }
      return text;
    };

    try {
      let text;
      try {
        text = await tryModel("gemini-1.5-pro");
      } catch (err) {
        if (err.message.includes("429")) {
          console.warn(
            "gemini-1.5-pro quota hit. Switching to gemini-1.5-flash..."
          );
          text = await tryModel("gemini-1.5-flash");
        } else {
          throw err;
        }
      }

      setConversation([...newConversation, { role: "ai", content: text }]);
    } catch (err) {
      console.error("Gemini API Error:", err);
      const errorMessage =
        "Sorry, all available models are rate-limited or unavailable. Please try again later.";
      setError(errorMessage);
      setConversation([
        ...newConversation,
        { role: "ai", content: errorMessage },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <Card className="flex-grow flex flex-col">
        <CardHeader>
          <CardTitle>VidyaNexus AI Assistant</CardTitle>
          <CardDescription>
            Ask me anything about your studies! Powered by Gemini.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto space-y-4 p-6">
          {conversation.length === 0 && !loading && (
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-muted-foreground">
                Ask a question to start the conversation.
              </p>
            </div>
          )}
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "ai" && (
                <div className="p-2 bg-primary rounded-full text-primary-foreground flex-shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="prose dark:prose-invert max-w-none prose-p:my-2 prose-headings:my-3">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              {msg.role === "user" && (
                <div className="p-2 bg-muted rounded-full flex-shrink-0">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-3">
              <div className="p-2 bg-primary rounded-full text-primary-foreground flex-shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="bg-muted rounded-lg p-3 flex items-center">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
            </div>
          )}
        </CardContent>
        <div className="p-4 border-t">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
              placeholder="e.g., Explain Newton's third law of motion..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="resize-none"
              rows={1}
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !prompt.trim()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send"}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AIAssistantPage;
