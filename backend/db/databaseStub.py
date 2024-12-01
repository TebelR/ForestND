
# This is a stub database for testing purposes
# It runs on a lot of assumptions and hope

import json
import sys
import os
nodeTable = []
edgeTable = []
treeFamilyTable = []
snapshotTable = []

class DatabaseStub:
    def __init__(self):
        base_path = getattr(sys, '_MEIPASS', os.path.dirname(os.path.abspath(__file__)))

        with open(os.path.join(base_path,"db/nodeTable.json")) as f:
            self.nodeTable = json.load(f)

        with open(os.path.join(base_path,"db/edgeTable.json")) as f:
            self.edgeTable = json.load(f)

        with open(os.path.join(base_path,"db/treeFamilyTable.json")) as f:
            self.treeFamilyTable = json.load(f)

        with open(os.path.join(base_path,"db/snapshotTable.json")) as f:
            self.snapshotTable = json.load(f)

        




    def getFamily(self,id):
        for family in self.treeFamilyTable:
            if str(family["id"]) == str(id):
                return family
            
    def getSnapshots(self,id):
        snapshots = []
        for snapshot in self.snapshotTable:
            if str(snapshot["familyId"]) == str(id):
                snapshots.append(snapshot)
        return snapshots

    def getNodes(self,id):
        nodes = []
        for node in self.nodeTable:
            if str(node["snapshotId"]) == str(id):
                nodes.append(node)
        return nodes

    def getEdges(self,id):
        edges = []
        for edge in self.edgeTable:
            if str(edge["snapshotId"]) == str(id):
                edges.append(edge)
        return edges

    def getFamilyIDs(self):
        familyIDs = []
        for family in self.treeFamilyTable:
            familyIDs.append(family["id"])
        print("Family IDs: ", familyIDs)
        return familyIDs

    def getSnapshotIDsforFam(self, id):
        snapshotIDs = []
        for snapshot in self.snapshotTable:
            if str(snapshot["familyId"]) == str(id):
                snapshotIDs.append(snapshot["snapshotId"])
        return snapshotIDs

    def getSnapshot(self,id):
            for snapshot in self.snapshotTable:
                if str(snapshot["snapshotId"]) == str(id):
                    return snapshot
                
    def getFamilyNames(self):
        familyNames = []
        for family in self.treeFamilyTable:
            familyNames.append(family["familyName"])
        return familyNames




    def postFamily(self,family):
        self.treeFamilyTable.append(family)
        return family

    def postSnapshot(self, snapshot):
        self.snapshotTable.append(snapshot)
        #print("SNAPSHOTS: ", self.snapshotTable)
        return snapshot

    def postNode(self,node):
        self.nodeTable.append(node)
        return node

    def postEdge(self,edge):
        self.edgeTable.append(edge)
        return edge




    def deleteFamily(self,id):
        for family in self.treeFamilyTable:
            if str(family["id"]) == (id):
                self.treeFamilyTable.remove(family)
                for snapshot in self.snapshotTable:
                    if str(snapshot["familyId"]) == (id):
                        self.snapshotTable.remove(snapshot)
                return
            
    def deleteSnapshot(self,id):
        for snapshot in self.snapshotTable:
            if str(snapshot["snapshotId"]) == str(id):
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