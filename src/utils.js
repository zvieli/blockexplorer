// Format a unix timestamp (seconds) to a readable date string
export function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts * 1000);
  return d.toLocaleString();
}