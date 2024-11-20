# 🛒 Loja de Utilidades DEV

![Cyberpunk Design](https://img.shields.io/badge/design-cyberpunk-purple) ![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)  
Uma loja online fictícia com tema cyberpunk, onde você encontra utilidades e gadgets incríveis com uma experiência visual imersiva e interativa.  

---

## 🌐 Acesse o Projeto

📌 **Deploy Online:**  
Clique no link abaixo para acessar a loja:  
[🔗 Acessar no Vercel](https://loja-dev-xi.vercel.app/) *(substitua pelo link do seu projeto deployado)*  

---

## 📖 Sobre o Projeto

A **Loja de Utilidades DEV** é um projeto que une criatividade no design e práticas modernas de desenvolvimento web. Inspirado no estilo cyberpunk, ele utiliza uma combinação de **HTML5**, **CSS3** e **JavaScript** para criar uma experiência de compra única e divertida.  

O projeto inclui:  
- Um **carrossel de produtos** interativo.  
- **Carrinho de compras** com cálculo de frete.  
- Elementos visuais marcantes, como **efeito glitch** e **neon**, em um layout responsivo.  

---

## 🚀 Funcionalidades

### 🌟 **Principais Recursos**
- **Produtos Dinâmicos**: Produtos carregados dinamicamente a partir de um array no JavaScript.  
- **Carrinho Interativo**: Possibilidade de adicionar itens, calcular frete e visualizar o resumo da compra.  
- **Cálculo de Frete Divertido**: Mensagens humorísticas baseadas no CEP inserido.  
- **Carrossel de Produtos**: Navegação horizontal para explorar os itens disponíveis.  
- **Efeito Matrix**: Fundo animado simulando caracteres caindo, inspirado no filme *Matrix*.  

---

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica da página.  
- **CSS3**: Responsividade e design cyberpunk.  
- **JavaScript**: Funcionalidades dinâmicas e interatividade.  

---

## 📂 Estrutura de Arquivos

```plaintext
loja-dev/
├── index.html          # Estrutura principal do site
├── style.css           # Estilização do projeto
├── script.js           # Lógica e interatividade
├── img/                # Diretório de imagens
│   ├── produto1.jpg    # Imagens dos produtos
│   ├── background.png  # Fundo do site
└── README.md           # Documentação do projeto

## 📜 Explicação do Código

### 🖼️ Estrutura HTML

#### **Cabeçalho (`<header>`)**
- Contém o logo da loja, o título com efeito glitch e o botão para abrir o carrinho.

#### **Carrossel de Produtos (`<main>`)**
- Apresenta os produtos da loja com botões para adicionar ao carrinho.

#### **Carrinho de Compras (`<div id="carrinho">`)**
- Mostra os itens adicionados, o valor total e um campo para cálculo do frete.

#### **Rodapé (`<footer>`)**
- Links para redes sociais e decorativos animados em formato GIF.

---

### 🎨 Estilo CSS

#### **Cyberpunk Neon**
- Efeito de brilho aplicado em botões, bordas e texto para reforçar a estética futurista.

#### **Glitch Effect**
- Efeito animado no título principal, simulando falhas visuais.

#### **Background Animado**
- Uma estética inspirada no estilo "chuva de caracteres", como no filme *Matrix*.

---

### ✨ Funcionalidades JavaScript

#### **Produtos**
- Lista de produtos criada dinamicamente:
```javascript
const produtos = [
    { id: 1, nome: "Teclado Ctrl+C Ctrl+V", preco: 149.90, imagem: "img/teclado.jpg" },
    { id: 2, nome: "Papel Higiênico Debug", preco: 29.90, imagem: "img/papel.jpg" },
    // Mais produtos podem ser adicionados aqui...
];
