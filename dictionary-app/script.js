const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function loadThemeIcon(isLight = true) {
  document.getElementById('js-theme-checkbox').checked = !isLight;
  document.getElementById("js-theme-icon-label").innerHTML = isLight ? '<i class="fa-regular fa-sun"></i>' : '<i class="fa-regular fa-moon"></i>';
}

function loadSystemTheme() {
  if (prefersDarkScheme.matches) {
    loadThemeIcon(false);
    document.body.classList.add("dark-theme");
  } else {
    loadThemeIcon();
    document.body.classList.remove("dark-theme");
  }
}

function loadDarkTheme() {
  loadThemeIcon(false);
  document.body.classList.add("dark-theme");
}

const themeToggle = document.getElementById("js-theme-toggle");
const currentTheme = localStorage.getItem("dictionary-theme");

if (!currentTheme) loadSystemTheme();
else if (currentTheme == "dark") loadDarkTheme();
else loadThemeIcon();

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }

  loadThemeIcon(theme == "light");

  localStorage.setItem("dictionary-theme", theme);
});

let currentFont = localStorage.getItem("dictionary-font") || 'serif';

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadFont(selectedFont) {
  if(selectedFont) {
    localStorage.setItem("dictionary-font", selectedFont);
    currentFont = selectedFont;
  }
  document.getElementById('js-current-font').innerHTML = capitalize(currentFont);
  document.documentElement.style.setProperty('--font-family', currentFont);
}

loadFont();

const fontToggle = document.getElementById('js-select-font');

function toggleFontDropdown() {
  document.getElementById('js-dropdown').classList.toggle('dropdown-icon-rotate');
  document.getElementById('js-font-family-select').classList.toggle('show');
}

fontToggle.addEventListener('click', toggleFontDropdown);

document.querySelectorAll('.font-list-item').forEach(item => {
  item.addEventListener('click', event => {
   const selectedFont = event.srcElement.attributes.font.nodeValue;
   loadFont(selectedFont);
   toggleFontDropdown();
  });
});

function getMeaning() {
  const searchWord = document.getElementById('js-search-input').value || 'keyword';
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
  .then((response) => {
    if (!response.ok) {
        return Promise.reject()
    }
    return response.json()
  })
  .then((data) => setResult(data[0]))
  .catch(error => setError());
}

function setError() {
  document.getElementById('result').innerHTML = `
    <div class="nothing-found">
      <i class="fa-solid fa-heart-crack"></i>
      No Definitions Found
    </div>
  `
}

function createHTMLforWord(word, phonetic, audio) {
  return `
    <div class="d-flex justify-content-between">
      <div class="keyword-header">
        <h1 class="keyword">
          ${word}
        </h1>
        <span class="keyword-pronunciation">${phonetic || ('/'+word+':/')}</span>
      </div>
  `
  +
  (audio ?
  `
      <audio id="text-audio">
        <source src="${audio}" type="audio/mp3">
        Your browser does not support the audio element.
      </audio>
      <button onclick="playAudio()" class="btn-play cursor-pointer">
        <i class="fa-solid fa-play"></i>
      </button>
  ` : '')
  +
  `  
    </div>
  `;
}

function playAudio() {
  document.getElementById('text-audio').play();
}

function createHTMLforType(item) {
  var html = `
    <div class="type">
      <div class="heading-break d-flex">
        <span class="text">${item.partOfSpeech}</span>
        <span class="hl-1"></span>
      </div>
      <div class="meaning">
        <span class="text">Meaning</span>
        <ul class="meaning-list">
  ` 
  +
    item.definitions.map(it => `
      <li class="meaning-list-item">
            ${it.definition}
            ${it.example ? `<span class="example">"${it.example}"</span>` : ''}
       </li>
    `).join('')
  +
  `
        </ul>
      </div>
  `
  +
  (item.synonyms.length > 0 ?
  `
      <div class="synonyms d-flex">
        <span class="text">Synonyms</span>
        <ul class="synonyms-list">
            ${item.synonyms.map(it => `<li>${it}</li>`).join('')}
        </ul>
      </div>
  ` : '')
  +
  `</div>`

  return html;
}

function setResult(result) {
  console.log(result);
  var resultHTML = createHTMLforWord(result.word, result.phonetic, result.phonetics.find(el => el.audio)?.audio);
  result.meanings.forEach(item => {
    resultHTML += createHTMLforType(item)
  })
  document.getElementById('result').innerHTML = resultHTML;
  clear(searchInput);
}

function clear(input) {
  input.value = "";
}

const searchBtn = document.getElementById('btn-search');

searchBtn.addEventListener('click', getMeaning);

const searchInput = document.getElementById('js-search-input');

getMeaning();

searchInput.addEventListener('keypress', event => {
  if(event.key == 'Enter') getMeaning();
});

searchInput.addEventListener('focusout', () => {
  if(document.getElementById('js-search-input').value) getMeaning();
});