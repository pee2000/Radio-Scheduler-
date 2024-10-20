
// JavaScript for the main page (script.js)
const songNameInput = document.getElementById('songName');
const artistNameInput = document.getElementById('artistName');
const playTimeInput = document.getElementById('playTime');
const musicFileInput = document.getElementById('musicFile');
const scheduleList = document.getElementById('scheduleList');
const audioPlayer = document.getElementById('audioPlayer');
const embedCodeTextArea = document.getElementById('embedCode');

let schedule = [];

// Function to add a song to the schedule
function addSong() {
    const songName = songNameInput.value.trim();
    const artistName = artistNameInput.value.trim();
    const playTime = playTimeInput.value;
    const musicFile = musicFileInput.files[0];

    if (songName === '' || artistName === '' || playTime === '' || !musicFile) {
        alert('Please fill in all fields and upload a music file');
        return;
    }

    const songData = {
        songName: songName,
        artistName: artistName,
        playTime: playTime,
        musicFile: URL.createObjectURL(musicFile)
    };

    schedule.push(songData);

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span>${playTime}</span> - <strong>${songName}</strong> by ${artistName}
        <button onclick="removeSong(this, '${playTime}')">Remove</button>
    `;
    scheduleList.appendChild(listItem);

    songNameInput.value = '';
    artistNameInput.value = '';
    playTimeInput.value = '';
    musicFileInput.value = '';
}

// Function to remove a song
function removeSong(button, playTime) {
    const listItem = button.parentElement;
    scheduleList.removeChild(listItem);

    schedule = schedule.filter(song => song.playTime !== playTime);
}

// Function to generate an embed link
function generateEmbedLink() {
    const baseUrl = window.location.href.replace(/\/[^\/]*$/, ''); // Get the base URL
    const embedUrl = `${baseUrl}/embed.html`;

    const embedCode = `<iframe src="${embedUrl}" width="400" height="300" frameborder="0" allow="autoplay; encrypted-media"></iframe>`;
    
    embedCodeTextArea.value = embedCode;
}

// Function to check and play music according to the schedule
function checkSchedule() {
    const currentTime = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const scheduledSong = schedule.find(song => song.playTime === currentTime);
    if (scheduledSong) {
        audioPlayer.src = scheduledSong.musicFile;
        audioPlayer.play();
    }
}

setInterval(checkSchedule, 60000);
