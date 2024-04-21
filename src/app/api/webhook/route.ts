import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";

import { database } from "@/lib/firebase";
import { changeSubscription } from "@/services/userService";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    let event: Stripe.Event;
    const payload = await req.json();
    const signature = req.headers.get("stripe-signature") as string;

    if (!endpointSecret) return;

    event = stripe.webhooks.constructEvent(payload, signature, endpointSecret);
    const subscription = event.data.object as Stripe.Subscription;

    const q = query(
      collection(database, "users"),
      where("customer", "==", subscription.customer)
    );
    const querySnapshots = await getDocs(q);

    if (querySnapshots.docs.length > 0) {
      const userId = querySnapshots.docs[0].id;

      if (event.type === "customer.subscription.updated") {
        const plan =
          subscription.items.data[0].price.unit_amount == 999
            ? "standard"
            : "premium";
        await changeSubscription(userId, subscription.id, plan);
      } else if (event.type === "customer.subscription.deleted") {
        await changeSubscription(userId, subscription.id, "free");
      }
    }
  } catch (error) {
    return NextResponse.json({ status: "Failed", error }, { status: 400 });
  }

  NextResponse.json({ received: true });
}
