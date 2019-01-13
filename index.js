const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'my-crowler' });

const cli = require('./helpers/cli');
const { getAttributesById, getElementByAttr } = require('./helpers/dom');

const originalButtonId = 'make-everything-ok-button';

const { originalFilePath, anotherFilePath } = cli.getArguments();

try {
  const originalButtonAttributes = getAttributesById(
    originalButtonId,
    originalFilePath
  );

  if (!originalButtonAttributes) {
    throw new Error('Original button has not been found');
  }
  logger.info(
    `Successfully found original button with such attributes: ${JSON.stringify(
      originalButtonAttributes
    )}`
  );

  const elementPath = getElementByAttr(
    originalButtonAttributes,
    anotherFilePath
  );

  logger.info(`Successfully found similar button path: ${elementPath}`);
} catch (err) {
  logger.error(err);
}

process.exit(0);
