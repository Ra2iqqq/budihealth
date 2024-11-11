import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import { useRouter } from "next/router";
import OrderDetailModule from "@/modules/order/questuionairedetail";

export default function OrderSlug() {
    const router = useRouter();
    const orderID = router.query.slug;

    return (
        <MainLayout title={`Order ${orderID}`}>
            <DashboardLayout>
                {typeof orderID === 'string' && <OrderDetailModule orderID={orderID} />}
            </DashboardLayout>
        </MainLayout>
    )
}