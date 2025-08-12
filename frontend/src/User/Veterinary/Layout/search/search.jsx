import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const placeholderTexts = ["Poultry", "Swine", "Pet", "Equine", "Aqua"];

const Search = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = placeholderTexts[index];

    const typingSpeed = isDeleting ? 100 : 150;
    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (charIndex > 0) {
          setText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % placeholderTexts.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, charIndex]);

  return (
    <div className="relative flex items-center group">
      <div className="relative flex items-center border-b-2 group">
        <button className="transition-all">
          <FaSearch size={16} />
        </button>
        <input
          type="text"
          placeholder={`Search for ${text}`}
          className="pl-2 bg-transparent w-[120px] sm:w-[150px] md:w-[200px] lg:w-[250px] h-8 text-sm transition-all duration-300 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default Search;
