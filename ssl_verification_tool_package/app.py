from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/verify-ssl', methods=['POST'])
def verify_ssl():
    domain = request.json.get("domain")
    if not domain:
        return jsonify({"error": "Domain is required"}), 400

    try:
        command = ["openssl", "s_client", "-connect", f"{domain}:443", "-servername", domain]
        result = subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, input=b"", text=True)

        if result.returncode == 0:
            cert_data = result.stdout
            cert_file = f"{domain}_certificate.pem"
            with open(cert_file, "w") as f:
                f.write(cert_data)

            fingerprint_command = ["openssl", "x509", "-noout", "-fingerprint", "-sha256", "-inform", "pem", "-in", cert_file]
            fingerprint_result = subprocess.run(fingerprint_command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            if fingerprint_result.returncode == 0:
                fingerprint = fingerprint_result.stdout.strip()
                return jsonify({"fingerprint": fingerprint, "status": "success"})
            else:
                return jsonify({"error": "Failed to extract fingerprint"}), 500

        else:
            return jsonify({"error": "Failed to retrieve SSL certificate"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
