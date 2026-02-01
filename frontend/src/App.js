import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { MapPin, Phone, Star, Clock, ChevronDown, Instagram } from "lucide-react";

const STORE_IMAGES = {
  storefront1: "https://customer-assets.emergentagent.com/job_678a73c4-b73b-4fe2-856f-9d4b969d0787/artifacts/6ix2rtcx_Gemini_Generated_Image_wyui5nwyui5nwyui.png",
  storefront2: "https://customer-assets.emergentagent.com/job_678a73c4-b73b-4fe2-856f-9d4b969d0787/artifacts/nm71ley8_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-01%20185012.png",
  interior: "https://customer-assets.emergentagent.com/job_678a73c4-b73b-4fe2-856f-9d4b969d0787/artifacts/w97qks2p_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-01%20185023.png",
  signage: "https://customer-assets.emergentagent.com/job_678a73c4-b73b-4fe2-856f-9d4b969d0787/artifacts/2gx14n95_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-01%20185033.png",
  products: "https://customer-assets.emergentagent.com/job_678a73c4-b73b-4fe2-856f-9d4b969d0787/artifacts/0qtp4vp0_%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202026-02-01%20185141.png"
};

const REVIEWS = [
  {
    text: "I really liked the vibes of this thrift store! They had a cozy window, old tvs, and a nice dressing room. Personally most things in this store weren't my style, but it was well organized, and had a lot of good professional & college sports items. Staff was kind and helpful with my questions.",
    author: "Natalia Cruz",
    rating: 5,
    url: "https://maps.app.goo.gl/b6eJ1ehf5wYUkQXM9"
  },
  {
    text: "I literally lost my Ray bans in there and they were so sweet and like posted whose Ray-Ban's and I was like oh my gosh, like those are mine like thank you so much they were teaaaaaaaa and honest 🤏🤏🤏🤏🤏 and lowkey not bad pricing",
    author: "Sophia Mcgill",
    rating: 5,
    url: "https://maps.app.goo.gl/63LPY6Q7CRgsAkue6"
  },
  {
    text: "Best vintage clothing store in Louisville, really nice and helpful employees, and a really sick layout. Run a lot of promotions for even better deals as well, great business.",
    author: "Dalen Lesshafft",
    rating: 5,
    url: "https://maps.app.goo.gl/WSXuQoSQSWoQSLoM8"
  },
  {
    text: "wonderful owners. friendly staff. excellent prices. would recomend. love this place. i feel right at home ❤️",
    author: "Angela Helm",
    rating: 5,
    url: "https://maps.app.goo.gl/TNKyzkV9dkcasyuz6"
  },
  {
    text: "Such a vibe in the place owners are great people who will help and take u seriously. Great place to get some good vintage.",
    author: "Austin Matracia",
    rating: 5,
    url: "https://maps.app.goo.gl/bMxkYEogmWQscTSV7"
  },
  {
    text: "I had the chance to stop by and look around. I bought a couple shirts but ended up leaving my wallet in the store and left the city. James was very helpful in getting my wallet back to me and handled the situation perfectly, which he didn't have any obligation to do. I would give 6 starts if possible! Also, great prices and awesome selection.",
    author: "Gunner Hogston",
    rating: 5,
    url: "https://maps.app.goo.gl/N6skeva7EQhtipM18"
  }
];

