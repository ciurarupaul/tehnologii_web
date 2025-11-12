const { get } = require("./tests/helper");

const validate = (input, values) => {
  // `input` is an object (or an array of objects) describing a tree of tags
  if (input === null || typeof input !== "object") {
    throw new Error("InvalidType");
  }

  // `values` is an object containing key–value pairs used for token substitution
  if (values === null || typeof values !== "object" || Array.isArray(values)) {
    throw new Error("InvalidType");
  }

  if (!Array.isArray(input) && Object.keys(input).length === 0) {
    return "";
  }
};

const parseValue = (string, values) => {
  // get the values from ${}
  return string.replace(/\$\{([^}]+)\}/g, (match, key) => {
    const value = get(values, key);
    return value;
  });
};

const renderNode = (node, values) => {
  // node is a string -> get token and return it
  if (typeof node === "string") {
    return parseValue(node, values);
  }

  if (!node || typeof node.tag !== "string") {
    return "";
  }

  let html = `<${node.tag}`;

  if (node.attrs) {
    for (const key in node.attrs) {
      const value = node.attrs[key];

      if (typeof value === "boolean" && value) {
        html += ` ${key}`;
      }

      if (typeof value === "string") {
        html += ` ${key}="${parseValue(value, values)}"`;
      }
    }
  }

  html += ">";

  // handle children if any
  if (Array.isArray(node.children)) {
    html += node.children.map((child) => renderNode(child, values)).join("");
  }

  html += `</${node.tag}>`;

  return html;
};

module.exports = { validate, renderNode };
