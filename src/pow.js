const crypto = require('crypto');

function sha256Hex(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * findNonce: given nickname and difficulty (number of leading zeros), finds a nonce such that sha256(nickname+nonce) startsWith zeros
 * returns { nickname, nonce, hash }
 *
 * difficulty default = 4 (i.e. '0000')
 */
function findNonce(nickname, difficulty = 4, startNonce = 0) {
  const targetPrefix = '0'.repeat(difficulty);
  let nonce = startNonce;
  while (true) {
    const candidate = `${nickname}${nonce}`;
    const h = sha256Hex(candidate);
    if (h.startsWith(targetPrefix)) {
      return { nickname, nonce, hash: h };
    }
    nonce += 1;
  }
}

module.exports = { sha256Hex, findNonce };