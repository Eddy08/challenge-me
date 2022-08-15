#!/bin/sh
cd /frontend/app &&  npm run start && cd ../backend && nodemon index.js && /etc/init.d/postgresql restart 