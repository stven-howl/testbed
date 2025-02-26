import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext, PaginationEllipsis } from "~/components/ui/pagination";

interface ArticlesPaginationProps {
    totalItems: number;
    page: number;
    activeSubjects: string[];
}

export function ArticlesPagination({
    totalItems, page, activeSubjects
}: ArticlesPaginationProps) {
    const totalPages = Math.ceil(totalItems / 20);
    return (
        <div>
            <Pagination>
                <PaginationContent>
                    {page === 1 ? null : (
                        <>
                            <PaginationItem>
                                <PaginationPrevious
                                    to={`?activeSubjects=${activeSubjects}&page=${page - 1}`}
                                    size="default"
                                />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink
                                    to={`?activeSubjects=${activeSubjects}&page=${page - 1}`}
                                    size="default"
                                >
                                    {page - 1}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}
                    <PaginationItem>
                        <PaginationLink
                            to={`?activeSubjects=${activeSubjects}&page=${page}`}
                            isActive
                            size="default"
                        >
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                    {page === totalPages ? null : (
                        <>
                            <PaginationItem>
                                <PaginationLink
                                    to={`?activeSubjects=${activeSubjects}&page=${page + 1}`}
                                    size="default"
                                >
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                            {page + 1 === totalPages ? null : (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationNext
                                    to={`?activeSubjects=${activeSubjects}&page=${page + 1}`}
                                    size="default"
                                />
                            </PaginationItem>
                        </>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}