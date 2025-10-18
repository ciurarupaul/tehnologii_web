const formatString = (s, ...format) => {
  let modified = s;
  for (let i = 0; i < format.length; i++) {
    if (modified.indexOf("{" + i + "}") !== -1) {
      modified = modified.replace("{" + i + "}", format[i]);
    }
  }
  return modified;
};

console.log(
  formatString("this is a {0} string and we've {1} it ", "nice", "formatted")
);

// implementați o funcție de formatare a unui string care suportă parametrii numiți; de exemplu "un {substantiv} este {adjectiv}" să poată fi formatat în "un căluț este drăguț"

const namedParamFormatting = (string, namedParams) => {
  let modified = string;

  for (const key in namedParams) {
    const placeholder = `{${key}}`;
    const value = namedParams[key];

    modified = modified.replace(placeholder, value);
  }

  return modified;
};

const string = "un {substantiv} este {adjectiv}";
const values = {
  substantiv: "căluț",
  adjectiv: "drăguț",
};

console.log(namedParamFormatting(string, values));
