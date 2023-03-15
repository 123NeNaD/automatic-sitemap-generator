const { simpleSitemapAndIndex } = require('sitemap');

const products = [
  { title: 'Product 1', display_url: 'product_1', updated_at: '2023-03-01T10:00:00.000Z' },
  { title: 'Product 2', display_url: 'product_2', updated_at: '2023-03-02T10:00:00.000Z' },
  { title: 'Product 3', display_url: 'product_3', updated_at: '2023-03-03T10:00:00.000Z' },
  { title: 'Product 4', display_url: 'product_4', updated_at: '2023-03-04T10:00:00.000Z' },
  { title: 'Product 5', display_url: 'product_5', updated_at: '2023-03-05T10:00:00.000Z' },
];

exports.generateSitemaps = async () => {
  try {
    const sitemap_items = [
      { url: '', priority: 1 },
      { url: 'login' },
      { url: 'register' },
      { url: 'about-us' },
      { url: 'terms-and-conditions' },
    ];

    // Adding all product pages to the sitemap
    sitemap_items.push(
      ...products.map((Product) => ({ url: `products/${Product.display_url}`, lastmod: Product.updated_at }))
    );

    // Adding alternative language-specific versions (Chinese and Spanish)
    const language_specific_items = [];
    language_specific_items.push(
      ...sitemap_items.map((item) => ({ ...item, url: item.url === '' ? `zh` : `zh/${item.url}` }))
    );
    language_specific_items.push(
      ...sitemap_items.map((item) => ({ ...item, url: item.url === '' ? `es` : `es/${item.url}` }))
    );
    sitemap_items.push(...language_specific_items);

    // Generating sitemaps and sitemap index
    await simpleSitemapAndIndex({
      hostname: 'https://example.com',
      destinationDir: './sitemaps/',
      sitemapHostname: `https://example.com/api/v1/sitemaps/`,
      sourceData: sitemap_items,
    });
  } catch (error) {
    throw new Error(error);
  }
};
