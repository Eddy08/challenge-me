#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
# nvm use node /etc/init.d/postgresql restart  && cd frontend/app && npm run start >output1.txt && cd ../../backend && nodemon index.js >output2.txt
nvm use node
/etc/init.d/postgresql restart
su postgres
# createdb company
\set ON_ERROR_STOP on
\set VERBOSITY verbose
psql -U postgres -c "CREATE EXTENSION IF NOT EXISTS dblink;"
psql -U postgres -c "
DO
\$do\$
BEGIN
   IF EXISTS (SELECT FROM pg_database WHERE datname = 'company') THEN
      RAISE NOTICE 'Database already exists';  -- optional
   ELSE
      PERFORM dblink_exec('dbname=' || current_database()  -- current db
                        , 'CREATE DATABASE company');
   END IF;
END
\$do\$;"
psql -U postgres -c "DO
\$do\$
BEGIN
   IF EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'harsh') THEN

      RAISE NOTICE 'Role "harsh" already exists. Skipping.';
   ELSE
      BEGIN   -- nested block
         CREATE ROLE harsh LOGIN PASSWORD 'harsh';
      EXCEPTION
         WHEN duplicate_object THEN
            RAISE NOTICE 'Role "harsh" was just created by a concurrent transaction. Skipping.';
      END;
   END IF;
END
\$do\$;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE company TO harsh;"
# psql -s company <<-EOSQL CREATE USER root;  GRANT ALL PRIVILEGES ON DATABASE company TO root; EOSQL
# createdb company
# psql -s company
# create user root password 'root';
# GRANT ALL PRIVILEGES ON DATABASE company TO root;
# \q;
exit;
cd frontend/app
npm run build
cp -r build/ ../../backend/ui/
cd ../../backend
npm start
