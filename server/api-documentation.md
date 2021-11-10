# APIMAN SERVER

---

## Requests Endpoint

### POST /requests

> send request to API

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
{
  "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/posts",
  "method": "GET",
  "bodies": [
      {
          "key": "newStatus",
          "value": "inactive"
      },
      {
        "key": "",
          "value": ""
      }
  ],
  "headers": [
      {
          "key": "access_token",
          "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NTU0NzMzfQ.UY8zrn9RxxWeMORc5F5O8UFp0cgUCL-EgJqXP4mYILA"
      }
  ],
  "params": [
    {}, {}
  ],
  "bodyIsRaw": false
}
```

_Response (200)_

```
{
  "status": "200 OK",
  "response": {
      "id": 4,
      "title": "camping di curug",
      "content": "seru",
      "imgUrl": "https://ik.imagekit.io/ppv8vh60qbt/icon_cmdZYdBVL.jpeg",
      "categoryId": 1,
      "authorId": 2,
      "status": "inactive",
      "createdAt": "2021-10-01T10:47:53.100Z",
      "updatedAt": "2021-11-10T15:06:47.900Z"
  },
  "responseTime": 1104
}
```

---

## Users Endpoint

### POST /login

_Request Header_

```
none
```

_Request Body_

```
{
    "email": "email1@gmail.com",
    "password": "password"
}
```

_Response (200)_

```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGEzMGZmNGQ4NmM0N2UxZTQ0NmQ5ZCIsInVzZXJuYW1lIjoidXNlcjEiLCJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE2MzY1NTgyOTh9.kMKPylJswerXnmihQ0r9G1FG7Oxkt5Copg-gufqf_JM"
}
```

### POST /register

_Request Header_

```
none
```

_Request Body_

```
{
    "username": "user1,
    "email": "email1@gmail.com",
    "password": "password"
    "firstName": "darwin",
    "lastName": "darwin"
}
```

_Response (200)_

```
{
    "id": "618be802bd7d202cfcc2d253",
    "username": "user3",
    "email": "email3@gmail.com"
}
```

### GET /users/profile

_Request Header_

```
{
  "access_token": <access_token>
}
```

_Request Body_

```
{
  "id": "618be802bd7d202cfcc2d253"
}
```

_Response (200)_

```
{
  "username": "user1",
  "email": "email1@gmail.com",
  "firstName": "darwin",
  "lastName": "santoso"
}
```
