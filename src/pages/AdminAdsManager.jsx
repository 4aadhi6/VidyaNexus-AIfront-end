// src/pages/AdminAdsManager.jsx

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

const AdminAdsManager = () => {
  const [ads, setAds] = useState([]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAds = async () => {
    try {
      const { data } = await api.get("/ads");
      if (data.success) setAds(data.data);
    } catch (error) {
      console.error("Failed to fetch ads", error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !link || !image) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Title, link, and image are required.",
      });
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("link", link);
    formData.append("adImage", image);

    try {
      await api.post("/ads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ title: "Success", description: "Advertisement added!" });
      fetchAds(); // Refresh the list
      // Reset form
      setTitle("");
      setLink("");
      setImage(null);
      document.getElementById("ad-image-input").value = "";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed",
        description: error.response?.data?.message || "An error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await api.delete(`/ads/${id}`);
      toast({ title: "Success", description: "Advertisement deleted." });
      fetchAds();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete ad.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Advertisements</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 border rounded-lg"
        >
          <h3 className="font-semibold">Add New Ad</h3>
          <div>
            <Label htmlFor="ad-title">Ad Title (for internal reference)</Label>
            <Input
              id="ad-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ad-link">Target URL (where it links to)</Label>
            <Input
              id="ad-link"
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="ad-image-input">Ad Image</Label>
            <Input
              id="ad-image-input"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Advertisement"}
          </Button>
        </form>

        <div>
          <h3 className="font-semibold mb-2">Current Ads</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads.map((ad) => (
                <TableRow key={ad._id}>
                  <TableCell>
                    <img
                      src={ad.imageUrl}
                      alt={ad.title}
                      className="h-12 w-auto object-contain"
                    />
                  </TableCell>
                  <TableCell>{ad.title}</TableCell>
                  <TableCell>
                    <a
                      href={ad.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {ad.link}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(ad._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminAdsManager;
