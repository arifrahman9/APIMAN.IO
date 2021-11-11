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
      "updatedAt": "2021-11-10T15:06:47.900Z",
      "Category": {
          "id": 1,
          "name": "travel",
          "createdAt": "2021-10-01T09:02:51.797Z",
          "updatedAt": "2021-10-01T09:02:51.797Z"
      }
  },
  "responseTime": 967,
  "newAddedHistory": [
      {
          "_id": "618d312f79ac23ed6a38aba0",
          "method": "GET",
          "url": "https://darwin-blog-challenge-1-p2.herokuapp.com/posts/4",
          "headers": {
              "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJlbWFpbDJAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjM2NjM5NTMyfQ.DxXs0i5-1AA63larHl3TO1tRSPb86LN4s_7aaezsYmY"
          },
          "params": null,
          "bodies": null,
          "UserId": "618a30ff4d86c47e1e446d9d"
      }
  ]
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
      "UserId": "618a30ff4d86c47e1e446d9d"
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

Request Headers

<pre> 
    {
        "access_token": "<</>your access token</>>"
    } 
</pre>

Request Body

<pre> not needed </pre>

Response ( 200 - OK )

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

Response ( 500 - Internal Server Error )

<pre>
    {
        "error": "Internal Server Error"
    }
</pre>

### POST / results

Request Headers

<pre> 
    {
        "access_token": "<</>your access token</>>"
    } 
</pre>

Request Body

<pre> 
    {
        "content": "<</>result_content</>>",
        "status": "<</>result_status</>>",
        "code": "<</>result_code</>>",
        "responseTime": "<</>result_responseTime</>>",
        "responseSize": "<</>result_responseSize</>>",
    } 
</pre>

Response ( 201 - Add New Result )

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

Response ( 500 - Internal Server Error )

<pre>
    {
        "error": "Internal Server Error"
    }
</pre>

### GET / results / :id

Request Headers

<pre> 
    {
        "access_token": "<</>your access token</>>"
    } 
</pre>

Request Params

<pre> 
    {
        "id": "<</>id from params</>>"
    } 
</pre>

Request Body

<pre> not needed </pre>

Response ( 200 - OK )

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

Response ( 500 - Internal Server Error )

<pre>
    {
        "error": "Internal Server Error"
    }
</pre>

### DELETE / results / :id

Request Headers

<pre> 
    {
        "access_token": "<</>your access token</>>"
    } 
</pre>

Request Params

<pre> 
    {
        "id": "<</>id from params</>>"
    } 
</pre>

Request Body

<pre> not needed </pre>

Response ( 200 - Deleted )

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

Response ( 500 - Internal Server Error )

<pre>
    {
        "error": "Internal Server Error"
    }
</pre>
