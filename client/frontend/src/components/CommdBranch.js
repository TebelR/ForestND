// src/CytoscapeComponent.js
import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import "../Styles/commdBranch.css";
import axios from 'axios';
import { useState } from 'react';
import GraphTools from '../components/GraphTools';
import ReactDOM from 'react-dom';

const SEPARATION_DIST_LOW = 100;
const SEPARATION_DIST_HIGH = 150;


function CommdBranch() {

   //put graph data in state
   //this is done because of async nature of fetching data
   const [formattedNodes, setFormattedNodes] = useState([]);
   const [formattedEdges, setFormattedEdges] = useState([]);

   const [cyInstance, setCyInstance] = useState(null);
   const [createEdgeMode, setCreateEdgeMode] = useState(false);
   const [sourceNode, setSourceNode] = useState(null);
   const [targetNode, setTargetNode] = useState(null);


   //fetch graph data on first render
   useEffect(() => {
      async function fetchData() {
         const graphData = await fetchTreeData();
         let nodeData = graphData[1];
         let edgeData = graphData[2];

         nodeData.reverse();

         const formattedNodes = nodeData.map(node => ({
            data: {
               id: String(node.nodeID),
               name: String(node.serviceNum),
               level: node.level,
               acceleration: 0,
               velocity: 0
            }
         }));

         const formattedEdges = edgeData.map(edge => ({
            data: {
               id: String(edge.edgeID),
               source: String(edge.startNodeID),
               target: String(edge.endNodeID)
            }
         }));

         setFormattedNodes(formattedNodes);
         setFormattedEdges(formattedEdges);
         //console.log(formattedNodes, formattedEdges);
      }



      //actual function call
      fetchData();
      if (formattedNodes.length > 0 && formattedEdges.length > 0) {
         if (document.querySelector('.commdBranch') === null) return;
         buildTree(formattedNodes, formattedEdges);

      }
   }, []);






   function buildTree(formattedNodes, formattedEdges) {
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
            spacingFactor: 1.25,
            avoidOverlap: true,
            nodeDimensionsIncludeLabels: true,
            roots: parseInt(getRootNode(formattedNodes)),
            animate: true,
            animationDuration: 200,
            animationEasing: 'ease-out-circ',
            transform: function (node, position) {
               position.y = node.data('level') * 1000;
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

            let outgoingEdges = node.outgoers();
            if (outgoingEdges.length > 0)
               updateEdge(node, outgoingEdges[0], cy);

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
            console.log(`Clicked node: ${node.data('id')}`);
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
   }, [cyInstance]);







   useEffect(() => {
      if (!cyInstance) return;

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
         buildTree(formattedNodes, formattedEdges);
      } catch (err) {
         alert("Refreshing too fast");
      }
   };

   return (
      ReactDOM.createPortal(
         <GraphTools setCreateEdgeMode={setCreateEdgeMode} resetGraph={resetGraph} />,
         document.body // Or another location in the DOM, like a specific div
      )
   );
};//End of CommdBranch function





//Checks for the posibility of creating a new edge with the nearest neighbor node
function lookForEdge(node, neighBors, cy) {

}







//Checks if node is pulled too far away and deletes the edge if needed - this logic is still weird
function updateEdge(node, edge, cy) {
   let connectedID = edge.data('target');
   let connectedNode = cy.getElementById(connectedID);
   let positionVectorTarget = connectedNode.position();
   let postiionVectorOwn = node.position();

   let distance = Math.sqrt(
      (positionVectorTarget.x - postiionVectorOwn.x) * (positionVectorTarget.x - postiionVectorOwn.x) +
      (positionVectorTarget.y - postiionVectorOwn.y) * (positionVectorTarget.y - postiionVectorOwn.y)
   );

   if (distance > SEPARATION_DIST_LOW && distance < SEPARATION_DIST_HIGH) {
      edge.data('line-color', 'rgba(255, 0, 0, 0.5)');
   } else if (distance > SEPARATION_DIST_HIGH) {
      edge.remove();
   } else {
      edge.data('line-color', '#ffffff');
   }

}







function getNearestNode(nodes, x, y) {
   let nearestNode = null;
   let minDistance = Infinity;
   for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const distance = Math.sqrt((x - node.x) * (x - node.x) + (y - node.y) * (y - node.y));
      if (distance < minDistance) {
         minDistance = distance;
         nearestNode = node;
      }
   }
   return nearestNode;
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







//This talks to the backend through API calls
async function fetchTreeData() {
   let treeData;
   try {
      const response = await axios.get('http://localhost:5000/api/v0/getLastSnap', { params: { familyId: 1 } });
      treeData = response.data;//JSON.stringify(response.data, null, 2)

   } catch (err) {
      console.log(err)
      alert("Error while retrieving tree data")
   }

   let nodeData;
   try {
      const response = await axios.get('http://localhost:5000/api/v0/findNodes', { params: { snapshotId: treeData.snapshotId } });
      nodeData = response.data;//JSON.stringify(res.data, null, 2)
   } catch (err) {
      console.log(err)
      alert("Error while retrieving node data")
   }


   let edgeData;
   try {
      const response = await axios.get('http://localhost:5000/api/v0/findEdges', { params: { snapshotId: treeData.snapshotId } });
      edgeData = response.data;//JSON.stringify(res.data, null, 2)
   } catch (err) {
      console.log(err)
      alert("Error while retrieving edge data")
   }

   return [treeData, nodeData, edgeData];
}






export default CommdBranch;