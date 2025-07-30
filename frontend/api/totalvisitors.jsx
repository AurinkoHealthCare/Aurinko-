import { useEffect } from "react";
import axios from "../api/axios";

const TrackVisitor = () => {
  useEffect(() => {
    const track = async () => {
      try {
        const res = await axios.get("/visitors/track", {
          withCredentials: true,
        });
      } catch (error) {
        console.error("🔴 Error tracking visitor:", error.message);
      }
    };

    track();
  }, []);
};

export default TrackVisitor;
