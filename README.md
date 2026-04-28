# Todo List Site

Aplicacao React com Vite para gerenciamento de tarefas em formato de board.

## Funcionalidades

- Criacao, edicao e exclusao de tarefas
- Colunas `To Do`, `Em Progresso` e `Concluido`
- Drag and drop entre colunas
- Filtro por status
- Ordenacao por prioridade, prazo, prioridade com prazo e criacao
- Persistencia local com `localStorage`
- Layout responsivo para desktop e mobile

## Tecnologias

- React
- Vite
- `@dnd-kit/core`

## Como rodar

```bash
npm install
npm run dev
```

## Validacao

```bash
npm run lint
npm run build
```

## Deploy

O projeto usa `base: "/todo-list-site/"` em `vite.config.js`, adequado para publicacao no GitHub Pages desse repositorio.
