const jwt =  require('express-jwt')
const secret= process.env.JWT_Key;
const {getUserById} = require('../queries/users')
module.exports = authorize;

function authorize(roles = []){
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        jwt({ secret:secret, algorithms: ['HS256'] }),

        (req,res,next) => {
            if (roles.length && !roles.includes(req.user.roles)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }
            if(req.user.roles=="user"){
                getUserById(req.user.id).then(
                    user => {
                        if (user) {
                            req.user = user
                            req.userType = 'User'
                            next()
                        } else {
                        return res.status(404).json({ message: 'User Not Found' })
                        }}
                )
            }
        }

    ]
}