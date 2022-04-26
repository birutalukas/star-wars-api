import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState(null);
    const [error, setError] = useState(null);

    const fetchMovies = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch("https://swapi.dev/api/films");

            if (!response.ok) {
                const message = `An error has occured: ${response.status}`;

                throw new Error(message);
            }

            const data = await response.json();

            const transformedData = data.results.map((item) => ({
                id: item.episode_id,
                title: item.title,
                releaseDate: item.release_date,
                openingText: item.opening_crawl,
            }));

            setIsLoading(false);

            setMovies(transformedData);
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    let content = <p>No movies found!</p>;

    if (isLoading) {
        content = <p>Loading....</p>;
    }
    if (!isLoading && movies && movies.length > 0) {
        content = <MoviesList movies={movies} />;
    }

    if (!movies && error) {
        content = <p>{error}</p>;
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovies}>Fetch Movies!</button>
            </section>
            <section>{content}</section>
        </React.Fragment>
    );
}

export default App;
