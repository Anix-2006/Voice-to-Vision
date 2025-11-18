let videos = [];
let currentIndex = 0;

function translateText() {
  let text = document.getElementById("inputText").value;

  fetch("http://127.0.0.1:8000/translate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({text: text})
  })
  .then(res => res.json())
  .then(data => {
    videos = data.videos;
    currentIndex = 0;
    showTokens(data);
    playVideo(videos[0]);
  });
}

function showTokens(data) {
  let tokensBox = document.getElementById("tokensBox");
  tokensBox.innerHTML = "";

  data.tokens.forEach(t => {
    tokensBox.innerHTML += `<span class='token'>${t}</span>`;
  });

  data.not_found.forEach(t => {
    tokensBox.innerHTML += `<span class='token missing'>${t}</span>`;
  });
}

function playVideo(url) {
  if (!url) return;
  document.getElementById("videoPlayer").src = `http://127.0.0.1:8000${url}`;
}

function playNext() {
  currentIndex++;
  if (currentIndex < videos.length) {
    playVideo(videos[currentIndex]);
  }
}

function playAll() {
  let videoPlayer = document.getElementById("videoPlayer");

  videoPlayer.onended = () => {
    playNext();
  };

  playVideo(videos[0]);
}
