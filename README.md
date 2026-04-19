# Tourism Platform

A tourism web system project developed as part of my personal portfolio, showcasing a complete website solution with trip management.

### go to [website]()

---

## System Overview

The system is divided into two main parts:

### 🔹 Client Side (User Interface)

A complete front-facing website designed for travel agencies, including:

- Home Page
- About Us
- Trips
  - All Trips
  - Trip Types
- Destinations
- Blog
- Tailor Made Requests
- Contact Us

**Features:**

- Browse trips and destinations
- Send booking requests
- Contact the agency directly
- Responsive and user-friendly design

---

### 🔹 Admin Side (Dashboard)

A simple admin panel to manage core system data:

- Dashboard Overview
- Trips Management
- Add / Edit Trips
- Booking Requests (from users)

**Features:**

- View incoming booking requests
- Manage trips data
- Secure login using environment variables
- Connected with Supabase for real-time data

---

**HAVE FUN 👌**
**Thanks, Abdelrahman Atef**

## 1. Clone Template

- Clone the main repository
- Rename project folder

```bash
npm install
```

- Running the Project

```bash
npm run dev
```

## 2. Setup Environment Variables

- Create .env.local
- Same: `.env.local.example`

## 3. Configure Client Data

- Update agency file
- File Location: `data/agency.json`

## 4. Configure Static Data

- Check destinations file
- File Location: `data/destinations.json`
- Chek trip types file
- File Location: `data/trip-types.json`

## 5. Connect Supabase

- Create new Supabase project
- Add tables:
  - trips
  - requests
- Connect keys to frontend

## 6. Setup Forms

- Connect:
  - Contact form → [Resend](https://resend.com) (mail)
  - Booking requests → [Supabase](https://supabase.com) (dashboard)

## 7. Setup reCAPTCHA

- Create new reCAPTCHA keys
- Add to project (.env.local)

## 8. Test System

- Contact form (mail)
- Booking request (dashboard)
- Admin login (dashboard)
- Trips display (clint side)

## 9. Push to GitHub

- Create new repo under Launchy
- Push code

## 10. Deploy

- Deploy on Vercel
- Connect domain

## 11. Final Check

- SEO basics
- Mobile responsiveness
- Performance
