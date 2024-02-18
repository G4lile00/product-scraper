import { getProductsByCategory, getPromotionProducts } from './service/MercadoLivre';

async function MercadoLivre() {
	console.log('Scraping Mercado Livre...');
	console.log('Getting daily promotions...');
	const promotions = await getPromotionProducts();
	console.log('Getting products by category...');
	const categorys = await getProductsByCategory();
	console.dir(promotions, { maxArrayLength: null });
	console.dir(categorys, { maxArrayLength: null });
}

MercadoLivre();
