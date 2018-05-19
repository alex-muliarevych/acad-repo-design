const ELEMENT_SEPARATOR = "__",
      MODIFIER_SEPARATOR = "_";

const getBEMPAth = (blockData) => {
  const base = typeof (blockData.e) === "string"
              ? blockData.b + ELEMENT_SEPARATOR + blockData.e
              : blockData.b;
  const modifiers = blockData.m.map(modifier => base + MODIFIER_SEPARATOR + modifier);

  return [,].concat(base, modifiers, [,]).join(" "); //NOSONAR
};

const BEM = {
  b(b) {
    const cached = {};
    return (elementName, modifiers) => {
      let e, m, key = "";

      if (typeof elementName === "string") {
        e = elementName;
        key = elementName;
      } else {
        modifiers = elementName;
      }
   
      modifiers && (key += JSON.stringify(modifiers));
      modifiers = modifiers || {};

      if (!cached[key]) {
        m = Object.keys(modifiers).filter((modifier) => modifiers[modifier]);
        cached[key] = getBEMPAth({b, e, m});
      }

      return cached[key];
    };
  },

  bR (b) {
    const _b = this.b(b);
    return (elementName, modifiers = {}) => {
      return { className: _b(elementName, modifiers) };
    };
  }
};

export default BEM;
