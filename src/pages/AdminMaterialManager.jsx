import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const AdminMaterialManager = () => {
  const [title, setTitle] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await api.get("/subjects");
      if (data.success) setSubjects(data.data);
    };
    fetchSubjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !selectedSubject || !file) {
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
    formData.append("subject", selectedSubject);
    formData.append("materialFile", file);

    try {
      await api.post("/materials", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({
        title: "Success",
        description: "Material uploaded successfully!",
      });
      setTitle("");
      setSelectedSubject("");
      setFile(null);
      document.getElementById("file-input").value = "";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.response?.data?.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Study Material</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Material Title</Label>
            <Input
              id="title"
              placeholder="e.g., Chapter 1: Introduction to Physics"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Subject</Label>
            <Select onValueChange={setSelectedSubject} value={selectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((sub) => (
                  <SelectItem key={sub._id} value={sub._id}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="file-input">Material File (PDF, etc.)</Label>
            <Input
              id="file-input"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload Material"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminMaterialManager;
