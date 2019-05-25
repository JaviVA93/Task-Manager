/*const auth = require('@adobe/jwt-auth');
const fs = require('fs');

const config = {
    clientId: 'd9ac590967824112ab0bc265641d635b',
    clientSecret: 'b05fe189-e51f-4cb6-885b-4fde38dae2e7',
    technicalAccountId: '2D1A51235CCFD9EA0A495FB7@techacct.adobe.com',
    orgId: '43E04E5354FA398A0A4C98A2@AdobeOrg',
    metaScopes: [
        'https://ims-na1.adobelogin.com/s/ent_reactor_admin_sdk'
    ]
}

config.privateKey = fs.readFileSync('./private.key');

auth(config)
  .then(token => console.log(token))
  .catch(error => console.log(error));*/