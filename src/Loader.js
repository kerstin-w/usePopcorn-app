/**
 * The Loader function returns a loading spinner and text within a wrapper div.
 * @returns A Loader component is being returned, which consists of a wrapper div with a spinner and a
 * loading text.
 */
export function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="spinner"></div>
      <p className="loader">Loading...</p>
    </div>
  );
}
