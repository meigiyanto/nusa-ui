const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function copyFile(source, destination) {
    const from = path.join(root, source);
    const to = path.join(root, destination);

    if (!fs.existsSync(from)) {
        throw new Error(`Required file not found: ${source}`);
    }

    fs.mkdirSync(path.dirname(to), { recursive: true });
    fs.copyFileSync(from, to);
}

function prepareDemo() {
    const source = path.join(root, "demo/index.html");
    const destination = path.join(root, "docs/demo/index.html");

    if (!fs.existsSync(source)) {
        throw new Error("demo/index.html not found.");
    }

    let html = fs.readFileSync(source, "utf8");

    html = html
        .replace(
            'href="../dist/nusa-ui.css"',
            'href="../assets/nusa-ui.css"'
        )
        .replace(
            'src="../src/js/nusa-ui.js"',
            'src="../assets/nusa-ui.js"'
        )
        .replace(
            '<a href="#" class="navbar-brand">Nusa UI</a>',
            '<a href="../index.html" class="navbar-brand">Nusa UI</a>'
        )
        .replace(
            '<a href="#components" class="btn btn-primary btn-sm">Get started</a>',
            '<a href="../index.html" class="btn btn-outline btn-sm">Documentation</a><a href="#components" class="btn btn-primary btn-sm">Get started</a>'
        )
        .replace(
            '<a class="footer-link" href="#">Documentation</a>',
            '<a class="footer-link" href="../index.html">Documentation</a>'
        );

    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, html);
}

function preparePages() {
    copyFile(
        "dist/nusa-ui.css",
        "docs/assets/nusa-ui.css"
    );

    copyFile(
        "src/js/nusa-ui.js",
        "docs/assets/nusa-ui.js"
    );

    prepareDemo();

    console.log("GitHub Pages assets prepared successfully.");
}

preparePages();
