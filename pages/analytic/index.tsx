import { MainLayout } from "@/layout/main_layout";
import AnalyticModule from "@/modules/analytic"
import { DashboardAdminLayout } from "@/layout/dashboard_admin_layout";
import createClient from "@/utils/pocketbase/api";

export default function Analytic() {
    const pb = createClient();
    const userRole = pb.authStore.model?.role;

    if (userRole === 'admin') {
        return (
            <MainLayout title="Analytic">
                <DashboardAdminLayout>
                    <AnalyticModule />
                </DashboardAdminLayout>
            </MainLayout>
        )
    }

    return (
        <>
            <h1>Admin only</h1>
        </>
    )
}