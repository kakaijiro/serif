'use server'

import { createClient } from '@/lib/supabase/server'
import { Profile, ProfileUpdate, ProfileInsert } from '@/lib/types/profile'
import { revalidatePath } from 'next/cache'

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getProfile:', error)
    return null
  }
}

export async function updateProfile(userId: string, updates: ProfileUpdate): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (error) {
      console.error('Error updating profile:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    console.error('Error in updateProfile:', error)
    return { success: false, error: 'Failed to update profile' }
  }
}

export async function createProfile(profile: ProfileInsert): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('profiles')
      .insert(profile)

    if (error) {
      console.error('Error creating profile:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error in createProfile:', error)
    return { success: false, error: 'Failed to create profile' }
  }
}

export async function deleteProfile(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient()
    
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId)

    if (error) {
      console.error('Error deleting profile:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/profile')
    return { success: true }
  } catch (error) {
    console.error('Error in deleteProfile:', error)
    return { success: false, error: 'Failed to delete profile' }
  }
}

