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
      }
  ],
  "headers": [
      {
          "key": "access_token",
          "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NTU0NzMzfQ.UY8zrn9RxxWeMORc5F5O8UFp0cgUCL-EgJqXP4mYILA"
      }
  ],
  "params": [
    {
      "key": "key1",
      "value": "value1"
    },
    {
      "key": "key2"
      "value": "value2"
    }
  ],
  "bodyIsRaw": false
}
```

**atau (kalau bodies-nya raw)**

```
{
  "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/login",
  "method": "POST",
  "bodies": {
      "email": "email2@gmail.com",
      "password": "password"
  },
  "bodyIsRaw": true
}

```

_Response (200)_

```
{
  "status": "200 OK",
  "response": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NzIyODQ5fQ.VOnX1lqDza20PMTXcfkGCmK9WfUkYy2_MCnzqrOI7rE"
  },
  "responseTime": 996,
  "newAddedHistory": [
      {
          "_id": "618e68a10950bcedd31cfaa0",
          "method": "POST",
          "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/login",
          "headers": null,
          "params": null,
          "bodies": {
              "email": "email2@gmail.com",
              "password": "password"
          },
          "UserId": "618be802bd7d202cfcc2d253",
          "createdAt": "2021-11-13T09:34:38.372Z",
          "updatedAt": "2021-11-13T09:34:38.372Z"
      }
  ]
}
```

### POST /requests/read (MVP import endpoint via file JSON)

> Add new requests from JSON file

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
{
  "requests": <file.json>
}
```

_Response (200)_

```
[
  {
      "method": "POST",
      "url": "http://localhost:3000/login",
      "UserId": "618be802bd7d202cfcc2d253",
      "_id": "618e65e6a422c5756735934d"
  },
  {
      "method": "GET",
      "url": "http://localhost:3000/movies",
      "UserId": "618be802bd7d202cfcc2d253",
      "_id": "618e65e6a422c5756735934e"
  }
]
```

_Response (500) Error_

```
{
  message: internal server error
}
```

### GET /requests

> Get requests by user ID (get logged in user requests)

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
none
```

_Response (200)_

```
[
  {
      "_id": "618e645e1e1d6c22698e5f54",
      "method": "PATCH",
      "url": "http://localhost:3000/update-status",
      "UserId": "618be802bd7d202cfcc2d253"
  },
  {
      "_id": "618e645e1e1d6c22698e5f55",
      "method": "PUT",
      "url": "http://localhost:3000/update-post",
      "UserId": "618be802bd7d202cfcc2d253"
  }
]
```

_Response (500) Error_

```
{
  message: internal server error
}
```

### GET /requests/:id

> Get request by ID

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
none
```

_Response (200)_

```
{
  "_id": "618e645e1e1d6c22698e5f54",
  "method": "PATCH",
  "url": "http://localhost:3000/update-status",
  "UserId": "618be802bd7d202cfcc2d253"
}
```

_Response (500) Error_

```
{
  message: internal server error
}
```

### DELETE /requests/:id

