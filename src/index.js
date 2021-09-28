import './styles.css';
import 'animate.css';
import './js/navbar';
import { renderHome } from './js/pages/home';
import { userIsLoggedIn } from './js/user/userLoged';
import { fetchingUserLikes } from './js/pages/user';

const appContent = document.getElementById('app_container').innerHTML;
export const renderContent = (rootId, contentId) => {
	document.getElementById(rootId).innerHTML = appContent;
	const contentToRender = document.getElementById(contentId);
	document.getElementById(rootId).innerHTML = contentToRender.innerHTML;
};

userIsLoggedIn();
