// Feste Schweizer Zahlenformatierung, identisch auf Server und Browser
export function num(n: number, decimals = 0) {
  const [int, dec] = Math.abs(n).toFixed(decimals).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return (n < 0 ? "−" : "") + grouped + (dec ? "." + dec : "");
}
