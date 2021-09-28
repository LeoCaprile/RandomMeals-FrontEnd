function getIngredientsAndMeasures(id) {
	let dict = {};
	fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, { method: 'GET' })
		.then((data) => data.json())
		.then((data) => {
			let arrIng = [],
				arrMes = [];
			for (const [ key, value ] of Object.entries(data.meals[0])) {
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
		});
}
