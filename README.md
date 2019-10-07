## Start App
// .env

#### FOR START APP
* DEV: npm run dev
* PROD: npm run start

## MongoDB
host: mlab.com:45009
db: auth

## Endpoints:
BASE_HOST = http://localhost:3030

* get all users
GET BASE_HOST/users

* get user by name
GET BASE_HOST/users/:name

* add new user
POST BASE_HOST/user/create
```
{
    "username": string,
    "email": string,
    "password": string
}
```

* check user password
POST BASE_HOST/user/login
```
{
    "username": string,
    "password": string
}
```
