const addCommentBtn = document.querySelector('#comment-btn');
const postId = document.querySelector('.large-card').id;
const comment = document.querySelector('#comment');

function addComment(event) {
  event.preventDefault();

  const content = comment.value.trim();

  // Create a post and if everything went okay, redirect
  fetch('/api/data/comment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, postId }),
  })
    .then((res) => {
      if (res.ok) {
        const { origin } = document.location;
        document.location.href = `${origin}/post/${postId}`;
      }
    });
}

addCommentBtn.addEventListener('click', addComment);
