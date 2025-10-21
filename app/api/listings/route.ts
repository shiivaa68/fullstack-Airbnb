import { NextResponse } from "next/server";
import { prisma } from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    // ✅ Basic Validation
    if (
      !title ||
      !description ||
      !imageSrc ||
      !category ||
      !roomCount ||
      !bathroomCount ||
      !guestCount ||
      !location?.value ||
      !price
    ) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);

  } catch (error) {
    console.error("[LISTING_POST_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
