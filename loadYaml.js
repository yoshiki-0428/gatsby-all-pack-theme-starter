/**
 * 指定されたパスの Yaml ファイルを読み込みます。
 */
function loadYamlFile(filename) {
  const path = require('path');
  const fs = require('fs');
  const yaml = require('js-yaml');
  const yamlText = fs.readFileSync(path.join(__dirname, filename), 'utf8');
  return yaml.safeLoad(yamlText);
}

const siteConfig = loadYamlFile('content/settings/global.yml');

module.exports = {
  ...siteConfig
};

