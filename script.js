// Function to get dictionary definition
async function getDefinition() {
  const word = document.getElementById('wordInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = ''; // Clear previous result
  
  if (!word) {
    resultDiv.innerHTML = "Please enter a word.";
    return;
  }

  // Show loading animation
  resultDiv.innerHTML = '<div class="loading">Loading...</div>';

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    if (data.title === "No Definitions Found") {
      resultDiv.innerHTML = "No definition found. Please try another word.";
      return;
    }

    const meanings = data[0].meanings.map(meaning => {
      return `<p><strong>${meaning.partOfSpeech}</strong>: ${meaning.definitions[0].definition}</p>`;
    }).join('');

    resultDiv.innerHTML = `<h2>${data[0].word}</h2>${meanings}`;
  } catch (error) {
    console.error("Error fetching data:", error);
    resultDiv.innerHTML = "Error fetching data. Please try again later.";
  }
}

// Function to add a favorite word and note
function addFavorite() {
  const word = document.getElementById('favoriteWordInput').value.trim();
  const note = document.getElementById('favoriteNoteInput').value.trim();
  const favoritesList = document.getElementById('favoritesList');

  if (!word) {
    alert("Please enter a word to add to favorites.");
    return;
  }

  // Create a new favorite item
  const favoriteItem = document.createElement('div');
  favoriteItem.classList.add('favorite-item');
  favoriteItem.innerHTML = `
    <p><strong>${word}</strong>: ${note ? note : 'No additional notes.'}</p>
    <button onclick="removeFavorite(this)">Remove</button>
  `;

  favoritesList.appendChild(favoriteItem);
  
  // Clear input fields
  document.getElementById('favoriteWordInput').value = '';
  document.getElementById('favoriteNoteInput').value = '';
}

// Function to remove a favorite word
function removeFavorite(button) {
  const favoriteItem = button.parentElement;
  favoriteItem.remove();
}
