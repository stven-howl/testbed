import { Link, useSearchParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { DotIcon } from "lucide-react";
import { ArticlesPagination } from "~/components/articles_pagination";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function ArticlesSubjects({ activeSubjects, subjects, subjects_code, initialArticles }:
    { activeSubjects: Array<string>, subjects: string[], subjects_code: string[], initialArticles: Array<any> }) {

    const [searchParams] = useSearchParams();

    let page = Number(searchParams.get('page')) ?? 1;

    const itemsPerPage = 20;
    if (isNaN(page) || page < 1 || page > Math.ceil(initialArticles.length / itemsPerPage)) {
        page = 1;
    }
    const currentPage = page;
    const currentArticles = initialArticles.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    let article_id = Number(searchParams.get('article_id')) || Number(currentArticles[0].article_id);
    let selectedArticle = currentArticles.find(article => Number(article.article_id) === article_id);

    return (
        <div className="w-[1400px] grid grid-cols-3 gap-4 mx-auto">
            <div className="col-span-2">
                <div className="overflow-y-auto p-4 mt-12 space-y-4 w-[900px] mx-auto">
                    <h2 className="text-2xl font-bold">Related Articles {activeSubjects.length > 0 ? `(${activeSubjects.length})` : ""}</h2>
                    {subjects.map((subject: string, index: number) => (
                        activeSubjects.includes(subjects_code[index]) ? (
                            <Badge key={subject} variant="outline" className="cursor-pointer">
                                {subject}
                            </Badge>
                        ) : null
                    ))}
                    <div className="flex flex-col gap-4">
                        <ScrollArea className="w-[880px] h-[650px]">
                            {activeSubjects.length === 0 ? (
                                <p>No articles found for the selected subjects.</p>
                            ) : (
                                <div className="flex flex-col gap-4 items-center">
                                    {currentArticles.map((article: any) => (
                                        <Badge
                                            key={article.article_id}
                                            variant="outline"
                                            className={`border p-4 rounded w-[880px] flex flex-col items-start hover:bg-primary/10 cursor-pointer ${selectedArticle?.article_id === article.article_id ? 'bg-primary/10' : ''}`}
                                        >
                                            <Link
                                                key={article.article_id}
                                                to={`?activeSubjects=${activeSubjects}&page=${currentPage}&article_id=${article.article_id}`}
                                            >
                                                <h2 className="text-lg font-semibold text-left hover:underline">{article.title}</h2>
                                                <div className="flex items-start gap-2">
                                                    <p className="text-gray-600 text-left">{article.author}</p>
                                                    <DotIcon className="w-4 h-4 text-gray-600" />
                                                    <p className="text-gray-600 text-left">{article.journal_name}</p>
                                                    <DotIcon className="w-4 h-4 text-gray-600" />
                                                    <p className="text-gray-600 text-left">{article.journal_year}</p>
                                                </div>
                                            </Link>
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <ScrollBar orientation="vertical" forceMount />
                        </ScrollArea>
                        <ArticlesPagination
                            totalItems={initialArticles.length}
                            page={currentPage}
                            activeSubjects={activeSubjects}
                        />
                    </div>

                </div>
            </div>
            <div className="col-span-1 mt-38 space-y-4">
                <Card className="h-[650px]">
                    <CardHeader>
                        <CardTitle className="text-2xl">{selectedArticle?.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-md">author name</p>
                        <p className="text-md">{selectedArticle?.abstract}</p>
                        <a className="text-sm underline" href={selectedArticle?.article_url} target="_blank" rel="noopener noreferrer">{selectedArticle?.article_url}</a>
                    </CardContent>
                </Card>
            </div>
        </div>

    )
}