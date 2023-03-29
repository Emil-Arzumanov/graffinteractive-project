import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {RootState} from "../store/store";
import {getAllShips} from "../store/reducers/shipsList-reducer";
import ShipListElement from "../components/shipListElement";
import {clearShipData} from "../store/reducers/singleShip-reducer";

const ShipsList: FC = () => {
    const navigate = useNavigate();
    const shipsList = useAppSelector((state: RootState) => state.shipsList.ships);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllShips());
        return () => {
            dispatch(clearShipData())
        };
    },[])

    return (
        <div>
            <div>
                ShipsList
                <div>
                    {shipsList.map((ship) => {
                        return <ShipListElement ship={ship} key={ship.ship_id}/>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ShipsList;