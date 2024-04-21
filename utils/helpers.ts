// This function converts a timestamp to a string in the format of hh:mm
export function convertTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const hh = date.getUTCHours().toString().padStart(2, "0");
  const mm = date.getUTCMinutes().toString().padStart(2, "0");

  return `${hh}:${mm}`;
}

// This function takes a string and returns a semi-random light color based on the initial value
export function stringToColor(str: string): string {
  if (!str) {
    return "rgb(255, 255, 255)";
  }

  let rgb = [0, 0, 0];
  for (let i = 0; i < str.length; i++) {
    rgb[i % 3] += str.charCodeAt(i);
  }
  rgb = rgb.map((value) =>
    value % 256 < 100 ? (value % 256) + 100 : value % 256
  );
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

// This function formats a price as a currency string
export function formatPrice(price: number, maxPrice: number = 20): string {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: maxPrice, // Set to a large number to effectively have no maximum
  });
}
