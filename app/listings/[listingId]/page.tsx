import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import Clientonly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "../ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Promise<IParams> }) => {
  const resolvedParams = await params;
  const listing = await getListingById(resolvedParams);
  const reservations = await getReservations(await params);
  const currentUser = await getCurrentUser();
  if (!listing) {
    return (
      <Clientonly>
        <EmptyState />
      </Clientonly>
    );
  }

  return (
    <Clientonly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservation={reservations}
      />
    </Clientonly>
  );
};

export default ListingPage;
