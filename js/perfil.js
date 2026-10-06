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



//a ideia dessa funcao é simples, quando o usuario assiste a um filme, precisa atualizar o perfil dele
//o genero que ele assistiu ganha nota, e todos os outros perdem um pouco
function registrarFilmeAssistido(indiceGenero){

    //aqui duas regras constantes, assistiu ganha (+0.1) outros generos perdem por nao er sido assistidos
    const INCREMENTO = 0.2;
    const DECREMENTO = 0.03;

    //aqui estou zerando a lista, para conseguir registrar quanto cada um dos generos vai mudar
    ultimoAjuste = [0, 0, 0, 0];

    //essa linha faz o codigo olhar para cada um dos genero do usuario
    for(let i = 0; i < perfilUsuario.length; i++){

        //essa linha aqui abaixo é o teste se o genero é assistido ou nao
        if(i === indiceGenero){

            //aqui se for o genero assistido, soma 0.1, na nota atual se passar de 5.0 o match.min trava
            const novaNota = Math.min(5, perfilUsuario[i] + INCREMENTO);

            //arredonda a nota para 2 casas decimais
            const notaArredondada = Number(novaNota.toFixed(2));

            //calcula a variacao exata ja com o valor arredondado
            ultimoAjuste[i] = Number((notaArredondada - perfilUsuario[i]).toFixed(2));

            //aqui grava a nova nota incrementada no perfil do usuarios
            perfilUsuario[i] = notaArredondada;
        }
        //se nao for o genbero assistido
        else{

            //subtrai 0.03 da nota atual se tentar ficar menor que 0.0 o math.max trava no minimo que é 0.0
            const novaNota = Math.max(0, perfilUsuario[i] - DECREMENTO);

            //arredonda a nota para 2 casas decimais para evitar o dizimas no js
            const notaArredondada = Number(novaNota.toFixed(2));

            //calcula a variação exata ja com o valor arredondado
            ultimoAjuste[i] = Number((notaArredondada - perfilUsuario[i]).toFixed(2));

            //guarda a nova nota reduzida do perfil do usuario
            perfilUsuario[i] =notaArredondada;
        }
    }
}



//essa funcao so devolve o vetor de ajuste para a interface saber o quanto mudou
function obterUltimoAjuste(){
    return ultimoAjuste;
}

//para que os outros integrantes consigam chamar essa funcao preciso exportar aqui no final do arquivo
module.exports = { definirPerfilInicial, obterPerfilAtual, registrarFilmeAssistido, obterUltimoAjuste};

