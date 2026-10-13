# QwixAI

QwixAI is a full-stack AI content generation platform for writing articles, creating blog titles, generating images, removing backgrounds, removing objects, reviewing resumes, and sharing creations with a community.



## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: Clerk
- AI APIs: Groq and Clipdrop
- Media Storage: Cloudinary

## Features

- AI article generation
- Blog title generation
- AI image generation
- Background removal
- Object removal from images
- Resume review and ATS feedback
- User dashboard and published creations
- Community likes and sharing

## Local Development

### 1. Install dependencies

Client:

```bash
cd client
npm install
```

Server:

```bash
cd server
npm install
```

### 2. Configure environment variables

Create a `.env` file in the client and server folders using the examples below:

Client:

```bash
cp client/.env.example client/.env
```

Server:

```bash
cp server/.env.example server/.env
```

Example values:

```env
# client/.env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

```env
# server/.env
PORT=3000
CLERK_SECRET_KEY=your_clerk_secret_key
DATABASE_URL=your_postgres_connection_string
GROQ_API_KEY=your_groq_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 3. Run the app

Start the backend:

```bash
cd server
npm run server
```

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

Then open the local frontend URL shown by Vite, usually:

```text
http://localhost:5173
```

## Notes

- The frontend expects your Clerk publishable key and backend URL.
- The backend requires valid Cloudinary, Clerk, PostgreSQL, and AI provider credentials to run the generation features.
- If you deploy, set the production values in your hosting environment variables.
