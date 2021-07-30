import React, { useState, useContext, useEffect } from 'react';
import { useCallback } from 'react';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('a');
	const [cocktails, setCocktails] = useState([]);

	const fetchDrinks = useCallback(async () => {
		setLoading(true); //when you type the keywords, show loading status
		try {
			const response = await fetch(`${url}${searchTerm}`); //fetching the API
			const data = await response.json();
			const { drinks } = data;
			if (drinks) {
				//check the json data from the api and deconstruct to sub categories according to json file.
				const newCocktails = drinks.map((item) => {
					const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
						item;
					return {
						//custom some names for those properties for conveniences
						id: idDrink,
						name: strDrink,
						image: strDrinkThumb,
						info: strAlcoholic,
						glass: strGlass,
					};
				});
				setCocktails(newCocktails); //put the result into the cocktail array
			} else {
				setCocktails([]);
			}
			setLoading(false);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}, [searchTerm]);

	useEffect(() => {
		fetchDrinks();
	}, [searchTerm, fetchDrinks]);

	return (
		<AppContext.Provider
			value='hello'
			value={{ loading, searchTerm, cocktails, setSearchTerm }}
		>
			{children}
		</AppContext.Provider>
	);
};
// make sure use
export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
