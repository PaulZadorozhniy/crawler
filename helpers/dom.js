const fs = require('fs');
const cheerio = require('cheerio');
const stringHelper = require('./string');

function getAttributesById(id, filePath) {
  const sampleFile = fs.readFileSync(filePath);
  const $ = cheerio.load(sampleFile);
  const element = $(`#${id}`)[0];

  return element ? element.attribs : undefined;
}

function getElementByAttr(attrs, filePath) {
  const sampleFile = fs.readFileSync(filePath);
  const $ = cheerio.load(sampleFile);
  const elements = [];
  const elementAttrs = [];

  Object.keys(attrs).forEach(key => {
    const element = $(`[${key}='${attrs[key]}']`)[0];

    if (element) {
      elements.push(element);
      elementAttrs.push(element.attribs);
    }
  });

  const bestMatchIndex = findBestAttributesMatch(attrs, elementAttrs);

  return getElementPath(elements[bestMatchIndex]);
}

function findBestAttributesMatch(mainAttrs, elementAttrbs) {
  return stringHelper.findBestMatch(
    JSON.stringify(mainAttrs),
    elementAttrbs.map(JSON.stringify)
  );
}

function getElementPath(element) {
  let currentElement = element;
  let path = '';

  while (currentElement) {
    if (currentElement.attribs.class) {
      path = `${currentElement.name}.${currentElement.attribs.class} > ${path}`;
    } else {
      path = currentElement.name + ' > ' + path;
    }
    currentElement = currentElement.parent;
  }

  return path.slice(0, -3);
}

module.exports = {
  getAttributesById,
  getElementByAttr,
};
