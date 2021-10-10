import { renderApp } from './app/getImages';
import { renderHome } from './pages/home';
import { renderUserPage } from './pages/user';
import { renderLogin } from './user/login';
import { renderSignUp } from './user/signUp';

const navLoginButton = document.getElementById('login-navbar');
const navSignupButton = document.getElementById('signup-navbar');

const navLogoutBtnFunction = () => {
	const navBar = document.getElementById('nav-buttons');
	const navTitle = document.getElementById('web-title');

	const template = `
    <a id="login-navbar" class="button is-info" href="">Login</a>
    <a id="signup-navbar" class="button is-info ml-3 mr-3" href="">Sign up</a>
    `;

	navBar.innerHTML = template;
	navTitle.removeEventListener('click', renderApp);
	renderHome();
};

const navLoggedBtnFunctions = () => {
	const userBtn = document.getElementById('user-navbar');
	const logoutBtn = document.getElementById('logout-navbar');

	userBtn.addEventListener('click', (e) => {
		e.preventDefault();
		renderUserPage();
	});

	logoutBtn.addEventListener('click', () => {
		localStorage.removeItem('token');
		navLogoutBtnFunction();
	});
};

export const navBarOnUserLikes = () => {
	const navBar = document.getElementById('nav-buttons');
	const template = `<a id="gotoapp-navbar" class="button is-hidden-mobile is-info" href="">Go to app</a>
    <a id="logout-navbar" class="button is-hidden-mobile is-info ml-3 mr-3" href="">Log out</a>`;

	navBar.innerHTML = template;
	const logoutBtn = document.getElementById('logout-navbar');
	const goToAppBtn = document.getElementById('gotoapp-navbar');

	goToAppBtn.addEventListener('click', renderApp);
	logoutBtn.addEventListener('click', () => {
		localStorage.removeItem('token');
		navLogoutBtnFunction();
	});
};

export const navbarOnUserLoged = () => {
	const navTitle = document.getElementById('web-title');
	const navBar = document.getElementById('nav-buttons');
	const template = `<a id="user-navbar" class="button is-hidden-mobile is-info" href="">User Likes</a>
    <a id="logout-navbar" class="button is-hidden-mobile is-info ml-3 mr-3" href="">Log out</a>`;

	navBar.innerHTML = template;

	navTitle.addEventListener('click', renderApp);

	navLoggedBtnFunctions();
};

navLoginButton.addEventListener('click', (e) => {
	e.preventDefault();
	renderLogin();
});

navSignupButton.addEventListener('click', (e) => {
	e.preventDefault();
	renderSignUp();
});
