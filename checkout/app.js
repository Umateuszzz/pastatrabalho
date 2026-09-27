// Configuração do Supabase (Removido o '/rest' do final da URL)
const SUPABASE_URL = 'https://oszspwukqeksytxfcvkh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zenNwd3VrcWVrc3l0eGZjdmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjk2MTYsImV4cCI6MjEwNTg0NTYxNn0.HzuuFQ2B3Rl3L07yn5C5qva4C9aWrPtf9WY1kUfx4hI';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarProdutos() {
  const container = document.getElementById('cards-container');

  // Busca os produtos da tabela 'produtos'
  const { data: produtos, error } = await supabaseClient
    .from('produtos')
    .select('*');

  if (error) {
    console.error('Erro ao buscar produtos:', error);
    container.innerHTML = '<p class="loading-text">Erro ao carregar produtos.</p>';
    return;
  }

  if (!produtos || produtos.length === 0) {
    container.innerHTML = '<p class="loading-text">Nenhum produto encontrado.</p>';
    return;
  }

  // Limpa a mensagem de carregando
  container.innerHTML = '';

  // Renderiza cada card com suporte a imagem de frente e costas
// Trecho dentro do produtos.forEach no app.js:
produtos.forEach((produto) => {
  const imgFrente = produto.imagem_frente || 'https://via.placeholder.com/300';
  const imgCostas = produto.imagem_costas || imgFrente;

  const cardHTML = `
    <a href="produto.html?id=${produto.id}" class="product-card-link" style="text-decoration: none; color: inherit;">
      <div class="product-card">
        <div class="card-image">
          <img class="img-front" src="${imgFrente}" alt="${produto.nome || 'Produto'}" />
          <img class="img-back" src="${imgCostas}" alt="${produto.nome || 'Produto'} Costas" />
        </div>
        <div class="card-content">
          <h3 class="product-title">${produto.nome || 'Sem título'}</h3>
          <div class="card-footer">
            <span class="price">R$ ${Number(produto.preco || 0).toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>
    </a>
  `;

  container.innerHTML += cardHTML;
});
}

document.addEventListener('DOMContentLoaded', carregarProdutos);

// Ação do botão de seta para rolar os cards para a direita
document.querySelector('.btn-arrow')?.addEventListener('click', () => {
  const container = document.getElementById('cards-container');
  if (container) {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  }
});