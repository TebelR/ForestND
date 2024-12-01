import React from 'react';
import "../Styles/GraphTools.css";
import { useState } from 'react';

function GraphTools({ setCreateEdgeMode, resetGraph }) {
    const createEdgeClick = () => {
        setCreateEdgeMode((prev) => !prev);
    };

    const refreshGraphClick = () => {
        resetGraph();
    };

    return (
        <div className="graph-controls">
            <button onClick={createEdgeClick}>
                Create Edge
            </button>
            <button onClick={refreshGraphClick}>
                Refresh Graph
            </button>
        </div>
    );
}

export default GraphTools;