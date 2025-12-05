 const quizData = [
            {
                question: "🤔 Que se passe-t-il quand Windows 10 ne sera plus supporté ?",
                options: [
                    "Les ordinateurs explosent 💥",
                    "Ils deviennent obsolètes alors qu'ils fonctionnent encore 🗑️",
                    "Ils se transforment en robots 🤖",
                    "Rien du tout 😴"
                ],
                correct: 1,
                explanation: "Des milliers d'ordinateurs fonctionnels risquent d'être jetés, créant un désastre écologique et économique."
            },
            {
                question: "💰 Quel est le problème avec les licences logicielles propriétaires ?",
                options: [
                    "Elles coûtent trop cher et créent une dépendance 💸",
                    "Elles font du bruit la nuit 🔊",
                    "Elles sont vertes 🟢",
                    "Elles sont gratuites 🎁"
                ],
                correct: 0,
                explanation: "Les licences coûteuses créent une dépendance structurelle aux Big Tech et grèvent les budgets des établissements."
            },
            {
                question: "🌍 Où sont stockées les données avec les solutions Big Tech ?",
                options: [
                    "Dans ton cartable 🎒",
                    "Sur la Lune 🌙",
                    "Souvent hors Union Européenne ☁️",
                    "Dans le cloud arc-en-ciel 🌈"
                ],
                correct: 2,
                explanation: "Les données sont souvent hébergées hors UE, posant des questions de souveraineté et de protection des données."
            },
            {
                question: "🛡️ Que signifie NIRD ?",
                options: [
                    "Nouveaux Idiots Réellement Déconnectés",
                    "Numérique Inclusif, Responsable et Durable ✨",
                    "Naviguer Avec Internet Really Dope",
                    "Ninjas Informatiques Révolutionnaires Déterminés"
                ],
                correct: 1,
                explanation: "NIRD = Numérique Inclusif, Responsable et Durable. Une démarche pour l'autonomie numérique des établissements."
            },
            {
                question: "🐧 Quelle est l'alternative aux systèmes propriétaires ?",
                options: [
                    "Revenir aux machines à écrire ⌨️",
                    "Les logiciels libres comme Linux 🐧",
                    "Arrêter l'informatique 🚫",
                    "Acheter des ordinateurs plus chers 💎"
                ],
                correct: 1,
                explanation: "Les logiciels libres comme Linux offrent liberté, pérennité et indépendance technologique."
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];

        function startJourney() {
            document.getElementById('quiz-section').classList.remove('hidden');
            document.getElementById('quiz-section').scrollIntoView({ behavior: 'smooth' });
            showQuestion();
        }

        function showQuestion() {
            const quiz = quizData[currentQuestion];
            const progress = ((currentQuestion + 1) / quizData.length) * 100;
            document.getElementById('progress').style.width = progress + '%';

            let html = `
                <div class="question">${quiz.question}</div>
                <div class="options">
                    ${quiz.options.map((opt, idx) => `
                        <div class="option" onclick="selectAnswer(${idx})">${opt}</div>
                    `).join('')}
                </div>
            `;
            document.getElementById('quiz-content').innerHTML = html;
        }

        function selectAnswer(idx) {
            const quiz = quizData[currentQuestion];
            userAnswers.push(idx);
            
            const isCorrect = idx === quiz.correct;
            if (isCorrect) {
                score++;
            }

            const options = document.querySelectorAll('.option');
            options.forEach((opt, i) => {
                if (i === idx) {
                    opt.classList.add('selected');
                }
                opt.style.pointerEvents = 'none';
            });

            setTimeout(() => {
                const quizContent = document.getElementById('quiz-content');
                const feedbackColor = isCorrect ? 'rgba(56, 239, 125, 0.3)' : 'rgba(255, 107, 107, 0.3)';
                const feedbackEmoji = isCorrect ? '✅' : '❌';
                const feedbackText = isCorrect ? 'Correct !' : 'Pas tout à fait...';
                
                quizContent.innerHTML += `
                    <div style="background: ${feedbackColor}; padding: 1.5rem; border-radius: 10px; margin-top: 1rem; border: 2px solid ${isCorrect ? '#38ef7d' : '#FF6B6B'};">
                        <p style="font-size: 1.3rem; font-weight: bold; margin-bottom: 0.5rem;">${feedbackEmoji} ${feedbackText}</p>
                        <p style="font-size: 1.2rem;">${quiz.explanation}</p>
                    </div>
                `;

                setTimeout(() => {
                    currentQuestion++;
                    if (currentQuestion < quizData.length) {
                        showQuestion();
                    } else {
                        showResults();
                    }
                }, 2500);
            }, 500);
        }

        function showResults() {
            const percentage = (score / quizData.length) * 100;
            let message = '';
            let badges = '';

            if (percentage === 100) {
                message = "🏆 CHAMPION DU LIBRE ! Tu es prêt(e) à mener la révolution NIRD !";
                badges = '<span class="badge">🛡️ Résistant Expert</span><span class="badge">🌟 Ambassadeur NIRD</span>';
            } else if (percentage >= 60) {
                message = "💪 BIEN JOUÉ ! Tu comprends les enjeux de l'autonomie numérique !";
                badges = '<span class="badge">📚 En progression</span><span class="badge">🔥 Motivé(e)</span>';
            } else {
                message = "🌱 BON DÉBUT ! Explore les ressources pour en savoir plus sur NIRD !";
                badges = '<span class="badge">🌱 Débutant</span><span class="badge">💡 Curieux</span>';
            }

            document.getElementById('quiz-content').innerHTML = `
                <div class="result-card">
                    <h2>Résultats</h2>
                    <div class="score">${score}/${quizData.length}</div>
                    <p style="font-size: 1.3rem; margin-bottom: 1rem;">${message}</p>
                    <div>${badges}</div>
                    <button class="cta-button" onclick="showSolutions()" style="margin-top: 2rem;">💡 Découvrir les solutions</button>
                    <button class="cta-button" onclick="location.reload()" style="margin-top: 1rem; background: linear-gradient(45deg, #667eea, #764ba2);">🔄 Recommencer</button>
                </div>
            `;
        }

        function showSolutions() {
            document.getElementById('solutions-section').classList.remove('hidden');
            document.getElementById('solutions-section').scrollIntoView({ behavior: 'smooth' });
        }

        function scrollToAction() {
            document.getElementById('action-section').scrollIntoView({ behavior: 'smooth' });
        }

        function showRole(role) {
            const roleInfo = {
                student: {
                    emoji: '🎓',
                    title: 'Agir en tant qu\'élève',
                    actions: [
                        '💬 Parle de NIRD à tes camarades et enseignants',
                        '🎬 Crée des contenus (vidéos, affiches) pour promouvoir le libre',
                        '🤝 Monte un club informatique autour des logiciels libres',
                        '🐧 Teste Linux sur ton ordinateur personnel',
                        '📢 Propose un projet NIRD dans ton établissement'
                    ]
                },
                teacher: {
                    emoji: '👨‍🏫',
                    title: 'Agir en tant qu\'enseignant',
                    actions: [
                        '📚 Intègre des outils libres dans tes cours',
                        '🗣️ Sensibilise tes élèves aux enjeux de souveraineté numérique',
                        '👥 Contacte le collectif NIRD pour échanger',
                        '💻 Expérimente Linux en salle informatique',
                        '🎯 Monte un projet pédagogique autour du libre'
                    ]
                },
                parent: {
                    emoji: '👨‍👩‍👧',
                    title: 'Agir en tant que parent',
                    actions: [
                        '💬 Discute de NIRD avec l\'équipe éducative',
                        '🏠 Installe Linux à la maison pour montrer l\'exemple',
                        '🤝 Rejoins les associations de parents pour porter le sujet',
                        '📧 Contacte ta collectivité pour soutenir NIRD',
                        '🌱 Sensibilise d\'autres familles'
                    ]
                },
                admin: {
                    emoji: '🏛️',
                    title: 'Agir en tant que collectivité',
                    actions: [
                        '💰 Alloue des budgets pour la transition vers le libre',
                        '🎓 Forme les équipes techniques aux solutions NIRD',
                        '🤝 Connecte-toi avec d\'autres collectivités engagées',
                        '📋 Intègre NIRD dans les marchés publics',
                        '🌍 Deviens territoire pilote NIRD'
                    ]
                }
            };

            const info = roleInfo[role];
            document.getElementById('role-info').innerHTML = `
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem; border-radius: 20px; margin-top: 2rem;">
                    <h3 style="font-size: 2rem; margin-bottom: 2rem;">${info.emoji} ${info.title}</h3>
                    <div style="display: grid; gap: 1rem;">
                        ${info.actions.map(action => `
                            <div style="background: white; color: #333; padding: 1.5rem; border-radius: 10px; text-align: left;">
                                ${action}
                            </div>
                        `).join('')}
                    </div>
                    <a href="https://nird.forge.apps.education.fr/" target="_blank">
                        <button class="cta-button" style="margin-top: 2rem;">🚀 En savoir plus sur NIRD</button>
                    </a>
                </div>
            `;
            document.getElementById('role-info').scrollIntoView({ behavior: 'smooth' });
        }