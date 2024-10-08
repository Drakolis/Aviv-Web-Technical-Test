import PostgresClient from "serverless-postgres";
import { Listing, Price, PriceWrite } from "@/types.generated";
import { extractVariables } from "@/libs/postgres";

type PricesTableRow = {
  id?: number;
  created_date: Date;
  price: number;
  listing_id: number;
};


function tableRowToPrice(row: PricesTableRow): Price {
  return {
    created_date: row.created_date.toISOString(),
    price_eur: row.price,
  };
}

function priceToTableRow(
  price: PriceWrite,
  forListingId: number,
): PricesTableRow {
  return {
    created_date: new Date(),
    price: price.price_eur,
    listing_id: forListingId,
  };
}

export function getRepository(postgres: PostgresClient) {
  return {
    async getPricesForListing(listingId: number): Promise<Price[]> {
      const queryString = `SELECT * FROM prices WHERE listing_id = $1`;
      const queryValues = [listingId];

      const result = await postgres.query(queryString, queryValues);


      return result.rows.map(tableRowToPrice);
    },

    async insertPriceForListing(price: PriceWrite, listing: Listing) {
      const tableRow = priceToTableRow(price, listing.id);

      const {
        columns,
        variables,
        values: queryValues,
      } = extractVariables(tableRow);

      const queryString = `
        INSERT INTO price (${columns.join(",")})
        VALUES(${variables})
        RETURNING *
      `;
      const result = await postgres.query(queryString, queryValues);

      return tableRowToPrice(result.rows[0]);
    },
  };
}
