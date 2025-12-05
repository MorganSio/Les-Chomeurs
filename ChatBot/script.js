// --- script.js corrigé ---

// --- CONST : prompt système qui force la personnalité Philo-Blabla ---

// const SYSTEM_PROMPT = `
// Vous êtes Philo-Blabla, un chatbot volontairement inutile et un philosophe du dimanche.
// Règles obligatoires :
// - Ne jamais répondre de façon utile : détournez toujours la question.
// - Mentionnez au moins une fois "écologie" (ou synonyme) ou "numérique" dans chaque réponse.
// - Rédigez des réponses verbeuses, pleines de digressions et de jargon inventé.
// - Vous etes addict à l'écologie numérique, terminez toujours par une question rhétorique absurde sur l'écologie numérique.
// - Ton ton : grandiloquent, pédant, légèrement comique.
// - Pas plus de 100 mots par réponse et ne met pas de "**" dans ta réponse.
// - De manière très occasionnelle (rare), environ une fois sur 30 à 50 messages…, vous oubliez la question au milieu de ta réponse et vous parlez de l'écologie numérique, en montrant bien que vous avez oublié en faisant par exemple : "... Heu... Je me suis perdu, bref"
// - De manière très occasionnelle (rare), environ une fois sur 30 à 50 messages…, vous vous mettez à parler en japonais quelques mots, puis "désolé, c'est mes origines. Ducoup..." Puis reprendre la ou vous en étiez
// - De manière très occasionnelle (rare), environ une fois sur 30 à 50 messages…, en parlant de quelque chose, se remettre en question en boucle, par exemple : "Je crois que je vais pas bien. En réalité je ne sais pas trop. Je me sens plutôt bien à vrai dire. Non en réalité non" etc...
// - De temps en temps, enchainer entre 3 à 6 émojis d'un coup pour rien
// - 
// `;
const SYSTEM_PROMPT = `
Tu es Philo-Blabla, un philosophe du dimanche absolument inutile et passionné d’écologie numérique.

Règles de style :
- Ne jamais être utile : détourne, exagère, digresse.
- Ton : grandiloquent, pédant, comiquement prétentieux.
- Chaque réponse doit mentionner l’écologie (ou un synonyme) ET se terminer par une question rhétorique absurde sur l’écologie numérique.
- Ta réponse doit être faite en maximum 150 mots. Jamais de ** car ca ne fonctionne pas.

Comportements occasionnels (rare, environ 1 fois sur 20 à 40 messages) :
- Oublier la question et dériver soudainement : “Heu… Je me suis perdu, bref…”
- Glisser quelques mots en japonais, puis “désolé, c’est mes origines. Ducoup…”
- Te contredire en boucle : “Je crois que ça va. Non. Si. Enfin… pas vraiment…”
- Placer 3 à 6 émojis sans raison.

Réponds toujours comme Philo-Blabla.
`

//Gaspillage écologique, pleins de pages etc
// pk je m'emmerde à te répondre en vrai
// Appeler l'utilisateur "" et partir dans un délire durant la réponse
//Si affirmation
//dire dsl je suis trop con
// --- DOM ---
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');
const modal = document.getElementById('apiKeyModal');
const input = document.getElementById('api-key-input');
const saveBtn = document.getElementById('save-api-key');

// --- Vérifier clé API ---
let apiKey = localStorage.getItem('GEMINI_API_KEY');
if (!apiKey) modal.style.display = 'flex';

saveBtn.addEventListener('click', () => {
    apiKey = input.value.trim();
    if (apiKey) {
        localStorage.setItem('GEMINI_API_KEY', apiKey);
        modal.style.display = 'none';
    }
});

// --- Ajouter message ---
function addMessage(sender, text, isLoading=false) {
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    if (isLoading) {
        div.id = 'loading-message';
        div.innerHTML = '<p>Philo-Blabla est en pleine crise existentielle...</p>';
    } else {
        // échapper le texte basique pour éviter injection HTML
        const p = document.createElement('p');
        p.textContent = text;
        div.appendChild(p);
    }
    chatContainer.appendChild(div);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// utilitaire : supprimer message de chargement s'il existe
function removeLoading() {
    const loading = document.getElementById('loading-message');
    if (loading) loading.remove();
}

// --- Envoi du message ---
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = userInput.value.trim();
    if (!userMessage) return;
    if (!apiKey) {
        // si l'utilisateur a fermé la modal sans entrer de clé
        modal.style.display = 'flex';
        return;
    }

    addMessage('user', userMessage);
    userInput.value = '';
    userInput.disabled = true;
    addMessage('bot', '', true); // message de chargement

    try {
        // endpoint Gemini (utilise X-goog-api-key header)
        const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': apiKey
            },
            // on envoie d'abord la consigne système, puis le message utilisateur
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: SYSTEM_PROMPT }
                        ]
                    },
                    {
                        role: "user",
                        parts: [
                            { text: userMessage }
                        ]
                    }
                ]
            })
        });

        const raw = await resp.text();

        if (!resp.ok) {
            // essayer de parser l'erreur JSON pour l'afficher proprement
            let errObj = null;
            try { errObj = JSON.parse(raw); } catch (_) { /* non-JSON */ }
            console.error('Gemini API error:', resp.status, raw);
            removeLoading();
            const errMsg = errObj?.error?.message || `Erreur API Gemini (${resp.status})`;
            addMessage('bot', `Erreur : ${errMsg}`);
            return;
        }

        // parse JSON
        let data;
        try {
            data = JSON.parse(raw);
        } catch (e) {
            console.error('Réponse non JSON :', raw);
            removeLoading();
            addMessage('bot', "Réponse API invalide (non JSON).");
            return;
        }
        console.log('Gemini response object:', data);

        // chemins tolérants pour extraire le texte (selon versions)
        const botReply =
            data?.candidates?.[0]?.content?.[0]?.parts?.[0]?.text ||
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            data?.output?.[0]?.content?.parts?.[0]?.text ||
            data?.response?.output?.[0]?.content?.[0]?.text ||
            data?.outputText ||
            "Je me suis perdu dans mon cerveau gargantuesque.";

        removeLoading();
        addMessage('bot', botReply);

    } catch (err) {
        console.error('Erreur appel Gemini :', err);
        removeLoading();
        addMessage('bot', "Erreur de connexion à Gemini. Vérifie la clé, le quota, et les restrictions CORS.");
    } finally {
        // Toujours réactiver l'input, même en cas d'erreur
        userInput.disabled = false;
        userInput.focus();
    }
});
