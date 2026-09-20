const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();


// ============================================
// MIDDLEWARE
// ============================================

app.use(cors());
app.use(express.json());


// ============================================
// SMTP CONFIGURATION
// ============================================

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",

    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});


// ============================================
// TEST SMTP CONNECTION
// ============================================

transporter.verify((error) => {

    if (error) {
        console.error("SMTP Error:", error);
    } else {
        console.log("SMTP server is ready.");
    }

});


// ============================================
// ROOT / HEALTH CHECK
// ============================================

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Mathews Portfolio backend is running."
    });
});


app.get("/api/health", (req, res) => {
    res.json({
        status: "ok"
    });
});


// ============================================
// CONTACT FORM
// ============================================

app.post("/api/contact", async (req, res) => {

    try {

        const {
            name,
            email,
            subject,
            message
        } = req.body;


        if (!name || !email || !subject || !message) {

            return res.status(400).json({
                message: "All fields are required."
            });

        }


        const cleanName = String(name).trim();
        const cleanEmail = String(email).trim();
        const cleanSubject = String(subject).trim();
        const cleanMessage = String(message).trim();


        if (!cleanName || !cleanEmail || !cleanSubject || !cleanMessage) {

            return res.status(400).json({
                message: "All fields are required."
            });

        }


        await transporter.sendMail({

            from: `"Mathews Portfolio" <${process.env.SMTP_USER}>`,

            replyTo: cleanEmail,

            to: process.env.RECEIVER_EMAIL,

            subject: `Portfolio Contact: ${cleanSubject}`,

            text: `
Name: ${cleanName}

Email: ${cleanEmail}

Subject: ${cleanSubject}

Message:

${cleanMessage}
            `.trim()

        });


        console.log(`Contact message received from ${cleanEmail}`);


        return res.status(200).json({
            message: "Message sent successfully!"
        });


    } catch (error) {

        console.error("Email error:", error);

        return res.status(500).json({
            message: "Unable to send email. Please try again later."
        });

    }

});


// ============================================
// START SERVER
// ============================================

const PORT = Number(process.env.PORT || 5000);

app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});
