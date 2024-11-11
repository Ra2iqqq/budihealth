import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import { useRouter } from "next/router";
import StaffDetailModule from "@/modules/staff/patientsdetails";

export default function OrderSlug() {
    const router = useRouter();
    const staffID = router.query.slug;

    return (
        <MainLayout title={`Staff ${staffID}`}>
            <DashboardLayout>
                {typeof staffID === 'string' && <StaffDetailModule staffID={staffID} />}
            </DashboardLayout>
        </MainLayout>
    )
}