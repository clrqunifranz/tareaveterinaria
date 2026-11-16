const API_BASE = 'http://localhost:3000/api';

async function fetchData(endpoint) {
  const response = await fetch(`${API_BASE}/${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error al cargar ${endpoint}`);
  }
  return response.json();
}

function getItemTitle(item) {
  return (
    item.nombre ||
    item.titulo ||
    item.servicio ||
    item.especialidad ||
    'Registro'
  );
}

function getItemDescription(item) {
  return (
    item.descripcion ||
    item.detalle ||
    item.contenido ||
    item.mensaje ||
    item.info ||
    JSON.stringify(item)
  );
}

function renderItems(containerId, items, emptyText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = `<div class="card empty">${emptyText}</div>`;
    return;
  }

  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('h3');
    title.textContent = getItemTitle(item);

    const desc = document.createElement('p');
    const text = getItemDescription(item);
    desc.textContent = typeof text === 'string' ? text : JSON.stringify(text);

    card.appendChild(title);
    card.appendChild(desc);
    container.appendChild(card);
  });
}

async function cargarServicios() {
  try {
    const data = await fetchData('servicios');
    if (Array.isArray(data) && data.length > 0) {
      renderItems('servicios-list', data, 'No hay servicios disponibles por el momento.');
    }
  } catch (error) {
    console.error(error);
  }
}

async function cargarEspecialidades() {
  try {
    const data = await fetchData('especialidades');
    if (Array.isArray(data) && data.length > 0) {
      renderItems('especialidades-list', data, 'No hay especialidades disponibles por el momento.');
    }
  } catch (error) {
    console.error(error);
  }
}

async function cargarNosotros() {
  try {
    const data = await fetchData('nosotros');
    if (Array.isArray(data) && data.length > 0) {
      renderItems('nosotros-list', data, 'No hay información disponible por el momento.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Chat
function setupChat() {
  const toggleBtn = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  function addMessage(text, type) {
    const msg = document.createElement('div');
    msg.className = `message ${type}`;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function openChat() {
    chatWindow.classList.remove('hidden');
    chatWindow.setAttribute('aria-hidden', 'false');
    chatInput.focus();
  }

  function closeChat() {
    chatWindow.classList.add('hidden');
    chatWindow.setAttribute('aria-hidden', 'true');
  }

  toggleBtn.addEventListener('click', () => {
    if (chatWindow.classList.contains('hidden')) {
      openChat();
    } else {
      closeChat();
    }
  });

  closeBtn.addEventListener('click', closeChat);

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    addMessage(prompt, 'user');
    chatInput.value = '';

    try {
      const response = await fetch(`${API_BASE}/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const msg = data.message || `Error del servidor (${response.status})`;
        throw new Error(msg);
      }

      addMessage(data.response || 'Sin respuesta del asistente.', 'bot');
    } catch (error) {
      console.error(error);
      addMessage(`No se pudo conectar con el asistente: ${error.message}`, 'bot');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  cargarServicios();
  cargarEspecialidades();
  cargarNosotros();
  setupChat();
});
