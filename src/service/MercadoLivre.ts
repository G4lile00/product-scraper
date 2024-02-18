import { Product } from '@/models/MercadoLivre';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getPromotionProducts(): Promise<(Product | null)[]> {
  const links = await getAllPromotionLinks(
    'https://www.mercadolivre.com.br/ofertas#nav-header',
  );
  return Promise.all(links.map((link) => genereteProductFromLink(link)));
}
export async function getProductsByCategory(): Promise<(Product | null)[]> {
  const categoryLinks = [
    'https://lista.mercadolivre.com.br/_Deal_ultimos-lancamentos-smartphones#deal_print_id=73ca6f00-ce0c-11ee-a493-a1ef04312e07&c_id=carousel&c_element_order=2&c_campaign=LANCAMENTOS&c_uid=73ca6f00-ce0c-11ee-a493-a1ef04312e07r',
    'https://lista.mercadolivre.com.br/fone-de-ouvido_ITEM*CONDITION_2230284_NoIndex_True#deal_print_id=8389cd40-ce17-11ee-9b5e-fd554634f54a&c_id=special-normal&c_element_order=7&c_campaign=FONES&c_uid=8389cd40-ce17-11ee-9b5e-fd554634f54a',
    'https://lista.mercadolivre.com.br/ferramentas/novo/acessorios-para-ferramentas_NoIndex_True#deal_print_id=1e137540-ce19-11ee-9b5e-fd554634f54a&c_id=special-normal&c_element_order=6&c_campaign=ACESSORIOS&c_uid=1e137540-ce19-11ee-9b5e-fd554634f54a',
  ];
  const data = [];
  for (const link of categoryLinks) {
    const links = await getAllCategorieLinks(link);
    data.push(await Promise.all(links.map((link) => genereteProductFromLink(link))));
  }
  return (await Promise.all(data)).flat().filter((x) => x !== null) as Product[];
}

export async function getAllPromotionLinks(url: string): Promise<string[]> {
  const $ = await axios.get(url).then((response) => {
    return cheerio.load(response.data);
  });
  return $('a.promotion-item__link-container')
    .map((_i, x) => $(x).attr('href'))
    .toArray();
}
export async function getAllCategorieLinks(url: string): Promise<string[]> {
  const $ = await axios.get(url).then((response) => {
    return cheerio.load(response.data);
  });
  return $('a.ui-search-item__group__element')
    .map((_i, x) => $(x).attr('href'))
    .toArray();
}

export async function genereteProductFromLink(url: string): Promise<Product | null> {
  if (url.includes('lista.')) return null;
  const $ = await axios.get(url).then((response) => {
    return cheerio.load(response.data);
  });
  const title = $('h1.ui-pdp-title').text();
  const rate = parseFloat($('a.ui-pdp-review__label span.ui-pdp-review__rating').text());
  const rate_count = $('a.ui-pdp-review__label span.ui-pdp-review__amount').text();
  const available_quantity = parseInt(
    $('span.ui-pdp-buybox__quantity__available').text().split(' ')[0].split('(')[1],
  );
  const promotionPrice = parseFloat(
    `${$('div.ui-pdp-price__second-line span.andes-money-amount__fraction')
      .eq(0)
      .text()
      .replace('.', '')}.${$('div.ui-pdp-price__second-line span.andes-money-amount__cents')
        .eq(0)
        .text()}`,
  );
  const originalPrice = parseFloat(
    `${$('div.price-part span.andes-money-amount__fraction')
      .eq(0)
      .text()
      .replace('.', '')}.${$('div.price-part span.andes-money-amount__cents').eq(0).text()}`,
  );
  const link = url;
  const description = $('div.ui-pdp-description__content').text();
  const fastDelivery = $('svg.ui-pdp-icon.ui-pdp-icon--full').length > 0;
  const price = Number.isNaN(promotionPrice) ? originalPrice : promotionPrice;
  return {
    title,
    price,
    link,
    description,
    rate,
    rate_count,
    available_quantity,
    fastDelivery,
  };
}
