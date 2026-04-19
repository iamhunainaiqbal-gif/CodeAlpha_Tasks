const cardContainer = document.getElementById('card-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current-index');
const addCardBtn = document.getElementById('add-card-btn');
const clearBtn = document.getElementById('clear-btn');
const modalContainer = document.getElementById('modal-container');
const saveBtn = document.getElementById('save-card');
const closeBtn = document.getElementById('close-modal');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const progressBar = document.getElementById('progress-bar');

let cardsData = JSON.parse(localStorage.getItem('cards')) || [];
let currentActiveCard = 0;

function createCards() {
    cardContainer.innerHTML = '';
    cardsData.forEach((data, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        if (index === currentActiveCard) card.classList.add('active');

        card.innerHTML = `
            <div class="card-options">
                <button onclick="editCard(${index})" class="btn-opt"><i class="fas fa-pen"></i></button>
                <button onclick="deleteCard(${index})" class="btn-opt"><i class="fas fa-trash"></i></button>
            </div>
            <div class="card-inner" onclick="this.parentElement.classList.toggle('show-answer')">
                <div class="card-front">
                    <p>${data.question}</p>
                    <small style="color:#aaa; margin-top:10px;">Click to Flip</small>
                </div>
                <div class="card-back">
                    <p>${data.answer}</p>
                    <small style="color:#eee; margin-top:10px;">Click to Hide</small>
                </div>
            </div>
        `;
        cardContainer.appendChild(card);
    });
    updateUI();
}

function updateUI() {
    currentEl.innerText = cardsData.length > 0 ? `${currentActiveCard + 1} / ${cardsData.length}` : '0 / 0';
    const progress = cardsData.length > 0 ? ((currentActiveCard + 1) / cardsData.length) * 100 : 0;
    progressBar.style.width = progress + '%';
}

nextBtn.addEventListener('click', () => {
    if (cardsData.length <= 1) return;
    currentActiveCard = (currentActiveCard + 1) % cardsData.length;
    createCards();
});

prevBtn.addEventListener('click', () => {
    if (cardsData.length <= 1) return;
    currentActiveCard = (currentActiveCard - 1 + cardsData.length) % cardsData.length;
    createCards();
});

addCardBtn.addEventListener('click', () => modalContainer.style.display = 'flex');
closeBtn.addEventListener('click', () => modalContainer.style.display = 'none');

saveBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if (question.trim() && answer.trim()) {
        cardsData.push({ question, answer });
        localStorage.setItem('cards', JSON.stringify(cardsData));
        questionEl.value = ''; answerEl.value = '';
        modalContainer.style.display = 'none';
        currentActiveCard = cardsData.length - 1;
        createCards();
    }
});

function deleteCard(index) {
    cardsData.splice(index, 1);
    localStorage.setItem('cards', JSON.stringify(cardsData));
    if (currentActiveCard >= cardsData.length) currentActiveCard = Math.max(0, cardsData.length - 1);
    createCards();
}

function editCard(index) {
    const card = cardsData[index];
    questionEl.value = card.question;
    answerEl.value = card.answer;
    deleteCard(index);
    modalContainer.style.display = 'flex';
}

clearBtn.addEventListener('click', () => {
    if(confirm('Are you sure you want to delete all cards?')) {
        localStorage.clear();
        cardsData = [];
        window.location.reload();
    }
});

createCards();