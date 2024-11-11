import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import RecordModule from "@/modules/helpline";
import HelplineModule from "@/modules/helpline";

export default function Record() {
    return (
        <MainLayout title="Record">
            <DashboardLayout>
                <HelplineModule />
            </DashboardLayout>
        </MainLayout>
    )
}