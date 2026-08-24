import { createClient } from '@/lib/supabase/server'

export type Task = {
  id: string
  user_id: string
  goal_id: string | null
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high'
  due_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export async function getCurrentUserTasks(): Promise<Task[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from('tasks').select('id, user_id, goal_id, title, description, status, priority, due_at, completed_at, created_at, updated_at').order('created_at', { ascending: false })
  if (error) throw new Error(`Unable to load tasks: ${error.message}`)
  return (data ?? []) as Task[]
}
