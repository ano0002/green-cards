# Green Cards

Green Cards is an interactive web application designed to gamify learning about sustainability and green IT practices. Users answer questions to unlock collectible cards, each representing a unique funny character. The application ensures an engaging and educational experience.

---

## Features

- **Random Question Selection**: Each session displays 3 random questions from a pool of 15.
- **Dynamic Card Unlocking**: Cards are hidden by default and are revealed when users answer questions correctly.
- **Persistent Progress**: Unlocked cards are saved using `localStorage`, ensuring progress is retained across sessions.
- **Rarity System**: Cards maintain their rarity classification, unaffected by the unlocking mechanism.

---

## File Structure

```
green-cards/
├── api/
│   ├── db.js               # Database connection and queries
│   ├── questions.js        # API for managing questions
│   ├── router.js           # Main API router
│   └── users.js            # API for user management
├── config/
│   └── database.js         # Database configuration
├── public/
│   ├── index.html          # Homepage with questions
│   ├── login.html          # Login page
│   ├── profile.html        # Profile page displaying unlocked cards
│   ├── register.html       # Registration page
│   ├── css/
│   │   ├── profile.css     # Styles for the profile page
│   │   └── styles.css      # General styles for the application
│   ├── img/                # Images for the collectible cards
│   │   ├── card_1.webp
│   │   ├── card_2.webp
│   │   └── ...             # Other card images
│   └── js/
│       ├── header.js       # Script for the header functionality
│       ├── index.js        # Main script for the homepage
│       ├── login.js        # Script for the login page
│       ├── profile.js      # Script for the profile page
│       └── register.js     # Script for the registration page
├── report/
│   ├── Green IT Report.pdf # Documentation on Green IT practices
│   └── wireframes/         # Wireframes for the application
│       ├── homepage.png
│       ├── loginpage.png
│       └── profilepage.png
├── package.json            # Node.js project configuration
├── server.js               # Main server file
└── README.md               # Project documentation
```

---

## How It Works

1. **Answering Questions**:
   - On the homepage (`index.html`), users are presented with 3 random questions.
   - Each question has a predefined correct answer.
   - Upon answering correctly, a message is displayed, and the corresponding card is marked as unlocked.

2. **Unlocking Cards**:
   - The `revealCard` function saves the unlocked card's ID to `localStorage`.
   - On the profile page (`profile.html`), the script reads from `localStorage` and reveals the unlocked cards.

3. **Card Rarity**:
   - The rarity system is preserved, ensuring that unlocking cards does not interfere with their predefined rarity.

---

## Technologies Used

- **HTML**: Structure of the application.
- **CSS**: Styling for the pages and cards.
- **JavaScript**: Logic for question handling, card unlocking, and state persistence.
- **Node.js**: Backend server for managing APIs.
- **LocalStorage**: Persistent storage for unlocked cards.

---

## How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/green-cards.git
   cd green-cards
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open the application in your browser:
   - Homepage: `http://localhost:3000/index.html`


---
