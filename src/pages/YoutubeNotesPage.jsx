// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Card,
// //   CardContent,
// //   CardHeader,
// //   CardTitle,
// //   CardDescription,
// // } from "@/components/ui/card";
// // import { useToast } from "@/components/ui/use-toast";
// // import { Loader2 } from "lucide-react";
// // import ReactMarkdown from "react-markdown";

// // // --- NEW IMPORTS ---
// // import { YoutubeTranscript } from "youtube-transcript";
// // import { GoogleGenerativeAI } from "@google/generative-ai";

// // // --- SETUP GEMINI API ---
// // const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// // const genAI = new GoogleGenerativeAI(API_KEY);
// // const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// // const YoutubeNotesPage = () => {
// //   const [url, setUrl] = useState("");
// //   const [notes, setNotes] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const { toast } = useToast();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!url.trim() || loading) return;

// //     setLoading(true);
// //     setNotes("");
// //     try {
// //       // Step 1: Get transcript from YouTube
// //       const transcriptData = await YoutubeTranscript.fetchTranscript(url);
// //       const transcript = transcriptData.map((item) => item.text).join(" ");

// //       if (!transcript) {
// //         throw new Error(
// //           "Could not get transcript. The video may not have captions enabled."
// //         );
// //       }

// //       // Step 2: Create a prompt for Gemini
// //       const prompt = `
// //         Please act as an expert note-taker. Based on the following video transcript, provide a concise summary, key takeaways, and a potential Q&A section. Format the output cleanly using Markdown.

// //         Transcript:
// //         ---
// //         ${transcript}
// //         ---
// //       `;

// //       // Step 3: Call Gemini API
// //       const result = await model.generateContent(prompt);
// //       const response = await result.response;
// //       const text = response.text();

// //       setNotes(text);
// //       toast({ title: "Notes Generated!" });
// //     } catch (error) {
// //       console.error("YT Notes Error:", error);
// //       toast({
// //         variant: "destructive",
// //         title: "Error",
// //         description: error.message || "Failed to generate notes.",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="space-y-6">
// //       <Card className="w-full max-w-3xl mx-auto">
// //         <CardHeader>
// //           <CardTitle>YouTube Video to Notes</CardTitle>
// //           <CardDescription>
// //             Paste a YouTube URL to get an AI-generated summary and Q&A.
// //           </CardDescription>
// //         </CardHeader>
// //         <CardContent>
// //           <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
// //             <Input
// //               placeholder="https://www.youtube.com/watch?v=..."
// //               value={url}
// //               onChange={(e) => setUrl(e.target.value)}
// //               required
// //             />
// //             <Button type="submit" disabled={loading}>
// //               {loading ? (
// //                 <>
// //                   {" "}
// //                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
// //                   Generating...{" "}
// //                 </>
// //               ) : (
// //                 "Generate"
// //               )}
// //             </Button>
// //           </form>
// //           {loading && !notes && (
// //             <div className="text-center p-8 text-muted-foreground">
// //               <p>
// //                 Getting transcript and generating notes... this may take a
// //                 moment.
// //               </p>
// //             </div>
// //           )}
// //           {notes && (
// //             <Card className="mt-6 bg-muted">
// //               <CardHeader>
// //                 <CardTitle>Generated Notes</CardTitle>
// //               </CardHeader>
// //               <CardContent className="prose dark:prose-invert max-w-none">
// //                 <ReactMarkdown>{notes}</ReactMarkdown>
// //               </CardContent>
// //             </Card>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // };

// // export default YoutubeNotesPage;
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card";
// import { Loader2 } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import { useToast } from "@/components/ui/use-toast";

// // Gemini API setup
// import { GoogleGenerativeAI } from "@google/generative-ai";
// const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// const YoutubeNotesPage = () => {
//   const [transcript, setTranscript] = useState("");
//   const [notes, setNotes] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!transcript.trim() || loading) return;

//     setLoading(true);
//     setNotes("");

//     const prompt = `
// You are an expert academic note-taker.
// Generate:
// 1. A short summary
// 2. Key points
// 3. Sample Q&A (3-5 questions)

// Based on the following YouTube transcript:

// ---
// ${transcript}
// ---

// Format everything in Markdown.
// `;

//     try {
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const text = response.text();
//       setNotes(text);

//       toast({ title: "✅ Notes Generated" });
//     } catch (err) {
//       console.error("Gemini Error:", err);

