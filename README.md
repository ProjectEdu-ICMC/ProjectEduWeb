# Aplicativo do Professor

Esse aplicativo iniciou a partir da ideia de ProjectEDU, e foi evoluído para ensinar não apenas conteúdos na área de gestão de software, mas para funcionar genericamente com qualquer tipo de conteúdo, seguindo uma modelagem de dados.

Esse repositório é referente ao portal do professor nessa evolução de ProjectEDU. Então contém duas pastas principais:

- [`server`](./server): onde fica o projeto referente ao servidor da aplicação (back-end)
- [`client`](./client): onde fica o projeto referente à aplicação web utilizada pelos professores (front-end)

Cada uma das pastas possui documentações de como rodar os módulos em questão.

## Ideias a serem desenvolvidas
Algumas ideias foram surgindo durante o desenvolvimento desse aplicativo, e ficam aqui listadas para futuras melhorias:

- [ ] Outros tipos de exercício
    - [ ] Complete a frase
- [ ] Feedback sobre alunos de um dado módulo
- [ ] Copiar módulos
- [ ] Melhorar a experiência do usuário
    - [ ] Melhor diferenciação de tópicos
    - [ ] Melhor diferenciação de slides
    - [ ] Ordenação de tópicos (drag-n-drop)
    - [ ] Ordenação de slides (drag-n-drop)
    - [ ] Ordenação de conteúdos (dentro de slides)
- [ ] Traduções em várias línguas

* **Obs:** Já existe algo semi-implementado referente ao drag-n-drop dos cards, precisaria fazer o back-end. Além disso, também já existe um projeto iniciado de tradução. Precisaria apenas trocar os textos por variáveis e utilizar o `LanguageContext`. No header inclusive existe código comentado para fazer a lógica da tradução.