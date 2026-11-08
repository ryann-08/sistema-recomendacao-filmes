# Muita MalaFlix

Sistema de recomendação de filmes feito em HTML, CSS e JavaScript. A partir do perfil do usuário (notas por gênero), o sistema recomenda 6 filmes de um catálogo de 48 títulos.

**Demo:** https://recomendacao-filmes.netlify.app

## Funcionalidades

- Catálogo com 48 filmes divididos em 4 gêneros: Terror, Comédia, Romance e Ação
- Perfil do usuário com nota por gênero, atualizado conforme as escolhas
- Recomendação de 6 filmes compatíveis com o perfil
- Filtro "anti-bolha", que sugere filmes menos assistidos para variar as recomendações
- Painel HUD com o perfil atual, o tamanho do último ajuste e o status do anti-bolha
- Layout responsivo (computador, tablet e celular)

## Como funciona

1. **Perfil:** o `perfil.js` guarda a nota de cada gênero e a atualiza sempre que o usuário interage. Esse perfil é enviado ao módulo de recomendação.
2. **Catálogo:** o `catalogo.js` contém todos os filmes, cada um com seus vetores (pesos por gênero).
3. **Recomendação:** o perfil é comparado com os vetores dos filmes, e os mais compatíveis são enviados para a tela. <!-- CONFIRMAR com Filipe/Matheus: como é feita a comparação -->
4. **Anti-bolha:** o catálogo também indica um filme menos assistido, para o usuário não ficar preso sempre ao mesmo gênero.
5. **HUD:** mostra em tempo real o perfil (ex.: Terror 2.00 | Comédia 4.00 | Romance 3.00 | Ação 5.00), o tamanho do último ajuste e se o anti-bolha está ativo. <!-- CONFIRMAR com Filipe o significado exato -->

## Tecnologias

- HTML5
- CSS3 (layout responsivo)
- JavaScript
- Git e GitHub
- Netlify (hospedagem)

## Como executar

1. Clone o repositório:
   ```
   git clone https://github.com/ryann-08/sistema-recomendacao-filmes
   ```
2. Abra a pasta no VS Code.
3. Abra o `index.html` com a extensão **Live Server** (ou direto no navegador).

## Estrutura do projeto

```
├── capas de filmes/     # capas por gênero (Ação, Comédia, Romance, Terror)
├── css/                 # estilos das telas
├── js/
│   ├── catalogo.js      # filmes e vetores
│   ├── perfil.js        # perfil do usuário
│   ├── ranking-hud.js   # painel HUD
│   ├── tela1.js         # lógica da tela 1
│   └── tela2.js         # lógica da tela 2
├── index.html           # tela 1
└── recomendacoes.html   # tela 2 (recomendações)
```

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Ryan Almeida Marques Jonas | Perfil do usuário: cria o perfil inicial, atualiza a cada mudança e envia ao Filipe |
| Matheus Santos Vega | Catálogo: cadastro dos filmes, vetores de cada filme e anti-bolha |
| Filipe Abrunheiro dos Santos | Recebe o perfil, pede ao catálogo os filmes compatíveis e envia ao Maicon; criou o HUD |
| Maicon Dantas Moreira | HTML e CSS da tela 2 |
| Eduardo Porfírio dos Santos | HTML e CSS da tela 1 |

## Projeto acadêmico

Desenvolvido para a disciplina Cálculo e Álgebra Linear, curso de Engenharia de Software, Universidade Anhembi Morumbi.
