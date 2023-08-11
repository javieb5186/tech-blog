const logoutBtn = document.querySelector('#logout-btn');

function logout(event) {
  event.preventDefault();

  fetch('/logout')
  .then(res => {
    if (res.ok) {
      const origin = document.location.origin;
      document.location.href = `${origin}/`;
    }
  })
}

logoutBtn.addEventListener('click', logout);