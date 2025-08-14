'use client'

import { useCallback, useRef, useState } from 'react'
import { useDropzone, type FileWithPath } from 'react-dropzone'
import { createClient } from '@/lib/supabase/client'

interface FileWithPreview extends FileWithPath {
  preview?: string
  errors: Array<{ message: string }>
}

interface SupabaseUploadOptions {
  bucketName: string
  path?: string
  allowedMimeTypes?: string[]
  maxFiles?: number
  maxFileSize?: number
}

export interface UseSupabaseUploadReturn {
  files: FileWithPreview[]
  setFiles: (files: FileWithPreview[]) => void
  onUpload: () => Promise<void>
  loading: boolean
  successes: string[]
  errors: Array<{ name: string; message: string }>
  isSuccess: boolean
  isDragActive: boolean
  isDragReject: boolean
  getRootProps: () => any
  getInputProps: () => any
  inputRef: React.RefObject<HTMLInputElement>
  maxFiles: number
  maxFileSize: number
  uploadedUrls: string[]
}

export function useSupabaseUpload({
  bucketName,
  path = '',
  allowedMimeTypes = [],
  maxFiles = 1,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
}: SupabaseUploadOptions): UseSupabaseUploadReturn {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState(false)
  const [successes, setSuccesses] = useState<string[]>([])
  const [errors, setErrors] = useState<Array<{ name: string; message: string }>>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  
  const supabase = createClient()

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[], rejectedFiles: any[]) => {
      // Clear previous state
      setSuccesses([])
      setErrors([])
      setUploadedUrls([])

      const processedFiles: FileWithPreview[] = acceptedFiles.map((file) => {
        const fileWithPreview = Object.assign(file, {
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          errors: [] as Array<{ message: string }>,
        })
        return fileWithPreview
      })

      // Add rejected files with errors
      const rejectedProcessedFiles: FileWithPreview[] = rejectedFiles.map(({ file, errors }) => {
        return Object.assign(file, {
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
          errors: errors,
        })
      })

      setFiles([...processedFiles, ...rejectedProcessedFiles])
    },
    []
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: allowedMimeTypes.length > 0 ? allowedMimeTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>) : undefined,
    maxFiles,
    maxSize: maxFileSize,
    multiple: maxFiles > 1,
  })

  // Helper function to generate organized file paths
  const generateFilePath = useCallback((filename: string): string => {
    // Extract file extension
    const fileExtMatch = filename.match(/\.([^.]+)$/)
    const fileExt = fileExtMatch ? fileExtMatch[1].toLowerCase() : 'jpg'
    
    // Clean the filename (remove extension and special chars)
    let cleanName = filename.replace(/\.[^.]+$/, '') // remove extension
    cleanName = cleanName.replace(/[^a-zA-Z0-9-_]/g, '-') // replace special chars
    cleanName = cleanName.replace(/-+/g, '-') // collapse multiple dashes
    cleanName = cleanName.replace(/^-+|-+$/g, '') // trim leading/trailing dashes
    
    // Limit length and ensure not empty
    cleanName = cleanName.substring(0, 50)
    if (cleanName.length === 0) {
      cleanName = 'image'
    }
    
    // Generate date-based path (YYYY/MM/DD)
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const datePath = `${year}/${month}/${day}`
    
    // Generate unique identifier to prevent conflicts
    const uniqueId = Math.random().toString(36).substring(2, 10)
    
    // Return the complete path
    return `${datePath}/${cleanName}-${uniqueId}.${fileExt}`
  }, [])

  const onUpload = useCallback(async () => {
    if (files.length === 0) return

    setLoading(true)
    setErrors([])
    setSuccesses([])
    setUploadedUrls([])

    const uploadPromises = files
      .filter((file) => file.errors.length === 0)
      .map(async (file) => {
        try {
          // Generate file path using client-side function
          const filePath = generateFilePath(file.name)

          const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false,
            })

          if (error) {
            throw error
          }

          // Get public URL
          const { data: urlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(data.path)

          setSuccesses((prev) => [...prev, file.name])
          setUploadedUrls((prev) => [...prev, urlData.publicUrl])
          
          return { success: true, file: file.name, url: urlData.publicUrl }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Upload failed'
          setErrors((prev) => [...prev, { name: file.name, message: errorMessage }])
          return { success: false, file: file.name, error: errorMessage }
        }
      })

    await Promise.all(uploadPromises)
    setLoading(false)
  }, [files, bucketName, supabase, generateFilePath])

  const isSuccess = successes.length > 0 && successes.length === files.filter(f => f.errors.length === 0).length

  return {
    files,
    setFiles,
    onUpload,
    loading,
    successes,
    errors,
    isSuccess,
    isDragActive,
    isDragReject,
    getRootProps,
    getInputProps,
    inputRef,
    maxFiles,
    maxFileSize,
    uploadedUrls,
  }
}