
document.addEventListener('DOMContentLoaded', () => {
  const songLinkInput = document.getElementById('songLink');
  const addLinkButton = document.getElementById('addLink');
  const playlist = document.getElementById('playlist');
  const scheduleTimeInput = document.getElementById('scheduleTime');
  const startSchedulerButton = document.getElementById('startScheduler');
  const audioPlayer = document.getElementById('audioPlayer');
  const nowPlaying = document.getElementById('nowPlaying');
  const serverUrlInput = document.getElementById('serverUrl');
  const mountPointInput = document.getElementById('mountPoint');
  const passwordInput = document.getElementById('password');
  const startStreamButton = document.getElementById('startStream');
  const streamStatus = document.getElementById('streamStatus');

  let playlistItems = [];
  let schedulerInterval;

  // Add Song from Google Drive
  addLinkButton.addEventListener('click', () => {
    const inputLink = songLinkInput.value.trim();

    if (!inputLink) {
      alert('Please enter a valid Google Drive link!');
      return;
    }

    const fileIdMatch = inputLink.match(/file\/d\/(.+?)\/view/);
    if (!fileIdMatch) {
      alert('Invalid Google Drive link format!');
      return;
    }

    const fileId = fileIdMatch[1];
    const directLink = `https://drive.google.com/uc?export=download&id=${fileId}`;

    playlistItems.push(directLink);

    const listItem = document.createElement('li');
    listItem.textContent = `Song (${fileId})`;

    const playButton = document.createElement('button');
    playButton.textContent = 'Play';
    playButton.addEventListener('click', () => {
      audioPlayer.src = directLink;
      audioPlayer.play();
      nowPlaying.textContent = `Now Playing: ${directLink}`;
    });

    listItem.appendChild(playButton);
    playlist.appendChild(listItem);

    songLinkInput.value = '';
  });

  // Scheduler functionality
  startSchedulerButton.addEventListener('click', () => {
    const scheduleTime = scheduleTimeInput.value;
    if (!scheduleTime || playlistItems.length === 0) {
      alert('Please set a valid time and ensure the playlist is not empty.');
      return;
    }

    const now = new Date();
    const scheduleDateTime = new Date(
      `${now.toDateString()} ${scheduleTime}:00`
    );

    const timeUntilStart = scheduleDateTime - now;

    if (timeUntilStart < 0) {
      alert('The scheduled time has already passed.');
      return;
    }

    clearTimeout(schedulerInterval);
    schedulerInterval = setTimeout(() => {
      let currentSongIndex = 0;

      const playNextSong = () => {
        if (currentSongIndex < playlistItems.length) {
          const nextSong = playlistItems[currentSongIndex];
          audioPlayer.src = nextSong;
          audioPlayer.play();
          nowPlaying.textContent = `Now Playing: Song ${currentSongIndex + 1}`;
          currentSongIndex++;
        } else {
          clearTimeout(schedulerInterval);
        }
      };

      playNextSong();
      audioPlayer.addEventListener('ended', playNextSong);
    }, timeUntilStart);

    alert('Scheduler set!');
  });

  // Icecast Stream Settings
  startStreamButton.addEventListener('click', () => {
    const serverUrl = serverUrlInput.value;
    const mountPoint = mountPointInput.value;
    const password = passwordInput.value;

    if (!serverUrl || !mountPoint || !password) {
      alert('Please fill in all Icecast stream settings.');
      return;
    }

    // Normally, here you would configure the Icecast stream using backend code or an external library.
    streamStatus.textContent = `Streaming to ${serverUrl}${mountPoint}...`;
    alert('Icecast stream started!');
  });
});
                         
