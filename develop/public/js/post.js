const formTitle = document.querySelector('#title');
const formContent = document.querySelector('#content');
const submit = document.querySelector('#submit');
const categories = document.querySelector('#categories');

function submitPost(event) {
  event.preventDefault();

  const title = formTitle.value.trim();
  const content = formContent.value.trim();
  const category = categories.value.trim();

  fetch('/api/data/post', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, category }),
  })
  .then(() => {
    const origin = document.location.origin;
    document.location.href = `${origin}/dashboard`;
  });
}

submit.addEventListener('click', submitPost);
