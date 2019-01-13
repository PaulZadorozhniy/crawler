const fs = require('fs');
const cheerio = require('cheerio');

function getAttributesById(id, filePath) {
  const sampleFile = fs.readFileSync(filePath);
  const $ = cheerio.load(sampleFile);
  const element = $(`#${id}`)[0];

  return element ? element.attribs : undefined;
}

function getElementsByAttr(attrs, filePath) {
  const sampleFile = fs.readFileSync(filePath);
  const $ = cheerio.load(sampleFile);
  const elementAttribs = [];

  Object.keys(attrs).forEach(key => {
    const element = $(`[${key}='${attrs[key]}']`)[0];

    if (element) {
      elementAttribs.push(element);
    }
  });

  return elementAttribs;
}

module.exports = {
  getAttributesById,
  getElementsByAttr,
};
