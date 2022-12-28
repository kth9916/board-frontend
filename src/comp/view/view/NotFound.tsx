import {observer} from "mobx-react";
import React from "react";

const NotFound = observer(
    () => {
        return(
            <div style={{fontSize:'20px', color:'black', fontWeight:'bold'}}><h1>404 Error</h1></div>
        )
    }
)

export default NotFound;