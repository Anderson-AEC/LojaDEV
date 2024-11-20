// Constantes e configurações
const SENHA_ADMIN = "1234";
const INTERVALO_GIF = 4000;
const mensagensFrete = [
    "Aceito seu rim esquerdo como forma de pagamento! 🫁",
    "Um pulmão seria suficiente para cobrir esse frete! 🫁",
    "Que tal trocar seu coração por frete grátis? ❤️",
    "Fígado também serve como moeda de troca! 🫀",
    "Um pedaço do seu cérebro resolve (você não usa mesmo...) 🧠"
];

// Array de produtos
const produtos = [
    { id: 1, nome: "Teclado Ctrl+C Ctrl+V", preco: 149.90, imagem: "img/ctrol CV.jpg" },
    { id: 2, nome: "Papel Higiênico Debug", preco: 29.90, imagem: "img/papel higienico.jpg" },
    { id: 3, nome: "Café Foco Total", preco: 39.90, imagem: "img/cafe.jpg" },
    { id: 4, nome: "Namorada Virtual", preco: 99.90, imagem: "img/namorada.jpg" },
    { id: 5, nome: "Caneca Null", preco: 49.90, imagem: "img/chicara.jpg" },
    { id: 6, nome: "Pet preguiçoso", preco: 79.90, imagem: "img/gato esperando.jpg" }
];

// Estado global
let modoEdicaoAtivo = false;
let offset = 0;
const carrinho = new Map();

// Funções de administração
function validarAcesso() {
    const senhaDigitada = prompt("Digite a senha para editar produtos:");
    if (senhaDigitada === SENHA_ADMIN) {
        toggleEdicaoProdutos();
    } else {
        alert("Senha incorreta! Acesso negado.");
    }
}

function toggleEdicaoProdutos() {
    const carrossel = document.getElementById("carrossel");
    modoEdicaoAtivo = !modoEdicaoAtivo;
    carrossel.querySelectorAll('.edicao-produto').forEach(container => container.remove());

    if (modoEdicaoAtivo) {
        adicionarBotoesEdicao(carrossel);
    }
}

function adicionarBotoesEdicao(carrossel) {
    carrossel.querySelectorAll('.produto').forEach(card => {
        const produtoId = produtos.find(p => p.nome === card.querySelector('.produto-nome').textContent).id;
        const edicaoContainer = criarContainerEdicao(produtoId);
        card.appendChild(edicaoContainer);
    });
}

function criarContainerEdicao(produtoId) {
    const container = document.createElement("div");
    container.className = "edicao-produto cyber-button";
    
    const btnAdicionar = document.createElement("button");
    btnAdicionar.textContent = "+";
    btnAdicionar.className = "btn-adicionar-produto";
    btnAdicionar.onclick = () => adicionarProduto(produtoId);
    
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "-";
    btnRemover.className = "btn-remover-produto";
    btnRemover.onclick = () => removerProduto(produtoId);
    
    container.appendChild(btnAdicionar);
    container.appendChild(btnRemover);
    
    return container;
}

// Funções de manipulação de produtos
function adicionarProduto(produtoId) {
    const container = criarFormularioAdicao();
    document.body.appendChild(container);

    configurarEventosFormulario(container);
}

