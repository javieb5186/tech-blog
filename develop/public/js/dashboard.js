const newPostBtn = document.querySelector('#new-post-btn');
const updatePostBtns = document.querySelectorAll('.update-btn');
const deletePostBtns = document.querySelectorAll('.delete-btn');

// Go to new post
function goToNewPost(event) {
  event.preventDefault();

  fetch('/newpost')
    .then(() => {
      const { origin } = document.location;
      document.location.href = `${origin}/newpost`;
    })
    .catch((err) => console.log(err));
}

// Find the parent with the post id and go to update the post by id
function goToUpdatePost() {
  let parentFound = false;
  let el = this.parentElement;
  const count = 0;
  do {
    if (!el.id) {
      el = el.parentElement;
    } else if (el.id) {
      parentFound = true;
    }
  } while (!parentFound || count > 10);
  const postId = el.id;
  const { origin } = document.location;
  document.location.href = `${origin}/updatepost/${postId}`;
}

// Find the parent with the post id and delete post by id
function deletePost(event) {
  event.preventDefault();

  let parentFound = false;
  let el = this.parentElement;
  const count = 0;
  do {
    if (!el.id) {
      el = el.parentElement;
    } else if (el.id) {
      parentFound = true;
    }
  } while (!parentFound || count > 10);
  const postId = el.id;

  fetch(`/api/data/delete/${postId}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        const { origin } = document.location;
        document.location.href = `${origin}/dashboard`;
      }
    });
}

newPostBtn.addEventListener('click', goToNewPost);
updatePostBtns.forEach((el) => el.addEventListener('click', goToUpdatePost));
deletePostBtns.forEach((el) => el.addEventListener('click', deletePost));
