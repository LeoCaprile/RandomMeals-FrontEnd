import { renderContent } from '../../';
import { userIsLoggedIn } from './userLoged';

export const unHideElement = (warnID, time = 1500) => {
	const warning = document.getElementById(warnID);
	warning.classList.remove('is-hidden');
	setTimeout(() => {
		warning.classList.add('is-hidden');
	}, time);
};

const loginButtonFunc = () => {
	const iniciarSesion = document.getElementById('iniciarsesion');
	iniciarSesion.onsubmit = (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value;
		if (!email.includes('@') || !email.includes('.')) {
			return unHideElement('emailwarning');
		}
		const password = document.getElementById('password').value;
		if (password <= 0) {
			return unHideElement('passwarning');
		}
		fetch('https://api-randonmeals.herokuapp.com/auth/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				if (!res.success && res.type === 'email or pass') {
					unHideElement('notification-box-error-1', 2500);
				} else if (!res.success && res.type === 'pass') {
					unHideElement('notification-box-error-2', 2500);
				} else {
					localStorage.setItem('token', res.token);
					userIsLoggedIn();
				}
			});
	};
};

export const renderLogin = () => {
	renderContent('app_container', 'log_render');
	loginButtonFunc();
};
