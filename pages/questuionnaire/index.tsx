import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import QuestuinaireModule from "@/modules/questuionaire";
import createClient from "@/utils/pocketbase/api";
import { DashboardAdminLayout } from "@/layout/dashboard_admin_layout";

export default function Order() {
    const pb = createClient();
    const userRole = pb.authStore.model?.role;

    if (userRole === 'admin') {
        return (
            <MainLayout title="Questionnaire">
                <DashboardAdminLayout>
                    < QuestuinaireModule />
                </DashboardAdminLayout>
            </MainLayout>
        )
    }

    return (
        <MainLayout title="Questionnaire">
            <DashboardLayout>
                < QuestuinaireModule />
            </DashboardLayout>
        </MainLayout>
    )
}