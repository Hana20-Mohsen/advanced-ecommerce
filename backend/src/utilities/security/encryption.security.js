import CryptoJS from 'crypto-js'

export const generateEncryption=({plainText='' , signature=process.env.PHONE_ENCRYPTION_SIGNATURE})=>{
    const encryption= CryptoJS.AES.encrypt(plainText , signature).toString()
    return encryption

}

export const generateDecryption=({cipherText='' , signature=process.env.PHONE_ENCRYPTION_SIGNATURE})=>{
    const decryption= CryptoJS.AES.decrypt(cipherText , signature).toString(CryptoJS.enc.Utf8)
    return decryption

}
