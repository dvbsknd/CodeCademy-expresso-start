#curl -d '{ "employee": { "name": "Dave", "position": "Doggy", "wage": "69" }}' -H "Content-type: application/json" -X POST http://localhost:4000/api/employees/
#curl -d '{ "employee": { "name": "Dave", "position": "Doggy", "wage": "69" }}' -H "Content-type: application/json" -X PUT http://localhost:4000/api/employees/5
#curl -H "Content-type: application/json" -X DELETE http://localhost:4000/api/employees/16
#curl -v -H "Content-type: application/json" -X GET http://localhost:4000/api/employees/999
#curl -H "Content-type: application/json" -X GET http://localhost:4000/api/employees/44/timesheets/
#curl -d '{ "timesheet": { "hours": 9, "rate": 134, "date": 334}}' -H "Content-type: application/json" -X POST http://localhost:4000/api/employees/2/timesheets
#curl -d '{ "timesheet": { "hours": 9, "rate": 134, "date": 666}}' -H "Content-type: application/json" -X PUT http://localhost:4000/api/employees/2/timesheets/8
#curl -v -H "Content-type: application/json" -X DELETE http://localhost:4000/api/employees/2/timesheets/5
curl -d '{ "menu": { "title": "Dave Special" }}' -H "Content-type: application/json" -X POST http://localhost:4000/api/menus/
#curl -H "Content-type: application/json" -X GET http://localhost:4000/api/employees/44/timesheets/
