import { getArticles } from "~/components/queries";
import { redirect } from "react-router";
export const loader = async ({ request }: { request: Request }) => {
    try {
        const url = new URL(request.url);
        if (url.searchParams.get('activeSubjects') === null) {
            return redirect("/?activeSubjects=D,G,J");
        }

        const subjects = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "Y", "Z"];

        // URL에서 active subjects를 가져오거나 기본값 사용
        const activeSubjectsParam = url.searchParams.get('activeSubjects')!;
        const activeSubjects = activeSubjectsParam.split(',');

        // Promise.all을 사용하여 병렬로 데이터 fetch
        if (activeSubjects.length === 0) {
            const articles = [];
        } else {
        const articles = await getArticles({ sector: "sector2", subjects: activeSubjects })

        return {
                articles,
                activeSubjects
            };
        }
    } catch (error) {
        console.error('Loader error:', error);
        throw error;
    }
}; 