import { recomendarFilmeDiversificado, normalizarVetor } from './catalogo.js';

// constante com os nomes dos generos para formatar o perfil do usuario
const NOMES_GENEROS = ["Terror", "Comédia", "Romance", "Ação"];

// Funcao para calcular a distância do perfil para o determinado filme 
function calcularDistancia(perfil, filmeGeneros) {
    let soma = 0;
    for (let i = 0; i < perfil.length; i++){
        const diferenca = (perfil[i] - filmeGeneros[i]);
        soma = soma + diferenca ** 2;
    }
    return Math.sqrt(soma);
}

// Funcao para calcular a afinidade entre o perfil do usuario e os generos do filme
function calcularAfinidade(perfil, generosDoFilme) {
    const afinidade = 1 / (1 + calcularDistancia(perfil, generosDoFilme));
    return afinidade;
}

// Funcao para calcular a afinidade entre o perfil do usuario e todos os filmes do catalogo
function calcularAfinidades(perfil, catalogo) {
    const resultado = [];
    for (const filme of catalogo) {
        const afinidade = calcularAfinidade(perfil, filme.genero);
        resultado.push({ id: filme.id, nome: filme.titulo, afinidade: afinidade });
    }
    return resultado;
}

// Obtém os 6 filmes com maior afinidade
function obterTop6(resultados){
    const copiaResultados = [...resultados];
    copiaResultados.sort((a, b) => b.afinidade - a.afinidade);
    return copiaResultados.slice(0, 6);
}

// Funcao para montar o HUD com as informações do perfil, tamanho do ultimo ajuste e status do anti-bolha
function montarHUD(perfil, ultimoAjuste, antiBolhaAtivo){
    const perfilFormatado = {};
    for (let i = 0; i < NOMES_GENEROS.length; i++){
        perfilFormatado[NOMES_GENEROS[i]] = perfil[i].toFixed(2);
    }

    return {
        perfil: perfilFormatado,
        tamanhoAjuste: calcularDistancia([0, 0, 0, 0], ultimoAjuste).toFixed(2),
        antiBolha: antiBolhaAtivo ? "Ativo" : "Inativo"
    }
}

function inserirDiversificado(top6, filmeDiversificado, perfil) {
    if (filmeDiversificado === null) {
        return top6;
    }

    const jaEstaNoTop6 = top6.some(r => r.id === filmeDiversificado.id);
    if (jaEstaNoTop6) {
        return top6;
    }

    const novoItem = {
        id: filmeDiversificado.id,
        nome: filmeDiversificado.titulo,
        afinidade: calcularAfinidade(perfil, filmeDiversificado.genero),
        diversificado: true
    };

    // Mantém os 5 primeiros e coloca o diversificado no lugar do 6º.
    return [...top6.slice(0, 5), novoItem];
}

function atualizarRecomendacoes(perfil, catalogo, ultimoAjuste, permitirDiversificado) {
    const perfilNorm = normalizarVetor(perfil);
    const afinidades = calcularAfinidades(perfil, catalogo);
    const top6 = obterTop6(afinidades);

    let recomendacoes = top6;
    if (permitirDiversificado === true) {
        const filme = recomendarFilmeDiversificado(perfil);
        recomendacoes = inserirDiversificado(top6, filme, perfil);
    }

    const entrou = recomendacoes.some(r => r.diversificado === true);
    const hud = montarHUD(perfil, ultimoAjuste, entrou);

    return {
        recomendacoes: recomendacoes,
        hud: hud
    };
}

export { atualizarRecomendacoes };