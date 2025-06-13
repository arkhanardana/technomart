"use server";

import { getUser } from "@/lib/auth";
import db from "@/lib/db";
import { schemaShippingAddress } from "@/lib/schema";
import { generateRandomString } from "@/lib/utils";
import xenditClient from "@/lib/xendit";
import { ActionResult, TCart } from "@/types";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import { PaymentRequestParameters, PaymentRequest } from "xendit-node/payment_request/models";

export async function postOrder(
  _: unknown,
  formData: FormData,
  total: number,
  products: TCart[]
): Promise<ActionResult> {
  const { session, user } = await getUser();

  if (!session) {
    return redirect("/");
  }

  const validated = schemaShippingAddress.safeParse({
    name: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    postal_code: formData.get("postal_code"),
    notes: formData.get("notes"),
    phone: formData.get("phone"),
  });

  if (!validated.success) {
    return {
      error: validated.error.errors[0].message,
    };
  }

  let redirectPaymentUrl = "/";

  try {
    const order = await db.order.create({
      data: {
        total,
        status: "pending",
        user_id: Number(user.id),
        code: generateRandomString(15),
      },
    });

    const data: PaymentRequestParameters = {
      amount: total,
      paymentMethod: {
        ewallet: {
          channelProperties: {
            successReturnUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
          },
          channelCode: "SHOPEEPAY",
        },
        reusability: "ONE_TIME_USE",
        type: "EWALLET",
      },
      currency: "IDR",
      referenceId: order.code,
    };

    const response: PaymentRequest = await xenditClient.PaymentRequest.createPaymentRequest({
      data,
    });

    redirectPaymentUrl = response.actions?.find((value) => value.urlType === "DEEPLINK")?.url ?? "";

    const queryProductOrder: Prisma.OrderProductCreateManyInput[] = [];

    for (const product of products) {
      queryProductOrder.push({
        order_id: order.id,
        product_id: product.id,
        subtotal: product.price,
        quantity: product.quantity,
      });
    }

    await db.orderProduct.createMany({
      data: queryProductOrder,
    });

    await db.orderDetail.create({
      data: {
        address: validated.data.address,
        city: validated.data.city,
        name: validated.data.name,
        phone: validated.data.phone,
        postal_code: validated.data.postal_code,
        notes: validated.data.notes,
        order_id: order.id,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to checkout",
    };
  }

  return redirect(redirectPaymentUrl);
}
