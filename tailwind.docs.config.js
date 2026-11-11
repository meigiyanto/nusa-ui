const libraryConfig = require("./tailwind.config.js");

module.exports = {
    ...libraryConfig,
    important: "#docs-root",
    content: [
        "./docs/**/*.{html,js}",
        "./src/**/*.{html,js}",
        "./demo/**/*.{html,js}"
    ]
};
