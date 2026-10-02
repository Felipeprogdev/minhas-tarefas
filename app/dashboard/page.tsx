"use client";

import { useState } from "react";


export default function UsersTable() {
  const users = [
    { id: 1, name: "João", email: "joao@email.com" },
    { id: 2, name: "Maria", email: "maria@email.com" },
    { id: 3, name: "Maria", email: "maria@email.com" },
  ];

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* Conteúdo antes da tabela */}
      <div className="flex flex-col gap-4">
        <label>E-mail</label>

        <input
          type="email"
          placeholder="Digite seu e-mail"

          className="rounded border p-3"
        />
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3">Terefa</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-withe-900">
                  {user.name}
                </td>

                <td className="px-6 py-4">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



