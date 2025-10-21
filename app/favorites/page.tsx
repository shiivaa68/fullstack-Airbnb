import EmptyState from "../components/EmptyState";
import Clientonly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavoriteListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <Clientonly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorites listings"
        />
      </Clientonly>
    );
  }
  if (!currentUser) {
  return <EmptyState title="No user found"
          subtitle="Looks like you have no favorites listings" />;
}
  return (
    <Clientonly>
      <FavoritesClient listings={listings} currentUser={currentUser} />
    </Clientonly>
  );
};

export default ListingPage;
