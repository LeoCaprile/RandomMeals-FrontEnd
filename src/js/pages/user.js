import { renderContent, toggleBlockScrolling } from '../..';
import { navBarOnUserLikes } from '../navbar';

const templateHistoryItem = (imgSrc, title, YTSrc) => {
	return `
      
	<div class="columns item-user-box is-align-items-center box hover__item mt-3 mb-3">
	<div class="btn-delete delete is-large is-hidden-desktop"></div>
	<div class="column has-text-centered-mobile is-size-3-desktop is-hidden-desktop has-text-weight-bold">${title}</div>

			<div class="has-text-centered-mobile column is-2">
				<img src="${imgSrc}" width="150">
			</div>
			<div class="column has-text-centered-mobile is-size-3-desktop is-hidden-mobile has-text-weight-bold">${title}</div>
			<div class="is-flex is-flex-direction-column">
				<a target="__blank" href="${YTSrc}" class="button has-text-weight-bold">View Youtube Tutorial</a>
				<a  class="button view_recipe has-text-weight-bold">View Recipe</a>
			</div>
		<div  class="btn-delete delete is-large is-hidden-mobile"></div>
</div>

<div class="modal">
                    <div class="modal-background"></div>
                    <div class="modal-card">
                      <header class="modal-card-head">
                        <p class="modal-card-title">${title}</p>
                        <button class="delete is-large close_modal_button" aria-label="close"></button>
                      </header>
                      <section class="modal-card-body is-flex is-flex-direction-column">
                        <img class="modal-image" src="${imgSrc}" width="200">
                        <h1 class="title ml-2">Ingredients</h1>
                        <ul class="modal__ingredients">
                            
                        </ul>

                        <h1 class="title ml-2 mt-4">Instructions</h1>

                        <article id="instructions">

						</article>

                      </section>
                      <footer class="modal-card-foot">
                        <a href="${YTSrc}" class="button is-success">View on youtube</a>
                      </footer>
            </div>
     </div>
     `;
};

const templateNoItemsFound = `<i class="far fa-frown fa-5x"></i>
<h1 class="title"> Nothing in here, go back and give a like to some food</h1>`;

function deleteUserLike(mealIDtoDelete) {
	const mealID = mealIDtoDelete;
	fetch('https://api-randonmeals.herokuapp.com/auth/removeLike', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token')
		},
		body: JSON.stringify({ mealID })
	});
}

function fetchingUserLikes() {
	fetch('https://api-randonmeals.herokuapp.com/auth/getLikes', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			authorization: localStorage.getItem('token')
		}
	})
		.then((data) => data.json())
		.then((arr) => renderHistoryItems(arr));
}

function getIngredients(fetchedObj) {
	let dict = {};
	let arrIng = [],
		arrMes = [];
	for (const [ key, value ] of Object.entries(fetchedObj)) {
		if (key.includes('strIngredient') && !(value === '') && !(value === null)) {
			arrIng.push(value);
		}

		if (key.includes('strMeasure') && !(value === '') && !(value === null)) {
			arrMes.push(value);
		}
	}

	for (let i in arrIng) {
		dict[arrIng[i]] = arrMes[i];
	}

	return dict;
}
function addIngredientsAndMeasures(ingredientsData, ulToAppend) {
	for (const [ key, value ] of Object.entries(ingredientsData)) {
		const ingredient = document.createElement('li');
		ingredient.innerText = `${key} ${value == ' ' ? '' : '- ' + value}`;
		ulToAppend.append(ingredient);
	}
}

function renderHistoryItems(arrayOfIds) {
	const userHistoryContainer = document.querySelector('.history-container');

	if (arrayOfIds.length <= 0) {
		return (userHistoryContainer.innerHTML = templateNoItemsFound);
	}

	const loadingElement = document.createElement('div');
	loadingElement.setAttribute('class', 'history-container');
	loadingElement.innerHTML =
		'<h1 class="titulo is-size-3-mobile is-size-1-desktop">Liked food history!</h1><div class="spinner"><div>';

	userHistoryContainer.append(loadingElement);

	for (let id of arrayOfIds) {
		fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, { method: 'GET' })
			.then((data) => data.json())
			.then((data) => {
				const fetchedFoodImg = data.meals[0].strMealThumb,
					fetchedFoodName = data.meals[0].strMeal,
					fetchedYTUrl = data.meals[0].strYoutube,
					fetchedFoodID = data.meals[0].idMeal,
					fetchedJson = data.meals[0],
					fetchedInstructions = data.meals[0].strInstructions,
					ingredientObj = getIngredients(fetchedJson);

				const historyItem = document.createElement('div');
				historyItem.setAttribute('class', 'food-box');
				historyItem.setAttribute('data-id', fetchedFoodID);

				historyItem.addEventListener('click', (e) => {
					const btnDelete = e.target.classList.contains('btn-delete');
					const itemClass = historyItem.classList;
					if (btnDelete) {
						const recipeID = historyItem.getAttribute('data-id');
						deleteUserLike(recipeID);

						itemClass.remove('hover__item');
						itemClass.add('animate__fadeOutLeft');
						itemClass.add('animate__animated');

						setTimeout(() => {
							historyItem.remove();
							userHistoryContainer.children.length === 1
								? (userHistoryContainer.innerHTML = templateNoItemsFound)
								: '';
						}, 800);
					}
				});

				historyItem.innerHTML = templateHistoryItem(
					fetchedFoodImg,
					fetchedFoodName,
					fetchedYTUrl,
					fetchedInstructions
				);

				const ingredientList = historyItem.querySelector('.modal__ingredients'),
					modalBtn = historyItem.querySelector('.close_modal_button'),
					modalBox = historyItem.querySelector('.modal'),
					viewRecipeBtn = historyItem.querySelector('.view_recipe');

				const instructions = historyItem.querySelector('#instructions');
				const splitedInstructions = fetchedInstructions.split('.');

				for (let i of splitedInstructions) {
					const step = document.createElement('p');
					step.innerText = i;
					instructions.append(step);
				}

				viewRecipeBtn.addEventListener('click', () => {
					modalBox.classList.add('is-active');
				});
				modalBtn.addEventListener('click', () => {
					modalBox.classList.remove('is-active');
				});
				addIngredientsAndMeasures(ingredientObj, ingredientList);
				const spinner = userHistoryContainer.querySelector('.spinner');
				spinner !== null ? spinner.remove() : '';

				userHistoryContainer.append(historyItem);
			});
	}
}

export const renderUserPage = () => {
	renderContent('app_container', 'userHistory_render');
	navBarOnUserLikes();
	fetchingUserLikes();
};
