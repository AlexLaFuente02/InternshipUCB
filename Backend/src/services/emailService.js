const nodemailer = require('nodemailer');

const generateRandomCode = () => {
  const code = Math.floor(100000 + Math.random() * 900000);
  return code.toString();
};

const sendEmail = async (to) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jhessika.zarate@ucb.edu.bo', // Cambia con tu dirección de correo Gmail
      pass: 'ngms stpk boge plgf', // Cambia con tu contraseña de Gmail
    },
  });

  const code = generateRandomCode();

  const mailOptions = {
    from: 'jhessika.zarate@ucb.edu.bo', // Cambia con tu dirección de correo Gmail
    to,
    subject: 'Código de Verificación',
    text: `Tu código de verificación es: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return code;
  } catch (error) {
    console.error(error);
    throw new Error('Error al enviar el correo electrónico. Verifica que la dirección y las credenciales sean correctas.');
  }
};

module.exports = { sendEmail };