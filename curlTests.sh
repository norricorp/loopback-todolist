curl -k -X POST -H "Content-Type: application/json" -d "{\"email\":\"maria@email.com\", \"password\":\"12345678\"}" https:///mint20-loopback4:3000/users/login



curl -k -H "Content-Type: application/json" -H "Authorization: Bearer XXX" https:///mint20-loopback4:3000/todos


curl -k -H "Content-Type: application/json" -H "Authorization: Bearer XXX" https:///mint20-loopback4:3000/todo-lists


curl -k -X POST -H "Content-Type: application/json" -H "Authorization: Bearer XXX" -d "{\"title\":\"continue tar on shed\", \"isComplete\":false}" https:///mint20-loopback4:3000/todo-lists/101/todos


curl -k -H "Authorization: Bearer XXX" https:///mint20-loopback4:3000/todo-lists/101/todos


curl -k -H "Authorization: Bearer XXX" https:///mint20-loopback4:3000/user/23cbfef0-eef5-4872-9805-f8d51529d655/todos



curl -k -X POST -H "Content-Type: application/json" -H "Authorization: Bearer XXX" -d "{\"title\":\"paint stairwell\", \"isComplete\":false}" https:///mint20-loopback4:3000/user/23cbfef0-eef5-4872-9805-f8d51529d655/todos
