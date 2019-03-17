const express = require('express');
const cookieParser = require('cookie-parser');
const { Nuxt, Builder } = require('nuxt');
const app = express();
const config = require('./nuxt.config.js');

app.use(cookieParser());

async function start() {
    const nuxt = new Nuxt(config);
    const { host, port } = nuxt.options.server;

    if (process.env.NODE_ENV === 'production') {
        await nuxt.ready();
    } else {
        await new Builder(nuxt).build();
    }

    app.use(nuxt.render);
    app.listen(port, host);
}

start();
