// =====================================================================
// tela2.js
// Liga a TELA 2 (recomendacoes.html) com o resto do sistema.
// O HTML so desenha a pagina. Este arquivo e a PONTE:
//   1) pega o perfil que a tela 1 salvou
//   2) pede as 5 recomendacoes para o codigo do Felipe
//   3) desenha as recomendacoes e o painel (HUD) na tela
//   4) quando o usuario clica num filme, atualiza o perfil e redesenha
// =====================================================================
 
// ---------------------------------------------------------------------
// PARTE 1: IMPORTAR AS FUNCOES DOS OUTROS ARQUIVOS
// "import" traz para ca uma funcao exportada ("export") em outro arquivo.
// O "./" significa "na mesma pasta" (js). O ".js" e obrigatorio.
// As maiusculas e minusculas precisam ser IGUAIS ao nome real do arquivo.
// ---------------------------------------------------------------------
 
// Funcoes do arquivo do Ryan (perfil do usuario):
//  - definirPerfilInicial: guarda as notas iniciais
//  - obterPerfilAtual: devolve o perfil sempre atualizado
//  - registrarFilmeAssistido: atualiza o perfil quando um filme e assistido
//  - obterUltimoAjuste: devolve quanto o perfil mudou na ultima vez
import {
  definirPerfilInicial,
  obterPerfilAtual,
  registrarFilmeAssistido,
  obterUltimoAjuste
} from './perfil.js';
 
// "catalogo" e a lista com os 20 filmes do Matheus (id, titulo e vetor)
import { catalogo } from './catalogo.js';
 
// Funcao principal do Felipe: recebe o perfil e devolve
// os 5 filmes recomendados e o HUD.
import { atualizarRecomendacoes } from './ranking-hud.js';
 
// ---------------------------------------------------------------------
// PARTE 2: LISTA DE EXTENSOES DE IMAGEM
// Algumas capas nao sao ".jpg" (podem ser .jpeg, .webp, .png...).
// Usada para tentar outras extensoes quando a capa nao carregar.
// ---------------------------------------------------------------------
const extensoes = ['.jpeg', '.webp', '.png', '.jpg.jpg', '.jpg.jpeg', '.jpg.webp', '.JPG', '.JPEG'];
 
// ---------------------------------------------------------------------
// PARTE 3: RECUPERAR O PERFIL QUE A TELA 1 SALVOU
// A tela 1 guarda o perfil no navegador (localStorage) com o nome 'perfil'.
// Ao mudar de tela, as variaveis do JS somem, mas o localStorage continua.
// ---------------------------------------------------------------------
 
// getItem('perfil') devolve o texto salvo, ou null se nao tiver nada
const salvo = localStorage.getItem('perfil');
 
// Se existe perfil salvo: JSON.parse transforma o texto "[5,1,1,1]" de volta
// em lista de numeros. Se NAO existe (abriram a tela 2 direto), usa
// [1,1,1,1], que significa "gosta de todos os generos por igual".
definirPerfilInicial(salvo ? JSON.parse(salvo) : [1, 1, 1, 1]);
 
// ---------------------------------------------------------------------
// PARTE 4: PEGAR OS ELEMENTOS DA PAGINA (HTML)
// ---------------------------------------------------------------------
 
// Cartazes de "Filmes disponiveis". O '[data-id]' pega so os que tem
// data-id, entao os 5 quadrados de recomendados ficam de fora.
const cartazes = document.querySelectorAll('.movie-card[data-id]');
 
// Caixa onde as 5 recomendacoes aparecem (id definido no HTML)
const caixa = document.getElementById('recomendados-roll');
 
// Painel (HUD): perfil, ajuste e anti-bolha
const painel = document.getElementById('hud-panel');
 
// Conta quantos filmes o usuario ja clicou ("assistiu").
// Usado para decidir quando o anti-bolha entra.
let assistidos = 0;
 
// ---------------------------------------------------------------------
// PARTE 5: FUNCAO QUE COPIA A CAPA DE UM FILME
// Recebe a imagem de destino (nova, da caixa de recomendados) e a
// imagem original (cartaz de "Filmes disponiveis").
// Se a capa nao carregar, tenta as outras extensoes da lista.
// ---------------------------------------------------------------------
function copiarCapa(destino, original) {
 
  // Endereco da imagem como esta no HTML. Ex: "capas de filmes/Terror/it.jpg"
  const caminho = original.getAttribute('src');
 
  // Tira o ".jpg" do final para poder testar outras extensoes
  const base = caminho.replace(/\.jpg$/i, '');
 
  // Quantas extensoes ja tentamos
  let tentativa = 0;
 
  // Se a imagem der erro ao carregar, esta funcao roda
  destino.addEventListener('error', () => {
    // So tenta de novo se ainda sobrou extensao (evita loop infinito)
    if (tentativa < extensoes.length) {
      destino.src = base + extensoes[tentativa];
      tentativa++;
    }
  });
 
  // Define o endereco inicial (o "error" acima ja esta armado)
  destino.src = caminho;
}
 
