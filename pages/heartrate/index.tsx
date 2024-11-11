import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import ScheduleModule from "@/modules/heartrate";

export default function Product() {
    return (
        <MainLayout title="Product">
            <DashboardLayout>
                < ScheduleModule />
            </DashboardLayout>
        </MainLayout>
    )
}