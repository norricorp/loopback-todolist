
echo "\nget TODOS"
curl -k -w "\n" http://localhost:3000/todos

echo "\nget TODO ONE"
curl -k -w "\n" http://localhost:3000/todos/2

echo "\npost TODO"
curl -k -w "\n" -X POST -d '{"title":"dougie","desc":"doug@email.com"}' -H "Content-Type: application/json" http://localhost:3000/todos

echo "\nget TODOS AGAIN"
curl -k -w "\n" http://localhost:3000/todos

echo "\nget TODO 100"
curl -k -w "\n" http://localhost:3000/todos/100


echo "\nedit TODO"
curl  -k -w "\n" -X PATCH -d '{"title":"Rebuild Alderaan"}' -H "Content-Type: application/json" http://localhost:3000/todos/2

echo "\nget TODO 2"
curl -k -w "\n" http://localhost:3000/todos/2

echo "\ndelete TODO"
curl  -k -w "\n" -X DELETE  http://localhost:3000/todos/100

curl -k -w "\n" http://localhost:3000/todos

