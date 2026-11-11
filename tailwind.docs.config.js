const libraryConfig = require("./tailwind.config.js");

module.exports = {
    ...libraryConfig,
    content: [
        "./docs/**/*.{html,js}",
        "./src/**/*.{html,js}",
        "./demo/**/*.{html,js}"
    ]
};
