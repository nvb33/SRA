module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/documents');
    eleventyConfig.addPassthroughCopy('./src/js/script.js');
    eleventyConfig.addPassthroughCopy('./src/robots.txt');

    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}
