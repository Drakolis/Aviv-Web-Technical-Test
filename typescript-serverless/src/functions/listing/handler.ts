import { functionHandler } from "@/libs/function";
import { getRepository } from "@/repositories/listings";
import { getRepository as getPricesRepository } from "@/repositories/prices";
import { Listing, ListingWrite } from "@/types.generated";
import { EntityNotFound, NotFound } from "@/libs/errors";

export const getListings = functionHandler<Listing[]>(
  async (_event, context) => {
    const listings = await getRepository(context.postgres).getAllListings();

    return { statusCode: 200, response: listings };
  }
);

export const addListing = functionHandler<Listing, ListingWrite>(
  async (event, context) => {
    const listing = await getRepository(context.postgres).insertListing(
      event.body
    );
    await getPricesRepository(context.postgres).insertPriceForListing(
      { price_eur: event.body.latest_price_eur}, listing
    );

    return { statusCode: 201, response: listing };
  }
);

export const updateListing = functionHandler<Listing, ListingWrite>(
  async (event, context) => {
    try {
      const listing = await getRepository(context.postgres).updateListing(
        parseInt(event.pathParameters.id),
        event.body
      );
      await getPricesRepository(context.postgres).insertPriceForListing(
        { price_eur: event.body.latest_price_eur}, listing
      );

      return { statusCode: 200, response: listing };
    } catch (e) {
      if (e instanceof EntityNotFound) {
        throw new NotFound(e.message);
      }

      throw e;
    }
  }
);
