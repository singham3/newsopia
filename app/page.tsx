"use client";
import { debounce } from 'lodash';
import { useEffect, useState, useRef, useCallback } from 'react';

interface NewsItem {
  id: number;
  title: string;
  description: string;
  author: string;
  date: string;
  category: string;
  image: string;
  url: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [hasMoreNews, setHasMoreNews] = useState(true);
  const [currentCategory, setCurrentCategory] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const hasLoaded = useRef(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const snapContainerRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const newsRef = useRef<NewsItem[]>([]);
  const pageRef = useRef<number | string>(1);
  const categoryRef = useRef('');

  const categories: Record<string, string> = {
    "Trending News": "",
    "India": "national",
    "Business": "business",
    "Politics": "politics",
    "Sports": "sports",
    "Technology": "technology",
    "Startup": "startup",
    "Entertainment": "entertainment",
    "Hatke": "hatke",
    "International": "world",
    "Automobile": "automobile",
    "Science": "science",
    "Travel": "travel",
    "Miscellaneous": "miscellaneous",
    "Fashion": "fashion",
    "Education": "education",
    "Health Fitness": "Health___Fitness"
  };

  // Keep refs in sync with state
  useEffect(() => {
    newsRef.current = news;
  }, [news]);

  useEffect(() => {
    hasMoreRef.current = hasMoreNews;
  }, [hasMoreNews]);

  useEffect(() => {
    categoryRef.current = currentCategory;
  }, [currentCategory]);

  const loadNews = useCallback(async (
    categoryParam?: string,
    pageParam?: number | string,
    previousCategory?: string
  ) => {
    const cat = categoryParam ?? categoryRef.current;
    const pg = pageParam ?? pageRef.current;

    if (loadingRef.current || !hasMoreRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const url = `/api/news?category=${cat}&page=${pg}` + (previousCategory ? `&previous=${previousCategory}` : '');

      const response = await fetch(url);
      const data = await response.json();

      const existingIds = new Set(newsRef.current.map(item => item.id));
      const newNews = data.news.filter((newItem: NewsItem) =>
        !existingIds.has(newItem.id)
      );

      setNews(prev => [...prev, ...newNews]);
      setHasMoreNews(data.hasMore);
      setPage(data.page);
      pageRef.current = data.page;
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }, []);

  // Desktop infinite scroll handler
  const handleScroll = useCallback(
    debounce(() => {
      if (isMobile) return; // Don't handle scroll on mobile

      const scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;

      if (scrollTop + clientHeight >= scrollHeight - 300 && !loadingRef.current && hasMoreRef.current) {
        loadNews();
      }
    }, 300),
    [isMobile, loadNews]
  );

  // Mobile snap scroll handler — load more when near end
  const handleSnapScroll = useCallback(
    debounce(() => {
      const container = snapContainerRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // Load more when within 2 cards of the bottom
      if (scrollTop + clientHeight >= scrollHeight - clientHeight * 2 && !loadingRef.current && hasMoreRef.current) {
        loadNews();
      }
    }, 200),
    [loadNews]
  );

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    if (!hasLoaded.current) {
      setIsMobile(window.innerWidth <= 768);
      loadNews();
      hasLoaded.current = true;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      handleScroll.cancel();
    };
  }, [handleScroll, handleResize, loadNews]);

  // Attach snap scroll listener for mobile
  useEffect(() => {
    const container = snapContainerRef.current;
    if (isMobile && container) {
      container.addEventListener('scroll', handleSnapScroll);
      return () => {
        container.removeEventListener('scroll', handleSnapScroll);
        handleSnapScroll.cancel();
      };
    }
  }, [isMobile, handleSnapScroll]);

