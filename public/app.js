// Elementos da interface
const tableBody = document.querySelector('#produtosTable tbody');
const createForm = document.getElementById('createForm');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearSearchBtn = document.getElementById('clearSearch');


// Utilitários
const utils = {
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
  },


  formatPrice(price) {
    return `R$ ${Number(price).toFixed(2)}`;
  },


  showAlert(message, isError = false) {
    const alert = document.createElement('div');
    alert.className = `alert ${isError ? 'error' : 'success'}`;
    alert.textContent = message;
    alert.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 6px;
      color: white;
      z-index: 1000;
      background: ${isError ? '#e74c3c' : '#27ae60'};
      box-shadow: 0 3px 10px rgba(0,0,0,0.2);
    `;
   
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 4000);
  }
};


// API functions
const api = {
  async getProducts(query = '') {
    const url = query ? `/products/search?q=${encodeURIComponent(query)}` : '/products';
    const response = await fetch(url);
    return await response.json();
  },


  async createProduct(productData) {
    const response = await fetch('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    return response;
  },


  async deleteProduct(id) {
    const response = await fetch(`/products/${id}`, {
      method: 'DELETE'
    });
    return response;
  }
};


// Interface functions
const ui = {
  renderProducts(products) {
    tableBody.innerHTML = '';


    if (!products.length) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 20px;">Nenhum produto encontrado.</td></tr>';
      return;
    }


    products.forEach(product => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product.id}</td>
        <td>${utils.escapeHtml(product.nome)}</td>
        <td>${utils.escapeHtml(product.descricao || '-')}</td>
        <td>${utils.formatPrice(product.preco)}</td>
        <td>${product.quantidade}</td>
        <td>
          <button class="btn-delete" data-id="${product.id}">Excluir</button>
        </td>
      `;
      tableBody.appendChild(row);
    });


    this.attachDeleteHandlers();
  },


  attachDeleteHandlers() {
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const id = e.target.dataset.id;
        if (confirm('Tem certeza que deseja excluir este produto?')) {
          await handlers.deleteProduct(id);
        }
      });
    });
  },


  clearForm() {
    createForm.reset();
  },


  clearSearch() {
    searchInput.value = '';
  }
};


// Event handlers
const handlers = {
  async loadProducts(query = '') {
    try {
      const products = await api.getProducts(query);
      ui.renderProducts(products);
    } catch (error) {
      utils.showAlert('Erro ao carregar produtos', true);
    }
  },


  async createProduct(event) {
    event.preventDefault();
   
    const formData = new FormData(createForm);
    const productData = {
      nome: formData.get('nome').trim(),
      descricao: formData.get('descricao').trim(),
      preco: formData.get('preco'),
      quantidade: formData.get('quantidade')
    };


    try {
      const response = await api.createProduct(productData);
     
      if (response.status === 201) {
        utils.showAlert('Produto criado com sucesso!');
        ui.clearForm();
        this.loadProducts();
      } else {
        const data = await response.json();
        const errorMsg = data.errors ? data.errors.join('; ') : data.error;
        utils.showAlert(`Erro: ${errorMsg}`, true);
      }
    } catch (error) {
      utils.showAlert('Erro ao criar produto', true);
    }
  },


  async deleteProduct(id) {
    try {
      const response = await api.deleteProduct(id);
     
      if (response.ok) {
        utils.showAlert('Produto excluído com sucesso!');
        this.loadProducts(searchInput.value.trim());
      } else {
        const data = await response.json();
        utils.showAlert(`Erro: ${data.error}`, true);
      }
    } catch (error) {
      utils.showAlert('Erro ao excluir produto', true);
    }
  },


  searchProducts() {
    this.loadProducts(searchInput.value.trim());
  },


  clearSearch() {
    ui.clearSearch();
    this.loadProducts();
  }
};


// Event listeners
function initEventListeners() {
  createForm.addEventListener('submit', (e) => handlers.createProduct(e));
  searchBtn.addEventListener('click', () => handlers.searchProducts());
  clearSearchBtn.addEventListener('click', () => handlers.clearSearch());
 
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handlers.searchProducts();
  });
}


// Inicialização
function init() {
  initEventListeners();
  handlers.loadProducts();
}


// Iniciar aplicação
document.addEventListener('DOMContentLoaded', init);
