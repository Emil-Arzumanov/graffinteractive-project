import React,{FC} from "react";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

const SingleShip: FC = () => {
    const navigate = useNavigate();
    const shipList = useAppSelector(state => state.shipList);
    const dispatch = useAppDispatch();

    return (
        <div>
            SingleShip
            <button onClick={() => {
                navigate("/", {replace: true})
            }}>
                To Ship List
            </button>
        </div>
    );
}

export default SingleShip