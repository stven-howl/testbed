import { getArticles } from "~/components/queries";

export const loader = async ({ request }: { request: Request }) => {
    try {
        const url = new URL(request.url);
        const subjects = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "Y", "Z"];

        // URL에서 active subjects를 가져오거나 기본값 사용
        const activeSubjectsParam = url.searchParams.get('activeSubjects') || "D,G,J";
        const activeSubjects = activeSubjectsParam.split(',');

        // Promise.all을 사용하여 병렬로 데이터 fetch
        const articles = await getArticles({ sector: "sector2", subjects: activeSubjects })

        return {
            articles,
            activeSubjects
        };
    } catch (error) {
        console.error('Loader error:', error);
        throw error;
    }
}; 