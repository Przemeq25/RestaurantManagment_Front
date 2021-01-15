import React, {useEffect} from 'react'
import AdminPanel from "../../components/Admin/AdminPanel/AdminPanel";
import {useDispatch, useSelector} from "react-redux";
import {getSingleRestaurantForAdmin, setUserRole} from "../../redux/actions/restaurant";



const AdminPanelPage = ({children,match}) => {
    const selectedRestaurant = useSelector(state=>state.restaurant.selectedRestaurant);
    const dispatch = useDispatch();
    const userType = useSelector(state=>state.auth.userType);

    useEffect(()=>{
        !selectedRestaurant && match.params && match.params.restaurantId && dispatch(getSingleRestaurantForAdmin(match.params.restaurantId))
    },[match.params, dispatch,selectedRestaurant])

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
