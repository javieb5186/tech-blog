const loginForm = document.querySelector('#login-form');
const signUpForm = document.querySelector('#signup-form');

const loginLink = document.querySelector('#login-link');
const signupLink = document.querySelector('#signup-link');
const canvasTitle = document.querySelector('#oc-title');

canvasTitle.innerText = 'Log In';

function toggleLoginSignup(event) {
  event.preventDefault();

  const form = event.target.parentElement.parentElement.id;

  if (form === 'login-form') {
    canvasTitle.innerText = 'Sign Up';
    signUpForm.setAttribute('class', 'show');
    loginForm.setAttribute('class', 'hide');
  } 
  else if (form === 'signup-form') {
    canvasTitle.innerText = 'Log in';
    loginForm.setAttribute('class', 'show');
    signUpForm.setAttribute('class', 'hide');
  }
}

function logIn(event) {
  event.preventDefault();

  const formData = document.querySelectorAll('#login-form div input');

  if (formData[0].id === 'username' && formData[1].id === 'pwd') {
    const username = formData[0].value.trim();
    const password = formData[1].value.trim();

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then(res => {
      if (res.ok) {
        const origin = document.location.origin;
        document.location.href = `${origin}/`;
      }
    })
    .catch(err => console.log(err));
  } else {
    console.log('Detected inccorectly');
  }
}

function signUp(event) {
  event.preventDefault();

  const formData = document.querySelectorAll('#signup-form div input');
  console.log(formData);

  if (formData[0].id === 'username' && formData[1].id === 'pwd' && formData[2].id === 'c-pwd') {
    if (formData[1].value.trim() == formData[2].value.trim()) {
      const username = String(formData[0].value.trim());
      const password = String(formData[1].value.trim());

      fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      .then(res => {
        if (res.ok) {
          const origin = document.location.origin;
          document.location.href = `${origin}/`;
        }
      })
      .catch(err => console.log(err));
    }
  }
}

loginForm.addEventListener('submit', logIn);
signUpForm.addEventListener('submit', signUp);
loginLink.addEventListener('click', toggleLoginSignup);
signupLink.addEventListener('click',toggleLoginSignup);