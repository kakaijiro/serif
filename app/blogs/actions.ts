"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional().transform((v) => v ?? ""),
  // Allow empty string or a valid URL for image
  image: z.union([z.string().url("Image must be a valid URL"), z.literal("")]).optional().transform((v) => v ?? ""),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
})

export async function createBlog(formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const parseResult = blogSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle") ?? undefined,
    image: formData.get("image") ?? undefined,
    content: formData.get("content"),
    author: formData.get("author"),
  })

  if (!parseResult.success) {
    return
  }

  const values = parseResult.data

  // Authn gate for write
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data, error } = await supabase
    .from("blogs")
    .insert({
      title: values.title,
      subtitle: values.subtitle || null,
      image: values.image || null,
      content: values.content,
      author: values.author,
    })
    .select("slug")
    .single()

  if (error || !data) {
    return
  }

  revalidatePath("/blogs")
  redirect(`/blogs/${data.slug}?toast=created`)
}

export async function updateBlog(slug: string, formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const parseResult = blogSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle") ?? undefined,
    image: formData.get("image") ?? undefined,
    content: formData.get("content"),
    author: formData.get("author"),
  })

  if (!parseResult.success) {
    return
  }

  const values = parseResult.data

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data, error } = await supabase
    .from("blogs")
    .update({
      title: values.title,
      subtitle: values.subtitle || null,
      image: values.image || null,
      content: values.content,
      author: values.author,
    })
    .eq("slug", slug)
    .select("slug")
    .single()

  if (error || !data) {
    return
  }

  revalidatePath("/blogs")
  revalidatePath(`/blogs/${data.slug}`)
  if (data.slug !== slug) {
    redirect(`/blogs/${data.slug}?toast=updated`)
  }
  redirect(`/blogs/${slug}?toast=updated`)
}

export async function deleteBlog(slug: string, _formData: FormData) {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("slug", slug)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath("/blogs")
  redirect("/blogs?toast=deleted")
}


