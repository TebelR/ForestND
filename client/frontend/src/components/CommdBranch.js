// src/CytoscapeComponent.js
import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import "../Styles/commdBranch.css";
import axios from 'axios';

const CommdBranch = () => {
   let treeData = [];
   axios.get('http://localhost:5000/api/v0/getLastSnap$familyId=1').then(res => {
      treeData = res.data
   }).catch(err => {
      console.log(err)
      alert("Error while retrieving tree data")
   })

   let nodeData = [];
   axios.get('http://localhost:5000/api/v0/findNodes$snapshotId=' + treeData[0]["snapshotId"]).then(res => {
      nodeData = res.data
   }).catch(err => {
      console.log(err)
      alert("Error while retrieving node data")
   })

   let edgeData = [];
   axios.get('http://localhost:5000/api/v0/findEdges$snapshotId=' + treeData[0]["snapshotId"]).then(res => {
      edgeData = res.data
   }).catch(err => {
      console.log(err)
      alert("Error while retrieving edge data")
   })

   let formattedNodes = nodeData.map(node => {
      return {
         data: {
            id: node["nodeID"],
            name: node["serviceNum"]
         }
      }
   })

   let formattedEdges = edgeData.map(edge => {
      return {
         data: {
            id: edge["edgeID"],
            source: edge["startNodeID"],
            target: edge["endNodeID"]
         }
      }
   })

   useEffect(() => {
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
                  'background-color': '#666',
                  'label': 'data(name)',
                  'text-valign': 'center',
                  'text-halign': 'center',
                  'text-wrap': 'wrap',
                  'text-max-width': '100px',
               }
            },
            {
               selector: 'edge',
               style: {
                  'curve-style': 'bezier',
                  'target-arrow-shape': 'triangle',
                  'line-color': '#666',
                  'target-arrow-color': '#666',
               }
            }
         ],
         layout: {
            name: 'breadthfirst',

            fit: true, // whether to fit the viewport to the graph
            directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
            padding: 30, // padding on fit
            circle: false, // put depths in concentric circles if true, put depths top down if false
            grid: true, // whether to create an even grid into which the DAG is placed (circle:false only)
            rows: 6,
            spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
            boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
            avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
            nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
            roots: undefined, // the roots of the trees
            depthSort: undefined, // a sorting function to order nodes at equal depth. e.g. function(a, b){ return a.data('weight') - b.data('weight') }
            animate: false, // whether to transition the node positions
            animationDuration: 500, // duration of animation in ms if enabled
            animationEasing: undefined, // easing of animation if enabled,
            animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
            ready: undefined, // callback on layoutready
            stop: undefined, // callback on layoutstop
            transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
         }
      });
   }, []);

   return (
      <div className='commdBranch'>

      </div>
   )
};

export default CommdBranch;