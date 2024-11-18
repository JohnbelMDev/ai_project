
// Basic encryption methods

// Caesar Cipher
function caesarCipher(str, shift) {
    return str.split('').map(char => {
        if (/[a-z]/i.test(char)) {
            const code = char.charCodeAt();
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

// Vigenère Cipher
function vigenereCipher(str, key, decrypt = false) {
    const shiftDirection = decrypt ? -1 : 1;
    return str.split('').map((char, i) => {
        if (/[a-z]/i.test(char)) {
            const code = char.charCodeAt();
            const base = code >= 65 && code <= 90 ? 65 : 97;
            const keyShift = (key[i % key.length].toLowerCase().charCodeAt() - base) * shiftDirection;
            return String.fromCharCode(((code - base + keyShift + 26) % 26) + base);
        }
        return char;
    }).join('');
}

// XOR Cipher
function xorCipher(str, key) {
    return str.split('').map((char, i) => {
        return String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length));
    }).join('');
}

// Hybrid Caesar-Vigenère Cipher
function hybridCipher(str, caesarShift, vigenereKey) {
    const caesarEncrypted = caesarCipher(str, caesarShift);
    return vigenereCipher(caesarEncrypted, vigenereKey);
}

// Placeholder AES (128-bit) Encryption
function aesEncrypt(str) {
    // This function would ideally use a real library like CryptoJS for AES
    return btoa(str); // Mock AES encryption with Base64
}

// Placeholder RSA Encryption
function rsaEncrypt(str) {
    return btoa(str.split('').reverse().join('')); // Mock RSA encryption
}

// SHA-256 Hashing (one-way)
function sha256(str) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(buffer => {
        return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    });
}

// Reverse Cipher
function reverseCipher(str) {
    return str.split('').reverse().join('');
}

// Base64 Encoding
function base64Encode(str) {
    return btoa(str);
}

// One-Time Pad (OTP)
function otpEncrypt(str, key) {
    return xorCipher(str, key); // XOR encryption serves as OTP if the key is random and unique
}

function encrypt() {
    const text = document.getElementById("inputText").value;
    const key = document.getElementById("keyInput").value;
    const cipherType = document.getElementById("cipherSelect").value;
    let result = "";

    switch (cipherType) {
        case 'caesar':
            result = caesarCipher(text, parseInt(key) || 0);
            break;
        case 'vigenere':
            result = vigenereCipher(text, key);
            break;
        case 'xor':
            result = xorCipher(text, key);
            break;
        case 'hybrid':
            result = hybridCipher(text, parseInt(key) || 0, key);
            break;
        case 'aes':
            result = aesEncrypt(text);
            break;
        case 'rsa':
            result = rsaEncrypt(text);
            break;
        case 'sha256':
            sha256(text).then(hash => document.getElementById("outputText").value = hash);
            return;
        case 'reverse':
            result = reverseCipher(text);
            break;
        case 'base64':
            result = base64Encode(text);
            break;
        case 'otp':
            result = otpEncrypt(text, key);
            break;
    }

    document.getElementById("outputText").value = result;
    analyzeText(result);
}

function decrypt() {
    const text = document.getElementById("inputText").value;
    const key = document.getElementById("keyInput").value;
    const cipherType = document.getElementById("cipherSelect").value;
    let result = "";

    switch (cipherType) {
        case 'caesar':
            result = caesarCipher(text, -(parseInt(key) || 0));
            break;
        case 'vigenere':
            result = vigenereCipher(text, key, true);
            break;
        case 'xor':
        case 'otp':
            result = xorCipher(text, key);
            break;
        case 'reverse':
            result = reverseCipher(text);
            break;
        case 'base64':
            result = atob(text);
            break;
        default:
            result = "Decryption not available for this cipher.";
    }

    document.getElementById("outputText").value = result;
    analyzeText(result);
}

// Basic analytics for keyword detection
function analyzeText(text) {
    const keywords = ["help", "urgent", "secure", "vote", "key"];
    const keywordCounts = {};
    keywords.forEach(keyword => {
        keywordCounts[keyword] = (text.match(new RegExp(keyword, 'gi')) || []).length;
    });

    const analyticsOutput = document.getElementById("analyticsOutput");
    analyticsOutput.innerHTML = `<ul>${Object.entries(keywordCounts).map(([key, count]) => `<li>${key}: ${count}</li>`).join('')}</ul>`;
}
