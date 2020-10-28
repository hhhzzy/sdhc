import * as CryptoJS from 'crypto-js'
import * as JsEncryptModule from 'jsencrypt'

const _KEY = '1234567890_1234567890_1234567890'
const _IV = 'cqgiszhyanetcore'
const publickey =
  // tslint:disable-next-line:max-line-length
  'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAs5TG23zgImDZrjMWvKm2xHyWaxM973QWDodSAsc547eGZIXA063ZRUPlzoCXJv3cZJJ3pX4WdOwDHkiiW1Sd1eV5w6DGg9aSOz9PpdI2+fLK5Re4s3JbumQNVR2SxtFqPdJGo6axDXdMgvnWJYtBCEi5btoqeddbAWnaugSuxnK4ZdVdTswW7e03l5Zw2ZbUtTTQUGp1tNhdanTszxjc5sHolzxf0zdlxV2woZ5sj0pj3a5AP6aYMEBiXuUYEyDx26Fi/ShRF0rF6J1qdT/OU79uq2yTZQBQISeW9zEPAb8vQnZEmOPjpxUCs5EW+HMleUTzAZOgBBd/W6WjsKoapwIDAQAB'

// 解密
export function AesDecrypt(str, keyval) {
    const keyvalue = (keyval + _KEY).substr(0, 32)
    const key = CryptoJS.enc.Utf8.parse(keyvalue)
    const iv = CryptoJS.enc.Utf8.parse(_IV)

    const encryptedHexStr = CryptoJS.enc.Hex.parse(str)
    const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)

    const decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}
// 加密
export function RsaEncrypt(str) {
    const encrypt = new JsEncryptModule.JSEncrypt()
    encrypt.setPublicKey(publickey)

    const encstr = encrypt.encrypt(str)
    return Base64ToHex(encstr)
}
// 加密
export function AesEncrypt(str, keyval) {
    const keyvalue = (keyval + _KEY).substr(0, 32)

    const key = CryptoJS.enc.Utf8.parse(keyvalue)
    const iv = CryptoJS.enc.Utf8.parse(_IV)

    const srcs = CryptoJS.enc.Utf8.parse(str)

    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.ciphertext.toString()
}

// 验证签名，并解密
export function SignAndDecrypt(str, sign, key) {
    const encrypt = new JsEncryptModule.JSEncrypt()
    encrypt.setPublicKey(publickey)

    const md5 = Md5(str)
    const s = HexToBase64(sign)
    const result = encrypt.verify(md5, s, CryptoJS.SHA256)
    if (!result) {
        console.error('验证不通过')
    }
    return AesDecrypt(str, key)
}
export function Md5(str) {
    const hs = CryptoJS.MD5(str)
    return hs.toString()
}
function HexToBase64(str) {
    const data = CryptoJS.enc.Hex.parse(str)
    return CryptoJS.enc.Base64.stringify(data)
}

function Base64ToHex(str) {
    const data = CryptoJS.enc.Base64.parse(str)
    return CryptoJS.enc.Hex.stringify(data)
}
