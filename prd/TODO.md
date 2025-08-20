# BK Crackers Store - Development TODO List

## Project Setup & Configuration
- [ ] 1. Setup React project with Vite, TypeScript, Tailwind CSS, and React Router v7
- [ ] 2. Analyze and implement Famms theme design patterns from https://startersites.io/blocksy/garderobe/
- [ ] 3. Setup OpenAPI CRC integration for backend API endpoints discovery
- [ ] 4. Create project folder structure and base configuration
- [ ] 5. Setup API service layer with axios and multi-tenant header support

## Header & Navigation Components
- [ ] 6. Create Header component (65px height, sticky) with logo, menu, search, cart, favorites, profile
- [ ] 7. Implement QuickBuy menu animation in Header
- [ ] 8. Create Profile dropdown with My Profile, My Enquiries, Favorites, Signout

## Homepage Sections
- [ ] 9. Create News/Announcement section (55px height) with animated scrolling
- [ ] 10. Create Hero section (900px) with left content and Spline 3D animations on right
- [ ] 11. Create Featured Products section (990px) with 4 product cards
- [ ] 12. Create New Arrivals section (990px) with 4 product cards
- [ ] 13. Create Special Items section (990px) with 4 product cards
- [ ] 14. Create Footer component (750px) with 4 columns, newsletter, copyright, United Nexa Tech credit
- [ ] 15. Create Home page combining all sections

## QuickBuy Feature
- [ ] 16. Create QuickBuy page with table view, search, brand/category filters
- [ ] 17. Implement QuickBuy table with SNo, Code, Name, Brand, Category, Pack Type, Pieces, Price, Discount, Qty, Amount
- [ ] 18. Create floating cart summary in QuickBuy with minimum order check

## Authentication System
- [ ] 19. Create Login page with Mobile OTP, WhatsApp OTP, Email OTP options
- [ ] 20. Implement OTP verification and auto-registration flow
- [ ] 21. Create user profile collection for new users (Name, Email/Mobile)

## Cart & Checkout Flow
- [ ] 22. Create Cart page with enquiry summary and minimum order enforcement
- [ ] 23. Create Submit Enquiry page with Address selection/creation (Amazon style)
- [ ] 24. Implement Delivery Location selection with Lorry Service options
- [ ] 25. Create Coupon system with validation and public coupons display
- [ ] 26. Create Enquiry Summary section with products, pricing, discounts
- [ ] 27. Add Additional Notes section in Submit Enquiry
- [ ] 28. Create Success page with boom animation and navigation options

## User Account Pages
- [ ] 29. Create My Enquiries page with filter tabs (All, Unpaid, Pending Verification, Paid)
- [ ] 30. Create Enquiry Card component with order details, status, payment proofs
- [ ] 31. Create My Favorites page with summary card and product cards
- [ ] 32. Create My Profile page with user information and edit capabilities

## Static Pages
- [ ] 33. Create About Us static page
- [ ] 34. Create Contact Us page with contact form
- [ ] 35. Create Terms & Conditions page
- [ ] 36. Create Safety Guidelines page
- [ ] 37. Create Categories page with category listing
- [ ] 38. Create Shipping Info page

## Core Functionality & Integration
- [ ] 39. Implement authentication context and protected routes
- [ ] 40. Create cart context and localStorage persistence
- [ ] 41. Create favorites context and management
- [ ] 42. Implement product card component with add to cart and favorites
- [ ] 43. Setup routing for all pages with proper navigation
- [ ] 44. Implement responsive design for mobile and desktop
- [ ] 45. Add loading states and error handling throughout the app
- [ ] 46. Test all flows and fix any issues

## Technical Requirements
- **Theme**: Follow https://themewagon.github.io/famms/ design patterns
- **Logo**: Located at ../../customers/bkcrackers/logo
- **Technology Stack**: React with Router v7, TypeScript, Tailwind CSS
- **API Integration**: Use OpenAPI CRC for endpoint discovery
- **Multi-tenant**: Include x-tenant-key header in all API requests

## Design Specifications
- **Colors**:
  - Primary Red: #e53854
  - Success Green: #28a745
  - Warning Yellow: #fff3cd (bg), #e8a529 (text)
  - Text: #000000 (primary), #6c757d (secondary)
- **Font**: Inter or Poppins (clean sans-serif)
- **UI Elements**: Rounded corners, soft drop shadows, consistent spacing

## Component Heights (Fixed)
- Header: 65px (sticky)
- News Section: 55px
- Hero Section: 900px
- Product Sections: 990px each
- Footer: 750px

## Priority Order
1. Project setup and configuration
2. Core layout (Header, Footer)
3. Homepage with all sections
4. QuickBuy functionality
5. Authentication system
6. Cart and checkout flow
7. User account pages
8. Static pages
9. Testing and refinement