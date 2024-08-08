document.getElementById('consultaBtn').addEventListener('click', async () => {
  const cnpj = document.getElementById('cnpjInput').value;
  if (!cnpj) {
    alert('Por favor, insira um CNPJ válido.');
    return;
  }

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    if (!response.ok) throw new Error('Erro na consulta do CNPJ');

    const data = await response.json();
    displayCompanyInfo(data);
    openModal();
  } catch (error) {
    console.error(error);
    alert('Erro ao consultar o CNPJ. Por favor, tente novamente.');
  }
});

function displayCompanyInfo(data) {
  document.getElementById('nome').innerText = data.nome_fantasia;
  document.getElementById('razaoSocial').innerText = data.razao_social;
  document.getElementById('dataAbertura').innerText = data.data_inicio_atividade;
  document.getElementById('situacao').innerText = data.situacao;
  document.getElementById('atividadePrincipal').innerText = data.cnae_fiscal_descricao;
  document.getElementById('enderecoCompleto').innerText = `${data.logradouro}, ${data.numero} - ${data.bairro}, ${data.municipio} - ${data.uf}, ${data.cep}`;
  document.getElementById('telefone').innerText = data.telefone;
  document.getElementById('email').innerText = data.email;

  const sociosContainer = document.getElementById('sociosContainer');
  sociosContainer.innerHTML = '';
  data.qsa.forEach(socio => {
    const socioCard = document.createElement('div');
    socioCard.className = 'socio-card';
    socioCard.innerHTML = `
      <p><strong>Nome:</strong> ${socio.nome}</p>
      <p><strong>Qualificação:</strong> ${socio.qual}</p>
    `;
    sociosContainer.appendChild(socioCard);
  });
}

function openModal() {
  document.getElementById('modal').style.display = 'block';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

document.querySelector('.close').addEventListener('click', closeModal);
window.addEventListener('click', (event) => {
  if (event.target == document.getElementById('modal')) {
    closeModal();
  }
});

document.getElementById('editBtn').addEventListener('click', () => {
  toggleEdit(true);
});

document.getElementById('saveBtn').addEventListener('click', () => {
  toggleEdit(false);
});

function toggleEdit(editable) {
  const empresaInfo = document.querySelector('.modal-content');
  const elements = empresaInfo.querySelectorAll('span');
  
  elements.forEach(span => {
    if (editable) {
      const input = document.createElement('input');
      input.value = span.innerText;
      input.setAttribute('data-original-span', span.id);
      span.replaceWith(input);
    } else {
      const span = document.createElement('span');
      span.innerText = input.value;
      span.id = input.getAttribute('data-original-span');
      input.replaceWith(span);
    }
  });

  document.getElementById('editBtn').classList.toggle('hidden', editable);
  document.getElementById('saveBtn').classList.toggle('hidden', !editable);
}



document.addEventListener('DOMContentLoaded', (event) => {
  // Insere o CSS da tela de carregamento dinamicamente
  const style = document.createElement('style');
  style.innerHTML = `
  #loadingScreen {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: white;    background-image: linear-gradient(142deg, crimson 25%, #5b0817 85%);display: flex;
      justify-content: center;
      align-items: center;
      z-index: 99999999;
      transition: opacity 0.5s linear; /* Adiciona transição para opacidade */
      opacity: 1; /* Começa totalmente visível */
  }

  .loading-text {
      font-size: 24px;
      font-weight: bold;
      font-family: "Kanit", sans-serif;
  }
  .loading-text {
      font-size: 24px;
      font-weight: bold;
      position: absolute; /* Posiciona o texto sobre o spinner */
  }

  /* Estilo do spinner */
  .spinner {
      border: 4px solid #acacac;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border-left-color: crimson;
      animation: spin 1s linear infinite;
      margin-bottom: 5vw;
  } 

  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
`;
  document.head.appendChild(style);

  // Adiciona o spinner à tela de carregamento
  const loadingScreen = document.getElementById('loadingScreen');
  loadingScreen.style.display = 'flex';
  loadingScreen.innerHTML = '<div class="spinner"></div><div class="loading-text"></div>';

  // Esconde a tela de carregamento suavemente
  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => { // Aguarda a transição de opacidade terminar para esconder e mostrar o conteúdo
      loadingScreen.style.display = 'none';
      document.getElementById('content').style.display = 'block';
    }, 500); // Deve corresponder à duração da transição
  }, 3000); // Ajuste o tempo conforme necessário
});