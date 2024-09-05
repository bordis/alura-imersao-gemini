fetch('https://thronesapi.com/api/v2/Characters')
    .then(response => response.json())
    .then(data => {
      // Processar os dados da API e criar os objetos
      listaDePersonagens = data.map(personagemApi => ({
        fullName: personagemApi.fullName,
        title: personagemApi.title,
        family: personagemApi.family,
        image: personagemApi.imageUrl
      }));
      displayCharacters('');
})
.catch(error => {
  console.error('Erro ao buscar os dados da API:', error);
});

 // Display all characters when the page loads

function displayCharacters(searchValue) {
      console.log('searchValue:', searchValue);
      const cardContainer = document.querySelector('.card-resultado');  // Target the container element
      // Clear existing content to avoid duplicates (optional)
      cardContainer.innerHTML = '';
      const filteredCharacters = listaDePersonagens.filter(personagem => {
        const fullName = personagem.fullName.toLowerCase();
        return searchValue.toLowerCase() === '' || fullName.includes(searchValue.toLowerCase());
      });

      filteredCharacters.forEach(personagem => {
        const card = document.createElement('div');
        card.classList.add('card-resultado__item'); // Add a class for styling (optional)
        const name = document.createElement('h2');
        name.textContent = personagem.fullName;
        const image = document.createElement('img');
        image.src = personagem.image;
        image.alt = personagem.fullName; // Set alt text for accessibility
        const title = document.createElement('p');
        title.textContent = personagem.title;
        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(title);
        cardContainer.appendChild(card);
      });
}

function pesquisar(valor) {
  displayCharacters(valor);
}
