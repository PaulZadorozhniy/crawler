function getArguments() {
  const args = process.argv.slice(2);
  if (args.length !== 2) {
    throw new Error(
      'The script expects 2 params : <input_origin_file_path> <input_other_sample_file_path>'
    );
  }
  return {
    originalFilePath: args[0],
    anotherFilePath: args[1],
  };
}

module.exports = {
  getArguments,
};
