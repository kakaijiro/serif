export interface Profile {
  id: string;
  first_name: string | null;
  avatar_url: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileUpdate {
  first_name?: string;
  avatar_url?: string;
}

export interface ProfileInsert {
  first_name?: string;
  avatar_url?: string;
  email?: string;
}

