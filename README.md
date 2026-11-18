# Employee Knowledge Rescue

A MERN hackathon prototype for DemoTech Solutions. It preserves institutional knowledge in one searchable library and lets employees ask a grounded AI assistant questions using only company knowledge.

## Included

- Secure JWT login with hashed passwords and Admin/Employee access control
- Admin dashboard with usage statistics, knowledge gaps and employee directory
- Knowledge library search plus creation of SOPs, guides, procedures and solved tickets
- Grounded AI endpoint: searches MongoDB first, then passes only selected company sources to OpenAI
- Safe fallback when nothing sufficient is found, with automatic aggregated knowledge-gap tracking
- Question history and visible answer sources
- Demo data for duplicate payments, refunds, leave, damaged delivery and support

## Run it locally

1. Start MongoDB locally, or use MongoDB Atlas, then set `MONGODB_URI` in `server/.env`.
2. Optionally add `OPENAI_API_KEY` to `server/.env`. Without a key, the app remains demonstrable and returns the top matching company knowledge verbatim; with a key it produces a concise grounded answer.
3. Seed the DemoTech data:

   ```powershell
   npm run seed
   ```

4. Run the React site and Express API together:

   ```powershell
   npm run dev
   ```

5. Open `http://localhost:5173`.

Demo accounts:

- Admin: `admin@demotech.com` / `Admin@123`
- Employee: `amit@demotech.com` / `Demo@123`

## Production notes

Change the JWT secret, use a managed MongoDB deployment, set an OpenAI key only on the backend, and serve the React `client/dist` build from your chosen hosting environment.
