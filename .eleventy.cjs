const highlight = require('@11ty/eleventy-plugin-syntaxhighlight');

module.exports = function (config) {


  config.addPlugin(highlight);
  config.setBrowserSyncConfig({
    notify: true
  });

  return {
    htmlTemplateEngine: 'liquid',
    passthroughFileCopy: true,
    templateFormats: ['liquid', 'json', 'md', 'css', 'html', 'yml'],
    dir: {
      input: "site",
      output: "docs",
      includes: "views",
      layouts: "",
     // layouts: "",
      data: "data",
    },
  };
};
