from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route('/api/graph', methods=['GET'])
def get_graph():
    return jsonify({"nodes": [{"id": 1}, {"id": 2}], "edges": [{"source": 1, "target": 2}]})

if __name__ == '__main__':
    app.run(debug=True)