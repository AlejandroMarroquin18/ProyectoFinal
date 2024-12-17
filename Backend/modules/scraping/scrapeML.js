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

  // Formateo de la busqueda para mercado libre
  const formattedQuery = nameSearch.replace(/\s+/g, '-');
  const encodedQuery = encodeURIComponent(nameSearch);
  const search = `${formattedQuery}#D[A:${encodedQuery}]`;

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer', '--disable-dev-shm-usage'] });
    const page = await browser.newPage();
    await page.goto(`https://listado.mercadolibre.com.co/${search}`, {waitUntil: 'domcontentloaded'});
    
    // Realiza scroll hasta el final, esto debido a que las imagenes no se cargaban en su totalidad
    let lastHeight = await page.evaluate('document.body.scrollHeight');
    let scrollPosition = 0;
    
    while (true) {
      scrollPosition += 500;
      await page.evaluate(scrollPosition => window.scrollTo(0, scrollPosition), scrollPosition);
      await page.waitForSelector('body')
      if (scrollPosition >= lastHeight) { break;}
    }

    const products = await page.evaluate((amount) => {
      const productList = document.querySelectorAll('li.ui-search-layout__item');
      const result = [];
      const fecha = new Date().toISOString();
      for (let i = 0; i < productList.length && result.length < amount; i++) {
        const product = productList[i];
        const enlaceCompra = product.querySelector('.poly-component__title a')?.href || null;
        const nombre = product.querySelector('.poly-component__title a')?.innerText.trim() || null;
        const imagen = product.querySelector('.poly-card__portada img')?.src || null;
        const precio = parseInt(product.querySelector('.poly-price__current .andes-money-amount__fraction')?.innerText.trim().replace(/\./g, '')) || null;
        const rating = parseFloat(product.querySelector('.poly-reviews__rating')?.innerText.trim()) || 'Sin calificación';
        
        const nRat = product.querySelector('.poly-reviews__total')?.innerText.trim() || '';
        const nRating = nRat ? parseInt(nRat.replace(/[()]/g, '')) : 'Sin calificación';
        
        if (enlaceCompra && nombre && imagen && precio) {
          result.push({ id: fecha+i , tienda: "Mercado Libre", enlaceCompra, nombre, imagen, precio, rating, nRating }); 
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