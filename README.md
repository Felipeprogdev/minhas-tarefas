# 📝 Minhas Tarefas

Uma aplicação web para gerenciamento e organização de tarefas do dia a dia.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **[Next.js](https://nextjs.org/)** — Framework React para produção
- **[Tailwind CSS](https://tailwindcss.com/)** — Framework CSS utilitário para estilização rápida
- **[Supabase](https://supabase.com/)** — Backend como serviço (Banco de dados PostgreSQL, Autenticação e Realtime)

---

## 🛠️ Como executar o projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- Gerenciador de pacotes (`npm`)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/minhas-tarefas.git](https://github.com/seu-usuario/minhas-tarefas.git)
   cd minhas-tarefas
   npm install
   npm run dev
   crie um arquivo chamado .env.local

2. **Crie uma conta no Supabase:**
   acesse: https://supabase.com/
   Crie sua conta.
   dentro dele click em connect, tem um passo a passo ali, no item 1 rode o código que está aparecendo, no item 2 copie as chaves e coloque elas no arquivo .env.local
   rode o código do item 3
   volte para a pagina anterior do supabase, clique em SQL Editor, cole o seguinte sql

   -- Se já criou a tabela antes e quer recriar do zero:
   drop table if exists public.todos;

   -- Criação da tabela atualizada
   create table public.todos (
   id uuid primary key default gen_random_uuid(),
   user_id uuid references auth.users(id) on delete cascade not null,
   title text not null,               -- Nome da tarefa (string)
   completed boolean default false,   -- Status da tarefa (booleano: true = feita, false = pendente)
   created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Ativar segurança RLS, Tranca a tabela por completo. Nenhum usuário consegue ler, inserir, alterar ou apagar dados via API até que regras explícitas sejam definidas.
   alter table public.todos enable row level security;

   -- Políticas de acesso (RLS) Garantem que cada usuário só enxergue e altere os seus próprios dados. A função auth.uid() compara o ID do usuário conectado no momento com o user_id salvo na linha da tabela, impedindo que um usuário acesse as tarefas do outro.

   create policy "Users can view their own items" 
   on public.todos for select using (auth.uid() = user_id);

   create policy "Users can insert their own items" 
   on public.todos for insert with check (auth.uid() = user_id);

   create policy "Users can update their own items" 
   on public.todos for update using (auth.uid() = user_id);

   create policy "Users can delete their own items" 
   on public.todos for delete using (auth.uid() = user_id);

3. **Abra o navegador:**
   acesse: http://localhost:3000
