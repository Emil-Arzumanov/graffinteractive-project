import React from 'react';
import SearchInp from "./searchInp";
import PortFilter from "./portFilter";
import ShipTypeFilter from "./shipTypeFilter";
import rightMenuStyle from "./rightMenu.module.css";

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