> Delete request by ID

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
none
```

_Response (200)_

```
{
  "_id": "618e645e1e1d6c22698e5f55",
  "method": "PUT",
  "url": "http://localhost:3000/update-post",
  "UserId": "618be802bd7d202cfcc2d253"
}
```

_Response (500) Error_

```
{
  message: internal server error
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

### POST /login-google

_Request Header_

```
none
```

_Request Body_

<pre>
{
  "token": "<</>token from google</>>",
}
</pre>

_Response (200)_

<pre>
{
  "access_token": "<</>access_token</>>",
}
</pre>

_Response ( 500 - Internal Server Error )_

<pre>
{
  "error": "Internal Server Error"
}
</pre>

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

### POST /forgot-password (buat ngirim link untuk reset password ke email)

_Request Header_

```
none
```

_Request Body_

```
{
  "email": <account email to reset password>
}
```

_Response (200)_

```
{
  "message": "Email sent, please check your email for the password reset link"
}
```

_Response Error (404)_

```
{
  "message": "there is no user registered with that email"
}
```

### POST /reset/:token (buat reset password usernya, setelah udah dapet token reset password)

_Request Header_

```
none
```

_Request Body_

```
{
  "password": <new password>
}
```

_Response (200)_

```
{
  "message": "Success! Your password has been changed, please login"
}
```

_Response Error (401)_

```
{
  "message": "Password reset token is invalid or has expired"
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

---

## Histories Endpoint

### GET /histories

> Get all histories of the logged in user (get history by user ID)

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
  none
```

_Response (200)_

```
[
  {
      "_id": "618d24415e6d9e2e6e9c0744",
      "method": "GET",
      "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/posts",
      "headers": {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NjM5NTMyfQ.DxXs0i5-1AA63larHl3TO1tRSPb86LN4s_7aaezsYmY"
      },
      "params": null,
      "bodies": null,
      "UserId": "618a30ff4d86c47e1e446d9d",
      "CollectionId": "618a8fdc7aea3bb603a4afe4",
      "createdAt": "2021-11-13T09:32:32.543Z",
      "updatedAt": "2021-11-13T09:32:32.543Z"
  },
  {
      "_id": "618d29d2a6054242bce8ff04",
      "method": "POST",
      "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/login",
      "headers": null,
      "params": null,
      "bodies": {
          "email": "email2@gmail.com",
          "password": "password"
      },
      "UserId": "618a30ff4d86c47e1e446d9d",
      "CollectionId": "618a8fdc7aea3bb603a4afe4",
      "createdAt": "2021-11-13T09:32:32.543Z",
      "updatedAt": "2021-11-13T09:32:32.543Z"
  },
  {
      "_id": "618d2cec79ac23ed6a38ab9e",
      "method": "GET",
      "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/posts",
      "headers": {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NjM5NTMyfQ.DxXs0i5-1AA63larHl3TO1tRSPb86LN4s_7aaezsYmY"
      },
      "params": null,
      "bodies": null,
      "UserId": "618a30ff4d86c47e1e446d9d",
      "createdAt": "2021-11-13T09:32:32.543Z",
      "updatedAt": "2021-11-13T09:32:32.543Z"
  }
]
```

### GET /histories/collection/:collectionId

> Get histories by collection ID

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
  none
```

_Response (200)_

```
[
  {
      "_id": "618d24415e6d9e2e6e9c0744",
      "method": "GET",
      "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/posts",
      "headers": {
          "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NjM5NTMyfQ.DxXs0i5-1AA63larHl3TO1tRSPb86LN4s_7aaezsYmY"
      },
      "params": null,
      "bodies": null,
      "UserId": "618a30ff4d86c47e1e446d9d",
      "CollectionId": "618a8fdc7aea3bb603a4afe4"
  },
  {
      "_id": "618d29d2a6054242bce8ff04",
      "method": "POST",
      "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/login",
      "headers": null,
      "params": null,
      "bodies": {
          "email": "email2@gmail.com",
          "password": "password"
      },
      "UserId": "618a30ff4d86c47e1e446d9d",
      "CollectionId": "618a8fdc7aea3bb603a4afe4"
  }
]
```

### POST /histories/collection

> Add history to collection

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
{
  "historyId": "618d24415e6d9e2e6e9c0744",
  "collectionId": "618a8fdc7aea3bb603a4afe4"
}
```

_Response (200)_

```
{
  "_id": "618d24415e6d9e2e6e9c0744",
  "method": "GET",
  "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/posts",
  "headers": {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NjM5NTMyfQ.DxXs0i5-1AA63larHl3TO1tRSPb86LN4s_7aaezsYmY"
  },
  "params": null,
  "bodies": null,
  "UserId": "618a30ff4d86c47e1e446d9d"
}
```

### POST /histories/collection-remove/:id

> Remove history from collection

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
none
```

_Response (200)_

```
{
    "_id": "618f932a1bc736747d752dd8",
    "method": "GET",
    "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/posts",
    "headers": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2Nzk1ODYyfQ.fHc7RcbOY7Dqqde12_j9IupjuVYtmxOIZ7GBY1UyNWU"
    },
    "params": null,
    "bodies": null,
    "UserId": "618f93291bc736747d752dd6",
    "createdAt": "2021-11-13T10:27:54.905Z",
    "updatedAt": "2021-11-13T10:27:54.905Z",
    "CollectionId": "618d383165ec2535246d32a7"
}
```

### GET /histories/:id

> Get history by ID

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
  none
```

_Response (200)_

```
{
  "_id": "618d29d2a6054242bce8ff04",
  "method": "POST",
  "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/login",
  "headers": null,
  "params": null,
  "bodies": {
      "email": "email2@gmail.com",
      "password": "password"
  },
  "UserId": "618a30ff4d86c47e1e446d9d",
  "CollectionId": "618a8fdc7aea3bb603a4afe4"
}
```

### DELETE /histories/:id

> Delete history by ID

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
  none
```

_Response (200)_

```
{
  "_id": "618d29d2a6054242bce8ff04",
  "method": "POST",
  "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/login",
  "headers": null,
  "params": null,
  "bodies": {
      "email": "email2@gmail.com",
      "password": "password"
  },
  "UserId": "618a30ff4d86c47e1e446d9d",
  "CollectionId": "618a8fdc7aea3bb603a4afe4"
}
```

---

## Collections Endpoint

### GET /collections

> get all collections by user ID (get logged in user collections)

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
  none
```

_Response (200)_

