import React, {FC, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {RootState} from "../store/store";
import {clearShipData, getShipById} from "../store/reducers/singleShip-reducer";

const SingleShip: FC = () => {
    const singleShip = useAppSelector((state: RootState) => state.singleShip.ship);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const shipId = searchParams.get("shipId");

    useEffect(() => {
        dispatch(getShipById(shipId));
        return () => {
            dispatch(clearShipData())
        };
    },[])

    return (
        <div>
            SingleShip
            {singleShip.ship_name}
            <button onClick={() => {
                navigate("/", {replace: true})
            }}>
                To Ships List
            </button>
        </div>
    );
}

export default SingleShip