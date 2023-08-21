import { createTransport } from 'nodemailer';

export const sendEmail = (to: string, subject: string, html: string) => {
    const transporter = createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    return transporter.sendMail({
        from: 'uptask@gmail.com',
        to,
        subject,
        html,
    });
};

export const sendEmailAccountConfirmation = ( email: string, token: string ) => {
    const html = `
        <h1>Confirma tu cuenta</h1>
        <a href="${process.env.CLIENT_URL}/confirm-account/${token}">Click aquí</a>
    `;
    sendEmail( email, 'Confirma tu cuenta', html )
        .then( console.log )
        .catch( console.log );
};
