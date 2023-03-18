import React, {createContext, useContext, useState} from "react";

interface NotFoundContextType{
    errorMessage: string;
    setErrorMessage: (message: string) => void;
}

export const NotFoundContext = createContext<NotFoundContextType>({
    errorMessage: '',
    setErrorMessage: ()=>{},
});

interface Props{
    children : React.ReactNode;
}

export const NotFoundProvider: React.FC<Props> = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <NotFoundContext.Provider value={{ errorMessage, setErrorMessage }}>
            {children}
        </NotFoundContext.Provider>
    )
}

const NotFound = () => {
    const { errorMessage }  = useContext(NotFoundContext);

        return(
            <div style={{fontSize:'20px', color:'black', fontWeight:'bold'}}>
                <h1>404 Error</h1>
                {errorMessage && <p> {errorMessage} </p>}
            </div>
        );
    };

export default NotFound;