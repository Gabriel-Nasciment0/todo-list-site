# Todo List Site

Aplicacao web de gerenciamento de tarefas em formato de board, desenvolvida com React e Vite. O projeto ajuda a organizar atividades por status, prioridade e prazo, com persistencia local no navegador.

## Descricao

A proposta do projeto e oferecer um fluxo simples para acompanhar tarefas do dia a dia em uma interface visual. O usuario pode criar, editar, mover e localizar tarefas rapidamente, tanto no desktop quanto no mobile.

## Funcionalidades principais

- Criacao de tarefas com titulo, prazo e prioridade
- Edicao e exclusao de tarefas
- Organizacao em colunas `A Fazer`, `Em Progresso` e `Concluido`
- Movimentacao de tarefas por drag and drop entre colunas
- Movimentacao manual de status pelos botoes dentro do card
- Filtro por tarefas `Todas`, `Pendentes` e `Concluidas`
- Ordenacao por prioridade, prazo, prioridade com prazo e data de criacao
- Busca por titulo da tarefa
- Persistencia de tarefas e tema com `localStorage`
- Alternancia entre tema claro e escuro
- Layout responsivo com adaptacoes para mobile

## Tecnologias utilizadas

- React
- Vite
- JavaScript (ES Modules)
- `@dnd-kit/core`
- `lucide-react` 
- CSS puro
- ESLint

## Como instalar e rodar

- Node.js 18 ou superior
- npm

```bash
npm install
npm run dev
```

## Scripts principais

- `npm run dev`: inicia o ambiente de desenvolvimento
- `npm run build`: gera a build de producao
- `npm run preview`: executa a build localmente
- `npm run lint`: roda a analise estatica
- `npm run deploy`: publica a pasta `dist` com `gh-pages`

## Como usar

1. Abra o projeto no navegador com `npm run dev`.
2. Clique em `Adicionar tarefa` ou no botao flutuante no mobile.
3. Preencha titulo, prazo e prioridade.
4. Use os filtros, a busca e a ordenacao para localizar tarefas com mais rapidez.
5. Arraste os cards entre colunas ou use os botoes de avancar e voltar dentro de cada tarefa.
6. Edite ou exclua tarefas quando necessario.

As informacoes ficam salvas no navegador por meio de `localStorage`, incluindo o tema selecionado.

## Estrutura do projeto

```text
src/
  components/   Componentes reutilizaveis da interface
  pages/        Pagina principal do board
  styles/       Estilos globais e da aplicacao
  App.jsx       Estado global, persistencia e tema
  main.jsx      Entrada da aplicacao
```

## Possiveis melhorias futuras

- Adicionar categorias ou etiquetas para as tarefas
- Incluir confirmacao antes de excluir uma tarefa
- Permitir persistencia em backend com autenticacao
- Criar testes automatizados para os fluxos principais
- Adicionar estatisticas simples do board, como total por status
