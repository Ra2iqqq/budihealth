import { MainLayout } from "@/layout/main_layout";
import StaffModule from "@/modules/staff";
import { DashboardAdminLayout } from "@/layout/dashboard_admin_layout";

export default function Staff() {
    return (
        <MainLayout title="Staff">
            <DashboardAdminLayout>
                <StaffModule />
            </DashboardAdminLayout>
        </MainLayout>
    )
}