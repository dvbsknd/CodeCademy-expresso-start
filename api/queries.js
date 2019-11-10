module.exports = {
    list: {
        employees: `SELECT * FROM Employee
            WHERE is_current_employee = 1`,
        timesheets: `SELECT * FROM Timesheet
            WHERE employee_id = ?`,
        menus: `SELECT * FROM Menu`,
        menuItems: `SELECT * FROM MenuItem
            WHERE menu_id = ?`
    },
     get: {
        employee: `SELECT * FROM Employee WHERE id = ?`,
        timesheet: `SELECT * FROM Timesheet WHERE id = ?
            AND employee_id = ?`,
        menu: `SELECT * FROM Menu WHERE id = ?`,
        menuItem: `SELECT * FROM MenuItem WHERE id = ?
            AND menu_id = ?`
     },
     add: {
        employee: `INSERT INTO Employee (
            name, position, wage) VALUES ($name, $position, $wage)`,
        timesheet: `INSERT INTO Timesheet (
            hours, rate, date, employee_id) 
            VALUES ($hours, $rate, $date, $employeeId)`,
        menu: `INSERT INTO Menu (title) VALUES ($title)`,
        menuItem: `INSERT INTO MenuItem (
            name, description, inventory, price, menu_id) 
            VALUES ($name, $description, $inventory, $price, $menuId)`
     },
     update: {
        employee: `UPDATE Employee SET
            name = $name,
            position = $position,
            wage = $wage
            WHERE id = $id`,
        timesheet: `UPDATE Timesheet SET
            hours = $hours,
            rate = $rate,
            date = $date,
            employee_id = $employeeId
            WHERE id = $id`,
        menu: `UPDATE Menu SET title = $title WHERE id = $id`,
        menuItem: `UPDATE MenuItem SET
            name = $name,
            description = $description,
            inventory = $inventory,
            price = $price,
            menu_id = $menuId
            WHERE id = $id`
     },
     delete: {
         employee: `UPDATE Employee
            SET is_current_employee = 0
            WHERE id = ?`,
         timesheet: `DELETE FROM Timesheet WHERE id = ?`,
         menu: `DELETE FROM Menu WHERE id = ?`,
         menuItem: `DELETE FROM MenuItem WHERE id = ?`
     }
}
