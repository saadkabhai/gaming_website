import CryptoJS from 'crypto-js';
const key = 'XRZL@^spY*&q$w!9+UAD3Ftv7m28B';

const secureStorage = {
    set(keyName, value) {
        try {
            const stringValue = JSON.stringify(value);
            const encrypted = CryptoJS.AES.encrypt(stringValue, key).toString();
            localStorage.setItem(keyName, encrypted);
        } catch (error) {

        }
    },

    get(keyName) {
        try {
            const encrypted = localStorage.getItem(keyName);
            if (!encrypted) return null;
            const bytes = CryptoJS.AES.decrypt(encrypted, key);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decrypted);
        } catch (err) {
            console.error('Decryption failed:', err);
            return null;
        }
    },

    remove(keyName) {
        localStorage.removeItem(keyName);
    }
};

export default secureStorage;
