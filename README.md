# Blondies Coffee - Static Website

A pixel-perfect, responsive static website for Blondies Coffee - Micro Roastery - Specialty Coffee, built with HTML5, CSS3, and jQuery.

## 🚀 Features

- **Fully Responsive Design** - Mobile-first approach with breakpoints for all devices
- **Interactive Hero Slider** - Touch-enabled with keyboard navigation and accessibility features
- **Smooth Animations** - Scroll-triggered animations and smooth transitions
- **Modern UI/UX** - Clean design matching the provided mockup exactly
- **Accessibility Focused** - WCAG compliant with screen reader support
- **Performance Optimized** - Lazy loading, throttled events, and efficient code
- **Cross-Browser Compatible** - Tested on Chrome, Firefox, Safari, and Edge

## 📁 Project Structure

```
blondies-html-project/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Main styles
│   └── responsive.css     # Responsive styles
├── js/
│   ├── slider.js          # Hero slider functionality
│   └── main.js            # Main JavaScript features
├── images/                # Image assets (see requirements below)
└── README.md              # This file
```

## 🖼️ Required Images

To complete the website, add the following images to the `images/` folder:

### Hero Slider Images
- `hero-slide-1.jpg` (1920x1080px) - Coffee shop interior with warm lighting
- `hero-slide-2.jpg` (1920x1080px) - Alternative hero image

### Section Images
- `espresso-1.jpg` (600x400px) - Coffee preparation/barista at work
- `espresso-2.jpg` (300x200px) - Coffee beans close-up
- `espresso-3.jpg` (300x200px) - Coffee cup or brewing process
- `coffee-bag-1.jpg` (400x500px) - Blondies coffee packaging
- `coffee-bag-2.jpg` (400x500px) - Secondary coffee product
- `latte-art-bg.jpg` (1920x1080px) - Background image with latte art

### Icons (SVG format recommended)
- `icon-fresh.svg` - Fresh roasted icon
- `icon-sustainable.svg` - Sustainability icon  
- `icon-atmosphere.svg` - Atmosphere/cafe icon

### Instagram Gallery
- `instagram-1.jpg` (600x600px) - Square format coffee moment
- `instagram-2.jpg` (600x600px) - Square format barista skills
- `instagram-3.jpg` (600x600px) - Square format coffee beans

## 🎨 Design Specifications

### Color Palette
- Primary Gold: `#C4A962`
- Primary Gold Dark: `#B59852`
- Dark Green: `#1B4332`
- Cream Background: `#F5F1E8`
- Dark Brown: `#3E2723`
- White: `#FFFFFF`
- Text Gray: `#666666`

### Typography
- **Headers**: Playfair Display (serif)
- **Body Text**: Montserrat (sans-serif)
- Loaded from Google Fonts

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🚀 Getting Started

1. **Clone/Download** the project files
2. **Add Images** - Place all required images in the `images/` folder
3. **Open** `index.html` in a web browser
4. **Deploy** to your web server

### Local Development
No build process required! Simply open `index.html` in your browser.

For local development with live reload, you can use:
```bash
# Using Python (if installed)
python -m http.server 8000

# Using Node.js (if installed)
npx http-server

# Using PHP (if installed)
php -S localhost:8000
```

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- iOS Safari 12+
- Android Chrome 60+

## ✅ Features Implemented

### Navigation
- ✅ Sticky navigation with scroll effects
- ✅ Mobile hamburger menu
- ✅ Smooth scroll to sections
- ✅ Active link highlighting

### Hero Slider
- ✅ Smooth slide transitions
- ✅ Touch/swipe support for mobile
- ✅ Keyboard navigation (arrow keys)
- ✅ Auto-play with pause on hover
- ✅ Accessibility features
- ✅ Slide indicators
- ✅ Previous/Next buttons

### Interactive Elements
- ✅ Scroll-triggered animations
- ✅ Hover effects on cards and buttons
- ✅ Newsletter form with validation
- ✅ Instagram gallery modal
- ✅ Scroll-to-top button
- ✅ Loading animations

