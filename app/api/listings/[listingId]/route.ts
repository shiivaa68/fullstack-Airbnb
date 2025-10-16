import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  context: { params: Promise<IParams> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.error();
    }

    // ✅ Await params
    const { listingId } = await context.params;

    // ✅ listingId should exist and be a string
    if (!listingId) {
      throw new Error("Invalid ID");
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.error();
  }
}
