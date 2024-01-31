async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#search-text').value;
  //console.log(search, "Search");

  console.log(JSON.stringify(title));

  const response = await fetch(`/api/recipe/search`, {
    method: 'POST',
    body: JSON.stringify({
      title,

    }),
    headers: {
      'Content-Type': 'application/json',
    },

  });

  if (response.ok) {
    let recipe = await response.json();
    console.log(recipe);
    window.location.replace(`/recipe/${recipe.id}`);
    console.log(response);
  } else {
    alert('Failed to get recipes');
  }

}

const submitButton = document.querySelector('#submit-search-button')

submitButton.addEventListener('click', newFormHandler);





