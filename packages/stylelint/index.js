const merge = require('deepmerge');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = (neutrino, opts = {}) => {
  const options = merge({
    pluginId: 'stylelint',
    files: '**/*.+(css|scss|sass|less)',
    context: neutrino.options.source,
    failOnError: neutrino.options.command !== 'start',
    quiet: neutrino.options.command === 'start'
  }, opts);

  const getStylelintRcConfig = config => config
    .plugin(options.pluginId)
    .get('args')[0].config || {};

  neutrino.register(
    'stylelintrc',
    () => getStylelintRcConfig(neutrino.config),
    'Return an object of accumulated stylelint configuration suitable for use by .stylelintrc.js'
  );

  neutrino.config
    .plugin(options.pluginId)
    .use(StylelintPlugin, [options]);
};
