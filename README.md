# Cocktail DB project

![image](https://i.imgur.com/1f85L15.jpg)


# Technologies used
* React
* JavaScript (ES6)
* HTML5
* CSS


## Cocktail DB API - React project

The brief was to:
* Consume a publicly available API
* Deliver the data back in a React app

The project consumes data from [CocktailDB API](https://www.thecocktaildb.com/api.php).

The site can be run locally by cloning the repository and typing ```npm i``` and then ```npm run serve``` in the terminal.

### App overview

![image](https://i.imgur.com/OLOn8ea.png)

The application allows a user to search for a cocktail by single ingredient or name of the cocktail, returning the results under the search input.

Clicking on a cocktail provides information on the ingredients and instructions on how to make the cocktail.

![image](https://i.imgur.com/K6huWYt.png)



### Development process

Three endpoints were chosen:

* Search cocktail by name: www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita
* Lookup ingredient by ID: www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=552


The main page is rendered from four components ```Home.js```, ```CocktailList.js```, ```Navbar.js``` and ```SearchForm.js```.

The CocktailList components takes the data from the cocktails array, which located in ../context.js, then use map function to render each indiviudal "preview thumbsnail" cocktail card.
```
const CocktailList = () => {
	const { cocktails, loading } = useGlobalContext(); //bring the cocktails and loading value from context.js
	//where cocktails are all the value from the api into an array and loading is a boolean

	if (loading) {
		return <Loading />;
	}
	if (cocktails.length < 1) {
		return <h2 className='section-title'>No cocktails matched your search.</h2>;
	}
	return (
		<section className='section'>
			<h2 className='section-title'>Cocktails</h2>
			<div className='cocktails-center'>
				{cocktails.map((item) => {
					return <Cocktail key={item.id} {...item} />;
				})}
			</div>
		</section>
	);
};
```

#### Cocktail detail page

The delivery of the ingredients was a challenge because the data from the API was unstructured with many empty or null values, and the drinks and measures separated in to different key: value pairs.

This was resolved by organizing the response data:

```
useEffect(() => {
		setLoading(true);
		async function getCocktail() {
			try {
				const response = await fetch(`${url}${id}`);
				const data = await response.json();
				if (data.drinks) {
					const {
						strDrink: name,
						strDrinkThumb: image,
						strAlcoholic: info,
						strCategory: category,
						strGlass: glass,
						strInstructions: instructions,
						strIngredient1,
						strIngredient2,
						strIngredient3,
						strIngredient4,
						strIngredient5,
					} = data.drinks[0];
					const ingredients = [
						strIngredient1,
						strIngredient2,
						strIngredient3,
						strIngredient4,
						strIngredient5,
					];
					const newCocktail = {
						name,
						image,
						info,
						category,
						glass,
						instructions,
						ingredients,
					};
					setCocktail(newCocktail);
				} else {
					setCocktail(null);
				}
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		}
		getCocktail();
	}, [id]);
```

