import { useRef, useEffect } from 'react';
import './PageNavigation.css';

const PageNavigation = ({ pages, currentPageId, onSelectPage, onGoHome }) => {
  const navRef = useRef(null);
  const currentIndex = pages.findIndex((p) => p.id === currentPageId);

  useEffect(() => {
    // Scroll to current page button when page changes
    if (navRef.current && currentIndex >= 0) {
      const buttons = navRef.current.querySelectorAll('.page-nav-item');
      if (buttons[currentIndex]) {
        buttons[currentIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentPageId, currentIndex]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onSelectPage(pages[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < pages.length - 1) {
      onSelectPage(pages[currentIndex + 1].id);
    }
  };

  return (
    <div className="page-navigation">
      <button
        className="nav-arrow"
        onClick={onGoHome}
        title="Go to Home"
      >
        🏠
      </button>

      <button
        className="nav-arrow"
        onClick={handlePrevious}
        disabled={currentIndex <= 0}
        title="Previous Page"
      >
        ◀
      </button>

      <div className="page-nav-list" ref={navRef}>
        {pages.map((page) => (
          <button
            key={page.id}
            className={`page-nav-item ${page.id === currentPageId ? 'active' : ''}`}
            style={{
              backgroundColor: page.id === currentPageId ? page.color : '#2a2a2a',
              borderColor: page.color
            }}
            onClick={() => onSelectPage(page.id)}
            title={page.name}
          >
            <span className="page-nav-icon">{page.icon}</span>
            <span className="page-nav-name">{page.name}</span>
          </button>
        ))}
      </div>

      <button
        className="nav-arrow"
        onClick={handleNext}
        disabled={currentIndex >= pages.length - 1}
        title="Next Page"
      >
        ▶
      </button>
    </div>
  );
};

export default PageNavigation;
