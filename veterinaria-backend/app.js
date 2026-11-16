const express = require('express');
const cors = require('cors');
require('dotenv').config();

const serviciosRoutes = require('./src/routes/servicios.routes');
const especialidadesRoutes = require('./src/routes/especialidades.routes');
const nosotrosRoutes = require('./src/routes/nosotros.routes');
const contactosRoutes = require('./src/routes/contactos.routes');
const chatbotRoutes = require('./src/routes/chatbot');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/servicios', serviciosRoutes);
app.use('/api/especialidades', especialidadesRoutes);
app.use('/api/nosotros', nosotrosRoutes);
app.use('/api/contactos', contactosRoutes);
app.use('/api/chatbot', chatbotRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Servidor funcionando correctamente' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;
