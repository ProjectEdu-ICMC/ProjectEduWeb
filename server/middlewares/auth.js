const { auth } = require('../fire.js');

module.exports = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) return res.send({ message: 'No token.' }).status(401);

    if (tokenHeader.split(' ')[0] !== 'Bearer')
        return res.send({ message: 'Invalid token.' }).status(401);

    const token = tokenHeader.split(' ')[1];
    auth.verifyIdToken(token)
        .then((decoded) => {
            res.locals.uid = decoded.uid;
            next();
        })
        .catch((error) => {
            console.log('middleware error: ', error);
            return res
                .send({
                    code: error.code,
                    message: error.message,
                })
                .status(401);
        });
};
