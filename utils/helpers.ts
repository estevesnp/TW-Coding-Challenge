export function convertTimestamp(timestamp: number): string {
  // Convert the timestamp to milliseconds
  const date = new Date(timestamp);

  // Get the day, hours, and minutes
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes().toString().padStart(2, "0");

  // Format the date as dd,hh,mm
  return `${hh}:${mm}`;
}
