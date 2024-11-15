"use client"
import { AdminDashboard } from "./AdminDashboard"
import { AdminSearcher } from "./AdminDashboardSearcher"

export const AdminDash=()=>{
    return(
        <div>
            <AdminSearcher/>
            <AdminDashboard/>
        </div>
    )
}