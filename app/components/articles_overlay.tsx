import { useSearchParams } from "react-router"

interface Article {
    article_id: number;
    journal_year: number;
    title: string;
    abstract: string;
    author?: string;
    year: number;
    doi?: string;
    article_url?: string;
    jel_codes?: string;
}

export default function ArticlesOverlay({ article }: { article: Article }) {

    return (
        <div className="fixed w-full h-full bg-black/50 absolute">
            <div className="w-[1000px] h-[1000px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1>{article.title}</h1>
                <p>{article.abstract}</p>
                <p>{article.author}</p>
                <p>{article.year}</p>
                <p>{article.doi}</p>
                <p>{article.article_url}</p>
                <p>{article.jel_codes}</p>
            </div>
        </div>
    )
}