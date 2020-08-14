const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body;        

        const db = req.app.get('db');
        const results = await db.get_user([username]);
        const existingUser = results[0];
        if (existingUser) {
            return res.status(409).send('Username is taken');
        }
        const profilePic = `https://robohash.org/${username}`
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registerUser = await db.register_user([username, hash, profilePic]);
        const user = registerUser[0];
        // console.log(user);
        req.session.userid = user.user_id
        return res.status(201).send(user);
    },
    login: async (req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');
        const results = await db.get_existing_user([username]);
        const existingUser = results[0];
        if (!existingUser) {
            return res.status(401).send('User not found. Please register as a new user before logging in.');
        }
        const isAuthenticated = bcrypt.compareSync(password, existingUser.password);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password');
        }
        // console.log(existingUser);
        req.session.userid = existingUser.user_id;
        return res.status(200).send(existingUser);
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    },
    loggedInUser: (req, res) => {
        const userid = req.session.userid;
        const db = req.app.get('db');
        db.get_current_user([userid])
            .then(user => {
                // console.log(user[0]);
                res.status(200).send(user[0]);
            })
            .catch(err => res.status(500).send(err));
    }
}