
FOR START APP
DEV: npm run dev
PROD: npm run start

MongoDB
host: mlab.com:45009
db: auth

Endpoints:
BASE_HOST = http://localhost:3030

* get all users
GET BASE_HOST/all-users

* add new user
POST BASE_HOST/new-user
```
{
    "username": string,
    "email": string,
    "password": string
}```