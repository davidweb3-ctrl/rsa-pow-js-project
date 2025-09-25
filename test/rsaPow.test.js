const { generateRsaKeyPair, signMessage, verifyMessage } = require('../src/crypto');
const { findNonce, sha256Hex } = require('../src/pow');

// We use a smaller difficulty for tests to ensure they run quickly.
const TEST_DIFFICULTY = 3; // 3 zeros is much faster in tests

test('generate keypair returns PEM strings', () => {
  const { publicKey, privateKey } = generateRsaKeyPair();
  expect(typeof publicKey).toBe('string');
  expect(publicKey.includes('BEGIN PUBLIC KEY')).toBe(true);
  expect(typeof privateKey).toBe('string');
  expect(privateKey.includes('BEGIN PRIVATE KEY')).toBe(true);
});

test('findNonce finds a hash with required leading zeros', () => {
  const nickname = 'unittest';
  const { nonce, hash } = findNonce(nickname, TEST_DIFFICULTY, 0);
  expect(typeof nonce).toBe('number');
  expect(hash.startsWith('0'.repeat(TEST_DIFFICULTY))).toBe(true);
  // verify sha256Hex(nickname+nonce) equals hash
  expect(sha256Hex(`${nickname}${nonce}`)).toBe(hash);
});

test('sign and verify message using RSA', () => {
  const nickname = 'unittest-sig';
  const { publicKey, privateKey } = generateRsaKeyPair();

  // for speed use small difficulty
  const { nonce } = findNonce(nickname, TEST_DIFFICULTY);
  const message = `${nickname}${nonce}`;

  const signature = signMessage(privateKey, message);
  const ok = verifyMessage(publicKey, message, signature);
  expect(ok).toBe(true);

  // tamper message
  const tampered = message + 'x';
  const ok2 = verifyMessage(publicKey, tampered, signature);
  expect(ok2).toBe(false);
});
