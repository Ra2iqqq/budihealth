import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import { useRouter } from "next/router";

export default function OrderSlug() {
    const router = useRouter();
    const orderID = router.query.slug;

    return (
        <MainLayout title={`Order ${orderID}`}>
            <DashboardLayout>
                <h1>sad</h1>
            </DashboardLayout>
        </MainLayout>
    )
}