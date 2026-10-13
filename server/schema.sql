-- QwixAI PostgreSQL Database Schema

CREATE TABLE IF NOT EXISTS creations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  publish BOOLEAN DEFAULT FALSE,
  likes TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index for fetching creations by user_id
CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations (user_id);

-- Index for fetching published community creations
CREATE INDEX IF NOT EXISTS idx_creations_publish ON creations (publish);
