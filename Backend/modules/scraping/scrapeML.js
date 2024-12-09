/**
 * @file scrapeML.js
 * @description Servicio para realizar scraping de productos en el sitio web de MercadoLibre utilizando Puppeteer.
 * @requires puppeteer Dependencia para manejar la automatización del navegador y realizar el scraping.
 */

const puppeteer = require('puppeteer')

/**
 * Realiza un scraping de productos en el sitio web de Mercado Libre.
 * @function scrapeProductML
 * @param {string} nameSearch - El término de búsqueda que se usará para buscar productos en Mercado libre.
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
const scrapeProductML = async (nameSearch, amount) => {
  console.log("MERCADO LIBRE")
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer'] });

    const page = await browser.newPage();
    await page.goto('https://www.mercadolibre.com.co', {waitUntil: 'domcontentloaded'});
    
    await page.waitForSelector('input.nav-search-input', { timeout: 60000 });
    await page.type('input.nav-search-input', nameSearch);
  
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    
    const products = await page.evaluate((amount) => {
      const productList = document.querySelectorAll('li.ui-search-layout__item');
      const result = [];

      for (let i = 0; i < productList.length && result.length < amount; i++) {
        const product = productList[i];
        const link = product.querySelector('.poly-component__title a')?.href || null;
        const title = product.querySelector('.poly-component__title a')?.innerText.trim() || null;
        const image = product.querySelector('.poly-card__portada img')?.src || null;
        const price = parseInt(product.querySelector('.poly-price__current .andes-money-amount__fraction')?.innerText.trim().replace('.', '')) || null;
        const rating = parseFloat(product.querySelector('.poly-reviews__rating')?.innerText.trim()) || 'Sin calificación';
        const nRating = parseInt(product.querySelector('.poly-reviews__total')?.innerText.trim().replace(/[()]/g, '')) || 'Sin calificación';
        
        if (link && title && image && price) {
          result.push({ link, title, image, price, rating, nRating }); 
        }
      }

      return result;
    }, amount);

    console.log("Elementos encontrados - ML: ", products.length)
    await browser.close();

    return products;

  } catch (error) {
    console.error("Error abriendo la página con Puppeteer:", error);
    throw error;
  }
}

module.exports = { scrapeProductML }