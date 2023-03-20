const { scryptSync, timingSafeEqual } = require('crypto');

const apiKeyAuth = (req, res, next) => {
    const apiKey = req?.headers['x-api-key'];

    if (!apiKey) {
        return res.status(401).json({ error: 'API key not found.' });
    }
    try {
        function compareKeys(storedKey, suppliedKey) {
            const [hashedPassword, salt] = storedKey.split('.');

            const buffer = scryptSync(suppliedKey, salt, 64);
            return timingSafeEqual(Buffer.from(hashedPassword, 'hex'), buffer);
        }

        if (compareKeys(apiKey, process.env.API_KEY_SECRET)) {
            next();
        } else {
            res.status(401).send("Api Key is not valid");
        }
    } catch (error) {
        res.status(401).send("Api Key is not valid");
    }
    
};

module.exports = { apiKeyAuth };