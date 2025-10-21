"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/UseFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}
const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative w-8 h-8 cursor-pointer hover:opacity-80 transition"
    >
      {/* Outline Heart */}
      <AiOutlineHeart size={32} className="absolute inset-0 text-white" />
      {/* Filled Heart */}
      <AiFillHeart
        size={32}
        className={`absolute inset-0 transition-colors ${
          hasFavorited ? "text-rose-500" : "text-neutral-500/70"
        }`}
      />
    </div>
  );
};
export default HeartButton;
