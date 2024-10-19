const cds = require('@sap/cds');
const cors = require('cors');

cds.on('bootstrap', app => {
    app.use(cors());
    app.options('*', cors());
});

module.exports = cds.server;
