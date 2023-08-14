const newPostBtn = document.querySelector('#new-post-btn');
const updatePostBtns = document.querySelectorAll('.update-btn');
const deletePostBtns = document.querySelectorAll('.delete-btn');

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

function goToUpdatePost() {
  let parentFound = false; 
  let el = this.parentElement;
  let count = 0;
  do {
    if (!el.id) {
      el = el.parentElement;
    } else if (el.id) {
      parentFound = true;
    }
  } while (!parentFound || count > 10);
  const postId = el.id;
  const origin = document.location.origin;
  document.location.href = `${origin}/updatepost/${postId}`;
}

function deletePost(event) {
  event.preventDefault();
  fetch(`/api/data/delete/${postId}`, {
    method: 'DELETE'
  })
  .then(res => {
    if (res.ok) {
      const origin = document.location.origin;
      document.location.href = `${origin}/dashboard`;
    }
  });
}

newPostBtn.addEventListener('click', goToNewPost);
updatePostBtns.forEach(el => el.addEventListener('click', goToUpdatePost))
deletePostBtns.forEach(el => el.addEventListener('click', deletePost));