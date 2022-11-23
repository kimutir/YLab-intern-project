import qs from "qs";

interface IOPTIOINS {
  stringify: qs.IStringifyOptions;
  parse: qs.IParseOptions;
}

const OPTIONS: IOPTIOINS = {
  stringify: {
    addQueryPrefix: true,
    arrayFormat: "comma",
    encode: false,
  },
  parse: {
    ignoreQueryPrefix: true,
    comma: true,
  },
};

export default {
  parse: (query: string) => {
    return qs.parse(query, OPTIONS.parse) || {};
  },

  stringify: (params: any) => {
    return qs.stringify(params, OPTIONS.stringify);
  },
};
