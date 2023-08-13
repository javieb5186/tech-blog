const newPostBtn = document.querySelector('#new-post-btn');
const updatePostBtn = document.querySelector('#update-btn');
const deletePostBtn = document.querySelector('#delete-btn');
const postId = document.querySelector('.large-card').id;

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
  const origin = document.location.origin;
  document.location.href = `${origin}/updatepost/${postId}`;
}

function deletePost(event) {
  event.preventDefault();
  fetch(`/api/data/delete/${postId}`, {
    method: 'DELETE'
  })
  .then(res => {
    console.log(res);
    if (res.ok) {
      const origin = document.location.origin;
      document.location.href = `${origin}/dashboard`;
    }
  });
}

newPostBtn.addEventListener('click', goToNewPost);
updatePostBtn.addEventListener('click', goToUpdatePost);
deletePostBtn.addEventListener('click', deletePost);