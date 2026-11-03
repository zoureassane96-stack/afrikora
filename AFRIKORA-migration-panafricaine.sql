-- AFRIKORA : migration panafricaine minimale
-- À exécuter dans Supabase SQL Editor AVANT de publier cette version.
-- Sauvegarder la base avant toute migration.

alter table public.annonces
  add column if not exists country_code text not null default 'BF';

alter table public.profiles
  add column if not exists country_code text;

create index if not exists annonces_country_created_idx
  on public.annonces (country_code, created_at desc);

-- Les anciennes annonces sont conservées et rattachées au Burkina Faso par défaut.
update public.annonces set country_code = 'BF' where country_code is null or country_code = '';
