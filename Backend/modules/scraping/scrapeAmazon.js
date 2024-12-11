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
  //const search = nameSearch.replace(/\s+/g, '+');

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--disable-dev-shm-usage'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');

    await page.goto('https://www.amazon.com/', {waitUntil: 'domcontentloaded'});

    await page.waitForSelector('#twotabsearchtextbox');
    await page.type('#twotabsearchtextbox', nameSearch);
    await page.keyboard.press('Enter');

    await page.waitForNavigation({ waitUntil: 'load' }); 

    const products = await page.evaluate((amount) => {
      const productList = document.querySelectorAll('div[data-component-type="s-search-result"]');
      const result = [];
      
      for (let i = 0; i < productList.length && result.length < amount; i++) {
        const product = productList[i];
        const enlaceCompra = product.querySelector('.s-title-instructions-style a')?.href || null;
        const nombre = product.querySelector('.s-title-instructions-style a h2 span')?.innerText.trim() || null;
        const imagen = product.querySelector('img.s-image')?.src || null;
        const precio = parseFloat(product.querySelector('.a-price .a-offscreen')?.innerText.trim().match(/[\d,]+(\.\d+)?/)) || null;
        
        const rat = product.querySelector('.a-icon-alt')?.innerText.trim() || '';
        const rating = rat ? parseFloat(rat.match(/^(\d+(\.\d+)?)/)) : 'Sin calificación';
        
        const nRat = product.querySelector('.s-csa-instrumentation-wrapper span')?.innerText.trim() || '';
        const nRating = nRat ? parseInt(nRat.replace(',','')) : 'Sin calificación';
        
        if (enlaceCompra && nombre && imagen && precio) {
          result.push({ id: 2000+i, tienda: "Amazon", enlaceCompra, nombre, imagen, precio, rating, nRating }); 
        }
        
      }
      return result;
    }, amount);
    console.log("Elementos encontrados - Amazon: ", products.length)
    await browser.close();
    return products;
  
  } catch (error) {
    console.error("Error abriendo la página con Puppeteer:", error);
    throw error;
  }
}

module.exports = { scrapeProductAmazon }