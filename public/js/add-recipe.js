const post = document.querySelector('#post-button');
//const { User } = require('../../models');



async function newPostHandler(event){
    event.preventDefault();
    
    const title = document.querySelector('#title').value;
    const ingredients = document.querySelector('#ingredients').value;
    const instructions = document.querySelector('#instructions').value;
    const author = document.querySelector('#author').value;
    const image = document.querySelector('#image').value;
     

   const response = await fetch('/api/recipe',{
    method:'POST',
    body: JSON.stringify({
        author, 
        title,
        ingredients,
        instructions,
        image,
       
        

      }),
    headers:{
        'Content-Type':'application/json',
    },
});
if (response.ok) {
   console.log(response);
   alert('success in posting your recipe!')
    document.location.replace('/profile');
  } else {
    alert('Failed to add dish');
  }

};

document.querySelector('.new-recipe-form');
post.addEventListener('click', newPostHandler);

