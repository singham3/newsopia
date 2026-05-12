import { NextResponse } from 'next/server'
import { formatTimestamp } from '../../utils/dateFormatter';
export const dynamic = 'force-dynamic';

const fetchNewsData = async function (category: string, page: number = 1) {
    try {
        const currentPage = Number(page) || 1;
        const url = `https://inshorts.com/api/en/search/trending_topics/${category}?page=${currentPage}&type=NEWS_CATEGORY`;
        const response = await fetch(url);
        const data = await response.json();
        const newPage = currentPage + 1;
        console.log(url);
        if (data.data.news_list) {
            const newsList = data.data.news_list.map((item: any) => ({
                id: item.news_obj.hash_id,
                title: item.news_obj.title,
                description: item.news_obj.content,
                author: item.news_obj.author_name,
                date: formatTimestamp(item.news_obj.created_at),
                category: item.news_obj.category_names,
                image: item.news_obj.image_url,
                url: item.news_obj.source_url,
            }));
            return { newsList, newPage };
        }
        return { newsList: [], newPage: 1 };
    } catch (error) {
        console.error('Error fetching news:', error);
        return { newsList: [], newPage: 1 };
    }
}

const fetchTrendingTopics = async function (offset: string) {
    try {
        const url = `https://inshorts.com/api/en/news?category=top_stories&max_limit=240&include_card_data=true${offset == '1' ? '' : '&offset=' + offset}`;

        const response = await fetch(url);
        const data = await response.json();
        const newOffset = data.data.min_news_id;
        console.log(url);
        if (data.data.news_list) {
            const newsList = data.data.news_list.map((item: any) => ({
                id: item.news_obj.hash_id,
                title: item.news_obj.title,
                description: item.news_obj.content,
                author: item.news_obj.author_name,
                date: formatTimestamp(item.news_obj.created_at),
                category: item.news_obj.category_names,
                image: item.news_obj.image_url,
                url: item.news_obj.source_url,
            }));
            return { newsList, newPage: newOffset };
        }
        return { newsList: [], newPage: '' };
    } catch (error) {
        console.error('Error fetching trending topics:', error);
        return { newsList: [], newPage: '' };
    }
}
// Static news data to simulate API responses

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page');
    const category = searchParams.get('category');

    const { newsList, newPage } = category ? await fetchNewsData(category, page || 1) : await fetchTrendingTopics(page || '');

    let filteredNews = newsList;

    await new Promise(resolve => setTimeout(resolve, 600));

    const response = {
        news: filteredNews,
        hasMore: !!newPage,
        page: newPage
    };
    return NextResponse.json(response);
} 