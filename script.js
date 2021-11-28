let currentPokemon;
let currentSpecies;

async function loadPokemon(index) {
  let url = `https://pokeapi.co/api/v2/pokemon/${index}`;
  let response = await fetch(url);
  currentPokemon = await response.json();
}

async function loadSpecies(index) {
  let url = `https://pokeapi.co/api/v2/pokemon-species/${index}/`;
  let response = await fetch(url);
  currentSpecies = await response.json();
}

async function renderPokemon() {
  for (let i = 1; i < 140; i++) {
    await loadPokemon(i);
    let pokemonPicture = currentPokemon.sprites.other.dream_world.front_default;
    let pokemonName = currentPokemon.name;
    pokemonName = capitalizeFirstLetter(pokemonName);
    document.getElementById('pokemon').innerHTML += `
    <div id="${i}" onclick="pokemonFocus(${i})" class="card m-1">
        <div class="row g-0">
            <div class="col-md-8">
                <div id="pokemon${i}" class="card-body">
                <h5 class="card-title">${pokemonName}</h5>
                <img src="${pokemonPicture}" class="pokemonImg">
                <img src="img/pokeball.png" class="pokeballImg">
                </div>
            </div>
        </div>
    </div>
    `;
    types(i);
  }
}

async function pokemonFocus(index) {
  await loadPokemon(index);
  await loadSpecies(index);
  let pokemonImg =
    currentPokemon.sprites.other['official-artwork'].front_default;
  let focusDiv = document.getElementById('pokemonFocus');
  let pokemonName = currentPokemon.name;
  pokemonName = capitalizeFirstLetter(pokemonName);
  let pokemonHeight = Math.round(currentPokemon.height * 10);
  let pokemonWeight = Math.round(currentPokemon.weight * 0.1);
  let pokemonStats = currentPokemon.stats;
  let species = currentSpecies.genera[4].genus;

  focusDiv.innerHTML = `
    <div id="focusHeader" class="focusHeader">
        <div>
          <button onclick="backToPokemon()"><img src="img/arrow-88-32.ico" alt="" /></button>
          <h1>${pokemonName}</h1>
        </div>
    </div>
    <div class="focusBody">
        <img class="focusImg" src="${pokemonImg}" alt="" />
        <div class="card text-center">
          <div class="card-header">
            <ul
              class="
                nav nav-tabs
                card-header-tabs
                w-100
                d-flex
                justify-content-evenly
              "
            >
              <li class="nav-item">
                <a id="aboutLink" onclick="showTables(1)" class="nav-link active" aria-current="true">About</a>
              </li>
              <li class="nav-item">
                <a id="statsLink" onclick="showTables(2)" class="nav-link inactive">Base Stats</a>
              </li>
            </ul>
          </div>
          <div class="card-body">
            <table id="about" class="show">
              <tr>
                <td>Spezies</td>
                <td>${species}</td>
              </tr>
              <tr>
                <td>Größe</td>
                <td>${pokemonHeight}</td>
              </tr>
              <tr>
                <td>Gewicht</td>
                <td>${pokemonWeight}</td>
              </tr>
            </table>
            <table id="stats" style="display: none;">
              <tr>
                <td>Leben</td>
                <td id="Stat0"></td>
                <td>
                    <div class="progress">
                        <div id="StatProg0" class="progress-bar " role="progressbar" ></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>Angriff</td>
                <td id="Stat1"></td>
                <td>
                    <div class="progress">
                        <div id="StatProg1" class="progress-bar " role="progressbar" ></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>Verteidigung</td>
                <td id="Stat2"></td>
                <td>
                    <div class="progress">
                        <div id="StatProg2" class="progress-bar " role="progressbar" ></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>Spez.-Angriff</td>
                <td id="Stat3"></td>
                <td>
                    <div class="progress">
                        <div id="StatProg3" class="progress-bar " role="progressbar" ></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>Spez.-Verteidigung</td>
                <td id="Stat4"></td>
                <td>
                    <div class="progress">
                        <div id="StatProg4" class="progress-bar " role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="200"></div>
                    </div>
                </td>
              </tr>
              <tr>
                <td>Geschwindigkeit</td>
                <td id="Stat5"></td>
                <td>
                    <div class="progress">
                        <div id="StatProg5" class="progress-bar " role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="200"></div>
                    </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
  `;
  printStats(pokemonStats);
  typesFocus(index);
  hidePokemon();
}

function hidePokemon() {
  document.getElementById('pokemon').style.display = 'none';
  document.getElementById('navbar').style.display = 'none';
  document.getElementById('pokemonFocus').style.display = 'block';
}

function showTables(index) {
  let about = document.getElementById('about');
  let stats = document.getElementById('stats');
  let aboutLink = document.getElementById('aboutLink');
  let statsLink = document.getElementById('statsLink');
  if (index == 1) {
    about.style.display = 'table';
    stats.style.display = 'none';
    aboutLink.classList.add('active');
    statsLink.classList.remove('active');
  }
  if (index == 2) {
    stats.style.display = 'table';
    about.style.display = 'none';
    aboutLink.classList.remove('active');
    statsLink.classList.add('active');
  }
}

function backToPokemon() {
  document.getElementById('pokemon').style.display = 'flex';
  document.getElementById('navbar').style.display = 'flex';
  document.getElementById('pokemonFocus').style.display = 'none';
}

function printStats(pokemonStats) {
  for (let i = 0; i < pokemonStats.length; i++) {
    const stat = pokemonStats[i];
    let percentageProgress = Math.round((stat.base_stat / 150) * 100);
    document.getElementById('Stat' + i).innerHTML = `${stat.base_stat}`;
    document.getElementById(
      'StatProg' + i
    ).style.width = `${percentageProgress}%`;
  }
}

