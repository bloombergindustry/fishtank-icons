import {test} from "ava";
import fs = require("fs-extra");
import isSvg = require("is-svg");
import Path = require("path");
import Globby = require("globby");
import Yaml = require('js-yaml');
import _ = require('lodash');

function parseIconParts(iconPath) {
    return Path.basename(iconPath).match(/^(.+)_(\d+).svg$/)
}

const validSizes = new Set(['24', '32','64']);

const iconPaths = Globby.sync('dist/*.svg').map(i => Path.resolve(__dirname, i));

test('All icons from manifest are present', async (t) => {
    const iconsFromManifest = (await fs.readFile("./manifest.txt", {encoding: "utf8"}))
        .split("\n")
        .filter(i => i.length > 0)
        .map(i => Path.resolve(__dirname, i));
    t.deepEqual(_.difference(
        iconsFromManifest,
        iconPaths
    ), []);
});

test('All icons are categorized', async (t) => {
    const collections = Yaml.safeLoad(await (fs.readFile('./collections.yaml', {encoding: "utf8"})));
    const slugsInCollections = _.chain(collections)
        .map(c => c.icons)
        .flatten()
        .value();

    const slugsInDirectory = _.compact(iconPaths
        .map(parseIconParts)
        .map(([, slug]) => slug)
    );

    t.deepEqual(_.difference(slugsInCollections, slugsInDirectory), []);
});

// Test macros
function pathIsValid(t, input) {
    const parts = parseIconParts(input);
    t.is(parts.length, 3, 'Expected icon path to parse');
    t.true(validSizes.has(parts[2]), `Expected size to be a valid size (${validSizes})`);
}
pathIsValid['title'] = (provided, input) => `${provided} Path ${input} is valid`.trim();

async function svgIsValid(t, input) {
    t.notThrows(await (async () => {
        const data = (await fs.readFile(input)).toString();
        t.truthy(isSvg(data), `Expected valid SVG in ${input}.`)
    }));
}
svgIsValid['title'] = (provided, input) => `${provided} SVG at ${input} is valid.`.trim();

async function viewBoxIsValid(t, input) {
    const [,,size] = parseIconParts(input);
    const expected = `0 0 ${size} ${size}`;
    const data = (await fs.readFile(input)).toString();
    t.regex(data, new RegExp(` viewBox="${expected}"`), `Expected viewBox to match ${expected}`)
}
viewBoxIsValid['title'] = (provided, input) => `${provided} SVG at ${input} contains a valid viewBox attribute.`.trim();

// Run tests on all icons.
iconPaths.forEach((iconPath) => {
    test([
        pathIsValid,
        svgIsValid,
        viewBoxIsValid
    ], iconPath)
});