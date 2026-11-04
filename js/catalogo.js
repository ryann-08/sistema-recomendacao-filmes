class Filme {
    constructor(id, titulo, genero) {
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
    }
}

//  Os valores dos gêneros são pesos brutos de 0 a 5.
//  Os vetores serão normalizados posteriormente.
//  Ordem dos vetores: [Terror, Comédia, Romance, Ação]

const catalogo = [
//  Filmes de Terror
    new Filme(1, "O Exorcista",[5, 0, 0, 0]),
    new Filme(2, "It: A Coisa",[5, 0, 0, 1]),
    new Filme(3, "Invocação do Mal",[5, 0, 1, 1]),
    new Filme(4, "O Iluminado",[5, 0, 1, 0]),
    new Filme(5, "Pânico", [5, 0, 0, 1]),
    new Filme(6, "Annabelle", [5, 0, 0, 1]),
    new Filme(7, "Hereditário", [5, 0, 1, 0]),
    new Filme(8, "Corra!", [5, 1, 0, 1]),
    new Filme(9, "Jogos Mortais", [5, 0, 0, 1]),
    new Filme(10, "A Freira", [5, 0, 0, 1]),
    new Filme(11, "O Chamado", [5, 0, 0, 1]),
    new Filme(12, "Sobrenatural", [5, 0, 0, 1]),

//  Filmes de Comédia
    new Filme(13, "As Branquelas",[0, 5, 0, 1]),
    new Filme(14, "Se Beber, Não Case!",[0, 5, 1, 1]),
    new Filme(15, "Todo Mundo em Pânico",[1, 5, 0, 0]),
    new Filme(16, "Debi & Lóide",[0, 5, 0, 1]),
    new Filme(17, "Click", [0, 5, 1, 0]),
    new Filme(18, "Superbad: É Hoje", [0, 5, 0, 1]),
    new Filme(19, "Gente Grande", [0, 5, 0, 0]),
    new Filme(20, "Esposa de Mentirinha", [0, 5, 1, 0]),
    new Filme(21, "O Máskara", [0, 5, 0, 2]),
    new Filme(22, "Vovó... Zona", [0, 5, 0, 2]),
    new Filme(23, "Norbit", [0, 5, 2, 0]),
    new Filme(24, "O Pequenino", [0, 5, 0, 2]),

//  Filmes de Romance
    new Filme(25, "Titanic",[0, 0, 5, 0]),
    new Filme(26, "Diário de uma Paixão",[0, 0, 5, 0]),
    new Filme(27, "Como Eu Era Antes de Você",[0, 1, 5, 0]),
    new Filme(28, "10 Coisas que Eu Odeio em Você",[0, 1, 5, 0]),
    new Filme(29, "Simplesmente Acontece", [0, 1, 5, 0]),
    new Filme(30, "A Culpa é das Estrelas", [0, 1, 5, 0]),
    new Filme(31, "Querido John", [0, 0, 5, 1]),
    new Filme(32, "Orgulho e Preconceito", [0, 0, 5, 0]),
    new Filme(33, "La La Land: Cantando Estações", [0, 3, 5, 2]),
    new Filme(34, "Para Todos os Garotos que Já Amei", [0, 2, 5, 0]),
    new Filme(35, "Questão de Tempo", [0, 2, 5, 1]),
    new Filme(36, "Continência ao Amor", [0, 1, 5, 1]),


//  Filmes de Ação
    new Filme(37, "Vingadores: Ultimato",[0, 0, 0, 5]),
    new Filme(38, "John Wick",[0, 0, 0, 5]),
    new Filme(39, "Missão Impossível: Efeito Fallout",[0, 0, 0, 5]),
    new Filme(40, "Homem-Aranha: Sem Volta para Casa",[0, 1, 1, 5]),
    new Filme(41, "Mad Max: Estrada da Fúria", [0, 0, 0, 5]),
    new Filme(42, "Batman: O Cavaleiro das Trevas", [1, 0, 0, 5]),
    new Filme(43, "Velozes e Furiosos", [0, 0, 1, 5]),
    new Filme(44, "Top Gun: Maverick", [0, 0, 1, 5]),
    new Filme(45, "Matrix", [0, 0, 1, 5]),
    new Filme(46, "Gladiador", [0, 0, 1, 5]),
    new Filme(47, "Pantera Negra", [0, 0, 1, 5]),
    new Filme(48, "Resgate", [0, 0, 0, 5]),
];

//  Função responsável por normalizar um vetor.
//  A normalização transforma o vetor em um vetor de norma 1,
//  mantendo a proporção entre seus componentes.

