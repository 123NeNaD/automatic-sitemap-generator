const { CronJob } = require('cron');
const { generateSitemaps } = require('./seo-controller');

new CronJob(
  '*/5 * * * *',
  async () => {
    try {
      await generateSitemaps();
      console.log(`Sitemaps generated successfully.`);
    } catch (error) {
      console.log(`Error when generating sitemaps: `, error);
    }
  },
  null,
  true,
  null,
  null,
  true
);
