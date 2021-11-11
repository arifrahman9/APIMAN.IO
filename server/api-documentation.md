## API Documentation

### GET / Results

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

### POST / Results

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

### GET / Results / :id

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

### DELETE / Results / :id

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
