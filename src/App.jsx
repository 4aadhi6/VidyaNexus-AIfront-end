// import { Routes, Route } from "react-router-dom";
// import Header from "./components/custom/Header";
// import ProtectedRoute from "./components/custom/ProtectedRoute";

// // Import Pages
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import AdminDashboard from "./pages/AdminDashboard";
// import YoutubeNotesPage from "./pages/YoutubeNotesPage";
// import SgpaCalculator from "./pages/SgpaCalculator";
// import SubjectMaterialsPage from "./pages/SubjectMaterialsPage";
// import AIAssistantPage from "./pages/AIAssistantPage";
// import ProjectsPage from "./pages/ProjectsPage";
// import LearningResourcesPage from "./pages/LearningResourcesPage";

// // =================================================================
// //  THIS IS THE MISSING LINE THAT CAUSED THE CRASH
// import NewsPage from "./pages/NewsPage";
// // =================================================================

// function App() {
//   return (
//     <div className="min-h-screen bg-background font-sans antialiased">
//       <Header />
//       <main className="container mx-auto p-4 md:p-8">
//         <Routes>
//           {/* All the routes for your application */}
//           <Route
//             path="/learning-resources"
//             element={<LearningResourcesPage />}
//           />
//           <Route path="/news" element={<NewsPage />} />
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/ai-assistant" element={<AIAssistantPage />} />
//           <Route path="/youtube-notes" element={<YoutubeNotesPage />} />
//           <Route path="/sgpa-calculator" element={<SgpaCalculator />} />
//           <Route path="/projects" element={<ProjectsPage />} />
//           <Route
//             path="/subjects/:subjectId"
//             element={<SubjectMaterialsPage />}
//           />
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute allowedRoles={["admin", "helper"]}>
//                 <AdminDashboard />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;
// vidyanexus-frontend/src/App.jsx

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from "@/components/ui/toaster";
import Header from "./components/custom/Header";
import ProtectedRoute from "./components/custom/ProtectedRoute";

// Import All Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import YoutubeNotesPage from "./pages/YoutubeNotesPage";
import SgpaCalculator from "./pages/SgpaCalculator";
import SubjectMaterialsPage from "./pages/SubjectMaterialsPage";
import AIAssistantPage from "./pages/AIAssistantPage";
import ProjectsPage from "./pages/ProjectsPage";
import LearningResourcesPage from "./pages/LearningResourcesPage";
import NewsPage from "./pages/NewsPage";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background font-sans antialiased">
        <Header />
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route
              path="/learning-resources"
              element={<LearningResourcesPage />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/ai-assistant" element={<AIAssistantPage />} />
            <Route path="/youtube-notes" element={<YoutubeNotesPage />} />
            <Route path="/sgpa-calculator" element={<SgpaCalculator />} />
            <Route
              path="/subjects/:subjectId"
              element={<SubjectMaterialsPage />}
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Toaster />
      </div>
    </AuthProvider>
  );
}

export default App;
