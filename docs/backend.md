# Backend Setup

The backend runs inside the Next.js app through route handlers in `src/app/api`.

## Environment

Copy `.env.example` to `.env.local` locally, then set:

- `AUTH_SECRET`: long random string used by Auth.js
- `AUTH_TRUST_HOST`: `true`
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_EMAIL`: admin login email
- `ADMIN_PASSWORD_HASH`: bcrypt hash of the admin password
- `CLOUDINARY_URL`: Cloudinary API environment variable for admin uploads

Do not commit `.env.local`.

## Database

Apply the schema to Postgres:

```bash
npm run db:schema
```

For Railway Postgres with the app hosted on Railway, set the app service `DATABASE_URL` as a reference variable from the Postgres service. Railway keeps that value in sync if database credentials change.

The schema creates tables for:

- blogs
- staff members
- reports
- events
- contact messages
- registrations

## Authentication

Admin auth uses Auth.js/NextAuth Credentials provider.

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

Use Railway service variables for `DATABASE_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST`, `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `CLOUDINARY_URL`. Only DNS records for the custom domain need to be sent to Go54/Ugohost after the Railway domain is added.

Railway deployment uses Next.js standalone output:

```bash
npm run build
npm start
```
