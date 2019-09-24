const fs = require('fs').promises;
const csvtojson = require('csvtojson');

async function build() {
  const holidays = await csvtojson().fromFile('./assets/holidays.csv');
  const boilerplate = 'export default'
  try {
    const file = await fs.appendFile('./app/helpers/holidays.js', `${boilerplate} ${JSON.stringify(holidays)};`, 'utf-8')
  } catch(error) {
    // Do error thing
    console.log("ERROR:", error)
  }
}

build();
