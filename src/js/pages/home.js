import { renderContent, toggleBlockScrolling } from '../..';
import { renderLogin } from '../user/login';

function homeButtonFunctions() {
	const homeButton = document.getElementById('home_button');
	homeButton.addEventListener('click', () => {
		const token = JSON.stringify(localStorage.getItem('token'));
		console.log(token);
		if (token) {
			//render app page
		}
		{
			renderLogin();
		}
	});
}

export const renderHome = () => {
	renderContent('app_container', 'home_render');

	homeButtonFunctions();
};
