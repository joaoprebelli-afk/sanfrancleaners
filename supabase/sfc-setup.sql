-- SanFranCleaners: setup do projeto Supabase novo (mtmfqzsokqykgvodmsdf)
-- Rodar uma vez em: Supabase > SQL Editor > New query > colar tudo > Run

-- 1) Tabela de leads (mesmas colunas do site atual + status para acompanhar)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text not null default '',
  message text,
  timeline text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

-- O site (chave publishable / role anon) só pode INSERIR. Ler, editar e apagar só pelo painel.
grant usage on schema public to anon, authenticated;
grant insert on public.leads to anon, authenticated;

drop policy if exists "site can insert leads" on public.leads;
create policy "site can insert leads" on public.leads
  for insert to anon, authenticated
  with check (
    char_length(name) between 1 and 200
    and char_length(phone) between 7 and 40
    and char_length(coalesce(message, '')) <= 4000
  );

-- 2) Bucket privado para fotos dos clientes (o upload no site vem no próximo patch)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('lead-photos', 'lead-photos', false, 10485760,
        array['image/jpeg','image/png','image/webp','image/heic','image/heif'])
on conflict (id) do update
  set public = false,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- O site pode só enviar fotos para esse bucket. Ninguém de fora consegue listar ou baixar.
drop policy if exists "site can upload lead photos" on storage.objects;
create policy "site can upload lead photos" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'lead-photos');
