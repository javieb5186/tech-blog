const logoutLink = document.querySelector('#logout-link');
const dashboardLink = document.querySelector('#dashboard-link');

function logout(event) {
  event.preventDefault();

  fetch('/logout')
    .then((res) => {
      if (res.ok) {
        const { origin } = document.location;
        document.location.href = `${origin}/`;
      }
    });
}

function toDashboard(event) {
  event.preventDefault();

  fetch('/dashboard')
    .then((res) => {
      if (res.ok) {
        const { origin } = document.location;
        document.location.href = `${origin}/dashboard`;
      }
    })
    .catch((err) => console.log(err));
}

logoutLink.addEventListener('click', logout);
dashboardLink.addEventListener('click', toDashboard);
