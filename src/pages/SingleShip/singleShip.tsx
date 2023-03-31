import React, {FC, useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {RootState} from "../../store/store";
import {clearShipData, getShipById} from "../../store/reducers/singleShip-reducer";
import arrowLeft from "../../imgs/Arrow_Left.png";
import {IMissions} from "../../models/IShips";
import singleShipStyle from "./singleShip.module.css";

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
        <div className={singleShipStyle.mainWrapper}>
            <div className={singleShipStyle.mainPageLink}
                 onClick={() => {
                     navigate("/", {replace: true})
            }}>
                <img src={arrowLeft} alt={""}/>
                <div>Вернуться</div>
            </div>
            <div className={singleShipStyle.shipName}>
                {singleShip.ship_name || "Не данных"}
            </div>
            <div className={singleShipStyle.shipDataWrapper}>
                <div className={singleShipStyle.shipData}>
                    <div className={singleShipStyle.shipDataName}>Тип</div>
                    <div>{singleShip.ship_type || "Не данных"}</div>
                </div>
                <div className={singleShipStyle.shipData}>
                    <div className={singleShipStyle.shipDataName}>Порт</div>
                    <div>{singleShip.home_port || "Не данных"}</div>
                </div>
                <div className={singleShipStyle.shipData}>
                    <div className={singleShipStyle.shipDataName}>Вес</div>
                    <div>{singleShip.weight_kg || "Не данных"}</div>
                </div>
                <div className={singleShipStyle.shipData}>
                    <div className={singleShipStyle.shipDataName}>Год</div>
                    <div>{singleShip.year_built || "Не данных"}</div>
                </div>
            </div>
            <div>
                <div className={singleShipStyle.shipDataName}>Миссии</div>
                <div className={singleShipStyle.shipMissions}>
                    {singleShip.missions.length > 0
                        ? singleShip.missions.map((mission:IMissions) => {
                            return <span>{mission.name+", "}</span>
                        }) : "Не данных"}
                </div>
            </div>
        </div>
    );
}

export default SingleShip