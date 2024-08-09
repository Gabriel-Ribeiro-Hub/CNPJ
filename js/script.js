// Função para consultar o CNPJ quando o botão é clicado
document.getElementById('consultaBtn').addEventListener('click', async () => {
  const cnpj = document.getElementById('cnpjInput').value;

  if (cnpj === '') {
    alert('Por favor, insira um CNPJ válido.');
    return;
  }

  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
    if (!response.ok) {
      throw new Error('Erro na consulta do CNPJ');
    }

    const data = await response.json();
    mostrarInformacoesEmpresa(data);
    abrirModal();
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao consultar o CNPJ. Por favor, tente novamente.');
  }
});

// Função para mostrar as informações da empresa
function mostrarInformacoesEmpresa(data) {
  document.getElementById('nome').innerText = data.nome_fantasia || 'Não informado';
  document.getElementById('razaoSocial').innerText = data.razao_social || 'Não informado';
  document.getElementById('dataAbertura').innerText = data.data_inicio_atividade || 'Não informado';
  document.getElementById('situacao').innerText = data.situacao || 'Não informado';
  document.getElementById('atividadePrincipal').innerText = data.cnae_fiscal_descricao || 'Não informado';
  document.getElementById('enderecoCompleto').innerText = `${data.logradouro || ''}, ${data.numero || ''} - ${data.bairro || ''}, ${data.municipio || ''} - ${data.uf || ''}, ${data.cep || ''}`;
  document.getElementById('telefone').innerText = data.telefone || 'Não informado';
  document.getElementById('email').innerText = data.email || 'Não informado';

  const sociosContainer = document.getElementById('sociosContainer');
  sociosContainer.innerHTML = '';  // Limpa o container antes de adicionar os sócios

  if (data.qsa && data.qsa.length > 0) {
    data.qsa.forEach(socio => {
      const socioCard = document.createElement('div');
      socioCard.className = 'socio-card';
      socioCard.innerHTML = `<p><strong>Nome:</strong> ${socio.nome}</p><p><strong>Qualificação:</strong> ${socio.qual}</p>`;
      sociosContainer.appendChild(socioCard);
    });
  } else {
    sociosContainer.innerHTML = '<p>Nenhum sócio encontrado.</p>';
  }
}

// Funções para abrir e fechar o modal
function abrirModal() {
  document.getElementById('modal').style.display = 'block';
}

function fecharModal() {
  document.getElementById('modal').style.display = 'none';
}

// Fechar o modal ao clicar no "X" ou fora do modal
document.querySelector('.close').addEventListener('click', fecharModal);
window.addEventListener('click', (event) => {
  if (event.target === document.getElementById('modal')) {
    fecharModal();
  }
});

// Funções para editar e salvar as informações
document.getElementById('editBtn').addEventListener('click', () => {
  alternarEdicao(true);
});

document.getElementById('saveBtn').addEventListener('click', () => {
  alternarEdicao(false);
});

function alternarEdicao(editavel) {
  const informacoesEmpresa = document.querySelector('.modal-content');
  const spans = informacoesEmpresa.querySelectorAll('span:not(.close)');

  spans.forEach(span => {
    if (editavel) {
      const input = document.createElement('input');
      input.value = span.innerText;
      input.setAttribute('data-original-span', span.id);
      span.replaceWith(input);
    } else {
      const input = informacoesEmpresa.querySelector(`input[data-original-span="${span.id}"]`);
      if (input) {
        span.innerText = input.value;
        input.replaceWith(span);
      }
    }
  });

  document.getElementById('editBtn').style.display = editavel ? 'none' : 'inline-block';
  document.getElementById('saveBtn').style.display = editavel ? 'inline-block' : 'none';
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