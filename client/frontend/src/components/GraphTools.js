import React from 'react';
import "../Styles/GraphTools.css";

function GraphTools({ setCreateEdgeMode, resetGraph, recenter, saveGraph }) {
    const createEdgeClick = () => {
        setCreateEdgeMode((prev) => !prev);
    };

    const refreshGraphClick = () => {
        resetGraph();
    };

    const recenterClick = () => {
        recenter();
    }

    const saveGraphClick = () => {
        saveGraph();
    }
    return (
        <div className="graph-controls">
            <button onClick={createEdgeClick}>
                Create Edge
            </button>
            <button onClick={refreshGraphClick}>
                Refresh Graph
            </button>
            <button onClick={recenterClick}>
                Recenter
            </button>
            <button onClick={saveGraphClick}>
                Save Graph
            </button>
            <button>
                Save Graph As
            </button>
            <button>
                Load Graph
            </button>

            <label className="filterLabel">Filter 1</label>
            <select id="options" name="options">
                <option value="option1">Driver Wheel</option>
                <option value="option2">Driver MSVS</option>
                <option value="option3">Course</option>
                <option value="option4">FORCE test</option>
                <option value="option5">First Aid</option>
            </select>
        </div>
    );
}

export default GraphTools;