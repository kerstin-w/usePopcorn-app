/**
 * The ErrorMessage function displays an error message with a warning emoji and the
 * provided message.
 * @returns The ErrorMessage component is being returned. It is a paragraph element with a span
 * containing a stop sign emoji (⛔️) followed by the message passed as a prop. The paragraph has a
 * class name of "error".
 */
export function ErrorMessage({ message }) {
  return (
    <p className="p-16 text-center text-3xl">
      <span>⛔️</span>
      &nbsp;{message}
    </p>
  );
}
