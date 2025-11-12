const get = (obj, path) =>
  path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);

module.exports = { get };
