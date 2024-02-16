import * as cheerio from 'cheerio';
import axios from 'axios';
import { Product } from '@/models/MercadoLivre';

export async function getAllPromotionLinks(): Promise<string[]> {
  const $ = await axios.get('https://www.mercadolivre.com.br/ofertas#nav-header').then((response) => { return cheerio.load(response.data) });
  return $('a.promotion-item__link-container').map((i, x) => $(x).attr('href')).toArray();
}

export async function genereteProductFromLink(url: string): Promise<Product> {
  const $ = await axios.get(url).then((response) => { return cheerio.load(response.data) });
  const title = $('h1.ui-pdp-title').text();
  const rate = parseFloat($('a.ui-pdp-review__label span.ui-pdp-review__rating').text());
  const rate_count = $('a.ui-pdp-review__label span.ui-pdp-review__amount').text();
  const available_quantity = parseInt($('span.ui-pdp-buybox__quantity__available').text().split(' ')[0].split('(')[1]);
  const price = parseFloat($('div.ui-pdp-price__second-line span.andes-money-amount__fraction').text());
  const link = url;
  const description = $('div.ui-pdp-description__content').text();
  return { title, price, link, description, rate, rate_count, available_quantity };
}

export async function getPromotionProducts(): Promise<Product[]> {
  const links = await getAllPromotionLinks()
  return Promise.all(links.map((link) => genereteProductFromLink(link)));
}
