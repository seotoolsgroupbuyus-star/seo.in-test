/** All member actions (buy now, plans, signup and login) open the payment subdomain root. */
export const SHOP_LOGIN_URL = 'https://pay.seogroupbuy.in';
export const SHOP_SIGNUP_URL = 'https://pay.seogroupbuy.in';

export function shopCartUrl(_productId: number): string {
  return 'https://pay.seogroupbuy.in';
}

export function paymentLink(_href: string = SHOP_SIGNUP_URL): string {
  return 'https://pay.seogroupbuy.in';
}
