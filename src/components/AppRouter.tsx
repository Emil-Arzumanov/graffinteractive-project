import React, {FC} from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import {routes} from "../routes";

const AppRouter:FC = () => {
    return (
        <Routes>
            {routes.map(elem =>
                <Route path={elem.path}
                       element={<elem.component/>}
                       key={elem.path}
                />
            )}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
}

export default AppRouter;