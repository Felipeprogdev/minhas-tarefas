'use server'
/* O @ antes significa que são arquivos dentro do proprio projeto, sem o @ são bibliotecas externas instaladas */
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signOut() {
    /* await createClient(): Conecta ao Supabase usando os cookies de sessão obtidos na requisição HTTP atual. */
  const supabase = await createClient()
  /* await supabase.auth.signOut(): Comunica-se com o servidor do Supabase para invalidar o token JWT e destruir a sessão ativa do usuário. */
  await supabase.auth.signOut()
  /* redirect('/'): Força o redirecionamento imediato do usuário para a página inicial (ou tela de login) após a limpeza dos cookies do navegador. */
  redirect('/')
}
