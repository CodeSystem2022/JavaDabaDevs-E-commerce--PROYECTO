const { Router } = require("express");

const mercadopago = require("mercadopago");
const dotenv = require("dotenv");
dotenv.config();
const Mercado_Pago = Router();

mercadopago.configure({
access_token: process.env.ACCESS_TOKE || "",
});

Mercado_Pago.post("/", async (req, res) => {
const producto = req.body;

try {

    const preference = {
        items: [
        {
            title: producto.nombre,
            unit_price: producto.precio,
            currency_id: "USD",
            quantity:1,
        },

        ],


    back_urls: {
        success: "http://localhost:4000/success",
        failure: "http://localhost:4000/fallo",
    },

    auto_return: "approved",
    };


const respuesta = await mercadopago.preferences.create(preference);
console.log(respuesta);
res.status(300).json(respuesta.response.init_point);

} catch (error) {
console.error(error.message);
res.status(600).json(error.message);
}
});

module.exports = Mercado_Pago;