"use client";

import { FormEvent, useState } from "react";

/* Importa a função de navegar pelas páginas */
import { useRouter } from "next/navigation";

/* Conexão com supabase */
import { createClient } from "@/lib/supabase/client";


export default function CadastroPage() {

    /*
    Variaveis que salvarão os campos digitados
    */
    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')


    /* Variavel que salvará uma possível mensagem de erro */
    const [error, setError] = useState<string>("");

    /* Indica se o cadastro está sendo realizado */
    const [loading, setLoading] = useState<boolean>(false);

    /* Cria uma variavel para utilizar a função de navegar pelas páginas */
    const router = useRouter();


    /* Executado quando o usuário envia o formulário */
    async function handleCadastro(event: FormEvent) {

        /*
        Impede o navegador de recarregar a página
        e controla o envio com JavaScript
        */
        event.preventDefault();

        /*
        Indica que o cadastro está sendo realizado
        */
        setLoading(true);

        /* Limpa uma mensagem de erro anterior */
        setError("");

        /*
        Verifica se o nome foi preenchido
        */
        if (!nome.trim()) {
        setError("Digite seu nome.");
        setLoading(false);
        return;
        }

        /*
        Verifica se as duas senhas são iguais
        */
        if (password !== confirmPassword) {
            setError("As senhas não são iguais.");
            setLoading(false);
            return;
        }

        /*
        Cria a conexão com o Supabase
        */
        const supabase = createClient();

        /*
        Tenta criar uma nova conta no Supabase

        O email e a senha serão enviados para o
        sistema de autenticação do Supabase
        */
        const { data, error } = await supabase.auth.signUp({
            email,
            password,

            options: {
                data: {
                    nome: nome,
                    display_name: nome,
                },
            },
        });

        /*
        Verifica se o Supabase retornou algum erro
        */
        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        /*
        Se o cadastro der certo,
        manda o usuário para a página de login
        */
        router.push("/");

        /*
        Finaliza o estado de carregamento
        */
        setLoading(false);
    }


    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">

            <h1> Criar conta </h1>

            <form onSubmit={handleCadastro}>

                <div className="flex flex-col gap-4">

                    <input
                        type="text"
                        placeholder="Digite seu nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="rounded border p-3"
                        required
                    />


                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded border p-3"
                        required
                    />


                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded border p-3"
                        required
                    />


                    <input
                        type="password"
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="rounded border p-3"
                        required
                    />


                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded bg-blue-500 px-4 py-3 text-white active:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? "Criando conta..." : "Criar conta"}
                    </button>


                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="rounded bg-gray-500 px-4 py-3 text-white active:bg-gray-700"
                    >
                        Voltar para login
                    </button>


                    {error && (
                        <p className="text-red-500">
                            {error}
                        </p>
                    )}

                </div>

            </form>

        </div>
    );
}
