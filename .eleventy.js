module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/documents');
    eleventyConfig.addPassthroughCopy('./src/js/script.js');

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}