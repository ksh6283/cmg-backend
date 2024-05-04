const {createSignature} = require('../../config/jwt')

const auth = (req, res, next) => {
    try{
        const {AccessToken} = req.cookies
        const header = AccessToken.split('.')[0]
        const payload = AccessToken.split('.')[1]
        const signature = AccessToken.split('.')[2]
        const sign = createSignature(header,payload)

        if(sign !==signature) throw new Error('poisoned cookie')
        const user = JSON.parse(Buffer.from(payload, 'base64').toString('utf-8'))
        req.user = {
            ...user
        }
        next()
    } catch {
        next()
    }
}



module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login');
    }
    next();
}