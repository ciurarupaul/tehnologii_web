const { validate: validateRender, renderNode } = require("./render.js");
const { validate: validateParse, buildTree } = require("./parse.js");

function render(input, values) {
  validateRender(input, values);

  if (Array.isArray(input)) {
    return input.map((node) => renderNode(node, values)).join("");
  }

  return renderNode(input, values);
}

// test render
const node = { tag: "p", children: ["Hello ${name}"] };
console.log(render(node, { name: "Ada" }));

function parse(markup) {
  // clean up
  validateParse(markup);
  markup = markup.trim(); // test parse-7

  const tokens = markup.split(/(<[^>]+>)/).filter((t) => t !== "");
  const rootNodes = buildTree(tokens);

  return rootNodes.length === 1 ? rootNodes[0] : rootNodes;
}

// test parse
console.log(parse("<a>stuff</a>"));
console.log(parse("<a>one</a><b hidden></b>"));

module.exports = { render, parse };
