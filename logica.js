// Array de produtos disponíveis na loja
const produtos = [
    // Produto 1: Teclado
    { id: 1, nome: "Teclado Ctrl+C Ctrl+V", preco: 149.90, imagem: "img/ctrol CV.jpg" },
    // Produto 2: Papel Higiênico
    { id: 2, nome: "Papel Higiênico Debug", preco: 29.90, imagem: "img/papel higienico.jpg" },
    // Produto 3: Café
    { id: 3, nome: "Café Foco Total", preco: 39.90, imagem: "img/cafe.jpg" },
    // Produto 4: Namorada Virtual
    { id: 4, nome: "Namorada Virtual", preco: 99.90, imagem: "img/namorada.jpg" },
    // Produto 5: Caneca
    { id: 5, nome: "Caneca Null", preco: 49.90, imagem: "img/chicara.jpg" },
    // Produto 6: Pet
    { id: 6, nome: "Pet preguiçoso", preco: 79.90, imagem: "img/gato esperando.jpg" }
];

// Obtém o elemento do GIF pela ID
const gif = document.getElementById('loopGif');

// Função para reiniciar o GIF
function reiniciarGif() {
    gif.src = gif.src; // Recarrega a imagem para reiniciar o GIF
}

// Define o intervalo para reiniciar o GIF a cada 4 segundos (4000ms)
setInterval(reiniciarGif, 4000);

// Array de mensagens engraçadas para o frete
const mensagensFrete = [
    "Aceito seu rim esquerdo como forma de pagamento! 🫁",
    "Um pulmão seria suficiente para cobrir esse frete! 🫁",
    "Que tal trocar seu coração por frete grátis? ❤️",
    "Fígado também serve como moeda de troca! 🫀",
    "Um pedaço do seu cérebro resolve (você não usa mesmo...) 🧠"
];

// Mapa para armazenar os itens do carrinho
const carrinho = new Map();
// Variável para controlar o deslocamento do carrossel
let offset = 0;

