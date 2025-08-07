import { useState, useEffect } from "react";
import axios from "../../api/axios";
import i18n from "../i18n";

export default function SingleImage({ category = "Human" }) {
  const [image, setImage] = useState(null);

  const fetchLastImage = async (lang, category) => {
    try {
      const res = await axios.get(`/sliderimage/${category}/${lang}`);
      const validImages = Array.isArray(res.data.images) ? res.data.images : [];
      const lastImage = validImages[validImages.length - 1]; 
      setImage(lastImage || null);
    } catch (error) {
      console.error("Failed to fetch image:", error);
      setImage(null);
    }
  };

  useEffect(() => {
    const lang = i18n.language || "en";
    fetchLastImage(lang, category);

    const onLangChanged = (lng) => {
      fetchLastImage(lng, category);
    };

    i18n.on("languageChanged", onLangChanged);

    return () => {
      i18n.off("languageChanged", onLangChanged);
    };
  }, [category]);

  if (!image) {
    return (
      <div className="w-full h-[300px] flex justify-center items-center text-gray-500">
        Loading image...
      </div>
    );
  }

  return (
    <div className="relative w-full mx-auto">
      <div className="relative w-full h-full overflow-hidden">
        <img
          src={image.url}
          alt="Last Image"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    </div>
  );
}
