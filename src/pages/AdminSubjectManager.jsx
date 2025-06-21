// import { useState, useEffect } from "react";
// import api from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useToast } from "@/components/ui/use-toast";

// const AdminSubjectManager = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [newSubjectName, setNewSubjectName] = useState("");
//   const { toast } = useToast();

//   const fetchSubjects = async () => {
//     try {
//       const { data } = await api.get("/subjects");
//       if (data.success) setSubjects(data.data);
//     } catch (error) {
//       console.error("Failed to fetch subjects", error);
//     }
//   };

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   const handleAddSubject = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/subjects", { name: newSubjectName });
//       setNewSubjectName("");
//       fetchSubjects();
//       toast({ title: "Success", description: "Subject added successfully." });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to add subject.",
//       });
//     }
//   };

//   const handleDeleteSubject = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       await api.delete(`/subjects/${id}`);
//       fetchSubjects();
//       toast({ title: "Success", description: "Subject deleted." });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Failed to delete subject.",
//       });
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Manage Subjects</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <form onSubmit={handleAddSubject} className="flex gap-2">
//           <Input
//             placeholder="New Subject Name"
//             value={newSubjectName}
//             onChange={(e) => setNewSubjectName(e.target.value)}
//             required
//           />
//           <Button type="submit">Add Subject</Button>
//         </form>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Subject Name</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {subjects.map((subject) => (
//               <TableRow key={subject._id}>
//                 <TableCell>{subject.name}</TableCell>
//                 <TableCell className="text-right">
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDeleteSubject(subject._id)}
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default AdminSubjectManager;
import { useState, useEffect } from "react"; // <-- THIS LINE IS NOW CORRECT
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

const AdminSubjectManager = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSubjects = async () => {
    try {
      const { data } = await api.get("/subjects");
      if (data.success) setSubjects(data.data);
    } catch (error) {
      console.error("Failed to fetch subjects", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    if (!newSubjectName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Subject name cannot be empty.",
      });
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/subjects", { name: newSubjectName });
      if (data.success) {
        setNewSubjectName("");
        fetchSubjects();
        toast({ title: "Success", description: "Subject added." });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add subject.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSubject = async (id) => {
    if (
      !window.confirm(
        "Are you sure? This will delete the subject and all its materials."
      )
    )
      return;
    try {
      await api.delete(`/subjects/${id}`);
      fetchSubjects();
      toast({ title: "Success", description: "Subject deleted." });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete subject.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Subjects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAddSubject} className="flex gap-2">
          <Input
            placeholder="New Subject Name"
            value={newSubjectName}
            onChange={(e) => setNewSubjectName(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Subject"}
          </Button>
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject._id}>
                <TableCell>{subject.name}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteSubject(subject._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminSubjectManager;
