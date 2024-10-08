CREATE TABLE IF NOT EXISTS public.prices
(
    id                   serial           primary key,
    price                double precision not null,
    created_date         timestamp,
    listing_id           integer not null references public.listing(id)
);
