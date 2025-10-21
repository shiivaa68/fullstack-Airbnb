import { prisma } from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return safeFavorites;
  } catch (error) {
    console.error("[GET_FAVORITE_LISTINGS_ERROR]", error); // ✅ safe log
    throw new Error("Failed to fetch favorite listings"); // ✅ no any, no unsafe throw
  }
}
