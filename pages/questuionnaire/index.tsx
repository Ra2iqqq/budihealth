import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import QuestuinaireModule from "@/modules/questuionaire";

export default function Order() {
    return (
        <MainLayout title="Order">
            <DashboardLayout>
                < QuestuinaireModule />
            </DashboardLayout>
        </MainLayout>
    )
}