window.onload = function() {
    let token = null;
    cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
            token = cookie.substring('token='.length, cookie.length);
            break
        }
    }
    if (token) {
        document.getElementById('login').style.display = 'none';
        document.getElementById('profile').style.display = 'block';
        document.getElementById('logout').style.display = 'block';
        document.getElementById('logout').addEventListener('click', function() {
            document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Delete the cookie
            window.location.href = '/login.html'; // Redirect to the home page
        });

    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('profile').style.display = 'none';
        document.getElementById('logout').style.display = 'none';
    }
}