// ---------------------------------------------------------------------
// PARTE 6: FUNCAO QUE DESENHA AS RECOMENDACOES E O HUD
// Chamada quando a pagina abre e depois de cada clique.
// ---------------------------------------------------------------------
function mostrar() {
 
  // O anti-bolha so pode entrar a cada 3 filmes assistidos:
  //  - assistidos > 0        : nao entra antes do primeiro clique
  //  - assistidos % 3 === 0  : entra no 3, 6, 9... (% = resto da divisao)
  const permitir = assistidos > 0 && assistidos % 3 === 0;
 
  // Chama a funcao do Felipe com:
  //  1) o perfil atual (do perfil.js do Ryan)
  //  2) o catalogo (do Matheus)
  //  3) o ultimo ajuste do perfil (para o HUD)
  //  4) se o anti-bolha pode entrar agora
  // Ela devolve { recomendacoes, hud }. As chaves { } extraem as duas.
  const { recomendacoes, hud } = atualizarRecomendacoes(
    obterPerfilAtual(),
    catalogo,
    obterUltimoAjuste(),
    permitir
  );
 
  // Apaga o conteudo da caixa de recomendados.
  // Na primeira vez, remove os quadrados brancos de placeholder.
  caixa.innerHTML = '';
 
  // Para cada filme recomendado, cria um cartaz na caixa
  recomendacoes.forEach(r => {
 
    // Acha o cartaz original desse filme pelo id
    // (o data-id do HTML e igual ao id do catalogo)
    const original = document.querySelector(`.movie-card[data-id="${r.id}"]`);
 
    // Se nao achar o cartaz, pula esse filme
    if (!original) return;
 
    // Cria uma imagem nova (ainda nao esta na pagina)
    const img = document.createElement('img');
 
    // Texto alternativo (aparece se a imagem nao carregar)
    img.alt = r.nome;
 
    // Mesma classe dos outros cartazes, para ter o mesmo visual
    img.className = 'movie-card';
 
    // Copia a capa do cartaz original
    copiarCapa(img, original);
 
    // Coloca a imagem na caixa de recomendados (agora aparece na tela)
    caixa.appendChild(img);
  });
 
  // Monta o texto do perfil, ex: "Terror: 3.00 | Comedia: 1.00 | ..."
  // Object.entries vira lista de pares [genero, valor]; map escreve
  // "genero: valor"; join junta tudo com " | ".
  const notas = Object.entries(hud.perfil)
    .map(([genero, valor]) => `${genero}: ${valor}`)
    .join(' | ');
 
  // Escreve o HUD no painel da pagina
  painel.innerHTML = `<p>Perfil: ${notas}</p>
    <p>Tamanho do ultimo ajuste: ${hud.tamanhoAjuste}</p>
    <p>Anti-bolha: ${hud.antiBolha}</p>`;
}
 
// ---------------------------------------------------------------------
// PARTE 7: CLICAR NUM CARTAZ = "ASSISTIU O FILME"
// Para cada um dos 20 cartazes, ficamos "escutando" o clique.
// ---------------------------------------------------------------------
cartazes.forEach(cartaz => cartaz.addEventListener('click', () => {
 
  // Descobre qual filme foi clicado. dataset.id le o data-id do HTML
  // (vem como texto, por isso o Number()) e procura no catalogo.
  const filme = catalogo.find(f => f.id === Number(cartaz.dataset.id));
 
  // Se nao achou o filme no catalogo, nao faz nada
  if (!filme) return;
 
  // Descobre o genero PRINCIPAL do filme. O vetor e
  // [Terror, Comedia, Romance, Acao]. Math.max acha o maior numero e
  // indexOf diz em qual posicao ele esta. Os "..." espalham a lista.
  const generoPrincipal = filme.genero.indexOf(Math.max(...filme.genero));
 
  // Avisa o perfil.js: "o usuario assistiu um filme desse genero".
  // O perfil sobe nesse genero e desce um pouco nos outros.
  registrarFilmeAssistido(generoPrincipal);
 
  // Salva o perfil novo no navegador (JSON.stringify vira texto)
  localStorage.setItem('perfil', JSON.stringify(obterPerfilAtual()));
 
  // Soma 1 no contador de filmes assistidos
  assistidos++;
 
  // Redesenha as recomendacoes e o HUD com o perfil atualizado
  mostrar();
}));
 
// ---------------------------------------------------------------------
// PARTE 8: DESENHAR A TELA ASSIM QUE A PAGINA ABRE
// Sem esta linha, as recomendacoes so apareceriam depois do primeiro
// clique. Com ela, ja aparecem com as notas escolhidas na tela 1.
// ---------------------------------------------------------------------
mostrar();