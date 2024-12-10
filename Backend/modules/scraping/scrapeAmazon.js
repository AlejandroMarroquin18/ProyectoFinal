/**
 * @file scrapeAmazon.js
 * @description Servicio para realizar scraping de productos en el sitio web de Amazon utilizando Puppeteer.
 * @requires puppeteer Dependencia para manejar la automatización del navegador y realizar el scraping.
 */

const puppeteer = require('puppeteer')

/**
 * Realiza un scraping de productos en el sitio web de Amazon.
 * @function scrapeProductAmazon
 * @param {string} nameSearch - El término de búsqueda que se usará para buscar productos en Amazon.
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
const scrapeProductAmazon = async (nameSearch, amount) => {
  console.log("AMAZON")
  console.time("timeScrapeProductAmazon")
  const formattedQuery = nameSearch.replace(/\s+/g, '+');
  const search = `s?k=${formattedQuery}`;

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer'] });

    const page = await browser.newPage();
    
    await page.goto(`https://www.amazon.com/${search}`, {waitUntil: 'domcontentloaded'});
    /*await page.goto('https://www.amazon.com', {waitUntil: 'domcontentloaded'});
    
    await page.waitForSelector('#twotabsearchtextbox', { timeout: 60000 });
    await page.type('#twotabsearchtextbox', nameSearch);

    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    */
    const products = await page.evaluate((amount) => {
      const productList = document.querySelectorAll('div[data-component-type="s-search-result"]');
      const result = [];

      for (let i = 0; i < productList.length && result.length < amount; i++) {
        const product = productList[i];
        const enlaceCompra = product.querySelector('h2 a.a-link-normal.s-link-style.a-text-normal')?.href || null;
        const nombre = product.querySelector('h2 a.a-link-normal.s-link-style.a-text-normal span')?.innerText.trim() || null;
        const imagen = product.querySelector('img.s-image')?.src || null;
        const precio = parseFloat(product.querySelector('.a-price .a-offscreen')?.innerText.trim().match(/[\d,]+(\.\d+)?/)) || null;
        const rating = parseFloat(product.querySelector('.a-icon-alt')?.innerText.trim().match(/^(\d+(\.\d+)?)/)) || 'Sin calificación';
        const nRating = parseInt(product.querySelector('.s-csa-instrumentation-wrapper span')?.innerText.trim().replace(',','')) || 'Sin calificación';
        
        if (enlaceCompra && nombre && imagen && precio) {
          result.push({ id: 2000+i, enlaceCompra, nombre, imagen, precio, rating, nRating }); 
        }
        
      }
      return result;
    }, amount);

    console.log("Elementos encontrados - Amazon: ", products.length)
    await browser.close();

    console.timeEnd("timeScrapeProductAmazon")
    return products;
  
  } catch (error) {
    console.error("Error abriendo la página con Puppeteer:", error);
    throw error;
  }
}

module.exports = { scrapeProductAmazon }