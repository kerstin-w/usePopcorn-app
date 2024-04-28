import { useRef } from "react";
import { useKey } from "./useKey";

/**
 * The `NavBar` function is a React component that renders a navigation bar with the provided children
 * elements.
 * @returns A navigation bar component with the children elements inside it.
 */
export function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

/**
 * The `Logo` function returns a JSX element displaying a logo with a popcorn emoji and the text
 * "usePopcorn".
 * @returns A JSX element representing a logo with a popcorn emoji and the text "usePopcorn" inside a
 * div with the class name "logo".
 */
export function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

/**
 * The Search component allows users to input a query for searching movies.
 * @returns The Search component is being returned, which consists of an input element for searching
 * movies. The input element has a class name of "search", a placeholder text of "Search movies...",
 * and its value is controlled by the `query` state variable. The `onChange` event handler is used to
 * update the `query` state as the user types in the input field. The input element is also assigned a
 */
export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

/**
 * The NumResults function displays the number of results found in a list of movies.
 * @returns The NumResults component is being returned, which displays the number of results found in
 * the movies array.
 */
export function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
