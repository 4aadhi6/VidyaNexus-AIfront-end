// src/pages/NewsPage.jsx

import { useState, useEffect } from "react";
import { parse } from "rss-to-json";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, ExternalLink, ImageOff } from "lucide-react";

// The URL of the Kaumudi RSS feed for Kerala news
const RSS_FEED_URL = "https://www.keralakaumudi.com/rss/kerala.rss";
const CORS_PROXY_URL = "https://api.allorigins.win/raw?url=";

const NewsPage = () => {
  const [feed, setFeed] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const feedData = await parse(CORS_PROXY_URL + RSS_FEED_URL);
        setFeed(feedData);
      } catch (err) {
        console.error("Failed to fetch or parse RSS feed:", err);
        setError(
          "Could not load the news feed. The source or proxy might be unavailable."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Helper to extract the image URL from the HTML content
  const extractImageUrl = (htmlContent) => {
    if (!htmlContent) return null;
    const doc = new DOMParser().parseFromString(htmlContent, "text/html");
    const img = doc.querySelector("img");
    return img ? img.src : null;
  };

  // Helper to strip HTML tags from the description
  const stripHtml = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading Latest News...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-destructive bg-destructive/10 rounded-lg p-4">
        <AlertTriangle className="h-8 w-8" />
        <p className="mt-2 text-center font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          {feed?.title || "Latest Kerala News"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {feed?.description || "Headlines from Kaumudi Online"}
        </p>
      </div>

      {/* ================================================================= */}
      {/*  THE NEW, PROFESSIONAL CARD LAYOUT                                */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed?.items.map((item, index) => {
          const imageUrl = extractImageUrl(item.content);
          const cleanDescription = stripHtml(item.description);

          return (
            // The Card itself is now a flex container, arranged in a column.
            <Card
              key={index}
              className="flex flex-col overflow-hidden rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* 1. IMAGE CONTAINER */}
              <div className="aspect-video w-full bg-muted flex-shrink-0">
                {imageUrl ? (
                  // object-cover ensures the image fills the space without distortion
                  <img
                    src={imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageOff className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* 2. CONTENT CONTAINER - This also becomes a flex container */}
              <div className="flex flex-col flex-grow p-4 md:p-6">
                {/* Header for Title and Date */}
                <CardHeader className="p-0 mb-3">
                  {/* Title is now limited to 2 lines for consistency */}
                  <CardTitle className="text-lg font-bold leading-tight line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="pt-2 text-xs">
                    {new Date(item.published).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </CardDescription>
                </CardHeader>

                {/* 3. Main Content - This will grow to push the button down */}
                <CardContent className="p-0 flex-grow">
                  {/* Description is limited to 3 lines */}
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {cleanDescription}
                  </p>
                </CardContent>

                {/* 4. Footer with the Button */}
                <div className="pt-4 mt-auto">
                  <Button asChild className="w-full">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Full Story <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default NewsPage;
