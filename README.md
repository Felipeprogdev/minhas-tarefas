# 📝 Minhas Tarefas

Uma aplicação web para gerenciamento e organização de tarefas do dia a dia.

---

## 🚀 Tecnologias

Este projeto foi desenvolvido utilizando as seguintes tecnologias:

- **Next.js** — Framework React para produção
- **Tailwind CSS** — Framework CSS utilitário para estilização rápida
- **Supabase** — Backend como serviço, utilizando PostgreSQL, autenticação e Realtime

---

### 1. 📥 Instale o Git no cmd:
```bash
winget install --id Git.Git -e --source winget
``` 

---

## 🛠️ Como executar o projeto

### 📋 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Node.js**

---

### 2. 📥 Clone o repositório

```bash
git clone https://github.com/Felipeprogdev/minhas-tarefas.git
cd minhas-tarefas
```

Instale as dependências:

```bash
npm install
```

---

### 3. 🔐 Configure as variáveis de ambiente

Na raiz do projeto, crie um arquivo chamado `.env.local`:
Esse arquivo será utilizado para armazenar as chaves de acesso do Supabase.

---

### 4. 🗄️ Configure o Supabase

1. Acesse o console do [Supabase](https://supabase.com/) e crie um novo projeto.
2. Crie um projeto no supabase.
3. Dentro do projeto, clique em **Connect** o item 1 rode o código no terminal, o item 2 cole as chaves no arquivo `.env.local`, o item 3 rode o código no terminal.
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

### 5. ▶️ Execute o projeto

```bash
npm run dev
```

---

### 6. 🌐 Abra no navegador

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

## Desenvolvimento
- Criei a pasta lib\supabase para colocar os arquivos client.ts e server.ts, são arquivos criados para utilizar as chaves do supabase.
- A pasta components possui o arquivo TodoManager.tsx, ele serve para rodar a tabela do dashboard, criei ele para não ficar muito confuso tudo no arquivo da pasta dashboard.
- Inicialmente utilizei o arquivo page.tsx para criar a página de login.
- Criei o arquivo .env.local para salvar essas chaves do supabase.
- Tenho a pasta teste, nela tem o um arquivo que roda como teste, criei para testar algumas funcionalidades como trocar de páginas e outras coisas do tipo, foi para ficar mais facil o meu entendimento e aprendizado de algumas coisas.
- A pasta criar-conta é o arquivo da página de criação de conta e a dashboard para a tabela.
- Em actions tenho dois arquivos, auth.ts e todos.ts, auth.ts guarda uma função para deslogar da conta logada no supabase, e o todos.ts é onde tenho o meu CRUD das tabelas, separei assim pois achei que faria mais sentido e mais facil de mexer separando em dois arquivos.
- Cada pasta foi separada desse modo para não repetir código, para não ficar um código gigante no mesmo arquivo ou simplesmente por ser outra página.

## O que não entendi/dificuldades
- A parte do front-end foi bastante confusa para mim, utilizei muito I.A para essa parte, eu entendi como conecta nos botões e tudo mais, mas nas questões de criar flex e posicionar cada coisa na tela, isso foi bastante confuso e ainda não entendi totalmente, para contornar isso e não ser algo que eu não entenderia caso fosse ler, eu anotei algumas coisas explicando o que cada coisa faz no front-end de algumas páginas, só não fiz isso na parte da tabela porque ali eu realmente me perdi bastante e não sei explicar exatamente como funciona o front-end ali, estou estudando pra entender melhor no momento, a página de criação de conta não tem anotações pois ela é praticamente a mesma coisa da tela de login.
- Tive dificuldade na parte do Supabase, nunca tinha utilizado uma ferramenta assim anteriormente, então foi meio difícil entender como conectar cada coisa e como chamar cada coisa, ainda não entrou totalmente na minha cabeça inclusive, eu entendi o passo a passo, mas os comandos para chamar alguma coisa ainda não decorei, mas creio que seja algo que decoro no dia a dia.
- Como nunca tinha utilizado next.js, typescript e tailwind, eu acabei demorando um pouco por ter que estudar bastante, principalmente o tailwind e o next.js, o typescript eu entendi rápido por já ter um certo costume com Python, mesmo não tendo decorado exatamente toda a sintaxe, eu consigo ler o código e entender o que está acontecendo relativamente bem, eu anotei o que algumas coisas fazem no código pra meio que ter uma base para projetos futuros, para entender o que cada coisa faz caso não lembre e ir estudando com o próprio projeto.

## Considerações finais
- Foi um pouco difícil criar isso por ser meu primeiro projeto com essas ferramentas, mas vi que é possível aprender e melhorar, muitas das coisas como o passo a passo que fiz para criar, algumas funções especificas, etc... Eu anotei em um bloco de notas, para caso eu precise no dia a dia, eu pegarei daqui, por exemplo a parte do formulário de login ou de criação de conta, deixei um passo a passo e outras coisas como por exemplo, como fazer para chamar uma função que verifica os campos preenchidos.
- Pretendo estudar mais sobre as ferramentas para adquirir domínio, fazer alguns projetos mais fáceis só pra memorizar a sintaxe, memorizar a parte do tailwind onde mais senti dificuldade, entender melhor como funciona o next.js e tambem a parte da criação da tabela do supabase que ficou um pouco confusa ainda.








