const assert = require('assert');
const postcss = require('postcss');
const purifyCss = require('purify-css');

module.exports = postcss.plugin(
  'purifycss',
  ({ content, whitelist, purifyOptions }) => css => {
    if (!whitelist) whitelist = [];

    assert(
      Array.isArray(content) && content.every(e => typeof e === 'string'),
      "'content' must be an array with String items"
    );
    assert(
      Array.isArray(whitelist) &&
        whitelist.every(e => typeof e === 'string' || e instanceof RegExp),
      "'whitelist' must be an array with String or RegExp items when provided"
    );
    assert(
      !purifyOptions ||
        (typeof purifyOptions === 'object' && !Array.isArray(purifyOptions)),
      "'purifyOptions' must be an object when provided"
    );

    const ignored = [];
    const toParse = [];
    let ignoreNextRules = false;
    let ignoreNextRule = false;

    whitelist = whitelist.map(e => (e instanceof String ? new RegEx(e) : e));

    css.walk(rule => {
      if (rule.type === 'atrule') {
        ignored.push(rule);
      } else if (rule.type === 'comment') {
        const text = rule.toString();

        if (/^!?\s?purifycss:ignore start\s?$/.test(text)) {
          // ignore next rules while using comment `/* purifycss:ignore start */`
          ignoreNextRules = true;
        } else if (/^!?\s?purifycss:ignore end\s?$/.test(text)) {
          // until `/* purifycss:ignore end */` was found
          ignoreNextRules = false;
        } else if (/^!?\s?purifycss:ignore\s?$/.test(text)) {
          // ignore next rule while using comment `/* purifycss:ignore */`
          ignoreNextRule = true;
        } else if (!/#\s?sourceMappingURL=/i.test(text)) {
          toParse.push(text);
        }
      } else if (rule.type === 'rule') {
        if (
          ignoreNextRules ||
          ignoreNextRule ||
          whitelist.some(r => r.test(rule.selector))
        ) {
          if (ignoreNextRule) ignoreNextRule = false;

          ignored.push(rule);
        } else {
          toParse.push(rule.toString());
        }
      }

      // if last rule
      if (rule === css.nodes[css.nodes.length - 1]) {
        purifyCss(content, toParse.join('\n'), purifyOptions, output => {
          const parsed = postcss.parse(output);
          const out = ignored.concat(parsed);

          out.sort((a, b) =>
            (a.name || a.selector || '').localeCompare(
              b.name || b.selector || ''
            )
          );

          css.replaceWith(out);
        });
      }
    });
  }
);
