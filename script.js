// Get saved playlist from localStorage
let playlistItems = JSON.parse(localStorage.getItem('playlistItems')) || [];

// Elements
const songLinkInput = document.getElementById('songLinkInput');
const addLinkButton = document.getElementById('addLinkButton');
const playlist = document.getElementById('playlist');
const audioPlayer = document.getElementById('audioPlayer');
const nowPlaying = document.getElementById('nowPlaying');

// Function to update localStorage
function savePlaylist() {
  localStorage.setItem('playlistItems', JSON.stringify(playlistItems));
}

// Function to render the playlist
function renderPlaylist() {
  playlist.innerHTML = ''; // Clear the playlist UI

  playlistItems.forEach((link, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `Song ${index + 1}`;

    // Play Button
    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {
      audioPlayer.src = link;
      audioPlayer.play();
      nowPlaying.textContent = `Now Playing: ${link}`;
    });

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      playlistItems.splice(index, 1); // Remove from playlist array
      savePlaylist(); // Save changes to localStorage
      renderPlaylist(); // Re-render the playlist
    });

    listItem.appendChild(playButton);
    listItem.appendChild(deleteButton);
    playlist.appendChild(listItem);
  });
}

// Add URL to playlist
addLinkButton.addEventListener('click', () => {
  const inputLink = songLinkInput.value.trim();

  if (!inputLink) {
    alert('Please enter a valid MP3 URL!');
    return;
  }

  // Add link to playlist array
  playlistItems.push(inputLink);
  savePlaylist(); // Save to localStorage
  renderPlaylist(); // Re-render playlist UI

  songLinkInput.value = ''; // Clear the input field
});

// Initial rendering of playlist
renderPlaylist();
