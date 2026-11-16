const responderChatbot = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'El campo "prompt" es requerido' });
    }

    const ollamaResponse = await fetch('http://127.0.0.1:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gemma3:1b',
        prompt:
          'Eres el asistente de una clínica veterinaria. Responde en español, sé amable, y solo responde dudas sobre cuidado de mascotas y servicios veterinarios. No hables de otros temas.\n\nPregunta del usuario: ' +
          prompt,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      return res.status(502).json({ message: 'Error al comunicarse con Ollama' });
    }

    const data = await ollamaResponse.json();

    res.json({ response: data.response });
  } catch (error) {
    console.error('Error en chatbot:', error);
    res.status(500).json({ message: 'Error interno del servidor', error: error.message });
  }
};

module.exports = {
  responderChatbot,
};
