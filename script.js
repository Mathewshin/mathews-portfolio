// ============================================
// MOBILE MENU
// ============================================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (icon) {

            if (navMenu.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    });


    document.querySelectorAll("#navMenu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("show");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

}


// ============================================
// ACTIVE NAVIGATION
// ============================================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("#navMenu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }

    });

});


// ============================================
// CONTACT FORM
// ============================================

const contactForm = document.getElementById("contactForm");

const formMessage = document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        // VERY IMPORTANT
        // Prevent normal HTML form submission.
        event.preventDefault();

        event.stopPropagation();


        const submitButton =
            contactForm.querySelector("button[type='submit']");


        if (!submitButton) {
            console.error("Submit button not found.");
            return;
        }


        // ============================================
        // BUTTON - SENDING
        // ============================================

        submitButton.disabled = true;

        submitButton.innerHTML = `
            Sending...
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;


        // ============================================
        // GET FORM VALUES
        // ============================================

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const subject =
            document.getElementById("subject").value.trim();

        const message =
            document.getElementById("message").value.trim();


        // ============================================
        // SEND TO BACKEND
        // ============================================

        try {

            const response = await fetch(
                "http://localhost:5000/api/contact",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        subject: subject,
                        message: message
                    })
                }
            );


            const data = await response.json();


            // ============================================
            // SERVER ERROR
            // ============================================

            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Unable to send message."
                );

            }


            // ============================================
            // SUCCESS
            // ============================================

            if (formMessage) {

                formMessage.textContent =
                    "✓ Message sent successfully!";

                formMessage.style.color =
                    "#4ade80";

            }


            // Clear form

            contactForm.reset();


        } catch (error) {

            console.error(
                "Contact form error:",
                error
            );


            if (formMessage) {

                formMessage.textContent =
                    "Unable to send message. Please try again.";

                formMessage.style.color =
                    "#f87171";

            }

        } finally {

            // ============================================
            // RESTORE BUTTON
            // ============================================

            submitButton.disabled = false;

            submitButton.innerHTML = `
                Send Message
                <i class="fa-solid fa-paper-plane"></i>
            `;

        }

    });

}


// ============================================
// RESIZE
// ============================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        if (navMenu) {
            navMenu.classList.remove("show");
        }

        if (menuBtn) {

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        }

    }

});