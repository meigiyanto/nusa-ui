const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

<<<<<<< HEAD
function readFile(file) {
    const target = path.join(root, file);

    if (!fs.existsSync(target)) {
        throw new Error(`Required file not found: ${file}`);
    }

    return fs.readFileSync(target, "utf8");
}

function writeFile(file, content) {
    const target = path.join(root, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
}

function copyFile(source, destination) {
    writeFile(destination, readFile(source));
}

function replaceRequired(html, replacements, file) {
    for (const [from, to, label] of replacements) {
        if (html.includes(from)) {
            html = html.replaceAll(from, to);
        } else if (!html.includes(to)) {
            throw new Error(`Cannot find "${label}" in ${file}`);
        }
    }

    return html;
}

function validateAnchors(html, file) {
    const ids = new Set(
        [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1])
    );

    const missing = [...html.matchAll(/\bhref=["']#([^"']+)["']/g)]
        .map(match => match[1])
        .filter(id => !ids.has(id));

    if (missing.length) {
        throw new Error(
            `Broken anchors in ${file}: ${[...new Set(missing)].join(", ")}`
        );
    }
}

function normalizeCodeSamples(html) {
    return html.replace(
        /(<pre\b[^>]*>\s*<code\b[^>]*>)([\s\S]*?)(<\/code>\s*<\/pre>)/g,
        (match, opening, source, closing) => {
            const lines = source.replace(/\r\n/g, "\n").split("\n");

            while (lines.length && !lines[0].trim()) lines.shift();
            while (lines.length && !lines[lines.length - 1].trim()) lines.pop();

            if (!lines.length) return opening + closing;

            const normalized = lines.map((line, index) => {
                if (!line.trim()) return "";
                return index === 0 ? line.trimStart() : line;
            });

            return opening + normalized.join("\n") + closing;
        }
    );
}

function prepareDocumentation() {
    const file = "docs/index.html";
    let html = readFile(file);

    html = replaceRequired(html, [
        ['<li><a href="/">Home</a></li>',
            '<li><a href="#introduction">Home</a></li>', "breadcrumb home"],
        ['<li><a href="/products">Products</a></li>',
            '<li><a href="#cards">Products</a></li>', "breadcrumb products"],
        ['<a href="#" class="navbar-brand">Brand</a>',
            '<a href="#introduction" class="navbar-brand">Brand</a>', "navbar brand"],
        ['<a href="#" class="nav-link active">Home</a>',
            '<a href="#introduction" class="nav-link active">Home</a>', "navbar home"],
        ['<a href="#" class="nav-link">About</a>',
            '<a href="#features" class="nav-link">About</a>', "navbar about"],
        ['<a href="#" class="btn btn-primary btn-sm">Sign In</a>',
            '<a href="#form-inputs" class="btn btn-primary btn-sm">Sign In</a>', "navbar sign in"],
        ['<a href="#" class="footer-link">Documentation</a>',
            '<a href="#introduction" class="footer-link">Documentation</a>', "footer documentation"],
        ['<a href="#" class="footer-link">Support</a>',
            '<a href="https://github.com/meigiyanto/nusa-ui/issues" class="footer-link" target="_blank" rel="noopener noreferrer">Support</a>', "footer support"],
        ['<a href="#" class="social-link" aria-label="GitHub">GH</a>',
            '<a href="https://github.com/meigiyanto/nusa-ui" class="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">GH</a>', "documentation GitHub"],
        ['<a href="#" class="btn btn-primary">Get Started</a>',
            '<a href="#installation" class="btn btn-primary">Get Started</a>', "hero get started"],
        ['<a href="#" class="btn btn-outline">Learn More</a>',
            '<a href="#usage" class="btn btn-outline">Learn More</a>', "hero learn more"],
        ['<a href="#" class="btn btn-secondary mt-7">Get Started</a>',
            '<a href="#installation" class="btn btn-secondary mt-7">Get Started</a>', "CTA get started"],
        ['<a class="dropdown-item" href="/edit" role="menuitem" tabindex="-1">Edit</a>',
            '<a class="dropdown-item" href="#cards" role="menuitem" tabindex="-1">Edit</a>', "dropdown edit"],
        ['<a href="#" class="dropdown-item">View Profile</a>',
            '<a href="#avatars" class="dropdown-item">View Profile</a>', "dropdown profile"],
        ['<a href="#" class="dropdown-item">Settings</a>',
            '<a href="#utilities" class="dropdown-item">Settings</a>', "dropdown settings"],
        ['<a href="#" class="dropdown-item text-red-600">Sign Out</a>',
            '<a href="#introduction" class="dropdown-item text-red-600">Sign Out</a>', "dropdown sign out"],
        ['<a class="page-link" href="?page=1"',
            '<a class="page-link" href="#pagination"', "pagination page 1"],
        ['<a class="page-link active" href="?page=2"',
            '<a class="page-link active" href="#pagination"', "pagination page 2"],
        ['<a class="page-link" href="?page=3"',
            '<a class="page-link" href="#pagination"', "pagination page 3"],
    ], file);

    html = normalizeCodeSamples(html);
    validateAnchors(html, file);
    writeFile(file, html);
}

