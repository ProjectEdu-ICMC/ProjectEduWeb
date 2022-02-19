# Aplicativo do Professor - FrontEnd

Esse diretório é referente ao aplicativo web do portal do professor. Ele foi desenvolvido com tecnologias como React.JS, redux, axios e tailwindcss.

## Como rodar?
Para rodar o código do aplicativo localmente, basta possui node.js instalado, e instalar as dependências por meio de:
```
$ npm install
```

Então, após instalar as dependências, é preciso buscar os dados do firebase (`firebaseConfig.js`) para realizar a conexão. Para isso, basta seguir [este tutorial](https://firebase.google.com/docs/web/setup?hl=pt-br). Na etapa 2, aparece um comentário `// TODO` em cima de `const firebaseConfig = { ... }`. Basta procurar onde ficam esses dados de configuração da database firebase usada, e salvar essa variável em um arquivo `credentials.js` no diretório `client/src/auth/` desse repositório (ou seja, pasta `src/auth/` dentro da pasta atual). O arquivo ficará com uma estrutura parecida com essa:

```
// ./secret.js
export const firebaseConfig = {
    apiKey: ...,
    authDomain: ...,
    databaseURL: ...,
    projectId: ...,
    storageBucket: ...,
    messagingSenderId: ...,
    appId: ...,
    measurementId: ...
    ...
};

```

Após configurar o firebase, basta rodar o projeto com:
```
$ npm start
```

* **Obs:** a versão do node.js na qual o desenvolvimento foi feito é a 16. Pode ser que a transição de versões gere problemas.