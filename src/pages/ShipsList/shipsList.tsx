import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {RootState} from "../../store/store";
import {getAllShips, nextPage, previousPage} from "../../store/reducers/shipsList-reducer";
import ShipListElement from "../../components/ShipListElement/shipListElement";
import RightMenu from "../../components/RightMenu/rightMenu";
import styleShipsList from "./shipsList.module.css";
import chevronLeft from "../../imgs/Chevron_Left.png";
import chevronRight from "../../imgs/Chevron_Right.png";

const ShipsList: FC = () => {
    const shipsList = useAppSelector((state: RootState) => state.shipsList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllShips());
    }, [])

    function filterByPage(index: number) {
        return Math.ceil((index+1)/shipsList.pageSize) === shipsList.currentPage
    }

    return (
        <div className={styleShipsList.mainWrapper}>
            <div className={styleShipsList.shipsList}>
                <div className={styleShipsList.listName}>SpaceX Ships</div>
                <div className={styleShipsList.listElements}>
                    {shipsList.ships.map((ship, index) => {
                        if (filterByPage(index))
                            return <ShipListElement ship={ship} key={ship.ship_id}/>
                    })}
                </div>
                <div className={styleShipsList.pagination}>
                    {
                        shipsList.currentPage > 1
                            ? <img onClick={() => {dispatch(previousPage())}}
                                   src={chevronLeft}
                                   alt="Налево"
                            /> : <div></div>
                    }
                    <span>{shipsList.currentPage}</span>
                    {
                        shipsList.currentPage < shipsList.maxPages
                            ? <img onClick={() => {dispatch(nextPage())}}
                                   src={chevronRight}
                                   alt="Направо"
                            /> : <div></div>
                    }
                </div>
            </div>
            <div className={styleShipsList.rightMenuWrapper}>
                <RightMenu/>
            </div>
        </div>
    );
}

export default ShipsList;