// // src/pages/ProjectsPage.jsx

// import { useState, useEffect } from "react";
// import api from "@/lib/api";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Loader2, Download, FileText } from "lucide-react";
// import { formatDistanceToNow } from "date-fns";

// const ProjectsPage = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         setLoading(true);
//         const { data } = await api.get("/projects"); // Assumes this endpoint exists
//         if (data.success) {
//           setProjects(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch projects", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjects();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold tracking-tight">
//           Projects & Extra Tasks
//         </h1>
//         <p className="text-muted-foreground mt-2">
//           Challenge yourself with these projects uploaded by our contributors.
//         </p>
//       </div>

//       {projects.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((project) => (
//             <Card key={project._id} className="flex flex-col">
//               <CardHeader>
//                 <CardTitle>{project.title}</CardTitle>
//                 <CardDescription>
//                   Uploaded by a contributor{" "}
//                   {formatDistanceToNow(new Date(project.createdAt), {
//                     addSuffix: true,
//                   })}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="flex-grow">
//                 <p className="text-sm text-muted-foreground">
//                   {project.description}
//                 </p>
//               </CardContent>
//               <CardFooter>
//                 <Button asChild className="w-full">
//                   <a
//                     href={project.fileUrl}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Download className="mr-2 h-4 w-4" /> Download Attachments
//                   </a>
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-muted-foreground py-10">
//           No projects have been uploaded yet. Check back soon!
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProjectsPage;
// src/pages/ProjectsPage.jsx

import { useState, useEffect } from "react";
import api from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Download, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        // This will call your backend endpoint `/projects`
        const { data } = await api.get("/projects");
        if (data.success) {
          setProjects(data.data);
        } else {
          throw new Error(data.message || "Failed to fetch projects.");
        }
      } catch (err) {
        console.error("Fetch Projects Error:", err);
        setError("Could not load projects. The server might be down.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-2">Loading Projects...</p>
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
          Projects & Extra Tasks
        </h1>
        <p className="text-muted-foreground mt-2">
          Challenge yourself with these projects uploaded by our contributors.
        </p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project._id}
              className="flex flex-col hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>
                  Uploaded{" "}
                  {formatDistanceToNow(new Date(project.createdAt), {
                    addSuffix: true,
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a
                    href={project.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" /> Download Attachments
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground bg-muted rounded-lg">
          <p className="font-semibold">No Projects Yet</p>
          <p className="text-sm">
            No projects have been uploaded. Please check back later!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
