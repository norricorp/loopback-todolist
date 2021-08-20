# nodejs-loopback-scaffold

This project is originally generated using `lb4` command from `@loopback/cli`. See [Getting started with LoopBack 4](https://loopback.io/doc/en/lb4/Getting-started.html) for more details.

It has been slightly tailored as a template for `appsody`.

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

It also includes a JAM stack application using Gridsome.

I have also adapted a todo app in Svelte that only uses id, title, isComplete - so no todolists -
and a todo can be created with just these fields. Is not part of a todo list.

To run the rest server
appsody run

Note that using appsody allows the app to be accessed from external browser.
Can also use npm start --host 0.0.0.0

curl commands for testing from windows
NB: password has to be at least 8 char
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"maria@email.com\", \"password\":\"12345678\"}" http:///mint20-loopback4:3000/signup
{
"id":"5bccc71d-38d3-463b-b081-5f82589636c4",
"email":"maria@email.com"
}

But I have now added authorization so I need to add roles to the user (admin, developers )
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"maria@email.com\", \"password\":\"12345678\", \"roles\":[\"developer\"]}" http:///mint20-loopback4:3000/signup

curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"maria@email.com\", \"password\":\"12345678\"}" http:///mint20-loopback4:3000/users/login

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyNjIzOTZhLTk4NmMtNDdmZS04ZGIxLTQzOTFlMDM2NDc1ZCIsImVtYWlsIjoibWFyaWFAZW1haWwuY29tIiwiaWF0IjoxNjE2Njc3NDY3LCJleHAiOjE2MTY2OTkwNjd9.eLDZiZz4N53aTv5nHwPE2a_2i14LN9GU6aUb22PoOgI"}

[Container] Try http://[::1]:3000/ping
[Container] NORRIS: user login: user is {"id":"23cbfef0-eef5-4872-9805-f8d51529d655","email":"maria@email.com","roles":["developer"]}
[Container] NORRIS: user login: userProfile is {"id":"23cbfef0-eef5-4872-9805-f8d51529d655","email":"maria@email.com","roles":["developer"]}
[Container] NORRIS: user login: token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzY2JmZWYwLWVlZjUtNDg3Mi05ODA1LWY4ZDUxNTI5ZDY1NSIsInJvbGVzIjpbImRldmVsb3BlciJdLCJpYXQiOjE2MjQzNTU0NDgsImV4cCI6MTYyNDM3NzA0OH0.owSqxKwBWvAWbJn8zTKm4vAA1b5xeT1J1gJbhKWK4Yw
[Container] NORRIS: entering basic authorizor
[Container] NORRIS: Ctx length is: 1
[Container] NORRIS: Ctx roles length is: 0
[Container] NORRIS: Ctx[0] is: {"id":"23cbfef0-eef5-4872-9805-f8d51529d655","roles":["developer"],"type":"USER"}
[Container] NORRIS: user is: {"id":"23cbfef0-eef5-4872-9805-f8d51529d655","roles":["developer"]}
[Container] NORRIS: current user object is: {"roles":["developer"]}
[Container] NORRIS: what is in roles: ["developer"]
[Container] NORRIS: current role includes admin or developer

Actually the todo list controller is NOT protected by authenticate.
Only the Todo controller is. So infact though the next curl works, it is not necessary.
It is necessary for todo

curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAyNjIzOTZhLTk4NmMtNDdmZS04ZGIxLTQzOTFlMDM2NDc1ZCIsImVtYWlsIjoibWFyaWFAZW1haWwuY29tIiwiaWF0IjoxNjE2Njc3NDY3LCJleHAiOjE2MTY2OTkwNjd9.eLDZiZz4N53aTv5nHwPE2a_2i14LN9GU6aUb22PoOgI" http:///mint20-loopback4:3000/todo-lists

works!
curl -k https://88.111.150.77:3000/todo-lists
curl http:///mint20-loopback4:3000/todo-lists
[
{
"id": 1,
"title": "Sith lord's check list",
"colour": "red"
},
{
"id": 2,
"title": "My daily chores",
"colour": "blue"
},
{
"id": 100,
"title": "grocery list"
}
]

curl http:///mint20-loopback4:3000/todos
[
{
"id": 1,
"title": "Take over the galaxy",
"desc": "MWAHAHAHAHAHAHAHAHAHAHAHAHAMWAHAHAHAHAHAHAHAHAHAHAHAHA",
"todoListId": 1
},
{
"id": 2,
"title": "destroy alderaan",
"desc": "Make sure there are no survivors left!",
"todoListId": 1
},
{
"id": 3,
"title": "play space invaders",
"desc": "Become the very best!",
"todoListId": 2
},
{
"id": 4,
"title": "crush rebel scum",
"desc": "Every.Last.One.",
"todoListId": 1
},
{
"id": 100,
"title": "get eggs",
"isComplete": false,
"todoListId": 100
}
]

curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"gardening list\"}" http:///mint20-loopback4:3000/todo-lists
{
"id": 101,
"title": "gardening list"
}

curl -X POST -H "Content-Type: application/json" -d "{\"title\":\"continue tar on shed\", \"isComplete\":false}" http:///mint20-loopback4:3000/todo-lists/101/todos
{
"id": 101,
"title": "continue tar on shed",
"isComplete": false,
"todoListId": 101
}

curl http:///mint20-loopback4:3000/todo-lists/101/todos
[
{
"id": 101,
"title": "continue tar on shed",
"isComplete": false,
"todoListId": 101
}
]

curl http:///mint20-loopback4:3000/todo-lists/101
{
"id": 101,
"title": "gardening list"
}

curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzY2JmZWYwLWVlZjUtNDg3Mi05ODA1LWY4ZDUxNTI5ZDY1NSIsImVtYWlsIjoibWFyaWFAZW1haWwuY29tIiwiaWF0IjoxNjI4NTg4NTE4LCJleHAiOjE2Mjg2MTAxMTh9.4aQVfsruB4SpaAxKZY_8LdGQGfMoQ0T0sOObrFPWdV0" http:///mint20-loopback4:3000/todos?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22todoListId%22%3A%20101%0A%20%20%7D%0A%7D

can we instead call http:///mint20-loopback4:3000/users/{userId}/todos ??

To run the gridsome app (in other window)
cd gridsome/todolist
gridsome develop

The code is hardcoded to use a server named mint20-loopback4 running on 8080

This is a play project
