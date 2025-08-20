'use client'

import { useOptimistic, useTransition } from 'react'
import { Profile, ProfileUpdate } from '@/lib/types/profile'
import { updateProfile } from '@/lib/actions/profile'

export function useProfile(initialProfile: Profile | null) {
  const [isPending, startTransition] = useTransition()
  const [optimisticProfile, updateOptimisticProfile] = useOptimistic(
    initialProfile,
    (state: Profile | null, updates: ProfileUpdate) => {
      if (!state) return state
      return { ...state, ...updates, updated_at: new Date().toISOString() }
    }
  )

  const updateProfileOptimistically = (updates: ProfileUpdate) => {
    if (!initialProfile) return

    startTransition(async () => {
      // Update optimistically first
      updateOptimisticProfile(updates)
      
      // Then update on the server
      const result = await updateProfile(initialProfile.id, updates)
      
      if (!result.success) {
        // If server update fails, we could revert the optimistic update
        // For now, we'll just log the error
        console.error('Failed to update profile:', result.error)
      }
    })
  }

  return {
    profile: optimisticProfile,
    updateProfile: updateProfileOptimistically,
    isPending,
    isUpdating: isPending
  }
}

