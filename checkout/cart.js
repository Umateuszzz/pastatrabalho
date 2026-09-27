const MomentCart = {
  chaveStorage: 'moment_carrinho',

  obter: function() {
    return JSON.parse(localStorage.getItem(this.chaveStorage)) || [];
  },

  salvar: function(itens) {
    localStorage.setItem(this.chaveStorage, JSON.stringify(itens));
  },

  adicionar: function(produto) {
    const itens = this.obter();
    // Verifica se o produto com o mesmo tamanho já está no carrinho
    const indexExistente = itens.findIndex(i => i.id === produto.id && i.tamanho === produto.tamanho);

    if (indexExistente > -1) {
      itens[indexExistente].quantidade += produto.quantidade;
    } else {
      itens.push(produto);
    }
    this.salvar(itens);
  },

  remover: function(indice) {
    const itens = this.obter();
    itens.splice(indice, 1);
    this.salvar(itens);
  },

  alterarQuantidade: function(indice, novaQuantidade) {
    if (novaQuantidade < 1) return; // Impede quantidade menor que 1
    const itens = this.obter();
    itens[indice].quantidade = novaQuantidade;
    this.salvar(itens);
  },

  totalPreco: function() {
    return this.obter().reduce((total, item) => total + (item.preco * item.quantidade), 0);
  },

  formatarPreco: function(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
};