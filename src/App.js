import { useState } from "react";
import { NavBar, Logo, Search, NumResults } from "./NavBar";
import {
  Main,
  Box,
  WatchedMovieList,
  WatchedMovieSummary,
  MovieList,
  MovieDetails,
} from "./Main";
import { Loader } from "./Loader";
import { ErrorMessage } from "./ErrorMessage";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";

/**
 * The `average` function calculates the average value of an array by summing all elements and dividing
 * by the array length.
 * @param arr - An array of numbers for which you want to calculate the average.
 */
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = "3b0006a4";

/**
 * The `App` function manages movie data, selection, and watched list functionality
 * within a user interface.
 * @returns The `App` component is being returned. It consists of various elements such as a navigation
 * bar, search functionality, movie list, movie details, watched movie summary, and watched movie list.
 * The component also includes functions to handle selecting movies, adding movies to the watched list,
 * deleting movies from the watched list, and closing the movie details view.
 */
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  /**
   * The function `handleSelectMovie` toggles the selected movie ID based on the current selected ID.
   * @param id - The `id` parameter in the `handleSelectMovie` function represents the unique identifier
   * of the movie that is being selected or deselected.
   */
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  /**
   * The function handleCloseMovie sets the selectedId to null.
   */
  function handleCloseMovie() {
    setSelectedId(null);
  }

  /**
   * The function `handleAddWatch` adds a movie to the watched list.
   * @param movie - The `movie` parameter in the `handleAddWatch` function is the movie object that you
   * want to add to the `watched` list.
   */
  function handleAddWatch(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  /**
   * The function `handleDeleteWatched` filters out a movie from the `watched` array based on its
   * `imdbID`.
   * @param id - The `id` parameter in the `handleDeleteWatched` function is the unique identifier of the
   * movie that needs to be deleted from the `watched` list.
   */
  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <>
            {selectedId ? (
              <MovieDetails
                selectedId={selectedId}
                onCloseMovie={handleCloseMovie}
                onAddWatched={handleAddWatch}
                watched={watched}
              />
            ) : (
              <>
                <WatchedMovieSummary watched={watched} />
                <WatchedMovieList
                  watched={watched}
                  onDeleteWatched={handleDeleteWatched}
                />
              </>
            )}
          </>
        </Box>
      </Main>
    </>
  );
}
