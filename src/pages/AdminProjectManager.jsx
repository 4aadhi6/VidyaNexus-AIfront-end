// // src/pages/AdminProjectManager.jsx

// import { useState } from "react";
// import api from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import { Label } from "@/components/ui/label";

// const AdminProjectManager = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !description || !file) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "All fields are required.",
//       });
//       return;
//     }
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("projectFile", file);

//     try {
//       // We assume a new backend endpoint `/projects`
//       await api.post("/projects", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast({
//         title: "Success",
//         description: "Project uploaded successfully!",
//       });
//       // Reset form
//       setTitle("");
//       setDescription("");
//       setFile(null);
//       document.getElementById("project-file-input").value = "";
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Upload Failed",
//         description: error.response?.data?.message || "An error occurred.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Add New Project or Task</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="project-title">Project Title</Label>
//             <Input
//               id="project-title"
//               placeholder="e.g., Build a Personal Portfolio Website"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="project-description">Description</Label>
//             <Textarea
//               id="project-description"
//               placeholder="Describe the project, its goals, and requirements."
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="project-file-input">
//               Attachment (PDF, ZIP, etc.)
//             </Label>
//             <Input
//               id="project-file-input"
//               type="file"
//               onChange={(e) => setFile(e.target.files[0])}
//               required
//             />
//           </div>
//           <Button type="submit" disabled={loading}>
//             {loading ? "Uploading..." : "Add Project"}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default AdminProjectManager;
// src/pages/AdminProjectManager.jsx

import { useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const AdminProjectManager = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !file) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required.",
      });
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("projectFile", file);

    try {
      // This will call your backend endpoint `/projects`
      const { data } = await api.post("/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast({
          title: "Success",
          description: "Project uploaded successfully!",
        });
        // Reset form
        setTitle("");
        setDescription("");
        setFile(null);
        document.getElementById("project-file-input").value = "";
      } else {
        throw new Error(data.message || "Failed to upload project.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Project or Task</CardTitle>
        <CardDescription>
          Upload project details and any relevant files (e.g., PDFs, ZIPs).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="project-title">Project Title</Label>
            <Input
              id="project-title"
              placeholder="e.g., Build a Personal Portfolio Website"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Describe the project, its goals, and requirements."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="project-file-input">
              Attachment File (PDF, ZIP, etc.)
            </Label>
            <Input
              id="project-file-input"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Add Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminProjectManager;
