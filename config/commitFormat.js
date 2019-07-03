module.exports = {
  parserOpts: {
      headerPattern: /^(\w*):(?:\s\((.*)\)) (.*)$/,
      headerCorrespondence: ['type', 'scope', 'subject']
  }
};
