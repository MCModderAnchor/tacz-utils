const fs = require("fs");

fs.readFile("tacz-utils.js", "utf-8", (error, data) => {
    let out = data.replaceAll("__vue_component__", "__vue_component__tacz")
        .replaceAll("__vue_script__", "__vue_script__tacz")
        .replaceAll("__vue_render__", "__vue_render__tacz")
    fs.writeFile("tacz-utils.js", out, (error) => {
    })
})