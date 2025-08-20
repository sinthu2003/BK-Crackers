# Theme

You must follow the theme style from this web url : https://startersites.io/blocksy/garderobe/

Logo location : /Users/vimalprakash/Documents/Projects/ecommerce/customers/bkcrackers/logo

# Technology
ReactJS with Router7 
Tailwind CSS

# Tools 

Use "openapi-crc" MCP tool always to get the Endpoint, Request and Response class strutures. 

# Pages we need to develop
## Public pages
1. Home -> Header, Footer
2. QuickBuy -> Header , Footer
3. AboutUs -> Header, Footer
4. ContactUs -> Header , Footer
5. Terms & Conditions -> Footer
6. Safety Guidelines -> Footer
7. Cart -> Header
8. Login -> Header 
9. Favorites -> Header
10. Categories -> Header , Footer
11. Shipping Info -> Footer

## Secure pages
1. My Profile --> Header with profile icon, and name
1.1. My Profile
1.2. My Enquires
1.3. Favorites
1.4. Signout

# Page Definations 
## 1. Home
### Header Section - height 65px - sticky to the top
1. Left side need logo and business name
2. Next to that with some gap, Menu to show Home, QuickBuy, Categories, About, Contact. Here "QuickBuy" need a special animation to get the attentions
3. Right Side, Search Icon, Favorites Icon, Cart Icon, Profile icon with name 
3.1. On Search Icon click , it needs to redirect to "QuickBuy" page. 
3.2. Profile icon with name , need a one mouseover drop down to display the My Profile, My Enquires, Favorites, (sepearator), Signout

## News/Announcement Section - height 55px
1. Need a animated NEWS scrolling section to display the news from backend service

## Hero Section - height of 900px
1. Left side it talks about products premiumness and diwali greatings, and showing one button to nagivate to QuickBuy 
2. Right side need to show animated image to show "Perimum Quality", "Fast Delivery", "Safe and Certified", "High Customer Rating", here we will use https://spline.design/ embeddings

