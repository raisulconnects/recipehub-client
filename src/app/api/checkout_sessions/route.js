import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const session = await auth.api.getSession({ headers: headersList });
    const user = session?.user;
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1TmGnVJ6sfFr40afUggEirDd",
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: {
        userId: user.id,
        userEmail: user.email,
        type: "premium",
      },
      success_url: `${origin}/premium-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/premium`,
    });
    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
