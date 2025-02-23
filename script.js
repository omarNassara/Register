document.addEventListener('DOMContentLoaded', function () {    
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("Register button clicked!");

            const firstname = document.getElementById("firstname").value.trim();
            const lastname = document.getElementById("lastname").value.trim();
            const age = document.getElementById("age").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!firstname || !lastname || !age || !email || !password) {
                alert("All fields are required!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users") || "[]");

            if (users.find(user => user.email === email)) {
                document.getElementById("message").innerText = "This email is already registered!";
                return;
            }

            users.push({ firstname, lastname, age, email, password });
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration completed successfully!");
            window.location.href = "login.html";
        });
    }



    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const loginEmail = document.getElementById("loginEmail").value.trim();
            const loginPassword = document.getElementById("loginPassword").value.trim();
            let users = JSON.parse(localStorage.getItem("users") || "[]");

            let user = users.find(user => user.email === loginEmail && user.password === loginPassword);
            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                console.log("User logged in:", user);
                window.location.href = "home.html";
            } else {
                document.getElementById("loginMessage").innerText = "Login data is incorrect!";
            }
        });
    }



    if (window.location.pathname.includes("home.html")) {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log("Current user:", currentUser);

        if (!currentUser) {
            console.log("No user found, redirecting to login...");
            window.location.href = "login.html";
        } else {
            document.getElementById("welcomeMessage").innerText = `Welcome, ${currentUser.firstname}!`;
        }

        document.getElementById("logout").addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }
});

