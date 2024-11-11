import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import AnalyticModule from "@/modules/analytic";

export default function Analytic() {
    return (
        <MainLayout title="Analytic">
            <DashboardLayout>
                <AnalyticModule />
            </DashboardLayout>
        </MainLayout>
    )
}