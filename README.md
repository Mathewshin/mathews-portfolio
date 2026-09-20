# Mathews Shine Joshi Portfolio

## Run the backend

Open a terminal in:

`assets/backend`

Run:

```powershell
node server.js
```

You should see:

```text
Server running on http://localhost:5000
SMTP server is ready.
```

Keep this terminal running.

## Run the portfolio

Open `index.html` with VS Code Live Server.

The portfolio should open at something like:

`http://127.0.0.1:5500/index.html`

## Test contact form

1. Keep the backend terminal running.
2. Open the Live Server portfolio.
3. Go to Contact.
4. Fill all four fields.
5. Click Send Message.
6. The page must remain on the same URL.
7. You should see `Message sent successfully!`.
8. Check the receiver Gmail inbox.

## Important

Do not put SMTP credentials in `script.js` or `index.html`.

Keep the real `.env` inside `assets/backend` and never upload it to GitHub.
