const Pool = require('pg').Pool;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '6210',
    database: 'user_db'
})



const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.send(results.rows)
    })
}
const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.send(results.rows)
    })
}
const createUser = (request, response) => {
    const id = parseInt(request.params.id)
    const name = request.params.name
    const email = request.params.email
    pool.query('INSERT INTO users (id, name, email) VALUES ($1,$2,$3)',[id,name,email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added : ` + id + ' ' + name + ' ' + email);
    })
}
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const name = request.params.name
    const email = request.params.email
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 ',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID : ` + id);
        }
    )
}
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send('User deleted with ID: ' + id)
    })
}
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
}