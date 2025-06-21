// // src/lib/mockApi.js

// // --- FAKE DATA ---
// const mockSubjects = [
//   { _id: "1", name: "Mock Physics" },
//   { _id: "2", name: "Mock Chemistry" },
//   { _id: "3", name: "Mock Mathematics" },
//   { _id: "4", name: "Mock Programming" },
// ];

// const mockProjects = [
//   {
//     _id: "p1",
//     title: "Build a Mock Portfolio",
//     description:
//       "Create a personal portfolio using React and Tailwind CSS to showcase your skills.",
//     fileUrl: "#",
//     createdAt: new Date().toISOString(),
//   },
//   {
//     _id: "p2",
//     title: "Mock To-Do List App",
//     description:
//       "A classic project to practice state management in React. Add, delete, and mark tasks as complete.",
//     fileUrl: "#",
//     createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
//   },
// ];

// const mockAds = [
//   {
//     _id: "ad1",
//     title: "Mock Ad 1",
//     link: "#",
//     imageUrl:
//       "https://via.placeholder.com/800x150.png?text=This+is+a+Sample+Ad",
//   },
// ];

// // --- FAKE API FUNCTIONS ---
// // This function mimics network delay
// const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// export const mockApi = {
//   get: async (url) => {
//     await delay(500); // Simulate network latency

//     // Check which URL is being requested and return the corresponding fake data
//     if (url.startsWith("/subjects")) {
//       console.log("MOCK API: Responding to /subjects");
//       return { data: { success: true, data: mockSubjects } };
//     }
//     if (url.startsWith("/projects")) {
//       console.log("MOCK API: Responding to /projects");
//       return { data: { success: true, data: mockProjects } };
//     }
//     if (url.startsWith("/ads")) {
//       console.log("MOCK API: Responding to /ads");
//       return { data: { success: true, data: mockAds } };
//     }

//     // To test error handling, you can uncomment this:
//     // throw new Error('Mock API error!');

//     // Default response for unhandled routes
//     return {
//       data: { success: false, message: `Mock route for ${url} not found.` },
//     };
//   },
//   // We can add mock post, delete, etc. later if needed
//   post: async (url, payload) => {
//     await delay(500);
//     console.log(`MOCK API: Pretending to POST to ${url}`, payload);
//     return { data: { success: true, message: "Mock data created!" } };
//   },
//   delete: async (url) => {
//     await delay(500);
//     console.log(`MOCK API: Pretending to DELETE ${url}`);
//     return { data: { success: true, message: "Mock data deleted!" } };
//   },
// };
// src/lib/mockApi.js

// --- FAKE DATA ---
const mockSubjects = [
  { _id: "1", name: "Mock Physics" },
  { _id: "2", name: "Mock Chemistry" },
  { _id: "3", name: "Mock Mathematics" },
  { _id: "4", name: "Mock Programming" },
];

// =================================================================
//  NEW FAKE DATA FOR THE PROJECTS PAGE
// =================================================================
const mockProjects = [
  {
    _id: "p1",
    title: "Build a Mock Portfolio",
    description:
      "Create a personal portfolio using React and Tailwind CSS to showcase your skills and projects to potential employers.",
    fileUrl: "#", // In a real app, this would be a Cloudinary URL
    createdAt: new Date().toISOString(),
  },
  {
    _id: "p2",
    title: "Mock To-Do List App",
    description:
      "A classic project to practice state management in React. Add, delete, and mark tasks as complete. A great beginner-friendly task.",
    fileUrl: "#",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
  },
];
// =================================================================

const mockAds = [
  {
    _id: "ad1",
    title: "Mock Ad 1",
    link: "#",
    imageUrl:
      "https://via.placeholder.com/800x150.png?text=This+is+a+Sample+Ad",
  },
];

// --- FAKE API FUNCTIONS ---
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const mockApi = {
  get: async (url) => {
    await delay(500);

    if (url.startsWith("/subjects")) {
      console.log("MOCK API: Responding to /subjects");
      return { data: { success: true, data: mockSubjects } };
    }
    // =================================================================
    //  HANDLE GET REQUESTS FOR PROJECTS
    // =================================================================
    if (url.startsWith("/projects")) {
      console.log("MOCK API: Responding to /projects");
      return { data: { success: true, data: mockProjects } };
    }
    // =================================================================
    if (url.startsWith("/ads")) {
      console.log("MOCK API: Responding to /ads");
      return { data: { success: true, data: mockAds } };
    }

    return {
      data: { success: false, message: `Mock route for ${url} not found.` },
    };
  },

  post: async (url, payload) => {
    await delay(500);
    console.log(`MOCK API: Pretending to POST to ${url}`, payload);
    return {
      data: { success: true, message: "Mock data created successfully!" },
    };
  },

  delete: async (url) => {
    await delay(500);
    console.log(`MOCK API: Pretending to DELETE ${url}`);
    return {
      data: { success: true, message: "Mock data deleted successfully!" },
    };
  },
};
