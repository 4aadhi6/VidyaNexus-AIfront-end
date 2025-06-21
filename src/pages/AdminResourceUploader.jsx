// src/pages/AdminResourceUploader.jsx

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // For switching type
import { useToast } from "@/components/ui/use-toast";

const AdminResourceUploader = () => {
  const [resourceType, setResourceType] = useState("video"); // 'video' or 'file'
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState(""); // For video link
  const [file, setFile] = useState(null); // For file upload
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLink("");
    setFile(null);
    if (document.getElementById("resource-file-input")) {
      document.getElementById("resource-file-input").value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !title ||
      !description ||
      (resourceType === "video" && !link) ||
      (resourceType === "file" && !file)
    ) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields.",
      });
      return;
    }
    setLoading(true);

    try {
      let response;
      if (resourceType === "file") {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("type", "file");
        formData.append("resourceFile", file);
        response = await api.post("/resources", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // resourceType is "video"
        const payload = { title, description, type: "video", link };
        response = await api.post("/resources", payload);
      }

      if (response.data.success) {
        toast({
          title: "Success",
          description: "Learning resource added successfully!",
        });
        resetForm();
      } else {
        throw new Error(response.data.message || "An unknown error occurred.");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message || "Could not add resource.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Visual Learning Resource</CardTitle>
        <CardDescription>
          Upload a helpful video link or a file for students.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Resource Type Switcher */}
          <div>
            <Label>Resource Type</Label>
            <RadioGroup
              defaultValue="video"
              value={resourceType}
              onValueChange={setResourceType}
              className="flex gap-4 pt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="r1" />
                <Label htmlFor="r1">Video Link</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="file" id="r2" />
                <Label htmlFor="r2">File Upload</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label htmlFor="resource-title">Title</Label>
            <Input
              id="resource-title"
              placeholder="e.g., Introduction to Quantum Physics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Label htmlFor="resource-description">Description</Label>
            <Textarea
              id="resource-description"
              placeholder="A brief summary of what this resource is about."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            {/* Conditional Input Fields */}
            {resourceType === "video" ? (
              <div>
                <Label htmlFor="resource-link">YouTube Video URL</Label>
                <Input
                  id="resource-link"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="resource-file-input">
                  Resource File (PDF, ZIP, etc.)
                </Label>
                <Input
                  id="resource-file-input"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
              </div>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Resource"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminResourceUploader;
