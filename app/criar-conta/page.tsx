"use client";

import { useState } from "react";

/* Importa a função de navegar pelas páginas */
import { useRouter } from "next/navigation";



export default function Home() {
    /* 
    Variaveis que salvarão os campos digitados
    */
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

    /* Cria uma variavel para utilizar a função de navegar pelas páginas*/
    const router = useRouter();
    
    return (
    /* 
    flex cria: flex
    flex-col: coloca os itens um a baixo do outro ao inves de deixar ao lado
    items-center: deixa os itens centralizados no meio da tela
    min-h-screen: Define altura minima da tela
    justify-center: depende do flex, ele centraliza baseado no flex-col ou flex-row
    gap-4: da um espaço de 16px para cada elemento, cada nivel de gap equivale a 4 pixels
    */
    <div className="flex flex-col items-center min-h-screen justify-center gap-4">
      
      {/* 
        Cria outro flex dentro para colocar o label e deixalo centralizado com o input, o label fica a esquerda porque o texto dele só ocupara o nescessario
      */}
      <div className="flex flex-col gap-4">
        <label>E-mail</label>

        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border p-3"
        />
      </div>


      {/* 
        Cria outro flex dentro para colocar o label e deixalo centralizado com o input, o label fica a esquerda porque o texto dele só ocupara o nescessario
      */}
      <div className="flex flex-col gap-2">
        <label>Senha</label>

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="rounded border p-3"
        />
      </div>

      <div className="flex gap-4">
        {/* 
        rounded: Arredonda o botão
        bg-blue-500: Cor de fundo do botão
        px-4: Borda horizontal do botão
        py-3: Borda vertical do botão
        text-white: Cor do texto
        active:bg-blue-700: Efeito visual ao clicar no botão
        */}
        <button
          onClick={() => console.log(email, senha)}
          className="rounded bg-blue-500 px-4 py-3 text-white active:bg-blue-700">
          Entrar
        </button>

        <button
          /* router.push utiliza a função de navegar pelas páginas "/" significa que voltara a raiz*/
          onClick={() => router.push("/")}
          className="rounded bg-blue-500 px-4 py-3 text-white active:bg-blue-700">
          Já tenho uma conta
        </button>

      </div>
    </div>
    
  );
}