function normalizarVetor(vetor) {

//  Calcula a soma dos quadrados de cada componente do vetor.
//  Exemplo: [3, 5, 0, 1] → 3² + 5² + 0² + 1² = 35
    const soma = vetor.reduce((soma, valor) => soma + valor ** 2, 0);

//  Calcula a norma do vetor através da raiz quadrada
//  da soma dos quadrados.
//  Exemplo: √35 ≈ 5.916
    const norma = Math.sqrt(soma);

    if(norma === 0)
        return vetor;
    
//  Divide cada componente do vetor pela sua norma,
//  criando um novo vetor cuja norma será igual a 1.
//  Exemplo: [3, 5, 0, 1] / 5.916
    const vetorNormalizado = vetor.map(valor => valor / norma);

//  Retorna o vetor normalizado.
//  Exemplo: [0.507, 0.845, 0, 0.169]
    return vetorNormalizado;
};

//  Normaliza os vetores de todos os filmes do catálogo.
//  Assim, todos passam a ter norma igual a 1.
    catalogo.forEach(filme => {
    filme.genero = normalizarVetor(filme.genero);
});

//  Relaciona cada gênero à posição que ele ocupa no vetor.
//  Ordem dos vetores: [Terror, Comédia, Romance, Ação]

const indiceGenero = {
    "Terror": 0,
    "Comédia": 1,
    "Romance": 2,
    "Ação": 3
};

//  Função responsável por buscar no catálogo os filmes
//  que possuem determinado gênero.

function buscarFilmesPorGenero(genero) {

//  Obtém a posição do gênero dentro do vetor.
//  Exemplo: "Terror" → 0, "Ação" → 3.
    const indice = indiceGenero[genero];

//  Percorre o catálogo e mantém apenas os filmes
//  que possuem peso maior que zero naquele gênero.
    const filmesEncontrados = catalogo.filter(filme => filme.genero[indice] > 0);

// Retorna a lista de filmes encontrados.
    return filmesEncontrados;
};

//  Função responsável por identificar o gênero menos representado
//  no vetor de preferências do usuário.

function obterGeneroMenosAssistido(vetorUsuario) {

//  Relaciona cada posição do vetor ao seu respectivo gênero.
//  Ordem: [Terror, Comédia, Romance, Ação]
    const genero = ["Terror", "Comédia", "Romance", "Ação"];

//  Considera inicialmente o primeiro valor do vetor como o menor.
    let menorValor = vetorUsuario[0];

//  Guarda a posição do menor valor encontrado.    
    let indiceMenor = 0;

//  Percorre o restante do vetor procurando um valor menor.
    for(let i = 1; i < vetorUsuario.length; i++) {

//  Verifica se o valor atual é menor que o menor valor encontrado.
        if(vetorUsuario[i] < menorValor) {

//  Atualiza o menor valor encontrado.
            menorValor = vetorUsuario[i];

//  Guarda a posição onde esse menor valor foi encontrado.
            indiceMenor = i;
        }
    }

//  Usa o índice encontrado para obter o nome do gênero correspondente.
    const generoMenosAssistido = genero[indiceMenor];

//  Retorna o nome do gênero menos representado.
    return generoMenosAssistido;
};

//  Função responsável por selecionar um filme que diversifique
//  o perfil do usuário, utilizando seu gênero menos representado.

// Função responsável por selecionar um filme de um gênero
// pouco representado no perfil do usuário.

function recomendarFilmeDiversificado(vetorUsuario) {

    // Identifica o gênero menos representado no perfil.
    const generoMenosAssistido = obterGeneroMenosAssistido(vetorUsuario);

    // Obtém o índice correspondente a esse gênero.
    const indiceMenosAssistido = indiceGenero[generoMenosAssistido];

    // Seleciona filmes nos quais o gênero menos representado
    // está presente e é o gênero predominante.
    const candidatos = catalogo.filter(filme => {

        const pesoGenero = filme.genero[indiceMenosAssistido];
        const maiorPeso = Math.max(...filme.genero);

        return pesoGenero > 0 && pesoGenero === maiorPeso;
    });

    // Verifica se existem filmes candidatos.
    if (candidatos.length === 0) {
        return null;
    }

    // Sorteia um filme entre os candidatos.
    const indiceAleatorio = Math.floor(Math.random() * candidatos.length);

    // Retorna o filme escolhido.
    return candidatos[indiceAleatorio];
};

export {
    catalogo,
    normalizarVetor,
    buscarFilmesPorGenero,
    recomendarFilmeDiversificado
};