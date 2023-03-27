import React from "react";
import ShipsList from "../pages/shipsList";
import SingleShip from "../pages/singleShip";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames {
    SHIPSLIST = '/',
    SINGLESHIP = '/singleShip'
}

export const routes: IRoute[] = [
    {
        path: RouteNames.SHIPSLIST,
        component: ShipsList
    },
    {
        path: RouteNames.SINGLESHIP,
        component: SingleShip
    },
]