/**
 * @file scrapeAlkosto.js
 * @description Servicio para realizar scraping de productos en el sitio web de Alkosto utilizando Puppeteer.
 * @requires puppeteer Dependencia para manejar la automatización del navegador y realizar el scraping.
 */

const puppeteer = require('puppeteer')

/**
 * Realiza un scraping de productos en el sitio web de Alkosto.
 * @function scrapeProductAlkosto
 * @param {string} nameSearch - El término de búsqueda que se usará para buscar productos en Alkosto.
 * @param {number} amount - La cantidad máxima de productos a obtener del sitio web.
 * 
 * @returns {Promise<Array<Object>>} - Retorna una promesa que se resuelve con un array de objetos, donde cada objeto representa un producto con las siguientes propiedades:
 *   - `link`: Enlace al producto.
 *   - `title`: Nombre del producto.
 *   - `image`: URL de la imagen del producto.
 *   - `price`: Precio del producto.
 *   - `rating`: Calificación promedio del producto.
 *   - `nRating`: Número de valoraciones del producto.
 */
const scrapeProductAlkosto = async (nameSearch, amount) => {
  console.log("ALKOSTO")
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer'] });

    const page = await browser.newPage();
    await page.goto('https://www.alkosto.com', {waitUntil: 'domcontentloaded'});
    
    await page.waitForSelector('#autocomplete-0-input', { timeout: 60000 });
    await page.type('#autocomplete-0-input', nameSearch);

    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const products = await page.evaluate((amount) => {
      const productList = document.querySelectorAll('.ais-InfiniteHits-item.product__item.js-product-item');
      const result = [];

      for (let i = 0; i < productList.length && result.length < amount; i++) {
        const product = productList[i];
        const link = product.querySelector('a.product__item__top__link')?.href || null;  // Obtener el enlace del producto
        const title = product.querySelector('.product__item__top__title')?.innerText.trim() || null;  // Nombre del producto
        const image = product.querySelector('.product__item__information__image img')?.src || null;  // URL de la imagen
        const price = parseInt(product.querySelector('.product__price--discounts__price .price')?.innerText.trim().replace(/[^\d]/g, '')) || null;  // Precio con descuento
        const rating = parseFloat(product.querySelector('.hit-stars .averageNumber')?.innerText.trim()) || 'Sin calificación';  // Calificación
        const nRating = parseInt(product.querySelector('.hit-stars .review')?.innerText.trim().match(/\d+/)?.[0]) || '0';  // Número de valoraciones

        if (link && title && image && price) {
          result.push({ link, title, image, price, rating, nRating }); 
        }  
      }

      return result;
    }, amount);

    console.log("Elementos encontrados - Alkosto: ", products.length)
    await browser.close();

    return products;
  
  } catch (error) {
    console.error("Error abriendo la página con Puppeteer:", error);
    throw error;
  }
}

module.exports = { scrapeProductAlkosto }