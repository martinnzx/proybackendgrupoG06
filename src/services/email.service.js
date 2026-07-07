const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const emailService = {};

emailService.enviarBienvenida = async (emailDestino, nombreUsuario) => {
    try {
        const data = await resend.emails.send({
            from: 'GymHub <onboarding@resend.dev>', 
            to: [emailDestino],
            subject: '¡Bienvenido a GymHub! 🏋️‍♂️',
            html: `
                <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
                    <h1 style="color: #0d6efd;">¡Hola ${nombreUsuario}!</h1>
                    <p style="font-size: 16px; color: #555;">Estamos muy felices de que te unas a <strong>GymHub</strong>.</p>
                    <p style="font-size: 16px; color: #555;">Ya podés iniciar sesión en nuestra plataforma para ver tus rutinas, pagos y vencimientos.</p>
                    <br/>
                    <p style="font-size: 14px; color: #888;">¡Nos vemos en el entrenamiento!</p>
                </div>
            `
        });
        console.log("Email enviado exitosamente:", data.id);
        return true;
    } catch (error) {
        console.error("Error al enviar el email:", error);
        return false;
    }
};

module.exports = emailService;