```
[
  {
      "_id": "618d382c65ec2535246d32a6",
      "name": "collection1",
      "UserId": "618a30ff4d86c47e1e446d9d"
  },
  {
      "_id": "618d383165ec2535246d32a7",
      "name": "collection2",
      "UserId": "618a30ff4d86c47e1e446d9d"
  }
]
```

### GET /collections/:id

> Get collection by ID

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
  none
```

_Response (200)_

```
{
  "_id": "618d382c65ec2535246d32a6",
  "name": "collection1",
  "UserId": "618a30ff4d86c47e1e446d9d"
}
```

### POST /collections

> add new collection

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
{
  "name": "new test collection"
}
```

_Response (200)_

```
[
  {
      "_id": "618d372765ec2535246d32a5",
      "name": "new test collection",
      "UserId": "618a30ff4d86c47e1e446d9d"
  }
]
```

### PATCH /collections

> Update collection name by ID

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
{
  "id": "618d382c65ec2535246d32a6",
  "name": "collection1 ver 2"
}
```

_Response (200)_

```
{
  "_id": "618d382c65ec2535246d32a6",
  "name": "collection1 ver 2",
  "UserId": "618a30ff4d86c47e1e446d9d"
}
```

### DELETE /collections

> delete collection

_Request Header_

```
{
  "access_token": "<access_token>"
}
```

_Request Body_

```
{
  "id": "618d372765ec2535246d32a5"
}
```

_Response (200)_

```
{
  "_id": "618d372765ec2535246d32a5",
  "name": "new test collection",
  "UserId": "618a30ff4d86c47e1e446d9d"
}
```

---

## Results Endpoint

### GET / results

_Request Header_

<pre> 
{
    "access_token": "<</>your access token</>>"
} 
</pre>

_Request Body_

<pre> none </pre>

_Response (200)_

<pre>
{
    "_id": "<</>result_id</>>",
    "content": "<</>result_content</>>",
    "status": "<</>result_status</>>",
    "code": "<</>result_code</>>",
    "responseTime": "<</>result_responseTime</>>",
    "responseSize": "<</>result_responseSize</>>",
    "UserId": "<</>id from user</>>"
}
</pre>

_Response ( 500 - Internal Server Error )_

<pre>
{
    "error": "Internal Server Error"
}
</pre>

### POST / results

_Request Header_

<pre> 
{
    "access_token": "<</>your access token</>>"
} 
</pre>

_Request Body_

<pre> 
{
    "content": "<</>result_content</>>",
    "status": "<</>result_status</>>",
    "code": "<</>result_code</>>",
    "responseTime": "<</>result_responseTime</>>",
    "responseSize": "<</>result_responseSize</>>",
} 
</pre>

_Response ( 201 - Add New Result )_

<pre>
{
    "_id": "<</>new_result_id</>>",
    "content": "<</>new_result_content</>>",
    "status": "<</>new_result_status</>>",
    "code": "<</>new_result_code</>>",
    "responseTime": "<</>new_result_responseTime</>>",
    "responseSize": "<</>new_result_responseSize</>>",
    "UserId": "<</>id from user</>>"
}
</pre>

_Response ( 500 - Internal Server Error )_

<pre>
{
    "error": "Internal Server Error"
}
</pre>

### GET / results / :id

_Request Header_

<pre> 
{
    "access_token": "<</>your access token</>>"
} 
</pre>

_Request Params_

<pre> 
{
    "id": "<</>id from params</>>"
} 
</pre>

_Request Body_

<pre> none </pre>

_Response (200)_

<pre>
{
    "_id": "<</>result_id</>>",
    "content": "<</>result_content</>>",
    "status": "<</>result_status</>>",
    "code": "<</>result_code</>>",
    "responseTime": "<</>result_responseTime</>>",
    "responseSize": "<</>result_responseSize</>>",
    "UserId": "<</>id from user</>>"
}
</pre>

_Response ( 500 - Internal Server Error )_

<pre>
{
    "error": "Internal Server Error"
}
</pre>

### DELETE / results / :id

_Request Header_

<pre> 
{
    "access_token": "<</>your access token</>>"
} 
</pre>

_Request Params_

<pre> 
{
    "id": "<</>id from params</>>"
} 
</pre>

_Request Body_

<pre> none </pre>

_Response (200)_

<pre>
{
    "_id": "<</>deleted_result_id</>>",
    "content": "<</>deleted_result_content</>>",
    "status": "<</>deleted_result_status</>>",
    "code": "<</>deleted_result_code</>>",
    "responseTime": "<</>deleted_result_responseTime</>>",
    "responseSize": "<</>deleted_result_responseSize</>>",
    "UserId": "<</>id from user</>>"
}
</pre>

_Response ( 500 - Internal Server Error )_

<pre>
{
    "error": "Internal Server Error"
}
</pre>
