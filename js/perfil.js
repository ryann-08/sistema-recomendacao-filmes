//estou criando dois vetoes com os numeros zerados, por que ainda nao recebemos os valores da interface,
//entao criamos a base com 0
let perfilUsuario = [0, 0, 0, 0];
let ultimoAjuste =[0, 0, 0, 0];


//criar a funcao, que recebe as notas que vem da interface
//funcao criada com parametro chamado notas, pega aquele [0, 0, 0, 0] e subistitui pelas notas da tela 1
//detalhe nao retorna nada, so salva na variavel perfilUsuario, e quem retorna o valor é obterPerfilAtual
function definirPerfilInicial(notas){
    perfilUsuario = notas;
}

//aqui onde fica o perfil do usuario sempre atualizado
//nao precisa de nenhum parametro porque, ela nao vai receber nada da tela; ela so=ó vai devolver o valor
//o return "entrega" o vetor para quem chamar a funcao
function obterPerfilAtual(){
    return perfilUsuario;
}

//aqui vamos supor que a pessoa, assiste um filme de comedia (indice 1) aqui soma um valor (exemplo 0.1) na posicao 1 do vetor
//perfilUsuario e registra o quanto mudou em ultimoAjuste
//detalhe o vetor tem quatro posicoes de 0 a 3, esse indiceGenero é simplesmente um numero de 0 a 3, que a interface vai passar a 
//indicar qual foi o genero do filme assistido
function registrarFilmeAssistido(indiceGenero){
    //zerar o ultimoAjuste para calcular o novo
    ultimoAjuste = [0, 0, 0, 0];

    //registrar que esse genero especifico subiu +0.1
    ultimoAjuste[indiceGenero] = 0.1;

    //aplicar o aumento no perfil do usuario
    perfilUsuario[indiceGenero] += 0.1;
}

//essa funcao so devolve o vetor de ajuste para a interface saber o quanto mudou
function obterUltimoAjuste(){
    return ultimoAjuste;
}

//para que os outros integrantes consigam chamar essa funcao preciso exportar aqui no final do arquivo
module.exports = { definirPerfilInicial, obterPerfilAtual, registrarFilmeAssistido, obterUltimoAjuste};

