module.exports = {
    list: {
        employees: `SELECT * FROM Employee
            WHERE is_current_employee = 1`
    },
//   get:
     add: {
         employees: `INSERT INTO Employee (
         name, position, wage) VALUES ($name, $position, $wage);`
     }
//   update:
//   delete:
}
