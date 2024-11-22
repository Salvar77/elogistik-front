import mongooseConnect from "@/lib/mongoose";
import { Order } from "@/models/Order";

const stripe = require("stripe")(process.env.STRIPE_SK);

import { buffer } from "micro";

const endpointSecret = process.env.ENDPOINT_SECRET;

const handler = async (req, res) => {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
};

export default handler;

export const config = {
  api: { bodyParser: false },
};

// supple-redeem-loving-stable
// acct_1PX59AH8ZWEByA64
