import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/actions/auth";
import TodoManager from "@/components/TodoManager";

export default async function DashboardPage() {
  const supabase = await createClient();

  // 1. Garante a autenticação do usuário
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  // 2. Busca as tarefas em ordem de adição (ordem crescente de criação)
  const { data: todos } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: true }); // <-- Alterado para true

  const userName =
    user.user_metadata?.nome ||
    user.user_metadata?.display_name ||
    "Usuário";

  //Está somente parte do código, o restante está no arquivo components/TodoManager.tsx
  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between rounded border bg-gray-50 p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bem-vindo, {userName}!
          </h1>
          <p className="text-gray-600">Logado como: {user.email}</p>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
          >
            Sair
          </button>
        </form>
      </div>

      {/* Gerenciador com a tabela conectada ao Supabase */}
      <TodoManager items={todos || []} />
    </div>
  );
}
