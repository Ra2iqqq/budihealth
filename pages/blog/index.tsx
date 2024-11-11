import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import AnalyticModule from "@/modules/blog";
import BlogModule from "@/modules/blog";

export default function Blog() {
    return (
        <MainLayout title="Blog">
            <DashboardLayout>
                <BlogModule/>
            </DashboardLayout>
        </MainLayout>
    )
}