
import "./ComingSoon.css"; // Import CSS if you have other styles there

function ComingSoon() {

    return (
        <div className="coming-soon-container">
            
            <div className="header-section">
                <h1 className="left-align header-text-color">Our Future Plans</h1>
                <p className="center-text header-text-color">We're excited about what's next! Here's a sneak peek at some of the features we're planning to bring to you.</p>
            </div>

            <div className="future-features-grid">
                <div className="feature-card cream-opaque-tile hover-effect">
                    <h3 className="tile-header-color">Personalized Recommendations</h3>
                    <p>Our team is developing an advanced recommendation engine that will learn your movie preferences over time. By analyzing your watch history, ratings, and even the types of movies you browse, we aim to provide highly accurate and engaging suggestions. Expect to discover hidden gems and revisit old favorites with ease!</p>
                    <span className="status planned">Planned</span>
                </div>

                {/* ... other feature cards ... */}
                <div className="feature-card cream-opaque-tile hover-effect">
                    <h3 className="tile-header-color">Mobile App Development</h3>
                    <p>Take your movie world with you! We're in the early stages of exploring the development of dedicated mobile applications for iOS and Android. This will allow you to browse, save, and potentially even watch movies on the go, seamlessly syncing your preferences across all your devices.</p>
                    <span className="status considering">Considering</span>
                </div>
            </div>

        
        </div>
    );
}

export default ComingSoon;