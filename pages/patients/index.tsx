import { MainLayout } from "@/layout/main_layout";
import StaffModule from "@/modules/staff";
import { DashboardAdminLayout } from "@/layout/dashboard_admin_layout";
import createClient from "@/utils/pocketbase/api";

export default function Staff() {
    const pb = createClient();
    const userRole = pb.authStore.model?.role;

    if (userRole === 'admin') {
        return (
            <MainLayout title="Patients">
                <DashboardAdminLayout>
                    <StaffModule />
                </DashboardAdminLayout>
            </MainLayout>
        )
    }

    return (
        <>
            Admin Only
        </>
    )
}