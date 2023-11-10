const express = require("express");
const { default: MercadoPagoConfig } = require("mercadopago");
const cors = express()

const server = express
server.use(express.json());
server.use(cors());
server.use("/Mercado_Pago", Mercado_Pago);


module.exports = server;



