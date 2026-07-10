const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendRutinaNotification = async (toEmail, userName, rutinaName) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn('No se envió el correo: Faltan credenciales EMAIL_USER o EMAIL_PASS en el archivo .env');
            return false;
        }

        const mailOptions = {
            from: `"GymApp Notificaciones" <${process.env.EMAIL_USER}>`,
            to: toEmail,
            subject: `💪 ¡Nueva rutina asignada: ${rutinaName}!`,
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #2c3e50; text-align: center;">¡Hola, ${userName}!</h2>
                <p style="color: #555; font-size: 16px;">
                    Tu entrenador acaba de asignarte una nueva rutina de entrenamiento.
                </p>
                <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #007bff; margin: 20px 0;">
                    <h3 style="margin: 0; color: #007bff;">${rutinaName}</h3>
                </div>
                <p style="color: #555; font-size: 16px;">
                    Ingresá a tu cuenta en la plataforma para ver los detalles, los ejercicios y empezar a entrenar.
                </p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="http://localhost:4200" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Ir a mi cuenta
                    </a>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin-top: 30px;">
                <p style="color: #999; font-size: 12px; text-align: center;">
                    Este es un mensaje automático, por favor no respondas a este correo.
                </p>
            </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Correo enviado exitosamente a ${toEmail} [MessageId: ${info.messageId}]`);
        return true;
    } catch (error) {
        console.error('Error enviando correo:', error);
        return false;
    }
};

module.exports = {
    sendRutinaNotification
};