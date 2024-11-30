// src/CytoscapeComponent.js
import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import "../Styles/commdBranch.css";
import axios from 'axios';

const SEPARATION_DIST_LOW = 100;
const SEPARATION_DIST_HIGH = 150;


const CommdBranch = () => {

   //put graph data in state
   const [formattedNodes, setFormattedNodes] = React.useState([]);
   const [formattedEdges, setFormattedEdges] = React.useState([]);



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
   }, []);


   //Second render of the graph actually builds the graph
   useEffect(() => {
      if (formattedNodes.length > 0 && formattedEdges.length > 0) {
         document.querySelector('.commdBranch').innerHTML = "";
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
                     'target-arrow-color': '#9003fc', // Highlighted arrow color
                     'border-width': '3px', // Additional visual cue for nodes
                     'border-color': '#9003fc',
                  }
               }
            ],
            layout: {
               name: 'breadthfirst',

               fit: true,
               directed: true,
               padding: 40,
               circle: false,
               // grid: true, // whether to create an even grid into which the DAG is placed (circle:false only)
               // rows: 6,
               spacingFactor: 1.25,
               avoidOverlap: true,
               nodeDimensionsIncludeLabels: true,
               roots: parseInt(getRootNode(formattedNodes)), // the roots of the trees - in this case this is the node with the highest level
               // depthSort: function (a, b) {
               //    console.log(a.data('level'), b.data('level'))
               //    return a.data('level') - b.data('level');
               // },
               animate: true,
               animationDuration: 200,
               animationEasing: 'ease-out-circ',
               transform: function (node, position) {
                  position.y = node.data('level') * 1000;
                  return position;
               }
            }
         });

         cy.on('drag', 'node', function (event) {
            const node = event.target;
            const position = node.position();

            //const snappedY = Math.round(position.y / 100) * 100; // 100px row spacing
            // let displacementY = node.position().y - event.target._private.position.y;
            // let displacementX = node.position().x - event.target._private.position.x;
            // Update node position in real-time
            node.position({ x: position.x, y: position.y });
            let outgoingEdges = node.outgoers();
            if (outgoingEdges.length > 0)
               updateEdge(node, outgoingEdges[0], cy);
            // node.velocity({ x: displacementX, y: displacementY });
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


         return () => {
            cy.destroy();
         }
      }
   }, [formattedNodes, formattedEdges]);





   return (
      <div className='commdBranch'>

      </div>

   )
};

//Checks for the posibility of creating a new edge with the nearest neighbor node
function lookForEdge(node, neighBors, cy) {

}


//Checks if node is pulled too far away and deletes the edge if needed
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