INSERT INTO prices (price, created_date, listing_id)
SELECT
	price as price,
	updated_date as created_date,
	id as listing_id
FROM listing