function adicionarProduto(produtoId) {
    // Cria um container para o formulário de adicionar produto
    const container = document.createElement('div');
    container.className = 'modal-overlay';
    container.innerHTML = `
        <div class="modal-content">
            <h2 class="modal-header">Adicionar Produto</h2>
            <div class="modal-form-group">
                <input type="text" id="novoProdutoNome" class="modal-input" placeholder="Nome do Produto">
                <input type="number" id="novoProdutoPreco" class="modal-input" placeholder="Preço" step="0.01">
                <label for="novoProdutoImagem" class="modal-input" style="display: block; cursor: pointer; text-align: center;">
                    Clique para selecionar imagem
                    <input type="file" id="novoProdutoImagem" accept="image/*" style="display: none;">
                </label>
            </div>
            <div class="modal-buttons">
                <button id="btnConfirmar" class="modal-button modal-button-confirm">Confirmar</button>
                <button id="btnCancelar" class="modal-button modal-button-cancel">Cancelar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(container);
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open

    const btnConfirmar = container.querySelector('#btnConfirmar');
    const btnCancelar = container.querySelector('#btnCancelar');
    const imagemInput = container.querySelector('#novoProdutoImagem');

    btnCancelar.onclick = () => {
        document.body.removeChild(container);
        document.body.style.overflow = ''; // Restore scrolling
    };

    btnConfirmar.onclick = () => {
        const nome = document.getElementById('novoProdutoNome').value;
        const preco = parseFloat(document.getElementById('novoProdutoPreco').value);
        const imagemArquivo = imagemInput.files[0];

        if (nome && !isNaN(preco) && imagemArquivo) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const novoId = Math.max(...produtos.map(p => p.id)) + 1;
                const novoProduto = { 
                    id: novoId, 
                    nome: nome, 
                    preco: preco, 
                    imagem: event.target.result
                };
                
                produtos.push(novoProduto);
                
                const carrossel = document.getElementById("carrossel");
                carrossel.innerHTML = '';
                inicializarCarrossel();
                
                if (modoEdicaoAtivo) {
                    toggleEdicaoProdutos();
                }
                
                document.body.removeChild(container);
                document.body.style.overflow = ''; // Restore scrolling
                
                alert(`Produto "${nome}" adicionado com sucesso!`);
            };
            
            reader.readAsDataURL(imagemArquivo);
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    };
}

function criarFormularioAdicao() {
    const container = document.createElement('div');
    container.innerHTML = `
        <div class="modal-adicao">
            <h2>Adicionar Produto</h2>
            <input type="text" id="novoProdutoNome" placeholder="Nome do Produto">
            <input type="number" id="novoProdutoPreco" placeholder="Preço" step="0.01">
            <label for="novoProdutoImagem">Imagem do Produto:</label>
            <input type="file" id="novoProdutoImagem" accept="image/*">
            <div class="botoes-modal">
                <button id="btnConfirmar" class="cyber-button">Confirmar</button>
                <button id="btnCancelar" class="cyber-button">Cancelar</button>
            </div>
        </div>
    `;
    return container;
}

function configurarEventosFormulario(container) {
    const btnConfirmar = container.querySelector('#btnConfirmar');
    const btnCancelar = container.querySelector('#btnCancelar');
    const imagemInput = container.querySelector('#novoProdutoImagem');

    btnCancelar.onclick = () => document.body.removeChild(container);
    btnConfirmar.onclick = () => processarFormulario(container, imagemInput);
}

function processarFormulario(container, imagemInput) {
    const nome = document.getElementById('novoProdutoNome').value;
    const preco = parseFloat(document.getElementById('novoProdutoPreco').value);
    const imagemArquivo = imagemInput.files[0];

    if (validarFormulario(nome, preco, imagemArquivo)) {
        processarImagem(imagemArquivo, nome, preco, container);
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }
}

function validarFormulario(nome, preco, imagemArquivo) {
    return nome && !isNaN(preco) && imagemArquivo;
}

function processarImagem(imagemArquivo, nome, preco, container) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const novoProduto = {
            id: Math.max(...produtos.map(p => p.id)) + 1,
            nome: nome,
            preco: preco,
            imagem: event.target.result
        };
        
        produtos.push(novoProduto);
        atualizarInterface(container);
        alert(`Produto "${nome}" adicionado com sucesso!`);
    };
    reader.readAsDataURL(imagemArquivo);
}

function atualizarInterface(container) {
    document.body.removeChild(container);
    const carrossel = document.getElementById("carrossel");
    carrossel.innerHTML = '';
    inicializarCarrossel();
    if (modoEdicaoAtivo) {
        toggleEdicaoProdutos();
    }
}

function removerProduto(produtoId) {
    const indice = produtos.findIndex(p => p.id === produtoId);
    if (indice !== -1) {
        const produtoRemovido = produtos.splice(indice, 1)[0];
        carrinho.delete(produtoId);
        atualizarInterfaceRemocao();
        alert(`Produto "${produtoRemovido.nome}" removido com sucesso!`);
    } else {
        alert("Produto não encontrado.");
    }
}

function atualizarInterfaceRemocao() {
    const carrossel = document.getElementById("carrossel");
    carrossel.innerHTML = '';
    inicializarCarrossel();
    atualizarCarrinho();
    if (modoEdicaoAtivo) {
        toggleEdicaoProdutos();
    }
}

// Funções do carrossel
function inicializarCarrossel() {
    const carrossel = document.getElementById("carrossel");
    produtos.forEach(produto => {
        const card = criarCardProduto(produto);
        carrossel.appendChild(card);
    });
}

function criarCardProduto(produto) {
    const card = document.createElement("div");
    card.classList.add("produto");
    card.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-img">
        <h3 class="produto-nome">${produto.nome}</h3>
        <p class="produto-preco">R$ ${produto.preco.toFixed(2)}</p>
        <button class="cyber-button" onclick="adicionarAoCarrinho(${produto.id})">
            Adicionar ao Carrinho
        </button>
    `;
    return card;
}

