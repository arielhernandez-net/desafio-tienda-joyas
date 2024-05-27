const express = require('express');
const joyasRoutes = require('./routes/joyas');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/joyas', joyasRoutes);

app.listen(PORT, () => {
   console.log(`Servidor funcionando en el puerto ${PORT}`);
});
