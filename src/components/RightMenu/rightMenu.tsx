import React from 'react';
import rightMenuStyle from "./rightMenu.module.css";
import arrowLeft from "../../imgs/Arrow_Left.png"
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {checkIfChosen, chosePort, closeFilter, updateSelector} from "../../store/reducers/shipsList-reducer";
import chevronUp from "../../imgs/Chevron_Up.png";
import chevronDown from "../../imgs/Chevron_Down.png";
import checkBoxYes from "../../imgs/CheckBox_Yes.png";
import checkBoxNo from "../../imgs/CheckBox_No.png";
import {RootState} from "../../store/store";

const RightMenu = () => {
    const dispatch = useAppDispatch();
    const shipsList = useAppSelector((state: RootState) => state.shipsList);

    return (
        <div className={rightMenuStyle.mainWrapper}>
            <div className={rightMenuStyle.backToShips}
                 onClick={() => dispatch(closeFilter())}
            >
                <img src={arrowLeft} alt=""/>
                <div>Фильтры</div>
            </div>
            <div className={rightMenuStyle.searchInpt}>
                <span>Название</span>
                <input type="search"/>
            </div>
            <div>
                <span>Порт</span>
                <div className={rightMenuStyle.selectWrapper}>
                    <div className={rightMenuStyle.selecterWrapper}>
                        <div className={rightMenuStyle.selecter} onClick={() => dispatch(updateSelector())}>
                            Выбрано {shipsList.chosenPorts.length}
                            <img src={shipsList.isSelectorOpen
                                ? chevronUp
                                : chevronDown}
                                 alt=""
                            />
                        </div>
                    </div>
                    <div className={shipsList.isSelectorOpen
                        ? rightMenuStyle.selectOptions
                        : rightMenuStyle.selectOptionsClosed}
                    >
                        <div onClick={() => dispatch(chosePort("Port Canaveral"))}>
                            <img src={checkIfChosen(shipsList.chosenPorts,"Port Canaveral")
                                ? checkBoxYes
                                : checkBoxNo}
                                 alt=""
                            />
                            <span>Port Canaveral</span>
                        </div>
                        <div onClick={() => dispatch(chosePort("Port of Los Angeles"))}>
                            <img src={checkIfChosen(shipsList.chosenPorts, "Port of Los Angeles")
                                ? checkBoxYes
                                : checkBoxNo}
                                 alt=""
                            />
                            <span>Port of Los Angeles</span>
                        </div>
                        <div onClick={() => dispatch(chosePort("Fort Lauderdale"))}>
                            <img src={checkIfChosen(shipsList.chosenPorts, "Fort Lauderdale")
                                ? checkBoxYes
                                : checkBoxNo}
                                 alt=""
                            />
                            <span>Fort Lauderdale</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightMenu;