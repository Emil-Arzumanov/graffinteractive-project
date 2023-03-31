import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {IShips} from "../../models/IShips";
import {useAppDispatch} from "../../hooks/redux";
import listElemStyle from "./shipListElement.module.css";
import arrowRight from "../../imgs/Arrow_Right.png";


interface ShipProps {
    ship: IShips;
}

const ShipListElement: FC<ShipProps> = ({ship}):JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handeOnClick = () => {
        navigate(`/singleShip?shipId=${ship.ship_id}`, {replace: true});
    };


    return (
        <div className={listElemStyle.listElement}
             onClick={handeOnClick}
        >
            <span className={listElemStyle.shipName}>
                {ship.ship_name}
            </span>
            <div className={listElemStyle.shipData}>
                <div><span>Тип</span>{ship.ship_type}</div>
                <div><span>Порт</span>{ship.home_port}</div>
            </div>
            <img src={arrowRight} alt=""/>
        </div>
    );
}

export default ShipListElement