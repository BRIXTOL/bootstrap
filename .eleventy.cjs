const highlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const navigation = require('@11ty/eleventy-navigation')
const { EleventyRenderPlugin } = require("@11ty/eleventy");
const eleventy = require('@panoply/11ty')
const { Liquid } = require("liquidjs");

module.exports = eleventy(config =>{


  config.addPairedLiquidShortcode('code', function (code) {
     return `${code}`;
   });

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
    root: ["./demo/views/"]
  }))

  return {
    htmlTemplateEngine: 'liquid',
    passthroughFileCopy: true,
    dataTemplateEngine: 'liquid',
    templateFormats: ['liquid', 'json'],
    dir: {
      input: "demo",
      output: "docs",
      includes: "views",
      layouts: "",
      data: "data",
    },
  };
});
