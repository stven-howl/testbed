import { getArticles, getSubjectRatio } from "~/components/queries";

export const loader = async ({ request }: { request: Request }) => {
    try {
        const url = new URL(request.url);
        const upperSubjectCode = url.searchParams.get('upperSubjectCode') || "D";
        const upperSubjectName = url.searchParams.get('upperSubjectName') || "Macroeconomics";

        // URL에서 active subjects를 가져오거나 기본값 사용
        const activeSubjectsParam = url.searchParams.get('activeSubjects') || `${upperSubjectCode}2, ${upperSubjectCode}4, ${upperSubjectCode}6`;
        const activeSubjects = activeSubjectsParam.split(',');

        const articles = await getArticles({ sector: "sector1", subjects: activeSubjects })

        // Get subject ratios for each active subject
        const subjectRatiosPromises = activeSubjects.map(subject =>
            getSubjectRatio({ category_level: 'sector1', category_value: subject.trim() })
        );
        const subjectRatiosResults = await Promise.all(subjectRatiosPromises);

        // Restructure the data to be organized by year
        const yearMap = new Map<number, { year: number;[key: string]: number }>();

        // Initialize the year map with all years and subjects
        subjectRatiosResults.forEach((ratioData, index) => {
            const subject = activeSubjects[index].trim();
            ratioData.forEach(({ journal_year, ratio }) => {
                if (!yearMap.has(journal_year)) {
                    yearMap.set(journal_year, { year: journal_year });
                }
                const yearData = yearMap.get(journal_year)!;
                yearData[subject] = ratio;
            });
        });

        // Convert the map to an array and sort by year
        const chartData = Array.from(yearMap.values())
            .sort((a, b) => a.year - b.year);

        return {
            articles,
            activeSubjects,
            upperSubjectCode,
            upperSubjectName,
            chartData,
        };
    } catch (error) {
        console.error('Loader error:', error);
        throw error;
    }
}; 
