// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import api from "@/lib/api";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Loader2, FileText } from "lucide-react";

// const SubjectMaterialsPage = () => {
//   const { subjectId } = useParams();
//   const [subjectInfo, setSubjectInfo] = useState({
//     subject: {},
//     materials: [],
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMaterials = async () => {
//       try {
//         setLoading(true);
//         const { data } = await api.get(`/materials/subject/${subjectId}`);
//         if (data.success) {
//           setSubjectInfo(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch materials", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMaterials();
//   }, [subjectId]);

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
//           {subjectInfo.subject.name}
//         </h1>
//         <p className="text-muted-foreground mt-2">Available Study Materials</p>
//       </div>

//       {subjectInfo.materials.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {subjectInfo.materials.map((material) => (
//             <a
//               href={material.fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               key={material._id}
//             >
//               <Card className="hover:border-primary hover:shadow-lg transition-all h-full">
//                 <CardHeader>
//                   <div className="flex items-center gap-4">
//                     <FileText className="h-8 w-8 text-primary" />
//                     <div>
//                       <CardTitle>{material.title}</CardTitle>
//                       <CardDescription>Click to view/download</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//               </Card>
//             </a>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-muted-foreground py-10">
//           No materials have been uploaded for this subject yet.
//         </p>
//       )}
//     </div>
//   );
// };

// export default SubjectMaterialsPage;
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Loader2, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// The entire component is one function.
const SubjectMaterialsPage = () => {
  // State is defined at the top of the function
  const { subjectId } = useParams();
  const [subjectInfo, setSubjectInfo] = useState({
    subject: {},
    materials: [],
  });
  const [loading, setLoading] = useState(true);

  // useEffect hook is also inside the function
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/materials/subject/${subjectId}`);
        if (data.success) {
          setSubjectInfo(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch materials", error);
        // Optionally set an error state here to show a message
      } finally {
        setLoading(false);
      }
    };
    fetchMaterials();
  }, [subjectId]); // Dependency array is important

  // The 'loading' check is inside the function
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // =================================================================
  //  THE RETURN STATEMENT MUST BE INSIDE THE FUNCTION LIKE THIS
  // =================================================================
  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* Check if subject name exists before rendering */}
        <h1 className="text-4xl font-bold tracking-tight">
          {subjectInfo.subject?.name || "Loading Subject..."}
        </h1>
        <p className="text-muted-foreground mt-2">Available Study Materials</p>
      </div>

      {subjectInfo.materials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectInfo.materials.map((material) => (
            <a
              href={material.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              key={material._id}
            >
              <Card className="hover:border-primary hover:shadow-lg transition-all h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <FileText className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <CardTitle>{material.title}</CardTitle>
                      <CardDescription>
                        Uploaded{" "}
                        {formatDistanceToNow(new Date(material.createdAt), {
                          addSuffix: true,
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">
          No materials have been uploaded for this subject yet.
        </p>
      )}
    </div>
  );
}; // <-- The function curly brace closes here

// The export is at the end of the file
export default SubjectMaterialsPage;
