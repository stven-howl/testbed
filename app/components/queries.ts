import client from "~/supa_clients"

export const getArticles = async ({
    sector,
    subjects
}: {
    sector: string,
    subjects: string[]
}) => {
    let query = client
        .rpc('article_year_list_v2', {category_level: sector, category_value: subjects})
        .select("*")
        .order("journal_year", { ascending: false });

    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getArticlesNumber = async ({
    start_year, 
    end_year,
}: {
    start_year: number, 
    end_year: number,
}) => {
    let query = client
        .from("number_of_all_articles_years")
        .select("journal_year, article_count")
        .gte("journal_year", start_year)
        .lte("journal_year", end_year)
        .order("journal_year");

    const { data, error } = await query;
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getSubjectRatio = async ({
    category_level, 
    category_value,
}: {
    category_level: string, 
    category_value: string,
}) => {
    const { data, error } = await client
    .rpc('count_articles_by_jel_v2', {category_level, category_value});
    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export const getSector2Name = async({
    sector2_code,
}: {sector2_code: string}) => {
    const {data, error} = await client
        .from("jel_code")
        .select("jel_code_sector2_name")
        .eq("jel_code_sector2", sector2_code)
        .limit(1);
    
    if (error) {
        throw new Error(error.message);
    }
    return data?.[0]?.jel_code_sector2_name;
}

export const getChildSubjects = async({
    category_level,
    category_value,
}: {category_level: string, category_value: string}) => {
    const {data, error} = await client
    .rpc('jel_groupby', {category_level, category_value})
    .select("*")
    .order("jel_code", { ascending: true });
    
    if (error) {
        throw new Error(error.message);
    }
    return data;
    
    
}