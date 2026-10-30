import { recomendarFilmeDiversificado, normalizarVetor } from '.catalogo.js';

// constante com os nomes dos generos para formatar o perfil do usuario
const NOMES_GENEROS = ["Terror", "Comédia", "Romance", "Ação"];


// Funcao para calcular a distância do perfil para o determinado filme 
function calcularDistancia(perfil, filmeGeneros) {
// Inicia com 0 a soma dos quadrados das diferenças entre o perfil e os generos do filme    
    let soma = 0;
// laço for para percorrer o perfil do usuario e calcular a diferenca entre o perfil e os generos do filme
    for (let i = 0; i < perfil.length; i++){
// Calcula a diferença entre o perfil do usuário e os generos do filme
        const diferenca = (perfil[i] - filmeGeneros[i]);
// Faz cada diferença ao quadrado para evitar que as diferenças positivas e negativas se cancelam
// e adiciona a soma dos quadrados das diferenças
        soma = soma + diferenca **2;
    }
// Retorna a raiz quadrada da soma dos quadrados das diferenças
    return Math.sqrt(soma);
}

// Funcao para calcular a afinidade entre o perfil do usuario e os generos do filme
function calcularAfinidade(perfil, generosDoFilme) {
// Calcula a afinidade entre o perfil do usuário e os generos do filme usando a fórmula 1 / (1 + distância)
// (1 + distância) é usado para evitar divisão por zero e com distância 0 
// a afinidade é 1 (máxima), e quanto maior a distância, mais perto de 0.
    const afinidade = 1 / (1+calcularDistancia(perfil, generosDoFilme));
// Retorna a afinidade calculada
    return afinidade;
}

// Funcao para calcular a afinidade entre o perfil do usuario e todos os filmes do catalogo
function calcularAfinidades(perfil, catalogo) {
// Inicia um array vazio para armazenar os resultados das afinidades
    const resultado = [];
// Percorre cada filme do catalogo
    for (const filme of catalogo) {
// Calcula a afinidade entre o perfil do usuário e os generos do filme
// A função calcularAfinidade é chamada para cada filme, passando o perfil do usuário e os generos do filme como argumentos
        const afinidade = calcularAfinidade(perfil, filme.genero);
// Adiciona o resultado da afinidade ao array de resultados, incluindo o id e o nome do filme
        resultado.push({ id: filme.id, nome: filme.titulo, afinidade: afinidade });
    }
// Retorna o array de resultados com as afinidades calculadas
    return resultado;
}
    

// Funcao para obter os 5 filmes com maior afinidade
function obterTop5(resultados){
// Cria uma cópia do array de resultados para não modificar o array original
    const copiaResultados = [...resultados];
// Ordena a cópia do array de resultados em ordem decrescente de afinidade
    copiaResultados.sort((a, b) => b.afinidade - a.afinidade);
// Retorna os 5 primeiros elementos do array ordenado, que são os filmes com maior afinidade
    return copiaResultados.slice(0, 5);
}



// Funcao para montar o HUD com as informações do perfil, tamanho do ultimo ajuste e status do anti-bolha
function montarHUD(perfil, ultimoAjuste, antiBolhaAtivo){
// Cria um objeto vazio para armazenar o perfil formatado
    const perfilFormatado = {};
// Percorre o array de nomes dos generos e formata o perfil do usuário com duas casas decimais
    for (let i = 0; i < NOMES_GENEROS.length; i++){
        perfilFormatado[NOMES_GENEROS[i]] = perfil[i].toFixed(2);
        }

    return{
// Perfil vira perfil formtado
            perfil: perfilFormatado,
// Tamanho do ajuste vira o calculo da distancia como vetor e o ultimo ajuste com duas casas decimais
            tamanhoAjuste: calcularDistancia([0, 0, 0, 0], ultimoAjuste).toFixed(2),
            antiBolha : antiBolhaAtivo ? "Ativo" : "Inativo"
        }

    }


function inserirDiversificado(top5, filmeDiversificado, perfil) {

    // Se não achou candidato (null), não insere nada
    if (filmeDiversificado === null) {
        return top5;
    }

    // Se o filme já está no top 5, inserir duplicaria
    const jaEstaNoTop5 = top5.some(r => r.id === filmeDiversificado.id);
    if (jaEstaNoTop5) {
        return top5;
    }

    // Converte o formato de (titulo, genero) 
    // para o (nome, afinidade)
    const novoItem = {
        id: filmeDiversificado.id,
        nome: filmeDiversificado.titulo,
        afinidade: calcularAfinidade(perfil, filmeDiversificado.genero),
        diversificado: true
    };

    // Mantém os 4 primeiros e coloca o diversificado no lugar do 5º.
    // slice cria um array novo, então o top5 original fica intacto.
    return [...top5.slice(0, 4), novoItem];

}

// Monta o pacote completo: top 5 + HUD.
// permitirDiversificado: true/false, decidido por quem conta os filmes
function atualizarRecomendacoes(perfil, catalogo, ultimoAjuste, permitirDiversificado) {

    // 1. Calcula a afinidade de todos os filmes e pega os 5 melhores
    const perfilNorm = normalizarVetor(perfil);
    const afinidades = calcularAfinidades(perfil, catalogo);
    const top5 = obterTop5(afinidades);


    // 2. Começa com o top 5 normal; só troca se a diversificação for permitida
    let recomendacoes = top5;
    if (permitirDiversificado === true) {
        const filme = recomendarFilmeDiversificado(perfil);
        recomendacoes = inserirDiversificado(top5, filme, perfil);
    }

    // 3. O HUD mostra "Ativo" só se o filme diversificado reAalmente entrou
    //    (a função pode devolver null, ou o filme já estar no top 5)
    const entrou = recomendacoes.some(r => r.diversificado === true);
    const hud = montarHUD(perfil, ultimoAjuste, entrou);

    return {
        recomendacoes: recomendacoes,
        hud: hud
    };
}

export { atualizarRecomendacoes };