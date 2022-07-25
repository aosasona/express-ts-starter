//  Filter objects
const obj = (object: any, ...filters: any[]) => {
  const newObject: any = {};

  Object.keys(object).forEach((key) => {
    if (filters.includes(key)) {
      newObject[key] =
        typeof object[key] === "string" ? object[key].trim() : object[key];
    }
  });

  return newObject;
};

//  Capitalize first letter of string
const str = (txt: string, filter?: string) => {
  switch (filter) {
    case "F":
      return txt.charAt(0).toUpperCase() + txt.slice(1).trim();
    case "L":
      return txt.charAt(txt.length - 1).toUpperCase() + txt.slice(0, -1).trim();
    case "A":
      return txt.toUpperCase().trim();
    default:
      return txt.toLowerCase().trim();
  }
};

// Normalize string
const norm = (texts: string[], capitalize: boolean = false) => {
  const newTexts: string[] = [];

  texts.forEach((text) => {
    newTexts.push(
      capitalize
        ? typeof text === "string"
          ? text.toUpperCase().trim()
          : text
        : typeof text === "string"
        ? text.toLowerCase().trim()
        : text
    );
  });

  return newTexts;
};

// Capitalize first letter of each word
const firstOnly = (text: string) => {
  return text
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)?.toLowerCase().trim()
    )
    .join(" ");
};

const filter = {
  obj,
  str,
  norm,
  cap: {
    firstOnly: firstOnly,
  },
};

export default filter;
