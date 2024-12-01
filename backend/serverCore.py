from flask import Flask, jsonify
from flask import Flask, request
from flask_cors import CORS
from datetime import datetime
from db.databaseStub import DatabaseStub

app = Flask(__name__)
CORS(app,supports_credentials=True)  # CORS for cross-origin requests, don't know how DNS works in our case

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
    nodes = db.getNodes(snapshotId)
    #print(nodes)
    return jsonify(nodes)


@app.route('/api/v0/findEdges', methods=['GET'])
def getEdges():
    snapshotId = request.args.get('snapshotId')
    edges = db.getEdges(snapshotId)
    return jsonify(db.getEdges(snapshotId))

@app.route('/api/v0/getLastSnap', methods=['GET'])
def getLastSnap():
    
    familyId = request.args.get('familyId')
    # print("Retrieving last snapshot for familyId " + familyId)
    snapshots = db.getSnapshots(familyId)
    
    #now get the snapshot with the most recent creationDate
    targetId = "0"
    maxDate = datetime.strptime("0001-01-01 00:00:00", '%Y-%m-%d %H:%M:%S')
    for snapshot in snapshots:
        comparableDate = datetime.strptime(snapshot["creationDate"], '%Y-%m-%d %H:%M:%S')
       # print("Comparing " + str(comparableDate) + " to " + str(maxDate))
        if(comparableDate > maxDate):
            targetId = str(snapshot["snapshotId"])
            maxDate = comparableDate
    snapshotId = targetId
   #print("Returning snapshotId " + snapshotId) 
    output = jsonify(db.getSnapshot(snapshotId))

    return output






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
    try:
        data = request.get_json()
        if(data == None):
            return jsonify({"error": "No data"}), 421
        
        #print(data)
        if not all(k in data for k in ("familyId", "snapshotId", "creationDate")):
            return jsonify({"error": "Missing required fields"}), 422
        familyId = data["familyId"]
        snapshotId = data["snapshotId"]
        creationDate = data["creationDate"]
        nodes = data["nodes"]
        edges = data["edges"]

        snapshots = db.getSnapshotIDsforFam(familyId)
        if(snapshotId in snapshots):
            return jsonify({"error": "Snapshot already exists"}), 420
        
        for node in nodes:
            node["snapshotId"] = snapshotId
        for edge in edges:
            edge["snapshotId"] = snapshotId

        snapshot = {"snapshotId": snapshotId, "familyId": familyId, "creationDate": creationDate}
        
        db.postSnapshot(snapshot)

        for node in nodes:
            db.postNode(node)
        for edge in edges:
            db.postEdge(edge)
            # print("Posting edge: " + str(edge))
        
        return jsonify({"success": "Snapshot created"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500
    







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



if __name__ == '__main__':
    app.run(debug=True, threaded=True, host='127.0.0.1', port=5000)#configure port
    print("Server started")