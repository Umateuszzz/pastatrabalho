# Moment Store

**Nome:** [seu nome]
**Disciplina:** Front-End I — Unilavras
**Professor:** João Marcelo de Almeida Garcia

---

## Sobre o projeto

A Moment Store é uma loja virtual de camisas desenvolvida como Trabalho Final da disciplina de Front-End I. O site permite que o cliente navegue pelos produtos, visualize os detalhes de cada camisa, escolha o tamanho e finalize a compra. Os produtos e pedidos são armazenados em tempo real no Supabase.

---

## Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Vitrine com os produtos disponíveis |
| `produto.html` | Detalhes do produto selecionado |
| `checkout.html` | Formulário de dados e pagamento |
| `resumo-compra.html` | Confirmação do pedido realizado |
| `admin.html` | Painel interno para cadastrar novas camisas |

---

## Funcionalidades

- Vitrine com produtos carregados do banco de dados em tempo real
- Alternância entre foto da frente e das costas de cada camisa
- Seleção de tamanho (P, M, G, GG) com validação antes de avançar
- Fluxo completo de compra: produto → checkout → resumo
- Pedidos salvos automaticamente no banco de dados
- Painel admin para cadastrar novas camisas com upload de imagens

---

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- [Supabase](https://supabase.com) — banco de dados e armazenamento de imagens

---

## Organização dos arquivos

```
projeto/
├── index.html
├── produto.html
├── checkout.html
├── resumo-compra.html
├── admin.html
├── style.css
├── admin.css
├── app.js
├── produto.js
├── admin.js
└── assets/
    └── AkiraExpanded.otf
```

---

## Como executar

1. Clone o repositório:
   ```
   git clone https://github.com/Umateuszzz/pastatrabalho.git
   ```
2. Abra a pasta do projeto no VS Code
3. Abra o arquivo `index.html` no navegador

Não é necessário instalar nada. O projeto roda diretamente no navegador.
