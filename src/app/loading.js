"use client";
import { useState, useEffect } from "react";

export default function LoadingVideo({ onVideoEnd }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check screen width
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // প্রথমে চেক করা
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile এবং Desktop ভিডিও আলাদা
  const videoSrc = isMobile
    ? "https://res.cloudinary.com/dmb58pab9/video/upload/v1755263640/Purple_Cute_Aninated_Welcome_to_My_Channel_Mobile_Video_2_xbftau.mp4"
    : "https://res.cloudinary.com/dmb58pab9/video/upload/v1755263613/Beige_and_Brown_Neutral_Elegant_Welcome_YouTube_Intro_Video_1_ofhkqk.mp4";

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <video
        src={videoSrc}
        autoPlay
        muted
        onEnded={onVideoEnd}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
