import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import AiModule from "@/modules/ai";

export default function Ai() {
    return (
        <MainLayout title="Ai">
            <DashboardLayout>
                <AiModule />
            </DashboardLayout>
        </MainLayout>
    )
}