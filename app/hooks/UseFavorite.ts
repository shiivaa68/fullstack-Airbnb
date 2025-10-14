import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentuser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentuser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentuser, listingId]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentuser) {
        return loginModal.onOpen();
      }
      try {
        let request;
        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
        }
        await request();
        router.refresh();
        toast.success("success");
      } catch (error) {
        toast.error("sth went wrong");
      }
    },
    [currentuser, hasFavorited, listingId, loginModal, router]
  );
  return {
    hasFavorited,
    toggleFavorite,
  };
};
export default useFavorite;
