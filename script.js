const quoteInput = document.getElementById('quote');
const authorInput = document.getElementById('author');
const addButton = document.getElementById('addQuote');
const quoteList = document.getElementById('quoteList');

addButton.addEventListener('click', addQuote);

function addQuote() {
  const quote = quoteInput.value.trim();
  const author = authorInput.value.trim();

  if (quote !== '' && author !== '') {
    const quoteObject = { quote, author };
    const quoteString = JSON.stringify(quoteObject);
    const key = Date.now().toString(); // Generate a unique key
    localStorage.setItem(key, quoteString);
    displayQuotes();
    quoteInput.value = '';
    authorInput.value = '';
  } else {
    alert('Please fill in both quote and author fields.');
  }
}

function displayQuotes() {
  quoteList.innerHTML = '';
  const storedQuotes = Object.keys(localStorage);

  storedQuotes.forEach(key => {
    const quoteObject = JSON.parse(localStorage.getItem(key));
    const listItem = document.createElement('li');
    listItem.textContent = `${quoteObject.quote} - ${quoteObject.author}`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeQuote(key));
    listItem.appendChild(removeButton);
    quoteList.appendChild(listItem);
  });
}

function removeQuote(key) {
  localStorage.removeItem(key);
  displayQuotes();
}

// Initial display of quotes
displayQuotes();
