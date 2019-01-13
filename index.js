const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'my-crowler' });

const cli = require('./helpers/cli');
const { getAttributesById } = require('./helpers/dom');

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
} catch (err) {
  logger.error(err);
}

process.exit(0);
