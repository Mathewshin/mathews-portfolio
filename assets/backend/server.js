const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "ok",
        message: "Mathews Portfolio backend is running."
    });
});

app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

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

        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "onboarding@resend.dev",
                to: [process.env.RECEIVER_EMAIL],
                reply_to: cleanEmail,
                subject: `Portfolio Contact: ${cleanSubject}`,
                text: `
Name: ${cleanName}

Email: ${cleanEmail}

Subject: ${cleanSubject}

Message:

${cleanMessage}
                `.trim()
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Resend API error:", data);

            return res.status(500).json({
                message: "Unable to send email. Please try again later."
            });
        }

        console.log("Email sent successfully:", data.id);

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

const PORT = Number(process.env.PORT || 5000);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});