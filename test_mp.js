require('dotenv').config({ path: 'd:\\Facultad\\Programación y Servicios Web\\Trabajos Prácticos\\TRABAJO FINAL INTEGRADOR\\Backend\\proybackendgrupoG06\\.env' });
const axios = require('axios');

async function testMP() {
  try {
    console.log("Token:", process.env.ACCESS_TOKEN ? "Present" : "Missing");
    
    const url = "https://api.mercadopago.com/checkout/preferences"; 
    const body = { 
      payer_email: "test_user@gmail.com", 
      items: [ 
        { 
          title: "Cuota gimnasio", 
          description: "Pago de cuota mensual", 
          picture_url: "https://i.imgur.com/lMJnR3I.png", 
          category_id: "services", 
          quantity: 1, 
          unit_price: 1500
        } 
      ],
      back_urls: { 
        failure: "http://localhost:4200/tarifas", 
        pending: "http://localhost:4200/tarifas", 
        success: "http://localhost:4200/tarifas" 
      },
      auto_return: "approved"
    }; 
    
    const payment = await axios.post(url, body, { 
      headers: { 
        "Content-Type": "application/json", 
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}` 
      } 
    }); 
    
    console.log("Success:", payment.data.init_point);
  } catch (error) {
    console.log("Error response from MP:", JSON.stringify(error.response?.data, null, 2) || error.message);
  }
}

testMP();
