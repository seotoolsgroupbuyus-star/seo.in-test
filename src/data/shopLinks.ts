/** SITE 4 — seogroupsbuy.com member shop */
export const SHOP_LOGIN_URL = 'https://pay.seogroupbuy.in/users/login';
export const SHOP_SIGNUP_URL = 'https://pay.seogroupbuy.in/users/signup';

export function shopCartUrl(productId: number): string {
  return `https://pay.seogroupbuy.in/users/cart/index/product/id/${productId}/c/`;
}
/** Keep CMS product/plan buy destinations on this site's payment subdomain. */
export function paymentLink(href: string = SHOP_SIGNUP_URL): string {
  return href.replace(/^https:\/\/seogroupsbuy\.com(?=\/users\/(?:login|signup|cart\/))/i, 'https://pay.seogroupbuy.in');
}
