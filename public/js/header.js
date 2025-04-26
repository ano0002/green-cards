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
        document.getElementById('logout').style.display = 'block';
    } else {
        document.getElementById('login').style.display = 'block';
        document.getElementById('logout').style.display = 'none';
    }
}
