// src/CytoscapeComponent.js
import React, { useEffect } from 'react';
import cytoscape from 'cytoscape';
import "../Styles/commdBranch.css";

const CommdBranch = () => {
    useEffect(() => {
        const cy = cytoscape({
            container: document.getElementById('CommdBranch'), // container to render in
            elements: [ // list of graph elements to be rendered
                { data: { id: 'a' } },
                { data: { id: 'b' } },
                { data: { id: 'c' } },
                { data: { id: 'd' } },
                {
                    data: { id: 'ab', source: 'a', target: 'b' }
                },
                {
                    data: { id: 'ac', source: 'a', target: 'c' }
                },
                {
                    data: { id: 'bd', source: 'b', target: 'd' }
                },
            ],
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'label': 'data(id)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
                }
            ],
            layout: { // the layout of the graph
                name: 'grid',
                rows: 2
            }
        });

        
        return () => {
            cy.destroy();
        };
    }, []);

    return <div 
    id="commdBranch"
     />;
};

export default CommdBranch;