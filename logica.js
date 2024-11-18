const produtos = [
    { id: 1, nome: "Teclado Ctrl+C Ctrl+V", preco: 149.90, imagem: "img/ctrol CV.jpg" },
    { id: 2, nome: "Papel Higiênico Debug", preco: 29.90, imagem: "img/papel higienico.jpg" },
    { id: 3, nome: "Café Overflow", preco: 39.90, imagem: "/api/placeholder/200/200" },
    { id: 4, nome: "Mouse Sem Bug", preco: 99.90, imagem: "/api/placeholder/200/200" },
    { id: 5, nome: "Caneca Null", preco: 49.90, imagem: "img/chicara.jpg" },
    { id: 6, nome: "Almofada 404", preco: 79.90, imagem: "/api/placeholder/200/200" }
];

// Obtém o elemento do GIF pela ID
const gif = document.getElementById('loopGif');

// Função para reiniciar o GIF
function reiniciarGif() {
    gif.src = gif.src; // Recarrega a imagem para reiniciar o GIF
}

// Define o intervalo para reiniciar o GIF a cada 4 segundos (4000ms)
setInterval(reiniciarGif, 4000);

const mensagensFrete = [
    "Aceito seu rim esquerdo como forma de pagamento! 🫁",
    "Um pulmão seria suficiente para cobrir esse frete! 🫁",
    "Que tal trocar seu coração por frete grátis? ❤️",
    "Fígado também serve como moeda de troca! 🫀",
    "Um pedaço do seu cérebro resolve (você não usa mesmo...) 🧠"
];

// Inicializa o carrossel de produtos
function inicializarCarrossel() {
    const carrossel = document.getElementById("carrossel");
    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.classList.add("produto");
        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preco.toFixed(2)}</p>
            <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
        `;
        carrossel.appendChild(card);
    });

    // Duplica os elementos para criar efeito infinito
    carrossel.innerHTML += carrossel.innerHTML;
}

const carrinho = new Map(); // Armazena os produtos no carrinho
let offset = 0;

// Move o carrossel
function moverCarrossel(direcao) {
    const carrossel = document.getElementById("carrossel");
    const cardWidth = carrossel.children[0].offsetWidth;
    offset += direcao * cardWidth;

    if (offset <= -carrossel.scrollWidth / 2) {
        offset = 0;
    } else if (offset >= 0) {
        offset = -carrossel.scrollWidth / 2 + cardWidth;
    }

    carrossel.style.transform = `translateX(${offset}px)`;
}

// Atualiza o carrinho
function atualizarCarrinho() {
    const carrinhoElement = document.getElementById("itens-carrinho");
    const totalElement = document.getElementById("total-carrinho");
    carrinhoElement.innerHTML = '';
    let total = 0;

    carrinho.forEach((quantidade, produtoId) => {
        const produto = produtos.find(p => p.id === produtoId);
        total += produto.preco * quantidade;
        const itemElement = document.createElement("div");
        itemElement.className = "item-carrinho";
        itemElement.innerHTML = `
            <span>${produto.nome} x${quantidade}</span>
            <span>R$ ${(produto.preco * quantidade).toFixed(2)}</span>
            <button onclick="removerDoCarrinho(${produtoId})">Remover</button>
        `;
        carrinhoElement.appendChild(itemElement);
    });

    totalElement.innerHTML = `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
}

// Adiciona um produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    const quantidade = carrinho.get(produtoId) || 0;
    carrinho.set(produtoId, quantidade + 1);
    atualizarCarrinho();

    const botao = event.target;
    botao.textContent = 'Adicionado ✔';
    setTimeout(() => botao.textContent = 'Adicionar', 1000);
}

// Remove um produto do carrinho
function removerDoCarrinho(produtoId) {
    if (carrinho.has(produtoId)) {
        carrinho.delete(produtoId);
        atualizarCarrinho();
    }
}

// Calcula o frete e exibe mensagem aleatória
async function calcularFrete() {
    const cep = document.getElementById('campoCep').value.replace(/\D/g, '');
    const resultadoElement = document.getElementById('resultado-frete');

    if (cep.length !== 8) {
        resultadoElement.textContent = 'CEP inválido!';
        return;
    }

    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (data.erro) throw new Error('CEP não encontrado!');

        const frete = Math.random() * 100 + 50;
        const mensagemAleatoria = mensagensFrete[Math.floor(Math.random() * mensagensFrete.length)];

        resultadoElement.innerHTML = `
            <p>${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}</p>
            <p>Frete: R$ ${frete.toFixed(2)}</p>
            <p><strong>${mensagemAleatoria}</strong></p>
        `;
    } catch (error) {
        resultadoElement.textContent = error.message;
    }
}

// Mostra ou oculta o carrinho
function mostrarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho');
    carrinhoContainer.style.display = carrinhoContainer.style.display === 'none' ? 'flex' : 'none';
}

// Abre o carrinho em uma nova aba
function abrirCarrinho() {
    const novaAba = window.open('', '_blank');
    let total = 0;

    const conteudoCarrinho = Array.from(carrinho.entries()).map(([id, quantidade]) => {
        const produto = produtos.find(p => p.id === id);
        const subtotal = produto.preco * quantidade;
        total += subtotal;
        return `<p>${produto.nome} x${quantidade} - R$ ${subtotal.toFixed(2)}</p>`;
    }).join('');

    novaAba.document.write(`
        <html>
        <head>
            <title>Carrinho</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 2rem; }
                h1 { color: #3498db; }
                .total { font-weight: bold; color: #e74c3c; }
            </style>
        </head>
        <body>
            <h1>Carrinho de Compras</h1>
            ${conteudoCarrinho || '<p>Carrinho vazio!</p>'}
            <p class="total">Total: R$ ${total.toFixed(2)}</p>
        </body>
        </html>
    `);
    novaAba.document.close();
}



// Inicializa eventos
document.addEventListener("DOMContentLoaded", () => {
    inicializarCarrossel();
    moverCarrossel(0);
});

