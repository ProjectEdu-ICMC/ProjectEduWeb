# Aplicativo do Professor - BackEnd

Esse diretório é referente ao servidor http do portal do professor. Ele foi desenvolvido com tecnologias como express, firebase e node.js.

## Como rodar?
Para roda o código do servidor localmente, basta possuir node.js instalado, e instalar as dependências por meio de:
```
$ npm install
```

Então, após instalar as dependências, é preciso configurar a Admin SDK do firebase. Para isso, seguir [esse tutorial](https://firebase.google.com/docs/admin/setup#set-up-project-and-service-account). Ao gerar a chave privada, basta salvar o arquivo como `private-key.json` na pasta `server/` do repositório (ou seja, na pasta atual). 

Após configurar o firebase, basta rodar o projeto com:
```
$ npm run dev
```

* **Obs:** a versão do node.js na qual o desenvolvimento foi feito é a 16. Pode ser que a transição de versões gere problemas.
