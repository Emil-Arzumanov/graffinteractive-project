//https://api.spacexdata.com/v3/ships
import React, {FC} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {decrement, increment} from "../store/reducers/shipsList-reducer";


const ShipsList: FC = () => {
    const navigate = useNavigate();
    const shipList = useAppSelector(state => state.shipList);
    const dispatch = useAppDispatch();

    return (
        <div>
            <div>
                ShipsList
                <p>
                    {shipList.number}
                </p>
                <button onClick={() => {
                    dispatch(increment())
                }}>increment</button>
                <button onClick={() => {
                    dispatch(decrement())
                }}>decrement</button>
            </div>
            <button onClick={() => {
                navigate("/singleShip", {replace: true})
            }}>
                To Single Ship
            </button>
        </div>
    );
}

export default ShipsList;