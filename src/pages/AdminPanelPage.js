import React, {useContext, useEffect, useState} from 'react'
import AdminPanel from "../components/Admin/AdminPanel/AdminPanel";



const AdminPanelPage = ({children}) => {

        return (
            <AdminPanel>
                {children}
            </AdminPanel>
        )

};
export default AdminPanelPage;
