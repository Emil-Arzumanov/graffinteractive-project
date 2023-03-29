import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {IShips} from "../models/IShips";
import {getShipById} from "../store/reducers/singleShip-reducer";
import {useAppDispatch} from "../hooks/redux";


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
        <div onClick={handeOnClick}>
            <h1>{ship.ship_name}</h1>
            {ship.missions.map(mission => <p key={mission.flight}>{mission.name}</p>)}
        </div>
    );
}

export default ShipListElement