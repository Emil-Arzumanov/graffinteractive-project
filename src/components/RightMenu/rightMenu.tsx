import React from 'react';
import SearchInp from "./searchInp";
import PortFilter from "./portFilter";
import ShipTypeFilter from "./shipTypeFilter";

const RightMenu = () => {
    return (
        <div>
            <SearchInp/>
            <PortFilter/>
            <ShipTypeFilter/>
        </div>
    );
};

export default RightMenu;