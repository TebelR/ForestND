import React from 'react';
import "../Styles/GraphTools.css";

function GraphTools({ setCreateEdgeMode, resetGraph, recenter, saveGraph, applyFilter, saveGraphFamily }) {
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

    const saveGraphFamilyClick = () => {
        saveGraphFamily();
    }


    const filterSelect = () => {
        let filter = document.getElementById("options").value;
        applyFilter("None");
        switch (filter) {
            case "No Filter":
                filter = "None";
                break;
            case "Driver Wheel":
                filter = "driverQualWheel";
                break;
            case "Driver MSVS":
                filter = "driverQualMS";
                break;
            case "Course":
                filter = "course";
                break;
            case "FORCE test":
                filter = "forceTest";
                break;
            case "First Aid":
                filter = "firstAid";
                break;
        }
        applyFilter(filter);
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
            <button onClick={saveGraphFamilyClick}>
                Save Graph As
            </button>

            <label className="filterLabel">Filter 1</label>
            <select id="options" name="options" onChange={filterSelect}>
                <option value="No Filter">No Filter</option>
                <option value="Driver Wheel">Driver Wheel</option>
                <option value="Driver MSVS">Driver MSVS</option>
                <option value="Course">Course</option>
                <option value="FORCE test">FORCE test</option>
                <option value="First Aid">First Aid</option>
            </select>
        </div>
    );
}

export default GraphTools;