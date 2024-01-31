async function deleteFormHandler(event) {
  event.preventDefault();
  const id = document.querySelector('#recipe-id').value;
  console.log(id);
const response = await fetch(`/api/recipe/${id}`, {
      method: 'DELETE',
    });
  
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
  
const deleteButton = document.querySelector('.delete-button');
  deleteButton.addEventListener('click', deleteFormHandler);