import { useEffect, useState } from "react";
import { average } from "./App";
import { KEY } from "./App";
import { StarRating } from "./StarRating";
import { Loader } from "./Loader";
import { useKey } from "./useKey";

/**
 * The Main function is a React component that renders a main element with the provided children
 * inside.
 * @returns A JSX element representing the main content area with the class name "main" and containing
 * the children components passed to the Main component.
 */
export function Main({ children }) {
  return (
    <main className="main mt-10 flex gap-10 justify-center md:flex-nowrap flex-wrap">
      {children}
    </main>
  );
}

/**
 * The Box component is a toggleable container that displays its children when open.
 * @returns The `Box` component is returning a `div` element with the class name "box". Inside the
 * `div`, there is a `button` element with the class name "btn-toggle" that toggles the `isOpen` state
 * when clicked. The button text changes between "–" and "+" based on the value of `isOpen`. Below the
 * button, the `children` are rendered only if
 */
export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box rounded-lg w-full md:w-6/12 h-3/6 md:h-full">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

/**
 * The `MovieList` function renders a list of movies with the ability to select a movie.
 * @returns The `MovieList` component is being returned, which renders a list of movies using the `ul`
 * element with the class name "list list-movies". Each movie in the `movies` array is mapped to a
 * `Movie` component with the `onSelectMovie` function passed as a prop.
 */
export function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movies h-full list-none">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

/**
 * The Movie component renders a movie item with its poster, title, and year, and triggers a function
 * when clicked.
 * @returns The `Movie` component is being returned. It is a functional component that displays
 * information about a movie, such as the movie title, poster, and year. When a user clicks on the list
 * item representing the movie, the `onSelectMovie` function is called with the movie's IMDb ID as an
 * argument.
 */
function Movie({ movie, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

/**
 * The `MovieDetails` function component fetches and displays details of a specific movie
 * based on the `selectedId`, allowing users to add the movie to their watched list with a rating.
 * @returns The `MovieDetails` component is returning JSX elements that display details of a selected
 * movie. The component includes a header section with movie information such as title, release date,
 * genre, IMDb rating, and poster. It also includes a section for user interaction where users can rate
 * the movie using a star rating component and add the movie to their watched list. Additionally, there
 * is a section displaying the movie plot
 */
export function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }
  useKey("Escape", onCloseMovie);

  /* The `useEffect` hook you provided is responsible for fetching and setting the details of a specific
movie based on the `selectedId` when it changes.*/
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  /* The `useEffect` hook is setting the document title based on the `title`
state variable. */
  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie with {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Staring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

/**
 * The function WatchedMovieSummary calculates and displays average IMDb rating, user rating, and
 * runtime of watched movies.
 * @returns The `WatchedMovieSummary` component is being returned, which displays a summary of movies
 * that have been watched. It includes the total number of movies watched, the average IMDb rating, the
 * average user rating, and the average runtime of the watched movies.
 */
export function WatchedMovieSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

/**
 * The WatchedMovieList component renders a list of watched movies with the ability to delete them.
 * @returns A list of watched movies, where each movie is displayed using the WatchedMovie component.
 * Each movie is rendered with a unique key based on its imdbID, and a onDeleteWatched function is
 * passed down to allow for deleting movies from the list.
 */
export function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list list-watched">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

/**
 * The WatchedMovie function renders a component displaying details of a watched movie and includes a
 * button to delete it.
 * @returns The `WatchedMovie` component is being returned. It displays information about a watched
 * movie including the movie poster, title, IMDb rating, user rating, runtime, and a delete button.
 */
function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
