const fs = require('fs');
const { JSDOM } = require('jsdom');

function getAttributesById(id, filePath) {
  const sampleFile = fs.readFileSync(filePath);
  const dom = new JSDOM(sampleFile);

  const button = dom.window.document.getElementById(id);
  const array = Array.prototype.slice.apply(button.attributes);

  return array.reduce((accumulator, attr) => {
    accumulator[attr.name] = attr.value;
    return accumulator;
  }, {});
}

module.exports = {
  getAttributesById,
};
