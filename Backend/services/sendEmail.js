const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

const sendEmail = async (email, context, templateName, subject, attachments) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const TEMPLATE_DIR = "services/templates";
    const TEMPLATE_PATH = `${TEMPLATE_DIR}/${templateName}.html`;

    const htmlFile = fs.readFileSync(TEMPLATE_PATH, "utf-8");
    const template = handlebars.compile(htmlFile);
    const htmlToSend = template(context);

    const message = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: subject,
        html: htmlToSend,
        attachments: attachments
    };

    try {
        await transporter.sendMail(message);
    } catch (err) {
        console.error(err);
    }
};

module.exports = { sendEmail };
