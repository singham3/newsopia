import { NextResponse } from 'next/server'
import { formatTimestamp } from '../../utils/dateFormatter';

const fetchNewsData = async (category: string , page: number = 1) => {
    try {
        const url = category ? `https://inshorts.com/api/en/search/trending_topics/${category}?page=${page}&type=NEWS_CATEGORY` : `https://inshorts.com/api/en/search/trending_topics`;
        const response = await fetch(url);
        const data = await response.json();
        const newPage = page + 1;
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

// Static news data to simulate API responses

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const pageParam = searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const category = searchParams.get('category') || 'all';

    const { newsList, newPage } = await fetchNewsData(category, page);
    
    let filteredNews = newsList;

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const response = {
        news: filteredNews,
        hasMore: !!newPage,
        page: newPage
    };
    return NextResponse.json(response);
} 