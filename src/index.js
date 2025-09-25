const { generateRsaKeyPair, signMessage, verifyMessage } = require('./crypto');
const { findNonce } = require('./pow');

async function runDemo() {
  const nickname = process.env.NICKNAME || 'david';
  const difficulty = process.env.DIFFICULTY ? Number(process.env.DIFFICULTY) : 4; // default 4 zeros

  console.log(`Nickname: ${nickname}`);
  console.log(`Difficulty (leading zeros): ${difficulty}`);

  // 1. generate keypair
  const { publicKey, privateKey } = generateRsaKeyPair();
  console.log('Generated RSA keypair.');

  // 2. find nonce with POW
  console.log('Searching for nonce (this may take a while for difficulty >=4)...');
  const { nonce, hash } = findNonce(nickname, difficulty);
  console.log(`Found nonce: ${nonce}`);
  console.log(`Hash: ${hash}`);

  // 3. sign "nickname + nonce" using private key
  const message = `${nickname}${nonce}`;
  const signature = signMessage(privateKey, message);
  console.log('Signature (base64):', signature.toString('base64'));

  // 4. verify using public key
  const ok = verifyMessage(publicKey, message, signature);
  console.log('Signature verification result:', ok);

  // quick sanity: verify the hash indeed starts with required zeros
  console.log('Hash startsWith zeros?', hash.startsWith('0'.repeat(difficulty)));
}

if (require.main === module) {
  runDemo().catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { runDemo };