//       // Friendly error messaging
//       let message = "Try again later.";
//       if (err.message.includes("429")) {
//         message =
//           "🚫 Unable to handle high traffic right now. Please try again later.";
//       } else if (err.message.includes("403")) {
//         message = "❌ Invalid or unauthorized API key.";
//       } else if (err.message.includes("404")) {
//         message = "⚠️ Gemini model not found. Check model name/version.";
//       } else if (err.message.includes("QuotaFailure")) {
//         message = "🚨 Free tier exhausted. Wait or upgrade your plan.";
//       }

//       toast({
//         title: "❌ Failed to generate notes",
//         description: message,
//         variant: "destructive",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <Card className="w-full max-w-4xl mx-auto">
//         <CardHeader>
//           <CardTitle>YouTube Transcript to Notes</CardTitle>
//           <CardDescription>
//             Paste YouTube transcript below to generate notes, summary, and Q&A.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <Textarea
//               placeholder="Paste transcript text here..."
//               value={transcript}
//               onChange={(e) => setTranscript(e.target.value)}
//               rows={8}
//               className="resize-y"
//               disabled={loading}
//             />
//             <Button type="submit" disabled={loading || !transcript.trim()}>
//               {loading ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Generating...
//                 </>
//               ) : (
//                 "Generate Notes"
//               )}
//             </Button>
//           </form>

//           {loading && !notes && (
//             <div className="text-center p-6 text-muted-foreground">
//               Generating notes, please wait...
//             </div>
//           )}

//           {notes && (
//             <Card className="mt-6 bg-muted">
//               <CardHeader>
//                 <CardTitle>📄 AI-Generated Notes</CardTitle>
//               </CardHeader>
//               <CardContent className="prose dark:prose-invert max-w-none">
//                 <ReactMarkdown>{notes}</ReactMarkdown>
//               </CardContent>
//             </Card>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default YoutubeNotesPage;
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useToast } from "@/components/ui/use-toast";

// Gemini API setup
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Set this in .env
const genAI = new GoogleGenerativeAI(API_KEY);

const YoutubeNotesPage = () => {
  const [transcript, setTranscript] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const prompt = (text) => `
You are an expert academic note-taker. 
Generate:
1. A short summary
2. Key points
3. Sample Q&A (3-5 questions)
Based on the following YouTube transcript.

Transcript:
---
${text}
---
Format everything in Markdown.
`;

  const tryGenerateNotes = async (modelName, text) => {
    const model = genAI.getGenerativeModel({ model: modelName });

    try {
      const result = await model.generateContent(prompt(text));
      const response = await result.response;
      return response.text();
    } catch (err) {
      if (err.message.includes("429")) {
        console.warn(`⚠️ ${modelName} rate limit hit. Retrying after delay...`);
        await new Promise((r) => setTimeout(r, 13000)); // wait 13 seconds
        const result = await model.generateContent(prompt(text));
        const response = await result.response;
        return response.text();
      }
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!transcript.trim() || loading) return;

    setLoading(true);
    setNotes("");

    try {
      // Try Gemini 1.5 Pro
      const text = await tryGenerateNotes("gemini-1.5-pro", transcript);
      setNotes(text);
      toast({ title: "✅ Notes Generated using 1.5 Pro" });
    } catch (err1) {
      console.warn("Gemini-pro failed, trying fallback:", err1);

      try {
        const fallbackText = await tryGenerateNotes(
          "gemini-1.5-flash",
          transcript
        );
        setNotes(fallbackText);
        toast({ title: "✅ Notes Generated using 1.5 Flash (Fallback)" });
      } catch (err2) {
        console.error("Gemini Flash Fallback Error:", err2);

        let message = "Something went wrong. Please try again later.";
        if (err2.message?.includes("429")) {
          message =
            "🚫 You exceeded the free-tier usage. Please wait or upgrade your plan.";
        }

        toast({
          title: "❌ Failed to generate notes",
          description: message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>🎥 YouTube Transcript to Notes</CardTitle>
          <CardDescription>
            Paste a YouTube transcript below to generate summary & Q&A.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Paste transcript text here..."
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={8}
              className="resize-y"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !transcript.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Notes"
              )}
            </Button>
          </form>

          {loading && !notes && (
            <div className="text-center p-6 text-muted-foreground">
              Generating notes, please wait...
            </div>
          )}

          {notes && (
            <Card className="mt-6 bg-muted">
              <CardHeader>
                <CardTitle>📄 AI-Generated Notes</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <ReactMarkdown>{notes}</ReactMarkdown>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default YoutubeNotesPage;
