//esse arquivo liga a tela 1 (do Eduardo) com o meu perfil.js
//o html so tem os botoes, aqui eu pego os cliques e mando as notas pro perfil

//traz as funcoes do perfil.js
import { definirPerfilInicial, obterPerfilAtual } from './perfil.js';

//notas escolhidas, na ordem do vetor: terror, comedia, romance, acao
//null = ainda nao escolheu
const notas = [null, null, null, null];

//a tela do eduardo tem outra ordem (acao, comedia, romance, terror)
//essa lista converte a linha da tela pra posicao certa do vetor
//sem ela terror e acao ficam trocados
const posicaoNoVetor = [3, 1, 2, 0];

//roda quando clica numa nota (o onclick do html chama essa funcao)
function salvarNota(indiceTela, nota) {

    //guarda a nota na posicao certa do vetor
    notas[posicaoNoVetor[indiceTela]] = nota;

    //pega a linha do genero clicado e deixa so o botao escolhido roxo
    const linha = document.querySelectorAll('.linha-genero')[indiceTela];
    linha.querySelectorAll('.btn-nota').forEach(botao => {
        botao.classList.toggle('selecionado', Number(botao.textContent) === nota);
    });
}

//roda quando clica em continuar
function avancarParaProximaTela() {

    //se faltar nota de algum genero, avisa e nao deixa passar
    if (notas.includes(null)) {
        alert('Escolha uma nota de 1 a 5 para os 4 generos.');
        return;
    }

    //manda as notas pro perfil.js
    definirPerfilInicial(notas);

    //salva no navegador pra tela 2 conseguir ler (o nome 'perfil' tem que ser igual la)
    localStorage.setItem('perfil', JSON.stringify(obterPerfilAtual()));

    //vai pra tela 2
    window.location.href = 'recomendacoes.html';
}

//como o arquivo e modulo, o html nao enxerga as funcoes
//essas duas linhas deixam o onclick achar elas
window.salvarNota = salvarNota;
window.avancarParaProximaTela = avancarParaProximaTela;