# rsa-pow-js-project

This project demonstrates generating an RSA keypair, performing a simple Proof-of-Work (POW) to find a nonce so that `sha256(nickname+nonce)` starts with a number of zeros, signing the resulting message with the private key and verifying with the public key.

**Notes:**
- Default POW difficulty is 4 leading zeros (i.e. `0000...`).
- For unit tests we reduce difficulty to keep tests fast; production/demo run uses difficulty 4.

## Install

```bash
npm install
```

## Run demo

```bash
npm start
```

## Run tests

```bash
npm test
```
