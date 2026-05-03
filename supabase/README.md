# Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Fill in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Do not expose it in client code.
5. Run `supabase/schema.sql` in the Supabase SQL editor.

The initial MVP keeps UI state in browser storage. The next implementation step is replacing the local stores with these tables:

- `profiles`
- `students`
- `message_generations`
- `templates`
- `subscriptions`
