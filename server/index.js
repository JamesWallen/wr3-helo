require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCtrl = require('./controllers/authController');
const postCtrl = require('./controllers/postController');

const {SERVER_PORT, DB_URI, SESSION_SECRET} = process.env;

const app = express();

app.use(express.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

massive({
    connectionString: DB_URI,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db', db);
    console.log('DB is connected');
}).catch(err => console.log(err));

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.post('/auth/logout', authCtrl.logout);
app.get('/api/auth/me', authCtrl.loggedInUser);
app.get('/api/posts', postCtrl.getPosts);
app.get('/api/post/:id', postCtrl.getSinglePost);
app.post('/api/newpost', postCtrl.createNewPost);
app.delete('/api/deletepost/:id', postCtrl.deletePost);

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));