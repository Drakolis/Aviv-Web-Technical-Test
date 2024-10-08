# AVIV technical test solution

STARTED: 14:14 October 8
FINISHED: 15:40 October 8

## Notes

Assume that price update happens together with the update/insert of the listing in the function handler.

Price in the listings is still the important one, while the price history is just like a changelog. In a way, the price history is not reliable since it's not happening in the transaction together with the listing update. This can be crucial in some cases, but for the simplicity of the code here I decided to not do that. Depending on how pricing history is used, storing and accessing it together with the listing (using JOIN queries and updating them in a transaction) can be a good approach, but it requires a lot of code changes.

Added some DB scripts due to lack of migration implementation in the repository:

### db/03_init_prices_table.sql

Script to create a new table `prices`.

### 04_set_initial_prices_data

Script to insert the existing data in to the `prices` from the `listing`.

## Questions

This section contains additional questions your expected to answer before the debrief interview.

- **What is missing with your implementation to go to production?**

- **How would you deploy your implementation?**

- **If you had to implement the same application from scratch, what would you do differently?**

- **The application aims at storing hundreds of thousands listings and millions of prices, and be accessed by millions
  of users every month. What should be anticipated and done to handle it?**

  NB: You must update the [given architecture schema](./schemas/Aviv_Technical_Test_Architecture.drawio) by importing it
  on [diagrams.net](https://app.diagrams.net/)
