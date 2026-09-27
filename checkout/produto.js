const SUPABASE_URL = 'https://oszspwukqeksytxfcvkh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zenNwd3VrcWVrc3l0eGZjdmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjk2MTYsImV4cCI6MjEwNTg0NTYxNn0.HzuuFQ2B3Rl3L07yn5C5qva4C9aWrPtf9WY1kUfx4hI';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let imgFrenteUrl = '';
let imgCostasUrl = '';
let mostrandoFrente = true;
let tamanhoSelecionado = null;

async function carregarDetalhesProduto() {
  const params = new URLSearchParams(window.location.search);
  const produtoId = params.get('id');

  if (!produtoId) {
    alert('Produto não encontrado.');
    window.location.href = 'index.html';
    return;
  }


  const { data: produto, error } = await supabaseClient
    .from('produtos')
    .select('*')
    .eq('id', produtoId)
    .single();

  if (error || !produto) {
    console.error('Erro ao buscar o produto:', error);
    const productNameEl = document.getElementById('product-name');
    if (productNameEl) productNameEl.innerText = 'Produto não encontrado';
    return;
  }


  const nameEl = document.getElementById('product-name');
  const priceEl = document.getElementById('product-price');
  const installmentsEl = document.getElementById('product-installments');

  if (nameEl) nameEl.innerText = produto.nome;
  
  const preco = Number(produto.preco || 0);
  const precoFormatado = preco.toFixed(2).replace('.', ',');
  if (priceEl) priceEl.innerText = `R$ ${precoFormatado}`;
  
  const valorParcela = (preco / 3).toFixed(2).replace('.', ',');
  if (installmentsEl) installmentsEl.innerText = `ou 3x de R$ ${valorParcela}`;

  // Configuração das URLs de Imagens
  imgFrenteUrl = produto.imagem_frente || 'https://via.placeholder.com/384x447';
  imgCostasUrl = produto.imagem_costas || imgFrenteUrl;

  const imgElement = document.getElementById('product-img');
  if (imgElement) imgElement.src = imgFrenteUrl;
}

function inicializarAlternadorImagem() {
  const btnToggle = document.getElementById('btn-toggle-img');
  const imgElement = document.getElementById('product-img');
  const viewBadge = document.getElementById('view-badge');

  if (btnToggle && imgElement) {
    btnToggle.addEventListener('click', () => {
      mostrandoFrente = !mostrandoFrente;
      
      // Efeito visual de transição
      imgElement.style.opacity = '0.3';
      setTimeout(() => {
        imgElement.src = mostrandoFrente ? imgFrenteUrl : imgCostasUrl;
        imgElement.style.opacity = '1';
      }, 150);

      // Atualiza a badge de vista
      if (viewBadge) {
        viewBadge.innerText = mostrandoFrente ? 'Frente' : 'Costas';
      }
    });
  }
}


function inicializarSelecaoTamanhos() {
  const sizeButtons = document.querySelectorAll('.btn-size');
  const sizeText = document.getElementById('selected-size-text');
  const sizeWarning = document.getElementById('size-warning');

  sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Oculta aviso de erro se estiver visível
      if (sizeWarning) sizeWarning.style.display = 'none';

      // Remove destaque dos outros botões e aplica ao selecionado
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      tamanhoSelecionado = button.getAttribute('data-size');

      if (sizeText) {
        sizeText.innerText = `(${tamanhoSelecionado})`;
      }
    });
  });
}


function inicializarBotoesAcao() {
  const btnComprar = document.querySelector('.btn-comprar');
  const btnCarrinho = document.querySelector('.btn-carrinho');
  const sizeWarning = document.getElementById('size-warning');

  function validarTamanho() {
    if (!tamanhoSelecionado) {
      if (sizeWarning) {
        sizeWarning.style.display = 'block';
      } else {
        alert('Por favor, selecione um tamanho (P, M, G, GG) antes de prosseguir.');
      }
      return false;
    }
    return true;
  }


  if (btnComprar) {
    btnComprar.addEventListener('click', () => {
      if (!validarTamanho()) return;

      const nameEl = document.getElementById('product-name');
      const priceEl = document.getElementById('product-price');

      const itemParaComprar = {
        nome: nameEl ? nameEl.innerText : 'Camisa Moment',
        preco: priceEl ? priceEl.innerText : 'R$ 0,00',
        tamanho: tamanhoSelecionado,
        imagem: imgFrenteUrl
      };

      
      localStorage.setItem('moment_item', JSON.stringify(itemParaComprar));

    
      window.location.href = 'checkout.html';
    });
  }

  
  if (btnCarrinho) {
    btnCarrinho.addEventListener('click', () => {
      if (!validarTamanho()) return;

      alert(`A camisa no tamanho (${tamanhoSelecionado}) foi adicionada ao seu carrinho!`);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarDetalhesProduto();
  inicializarAlternadorImagem();
  inicializarSelecaoTamanhos();
  inicializarBotoesAcao();
});