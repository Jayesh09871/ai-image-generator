import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { checkout, polar, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { env } from "~/env";
import { db } from "~/server/db";

const polarClient = new Polar({
  accessToken: env.POLAR_ACCESS_TOKEN,
  server: "sandbox",
});

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "f3f74ca3-f6d3-47c1-b14c-db06fea2e35d",
              slug: "small",
            },
            {
              productId: "79ce77e1-53bf-4e91-bd7d-00cc6b1b5425",
              slug: "medium",
            },
          ],
          successUrl: "/dashboard",
          authenticatedUsersOnly: true,
        }),
        portal(),
        webhooks({
          secret: env.POLAR_WEBHOOK_SECRET,
          onOrderPaid: async (order) => {
            const externalCustomerId = order.data.customer.externalId;

            if (!externalCustomerId) {
              console.error("No external customer ID found.");
              throw new Error("No external customer id found.");
            }

            const productId = order.data.productId;

            let creditsToAdd = 0;

            switch (productId) {
              case "f3f74ca3-f6d3-47c1-b14c-db06fea2e35d":
                creditsToAdd = 100;
                break;
              case "79ce77e1-53bf-4e91-bd7d-00cc6b1b5425":
                creditsToAdd = 500;
                break;
            }

            await db.user.update({
              where: { id: externalCustomerId },
              data: {
                credits: {
                  increment: creditsToAdd,
                },
              },
            });
          },
        }),
      ],
    }) as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  ],
});
