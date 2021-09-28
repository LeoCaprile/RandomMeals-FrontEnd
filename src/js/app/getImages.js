import { renderContent } from '../..';

const templateApp = (foodImg, foodName) => {
	return `
	<div id="title--food" class="title has-text-centered">${foodName}</div>
        
	<div class="is-flex is-justify-content-center">
		<div id="like__container" class="like--container is-flex is-align-self-center">
			<div id="like" class="like heart_hover fas fa-heart fa-7x"></div>
			<div class="dislike heart_hover fas fa-heart-broken fa-7x"></div>
	</div>
		
	<div id="food-thumbnail">
		   <img class="img-app" src="${foodImg}">
	</div>

	</div>`;
};

function appButtonFunctions(mealID) {
	const likebutton = document.querySelector('.like'),
		dislikebutton = document.querySelector('.dislike'),
		likeContainer = document.getElementById('like__container');

	function resetButton(element) {
		setTimeout(() => {
			element.classList.add('heart_hover');
			element.classList.remove('animation__zoomscreen');
			appInit();
			likeContainer.classList.remove('no-cursor-event');
		}, 300);
	}

	function clickButton(element) {
		element.classList.remove('heart_hover');
		element.classList.add('animation__zoomscreen');
		likeContainer.classList.add('no-cursor-event');
	}

	likebutton.addEventListener('click', () => {
		addLikeToUser(mealID);
		clickButton(likebutton);
		resetButton(likebutton);
	});

	dislikebutton.addEventListener('click', () => {
		clickButton(dislikebutton);
		resetButton(dislikebutton);
	});
}

const addLikeToUser = (Mealid) => {
	const MealID = Mealid;
	fetch('https://api-randonmeals.herokuapp.com/auth/addLike', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token')
		},
		body: JSON.stringify({ MealID })
	});
};

function appInit() {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php', { method: 'GET' })
		.then((data) => data.json())
		.then((data) => {
			const foodContainer = document.getElementById('app_main'),
				fetchedFoodImg = data.meals[0].strMealThumb,
				fetchedFoodName = data.meals[0].strMeal,
				fetchedFoodID = data.meals[0].idMeal;

			foodContainer.innerHTML = templateApp(fetchedFoodImg, fetchedFoodName);

			appButtonFunctions(fetchedFoodID);
		});
}

export const renderApp = () => {
	renderContent('app_container', 'app_render');
	appInit();
};
