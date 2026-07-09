const axios = require("axios"); 
const mpCtrl = {} 
 
mpCtrl.getPaymentlink = async (req, res) => { 
    try { 
        const { title, description, payer_email } = req.body;

        // Extraemos el precio y lo validamos
        const incomingPrice = Number(req.body.unit_price ?? req.body.price ?? req.body.amount);
        const unitPrice = Number.isFinite(incomingPrice) && incomingPrice > 0 ? incomingPrice : 1;

        const url = "https://api.mercadopago.com/checkout/preferences"; 
        const body = { 
          items: [ 
            { 
              title: title || "Cuota gimnasio", 
              description: description || "Pago de cuota mensual", 
              picture_url: "https://i.imgur.com/lMJnR3I.png", 
              category_id: "services", 
              quantity: 1, 
              unit_price: unitPrice
            } 
          ],
          back_urls: { 
            failure: "http://localhost:4200/tarifas", 
            pending: "http://localhost:4200/tarifas", 
            success: "http://localhost:4200/tarifas" 
          }
        }; 
 
        const payment = await axios.post(url, body, { 
          headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}` 
          } 
        }); 
 
        return res.status(200).json(payment.data); 
 
    } catch (error) { 
      const mpError = error.response?.data || error.message;
      console.log("Error MP:", mpError); 
 
      return res.status(500).json({ 
         error: true, 
         msg: "Failed to create payment in MercadoPago",
         detalle: mpError
      }); 
    } 
} 
 
mpCtrl.getSubscriptionLink = async (req, res) => { 
    //recibir en body info de payer_email, razon, cantidad 
    try { 
      const url = "https://api.mercadopago.com/preapproval"; 
 
      const body = { 
        reason: "Suscripción de ejemplo", 
        auto_recurring: { 
          frequency: 1, 
          frequency_type: "months", 
          transaction_amount: 10000, 
          currency_id: "ARS" 
        }, 
        back_url: "http://localhost:4200/returnpath", 
        payer_email: "payer_email@gmail.com@google.com" 
      }; 
 
      const subscription = await axios.post(url, body, { 
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}` 
        } 
      });          
return res.status(200).json(subscription.data); 
} catch (error) {  
console.log(error); 
return res.status(500).json({ 
error: true, msg: "Failed to create subscription"  
});         
} 
} 
module.exports = mpCtrl;       