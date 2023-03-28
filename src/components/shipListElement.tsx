import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {IShips} from "../models/IShips";


interface ShipProps {
    ship: IShips;
}

const ShipListElement: FC<ShipProps> = ({ship}):JSX.Element => {
    const navigate = useNavigate();

    return (
        <div>
            {ship.ship_name}
        </div>
    );
}

export default ShipListElement