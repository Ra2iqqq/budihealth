import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import StaffModule from "@/modules/staff";

export default function Staff() {
    return (
        <MainLayout title="Staff">
            <DashboardLayout>
                <StaffModule />
            </DashboardLayout>
        </MainLayout>
    )
}