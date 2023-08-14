const cards = document.querySelectorAll('.large-card');

function goToPost() {
  console.log(this.id);

  const { origin } = document.location;
  document.location.href = origin + `/post/${this.id}`;
}

cards.forEach((card) => {
  card.addEventListener('click', goToPost);
});
