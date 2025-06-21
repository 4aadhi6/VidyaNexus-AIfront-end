import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "@/lib/api";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, AlertTriangle } from "lucide-react";
import AdBanner from "@/components/custom/AdBanner";

const HomePage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // <-- NEW: State for errors

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error on new fetch
        const { data } = await api.get("/subjects");
        if (data.success) {
          setSubjects(data.data);
        } else {
          // If the API returns success: false
          throw new Error(data.message || "Failed to fetch subjects.");
        }
      } catch (err) {
        console.error("Fetch Subjects Error:", err);
        // --- THIS IS THE KEY ---
        // It catches crashes (e.g., backend is offline) and sets an error message
        setError("Could not load subjects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // --- NEW: Better UI for loading state ---
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading Subjects...</p>
      </div>
    );
  }

  // --- NEW: Display error message to the user ---
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-destructive bg-destructive/10 rounded-lg">
        <AlertTriangle className="h-8 w-8" />
        <p className="mt-2 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Explore Our Subjects
        </h1>
        <p className="text-muted-foreground mt-2">
          Select a subject to view study materials.
        </p>
      </div>

      {subjects.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <Link to={`/subjects/${subject._id}`} key={subject._id}>
              <Card className="hover:border-primary hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle>{subject.name}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        // --- NEW: Better UI for empty state ---
        <div className="text-center py-10 text-muted-foreground">
          <p>No subjects available yet. Check back soon!</p>
        </div>
      )}

      <AdBanner />
    </div>
  );
};

export default HomePage;
