function validateLogin() {
    const enteredUsername = document.getElementById("username").value;
    const enteredPassword = document.getElementById("password").value;
    const password = "0000"; // demo password
    
    if (enteredPassword === password) {
        sessionStorage.setItem("loggedIn", "true");
        sessionStorage.setItem("username", enteredUsername);
        window.location.href = "landing.html";
        return false;
    }
    
    alert("Invalid credentials!");
    return false;
}

window.onload = function() {
    if (sessionStorage.getItem("loggedIn") === "true") {
        history.pushState(null, null, location.href);
        window.onpopstate = function() {
            history.pushState(null, null, location.href);
            sessionStorage.removeItem("loggedIn");
            sessionStorage.removeItem("username"); // Clear username on logout
            alert("You have been logged out!");
        };
    }
};