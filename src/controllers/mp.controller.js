const axios = require("axios"); 
const mpCtrl = {} 

mpCtrl.getPaymentlink = async (req, res) => { 
    try { 
        const { title, description, unit_price, payer_email, back_urls, external_reference } = req.body;
        const incomingPrice = Number(req.body.unit_price ?? req.body.price ?? req.body.amount);
        const unitPrice = Number.isFinite(incomingPrice) ? incomingPrice : 500;
        const url = "https://api.mercadopago.com/checkout/preferences"; 
        const body = { 
          payer_email: payer_email || "payer_email@gmail.com", 
          external_reference: external_reference,
          items: [{ 
            title: title || "Cuota gimnasio", 
            description: description || "error de periodo", 
            category_id: "cuota", 
            quantity: 1, 
            unit_price: unitPrice || 1
          }],
          auto_return: "approved", 
          back_urls: back_urls || { 
            failure: "https://localhost:4200/pago-exitoso",
            pending: "https://localhost:4200/pago-exitoso", 
            success: "https://localhost:4200/pago-exitoso" 
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
      console.log(error); 
      return res.status(500).json({ 
         error: true, msg: "Failed to create payment"  
      }); 
    } 
} 

mpCtrl.getSubscriptionLink = async (req, res) => { 
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