import { CartPlant } from "./CartSlice";

export function convertPriceStringToNumber(priceString: string): number {
  return parseFloat(priceString.substring(1));
}

export function getTotalPriceOfProduct(product: CartPlant): number {
  return convertPriceStringToNumber(product.cost) * product.quantity;
}