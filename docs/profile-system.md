# Profile System Documentation

## Overview

The profile system automatically creates a profile record when a user signs up through Supabase Auth. It includes Row Level Security (RLS) policies to ensure users can only access and modify their own data.

## Database Schema

### Profiles Table

```sql
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    first_name TEXT,
    avatar_url TEXT,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Key Features

- **Automatic Profile Creation**: A trigger automatically creates a profile when a user signs up
- **Row Level Security**: Users can only access their own profile data
- **Cascade Delete**: When a user is deleted, their profile is automatically removed
- **Audit Trail**: `created_at` and `updated_at` timestamps are automatically managed

## Security

### RLS Policies

- **SELECT**: Users can only view their own profile
- **UPDATE**: Users can only update their own profile
- **INSERT**: Users can only insert their own profile (though this is handled by trigger)
- **DELETE**: Users can only delete their own profile

### Trigger Function

The `handle_new_user()` function automatically creates a profile when a new user signs up:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, first_name, email)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        NEW.email
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Usage

### Server Actions

The system provides server actions for profile operations:

- `getProfile(userId)`: Fetch a user's profile
- `updateProfile(userId, updates)`: Update profile information
- `createProfile(profile)`: Manually create a profile (if needed)
- `deleteProfile(userId)`: Delete a profile

### Client Hook

Use the `useProfile` hook for optimistic updates:

```typescript
const { profile, updateProfile, isUpdating } = useProfile(initialProfile)

// Update profile with optimistic UI
updateProfile({ first_name: 'New Name' })
```

### Components

- `ProfileForm`: Form component for editing profile information
- `ProfilePage`: Page component that displays and allows editing of profile

## Migration

To apply the database changes:

```bash
# Apply the migration to your Supabase project
pnpm supabase db push
```

## Environment Variables

Ensure your Supabase environment variables are set:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Performance Considerations

- Index on `id` field for fast lookups
- Optimistic updates for better UX
- Server-side validation and error handling
- Proper error boundaries and loading states

## Security Best Practices

- All profile operations go through server actions
- RLS policies enforce data isolation
- Input validation on both client and server
- No sensitive data exposed to the client
- Proper error handling without information leakage

