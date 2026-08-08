import { ACTIVE_REGION_CONFIG } from "../config/dataRegionConfig";

export function formatCurrency(
  amount: number,
  currency: string = ACTIVE_REGION_CONFIG.currencyCode,
  period?: "pm" | "pw"
): string {
  const symbolMap: Record<string, string> = {
    GBP: "£",
    EUR: "€",
    USD: "$",
  };

  const symbol = symbolMap[currency] || ACTIVE_REGION_CONFIG.currencySymbol;
  const formattedAmount = new Intl.NumberFormat("en-US", {
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
    sqFt: `${new Intl.NumberFormat("en-US").format(sqFt)} sq ft`,
    sqM: `${sqM} sq m`,
  };
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
