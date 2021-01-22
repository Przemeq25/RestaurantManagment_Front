import React, {useEffect} from 'react'
import AdminPanel from "../../components/Admin/AdminPanel/AdminPanel";
import {useDispatch, useSelector} from "react-redux";
import {getSingleRestaurantForAdmin, setUserRole} from "../../redux/actions/restaurant";



const AdminPanelPage = ({children,match}) => {
    const dispatch = useDispatch();
    const userType = useSelector(state=>state.auth.userType);

    useEffect(()=>{
        match.params.restaurantId && dispatch(getSingleRestaurantForAdmin(match.params.restaurantId))
    },[match.params.restaurantId, dispatch])

    useEffect(()=>{
        const selectUserRole = () =>{
            const userRole = userType.find(role=> match.params.restaurantId === role.id);
            if(userRole){
                dispatch(setUserRole(userRole.role, match.params.restaurantId))
            }

        }
        match.params.restaurantId && userType && selectUserRole();
    },[match.params.restaurantId,dispatch,userType])
        return (
            <>
                 <AdminPanel match={match}>
                     {React.cloneElement(children,{match})}
                 </AdminPanel>
            </>

        )

};
export default AdminPanelPage;
