export function formatCurrency(
  amount: number,
  currency: "GBP" | "EUR" | "USD" = "GBP",
  period?: "pm" | "pw"
): string {
  const symbolMap: Record<string, string> = {
    GBP: "£",
    EUR: "€",
    USD: "$",
  };

  const symbol = symbolMap[currency] || "£";
  const formattedAmount = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(amount);

  let result = `${symbol}${formattedAmount}`;
  if (period) {
    result += ` / ${period}`;
  }
  return result;
}

export function formatArea(sqFt: number): { sqFt: string; sqM: string } {
  const sqM = Math.round(sqFt * 0.092903);
  return {
    sqFt: `${new Intl.NumberFormat("en-GB").format(sqFt)} sq ft`,
    sqM: `${sqM} sq m`,
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
