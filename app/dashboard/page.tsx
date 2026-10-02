import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  // 1. Cria o cliente do Supabase no lado do servidor
  const supabase = await createClient();

  // 2. Busca o usuário autenticado na sessão
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 3. Se não estiver logado, redireciona para a home/login
  if (error || !user) {
    redirect("/");
  }

  // 4. Server Action Inline para Logout
  async function signOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  }

  // Busca 'nome' ou 'display_name' salvos no user_metadata
  const userName =
    user.user_metadata?.nome ||
    user.user_metadata?.display_name ||
    "Usuário";

  // Lista fictícia de dados
  const users = [
    { id: 1, name: "João", email: "joao@email.com" },
    { id: 2, name: "Maria", email: "maria@email.com" },
    { id: 3, name: "Carlos", email: "carlos@email.com" },
  ];

  return (
    <div className="mx-auto max-w-4xl p-6 space-y-6">
      {/* Formulário conectando a Server Action ao botão */}
        <form action={signOut}>
          <button
            type="submit"
            className="rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-95"
          >
            Sair
          </button>
        </form>
      <div className="flex items-center justify-between rounded border bg-gray-50 p-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bem-vindo, {userName}!
          </h1>
          <p className="text-gray-600">Logado como: {userName}</p>
          <p className="text-xs text-gray-400">ID: {user.id}</p>
        </div>

      </div>

      <div className="overflow-x-auto rounded border">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">E-mail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4">{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}