const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image-container');
const searchHistoryList = document.getElementById('search-history');

// Get the API key from NASA
const apiKey = 'PWDbmkgdElQK6ylVsumVM5dqbSQqIkJKjlJiYM3Z'; // Replace with your API key

// Function to fetch the current image of the day
async function getCurrentImageOfTheDay() {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  displayImage(data);
}

// Function to fetch and display the image of the day for a selected date
async function getImageOfTheDay(date) {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  displayImage(data);
  saveSearch(date);
  addSearchToHistory(date);
  showSearchHistory();
}

// Function to save a search to local storage
function saveSearch(date) {
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  searches.push(date);
  localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to display the search history in the UI
function addSearchToHistory(searchDate) {
    // Add search item to search history list
    const searchHistoryList = document.getElementById("search-history");
    const newSearchItem = document.createElement("li");
    newSearchItem.textContent = searchDate;
    searchHistoryList.appendChild(newSearchItem);
  
    // Update searches array in local storage
    let searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(searchDate);
    localStorage.setItem("searches", JSON.stringify(searches));
  
    // Toggle visibility of search history list on "Search History" button click
    const searchHistoryBtn = document.getElementById("search-history-btn");
    searchHistoryBtn.addEventListener("click", function() {
      searchHistoryList.style.display = searchHistoryList.style.display === "none" ? "block" : "none";
    });
  }
  
// Function to display the search history
function showSearchHistory() {
  const searches = JSON.parse(localStorage.getItem('searches')) || [];
  const searchHistoryList = document.getElementById('search-history');
  searchHistoryList.innerHTML = '';
  searches.forEach((searchDate) => {
    const newSearchItem = document.createElement('li');
    newSearchItem.textContent = searchDate;
    searchHistoryList.appendChild(newSearchItem);
  });

  
}

// Function to display the image data in the UI
function displayImage(data) {
  currentImageContainer.innerHTML = `
    <h2 style="color: #C0C0C0;">${data.title}</h2>
    <img src="${data.url}" alt="${data.title}" / style="width: 500px;">
    <p style=" font-size: large;border: 1px solid lightblue;
    padding: 10px;color: #C0C0C0;">${data.explanation}</p>
  `;
}

// Event listener for the search form
searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  getImageOfTheDay(searchInput.value);
});

// Display the current image of the day when the page loads
getCurrentImageOfTheDay();
// Display the search history when the page loads
showSearchHistory();

