import { Link, useSearchParams } from "react-router";
import { Badge } from "~/components/ui/badge";
import { DotIcon } from "lucide-react";
import { ArticlesPagination } from "~/components/common/articles_pagination";
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
        <div className="w-[1370px] gap-4 mx-auto">
            <div>
                <div className="overflow-y-auto p-4 mt-12 space-y-4 w-[1400px] mx-auto">
                    <h2 className="text-2xl font-bold">Related Articles {activeSubjects.length > 0 ? `(${activeSubjects.length})` : ""}</h2>
                    {subjects.map((subject: string, index: number) => (
                        activeSubjects.includes(subjects_code[index]) ? (
                            <Badge key={subject} variant="outline" className="cursor-pointer">
                                {subject}
                            </Badge>
                        ) : null
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="w-[880px] h-[700px] col-span-2">
                    <div className="w-[880px] h-[700px] overflow-y-auto mb-2">
                        <ScrollArea>
                            {activeSubjects.length === 0 ? (
                                <p>No articles found for the selected subjects.</p>
                            ) : (
                                <div className="flex flex-col gap-4 items-center">
                                    {currentArticles.map((article: any) => (
                                        <Badge
                                            key={article.article_id}
                                            variant="outline"
                                            className={`border p-4 rounded w-[880px] flex flex-col items-start hover:bg-primary/10 ${selectedArticle?.article_id === article.article_id ? 'bg-primary/10' : ''}`}
                                        >
                                            <Link
                                                key={article.article_id}
                                                preventScrollReset
                                                to={`?activeSubjects=${activeSubjects}&page=${currentPage}&article_id=${article.article_id}`}
                                            >
                                                <h2 className="text-lg font-semibold text-left hover:underline cursor-pointer">{article.title}</h2>
                                                <div className="flex items-start gap-2">
                                                    <p className="text-gray-600 text-left">{article.formatted_author}</p>
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
                    </div>
                    <ArticlesPagination
                        totalItems={initialArticles.length}
                        page={currentPage}
                        activeSubjects={activeSubjects}
                    />
                </div>
                <div className="col-span-1 space-y-4">
                    <Card className="h-[700px] bg-primary/10">
                        <CardHeader>
                            <CardTitle className="text-2xl">{selectedArticle?.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 overflow-x-hidden">
                            <p className="text-md font-semibold">{selectedArticle?.formatted_author}</p>
                            <p className="text-sm">{selectedArticle?.journal_name} at {selectedArticle?.journal_year}.{selectedArticle?.journal_month}. </p>
                            <div className="my-4">
                                <span className="text-md font-bold">Abstract</span>
                            </div>
                            <p className="text-md">{selectedArticle?.abstract}</p>
                            <div className="my-4">
                                <span className="text-md font-bold">keywords</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedArticle?.jel_code_names?.split(',').map((keyword: string, index: number) => (
                                    <Badge key={index} variant="outline" className="max-w-[400px] white-space-normal">
                                        <p>{keyword.trim()}</p>
                                    </Badge>
                                ))}
                            </div>
                            <div className="my-4">
                                <span className="text-md font-bold">Journal URL</span>
                            </div>
                            <a className="text-sm underline" href={selectedArticle?.article_url} target="_blank" rel="noopener noreferrer">{selectedArticle?.article_url}</a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}