# Backend Setup

The backend runs inside the Next.js app through route handlers in `src/app/api`.

## Environment

Copy `.env.example` to `.env.local` locally, then set:

- `AUTH_SECRET`: long random string used by Auth.js
- `AUTH_TRUST_HOST`: `true`
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_EMAIL`: admin login email
- `CLOUDINARY_URL`: Cloudinary API environment variable for admin uploads
- `RESEND_API_KEY`: Resend API key used for admin verification emails
- `RESEND_FROM`: verified Resend sender, for example `Edvolve Foundation <admin@edvolvefoundation.org>`

Do not commit `.env.local`.

## Database

Apply the schema to Postgres:

```bash
npm run db:schema
```

For Railway Postgres with the app hosted on Railway, set the app service `DATABASE_URL` as a reference variable from the Postgres service. Railway keeps that value in sync if database credentials change.

The schema creates tables for:

- admin accounts
- admin OTPs
- blogs
- staff members
- reports
- events
- contact messages
- registrations

## Authentication

Admin auth uses Auth.js/NextAuth Credentials provider with a database-backed admin password and email OTP verification.

Only `ADMIN_EMAIL` can authenticate. On first use, the admin creates a password and confirms it with a 6-character alphanumeric OTP sent by Resend. Every later login verifies email and password first, then sends a fresh OTP before creating the session. Password reset uses the same Resend OTP flow. Admin sessions expire after 24 hours.

Routes under `/admin/*` are protected by `src/proxy.js`.
Admin API mutations call `requireAdminSession()` before changing data.

## API Routes

Public reads:

- `GET /api/blogs`
- `GET /api/blogs/:id`
- `GET /api/staff`
- `GET /api/reports`
- `GET /api/events`

Public submissions:

- `POST /api/contact`
- `POST /api/registrations`

Admin auth flow:

- `GET /api/admin/auth/status`
- `POST /api/admin/auth/setup/request`
- `POST /api/admin/auth/setup/verify`
- `POST /api/admin/auth/login/request-otp`
- `POST /api/admin/auth/password-reset/request`
- `POST /api/admin/auth/password-reset/verify`

Admin-only reads/mutations:

- `GET /api/admin/stats`
- `GET /api/contact`
- `PATCH /api/contact/:id`
- `DELETE /api/contact/:id`
- `GET /api/registrations`
- `PATCH /api/registrations/:id`
- `DELETE /api/registrations/:id`
- `POST /api/blogs`
- `PATCH /api/blogs/:id`
- `DELETE /api/blogs/:id`
- `POST /api/staff`
- `GET /api/staff/:id`
- `PATCH /api/staff/:id`
- `DELETE /api/staff/:id`
- `POST /api/reports`
- `PATCH /api/reports/:id`
- `DELETE /api/reports/:id`
- `POST /api/events`
- `PATCH /api/events/:id`
- `DELETE /api/events/:id`

Admin uploads use Cloudinary through `POST /api/uploads`. Image and PDF uploads are supported up to 10MB, and the database stores the returned Cloudinary URL.

## Production Notes

- App/backend hosting: Railway
- Database: Railway Postgres in the same Railway project
- Uploads: Cloudinary
- DNS: managed at Go54/Ugohost

Use Railway service variables for `DATABASE_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST`, `ADMIN_EMAIL`, `CLOUDINARY_URL`, `RESEND_API_KEY`, and `RESEND_FROM`. Only DNS records for the custom domain need to be sent to Go54/Ugohost after the Railway domain is added.

Railway deployment uses Next.js standalone output:

```bash
npm run build
npm start
```

The checked-in app assets are large enough that `railway up` from the project root can time out on slow networks. For CLI deploys, use the small Docker context instead:

```bash
railway up deploy/railway --path-as-root --service edvolve-web
```
