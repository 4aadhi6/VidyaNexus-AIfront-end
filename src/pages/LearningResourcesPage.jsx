// src/pages/LearningResourcesPage.jsx

import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, Download, Youtube } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const LearningResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get("/resources");
        if (data.success) {
          setResources(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch resources.");
        }
      } catch (err) {
        console.error("Fetch Learning Resources Error:", err);
        setError("Could not load resources. The server might be down.");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  // Helper to convert a standard YouTube URL to an embeddable URL
  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const videoId = urlObj.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      // Handle youtu.be short links
      if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading Learning Resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-destructive bg-destructive/10 rounded-lg p-4">
        <AlertTriangle className="h-8 w-8" />
        <p className="mt-2 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Visual Learning Resources
        </h1>
        <p className="text-muted-foreground mt-2">
          Helpful video clips and materials from our contributors.
        </p>
      </div>
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Card key={resource._id} className="flex flex-col">
              {resource.type === "video" &&
                getYouTubeEmbedUrl(resource.link) && (
                  <div className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={getYouTubeEmbedUrl(resource.link)}
                      title={resource.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              <div className="flex flex-col flex-grow p-4">
                <CardHeader className="p-0">
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription className="pt-2">
                    {resource.type.charAt(0).toUpperCase() +
                      resource.type.slice(1)}{" "}
                    • Added{" "}
                    {formatDistanceToNow(new Date(resource.createdAt), {
                      addSuffix: true,
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 pt-3 flex-grow">
                  <p className="text-sm text-muted-foreground">
                    {resource.description}
                  </p>
                </CardContent>
                <CardFooter className="p-0 pt-4 mt-auto">
                  {resource.type === "file" ? (
                    <Button asChild className="w-full">
                      <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download Material
                      </a>
                    </Button>
                  ) : (
                    <Button asChild className="w-full">
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Youtube className="mr-2 h-4 w-4" /> Watch on YouTube
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-muted rounded-lg">
          <p className="font-semibold">No Learning Resources Yet</p>
          <p className="text-sm">Please check back later!</p>
        </div>
      )}
    </div>
  );
};

export default LearningResourcesPage;