function search() {
  let searchInput = document.getElementById('searchInput').value;
  searchInput = searchInput.toLowerCase();
  let searchValue = [];
  let pokemonNames = document.getElementsByTagName('h5');
  for (let i = 1; i < 140; i++) {
    document.getElementById(i).style.display = 'none';
  }
  for (let i = 0; i < pokemonNames.length; i++) {
    const pokemonName = pokemonNames[i];
    if (pokemonName.innerText.toLowerCase().includes(searchInput)) {
      searchValue.push(
        pokemonName.parentElement.parentElement.parentElement.parentElement.id
      );
    }
  }
  searchValue.forEach((id) => {
    document.getElementById(id).style.display = 'flex';
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function types(i) {
  let currentTypeDiv = document.getElementById('pokemon' + i);
  let currentTypes = currentPokemon.types;
  for (let j = 0; j < currentTypes.length; j++) {
    const currentType = currentTypes[j].type.name;
    currentTypeDiv.innerHTML += `
        <div class="type">${currentType}</div>
        `;
  }
  bgPicker(i, currentTypes);
}
function typesFocus(i) {
  let currentTypeDiv = document.getElementById('focusHeader');
  let currentTypes = currentPokemon.types;
  for (let j = 0; j < currentTypes.length; j++) {
    const currentType = currentTypes[j].type.name;
    currentTypeDiv.innerHTML += `
        <div class="type">${currentType}</div>
        `;
  }
  bgPickerFocus(currentTypes);
}

function bgPicker(i, currentType) {
  if (currentType[0].type.name == 'electric') {
    document.getElementById(i).style.backgroundColor = '#fff23d';
    document.getElementById(i).style.color = 'black';
  }
  if (currentType[0].type.name == 'ice') {
    document.getElementById(i).style.backgroundColor = '#b5f4f7';
    document.getElementById(i).style.color = 'black';
  }
  if (currentType[0].type.name == 'grass') {
    document.getElementById(i).style.backgroundColor = '#4acfb2';
  }
  if (currentType[0].type.name == 'fire') {
    document.getElementById(i).style.backgroundColor = '#fc6c6e';
  }
  if (currentType[0].type.name == 'water') {
    document.getElementById(i).style.backgroundColor = '#75bafc';
  }
  if (currentType[0].type.name == 'bug') {
    document.getElementById(i).style.backgroundColor = '#d3fc75';
    document.getElementById(i).style.color = 'black';
  }
  if (currentType[0].type.name == 'normal') {
    document.getElementById(i).style.backgroundColor = '#bdbc93';
    document.getElementById(i).style.color = 'black';
  }
  if (currentType[0].type.name == 'ground') {
    document.getElementById(i).style.backgroundColor = '#ffde26';
    document.getElementById(i).style.color = 'black';
  }
  if (currentType[0].type.name == 'poison') {
    document.getElementById(i).style.backgroundColor = '#9626ff';
  }
  if (currentType[0].type.name == 'fairy') {
    document.getElementById(i).style.backgroundColor = '#ff97f1';
  }
  if (currentType[0].type.name == 'fighting') {
    document.getElementById(i).style.backgroundColor = '#fff9d6';
    document.getElementById(i).style.color = 'black';
  }
  if (currentType[0].type.name == 'psychic') {
    document.getElementById(i).style.backgroundColor = '#af7ef0';
  }
  if (currentType[0].type.name == 'rock') {
    document.getElementById(i).style.backgroundColor = '#c7c951';
  }
  if (currentType[0].type.name == 'ghost') {
    document.getElementById(i).style.backgroundColor = '#8af4f8';
  }
}
function bgPickerFocus(currentType) {
  if (currentType[0].type.name == 'electric') {
    document.getElementById('focusHeader').style.backgroundColor = '#fff23d';
  }
  if (currentType[0].type.name == 'ice') {
    document.getElementById('focusHeader').style.backgroundColor = '#b5f4f7';
  }
  if (currentType[0].type.name == 'grass') {
    document.getElementById('focusHeader').style.backgroundColor = '#4acfb2';
  }
  if (currentType[0].type.name == 'fire') {
    document.getElementById('focusHeader').style.backgroundColor = '#fc6c6e';
  }
  if (currentType[0].type.name == 'water') {
    document.getElementById('focusHeader').style.backgroundColor = '#75bafc';
  }
  if (currentType[0].type.name == 'bug') {
    document.getElementById('focusHeader').style.backgroundColor = '#d3fc75';
  }
  if (currentType[0].type.name == 'normal') {
    document.getElementById('focusHeader').style.backgroundColor = '#bdbc93';
  }
  if (currentType[0].type.name == 'ground') {
    document.getElementById('focusHeader').style.backgroundColor = '#ffde26';
  }
  if (currentType[0].type.name == 'poison') {
    document.getElementById('focusHeader').style.backgroundColor = '#9626ff';
  }
  if (currentType[0].type.name == 'fairy') {
    document.getElementById('focusHeader').style.backgroundColor = '#ff97f1';
  }
  if (currentType[0].type.name == 'fighting') {
    document.getElementById('focusHeader').style.backgroundColor = '#fff9d6';
  }
  if (currentType[0].type.name == 'psychic') {
    document.getElementById('focusHeader').style.backgroundColor = '#af7ef0';
  }
  if (currentType[0].type.name == 'rock') {
    document.getElementById('focusHeader').style.backgroundColor = '#c7c951';
  }
  if (currentType[0].type.name == 'ghost') {
    document.getElementById('focusHeader').style.backgroundColor = '#8af4f8';
  }
}
