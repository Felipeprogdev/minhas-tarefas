'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// 1. Adicionar nova tarefa
export async function addTodo(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const title = formData.get('title') as string
  if (!title) return

  await supabase.from('todos').insert({
    title,
    completed: false,
    user_id: user.id
  })

  revalidatePath('/dashboard')
}

// 2. Alternar o Status (Checkbox: true/false)
export async function toggleTodoStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  await supabase.from('todos').update({ completed: !currentStatus }).eq('id', id)
  revalidatePath('/dashboard')
}

// 3. Atualizar o Título da Tarefa (Edição)
export async function updateTodoTitle(id: string, newTitle: string) {
  const supabase = await createClient()
  
  if (!newTitle.trim()) return

  await supabase.from('todos').update({ title: newTitle.trim() }).eq('id', id)
  revalidatePath('/dashboard')
}

// 4. Excluir a tarefa pelo ID único
export async function deleteTodo(id: string) {
  const supabase = await createClient()
  await supabase.from('todos').delete().eq('id', id)
  revalidatePath('/dashboard')
}
