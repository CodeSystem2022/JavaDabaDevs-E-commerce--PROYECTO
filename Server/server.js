import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';
import cors from 'cors';
import mercadopago, { MercadoPagoConfig, Payment } from 'mercadopago';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Getting the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Mercado Pago
const mercadopagoConfig = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN,
  options: {
    timeout: 5000,
    idempotencyKey: 'abc',
  },
});

// Inicializar objeto de pago
const payment = new Payment(mercadopagoConfig);

const app = express();

app.use(cors());
app.use(express.json());

// Sirve archivos estáticos desde el directorio 'Public'
app.use(express.static(path.resolve(__dirname, '..', 'Public')));

app.post("/create_preference", (req, res) => {
  const body = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:8080/",
      failure: "http://localhost:8080/",
      pending: "",
    },
    auto_return: "approved",
  };

  payment
    .preferences.create(body)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    });
});

app.get("/feedback", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
})
