import { MainLayout } from "@/layout/main_layout";
import { DashboardLayout } from "@/layout/dashboard_layout";
import { useRouter } from "next/router";
import QuizAnswerModule from "@/modules/questuionaire/QuizAnswer";

export default function OrderSlug() {
    const router = useRouter();
    const quizID = router.query.slug;

    return (
        <MainLayout title={`Quiz ${quizID}`}>
            <DashboardLayout>
                <QuizAnswerModule quizID={quizID} />
            </DashboardLayout>
        </MainLayout>
    )
}