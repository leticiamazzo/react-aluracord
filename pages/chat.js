import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useReducer } from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router'
import { createClient } from '@supabase/supabase-js'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker'

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM2NzIxNywiZXhwIjoxOTU4OTQzMjE3fQ.w4RX2Kt34GiFWgvvLqp2vhUOD-hGfMGiXgb7WZjG31A';
const SUPABASE_URL = 'https://yodlzsndpqnpnlwmdtvg.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// fetch(`${SUPABASE_URL}/rest/v1/mensagens?select=*`, {
//     headers: {
//         'Content-Type': 'application/json',
//         'apiKey': SUPABASE_ANON_KEY,
//         'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
//     }
// })
// .then((res) => {
//     return res.json();
// })
// .then((response) => {
//     console.log(response);
// })

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            console.log('Houve uma nova');
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}


export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username;
    // console.log(roteamento.query);
    // console.log(usuarioLogado);
    // sintáxe useState
    // const [variável com o valor, hook (método que será chamado caso queira alterar mensagem)]
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([
        // {
        //     id: 1,
        //     de: 'omariosouto',
        //     texto: ':sticker: https://c.tenor.com/TKpmh4WFEsAAAAAC/alura-gaveta-filmes.gif'
        // },
        // {
        //     id: 1,
        //     de: 'omariosouto',
        //     texto: 'nõaooo'
        // }
    ]);

    // Vai lidar com o que não faz parte da execução simples da função. Só queremos que execute quando for enviar a mensagem
    React.useEffect(() => {
        supabaseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                // console.log('dados da consulta', data);
                setListaDeMensagens(data);    
            });

        escutaMensagensEmTempoReal((novaMensagem) => {
            console.log('Nova mensagem', novaMensagem);
            console.log('Lista de mensagens', listaDeMensagens);
            
            // Quero reusar um valor de referência (objeto / array)
            // Passar uma função pro setState
            setListaDeMensagens((valorAtualDaLista) => {
                console.log('Lista de mensagens', listaDeMensagens);
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            })
        })
    }, [])

    /*

    Aula 3
        Usuário vai fazer:
        - Digita no campo textarea
        - Aperta enter para enviar
        - Texto deve ser adicionado na listagem

        Dev:
        - [X] Campo textarea criado
        - Para "Aperta enter para enviar" usamos o que?
            [X] evento de onChange
            [X] setState para mudar valor da variável que guarda a mensagem
            [X] if para saber se último caracter for enter (se sim, insere conteúdo na listagem e limpa valor da variável)
            [X] lista de mensagens como state que atualiza automaticamente a lista de mensagens colocadas
 


        Dev (Fiz sozinha):
        - Pega o valor digitado e coloca em um variável
        - Usa evento de onChange para captar mudança
        - Insere valor na listagem de mensagens
        - Limpa valor da variável

    Aula 4
        O que fará o back-end?
            Servidor remoto que salva um array de mensagens e dá mecanismos pra fazer sincronização. Será:
            const [listaDeMensagens, setListaDeMensagens] = React.useState([]);


    */

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            // id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensagem
        }

        // Envia mensagem para o servidor
        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os mesmos campos do Supabase
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem:', data);
            })

        setMensagem('');
    }

    return (
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[500],
            backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
            color: appConfig.theme.colors.neutrals['000']
          }}
        >
            <Box
                styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                borderRadius: '5px',
                backgroundColor: appConfig.theme.colors.neutrals[700],
                height: '100%',
                maxWidth: '95%',
                maxHeight: '95vh',
                padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagens}/>
                    {/* Essa trecho foi refeito dentro da função MessageList  */}
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        console.log(mensagemAtual);

                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                    as="form"
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                                console.log(event);
                            }}
                            onKeyPress={(event)=> {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    // console.log('Apertou enter');

                                    // Não fazer dessa maneira porque a var listaDeMensagens vai servir só pra ler
                                    // listaDeMensagens.push(mensagem);
                                    // console.log(listaDeMensagens);

                                    // Pega todos os itens que já tem na lista e espalha
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker 
                        // Interceptação
                        // CallBack
                            onStickerClick={(sticker) => {
                                // console.log('[USANDO O COMPONENTE] Salva o sticker no banco', sticker);
                                handleNovaMensagem(`:sticker:${sticker}`)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    // console.log(props);
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                    }}
                >
                    <Box
                        styleSheet={{
                            marginBottom: '8px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                display: 'inline-block',
                                marginRight: '8px',
                            }}
                            src={`https://github.com/${mensagem.de}.png`}
                        />
                        <Text tag="strong">
                            {mensagem.de}
                        </Text>
                        <Text
                            styleSheet={{
                                fontSize: '10px',
                                marginLeft: '8px',
                                color: appConfig.theme.colors.neutrals[300],
                            }}
                            tag="span"
                        >
                            {(new Date().toLocaleDateString())}
                        </Text>
                    </Box>
                    Condicional: {mensagem.texto.startsWith(':sticker:'.toString())}
                    {mensagem.texto.startsWith(':sticker:')
                        ? (
                            <Image src={mensagem.texto.replace(':sticker:', '')} />
                        )
                        : (
                            mensagem.texto
                        )}
                </Text>
                )
            })}


        </Box>
    )
}
