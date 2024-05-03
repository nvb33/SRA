const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/documents');
    eleventyConfig.addPassthroughCopy('./src/js/script.js');

    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}