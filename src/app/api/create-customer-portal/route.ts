import Stripe from "stripe";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const customerId = url.searchParams.get("customer");

  if (!customerId) return redirect("/locker");

  const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);

  const prices = await stripe.prices.list({
    expand: ["data.product"],
  });
  const products = prices.data.map((p) => ({
    //@ts-expect-error
    product: p.product.id,
    prices: [p.id],
  }));

  const configuration = await stripe.billingPortal.configurations.create({
    business_profile: {
      headline: "Cloud Locker partners with Stripe for simplified billing.",
    },
    features: {
      subscription_update: {
        enabled: true,
        default_allowed_updates: ["price"],
        products,
      },
      payment_method_update: {
        enabled: true,
      },
      subscription_cancel: {
        mode: "at_period_end",
        enabled: true,
      },
      invoice_history: {
        enabled: true,
      },
    },
  });

  const session = await stripe.billingPortal.sessions.create({
    configuration: configuration.id,
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/locker`,
  });

  redirect(session.url);
}
