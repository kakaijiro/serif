// Profile interface for the 'profiles' table in Supabase
// Represents extended user data associated with auth.users

export interface Profile {
  /** UUID of the user, matches auth.users.id */
  id: string;
  /** Optional first name of the user */
  first_name?: string;
  /** Optional avatar URL for the user */
  avatar_url?: string;
  /** Email address of the user */
  email: string;
  /** Timestamp when the profile was created (ISO 8601) */
  created_at: string;
  /** Timestamp when the profile was last updated (ISO 8601) */
  updated_at: string;
}