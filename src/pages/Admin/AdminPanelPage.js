import React, {useEffect} from 'react'
import AdminPanel from "../../components/Admin/AdminPanel/AdminPanel";
import {useDispatch, useSelector} from "react-redux";
import {getSingleRestaurantForAdmin} from "../../redux/actions/restaurant";
import AuthProvider from "../../components/AuthProvider";



const AdminPanelPage = ({children,match}) => {
    const selectedRestaurant = useSelector(state=>state.restaurant.selectedRestaurant);
    const dispatch = useDispatch();

    useEffect(()=>{
        !selectedRestaurant && match.params && match.params.restaurantId && dispatch(getSingleRestaurantForAdmin(match.params.restaurantId))
    },[])

        return (
            <>
                 <AdminPanel match={match}>
                     {children}
                 </AdminPanel>
            </>

        )

};
export default AdminPanelPage;
