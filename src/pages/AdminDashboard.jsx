// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// // import AdminSubjectManager from "./AdminSubjectManager";
// // import AdminMaterialManager from "./AdminMaterialManager";
// // import AdminProjectManager from "./AdminProjectManager"; // <-- NEW IMPORT
// // import AdminAdsManager from "./AdminAdsManager"; // <-- NEW IMPORT

// // const AdminDashboard = () => {
// //   return (
// //     <div className="space-y-6">
// //       <h1 className="text-3xl font-bold">Contributor Dashboard</h1>
// //       {/* UPDATE: Added new tabs to the grid */}
// //       <Tabs defaultValue="materials" className="w-full">
// //         <TabsList className="grid w-full grid-cols-4">
// //           <TabsTrigger value="materials">Upload Materials</TabsTrigger>
// //           <TabsTrigger value="projects">Add Projects/Tasks</TabsTrigger>
// //           <TabsTrigger value="subjects">Manage Subjects</TabsTrigger>
// //           <TabsTrigger value="ads">Manage Ads</TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="materials">
// //           <AdminMaterialManager />
// //         </TabsContent>
// //         {/* NEW TABS CONTENT */}
// //         <TabsContent value="projects">
// //           <AdminProjectManager />
// //         </TabsContent>
// //         <TabsContent value="subjects">
// //           <AdminSubjectManager />
// //         </TabsContent>
// //         <TabsContent value="ads">
// //           <AdminAdsManager />
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
// // src/pages/AdminDashboard.jsx
// // src/pages/AdminDashboard.jsx

// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AdminSubjectManager from "./AdminSubjectManager";
// import AdminMaterialManager from "./AdminMaterialManager";
// import AdminProjectManager from "./AdminProjectManager";
// import AdminResourceUploader from "./AdminResourceUploader"; // <-- IMPORT THE NEW COMPONENT
// import AdminAdsManager from "./AdminAdsManager";

// const AdminDashboard = () => {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Contributor Dashboard</h1>

//       <Tabs defaultValue="materials" className="w-full">
//         {/* Update grid-cols-5 for the new tab */}
//         <TabsList className="grid w-full grid-cols-5">
//           <TabsTrigger value="materials">Study Materials</TabsTrigger>
//           <TabsTrigger value="projects">Projects/Tasks</TabsTrigger>
//           {/* ================================================================= */}
//           {/*   NEW TAB FOR VISUAL LEARNING RESOURCES                         */}
//           {/* ================================================================= */}
//           <TabsTrigger value="resources">Learning Resources</TabsTrigger>
//           <TabsTrigger value="subjects">Manage Subjects</TabsTrigger>
//           <TabsTrigger value="ads">Manage Ads</TabsTrigger>
//         </TabsList>

//         <TabsContent value="materials">
//           <AdminMaterialManager />
//         </TabsContent>
//         <TabsContent value="projects">
//           <AdminProjectManager />
//         </TabsContent>

//         {/* ================================================================= */}
//         {/*   CONTENT FOR THE NEW TAB                                         */}
//         {/* ================================================================= */}
//         <TabsContent value="resources">
//           <AdminResourceUploader />
//         </TabsContent>

//         <TabsContent value="subjects">
//           <AdminSubjectManager />
//         </TabsContent>
//         <TabsContent value="ads">
//           <AdminAdsManager />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default AdminDashboard;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminSubjectManager from "./AdminSubjectManager";
import AdminMaterialManager from "./AdminMaterialManager";
import AdminProjectManager from "./AdminProjectManager";
import AdminResourceUploader from "./AdminResourceUploader";
import AdminAdsManager from "./AdminAdsManager";
import { PanelRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <PanelRight className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Contributor Dashboard
        </h1>
      </div>

      <Card className="shadow-md border bg-card">
        <CardHeader>
          <CardTitle className="text-base md:text-lg">
            Manage Your Contributions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs defaultValue="materials" className="w-full">
            {/* Responsive Tab List */}
            <TabsList className="flex md:grid md:grid-cols-5 gap-1 md:gap-0 overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent rounded-lg">
              <TabsTrigger value="materials">📚 Study Materials</TabsTrigger>
              <TabsTrigger value="projects">📝 Projects/Tasks</TabsTrigger>
              <TabsTrigger value="resources">🎞️ Learning Resources</TabsTrigger>
              <TabsTrigger value="subjects">📂 Subjects</TabsTrigger>
              <TabsTrigger value="ads">📢 Ads</TabsTrigger>
            </TabsList>

            {/* Tab Content Panels */}
            <div className="pt-4">
              <TabsContent value="materials">
                <AdminMaterialManager />
              </TabsContent>
              <TabsContent value="projects">
                <AdminProjectManager />
              </TabsContent>
              <TabsContent value="resources">
                <AdminResourceUploader />
              </TabsContent>
              <TabsContent value="subjects">
                <AdminSubjectManager />
              </TabsContent>
              <TabsContent value="ads">
                <AdminAdsManager />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
