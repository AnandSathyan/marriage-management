# Environment Setup Instructions

## 📝 Important: Database Setup Required

Before running the application, you need to:

1. **Update the `.env` file** with your actual database credentials

### Current `.env` Content:
```
DATABASE_URL="postgresql://user:password@localhost:5432/marriage_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="change-this-to-a-random-secret-key"
```

### Steps to Update:

1. **Install PostgreSQL** (if not already installed)
   - macOS: `brew install postgresql`
   - Windows: Download from https://www.postgresql.org/download/
   - Linux: `sudo apt-get install postgresql`

2. **Start PostgreSQL service**
   - macOS: `brew services start postgresql`
   - Linux: `sudo service postgresql start`
   - Windows: Use services.msc

3. **Create the database**
   ```bash
   createdb marriage_db
   ```
   
   Or using psql:
   ```bash
   psql postgres
   CREATE DATABASE marriage_db;
   \q
   ```

4. **Update `.env` with your credentials**
   - Replace `user` with your PostgreSQL username (usually `postgres`)
   - Replace `password` with your PostgreSQL password
   - Keep `marriage_db` as the database name (or change if you used a different name)

5. **Generate a secure NEXTAUTH_SECRET**
   - Visit: https://generate-secret.vercel.app/32
   - Copy the generated secret
   - Replace `change-this-to-a-random-secret-key` with your generated secret

### Example Updated `.env`:
```
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/marriage_db?schema=public"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6"
```

## 🚀 After Setup:

Once your `.env` is configured, run:

```bash
# Run database migrations
npm run migrate:dev
# Enter migration name: initial_migration

# Create admin users
npm run create:admin

# Start the development server
npm run dev
```

## ✅ Verification:

After running migrations, verify the tables were created:
```bash
psql marriage_db
\dt
# You should see: User, Profile, Comment, FollowUp
\q
```

## 🆘 Troubleshooting:

**Error: "Could not connect to database"**
- Check PostgreSQL is running: `pg_isready`
- Verify credentials in `.env`
- Ensure database exists: `createdb marriage_db`

**Error: "relation does not exist"**
- Run migrations: `npm run migrate:dev`
- Regenerate Prisma client: `npm run generate:prisma`

**Error: "password authentication failed"**
- Check your PostgreSQL password
- On macOS, you might need to set a password: `psql postgres` then `ALTER USER postgres PASSWORD 'yourpassword';`
