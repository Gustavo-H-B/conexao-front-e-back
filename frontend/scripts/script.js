const API_URL = "http://localhost:3001";

const tituloFormulario = document.getElementById("tituloFormulario");
const formProduto = document.getElementById("formProduto");
const descricao = document.getElementById("descricao");
const preco = document.getElementById("preco");
const bataoSalvar = document.getElementById("bataoSalvar");
const bataoCancelar = document.getElementById("bataoCancelar");
const mensagem = document.getElementById("mensagem");
const idBusca = document.getElementById("idBusca");
const botaoBuscar = document.getElementById("botaoBuscar");
const botaoListar = document.getElementById("botaoListar");
const resultadoBusca = document.getElementById("resultadoBusca");
const botaoAtualizarLista = document.getElementById("botaoAtualizarLista");
const listaProdutos = document.getElementById("listaProdutos");

function mostrarMensagem(texto, ehErro = false) {
    mensagem.textContent = texto;
    mensagem.className = ehErro ? 'erro' : 'sucesso';
};

async function listarProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}.`);
        }

        const produtos = await response.json();
        listaProdutos.innerHTML = '';

        if (produtos.length === 0) {
            listaProdutos.innerHTML = `
                <tr>
                    <td colspan = "5"> Nenhum produto cadastrado. </td>
                </tr>
            `;
            return;
        };

        produtos.forEach((produto) => {
            listaProdutos.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>${Number(produto.preco).toFixed(2)}</td>
                    <td>
                        <button onclick = "prepararEdicao(${produto.id})"> Editar </button>

                        <button onclick = "excluirProduto(${produto.id})"> Excluir </button>
                    </td>
                </tr>
            `;
        });

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    };
};

async function buscarProdutoPorId() {
    try {
        const id = idBusca.value
        if(!id || id == undefined || Number.isInteger(id)){
            resultadoBusca.innerHTML = `
                <tr>
                    <td colspan = "5"> Nenhum Id digitado.</td>
                </tr>
            `;
            return;
        };

        const response = await fetch(`${API_URL}/produtos/${id}`);
        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}.`);
        };

        const produtos = await response.json();

        resultadoBusca.innerHTML = '';

        if (produtos.length === 0) {
            resultadoBusca.innerHTML = `
                <tr>
                    <td colspan = "5"> Nenhum produto com esse id. </td>
                </tr>
            `;
            return;
        };
        
        produtos.forEach((produto) => {
            resultadoBusca.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>${Number(produto.preco).toFixed(2)}</td>
                    <td>
                        <button onclick = "prepararEdicao(${produto.id})"> Editar </button>

                        <button onclick = "excluirProduto(${produto.id})"> Excluir </button>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    };
};

async function cadastrarProduto(dadosProdutos) {
    try {
        const response = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosProdutos)
        });

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}.`);
        };

        const resultado = await response.json();
        return resultado;

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    };
};

async function excluirProduto(id) {
    try {
        const response = await fetch(`${API_URL}/produtos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Erro de rede: ${response.status}.`);
        };
        
        mostrarMensagem("Produto deletado com sucesso.");
        listarProdutos();
        
    } catch (erro) {
        mostrarMensagem(erro.message, true);
    };
};

listarProdutos();
botaoBuscar.addEventListener("click", () => {
    buscarProdutoPorId();
});
formProduto.addEventListener("submit", async function (x) {
    x.preventDefault();

    const dadosProdutos = {
        nome: nome.value,
        descricao: descricao.value,
        preco: preco.value
    };

    try {

        cadastrarProduto(dadosProdutos);
        mostrarMensagem("Produto cadastrado com sucesso.")
        listarProdutos();

    } catch (erro) {
        mostrarMensagem(erro.message, true);
    };
});