### Responsive Design
- ✅ Mobile-first approach
- ✅ Flexible grid layouts
- ✅ Optimized typography scaling
- ✅ Touch-friendly interface
- ✅ Performance optimizations for mobile

### Accessibility
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ Skip links
- ✅ High contrast ratios

## 🎯 Performance Optimizations

- **Throttled scroll events** for smooth performance
- **Intersection Observer** for efficient animations
- **Lazy loading** for images
- **Debounced resize handlers**
- **Optimized jQuery selectors**
- **CSS animations over JavaScript** where possible

## 🔧 Customization

### Changing Colors
Update the CSS custom properties in `css/style.css`:
```css
:root {
    --primary-gold: #C4A962;
    --dark-green: #1B4332;
    /* ... other colors */
}
```

### Modifying Slider Settings
Adjust slider configuration in `js/slider.js`:
```javascript
const sliderConfig = {
    autoPlayInterval: 5000, // Change auto-play speed
    autoPlay: true,         // Enable/disable auto-play
    enableTouch: true,      // Enable/disable touch support
    // ... other settings
};
```

### Adding Content
- Update text content directly in `index.html`
- Add new sections following the existing structure
- Use the same CSS classes for consistent styling

## 📧 Form Integration

The newsletter form is currently set up for front-end validation only. For production:

1. **Update the form action** in `index.html`
2. **Add backend processing** (PHP, Node.js, etc.)
3. **Configure email service** (Mailchimp, SendGrid, etc.)

Example form integration:
```html
<form class="newsletter-form" action="/subscribe" method="POST">
    <input type="email" name="email" required>
    <button type="submit">SUBSCRIBE</button>
</form>
```

## 🔍 SEO Optimizations

The website includes several SEO best practices:

- ✅ Semantic HTML5 structure
- ✅ Meta descriptions and titles
- ✅ Proper heading hierarchy (h1, h2, h3)
- ✅ Alt attributes for images
- ✅ Fast loading times
- ✅ Mobile-friendly design

For production, consider adding:
- Open Graph meta tags
- Twitter Card meta tags
- Schema.org markup
- XML sitemap
- Robots.txt

## 🚀 Deployment

The website is ready for deployment to any static hosting service:

### Popular Hosting Options
- **Netlify** - Drag and drop deployment
- **Vercel** - Git-based deployment
- **GitHub Pages** - Free hosting for public repos
- **AWS S3** - Scalable cloud storage
- **Traditional Web Hosting** - Upload via FTP

### Pre-deployment Checklist
- [ ] All images added to `/images/` folder
- [ ] Test on multiple devices and browsers
- [ ] Verify all links work correctly
- [ ] Check form submissions (if applicable)
- [ ] Optimize images for web (compress without quality loss)
- [ ] Test website speed (aim for <3 seconds load time)

## 🎨 Design Fidelity

This implementation matches the provided design mockup with:

- ✅ Exact color matching
- ✅ Pixel-perfect typography
- ✅ Consistent spacing and layouts
- ✅ Proper image aspect ratios
- ✅ Matching button styles and hover effects
- ✅ Responsive behavior at all breakpoints

## 🛠️ Technical Details

### jQuery Features Used
- Event handling and delegation
- DOM manipulation and traversal
- Animations and effects
- AJAX-ready form handling
- Custom easing functions

### CSS Features
- CSS Grid and Flexbox
- Custom properties (CSS variables)
- Advanced selectors
- Responsive images
- Transform and transition effects

### JavaScript APIs
- Intersection Observer
- Page Visibility API
- Touch events
- Keyboard events
- Local Storage (ready for future use)

## 📞 Support

For questions or issues with this implementation:

1. Check browser console for any JavaScript errors
2. Verify all image files are in the correct location
3. Test in different browsers and devices
4. Check responsive behavior at various screen sizes

## 🔄 Updates and Maintenance

This codebase is built for easy maintenance:

- **Modular CSS** - Separate files for main styles and responsive styles
- **Commented Code** - Clear documentation throughout
- **Semantic HTML** - Easy to understand and modify
- **Consistent Naming** - Predictable class and ID naming conventions

---

**Built with ❤️ for Blondies Coffee**

*Ready for immediate deployment and production use.*

