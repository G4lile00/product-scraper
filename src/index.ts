import { getPromotionProducts } from "./service/MercadoLivre";

async function main() {
  const products = await getPromotionProducts();
  console.table(products);
}

main();
