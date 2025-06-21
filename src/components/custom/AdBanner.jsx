// import { useState, useEffect } from "react";
// import api from "@/lib/api";
// import { Card } from "@/components/ui/card";
// import { X } from "lucide-react";
// import { Button } from "../ui/button";

// const AdBanner = () => {
//   const [ad, setAd] = useState(null);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const fetchAd = async () => {
//       try {
//         const { data } = await api.get("/ads");
//         if (data.success && data.data.length > 0) {
//           const randomAd =
//             data.data[Math.floor(Math.random() * data.data.length)];
//           setAd(randomAd);
//         }
//       } catch (error) {
//         // --- THIS IS THE KEY ---
//         // If ads fail to load, we just log the error and do nothing.
//         // The component will return null and the user won't see a broken element.
//         console.error("Could not fetch ad:", error);
//       }
//     };
//     fetchAd();
//   }, []);

//   // If there's no ad, or the user closed it, render nothing.
//   if (!ad || !visible) {
//     return null;
//   }

//   return (
//     <Card className="mt-8 mb-4 p-2 relative border-dashed border-yellow-500">
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute top-1 right-1 h-6 w-6 z-10"
//         onClick={() => setVisible(false)}
//       >
//         <X className="h-4 w-4" />
//       </Button>
//       <a href={ad.link} target="_blank" rel="noopener sponsored">
//         <img
//           src={ad.imageUrl}
//           alt={ad.title || "Advertisement"}
//           className="w-full h-auto object-contain rounded-md max-h-48"
//         />
//       </a>
//       <p className="text-xs text-muted-foreground text-center mt-1">
//         Advertisement
//       </p>
//     </Card>
//   );
// };

// export default AdBanner;
import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "../ui/button";

const AdBanner = () => {
  const [ad, setAd] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const { data } = await api.get("/ads");
        if (data.success && data.data.length > 0) {
          const randomAd =
            data.data[Math.floor(Math.random() * data.data.length)];
          setAd(randomAd);
        }
      } catch (error) {
        console.error("Could not fetch ad:", error);
      }
    };
    fetchAd();
  }, []);

  if (!ad || !visible) {
    return null;
  }

  return (
    <Card className="mt-8 mb-4 p-2 relative border-dashed border-yellow-500">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1 right-1 h-6 w-6 z-10"
        onClick={() => setVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
      <a href={ad.link} target="_blank" rel="noopener sponsored">
        <img
          src={ad.imageUrl}
          alt={ad.title || "Advertisement"}
          className="w-full h-auto object-contain rounded-md max-h-[400px]"
        />
      </a>
      <p className="text-xs text-muted-foreground text-center mt-1">
        Advertisement
      </p>
    </Card>
  );
};

export default AdBanner;
