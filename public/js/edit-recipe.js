async function newFormHandler(event){
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const ingredients = document.querySelector('#ingredients').value;
    const instructions = document.querySelector('#instructions').value;
    const comments = document.querySelector('#comments').value;
    const userid = document.querySelector('#userid').value;
    const id = document.querySelector('#recipe-id').value;
   

const response = await fetch(`api/recipe/${id}`,{
    method:'PUT',
    body:JSON.stringify({
        title,
        description,
        ingredients,
        instructions,
        comments,
        userid
    }),
    headers:{
        'Content-Type':'application/json',
    },
});

if (response.ok) {
    alert('Recipe updated successfully');
    document.location.replace(`/profile`);

  } else {
    alert('Failed to edit dish');
  }

}

const newRecipeForm = document.querySelector('.new-recipe-form');
newRecipeForm.addEventListener('submit', newFormHandler);