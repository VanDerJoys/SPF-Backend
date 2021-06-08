const jwt = require('jsonwebtoken');

const webToken = {
    generateToken(tel){
        const token = jwt.sign({data: tel},process.env.TOKEN_SECRET, {expiresIn: '1h'});
        return token;
    },
    verifyToken (req, res, next){
        const token = req.header('authToken');
        if (!token) {
            return res.status(401).send('Accès refusé');
        }
    
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            next();
        } catch (error) {
            res.status(400).send('Utilisateur invalide')
        }
    }
}

module.exports = webToken;