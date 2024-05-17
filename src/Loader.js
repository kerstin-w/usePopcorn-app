/**
 * The Loader function returns a loading spinner and text within a wrapper div.
 * @returns A Loader component is being returned, which consists of a wrapper div with a spinner and a
 * loading text.
 */
export function Loader() {
  return (
    <div className="m-20">
      <div className="spinner"></div>
      <p className="uppercase text-center text-3xl font-semibold mt-5 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
