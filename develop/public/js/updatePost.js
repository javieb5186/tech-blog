const postId = document.querySelector('h2').id;
const formTitle = document.querySelector('#title');
const formContent = document.querySelector('#content');
const formCategory = document.querySelector('#categories');
const updateBtn = document.querySelector('#submit');

function update(event) {
  event.preventDefault();

  const title = formTitle.value.trim();
  const content = formContent.value.trim();
  const category = formCategory.value.trim();
  
  fetch(`/api/data/update/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, category}),
  })
  .then(res => {
    if (res.ok) {
      const origin = document.location.origin;
      document.location.href = `${origin}/dashboard`;
    }
  });
}

updateBtn.addEventListener('click', update);