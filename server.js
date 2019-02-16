const { createBundleRenderer } = require('vue-server-renderer');
const path = require('path');
const fs = require('fs');
const express = require('express');

const resolve = (...paths) => path.join(__dirname, ...paths);
const app = express();

const templatePath = resolve('src', 'index.template.html');
const template = fs.readFileSync(templatePath, 'utf-8');
const bundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');

const renderer = createRenderer(bundle, {
    template,
    clientManifest
});

app.use('/dist', express.static(resolve('dist')));

app.get('*', (req, res) => {
    const context = {
        url: req.url
    };

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            res.status(500).send('500 | Internal Server Error')
        }
    };

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err);
        }

        res.send(html);
    })
});

app.listen(8084, () => {
    console.log('Running X.Page...')
});

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, Object.assign(options, {
        basedir: resolve('dist'),
        runInNewContext: false
    }))
}