const HOURS = [
  { day: "Monday", hours: "12–8 PM" },
  { day: "Tuesday", hours: "12–8 PM" },
  { day: "Wednesday", hours: "12–8 PM" },
  { day: "Thursday", hours: "12–8 PM" },
  { day: "Friday", hours: "12–8 PM" },
  { day: "Saturday", hours: "11 AM–8 PM" },
  { day: "Sunday", hours: "11 AM–7 PM" }
];

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/502+Thrifts/@38.2316284,-85.7095982,20.5z/data=!4m15!1m8!3m7!1s0x88690cc9390826d7:0x9e951e81abbf4e0b!2s1900+Eastern+Pkwy,+Louisville,+KY+40204!3b1!8m2!3d38.2315813!4d-85.7094412!16s%2Fg%2F11rg5_0gkc!3m5!1s0x88690d00536b0225:0xec768e31c9b33e51!8m2!3d38.2315813!4d-85.7094412!16s%2Fg%2F11y3n1hm09?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D";
const INSTAGRAM_URL = "https://www.instagram.com/502_thrifts/";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoursExpanded, setHoursExpanded] = useState(false);
  const reviewsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "assortment", "reviews", "location"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const reviewsContainer = reviewsRef.current;
    if (!reviewsContainer) return;

    const handleWheel = (e) => {
      e.preventDefault();
      reviewsContainer.scrollLeft += e.deltaY;
    };

    reviewsContainer.addEventListener("wheel", handleWheel);
    return () => reviewsContainer.removeEventListener("wheel", handleWheel);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button 
              onClick={() => scrollToSection("home")}
              className="text-xl font-bold tracking-tight text-stone-900 hover:text-red-600 transition-colors"
              data-testid="nav-logo"
            >
              502 THRIFTS
            </button>
            <div className="hidden md:flex space-x-8">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About" },
                { id: "assortment", label: "Shop" },
                { id: "reviews", label: "Reviews" },
                { id: "location", label: "Visit" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? "text-red-600"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                  data-testid={`nav-${item.id}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 z-0">
          <img
            src={STORE_IMAGES.storefront1}
            alt="502 Thrifts Storefront"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-900/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
            data-testid="hero-title"
          >
            502 THRIFTS
          </h1>
          <p className="text-xl sm:text-2xl text-stone-100 mb-12 font-light tracking-wide">
            Curated Vintage Clothing in Louisville
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors shadow-lg"
              data-testid="hero-directions-btn"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Get Directions
            </a>
            <a
              href="tel:+15023840095"
              className="flex-1 w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-stone-900 font-semibold rounded hover:bg-stone-100 transition-colors shadow-lg"
              data-testid="hero-call-btn"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Store
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 sm:w-auto sm:h-auto sm:px-4 sm:py-4 bg-white text-stone-900 font-semibold rounded hover:bg-stone-100 transition-colors shadow-lg inline-flex items-center justify-center"
              data-testid="hero-instagram-btn"
            >
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-6" data-testid="about-title">
                Authentic Vintage, <br />Carefully Curated
              </h2>
              <p className="text-lg text-stone-700 leading-relaxed mb-6">
                Nestled in Louisville's historic Schuster Building, 502 Thrifts is your destination for authentic vintage clothing and one-of-a-kind pieces.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed">
                We're a local business passionate about bringing you carefully selected vintage items that tell a story. From classic denim to rare graphic tees, every piece in our collection is handpicked for its quality and character.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src={STORE_IMAGES.interior}
                alt="Store Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Assortment Section */}
      <section id="assortment" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-stone-900 mb-4 text-center" data-testid="assortment-title">
            What You'll Find
          </h2>
          <p className="text-center text-stone-600 mb-16 text-lg">
            Every piece is unique — come visit us to explore the current collection
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl group">
              <img
                src={STORE_IMAGES.storefront2}
                alt="Vintage Clothing Display"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Vintage Jackets & Denim</h3>
                  <p className="text-stone-200">Classic cuts and timeless styles</p>
                </div>
              </div>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl group">
              <img
                src={STORE_IMAGES.products}
                alt="Graphic Tees Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Graphic Tees & Sports Gear</h3>
                  <p className="text-stone-200">Rare finds from the 80s, 90s & beyond</p>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 bg-stone-50 rounded-lg p-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Vintage Jackets",
                  "Denim & Jeans",
                  "Graphic Tees",
                  "Accessories",
                  "Varsity & Sports",
                  "Band Tees",
                  "Unique Outerwear",
                  "One-of-a-Kind Pieces"
                ].map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                    <span className="text-stone-800 font-medium">{category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-stone-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4" data-testid="reviews-rating">
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              <span className="text-5xl font-bold ml-3">4.7</span>
            </div>
            <p className="text-stone-400 text-lg">Based on 34 reviews</p>
            <p className="text-2xl text-stone-200 mt-4">Loved by the local vintage community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map((review, index) => (
              <div
                key={index}
                className="bg-stone-800 p-6 rounded-lg"
                data-testid={`review-${index}`}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-stone-200 mb-4 leading-relaxed">{review.text}</p>
                <p className="text-stone-400 font-medium">— {review.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-stone-900 mb-4 text-center" data-testid="location-title">
            Visit Us
          </h2>
          <p className="text-center text-stone-600 mb-16 text-lg">
            Located in the historic Schuster Building
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Address</h3>
                  <p className="text-stone-700 leading-relaxed">
                    1900 Eastern Pkwy<br />
                    Louisville, KY 40204<br />
                    <span className="text-stone-500 text-sm">Located in: Schuster Building</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Phone</h3>
                  <a
                    href="tel:+15023840095"
                    className="text-stone-700 hover:text-red-600 transition-colors text-lg"
                    data-testid="location-phone"
                  >
                    (502) 384-0095
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Hours</h3>
                  <p className="text-stone-700">Opens 11 AM</p>
                  <p className="text-stone-500 text-sm">(Currently closed)</p>
                </div>
              </div>
              
              <a
                href="https://www.google.com/maps/search/?api=1&query=1900+Eastern+Pkwy,+Louisville,+KY+40204"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition-colors shadow-lg"
                data-testid="location-maps-btn"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Open in Google Maps
              </a>
            </div>
            
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
              <img
                src={STORE_IMAGES.signage}
                alt="502 Thrifts Building"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">502 THRIFTS</h3>
            <p className="text-stone-400 mb-2">1900 Eastern Pkwy, Louisville, KY 40204</p>
            <a
              href="tel:+15023840095"
              className="text-stone-400 hover:text-white transition-colors"
            >
              (502) 384-0095
            </a>
            <div className="mt-8 pt-8 border-t border-stone-800">
              <p className="text-stone-500 text-sm">© 2025 502 Thrifts. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
