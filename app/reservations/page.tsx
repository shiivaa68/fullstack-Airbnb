import Clientonly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <Clientonly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </Clientonly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });
  if (reservations.length === 0) {
    return (
      <Clientonly>
        <EmptyState
          title="No reservations found"
          subtitle="looks like you have no reservations on your properties"
        />
      </Clientonly>
    );
  }
  return (
    <Clientonly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Clientonly>
  );
};

export default ReservationPage;
