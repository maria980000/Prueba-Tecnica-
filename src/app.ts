import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import paymentRoutes from './routes/paymentRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Conexión a MongoDB (debes configurar tu URL de conexión)
mongoose.connect('mongodb://localhost:27017/miBaseDeDatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
