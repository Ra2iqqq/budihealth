import { MainLayout } from "@/layout/main_layout";
import AnalyticModule from "@/modules/analytic"
import { DashboardAdminLayout } from "@/layout/dashboard_admin_layout";

export default function Analytic() {
    return (
        <MainLayout title="Analytic">
            <DashboardAdminLayout>
                <AnalyticModule />
            </DashboardAdminLayout>
        </MainLayout>
    )
}