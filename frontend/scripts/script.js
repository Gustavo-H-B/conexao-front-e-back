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
    const response = await fetch(`${API_URL}/produto/${idBusca.value}`);

};

listarProdutos();