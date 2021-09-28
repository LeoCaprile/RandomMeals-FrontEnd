import { renderContent } from '../..';
import { navbarOnUserLoged, onUserLoged } from '../navbar';
import { renderApp } from '../app/getImages';
import { renderHome } from '../pages/home';

export const userIsLoggedIn = () => {
	if (localStorage.getItem('token')) {
		navbarOnUserLoged();
		renderApp();
	} else {
		renderHome();
	}
};
