import {Navigate} from 'react-router-dom';

function ProtectedRouter({isLoggedIn,children}){

    if(!isLoggedIn){
        return <Navigate to="/login" replace />
    }

    return children

}

export default ProtectedRouter;