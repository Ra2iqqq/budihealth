import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import { DashboardAdminLayout } from "@/layout/dashboard_admin_layout";
import BlogModule from "@/modules/blog";
import createClient from "@/utils/pocketbase/api";

export default function Blog() {
    const pb = createClient();
    const userRole = pb.authStore.model?.role;

    if (userRole === 'admin') {
        return (
            <MainLayout title="Blog">
                <DashboardAdminLayout>
                    <BlogModule />
                </DashboardAdminLayout>
            </MainLayout>
        )
    }

    return (
        <MainLayout title="Blog">
            <DashboardLayout>
                <BlogModule />
            </DashboardLayout>
        </MainLayout>
    )
}