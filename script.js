document.addEventListener("DOMContentLoaded", () => {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const signupForm = document.querySelector("form.signup");
    const loginBtn = document.querySelector("#loginBtn");
    const signupBtn = document.querySelector("#signupBtn");
    const signupLink = document.querySelector(".signup-link a");

    const loginRadio = document.querySelector("#login");
    const signupRadio = document.querySelector("#signup");

    signupRadio.addEventListener("change", () => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
    });

    loginRadio.addEventListener("change", () => {
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
    });

    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupRadio.checked = true;
        signupRadio.dispatchEvent(new Event("change"));
    });

    const validateLogin = () => {
        const email = loginForm.querySelector('input[name="username"]').value;
        const password = loginForm.querySelector('input[name="password"]').value;

        if (!email || !password) {
            loginBtn.classList.add("error");
            setTimeout(() => loginBtn.classList.remove("error"), 500);
            return false;
        }
        return true;
    };

    const validateSignup = () => {
        const email = signupForm.querySelector('input[name="username"]').value;
        const password = signupForm.querySelector('input[name="password"]').value;
        const confirmPassword = signupForm.querySelector('input[name="confirmPassword"]').value;

        if (!email || !password || !confirmPassword || password !== confirmPassword) {
            signupBtn.classList.add("error");
            setTimeout(() => signupBtn.classList.remove("error"), 500);
            return false;
        }
        return true;
    };

    loginForm.addEventListener("submit", (e) => {
        if (!validateLogin()) {
            e.preventDefault();
        }
    });

    signupForm.addEventListener("submit", (e) => {
        if (!validateSignup()) {
            e.preventDefault();
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('loginButton');
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(loginForm);
    const data = new URLSearchParams(formData).toString();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      if (response.ok) {
        window.location.href = '/home.html'; // Redirect on success
      } else {
        // Show the error animation
        loginButton.classList.add('error');
        setTimeout(() => {
          loginButton.classList.remove('error');
        }, 500);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
});

