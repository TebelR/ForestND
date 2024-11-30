
# This is a stub database for testing purposes
# It runs on a lot of assumptions and hope

import json

class DatabaseStub:
    def __init__(self):
        with open("db/nodeTable.json") as f:
            nodeTable = json.load(f)

        with open("db/edgeTable.json") as f:
            edgeTable = json.load(f)

        with open("db/treeFamilyTable.json") as f:
            treeFamilyTable = json.load(f)

        with open("db/snapshotTable.json") as f:
            snapshotTable = json.load(f)






    def getFamily(self,id):
        for family in self.treeFamilyTable:
            if family["id"] == id:
                return family
            
    def getSnapshots(self,id):
        snapshots = []
        for snapshot in self.snapshotTable:
            if snapshot["familyId"] == id:
                snapshots.append(snapshot)
        return snapshots

    def getNodes(self,id):
        nodes = []
        for node in self.nodeTable:
            if node["snapshotID"] == id:
                nodes.append(node)
        return nodes

    def getEdges(self,id):
        edges = []
        for edge in self.edgeTable:
            if edge["snapshotID"] == id:
                edges.append(edge)
        return edges

    def getFamilyIDs(self):
        familyIDs = []
        for family in self.treeFamilyTable:
            familyIDs.append(family["id"])
        return familyIDs

    def getSnapshotIDs(self):
        snapshotIDs = []
        for snapshot in self.snapshotTable:
            snapshotIDs.append(snapshot["snapshotId"])
        return snapshotIDs





    def postFamily(self,family):
        self.treeFamilyTable.append(family)
        return family

    def postSnapshot(self,snapshot):
        self.snapshotTable.append(snapshot)
        return snapshot





    def deleteFamily(self,id):
        for family in self.treeFamilyTable:
            if family["id"] == id:
                self.treeFamilyTable.remove(family)
                for snapshot in self.snapshotTable:
                    if snapshot["familyId"] == id:
                        self.snapshotTable.remove(snapshot)
                return
            
    def deleteSnapshot(self,id):
        for snapshot in self.snapshotTable:
            if snapshot["snapshotId"] == id:
                self.snapshotTable.remove(snapshot)
                return
            



    def shutdown(self):
        with open("db/nodeTable.json", "w") as f:
            json.dump(self.nodeTable, f)

        with open("db/edgeTable.json", "w") as f:
            json.dump(self.edgeTable, f)

        with open("db/treeFamilyTable.json", "w") as f:
            json.dump(self.treeFamilyTable, f)

        with open("db/snapshotTable.json", "w") as f:
            json.dump(self.snapshotTable, f)