function prepareDemo() {
    const file = "demo/index.html";
    let html = readFile(file);

    html = replaceRequired(html, [
        ['<a href="#" class="navbar-brand">Nusa UI</a>',
            '<a href="../index.html" class="navbar-brand">Nusa UI</a>', "demo navbar brand"],
        ['<a class="navbar-brand" href="#">Nusa UI</a>',
            '<a class="navbar-brand" href="#home">Nusa UI</a>', "demo footer brand"],
        ['<a class="footer-link" href="#">Changelog</a>',
            '<a class="footer-link" href="https://github.com/meigiyanto/nusa-ui/releases" target="_blank" rel="noopener noreferrer">Changelog</a>', "demo changelog"],
        ['<a class="footer-link" href="#">Examples</a>',
            '<a class="footer-link" href="#components">Examples</a>', "demo examples"],
        ['<a class="footer-link" href="#">Support</a>',
            '<a class="footer-link" href="https://github.com/meigiyanto/nusa-ui/issues" target="_blank" rel="noopener noreferrer">Support</a>', "demo support"],
        ['<a class="footer-link" href="#">About</a>',
            '<a class="footer-link" href="#home">About</a>', "demo about"],
        ['<a class="footer-link" href="#">Contact</a>',
            '<a class="footer-link" href="#contact">Contact</a>', "demo contact"],
        ['<a class="footer-link" href="#">Privacy</a>',
            '<a class="footer-link" href="#contact">Privacy</a>', "demo privacy"],
        ['<a class="social-link" href="#" aria-label="GitHub">GH</a>',
            '<a class="social-link" href="https://github.com/meigiyanto/nusa-ui" aria-label="GitHub" target="_blank" rel="noopener noreferrer">GH</a>', "demo GitHub"],
        ['<a class="footer-link" href="#">Documentation</a>',
            '<a class="footer-link" href="../index.html">Documentation</a>',
            "demo documentation"],
    ], file);

    html = html
        .replace('href="../dist/nusa-ui.css"', 'href="../assets/nusa-ui.css"')
        .replace('src="../src/js/nusa-ui.js"', 'src="../assets/nusa-ui.js"')
        .replace(
            '<a href="#components" class="btn btn-primary btn-sm">Get started</a>',
            '<a href="../index.html" class="btn btn-outline btn-sm">Documentation</a><a href="#components" class="btn btn-primary btn-sm">Get started</a>'
        );

    validateAnchors(html, file);
    writeFile("docs/demo/index.html", html);
}

function preparePages() {
    copyFile("dist/nusa-ui.css", "docs/assets/nusa-ui.css");
    copyFile("src/js/nusa-ui.js", "docs/assets/nusa-ui.js");

    prepareDocumentation();
    prepareDemo();

    console.log("GitHub Pages assets and internal links prepared successfully.");
=======
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
>>>>>>> 696eb31 (gh-pages)
}

preparePages();
