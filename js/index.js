// Fetch albums based on a search query
async function fetchAlbums() {
    const url = 'https://api.mockaroo.com/api/5cd5a660?count=100&key=0ec9ce50';
    try {
        const response = await fetch(url);
        const albums = await response.json();
        console.log(albums);  // Display the fetched data in the console
        displayAlbums(albums); // Function to display albums on the web page
    } catch (error) {
        console.error('Failed to fetch albums:', error);
    }
}


// Display search results
function displaySearchResults(albums) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Clear previous results
    albums.forEach(album => {
        resultsContainer.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-start">
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${album.title} <span class="badge bg-primary rounded-pill">${album.rating}</span></div>
                    <span>${album.artist}</span>
                </div>
                <button data-uid="${album.id}" type="button" class="btn btn-success" onclick="addToFavorites('${album.id}')">Add to Favorites</button>
            </li>
        `;
    });
}

// Add an album to favorites
async function addToFavorites(albumId) {
    try {
        await fetch(`https://api.mockaroo.com/api/ee3bb9e0?count=100&key=0ec9ce50`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: albumId })
        });
        alert('Album added to favorites!');
    } catch (error) {
        console.error('Error adding album to favorites:', error);
        alert('Failed to add album to favorites.');
    }
}

// Event listener for search form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('query').value;
    fetchAlbums(query);
});

// Initialize tab navigation
document.getElementById('search-button').addEventListener('click', () => {
    document.getElementById('search-tab').classList.remove('d-none');
    document.getElementById('favorites-tab').classList.add('d-none');
});

document.getElementById('favorites-button').addEventListener('click', () => {
    document.getElementById('favorites-tab').classList.remove('d-none');
    document.getElementById('search-tab').classList.add('d-none');
});

async function fetchFavorites() {
    try {
        const response = await fetch(`https://api.mockaroo.com/api/ee3bb9e0?count=100&key=0ec9ce50`);
        const favorites = await response.json();
    } catch (error) {
        console.error('Error fetching favorites:', error);
    }
}

// Call fetchFavorites to initialize favorites view
fetchFavorites();
