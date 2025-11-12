const validate = (markup) => {
  if (typeof markup !== "string") {
    throw new Error("InvalidMarkup");
  }
};

const parseAttributes = (attrString) => {
  const attrs = {};
  if (!attrString) return attrs;

  // match either `key` or `key="value"`
  const regex = /([a-zA-Z0-9-]+)(?:="([^"]*)")?/g;

  let match;
  while ((match = regex.exec(attrString)) !== null) {
    const key = match[1];
    const value = match[2];
    value === undefined ? (attrs[key] = true) : (attrs[key] = value);
  }
  return attrs;
};

const createNode = (token) => {
  const match = token.match(/^<([a-zA-Z0-9-]+)\s*(.*)>$/);
  if (!match) throw new Error("InvalidMarkup");

  const tagName = match[1];
  const attrString = match[2];

  const newNode = {
    tag: tagName,
    children: [],
  };

  const attrs = parseAttributes(attrString);
  if (Object.keys(attrs).length > 0) {
    newNode.attrs = attrs;
  }

  return newNode;
};

const getClosingTagName = (token) => {
  return token.substring(2, token.length - 1);
};

const buildTree = (tokens) => {
  const rootNodes = [];
  const stack = [];

  tokens.forEach((token) => {
    const isClosing = token.startsWith("</");
    const isOpening = token.startsWith("<") && !isClosing;

    if (isClosing) {
      const tagName = getClosingTagName(token);

      if (stack.length === 0) throw new Error("InvalidMarkup");

      const lastNode = stack.pop();

      if (lastNode.tag !== tagName) throw new Error("InvalidMarkup");
    } else if (isOpening) {
      const newNode = createNode(token);
      const parent = stack.length > 0 ? stack[stack.length - 1] : null;

      parent ? parent.children.push(newNode) : rootNodes.push(newNode);

      stack.push(newNode);
    } else {
      // handle text node
      const parent = stack.length > 0 ? stack[stack.length - 1] : null;
      parent ? parent.children.push(token) : rootNodes.push(token);
    }
  });

  if (stack.length > 0) {
    throw new Error("InvalidMarkup");
  }

  return rootNodes;
};

module.exports = { validate, buildTree };
