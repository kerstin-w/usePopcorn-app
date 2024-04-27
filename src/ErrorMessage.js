export function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔️</span>
      &nbsp;{message}
    </p>
  );
}
