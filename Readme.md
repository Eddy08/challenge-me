## Challenge

### Setup DB ( Postgres ) For Docker

```
  docker pull postgres
  docker run --name postgresql -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=admin -p 5432:5432 -v /data:/var/lib/postgresql/data -d postgres
```

#### pg admin 4

```
docker pull dpage/pgadmin4:latest
docker run --name pgadmin -p 82:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain.local' -e 'PGADMIN_DEFAULT_PASSWORD=admin'-d dpage/pgadmin4
```

### Backend : Node.js

### 1. Go the Backend folder and run the following command `npm install`

### 2. The backend will start at localhost:4000 and you can hit the post request as shown below :

```
curl --location --request POST 'localhost:4000/getCompaniesByName' \
--header 'Content-Type: application/json' \
--data-raw '{
    "search": "a",
    "filter": "company"
}'
```

---

### Frontend : React

#### 1. npm start

#### 2. Click on Search button or List button for the required functionalities

---

### Db Scripts : Sql
