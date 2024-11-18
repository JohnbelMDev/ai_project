
// Caesar Cipher encryption and decryption
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

function encrypt() {
    const text = document.getElementById("inputText").value;
    const shift = parseInt(document.getElementById("shift").value);
    const encrypted = caesarCipher(text, shift);
    document.getElementById("outputText").value = encrypted;
    analyzeText(encrypted);
}

function decrypt() {
    const text = document.getElementById("inputText").value;
    const shift = parseInt(document.getElementById("shift").value);
    const decrypted = caesarCipher(text, -shift);
    document.getElementById("outputText").value = decrypted;
    analyzeText(decrypted);
}

// Simple analytics for keyword and pattern detection
function analyzeText(text) {
    const keywords = ["help", "urgent", "secure", "key"];
    const keywordCounts = {};
    let unusualPatterns = false;

    keywords.forEach(keyword => {
        const count = (text.match(new RegExp(keyword, 'gi')) || []).length;
        keywordCounts[keyword] = count;
        if (count > 0) unusualPatterns = true;
    });

    const analyticsOutput = document.getElementById("analyticsOutput");
    analyticsOutput.innerHTML = `
        <p><strong>Keyword Analysis:</strong></p>
        <ul>
            ${Object.entries(keywordCounts).map(([key, count]) => `<li>${key}: ${count}</li>`).join('')}
        </ul>
        ${unusualPatterns ? "<p><strong>Pattern detected</strong></p>" : "<p>No unusual patterns</p>"}
    `;
}
