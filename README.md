# 📝 Minhas Tarefas

Uma aplicação web para gerenciamento e organização de tarefas do dia a dia.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Next.js** — Framework React para produção
- **Tailwind CSS** — Framework CSS utilitário para estilização rápida
- **Supabase** — Backend como serviço, utilizando PostgreSQL, autenticação e Realtime

---

## 🛠️ Como executar o projeto

### 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Node.js**

---

### 1. 📥 Clone o repositório

```bash
git clone https://github.com/Felipeprogdev/minhas-tarefas.git
cd minhas-tarefas
```

Instale as dependências:

```bash
npm install
```

---

### 2. 🔐 Configure as variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env.local`:
Esse arquivo será utilizado para armazenar as chaves de acesso do Supabase.

---

### 3. 🗄️ Configure o Supabase

1. Acesse o console do [Supabase](https://supabase.com/) e crie um novo projeto.
2. Crie um projeto no supabase.
3. Dentro do projeto, clique em **Connect** no item 1 rode o código no terminal, no item 2 cole as chaves no arquivo `.env.local`, no item 3 rode o código no terminal.
4. Acesse o menu lateral em **SQL Editor** → **New query**.
5. Cole e execute o script SQL abaixo para criar a tabela e configurar as políticas de segurança:

```sql
-- Se a tabela já existir e você quiser recriá-la do zero:
drop table if exists public.todos;

-- Criação da tabela
create table public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Ativar Row Level Security (RLS)
alter table public.todos enable row level security;

-- Política para visualizar apenas as próprias tarefas
create policy "Users can view their own items"
on public.todos
for select
using (auth.uid() = user_id);

-- Política para inserir apenas tarefas próprias
create policy "Users can insert their own items"
on public.todos
for insert
with check (auth.uid() = user_id);

-- Política para atualizar apenas tarefas próprias
create policy "Users can update their own items"
on public.todos
for update
using (auth.uid() = user_id);

-- Política para excluir apenas tarefas próprias
create policy "Users can delete their own items"
on public.todos
for delete
using (auth.uid() = user_id);
```

#### 🔒 Sobre a segurança (RLS)

O **Row Level Security (RLS)** garante que cada usuário tenha acesso somente às suas próprias tarefas. A função `auth.uid()` identifica o usuário autenticado e compara com a coluna `user_id` da tabela `todos`, impedindo acessos não autorizados.

---

### 4. ▶️ Execute o projeto

```bash
npm run dev
```

---

### 5. 🌐 Abra no navegador

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação rodando localmente.

---

## 📌 Funcionalidades

- ✅ Cadastro e gerenciamento de tarefas
- ✅ Marcação de tarefas como concluídas
- ✅ Exclusão de tarefas
- ✅ Autenticação de usuários
- ✅ Isolamento de dados por usuário
- ✅ Banco de dados PostgreSQL via Supabase
- ✅ Segurança com Row Level Security (RLS)
- ✅ Atualizações em tempo real com Supabase Realtime
