const overlay = document.getElementById('enterOverlay');
const roddyricchbox = document.getElementById('roddyricchbox');
const enterButton = document.getElementById('enterButton');

enterButton.addEventListener('click', () => {
   overlay.style.opacity = '0';
   overlay.style.pointerEvents = 'none';
   setTimeout(() => {
      roddyricchbox.style.opacity = '1';
      roddyricchbox.style.transform = 'scale(1)';
      audio.play().catch(() => {});
   }, 400);
});

const tracks = [{
      title: "red eyes",
      artist: "overtonight",
      src: "/songs/red-eyes.mp3",
      img: "/songs/ovt.png"
   },
   {
      title: "so good",
      artist: "bunii",
      src: "/songs/sogood.mp3",
      img: "/songs/bastards.jpeg"
   },
   {
      title: "lost!",
      artist: "ithinkera",
      src: "/songs/lost.mp3",
      img: "/songs/lost.jpeg"
   },
   {
      title: "scars",
      artist: "Novulent",
      src: "/songs/scars.mp3",
      img: "/songs/scars.jpeg"
   },
   {
      title: "watermolen",
      artist: "bunii",
      src: "/songs/watermolen.mp3",
      img: "/songs/bastards.jpeg"
   },
   {
      title: "so dumb",
      artist: "mural, Textbook",
      src: "/songs/so-dumb.mp3",
      img: "/songs/so-dumb.jpeg"
   },
   {
      title: "downtown baby 2",
      artist: "overtonight",
      src: "/songs/downtownbaby2.mp3",
      img: "/songs/downtownbaby2.jpeg"
   },
   {
      title: "Loving Machine",
      artist: "TV Girl",
      src: "/songs/loving-machine.mp3",
      img: "/songs/loving-machine.jpeg"
   },
   {
      title: "grand mal",
      artist: "bunii",
      src: "/songs/grand-mal.mp3",
      img: "/songs/grand-mal.jpeg"
   },
];

let current = 0;
let looping = false;

const audio = document.getElementById('mp-audio');
const player = document.getElementById('music-player');
const playBtn = document.getElementById('mp-play');
const prevBtn = document.getElementById('mp-prev');
const nextBtn = document.getElementById('mp-next');
const loopBtn = document.getElementById('mp-loop');
const progress = document.getElementById('mp-progress');
const volSlider = document.getElementById('mp-volume');
const curTime = document.getElementById('mp-cur');
const durTime = document.getElementById('mp-dur');
const titleEl = document.getElementById('mp-title');
const artistEl = document.getElementById('mp-artist');
const artEl = document.getElementById('mp-art');
const playlist = document.getElementById('mp-playlist');

function fmt(s) {
   if (isNaN(s)) return '0:00';
   const m = Math.floor(s / 60),
      sec = Math.floor(s % 60);
   return m + ':' + String(sec).padStart(2, '0');
}

function loadTrack(idx, autoplay = false) {
   current = (idx + tracks.length) % tracks.length;
   const t = tracks[current];
   audio.src = t.src;
   titleEl.textContent = t.title;
   artistEl.textContent = t.artist;
   artEl.innerHTML = `<img src="${t.img}" alt="${t.title}">`;
   progress.value = 0;
   curTime.textContent = '0:00';
   durTime.textContent = '0:00';
   renderPlaylist();
   if (autoplay) audio.play();
   updatePlayBtn();
}

function updatePlayBtn() {
   playBtn.textContent = audio.paused ? '▶' : '⏸';
   player.classList.toggle('playing', !audio.paused);
}

function renderPlaylist() {
   playlist.innerHTML = tracks.map((t, i) => `
                <div class="mp-track${i === current ? ' active' : ''}" data-i="${i}">
                    <span class="mp-track-num">${i === current ? '▸' : i + 1}</span>
                    <span class="mp-track-name">${t.title}</span>
                    <span class="mp-track-dur">${t.artist}</span>
                </div>
            `).join('');
   playlist.querySelectorAll('.mp-track').forEach(el => {
      el.addEventListener('click', () => loadTrack(+el.dataset.i, true));
   });
}

playBtn.addEventListener('click', () => {
   if (audio.paused) audio.play();
   else audio.pause();
});

prevBtn.addEventListener('click', () => loadTrack(current - 1, !audio.paused));
nextBtn.addEventListener('click', () => loadTrack(current + 1, !audio.paused));

loopBtn.addEventListener('click', () => {
   looping = !looping;
   audio.loop = looping;
   loopBtn.style.opacity = looping ? '1' : '0.5';
   loopBtn.style.boxShadow = looping ? '0 0 10px rgba(160,80,220,0.6)' : 'none';
});

audio.addEventListener('play', updatePlayBtn);
audio.addEventListener('pause', updatePlayBtn);

audio.addEventListener('timeupdate', () => {
   if (!audio.duration) return;
   progress.value = (audio.currentTime / audio.duration) * 100;
   curTime.textContent = fmt(audio.currentTime);
   durTime.textContent = fmt(audio.duration);
});

progress.addEventListener('input', () => {
   if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
});

volSlider.addEventListener('input', () => {
   audio.volume = volSlider.value / 100;
});
audio.volume = 0.8;

audio.addEventListener('ended', () => {
   if (!looping) loadTrack(current + 1, true);
});

loadTrack(0);