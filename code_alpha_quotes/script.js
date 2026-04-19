const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "motivational" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "motivational" },
    { text: "Quality is not an act, it is a habit.", author: "Aristotle", category: "wisdom" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", category: "wisdom" },
    { text: "Everything has beauty, but not everyone sees it.", author: "Confucius", category: "wisdom" }

];

let currentCategory = 'all';
let currentCategoryQuotes = [];
let currentIndex = -1;

const quoteText = document.getElementById('quote-text');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function filterQuotes(category) {
    currentCategory = category;
    

    const filteredQuotes = currentCategory === 'all' 
        ? quotes 
        : quotes.filter(q => q.category === currentCategory);

    currentCategoryQuotes = [...filteredQuotes]; 
    shuffleArray(currentCategoryQuotes); 


    currentIndex = -1;

    
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if(btn.innerText.toLowerCase() === category) {
            btn.classList.add('active');
        }
    });

    getNewQuote();
}

function getNewQuote() {
    if (currentCategoryQuotes.length === 0) {
        filterQuotes(currentCategory);
        return; 
    }

    currentIndex++;
    if (currentIndex >= currentCategoryQuotes.length) {
        shuffleArray(currentCategoryQuotes); 
        currentIndex = 0; 
    }

    const selectedQuote = currentCategoryQuotes[currentIndex];

    quoteText.classList.remove('fade-in');
    void quoteText.offsetWidth; 
    quoteText.classList.add('fade-in');

    quoteText.innerText = `"${selectedQuote.text}"`;
    authorText.innerText = `- ${selectedQuote.author}`;
}


filterQuotes('all');

newQuoteBtn.addEventListener('click', getNewQuote);