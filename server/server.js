const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', 8080);
app.use(bodyParser.json({type: 'application/json'})); 
app.use(bodyParser.urlencoded({extended: true}));

const { Pool } = require('pg');
const config = {
    host: 'localhost',
    port: 5432, 
    password: null,
    user: 'postgres',
    database: 'vaad_bayit'
}
const pool = new Pool(config);

pool.connect()
.then(() => console.log('connected to database'))
.catch(err => console.error('connection error:', err.stack));


app.get('/api/users/', async (req, res) => {
    try {
        const queryTemplate = 'SELECT first_name, last_name FROM users';
        const response = await pool.query(queryTemplate);
        
        if(response.rowCount === 0) {
            res.send('No results found for users')
        } else {
            res.send(response.rows);
        }
    } catch(err) {
        res.status(500).send(err.stack);
        console.error(err.stack);
    }
})

app.get('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const queryTempalate = 'SELECT first_name, last_name FROM users WHERE id = $1';
        const response = await pool.query(queryTempalate, [id]);  

        if(response.rowCount === 0) {
            res.send(`No results found for query: ${id}`)
        } else {
            res.send(response.rows[0]);
        }
    } catch(err) {
        res.status(500).send(err.stack);
        console.error(err.stack);
    }
})

app.post('/api/users/:id', async (req, res) => {
    const { first_name, last_name } = req.body;
    const id = req.params.id;
    
    try {
        const queryTempalate = 'INSERT INTO users VALUES ($1, $2, $3)';
        await pool.query(queryTempalate, [id, first_name, last_name]);
        res.send(`
        user added to data base: 
        id: ${id}, 
        first name: ${first_name}, 
        last name: ${last_name}
        `)
    } catch(err) {
        res.status(500).send(err.stack);
        console.error(err.stack);
    }
})

app.put('/api/users/:id', async (req, res) => {
    const { first_name, last_name } = req.body;
    const id = req.params.id;
    try {
        if (first_name) {
            const queryTempalate = 'UPDATE users SET first_name = $1 WHERE id = $2';
            await pool.query(queryTempalate, [first_name, id]);
        };
        if (last_name) {
            const queryTempalate = 'UPDATE users SET last = $1 WHERE id = $2';
            await pool.query(queryTempalate, [last_name, id]);
        };
        res.send('user updated');
    } catch(err) {
        res.status(500).send(err.stack);
        console.error(err.stack);
    }
})

app.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const queryTempalate = 'DELETE FROM users WHERE id = $1';
        await pool.query(queryTempalate, [id])
        res.send(`user with id '${id}' deleted from database`);
    } catch(err) {
        res.status(500).send(err.stack);
        console.error(err.stack);
    }
})

app.listen( app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
})
