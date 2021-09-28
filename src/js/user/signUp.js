import { renderContent } from '../..';
import { unHideElement } from './login';

const signUpButtonFunc = () => {
	const signUp = document.getElementById('signup');
	signUp.onsubmit = (e) => {
		e.preventDefault();
		const email = document.getElementById('email').value;
		if (!email.includes('@') || !email.includes('.')) {
			return unHideElement('emailwarning');
		}
		const password = document.getElementById('password').value;
		if (password <= 0) {
			return unHideElement('passwarning');
		}
		fetch('https://api-randonmeals.herokuapp.com/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) {
					unHideElement('notification-box-error', 2500);
				} else {
					unHideElement('notification-box-success', 2500);
				}
			});
	};
};

export const renderSignUp = () => {
	renderContent('app_container', 'signup_render');
	signUpButtonFunc();
};
