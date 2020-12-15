const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

module.exports = ({ markdownAST }, pluginOptions) => {

  visit(markdownAST, "link", node => {
    let { url } = node;
    let newUrl = url.split("named:")[1];
    if (newUrl){
      url = newUrl;
      if (pluginOptions.indexes[url]) {
        let text = toString(node);
        const html = `
            <a style="color: rebeccapurple" href=${pluginOptions.indexes[url]}>
              ${text}
            </a>
          `
        node.type = "html"
        node.children = undefined
        node.value = html

        console.log ("**This URL inside markdown was changed:", url);
      }
    }




    
  })

  return markdownAST
}