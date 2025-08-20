import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from '@/components/profile/profile-form'
import { getProfile } from '@/lib/actions/profile'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  // Get the current user
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Get the user's profile
  const profile = await getProfile(user.id)

  if (!profile) {
    // This shouldn't happen if the trigger is working correctly
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Profile Not Found
          </h1>
          <p className="text-gray-600">
            Your profile could not be found. Please contact support.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Your Profile
        </h1>
        
        <ProfileForm profile={profile} />
      </div>
    </div>
  )
}

