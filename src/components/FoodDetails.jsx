import React, { useEffect } from 'react';
import styles from './fooddetails.module.css';
import ItemList from './ItemList';

export default function FoodDetails ({foodId}) {
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;
    // const API_KEY = 'STORED TO .env'; // Will store this later on environment variables
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [food, setFood] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        async function fetchFood () {
            const res = await fetch(`${URL}?apiKey=${API_KEY}`);
            const data = await res.json();
            console.log(data);
            setFood(data)
            setIsLoading(false)
        }
        fetchFood()
    }, [foodId]); 

    return (
        <div>
            <div className={styles.recipeCard}>
                <h1 className={styles.recipeName}>{food.title}</h1>
                <img className={styles.recipeImage} src={food.image} alt="" />
                <div className={styles.recipeDetails}>
                    <span><strong>⏲{food.readyInMinutes} Minutes</strong></span>
                    <span>👨‍👩‍👧‍👦<strong>Serves {food.servings}</strong></span>
                    <span><strong>{food.vegetarian ? "🥕 Vegetarian" : "🍖 Non-Vegetarian"}</strong></span>
                    <span><strong>{food.vegan ? 'Vegan' : ''}</strong></span>
                </div>
                <div>
                    $<span><strong>{food.pricePerServing/100} Per serving</strong></span>
                </div>
                <h2>Ingredients</h2>
                <ItemList food={food} isLoading={isLoading}/>
                {/*{food.extendedIngredients.map((ingredient) => (
                    <div>
                        {isLoading ?
                        <p>Loading...</p> :
                        <img src={`https://spoonacular.com/cdn/ingredients_100x100/` + ingredient.image} alt="" />}
                        <h3>{ingredient.name}</h3>
                        <h3>{ingredient.amount} {ingredient.unit}</h3>
                    </div>
                ))} */}
                <h2>Instructions</h2>
                <div className={styles.recipeInstructions}>
                    <ol>
                        {isLoading ? 
                        <p>Loading...</p> : 
                        food.analyzedInstructions[0].steps.map((step) => (<li key={step.number}>{step.step}</li>))}
                    </ol>
                </div>
            </div>
        </div>
    )

}