const rewireYAML = require('react-app-rewire-yaml');
const rewireStyledComponents = require('react-app-rewire-styled-components');

module.exports = function override(config, env) {
    configWithYaml = rewireYAML(config, env);
    configStyledComponents = rewireStyledComponents(configWithYaml, env);
    return configStyledComponents;
}