// src/CytoscapeComponent.js
import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import "../Styles/commdBranch.css";
import axios from 'axios';
import { useState } from 'react';
import GraphTools from '../components/GraphTools';
import SavedSection from '../components/savedSection';
import ReactDOM from 'react-dom';

const SEPARATION_DIST_LOW = 100;
const SEPARATION_DIST_HIGH = 150;


function CommdBranch() {

   //put graph data in state
   //this is done because of async nature of fetching data
   const [formattedNodes, setFormattedNodes] = useState([]);
   const [formattedEdges, setFormattedEdges] = useState([]);

   //const [refreshSavedSection, setRefreshSavedSection] = useState(() => () => { });

   const [cyInstance, setCyInstance] = useState(null);
   const [createEdgeMode, setCreateEdgeMode] = useState(false);
   const [sourceNode, setSourceNode] = useState(null);
   const [targetNode, setTargetNode] = useState(null);

   let familyName = React.useRef("");
   let snapshot = React.useRef("");
   let creationDate = React.useRef("");

   //fetch graph data on first render
   useEffect(() => {
      fetchData();
   }, []);


   function buildGraphInfo(familyName, snapshot, creationDate) {
      let graphInfo = document.createElement('div');
      graphInfo.className = 'graphInfo';
      graphInfo.innerHTML = "<p class='info'></p>";

      let info = graphInfo.querySelector('.info');
      info.textContent = "Family: " + familyName + " | Snapshot: " + snapshot + " | Creation Date: " + creationDate;
      document.querySelector('.commdBranch').innerHTML = "";
      document.querySelector('.commdBranch').appendChild(graphInfo);
   }


   function buildTree(formattedNodes, formattedEdges) {
      // console.log(formattedNodes);
      // console.log(formattedEdges);
      //console.log("BUILDING TREE at " + new Date().toLocaleTimeString());
      //console.log(formattedNodes);
      //console.log(formattedEdges);
      let cy = cytoscape({
         container: document.querySelector('.commdBranch'),
         elements: [
            ...formattedNodes,
            ...formattedEdges
         ],
         style: [
            {
               selector: 'node',
               style: {
                  'background-color': '#aaaaaa',
                  'label': 'data(name)',
                  'text-valign': 'center',
                  'text-halign': 'center',
                  'text-wrap': 'wrap',
                  'text-max-width': '100px',
                  'transition-property': 'background-color',
                  'transition-duration': '0.5s',
                  'transition-timing-function': 'ease-in-out',
                  'width': '30%',
                  'height': '30%',
                  'font-size': '10%',
                  'color': '#000000'
               }
            },
            {
               selector: 'edge',
               style: {
                  'curve-style': 'taxi',
                  'target-arrow-shape': 'none',
                  'line-color': '#ffffff',
                  'target-arrow-color': '#666',
                  'taxi-direction': 'vertical',
                  'source-endpoint': '0% 0%',
                  'target-endpoint': '0% 50%',
                  'taxi-turn': 20,
               }
            },
            {
               selector: '.focused',
               style: {
                  'background-color': '#9003fc',
                  'line-color': '#9003fc', // Highlighted edge color
                  'border-width': '3px', // Additional visual cue for nodes
                  'border-color': '#9003fc',
               }
            },
            {
               selector: '.temporary-node',
               style: {
                  'display': 'none',
               }
            },
            {
               selector: '.temporary-edge',
               style: {
                  'curve-style': 'taxi',
                  'target-arrow-shape': 'none',
                  'line-color': '#9003fc',
                  'target-arrow-color': '#666',
                  'taxi-direction': 'vertical',
                  'source-endpoint': '0% 0%',
                  'target-endpoint': '0% 50%',
                  'taxi-turn': 20,
               }
            }
         ],
         layout: {
            name: 'breadthfirst',

            fit: true,
            directed: true,
            padding: 40,
            circle: false,
            spacingFactor: 0.8,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            roots: parseInt(getRootNode(formattedNodes)),
            animate: true,
            animationDuration: 200,
            animationEasing: 'ease-out-circ',
            transform: function (node, position) {
               let matchId = node.data('id');
               let matchedNode = formattedNodes.find(node => node.data.id === matchId);

               position.x = matchedNode.data.position.x;
               position.y = matchedNode.data.position.y;
               return position;
            }
         }
      });
      setCyInstance(cy);

   }




   //different render of the graph that will wait for tree data to be fetched
   useEffect(() => {
      if (formattedNodes.length > 0 && formattedEdges.length > 0) {
         if (document.querySelector('.commdBranch') === null) return;

         if (!cyInstance) return;

         const cy = cyInstance;
         cy.on('drag', 'node', function (event) {
            const node = event.target;
            const position = node.position();

            let edges = cy.edges();
            let incomingEdges = [];
            edges.forEach((edge) => {
               if (edge.data('target') === node.id()) {
                  //console.log("found incoming edge");
                  incomingEdges.push(edge);
               }
            });
            if (incomingEdges.length > 0)
               updateEdge(node, incomingEdges[0], cy);
         });

         cy.on('dragfree', 'node', function (event) {
            const node = event.target;
            const position = node.position();

            // Snap to the nearest row
            const snappedY = Math.round(position.y / 100) * 100;
            node.position({ x: position.x, y: snappedY });

            // const newLevel = Math.floor(snappedY / 100);
            // node.data('level', newLevel);
         });


         cy.on('click', 'node', (event) => {
            const node = event.target;
            //console.log(`Clicked node: ${node.data('id')}`);
         });

         cy.on('mouseover', 'node', (event) => {
            const node = event.target;
            node.style('background-color', '#9003fc');
         });

         cy.on('mouseout', 'node', (event) => {
            const node = event.target;
            node.style('background-color', '#aaaaaa');
         });


         cy.on('click', 'node, edge', (event) => {
            const clickedElement = event.target;

            cy.elements().removeClass('focused');
            console.log("focused on: ", clickedElement);
            clickedElement.addClass('focused');
         });


         //If the user clicks on the background, unfocus all elements
         cy.on('click', (event) => {
            if (event.target === cy) {
               cy.elements().removeClass('focused');
            }
         });

         setCyInstance(cy);

         return () => {
            cy.destroy();
         }
      }
   }, [cyInstance, formattedNodes, formattedEdges]);







   useEffect(() => {
      if (!cyInstance) return;


      //Select two nodes to make an edge between them
      const handleMouseDown = (event) => {
         if (!createEdgeMode || !event.target.isNode()) return;
         if (sourceNode && event.target === sourceNode) {
            setCreateEdgeMode(false);
            return;
         }
         if (!sourceNode)
            setSourceNode(event.target);

         if (sourceNode && event.target !== sourceNode) {
            setTargetNode(event.target);
            if (sourceNode.level < event.target.level) {
               cyInstance.add({
                  group: 'edges',
                  data: { id: `${event.target.id()}-${sourceNode.id()}`, source: event.target.id(), target: sourceNode.id() }
               })
            } else {
               cyInstance.add({
                  group: 'edges',
                  data: { id: `${sourceNode.id()}-${event.target.id()}`, source: sourceNode.id(), target: event.target.id() }
               })
            }

            setCreateEdgeMode(false);
            setSourceNode(null);
            setTargetNode(null);
         }
      };


      cyInstance.off('drag', 'node', 'dragfree', 'node');
      cyInstance.on('mousedown', 'node', handleMouseDown);


      return () => {
         cyInstance.off('mousedown', 'node', handleMouseDown);
      };


   }, [cyInstance, createEdgeMode, sourceNode, targetNode]);



   const resetGraph = () => {
      if (cyInstance)
         cyInstance.destroy();
      setCyInstance(null);
      try {
         fetchData();//redraw everything with new data
      } catch (err) {
         alert("Refreshing too fast : " + err);
      }
   };


   function recenter() {
      cyInstance.center();
      cyInstance.fit();
   }


   function saveGraph() {
      const cy = cyInstance;
      const nodes = cy.nodes();
      const nodePositions = cy.nodes().map(node => ({
         id: node.id(),
         position: node.position()
      }));
      const edges = cy.edges();
      const nodeData = nodes.map(node => ({
         nodeId: node.data('id'),
         familyId: familyName.current,
         snapshotId: snapshot.current,
         serviceNum: node.data('name'),
         level: node.data('level'),
         driverQualWheel: node.data('driverQualWheel'),
         driverQualMS: node.data('driverQualMS'),
         course: node.data('course'),
         forceTest: node.data('forceTest'),
         firstAid: node.data('firstAid')
      }));
      for (let i = 0; i < nodeData.length; i++) {
         for (let j = 0; j < nodePositions.length; j++) {
            if (nodeData[i].nodeId === nodePositions[j].id) {
               nodeData[i].x = nodePositions[j].position.x;
               nodeData[i].y = nodePositions[j].position.y;
            }
         }
      }
      const edgeData = edges.map(edge => ({
         edgeId: edge.id(),
         familyId: familyName.current,
         snapshotId: snapshot.current,
         startNodeId: edge.data('source'),
         endNodeId: edge.data('target')
      }));

      snapshot.current = parseInt(snapshot.current) + 1;
      creationDate.current = new Date().toISOString().slice(0, 19).replace('T', ' ');
      // console.log("NEW CREATION DATE: ", creationDate.current);
      const data = {
         familyId: familyName.current,
         snapshotId: snapshot.current,
         creationDate: creationDate.current,
         nodes: nodeData,
         edges: edgeData
      };

      //console.log(edgeData);
      axios.post('http://localhost:5000/api/v0/createSnapshot', data)
         .catch(error => {
            console.error(error);
         });
   }






   async function fetchData() {
      const graphData = await fetchTreeData();
      let nodeData = graphData[1];
      let edgeData = graphData[2];
      console.log("GRAPH DATA: ", graphData);
      if (nodeData.length === 0 || edgeData.length === 0) return;
      //console.log("fetching data, old fam name is: ", familyName.current, snapshot.current, creationDate.current);
      //familyName.current = String(graphData[0].familyId);
      snapshot.current = String(graphData[0].snapshotId);
      creationDate.current = String(graphData[0].creationDate);
      //console.log("new fam name is: ", familyName.current, snapshot.current, creationDate.current);


      nodeData.reverse();
      //console.log("NODE DATA: ", nodeData);
      let formattedNodes = [];
      if (nodeData[0].x && nodeData[0].y) {
         formattedNodes = nodeData.map(node => ({
            data: {
               id: String(node.nodeId),
               familyId: String(node.familyId),
               name: String(node.serviceNum),
               level: node.level,
               position: { x: node.x, y: node.y },
               driverQualWheel: node.driverQualWheel,
               driverQualMS: node.driverQualMS,
               course: node.course,
               forceTest: node.forceTest,
               firstAid: node.firstAid
            }
         }));
      } else {
         //give random positions if positional data is bad
         formattedNodes = nodeData.map(node => ({
            data: {
               id: String(node.nodeId),
               familyId: String(node.familyId),
               name: String(node.serviceNum),
               level: node.level,
               position: { x: Math.random() * document.querySelector('.commdBranch').offsetWidth, y: Math.random() * document.querySelector('.commdBranch').offsetHeight },
               driverQualWheel: node.driverQualWheel,
               driverQualMS: node.driverQualMS,
               course: node.course,
               forceTest: node.forceTest,
               firstAid: node.firstAid
            }
         }));
      }


      const formattedEdges = edgeData.map(edge => ({
         data: {
            id: String(edge.edgeId),
            familyId: String(edge.familyId),
            source: String(edge.startNodeId),
            target: String(edge.endNodeId)
         }
      }));

      setFormattedNodes(formattedNodes);
      setFormattedEdges(formattedEdges);

      if (formattedNodes.length > 0 && formattedEdges.length > 0) {
         if (document.querySelector('.commdBranch') === null) return;
         buildGraphInfo(familyName.current, snapshot.current, creationDate.current);
         buildTree(formattedNodes, formattedEdges);

      }
   }







   function saveGraphFamily() {
      const cy = cyInstance;
      let familyNames = [];
      axios.get('http://localhost:5000/api/v0/getFamilyNames').then(response => {
         familyNames = response.data;

         familyName.current = String(familyNames.length + 2);
         console.log("NAMES: ", familyNames);
         snapshot.current = 1;
         creationDate.current = new Date().toISOString().slice(0, 19).replace('T', ' ');

         const nodes = cy.nodes();
         const nodePositions = cy.nodes().map(node => ({
            id: node.id(),
            position: node.position()
         }));
         const edges = cy.edges();
         const nodeData = nodes.map(node => ({
            nodeId: node.data('id'),
            familyId: familyName.current,
            snapshotId: snapshot.current,
            serviceNum: node.data('name'),
            level: node.data('level'),
            driverQualWheel: node.data('driverQualWheel'),
            driverQualMS: node.data('driverQualMS'),
            course: node.data('course'),
            forceTest: node.data('forceTest'),
            firstAid: node.data('firstAid')
         }));
         for (let i = 0; i < nodeData.length; i++) {
            for (let j = 0; j < nodePositions.length; j++) {
               if (nodeData[i].nodeId === nodePositions[j].id) {
                  nodeData[i].x = nodePositions[j].position.x;
                  nodeData[i].y = nodePositions[j].position.y;
               }
            }
         }
         const edgeData = edges.map(edge => ({
            edgeId: edge.id(),
            familyId: familyName.current,
            snapshotId: snapshot.current,
            startNodeId: edge.data('source'),
            endNodeId: edge.data('target')
         }));




         const resp = axios.post('http://localhost:5000/api/v0/createFamily', {
            familyId: familyName.current,
            nodes: nodeData,
            edges: edgeData,
            snapshotId: snapshot.current,
            creationDate: creationDate.current
         }).then(response => {
            resetGraph();// make the reset wait for everything to be stored
            //refreshSavedSection();
            //window.location.reload();
         }).catch(error => {
            console.error(error);
         });

         // resetGraph();
      })


   }





   //This talks to the backend through API calls
   async function fetchTreeData() {
      let treeData;
      try {
         if (familyName.current === "") {
            familyName.current = "1";
         }
         const response = await axios.get('http://localhost:5000/api/v0/getLastSnap', { params: { familyId: familyName.current } });
         treeData = response.data;//JSON.stringify(response.data, null, 2)
         console.log(treeData)
      } catch (err) {
         console.log(err)
         alert("Error while retrieving tree data")
      }
      // if (treeData == null) {
      //    return [{ snapshotId: 1, familyId: "", creationDate: "" }, "", ""];
      // }
      let nodeData;
      try {
         const response = await axios.get('http://localhost:5000/api/v0/findNodes', { params: { snapshotId: treeData.snapshotId } });
         nodeData = response.data;//JSON.stringify(res.data, null, 2)
      } catch (err) {
         console.log(err)
         alert("The retrieved tree has no nodes")
      }


      let edgeData;
      try {
         const response = await axios.get('http://localhost:5000/api/v0/findEdges', { params: { snapshotId: treeData.snapshotId } });
         edgeData = response.data;//JSON.stringify(res.data, null, 2)
      } catch (err) {
         console.log(err)
         alert("The retrieved tree has no edges")
      }

      return [treeData, nodeData, edgeData];
   }







   function applyFilter(filter) {
      let nodes = cyInstance.nodes();
      for (let i = 0; i < nodes.length; i++) {
         if (filter === "None") {
            nodes[i].style('background-color', '#aaaaaa');
            nodes[i].style('border-color', '#aaaaaa');
            nodes[i].style('color', '#000000');
         } else {
            if (nodes[i].data(filter)) {
               nodes[i].style('background-color', '#6fedd6');
               nodes[i].style('border-color', '#6fedd6');
               nodes[i].style('color', '#000000');
            } else {
               nodes[i].style('background-color', '#777777');
               nodes[i].style('border-color', '#777777');
               nodes[i].style('color', '#000000');
            }
         }

      }
   }





   function loadFamily(familyId) {
      familyName.current = familyId;
      resetGraph();
   }



   return (
      <div>
         {ReactDOM.createPortal(
            <GraphTools setCreateEdgeMode={setCreateEdgeMode} resetGraph={resetGraph} recenter={recenter} saveGraph={saveGraph} applyFilter={applyFilter} saveGraphFamily={saveGraphFamily} />,
            document.body // Or another location in the DOM, like a specific div
         )}
         {ReactDOM.createPortal(
            <SavedSection loadFamily={loadFamily} />,
            document.body
         )}
      </div>
   );//onRefresh={setRefreshSavedSection}
};//End of CommdBranch function






