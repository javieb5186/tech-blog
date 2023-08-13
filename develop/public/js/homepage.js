const cards = document.querySelectorAll('.large-card');

function goToPost() {
  console.log(this.id);

  const origin = document.location.origin;
  document.location.href = origin + `/post/${this.id}`
}

cards.forEach(card => {
  card.addEventListener('click', goToPost);
});