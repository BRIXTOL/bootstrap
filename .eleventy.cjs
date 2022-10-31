const highlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const navigation = require('@11ty/eleventy-navigation')
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventy = require('@panoply/11ty')
const { Liquid } = require("liquidjs");

module.exports = eleventy(config =>{


  config.addPlugin(EleventyRenderPlugin);
  config.addPlugin(navigation);
  config.addPlugin(highlight, {

  });
  config.setBrowserSyncConfig({
    notify: true
  });
  config.setLibrary('liquid', new Liquid({
    extname: ".liquid",
    dynamicPartials: true,
    jekyllInclude: true,
    root: ["./site/views/"]
  }))

  return {
    htmlTemplateEngine: 'liquid',
    passthroughFileCopy: true,
    dataTemplateEngine: 'liquid',
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
});
