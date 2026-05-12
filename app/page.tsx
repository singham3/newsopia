"use client";
import { debounce } from 'lodash';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Bootstrap JS to avoid SSR issues
const BootstrapJS = dynamic(() => import('bootstrap/dist/js/bootstrap.bundle.min.js'), {
  ssr: false
});

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
  const [currentMobileNewsIndex, setCurrentMobileNewsIndex] = useState(0);
  const [mobileNewsLoaded, setMobileNewsLoaded] = useState<NewsItem[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const hasLoaded = useRef(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const categories = {
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

  useEffect(() => {
    if (!hasLoaded.current) {
      setIsMobile(window.innerWidth <= 768);
      loadNews();
      hasLoaded.current = true;
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    // Add click outside listener for mobile sidebar
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
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
  }, [page, isMobile]);

  const loadNews = async (
    categoryParam: string = currentCategory,
    pageParam: number = page,
    previousCategory?: string
  ) => {
    if (loading || !hasMoreNews) return;
    setLoading(true);
    try {
      const url = `/api/news?category=${categoryParam}&page=${pageParam}` +  (previousCategory ? `&previous=${previousCategory}` : '');

      console.log('Fetching news from:', url);

      const response = await fetch(url);
      const data = await response.json();

      const newNews = data.news.filter((newItem: NewsItem) =>
        !news.some(existingItem => existingItem.id === newItem.id)
      );
      setNews(prev => [...prev, ...newNews]);
      setHasMoreNews(data.hasMore);
      setPage(data.page);

      if (isMobile) {
        const newMobileNews = data.news.filter((newItem: NewsItem) =>
          !mobileNewsLoaded.some(existingItem => existingItem.id === newItem.id)
        );
        setMobileNewsLoaded(prev => [...prev, ...newMobileNews]);
      }
    } catch (error) {
      console.error('Error loading news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = debounce(() => {
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

    // Check if we're near the bottom (within 300px)
    if (scrollTop + clientHeight >= scrollHeight - 300 && !loading && hasMoreNews) {
      if (isMobile) {
        // For mobile, load more news and update mobile view
        loadNews().then(() => {
          if (mobileNewsLoaded.length > 0) {
            renderMobileNews(currentMobileNewsIndex);
          }
        });
      } else {
        // For desktop, just load more news
        loadNews();
      }
    }
  }, 300);

  const handleResize = () => {
    const wasMobile = isMobile;
    const newIsMobile = window.innerWidth <= 768;
    setIsMobile(newIsMobile);
    
    if (wasMobile !== newIsMobile) {
      if (newIsMobile) {
        setupMobileView();
        setIsSidebarOpen(false);
      } else {
        teardownMobileView();
      }
    }
  };

  const setupMobileView = () => {
    if (mobileNewsLoaded.length > 0) {
      renderMobileNews(0);
    } else {
      loadNews().then(() => {
        if (mobileNewsLoaded.length > 0) {
          renderMobileNews(0);
        }
      });
    }
  };

  const teardownMobileView = () => {
    const mobileNewsView = document.getElementById('mobileNewsView');
    if (mobileNewsView) {
      mobileNewsView.innerHTML = '';
    }
  };

  const renderMobileNews = (index: number) => {
    if (index >= mobileNewsLoaded.length) return;
    
    setCurrentMobileNewsIndex(index);
    const news = mobileNewsLoaded[index];
    
    const mobileNewsView = document.getElementById('mobileNewsView');
    if (mobileNewsView) {
      mobileNewsView.innerHTML = `
        <div class="mobile-news-card">
          <div class="mobile-img-container">
            <img src="${news.image}" alt="${news.title}" class="mobile-img" />
          </div>
          <div class="mobile-content">
            <h2 class="mobile-title">${news.title}</h2>
            <div class="mobile-meta">
              <span><i class="fas fa-user-edit"></i> ${news.author}</span>
              <span><i class="far fa-calendar-alt"></i> ${news.date}</span>
            </div>
            <p class="mobile-description">${news.description}</p>
            <div class="mobile-actions">
              <a href="${news.url}" class="mobile-read-more" target="_blank">Read More</a>
              <button class="mobile-share">
                <i class="fas fa-share-alt"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }
  };

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory !== currentCategory) {
      const previousCategory = currentCategory;
      setNews([]);
      setPage(1);
      setHasMoreNews(true);
      setCurrentCategory(newCategory);
      loadNews(newCategory, 1, previousCategory);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className={`sidebar ${isSidebarOpen ? 'show' : ''}`} ref={sidebarRef}>
        <nav className="navbar navbar-dark">
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
                  type="button"
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

      <main className="main-content">
        <div className="container">
          {/* Ad Banner Row */}
          <div className="row mb-3">
            <div className="col-12 text-center">
              <div id="container-1b24974d21ee0f4e53d757afc5cab70d"></div>
            </div>
          </div>
          <div className="row" id="newsContainer">
            {news.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4 fade-in">
                <div className="news-card" data-id={item.id}>
                  <div className="img-container position-relative">
                    <div className="img-placeholder"></div>
                    <img
                      src={item.image}
                      className="card-img-top"
                      alt={item.title}
                      style={{ display: 'none' }}
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'block';
                        const placeholder = img.previousElementSibling as HTMLElement;
                        if (placeholder) placeholder.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
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
                      <a href={item.url} className="read-more">Read More</a>
                      <button className="share-button">
                        <i className="fas fa-share-alt"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

      <div id="mobileNewsView" className="d-none">
        <div className="mobile-news-container">
          {/* Mobile news cards will be dynamically inserted here */}
        </div>
      </div>

      {/* Share Modal */}
      <div className="modal fade" id="shareModal" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content glass-effect">
            <div className="modal-header">
              <h5 className="modal-title">Share this news</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-around">
                <a href="#" className="share-btn" id="shareFacebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="share-btn" id="shareTwitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="share-btn" id="shareLinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" className="share-btn" id="shareWhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a href="#" className="share-btn" id="shareEmail">
                  <i className="fas fa-envelope"></i>
                </a>
              </div>
              <div className="mt-3">
                <label htmlFor="shareLink" className="form-label">Copy link:</label>
                <div className="input-group">
                  <input type="text" className="form-control" id="shareLink" readOnly />
                  <button className="btn btn-outline-secondary" type="button" id="copyLinkBtn">
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 