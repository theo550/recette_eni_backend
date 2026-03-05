// auth/keycloak.js
import jwksRsa from 'jwks-rsa';
import jwt from 'jsonwebtoken';

const client = jwksRsa({
    jwksUri: 'http://localhost:8080/realms/myrealm/protocol/openid-connect/certs'
});

const getKey = (header, callback) => {
    client.getSigningKey(header.kid, (err, key) => {
        callback(err, key?.getPublicKey());
    });
};

export const verifyToken = (token) =>
    new Promise((resolve, reject) => {
        jwt.verify(token, getKey, {
            audience: 'myapp',
            issuer: 'http://localhost:8080/realms/myrealm',
        }, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        });
    });
