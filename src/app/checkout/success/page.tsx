import Stripe from "stripe";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { createSubscription } from "@/services/userService";

type Props = {
  searchParams: {
    session_id?: string;
  };
};

const CheckoutSuccessPage = async ({ searchParams }: Props) => {
  if (!searchParams.session_id) return redirect("/locker");

  const { userId } = auth();

  try {
    const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);
    const checkoutSession = await stripe.checkout.sessions.retrieve(
      searchParams.session_id
    );

    if (checkoutSession?.customer && userId) {
      const plan =
        checkoutSession.amount_total === 999 ? "standard" : "premium";
      await createSubscription(
        userId!,
        plan,
        checkoutSession.customer as string,
        checkoutSession.subscription as string
      );
    }

    redirect("/locker");
  } catch (error) {
    redirect("/locker");
  }
};

export default CheckoutSuccessPage;
