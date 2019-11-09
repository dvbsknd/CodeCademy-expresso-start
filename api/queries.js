module.exports = {
    list: {
        employees: `SELECT * FROM Employee
            WHERE is_current_employee = 1;`
    },
     get: {
        employee: `SELECT * FROM Employee WHERE id = ?;`
     },
     add: {
        employees: `INSERT INTO Employee (
        name, position, wage) VALUES ($name, $position, $wage);`
     },
     update: {
        employee: `UPDATE Employee SET
            name = $name,
            position = $position,
            wage = $wage
            WHERE id = $id;`
     },
     delete: {
         employee: `DELETE FROM Employee WHERE id = ?`
     }
}
