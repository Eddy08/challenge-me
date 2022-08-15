#!/bin/sh
nvm use node && npm run start && cd ../backend && nodemon index.js && /etc/init.d/postgresql restart 