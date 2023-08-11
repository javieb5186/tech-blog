const newPostBtn = document.querySelector('#new-post-btn');

function goToNewPost(event) {
  event.preventDefault();

  console.log(this);

  fetch('/newpost')
  .then(() => {
    const origin = document.location.origin;
    document.location.href = `${origin}/newpost`;
  })
  .catch(err => console.log(err));
}

newPostBtn.addEventListener('click', goToNewPost);