## Featured Products - height of 990px
1. Shows 4 product card with add to cart, favorites from the backend by calling the api 
2. And shows a button to redirect to QuickBuy
## New Arrivals - height of 990px
1. Shows 4 product card with add to cart, favorites from the backend by calling the api 
2. And shows a button to redirect to QuickBuy
## Special items - height of 990px
1. Shows 4 product card with add to cart, favorites from the backend by calling the api 
2. And shows a button to redirect to QuickBuy
## Footer - height of 750px
1. First row with four coloums 
1.1 Column 1 - Company name,  Slogan, short highlight , Social media links
1.2 Column 2 - Quick Links : Home, About Us, Contact, Shipping Info
1.3 Column 3 - Categories : All Products (Link to Quickbuy), New Arraival (Link to category view view page), Featured (Link to category view view page)
1.4 Column 4 - Contact Info : Address, Email, Contact Numbers
2. Second row - news letter subscription with email 
3. Third row - Show copy write with company name and current year in the left side , on the right side showing the links for "Terms & Conditions", "Safety Guidelines"
4. Fourth row - Showing devloped and maintained by "United Nexa Tech" [https://unitednexa.com/] 

## 2. Quick buy
1. Listing all the products in the table view with having a option to search by Text Box (name and sku), Dropdown (Brands), Dropdown (Categories)
2. In table view , Cloumns are SNo, Code, Name, Brand, Category, Pack Type, Pieces, Selling Price, After Discount, Qty (- [ ] + type), Amount (After Discount * Qty)
2.1 Qty we have to get input from use on click of pluse or minus or entering the count directly , we have to add that to cart or remove
3. In side this , each category needs to be displayed in a full colspan , then products
4. Need a one floating Cart summary to show How much I have added in the cart, then button to navigate to Checkout Page (Call it as Submit Enquiry), in this time we have to check, if the user is not logged in we have to driect to login page, once they login we have to continue to where left here. 
## 3. Login page 
1. we have to allow users to login with Mobile OTP, WhatsApp OTP, Email OTP. No registration required while verifying the OTP will register the user. 
2. If it is a new user we have to show the option to collect User's Full Name, Email or mobile (based on the previous flow, for you to check if the userinfo dont have one of this field ask to enter). 
3. Once you login , goback to where you came
## 4. Submit Enquiry
### 1. Address Selection or Create New address, (Amazon style)

"Address Label *" -> Home , or Work
Street Address 
City
State
Zip Code
Check box to save as default. 

### 2. Delivery Location selection
2.1 Select the available Lorry Service 
2.2 Once user select the Lorry Service, we have to show all available locations, from that user have to select the lorry service. 
2.3 Also user give Pickup Instructions (Required if no location selected)

This selection is optional

### 3. Have a Coupon? 

Text box to take the coupon code.  and apply. On apply i need to validate and show the updated price in the page
Also it needs to show all public coupon in the page and allow users to click and apply.

### 4. Enquiry Summary

Here we have to show all the products in the cart with Product (Image and Name), Price, Quantity, Total

Here we have to enforce the minimum order value. We have to show the sub total, Discount (if any, have to show the applied coupon code) , shipping cost (here we have to show Shipping charges will be decided by the lorry service with eye graping animations), then final total

### 5. Additional Notes (Optional)

Need to show one big text area to collect the additonal note from customer. 

### 6. Submit Enquiry (with final amount) button


## 5. Submitted success page

we have to show boom animation in this page to celebrate the success.

then need to have to option to redirect to "My Enquires" and "Continue Shopping (redirect to QuickBuy)". 

## 6. Cart Page.

need to display the items in the cart, with Enquiry Summary. 

Here we have to enforce the minimum order value. We have to show the sub total, Discount (if any, have to show the applied coupon code) , shipping cost (here we have to show Shipping charges will be decided by the lorry service with eye graping animations), then final total

then need to have to option to redirect to "Proceed to Enquiry" and "Continue Shopping". 


## 7. My Enquiries

This document outlines the UI components and styling for the "My Enquiries" page.

#### **1. Page Header**
*   **Main Title:**
    *   Text: "My Enquiries"
    *   Style: Large, bold, black font (e.g., `font-weight: 700` or `bold`).
*   **Subtitle:**
    *   Text: "Track and manage your enquiries"
    *   Style: Smaller, regular weight, gray font. Positioned directly below the main title.

#### **2. Filter Tabs**
A row of pill-shaped filter buttons is displayed below the header.

*   **Container:** A horizontal group of four buttons.
*   **Active Tab ("All Enquiries"):**
    *   Text: "All Enquiries (5)"
    *   Background: Solid primary red color (`#e53854`).
    *   Text Color: White.
    *   Border: None.
    *   State: This is the currently selected filter.
*   **Inactive Tabs ("Unpaid", "Pending Verification", "Paid"):**
    *   Background: White.
    *   Text Color: Dark Gray/Black.
    *   Border: 1px solid light gray.
    *   State: These are the unselected filters.

#### **3. Enquiry Card**
This is the main component for displaying individual enquiry details. It's a container with a white background, soft drop shadow, and rounded corners.

*   **Card Header (Top Section):**
    *   **Enquiry ID:**
        *   Text: "O-0076"
        *   Style: Large, bold, black font.
    *   **Status Badge:**
        *   Text: "Pending Verification"
        *   Style: A pill-shaped badge with rounded corners.
        *   Background Color: Light yellow/cream (`#fff3cd`).
        *   Text Color: Orange/gold (`#e8a529`).
    *   **"View Details" Button:**
        *   Position: Aligned to the top right of the card.
        *   Text: "View Details"
        *   Icon: An "eye" icon to the left of the text.
        *   Style: Pill-shaped button with rounded corners.
        *   Background Color: The same primary red as the active tab.
        *   Text Color: White.
    *   **Enquiry Date & Time:**
        *   Text: "Enquired on 19 August 2025 at 09:08 am"
        *   Style: Small, regular weight, gray font. Positioned below the Enquiry ID.

*   **Card Body (Main Content):**

    *   **Total Amount Section:**
        *   Label: "Total Amount" (small, gray font).
        *   Amount: "₹4,432.5" (very large, bold, black font).
        *   Savings Info: "Saved ₹492.5 (HM10)" (medium size, green font, regular weight).

    *   **Delivery Address Section:**
        *   A light gray horizontal divider line separates this from the amount section.
        *   Label: "Delivery Address" (small, gray font).
        *   Address Text:
            *   Line 1: "870, Poonamallee High Rd, Near Hindustan Petrol Bunk, Kilpauk, Chennai, Tamil Nadu 600010" (regular size, bold, black font).
            *   Line 2: "Chennai, Tamil Nadu - 600010" (regular size, regular weight, gray font).

    *   **Payment Proofs Section:**
        *   A light gray horizontal divider line separates this from the address section.
        *   Label: "Payment Proofs (1)" (small, gray font).
        *   **Proof Item Container:**
            *   Background: Very light green (`#e9fbf0`).
            *   Padding: Appears to have internal padding.
            *   Border: Rounded corners.
            *   Content:
                *   **Icon:** A small document/image thumbnail icon on the left.
                *   **Text:** A green checkmark icon followed by the text "Payment proof 1" in a dark green font.

---
**General Style Notes:**
*   **Font:** Use a clean, sans-serif font like Inter, Poppins, or similar.
*   **Colors:**
    *   Primary Red: `#e53854` (for buttons and active states).
    *   Success Green: `#28a745` (for savings text, checkmarks, etc.).
    *   Warning/Pending Yellow: `#fff3cd` (background), `#e8a529` (text).
    *   Text: Black for primary text (`#000000`), shades of gray for secondary text/labels (`#6c757d`).
*   **Spacing:** Use consistent padding and margins throughout to create a clean, organized layout. The card has significant internal padding.
*   **Corners:** All interactive elements like buttons, badges, and cards have rounded corners for a modern, soft feel.


## 8. My Favorites

This document outlines the UI components and styling for the "My Favorites" page, which displays items a user has saved.

#### **1. Page Header**
*   **Main Title:**
    *   Text: "My Favorites"
    *   Style: Large, bold, black font (e.g., `font-weight: 700`).
*   **Subtitle:**
    *   Text: "Items you've saved for later"
    *   Style: Smaller, regular weight, gray font. Positioned directly below the main title.

#### **2. Summary Card**
A full-width informational card that summarizes the favorites list.
*   **Container:** A white card with rounded corners and a subtle drop shadow.
*   **Layout:** A single row with content aligned to the left and right edges.
*   **Left Content:**
    *   Label: "Total Favorites" (small, gray font).
    *   Value: "1 items" (large, bold, black font).
*   **Right Content:**
    *   Label: "Total Value" (small, gray font).
    *   Value: "₹160" (large, bold, black font).

#### **3. Favorite Item Card**
A card component for displaying an individual favorited product. This component would be repeated for each item in the favorites list.

*   **Container:** A vertical card with a white background, prominent rounded corners, and a distinct drop shadow.

*   **Image Section (Top):**
    *   **Product Image:** Fills the top portion of the card. The top corners of the image are rounded to match the card's border-radius.
    *   **Favorite (Like) Button:**
        *   Position: Overlays the image in the top-right corner.
        *   Shape: A circle.
        *   Background: White, with a slight drop shadow to lift it off the image.
        *   Icon: A solid red "heart" icon in the center.

*   **Details Section (Bottom):**
    *   This section is below the image and has internal padding.
    *   **Product Name:**
        *   Text: "Cylinder Bomb"
        *   Style: Medium-to-large size, bold, black font.
    *   **Product Category:**
        *   Text: "Bombs"
        *   Style: Smaller, regular weight, gray font.
    *   **Price:**
        *   Text: "₹160"
        *   Style: Large, bold, black font. Positioned below the category.

*   **Quantity Selector (Footer of the card):**
    *   A three-part control for adjusting item quantity.
    *   **Container:** Rectangular shape with rounded corners and a 1px light gray border.
    *   **Minus Button ('-'):** Left-most segment. Contains a minus symbol.
    *   **Quantity Display:** Center segment. Displays the current quantity (e.g., "1"). Separated by vertical gray lines from the buttons.
    *   **Plus Button ('+'):** Right-most segment. Contains a plus symbol.

---
**General Style Notes:**
*   **Font:** A clean, modern sans-serif font (e.g., Inter, Poppins).
*   **Colors:**
    *   Text: Black for primary text, gray for secondary text and labels.
    *   Accent: Red (`#ff0000` or similar) is used exclusively for the heart icon.
    *   Background: The page background is a very light gray (`#f8f9fa`), while all cards are pure white (`#ffffff`).
*   **Layout:** The design is minimalist with generous white space between elements.
*   **Shadows & Borders:** Cards use soft drop shadows to create depth. The quantity selector uses a light gray border.
*   **Corners:** Consistently rounded corners are used for all cards and buttons to give a soft, friendly appearance.