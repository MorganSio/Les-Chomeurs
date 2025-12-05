# 🛡️ Village NIRD - Résistance Numérique Éducative

[![GitHub Pages](https://img.shields.io/badge/Demo-Live-success)](https://votre-username.github.io/votre-repo/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

> 🎮 Plateforme interactive et ludique pour promouvoir la démarche NIRD (Numérique Inclusif, Responsable et Durable) dans les établissements scolaires.

## 🎯 À propos du projet

**Village NIRD** est une application web créée dans le cadre de la **Nuit de l'Info 2025**. Elle aide les élèves, enseignants, familles et collectivités à comprendre comment réduire leurs dépendances numériques face aux Big Tech et adopter des solutions libres et durables.

Inspirée du village d'Astérix résistant à l'Empire romain, cette plateforme propose une expérience gamifiée pour sensibiliser aux enjeux de souveraineté numérique dans l'éducation.

## ✨ Fonctionnalités principales

### 🎮 Quiz interactif
- **5 questions pédagogiques** sur les enjeux NIRD
- **Feedback immédiat** avec explications détaillées
- **Système de scores** et badges de récompense
- **Barre de progression** animée

### 💡 Section Solutions
Après le quiz, découvrez des solutions concrètes pour :
- ⚡ Lutter contre l'obsolescence programmée (Linux)
- 💰 Remplacer les licences coûteuses (LibreOffice, GIMP...)
- 🔒 Reprendre le contrôle de ses données (Nextcloud)
- 🔓 Sortir des écosystèmes fermés (standards ouverts)
- 🎯 Plan d'action progressif sur 12 mois

### 📚 Ressources
- Vidéos du lycée Carnot (pionnier NIRD)
- Liens vers le site officiel NIRD
- Reportages France Inter et France 3

### 💪 Appel à l'action
Section dédiée avec actions concrètes pour :
- 🎓 **Élèves** : devenir ambassadeur NIRD
- 👨‍🏫 **Enseignants** : intégrer NIRD dans les cours
- 👨‍👩‍👧 **Parents** : soutenir la transition
- 🏛️ **Collectivités** : accompagner les établissements

## 🚀 Démos en ligne

### Défis réalisés
- 🏠 **[Page principale](/)** - Quiz et solutions NIRD
- 🐍 **[Snake](/snake/)** - Jeu classique revisité
- 💬 **[Chat'bruti](/ChatBot/)** - Défi chatbot
- 🏢 **[Défi CCI](/CCI/)** - Challenge partenaire
- 🎨 **[Ergonomie](/ergonomie/)** - Défi accessibilité

## 🛠️ Technologies utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Animations et design responsive
- **JavaScript Vanilla** - Logique interactive (pas de frameworks)
- **GitHub Pages** - Hébergement statique gratuit

## 📦 Installation locale

```bash
# 1. Cloner le repository
git clone https://github.com/MorganSio/Les-Chomeurs.git

# 2. Naviguer dans le dossier
cd Les-chomeurs
# 3. Ouvrir avec un serveur local (optionnel)
# Option A : Python
python -m http.server 8000

# Option B : Node.js
npx http-server

# 4. Ouvrir dans le navigateur
# http://localhost:8000
```

Ou simplement **ouvrir `index.html`** dans votre navigateur !

## 📂 Structure du projet

```
Les-chomeurs/
├── index.html              # Page principale
├── style.css               # Styles globaux
├── script.js               # Logique du quiz et interactions
│
├── snake/                  # Défi Snake
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── ChatBot/                # Défi Chat'bruti
│   └── ...
│
├── CCI/                    # Défi CCI
│   └── ...
│
├── ergonomie/              # Défi Ergonomie
│   └── ...
│
└── README.md               # Documentation
```

## 🎨 Personnalisation

### Modifier les couleurs du thème

Dans `style.css`, ajustez les variables CSS :

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --accent-color: #FFE66D;
    --success-color: #38ef7d;
    --danger-color: #FF6B6B;
}
```

### Ajouter des questions au quiz

Dans `script.js`, éditez le tableau `quizData` :

```javascript
const quizData = [
    {
        question: "Votre question ici ?",
        options: [
            "Réponse A",
            "Réponse B",
            "Réponse C (correcte)",
            "Réponse D"
        ],
        correct: 2, // Index de la bonne réponse (commence à 0)
        explanation: "Explication pédagogique de la bonne réponse."
    },
    // Ajoutez d'autres questions...
];
```

Site accessible à : `https://github.com/MorganSio/Les-Chomeurs`

## 📱 Responsive Design

Le site est **100% responsive** et fonctionne sur :
- 📱 **Mobile** (iOS/Android)
- 📟 **Tablettes** (iPad, etc.)
- 💻 **Desktop** (tous navigateurs modernes)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. **Fork** le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout de...'`)
4. Pushez vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une **Pull Request**

## 🐛 Bugs connus & Roadmap

### À corriger
- [ ] Navigation entre pages des défis
- [ ] Persistance des scores avec localStorage

### Améliorations futures
- [ ] Mode sombre/clair
- [ ] Multilingue (FR/EN)
- [ ] Leaderboard communautaire
- [ ] Export PDF des résultats
- [ ] Intégration API NIRD

## 📚 Ressources NIRD

- 🌐 [Site officiel NIRD](https://nird.forge.apps.education.fr/)
- 🎥 [Lycée Carnot - Linux c'est facile](https://tube-numerique-educatif.apps.education.fr/w/3LXem3XK4asbwZa5R1qGkW)
- 🎙️ [Reportage France Inter](https://www.radiofrance.fr/franceinter/podcasts/le-grand-reportage-de-france-inter/le-grand-reportage-du-mardi-14-octobre-2025-4136495)
- 📰 [Article Café Pédagogique](https://www.cafepedagogique.net/2025/04/27/bruay-labuissiere-voyage-au-centre-du-libre-educatif/)

## 👥 Équipe - Les Chômeurs

Projet réalisé lors de la **Nuit de l'Info 2025** par l'équipe **"Les Chômeurs"**.

## 🙏 Remerciements

- 🎓 **Collectif NIRD** pour l'inspiration et les ressources
- 🏫 **Lycée Carnot de Bruay-la-Buissière** pour leur projet pionnier
- 🌙 **Nuit de l'Info** pour l'organisation de l'événement
- 💻 Tous les contributeurs de logiciels libres

---


**⭐ N'hésitez pas à mettre une étoile si ce projet vous plaît ! ⭐**

Fait avec ❤️ pour l'éducation libre et souveraine