const formTitle = document.querySelector('#title');
const formContent = document.querySelector('#content');
const submit = document.querySelector('#submit');
const categories = document.querySelector('#categories');

const user = 'jaybay';

function submitPost(event) {
  event.preventDefault();

  const title = formTitle.value.trim();
  const content = formContent.value.trim();
  const category = categories.value.trim();

  fetch('/api/data/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, category, user }),
  })
  .then(res => res.json())
  .then(r => console.log(r));
}

submit.addEventListener('click', submitPost);
