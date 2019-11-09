curl -d '{ "employee": { "name": "Dave", "position": "Doggy", "wage": "69" }}' -H "Content-type: application/json" -X POST http://localhost:4000/api/employees/
# curl -d '{ "employee": { "name": "Dave", "position": "Doggy", "wage": "69" }}' -H "Content-type: application/json" -X PUT http://localhost:4000/api/employees/5
# curl -H "Content-type: application/json" -X DELETE http://localhost:4000/api/employees/8
# curl -v -H "Content-type: application/json" -X GET http://localhost:4000/api/employees/999
