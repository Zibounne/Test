const db = require('../../config/db.config');

async function checkUserExistsMiddleware(req, res, next) {

    const { username, email } = req.body;

    const query = 'SELECT * FROM users WHERE username = ? OR email = ?';
    
    db.query(query, [username, email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error', error: err });
        }

        else if (results.length > 0) {
            return res.status(409).json({ message: 'Username or email already used' });
        }

        next();
    });
    
}

module.exports = checkUserExistsMiddleware;