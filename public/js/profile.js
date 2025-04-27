const rarityMap = {
    1: "common",
    2: "uncommon",
    3: "rare",
    4: "epic",
    5: "legendary"
};

function cardToHTML(card) {
    const cardContainer = document.createElement("article");
    cardContainer.classList.add("card");
    cardContainer.classList.add(rarityMap[card.rarity]);

    const cardImage = document.createElement("img");
    cardImage.src = "/img/"+card.image;
    cardImage.alt = card.name;
    cardImage.className = "card-image";
    cardContainer.appendChild(cardImage);

    const cardName = document.createElement("h3");
    cardName.innerText = card.name;
    cardName.className = "card-name";
    cardContainer.appendChild(cardName);

    return cardContainer;
}


var token = null;

// Try to get the token from cookies
if (document.cookie) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.startsWith('token=')) {
            token = cookie.substring('token='.length, cookie.length);
            break;
        }
    }
}

if (!token) {
    // If no token is found, redirect to login page
    window.location.href = "/login.html";
}

fetch("/api/users?token=" + token, {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
}).then(response => {
    if (response.status === 401) {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login.html";
    } else if (response.status === 200) {
        return response.json();
    } else {
        throw new Error("Unexpected response status: " + response.status);
    }
}).then(response => {
    const data = response.data;
    // Display user information on the profile page
    document.getElementById("username").innerText = data.username;
    
    const cards = data.cards;
    const cardList = document.getElementById("card-list");
    cardList.innerHTML = ""; // Clear existing cards
    cards.forEach(card => {
        const cardElement = cardToHTML(card);
        cardList.appendChild(cardElement);
    });

    var card_elems = document.getElementsByClassName("card");

    for (var i = 0; i < card_elems.length; i++) {
        let el = card_elems.item(i);
        el.addEventListener('mousemove', handleMove);

        el.addEventListener('mouseout', function() {
            el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)';
        })

    }

})

var threeDPower = 10;

function handleMove(e) {
    var el = e.currentTarget;
    var height = el.offsetHeight;
    var width = el.offsetWidth;
    const xVal = e.layerX;
    const yVal = e.layerY;

    const yRotation = threeDPower * ((xVal - width / 2) / width);

    const xRotation = -threeDPower * ((yVal - height / 2) / height);

    const string = 'perspective(500px) scale(1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)';

    el.style.transform = string;
}