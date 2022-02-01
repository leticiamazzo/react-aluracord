import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router'
import appConfig from '../config.json';



function Titulo(props) {
  console.log(props);
  console.log(props.children);
  
  // 2- Recebe tag
  const Tag = props.tag || 'h1';

  return (
    <>
      {/* 3- Passa o conteúdo que quer renderizar = children */}
      <Tag>{props.children}</Tag>
  
      {/* 4- Gerencia os estilos que Tag de título criada terá */}
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals['000']};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

// Componente React
// function HomePage() {
// 	// função js que retorna html = JSX
//   return (
//     <>
//       {/* Reset de CSS */}
//       <GlobalStyle />

//       {/* 1- Passa o título e qual tag quer que esse título tenha */}
//       <Title tag="h2">Boas vindas de volta!</Title>
//       <h2>Aluracord - Alura Matrix</h2>
//     </>
//   )
// }

// export default HomePage

export default function PaginaInicial() {
  // const username = 'peas';
  
  // variável username precisa ter o valor inicial e o que mudará seu estado
  // setUsername = função que muda valor que foi definido
  const [username, setUsername] = React.useState('peas');

  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            // Previnir comportamento de recarregar página ao submeter formulário para que tenhamos controle de como fazer para ir para outra página
            onSubmit={function(infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Form submetido');
              roteamento.push(`/chat?username=${username}`);
              // window.location.href= '/chat'
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              {appConfig.name}
            </Text>

            {/* <input
              type="text"
              value={username}
              onChange={function (event) {
                console.log('usuário digitou', event.target.value);

                //  Onde está o valor?
                const valor = event.target.value;

                // Trocar o valor da variável através do React e avise quem a utiliza sobre a mudança de estado
                setUsername(valor);
                // React agrupa várias alterações e as carrega de uma vez na página (boa performance)
              }}
            /> */}

            <TextField
              value={username}
              onChange={function (event) {
                console.log('usuário digitou', event.target.value);

                //  Onde está o valor?
                const valor = event.target.value;

                // Trocar o valor da variável através do React e avise quem a utiliza sobre a mudança de estado
                setUsername(valor);
                // React agrupa várias alterações e as carrega de uma vez na página (boa performance)
              }}
            
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: '1px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '10px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
