from flask import Flask, jsonify
from flask import Flask, request
from flask_cors import CORS

from db.databaseStub import DatabaseStub

app = Flask(__name__)
CORS(app)  # CORS for cross-origin requests, don't know how DNS works in our case

db = DatabaseStub()


@app.route('/api/v0/findFamily', methods=['GET'])
def getTreeFamily():
    familyId = request.args.get('familyId')
    return jsonify(db.getFamily(familyId))


@app.route('/api/v0/findSnapshots', methods=['GET'])
def getSnapshots():
    familyId = request.args.get('familyId')
    return jsonify(db.getSnapshots(familyId))


@app.route('/api/v0/findNodes', methods=['GET'])
def getNodes():
    snapshotId = request.args.get('snapshotId')
    return jsonify(db.getNodes(snapshotId))


@app.route('/api/v0/findEdges', methods=['GET'])
def getEdges():
    snapshotId = request.args.get('snapshotId')
    return jsonify(db.getEdges(snapshotId))




@app.route('/api/v0/createFamily', methods=['POST'])
def createFamily():
    familyId = request.args.get('familyId')
    families = request.args.get('families')
    if(familyId in families):
        return jsonify({"error": "Family already exists"}), 420
    
    db.postFamily(familyId)
    return jsonify({"success": "Family created"}), 200


@app.route('/api/v0/createSnapshot', methods=['POST'])
def createSnapshot():
    snapshotId = request.args.get('snapshotId')
    familyId = request.args.get('familyId')
    snapshots = db.getSnapshotIDs()
    if(snapshotId in snapshots):
        return jsonify({"error": "Snapshot already exists"}), 420
    
    db.postSnapshot(snapshotId, familyId)
    return jsonify({"success": "Snapshot created"}), 200





@app.route('/api/v0/deleteFamily', methods=['DELETE'])
def deleteFamily():
    familyId = request.args.get('familyId')
    families = db.getFamilyIDs()
    if(familyId not in families):
        return jsonify({"error": "Family does not exist"}), 420
    
    db.deleteFamily(familyId)
    return jsonify({"success": "Family deleted"}), 200

@app.route('/api/v0/deleteSnapshot', methods=['DELETE'])
def deleteSnapshot():
    snapshotId = request.args.get('snapshotId')
    snapshots = db.getSnapshotIDs()
    if(snapshotId not in snapshots):
        return jsonify({"error": "Snapshot does not exist"}), 420
    
    db.deleteSnapshot(snapshotId)
    return jsonify({"success": "Snapshot deleted"}), 200



@app.route('/api/v0/shutdown', methods=['POST'])
def shutdown():
    db.shutdown()
    return jsonify({"success": "Server shutdown"}), 200

if __name__ == '__main__':
    app.run(debug=True, threaded=True)