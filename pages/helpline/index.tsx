import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import { DashboardAdminLayout } from "@/layout/dashboard_admin_layout";
import HelplineModule from "@/modules/helpline";
import createClient from "@/utils/pocketbase/api";

export default function Record() {
    const pb = createClient();
    const userRole = pb.authStore.model?.role;

    if (userRole === 'admin') {
        return (
            <MainLayout title="Helpline">
                <DashboardAdminLayout>
                    <HelplineModule />
                </DashboardAdminLayout>
            </MainLayout>
        )
    }

    return (
        <MainLayout title="Helpline">
            <DashboardLayout>
                <HelplineModule />
            </DashboardLayout>
        </MainLayout>
    )
}