// Função para criar o efeito de chuva matrix
function createMatrixRain() {
    // Criação do canvas para o efeito matrix
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    document.body.appendChild(canvas);

    // Configuração do contexto do canvas
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres usados no efeito matrix
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const drops = [];
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Inicialização das gotas
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    // Função para desenhar o efeito
    function draw() {
        // Limpa o canvas com um fundo semi-transparente
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Define a cor e fonte dos caracteres
        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';

        // Desenha os caracteres
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reinicia a gota quando chega ao fim da tela
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    // Atualização do efeito a cada 33ms (aproximadamente 30fps)
    setInterval(draw, 33);
}

// Função para inicializar o carrossel de produtos
function inicializarCarrossel() {
    // Obtém o elemento do carrossel
    const carrossel = document.getElementById("carrossel");
    
    // Cria os cards de produtos
    produtos.forEach(produto => {
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
        carrossel.appendChild(card);
    });
}

// Função para mover o carrossel
function moverCarrossel(direcao) {
    // Obtém o elemento do carrossel
    const carrossel = document.getElementById("carrossel");
    // Calcula a largura de cada card incluindo o espaçamento
    const cardWidth = carrossel.children[0].offsetWidth + 32;
    // Atualiza o offset baseado na direção
    offset += direcao * cardWidth;

    // Calcula o offset máximo permitido
    const maxOffset = -(carrossel.children.length - 3) * cardWidth;
    
    // Ajusta o offset para criar um efeito de loop
    if (offset > 0) offset = maxOffset;
    if (offset < maxOffset) offset = 0;

    // Aplica a transformação
    carrossel.style.transform = `translateX(${offset}px)`;
}

// Função para atualizar o carrinho
function atualizarCarrinho() {
    // Obtém os elementos do DOM
    const carrinhoElement = document.getElementById("itens-carrinho");
    const totalElement = document.getElementById("total-carrinho");
    const cartCount = document.querySelector(".cart-count");
    
    // Limpa o conteúdo atual do carrinho
    carrinhoElement.innerHTML = '';
    
    // Inicializa variáveis de controle
    let total = 0;
    let count = 0;

    // Itera sobre os itens no carrinho
    carrinho.forEach((quantidade, produtoId) => {
        // Atualiza o contador total de itens
        count += quantidade;
        
        // Encontra o produto correspondente
        const produto = produtos.find(p => p.id === produtoId);
        
        // Calcula o subtotal do item
        total += produto.preco * quantidade;
        
        // Cria o elemento do item no carrinho
        const itemElement = document.createElement("div");
        itemElement.className = "item-carrinho";
        itemElement.innerHTML = `
            <div class="item-info">
                <span>${produto.nome}</span>
                <span class="quantidade">x${quantidade}</span>
            </div>
            <div class="item-price">
                R$ ${(produto.preco * quantidade).toFixed(2)}
                <button class="remove-button" onclick="removerDoCarrinho(${produtoId})">✕</button>
            </div>
        `;
        carrinhoElement.appendChild(itemElement);
    });

    // Atualiza o contador de itens e o total
    cartCount.textContent = count;
    totalElement.innerHTML = `<div class="total">Total: R$ ${total.toFixed(2)}</div>`;
}

// Função para adicionar produto ao carrinho
function adicionarAoCarrinho(produtoId) {
    // Obtém a quantidade atual do produto no carrinho
    const quantidade = carrinho.get(produtoId) || 0;
    // Incrementa a quantidade
    carrinho.set(produtoId, quantidade + 1);
    // Atualiza a exibição do carrinho
    atualizarCarrinho();

    // Feedback visual do botão
    const botao = event.target;
    const originalText = botao.textContent;
    botao.textContent = 'Adicionado ✓';
    botao.style.background = '#00ff00';
    // Restaura o estado original do botão após 1 segundo
    setTimeout(() => {
        botao.textContent = originalText;
        botao.style.background = '';
    }, 1000);
}

// Função para remover produto do carrinho
function removerDoCarrinho(produtoId) {
    // Remove o produto do carrinho
    carrinho.delete(produtoId);
    // Atualiza a exibição do carrinho
    atualizarCarrinho();
}

// Função para calcular o frete
async function calcularFrete() {
    // Obtém o valor do CEP digitado
    const cepInput = document.getElementById('campoCep').value;
    // Remove todos os caracteres não numéricos do CEP
    const cep = cepInput.replace(/[^0-9]/g, '');
    const resultadoElement = document.getElementById('resultado-frete');

    // Validação do CEP
    if (cep.length !== 8) {
        resultadoElement.innerHTML = '<p class="error">CEP inválido!</p>';
        return;
    }

    // Mostra mensagem de carregamento
    resultadoElement.innerHTML = '<p class="loading">Calculando...</p>';

    try {
        // Consulta o CEP na API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        // Verifica se o CEP existe
        if (data.erro) throw new Error('CEP não encontrado!');

        // Calcula um valor aleatório para o frete
        const frete = Math.random() * 100 + 50;
        // Seleciona uma mensagem aleatória
        const mensagemAleatoria = mensagensFrete[Math.floor(Math.random() * mensagensFrete.length)];

        // Exibe o resultado
        resultadoElement.innerHTML = `
            <div class="frete-info">
                <p>${data.logradouro}, ${data.bairro}</p>
                <p>${data.localidade}/${data.uf}</p>
                <p class="frete-valor">Frete: R$ ${frete.toFixed(2)}</p>
                <p class="mensagem-frete">${mensagemAleatoria}</p>
            </div>
        `;
    } catch (error) {
        // Exibe mensagem de erro
        resultadoElement.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

// Função para mostrar/ocultar o carrinho
function mostrarCarrinho() {
    const carrinhoContainer = document.getElementById('carrinho');
    carrinhoContainer.style.display = carrinhoContainer.style.display === 'none' ? 'block' : 'none';
}

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    inicializarCarrossel();
    createMatrixRain();
    atualizarCarrinho();
});

// Tratamento do redimensionamento da janela
window.addEventListener('resize', () => {
    // Reseta a posição do carrossel
    offset = 0;
    document.getElementById("carrossel").style.transform = `translateX(0)`;
});