const express = require('express');
const joyasRoutes = require('./routes/joyas');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/joyas', joyasRoutes);

app.listen(port, () => {
   console.log(`Servidor funcionando en el puerto ${port}`);
});