//Checks if node is pulled too far away and deletes the edge if needed - this logic is still weird
function updateEdge(node, edge, cy) {
   let connectedID = edge.data('source');
   // let connectedNodeSource = cy.getElementById(edge.data('source'));
   let otherNode;
   if (connectedID === node.id())
      otherNode = cy.getElementById(edge.data('target'));
   else
      otherNode = cy.getElementById(edge.data('source'));
   let positionVectorTarget = otherNode.position();
   let postiionVectorOwn = node.position();

   let distance = Math.sqrt(
      (positionVectorTarget.x - postiionVectorOwn.x) * (positionVectorTarget.x - postiionVectorOwn.x) +
      (positionVectorTarget.y - postiionVectorOwn.y) * (positionVectorTarget.y - postiionVectorOwn.y)

   );
   //console.log(distance);
   if (distance > SEPARATION_DIST_LOW && distance < SEPARATION_DIST_HIGH) {
      edge.data('line-color', 'rgba(255, 0, 0, 0.5)');
   } else if (distance > SEPARATION_DIST_HIGH) {
      edge.remove();
   } else {
      edge.data('line-color', '#ffffff');
   }



}








//returns the node with the highest level
function getRootNode(nodes) {

   let maxLevel = 0;
   let rootIndex = 0;
   for (let i = 0; i < nodes.length; i++) {

      if (nodes[i].level > maxLevel) {
         maxLevel = nodes[i].level;
         rootIndex = i;
      }
   }
   return nodes[rootIndex].data.id;
}













export default CommdBranch;