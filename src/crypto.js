const crypto = require('crypto');

function generateRsaKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem'
    }
  });
  return { publicKey, privateKey };
}

function signMessage(privateKeyPem, message) {
  // message: Buffer or string
  const sign = crypto.createSign('sha256');
  sign.update(message);
  sign.end();
  const signature = sign.sign(privateKeyPem);
  return signature; // Buffer
}

function verifyMessage(publicKeyPem, message, signature) {
  const verify = crypto.createVerify('sha256');
  verify.update(message);
  verify.end();
  return verify.verify(publicKeyPem, signature);
}

module.exports = {
  generateRsaKeyPair,
  signMessage,
  verifyMessage
};
