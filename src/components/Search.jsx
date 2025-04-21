import React, { useEffect } from 'react'
import styles from './search.module.css'

const URL = 'https://api.spoonacular.com/recipes/complexSearch'; // Will store this later on environment variables
// const API_KEY = 'STORED TO .env'; // Will store this later on environment variables
const API_KEY = import.meta.env.VITE_API_KEY;


function Search({foodData, setFoodData}) {
    const [query, setQuery] = React.useState('pizza');

    //Syntax of the useEffect hook
    useEffect(() => {
        async function fetchFood() {
            const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`)
            const data = await res.json();
            console.log(data.results);
            setFoodData(data.results);
        }
        fetchFood();
    }, [query]); // The second argument is the dependency array. The useEffect will run when the component mounts and when the query changes.
                 // The useEffect hook is used to perform side effects in function components. It can be used to fetch data, update the DOM, and more.
 
  return (
    <div className={styles.searchContainer}>
        <input
        className={styles.input}
        placeholder="Search for food..."
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
        type="text" />
    </div>
  )
}

export default Search