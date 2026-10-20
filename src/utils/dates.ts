/** Store a local calendar day, independent of locale formatting. */
export function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
export function formatMemoryDate() {
  return new Date().toLocaleDateString('en', {
    month: 'long',
    year: 'numeric',
  });
}
export function formatDate(value: string, options: Intl.DateTimeFormatOptions) {
  return new Date(value + 'T12:00:00').toLocaleDateString('en', options);
}
