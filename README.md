# LIBRARY WEB API


### How to install

Download and run in the project root folder
```
$ npm istall
```
Start server with your terminal 

```
$ node server.js
```

Then the server will listen on port 4000, 
http://localhost:4000

### GET all books

```JS
    fetch("http://localhost:4000/books/")
        .then(res => res.json())
        .then(json => console.log(json))

```
Output:
```
[
	{
		"id": "...1",
		"title": "...",
		"author": "...",
		"isbn": "...",
		"publication_date": "YYYY-MM-DD",
		"binding": "...",
		"user_id": "...",
		"available": "bloolean"
	},
  	{
		"id": "...2",
		"title": "...",
		"author": "...",
		"isbn": "...",
		"publication_date": "YYYY-MM-DD",
		"binding": "...",
		"user_id": "...",
		"available": "bloolean"
	},
]
```

### GET specific book

```JS
    fetch("http://localhost:4000/books/id")
        .then(res => res.json())
        .then(json => console.log(json))
```
Output:
```
[
	{
		"id": "...",
		"title": "...",
		"author": "...",
		"isbn": "...",
		"publication_date": "YYYY-MM-DD",
		"binding": "...",
		"user_id": "...",
		"available": "bloolean"
	},
]
```
### ADD new book

```JS
    fetch("http://localhost:4000/books/", 
        {
          method: "POST",
          body: JSON.stringify({
          title: "...", 
          author: "author"
          "isbn": "9780450537370",
          "publication_date": "YYYY-MM-DD",
          "binding": "...",
          "user_id": "...",
        }), 
        headers: { "Content-Type": "application/json" }
    })
```
The server will automatically create a unique id

### DELETE book

```JS
    fetch("http://localhost:4000/books/id", {
        method: "DELETE"
    })
```
### PUT (update full) book

```JS
    fetch("http://localhost:4000/todos/id", {
        method: "PUT",
        body: JSON.stringify({
          title: "...", 
          author: "aut...hor"
          "isbn": "...",
          "publication_date": "YYYY-MM-DD",
          "binding": "...",
          "user_id": "...",
        }), 
        headers: { "Content-Type": "application/json" }
    })
```
### PATCH (update partial) book

```JS
    fetch("http://localhost:4000/todos/id", {
        method: "PATCH",
        body: JSON.stringify(
        { /* Set anyone or all */
          title: "...", 
          author: "author"
          "isbn": "9780450537370",
          "publication_date": "YYYY-MM-DD",
          "binding": "...",
          "user_id": "...",
        }), 
        headers: { "Content-Type": "application/json" }
    })
```

### Add user

```JS
    fetch("http://localhost:4000/auth/register", 
        {
          method: "POST",
          body: JSON.stringify(
          {
            "first_name": "...",
            "last_name": "...",
            "email": "...", // Must be unique
            "password": "..."
        }), 
        headers: { "Content-Type": "application/json" }
    })
```

### Login user

```JS
    fetch("http://localhost:4000/auth/login", 
        {
          method: "POST",
          body: JSON.stringify(
          {
            "email": "...",
            "password": "..."
        }), 
        headers: { "Content-Type": "application/json" }
    })
```
Output:
```
TOKEN
```
### GET all users

```JS
    fetch("http://localhost:4000/users")
        .then(res => res.json())
        .then(json => console.log(json))

```
Output:
```
[
	{  // Example
		"id": "4eebeb28-29d3-4f3e-ad2d-5368e643223d",
		"first_name": "Olle",
		"last_name": "Karlsson",
		"email": "olle@karlsson.se",
		"password": "5f4dcc3b5aa765d61d8327deb882cf99" //Encrypted
	},
	{
		"id": "...",
		"first_name": "...",
		"last_name": "...",
		"email": "...@...com",
		"password": "..."
	}
]
```
### Lend book

```JS
    fetch("http://localhost:4000/users/lend", 
        {
          method: "POST",
          body: JSON.stringify(
          {
   		      "book_id": "..." // Example "e7733c23-f541-49e2-bb05-ef4b20070150"
        }), 
        headers: { "Content-Type": "application/json" }
    })
```
Output:
```JS
{
	"user": {
		"id": "...",
		"first_name": "...",
		"last_name": "...",
		"email": "...",
		"password": "..."
	},
	"books": [
		{
			"id": "...",
      title: "...", 
      author: "aut...hor"
      "isbn": "...",
      "publication_date": "YYYY-MM-DD",
      "binding": "...",
      "user_id": "...",
			"available": "true" // If awailable "false" if not
		}
	]
}
```

### Return book

```JS
    fetch("http://localhost:4000/users/return", 
        {
          method: "POST",
          body: JSON.stringify(
          {
   		      "book_id": "..." // Example "e7733c23-f541-49e2-bb05-ef4b20070150"
        }), 
        headers: { "Content-Type": "application/json" }
    })
```
Output:
```JS
{
	"user": {
		"id": "...",
		"first_name": "...",
		"last_name": "...",
		"email": "...",
		"password": "..."
	},
	"books": [
		{
			"id": "...",
      title: "...", 
      author: "aut...hor"
      "isbn": "...",
      "publication_date": "YYYY-MM-DD",
      "binding": "...",
      "user_id": "...",
			"available": "true"
		}
	]
}
```




