"use client";

import { FormEvent, useState } from "react";

/* Conexão com supabase */
import { createClient } from '@/lib/supabase/client'

/* Importa a função de navegar pelas páginas */
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    /* Cria uma variavel para utilizar a função de navegar pelas páginas*/
    const router = useRouter();

    /* Executado quando o usuário envia o formulário */
    async function handleLogin(event: FormEvent) {
        /*impede o navegador de recarregar a página e controla o envio 
          com javascript
        */
        event.preventDefault()
        
        /* Indica tentativa de login
        */
        setLoading(true)
        setError('')

        /*Conexão com supabase, possibilitando utilizanção de metodos
        como o supabase.auth, supabase.from, supabase.storage
        */
        const supabase = createClient()

        /*Tenta autenticar o usuario com email e senha 
          O comando await é para esperar
        */
        const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        })

        if (error) {
            setError(error.message)
            setLoading(false)
            return
        }
        /*Caso de tudo certo, va para a página do usuario */
        window.location.href = '/dashboard'
    }

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
            <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    {/* 
                        Cria outro flex dentro para colocar o label e deixalo centralizado com o input, o label fica a esquerda porque o texto dele só ocupara o nescessario
                    */}
                    <div className="flex flex-col gap-4">
                        
                            <input
                                type="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded border p-3"
                                /*Faz aparecer a mensagem que deve-se passar
                                  um dado no campo, caso nada seja escrito*/
                                required
                                />

                            <input
                                type="password"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded border p-3"
                                /*Faz aparecer a mensagem que deve-se passar
                                  um dado no campo, caso nada seja escrito*/
                                required
                                />
          
                            {/* 
                            type="submit": Diz que esse é o botão de envio do formulário
                            disabled={loading}:Desabilita o botão quando o loading for True
                            rounded: Arredonda o botão
                            bg-blue-500: Cor de fundo do botão
                            px-4: Borda horizontal do botão
                            py-3: Borda vertical do botão
                            text-white: Cor do texto
                            active:bg-blue-700: Efeito visual ao clicar no botão
                            */}
                            <button 
                            type="submit" 
                            disabled={loading}
                            className="rounded bg-blue-500 px-4 py-3 text-white active:bg-blue-700">
                            {loading ? 'Entrando...' : 'Entrar'}
                            </button>

                            <button
                                /* router.push utiliza a função de navegar pelas páginas, passando o nome da pasta ele já abre o arquivo*/
                                onClick={() => router.push("criar-conta")}
                                className="rounded bg-blue-500 px-4 py-3 text-white active:bg-blue-700">
                                Criar conta
                            </button>
                            

                            {error && <p>{error}</p>}
                        
                    </div>
                </form>
            
        </div>
    )
    }
