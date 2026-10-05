'use client'

import { useState } from 'react'
import { addTodo, deleteTodo, toggleTodoStatus, updateTodoTitle } from '@/app/actions/todos'

type Todo = {
  id: string
  title: string
  completed: boolean
  created_at: string
}

export default function TodoManager({ items }: { items: Todo[] }) {
  // Estado para exclusão
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Estados para edição
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState<string>('')

  // Estados para pesquisa
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Função para aplicar o filtro de busca
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(searchInput)
  }

  // Limpa o filtro de pesquisa
  const handleClearSearch = () => {
    setSearchInput('')
    setSearchQuery('')
  }

  // Iniciar modo de edição
  const startEditing = (item: Todo) => {
    setEditingId(item.id)
    setEditTitle(item.title)
  }

  // Salvar alteração do título
  const handleSaveEdit = async (id: string) => {
    if (!editTitle.trim()) return
    await updateTodoTitle(id, editTitle)
    setEditingId(null)
  }

  // Cancelar edição
  const handleCancelEdit = () => {
    setEditingId(null)
    setEditTitle('')
  }

  // Filtra os items conforme o termo digitado no campo de busca
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Formulário para adicionar nova tarefa */}
      <form action={addTodo} className="flex gap-2">
        <input
          type="text"
          name="title"
          placeholder="Digite o nome da tarefa..."
          required
          className="flex-1 rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Adicionar
        </button>
      </form>

      {/* Campo e Botão de Pesquisa */}
      <form onSubmit={handleSearch} className="flex gap-2 bg-gray-50 p-3 rounded border">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Pesquisar tarefa por nome..."
          className="flex-1 rounded border px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded bg-gray-700 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Pesquisar
        </button>
        {searchQuery && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="rounded bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-300"
          >
            Limpar
          </button>
        )}
      </form>

      {/* Tabela com suporte a Edição e Pesquisa */}
      <div className="overflow-x-auto rounded border">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">Nome da Tarefa</th>
              <th className="w-28 px-6 py-3 text-center">Status</th>
              <th className="w-36 px-6 py-3 text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-4 text-center text-gray-400">
                  {searchQuery ? 'Nenhuma tarefa encontrada para a busca.' : 'Nenhuma tarefa encontrada.'}
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  {/* Campo 1: Nome da Tarefa (Edição com duplo clique) */}
                  <td className="px-6 py-4 font-medium">
                    {editingId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(item.id)
                            if (e.key === 'Escape') handleCancelEdit()
                          }}
                          className="flex-1 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white hover:bg-green-700"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-300"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <span
                        onDoubleClick={() => startEditing(item)}
                        className={`cursor-pointer select-none ${
                          item.completed ? 'line-through text-gray-400' : ''
                        }`}
                        title="Clique duplo para editar"
                      >
                        {item.title}
                      </span>
                    )}
                  </td>

                  {/* Campo 2: Status da Tarefa */}
                  <td className="px-6 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleTodoStatus(item.id, item.completed)}
                      className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>

                  {/* Campo 3: Ações (Botão Lápis e Lixeira) */}
                  <td className="px-6 py-4 text-right">
                    {deletingId === item.id ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="text-xs font-semibold text-red-600">Excluir?</span>
                        <button
                          onClick={async () => {
                            await deleteTodo(item.id)
                            setDeletingId(null)
                          }}
                          className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-700"
                        >
                          Sim
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-300"
                        >
                          Não
                        </button>
                      </span>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        {/* Botão do Lápis para Edição */}
                        <button
                          onClick={() => startEditing(item)}
                          className="p-1 text-gray-400 transition hover:text-blue-600"
                          title="Editar tarefa"
                        >
                          ✏️
                        </button>

                        {/* Botão da Lixeira para Exclusão */}
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-1 text-gray-400 transition hover:text-red-600"
                          title="Excluir tarefa"
                        >
                          🗑
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
