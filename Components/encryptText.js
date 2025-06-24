import CryptoJS from 'crypto-js';
const key = 'XRZL@^spY*&q$w!9+UAD3Ftv7m28B';
const EncryptText = {
    set(value) {
        const stringValue = JSON.stringify(value);
        const encrypted = CryptoJS.AES.encrypt(stringValue, key).toString();
        return encrypted
    },

    get(value) {
        const encrypted = value;
        if (!encrypted) return null;
        try {
            const bytes = CryptoJS.AES.decrypt(encrypted, key);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (err) {
            console.error('Decryption failed:', err);
            return null;
        }
    },
};

export default EncryptText;