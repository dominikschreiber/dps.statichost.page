/**
 * @typedef {Object} BaseToken
 * @prop {string} [$type]
 * @prop {string} [$description]
 * @prop {boolean} [$deprecated]
 * @prop {Record<string, unknown>} [$extensions]
 */
/** @typedef {BaseToken & Record<string, Token>} GroupToken */
/** @typedef {BaseToken & {$value: unknown}} ValueToken */
/** @typedef {GroupToken|ValueToken} Token */

/**
 * @param {Token} tokens
 * @returns {Record<string, ValueToken>}
 */
export function toFlattened(tokens) {
  const flatTokens = {};

  for (const [pathElement, token] of Object.entries(tokens)) {
    if (!pathElement.startsWith("$") || pathElement === "$root") {
      const path = pathElement === "$root" ? "" : pathElement;
      if (token.$value) {
        flatTokens[`/${path}`] = token;
      } else {
        const flatGroupTokens = toFlattened(token);
        for (const [tokenPath, token] of Object.entries(flatGroupTokens)) {
          flatTokens[`/${path}${tokenPath}`] = token;
        }
      }
    }
  }

  return flatTokens;
}
