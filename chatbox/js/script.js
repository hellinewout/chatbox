// Registreerfunctie
function registreer() {
    var naam = document.getElementById("registreerNaam").value;
    var wachtwoord = document.getElementById("registreerWachtwoord").value;

    if (localStorage.getItem(naam)) {
        document.getElementById("incorrect").innerHTML = "Gebruikersnaam bestaat al";
    } else {
        localStorage.setItem(naam, wachtwoord);
        document.getElementById("incorrect").innerHTML = "Succesvol geregistreerd";
    }
}

// Loginfunctie
function login() {
    var naam = document.getElementById("loginNaam").value;
    var wachtwoord = document.getElementById("loginWachtwoord").value;

    if (localStorage.getItem(naam) === wachtwoord) {
        document.getElementById("pasJuste").innerHTML = "Login succesvol";
        document.location.href = 'paginas/home.html';
        window.location.href = 'paginas/home.html';
    } else {
        document.getElementById("pasJuste").innerHTML = "Ongeldige gebruikersnaam of wachtwoord";
    }
}

// Aanroepen van de send-functie
document.getElementById('send-btn').addEventListener('click', send);
document.getElementById('chatInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Voorkom nieuwe regel bij Enter
        send(); // Verzend het bericht bij Enter
    }
});

// Berichten verzenden
function send() {
    const messageInput = document.getElementById('chatInput');
    const messageText = messageInput.value.trim(); // Haal de tekst uit het invoerveld op

    if (messageText) { // Controleer of er tekst is ingevoerd
        addMessageToChatbox(messageText, 'user-message'); // Voeg jouw bericht toe (altijd rechts)
        saveMessage(messageText, 'user'); // Sla jouw bericht op in Local Storage
        messageInput.value = ''; // Maak het invoerveld leeg na verzending

        // Simuleer een bericht van een andere gebruiker (voor demonstratiedoeleinden)
        receiveMessageFromOther("Dit is een voorbeeldbericht van een andere gebruiker."); 
    }
}

// Berichten formatteren
function formatMessage(message) {
    return message.replace(/\n/g, '<br>'); // Vervang nieuwe regels door <br> tags
}

// Berichten toevoegen aan de chatbox
function addMessageToChatbox(message, messageType) {
    const chatBox = document.getElementById('chatBox');

    // Maak een nieuwe div voor het bericht
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageType); // Voeg de juiste klasse toe
    messageDiv.innerHTML = formatMessage(message); // Zet de berichttekst erin als HTML

    chatBox.appendChild(messageDiv); // Voeg het bericht toe aan de chatbox

    // Scroll automatisch naar het nieuwste bericht
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Berichten opslaan in Local Storage
function saveMessage(message, sender) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || []; // Haal bestaande berichten op of maak een lege array aan
    messages.push({ text: message, sender: sender }); // Voeg het nieuwe bericht toe met de verzender
    localStorage.setItem('chatMessages', JSON.stringify(messages)); // Sla de berichten opnieuw op
}

// Berichten laden bij het laden van de pagina
function loadMessages() {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || []; // Haal berichten op
    messages.forEach(function (message) {
        addMessageToChatbox(message.text, message.sender === 'user' ? 'user-message' : 'other-message'); // Voeg elk bericht toe aan de chatbox
    });
}

// Simuleer een bericht van een andere gebruiker
function receiveMessageFromOther(message) {
    addMessageToChatbox(message, 'other-message'); // Voeg ontvangen bericht toe (altijd links)
}

// Laad berichten bij het laden van de pagina
window.onload = loadMessages;
