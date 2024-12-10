/**
 * @file scrapingService.js
 * @description Servicio para realizar scraping de productos desde varias fuentes (MercadoLibre, Alkosto y Amazon).
 * @requires puppeteer Dependencia para automatización del navegador y realizar el scraping.
 */

const puppeteer = require('puppeteer')

const { scrapeProductML } = require('./scrapeML')
const { scrapeProductAmazon } = require('./scrapeAmazon')
const { scrapeProductAlkosto } = require('./scrapeAlkosto')

/**
 * Realiza el scraping de productos desde múltiples fuentes (MercadoLibre, Alkosto y Amazon) de manera simultánea.
 * @function scrapeProducts
 * @param {string} nameSearch - Término de búsqueda de productos.
 * @param {number} amount - Número de productos a obtener de cada fuente.
 * @returns {Promise<Array>} Lista de productos obtenidos desde las tres fuentes, combinados en un solo arreglo.
 */
const scrapeProducts = async (nameSearch, amount) => { 
  try {
    const [scrapeML] = await Promise.all([
    //const [scrapeML, scrapeAlkosto, scrapeAmazon] = await Promise.all([
      scrapeProductML(nameSearch, amount),
      //scrapeProductAlkosto(nameSearch, amount),
      //scrapeProductAmazon(nameSearch, amount)
    ]);
    
    //const products = [...scrapeML, ...scrapeAlkosto, ...scrapeAmazon]
    const products = [...scrapeML]
    console.log(products)
    return products;

  } catch (error) {
    console.error("Error ejecutando los scrapers:", error);
    throw error;   
  }
};


/**
 * Realiza el scraping de los filtros disponibles para un producto en MercadoLibre.
 * @function scrapeFilters
 * @param {string} nameSearch - Término de búsqueda de productos.
 * @returns {Promise<Array>} Lista de filtros encontrados para la búsqueda realizada en MercadoLibre.
 */
const scrapeFilters = async (nameSearch) => {
  console.log("FILTERS")
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-software-rasterizer'] });

    const page = await browser.newPage();
    await page.goto('https://www.mercadolibre.com.co', {waitUntil: 'domcontentloaded'});
    
    await page.waitForSelector('input.nav-search-input');
    await page.type('input.nav-search-input', nameSearch);
  
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    const filters = await page.evaluate(() => {
      const filterSections = document.querySelectorAll('div.ui-search-filter-dl');
      const result = [];

      for (const section of filterSections) {
        const title = section.querySelector('h3.ui-search-filter-dt-title')?.innerText || 'Sin título';
        const options = Array.from(section.querySelectorAll('span.ui-search-filter-name')).map(span => span.innerText.trim());
        
        if (title === 'Condición') break;
        if (options.length > 0) { result.push({ title, options }); }
      }

      return result;
    });
    
    console.log("Filtros encontrados: ", filters.length)
    await browser.close();
    return filters;

  } catch (error) {
    console.error("Error abriendo la página con Puppeteer:", error);
    throw error;
  }
}

module.exports = { scrapeProducts, scrapeFilters };