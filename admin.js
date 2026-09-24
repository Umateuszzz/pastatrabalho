// Configurações do Supabase
const SUPABASE_URL = 'https://oszspwukqeksytxfcvkh.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zenNwd3VrcWVrc3l0eGZjdmtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyNjk2MTYsImV4cCI6MjEwNTg0NTYxNn0.HzuuFQ2B3Rl3L07yn5C5qva4C9aWrPtf9WY1kUfx4hI';
const BUCKET_NAME = 'camisas'; // Nome do bucket no Supabase Storage

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('product-form');
const btnSubmit = document.getElementById('btn-submit');
const statusMessage = document.getElementById('status-message');

// Função auxiliar para upload de imagem no Storage
async function uploadImagem(file, sufixo) {
  const fileName = `${Date.now()}_${sufixo}_${file.name}`;
  
  const { data, error } = await supabaseClient.storage
    .from(BUCKET_NAME)
    .upload(fileName, file);

  if (error) {
    throw new Error(`Erro no upload (${sufixo}): ${error.message}`);
  }

  const { data: urlData } = supabaseClient.storage
    .from(BUCKET_NAME)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  btnSubmit.disabled = true;
  btnSubmit.innerText = 'CADASTRANDO...';
  statusMessage.innerText = '';
  statusMessage.className = 'status-message';

  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const fileFrente = document.getElementById('imagem_frente').files[0];
  const fileCostas = document.getElementById('imagem_costas').files[0];

  try {
    // 1. Upload da imagem da frente e das costas simultaneamente
    const [urlFrente, urlCostas] = await Promise.all([
      uploadImagem(fileFrente, 'frente'),
      uploadImagem(fileCostas, 'costas')
    ]);

    // 2. Insere na tabela 'produtos' com as duas URLs
    const { error: insertError } = await supabaseClient
      .from('produtos')
      .insert([
        {
          nome: nome,
          preco: preco,
          imagem_frente: urlFrente,
          imagem_costas: urlCostas
        }
      ]);

    if (insertError) {
      throw new Error(`Erro ao salvar no banco: ${insertError.message}`);
    }

    statusMessage.innerText = 'Produto cadastrado com sucesso!';
    statusMessage.classList.add('success');
    form.reset();

  } catch (err) {
    console.error(err);
    statusMessage.innerText = err.message || 'Ocorreu um erro ao cadastrar.';
    statusMessage.classList.add('error');
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerText = 'CADASTRAR PRODUTO';
  }
});