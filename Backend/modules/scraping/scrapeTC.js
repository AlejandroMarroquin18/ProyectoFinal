/**
 * @file scrapeTC.js
 * @description Servicio para realizar scraping de productos en el sitio web de Tauret Computadores utilizando Puppeteer.
 * @requires puppeteer Dependencia para manejar la automatización del navegador y realizar el scraping.
 */

const puppeteer = require('puppeteer')

/**
 * Realiza un scraping de productos en el sitio web de Tauret Computadores.
 * @function scrapeProductTC
 * @param {string} nameSearch - El término de búsqueda que se usará para buscar productos en Tauret Computadores.
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
const scrapeProductTC = async (nameSearch, amount) => {
  console.log("TC");
  const search = nameSearch.replace(/\s+/g, '+');

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--disable-dev-shm-usage'] });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36');

    await page.goto(`https://tauretcomputadores.com/search_product?product_search=${search}`, {waitUntil: 'domcontentloaded', timeout: 20000});
    
    const products = await page.evaluate((amount) => {
      const productList = document.querySelectorAll('li .card');
      const result = [];
      const fecha = new Date().toISOString();
      for (let i = 0; i < productList.length && result.length < amount; i++) {
        const product = productList[i];
        const enlaceCompra = product.querySelector('.imagen-container a')?.href || null; 
        const nombre = product.querySelector('.name h2')?.innerText.trim() || null;  
        const imagen = product.querySelector('.imagen-container img')?.src || null;  
        const precio = parseInt(product.querySelector('.all_price .price1')?.innerText.trim().replace(/[^\d]/g, '')) || null;  
        
        const rat = product.querySelector('.all_star .skd')?.innerText.trim() || ''; 
        const rating = rat ? parseFloat(rat.replace(/[^\d]/g, '')) : 'Sin calificación';
        
        const nRat = product.querySelector('.all_star .skd')?.innerText.trim() || '';
        const nRating = nRat ? parseInt(nRat.replace(/[^\d]/g, ''), 10) : 'Sin calificación';

        if (enlaceCompra && nombre && imagen && precio) {
          result.push({ id: fecha+i, tienda: "Tauret Computadores", enlaceCompra, nombre, imagen, precio, rating, nRating });
        }
      }
    
      return result;
    }, amount);

    console.log("Elementos encontrados - TC: ", products.length)
    await browser.close();
    return products;
  
  } catch (error) {
    console.error("Error abriendo la página con Puppeteer:", error);
    throw error;
  }
}

/*(async() => {
  await scrapeProductTC('table')
})()*/

module.exports = { scrapeProductTC }