  const handleShare = async (item: NewsItem) => {
    const shareData = {
      title: item.title,
      text: item.description.length > 120 ? item.description.substring(0, 120) + '...' : item.description,
      url: item.url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy link to clipboard
        await navigator.clipboard.writeText(item.url);
        showToast('Link copied to clipboard!');
      }
    } catch (error) {
      // User cancelled share or error occurred — ignore AbortError
      if ((error as DOMException).name !== 'AbortError') {
        console.error('Share failed:', error);
      }
    }
  };

  const showToast = (message: string) => {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification show';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2000);
  };

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory !== currentCategory) {
      const previousCategory = currentCategory;
      setNews([]);
      newsRef.current = [];
      setPage(1);
      pageRef.current = 1;
      setHasMoreNews(true);
      hasMoreRef.current = true;
      setCurrentCategory(newCategory);
      categoryRef.current = newCategory;
      loadNews(newCategory, 1, previousCategory);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // -- Render: Desktop news card --
  const renderDesktopCard = (item: NewsItem) => (
    <div key={item.id} className="col-md-6 col-lg-4 fade-in">
      <article className="news-card" data-id={item.id}>
        <div className="img-container position-relative">
          <div className="img-placeholder"></div>
          <img
            src={item.image}
            className="card-img-top"
            alt={item.title}
            loading="lazy"
            onLoad={(e) => {
              const img = e.target as HTMLImageElement;
              img.classList.add('loaded');
              const placeholder = img.previousElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'none';
            }}
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.classList.add('loaded');
              const placeholder = img.previousElementSibling as HTMLElement;
              if (placeholder) placeholder.style.display = 'none';
            }}
          />
        </div>
        <div className="card-body">
          <h2 className="card-title">{item.title}</h2>
          <div className="card-meta">
            <span><i className="fas fa-user-edit me-1"></i> {item.author}</span>
            <span><i className="far fa-calendar-alt me-1"></i> {item.date}</span>
          </div>
          <p className="card-text">
            {item.description.length > 150
              ? item.description.substring(0, 150) + '...'
              : item.description}
          </p>
          <div className="card-actions">
            <a href={item.url} className="read-more" target="_blank" rel="noopener noreferrer">Read More</a>
            <button
              className="share-button"
              onClick={() => handleShare(item)}
              aria-label={`Share ${item.title}`}
            >
              <i className="fas fa-share-alt"></i>
            </button>
          </div>
        </div>
      </article>
    </div>
  );

  // -- Render: Mobile snap card --
  const renderMobileSnapCard = (item: NewsItem) => (
    <article key={item.id} className="snap-card">
      <div className="snap-card-image">
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
        <div className="snap-card-gradient"></div>
      </div>
      <div className="snap-card-content">
        <span className="snap-card-category">{item.category || 'News'}</span>
        <h2 className="snap-card-title">{item.title}</h2>
        <div className="snap-card-meta">
          <span><i className="fas fa-user-edit"></i> {item.author}</span>
          <span><i className="far fa-calendar-alt"></i> {item.date}</span>
        </div>
        <p className="snap-card-description">{item.description}</p>
        <div className="snap-card-actions">
          <a href={item.url} className="read-more" target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
          <button
            className="share-button"
            onClick={() => handleShare(item)}
            aria-label={`Share ${item.title}`}
          >
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    </article>
  );

  return (
    <>
      <header className={`sidebar ${isSidebarOpen ? 'show' : ''}`} ref={sidebarRef}>
        <nav className="navbar navbar-dark" aria-label="Category navigation">
          <div className="d-flex justify-content-between align-items-center w-100 mb-3">
            <a className="navbar-brand" href="/">Newsopia</a>
            <button 
              className="navbar-toggler d-md-none" 
              type="button" 
              onClick={toggleSidebar}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <ul className="navbar-nav flex-column w-100">
            {Object.entries(categories).map(([label, value]) => (
              <li key={value} className="nav-item">
                <a
                  className={`nav-link ${currentCategory === value ? 'active' : ''}`}
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryChange(value);
                    if (isMobile) {
                      setIsSidebarOpen(false);
                    }
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <button 
        className="navbar-toggler d-md-none fixed-toggler" 
        type="button" 
        onClick={toggleSidebar}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* -- MOBILE: Vertical snap scrolling -- */}
      {isMobile ? (
        <main className="snap-scroll-container" ref={snapContainerRef}>
          {news.map((item) => renderMobileSnapCard(item))}

          {loading && (
            <div className="snap-card snap-card-loading">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </main>
      ) : (
        /* -- DESKTOP: Infinite scrolling -- */
        <main className="main-content">
          <div className="container">
            {/* Ad Banner Row */}
            <div className="row mb-3">
              <div className="col-12 text-center">
                <div id="container-1b24974d21ee0f4e53d757afc5cab70d"></div>
              </div>
            </div>
            <div className="row" id="newsContainer">
              {news.map((item) => renderDesktopCard(item))}
            </div>
            {loading && (
              <div className="text-center mb-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
        </main>
      )}
    </>
  );
}