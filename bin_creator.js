const fs = require('fs');
const key = '$2a$10$aBB0ydwfYD6iKCDgPTjoo.bnBEzpzgTPDr.VjkObebVlsc5azZHpm';
const bodyData = JSON.stringify([{ "dactyclaw_init": true, "timestamp": Date.now() }]);

fetch('https://api.jsonbin.io/v3/b', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': key,
        'X-Bin-Private': 'false',
        'X-Bin-Name': 'Dactyclaw-Agents-Log'
    },
    body: bodyData
})
    .then(r => r.json())
    .then(data => console.log('MASTER_BIN_ID_CREATED:', data.metadata.id))
    .catch(err => console.error(err));
