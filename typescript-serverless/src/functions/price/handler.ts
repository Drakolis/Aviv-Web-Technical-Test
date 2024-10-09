import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/prices";
import { Price } from "@/types.generated";

export const getListingPrices = functionHandler<Price[]>(
  async (event, context) => {
    const listingId = parseInt(event.pathParameters.id)
    const prices = await getRepository(context.postgres).getPricesForListing(listingId);
    return { statusCode: 200, response: prices };
  }
);
