## Challenge video link : https://youtu.be/gmF45hVeF4s

## Setup With Docker :

### 1. Build the Image By : `docker build -t bhardwajharsh08/test-app:v1 . --no-cache`

### 2. Run the images command to get container Id By : `docker images`

### 3. Run the container by particular image Id : `docker run -p 4000:4000 <container-id> `

## Manual Setup Steps:

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

### 1. Go the Frontend folder and run the following command `npm install`

### 2. Then Run `npm start`

#### 3. Click on Search button or List button for the required functionalities

---

### Db Scripts : Present Inside start folder : `start/scripts.sql`