function moverCarrossel(direcao) {
    const carrossel = document.getElementById("carrossel");
    const cardWidth = carrossel.children[0].offsetWidth + 32;
    offset += direcao * cardWidth;

    const maxOffset = -(carrossel.children.length - 3) * cardWidth;
    if (offset > 0) offset = maxOffset;
    if (offset < maxOffset) offset = 0;

    carrossel.style.transform = `translateX(${offset}px)`;
}

// Funções do carrinho
function atualizarCarrinho() {
    const carrinhoElement = document.getElementById("itens-carrinho");
    const totalElement = document.getElementById("total-carrinho");
    const cartCount = document.querySelector(".cart-count");
    
    carrinhoElement.innerHTML = '';
    let total = 0;
    let count = 0;

    carrinho.forEach((quantidade, produtoId) => {
        count += quantidade;
        const produto = produtos.find(p => p.id === produtoId);
        total += produto.preco * quantidade;
        
        const itemElement = criarElementoCarrinho(produto, quantidade);
        carrinhoElement.appendChild(itemElement);
    });

    cartCount.textContent = count;
    totalElement.innerHTML = `<div class="total">Total: R$ ${total.toFixed(2)}</div>`;
}

function criarElementoCarrinho(produto, quantidade) {
    const itemElement = document.createElement("div");
    itemElement.className = "item-carrinho";
    itemElement.innerHTML = `
        <div class="item-info">
            <span>${produto.nome}</span>
            <span class="quantidade">x${quantidade}</span>
        </div>
        <div class="item-price">
            R$ ${(produto.preco * quantidade).toFixed(2)}
            <button class="remove-button" onclick="removerDoCarrinho(${produto.id})">✕</button>
        </div>
    `;
    return itemElement;
}

function adicionarAoCarrinho(produtoId) {
    const quantidade = carrinho.get(produtoId) || 0;
    carrinho.set(produtoId, quantidade + 1);
    atualizarCarrinho();
    
    const botao = event.target;
    animarBotaoAdicao(botao);
}

function animarBotaoAdicao(botao) {
    const originalText = botao.textContent;
    botao.textContent = 'Adicionado ✓';
    botao.style.background = '#00ff00';
    setTimeout(() => {
        botao.textContent = originalText;
        botao.style.background = '';
    }, 1000);
}

function removerDoCarrinho(produtoId) {
    carrinho.delete(produtoId);
    atualizarCarrinho();
}

// Funções de frete
async function calcularFrete() {
    const cepInput = document.getElementById('campoCep').value;
    const cep = cepInput.replace(/[^0-9]/g, '');
    const resultadoElement = document.getElementById('resultado-frete');

    if (cep.length !== 8) {
        resultadoElement.innerHTML = '<p class="error">CEP inválido!</p>';
        return;
    }

    resultadoElement.innerHTML = '<p class="loading">Calculando...</p>';

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (data.erro) throw new Error('CEP não encontrado!');

        const frete = Math.random() * 100 + 50;
        const mensagemAleatoria = mensagensFrete[Math.floor(Math.random() * mensagensFrete.length)];

        resultadoElement.innerHTML = `
            <div class="frete-info">
                <p>${data.logradouro}, ${data.bairro}</p>
                <p>${data.localidade}/${data.uf}</p>
                <p class="frete-valor">Frete: R$ ${frete.toFixed(2)}</p>
                <p class="mensagem-frete">${mensagemAleatoria}</p>
            </div>
        `;
    } catch (error) {
        resultadoElement.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Funções de interface
function mostrarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho');
    carrinhoContainer.style.display = carrinhoContainer.style.display === 'none' ? 'block' : 'none';
}

function reiniciarGif() {
    const gif = document.getElementById('loopGif');
    gif.src = gif.src;
}

// Funções de efeitos visuais
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    configureCanvas(canvas);
    
    const ctx = canvas.getContext('2d');
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const drops = Array(Math.floor(canvas.width / 16)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0F0';
        ctx.font = '16px monospace';

        drops.forEach((drop, i) => {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * 16, drop * 16);
            
            if (drop * 16 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    setInterval(draw, 33);
}

function configureCanvas(canvas) {
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    inicializarCarrossel();
    createMatrixRain();
    atualizarCarrinho();
    setInterval(reiniciarGif, INTERVALO_GIF);
});

window.addEventListener('resize', () => {
    offset = 0;
    document.getElementById("carrossel").style.transform = `translateX(0)`;
});