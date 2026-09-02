# DeccanRide

> Premium intercity cab booking and fleet-management web application for
> the Pune ↔ Mumbai corridor.

DeccanRide is a React/Vite web application built as a realistic premium
intercity cab platform. It provides a customer-facing website for
discovering routes and vehicles, submitting a cab reservation/enquiry,
and viewing service information, together with an authenticated
administration portal for managing enquiries, vehicles, and routes.

The application uses **React**, **React Router**, **Tailwind CSS**, and
**Supabase** for authentication and database operations.

------------------------------------------------------------------------

## Table of Contents

-   [Project Overview](#project-overview)
-   [What Is Actually Implemented](#what-is-actually-implemented)
-   [Key Features](#key-features)
-   [Application Architecture](#application-architecture)
-   [User Flow](#user-flow)
-   [Admin Flow](#admin-flow)
-   [Pages](#pages)
-   [Services and Data Layer](#services-and-data-layer)
-   [Database Integration](#database-integration)
-   [Authentication and Route
    Protection](#authentication-and-route-protection)
-   [Location System](#location-system)
-   [Vehicle System](#vehicle-system)
-   [Route System](#route-system)
-   [Booking / Enquiry System](#booking--enquiry-system)
-   [Theme System](#theme-system)
-   [Responsive UI](#responsive-ui)
-   [Project Structure](#project-structure)
-   [Environment Variables](#environment-variables)
-   [Local Setup](#local-setup)
-   [Available Routes](#available-routes)
-   [Admin Portal](#admin-portal)
-   [Functional Details](#functional-details)
-   [Error Handling](#error-handling)
-   [Current Scope and Limitations](#current-scope-and-limitations)
-   [Technology Stack](#technology-stack)
-   [Development Notes](#development-notes)
-   [Future Improvements](#future-improvements)
-   [Author](#author)

------------------------------------------------------------------------

## Project Overview

DeccanRide is designed around a simple intercity transportation use
case:

1.  A customer visits the website.
2.  The customer can understand the Pune ↔ Mumbai service.
3.  The customer can inspect available vehicle classes.
4.  The customer can inspect route-specific pricing and information.
5.  The customer fills out a reservation form.
6.  The form validates the submitted information.
7.  The reservation is stored in Supabase as an **enquiry** with status
    `new`.
8.  An administrator signs into the management portal.
9.  The administrator can view incoming enquiries and update their
    status.
10. The administrator can create, edit, and delete vehicles and
    create/edit/delete routes through the admin interface.

The project is therefore more than a static landing page: the
customer-facing pages are connected to a backend database through
Supabase, and the admin section provides database-backed management
functionality.

------------------------------------------------------------------------

# What Is Actually Implemented

The following functionality is implemented in the supplied codebase.

### Customer-facing functionality

-   Responsive landing page
-   Pune ↔ Mumbai service presentation
-   Pune-to-Mumbai route page
-   Mumbai-to-Pune route page
-   Dynamic route information loaded from Supabase
-   Dynamic vehicle/fleet information loaded from Supabase
-   Vehicle filtering by:
    -   Vehicle type
    -   Fuel type
-   Vehicle selection from the reservation form
-   Pickup and drop location selection
-   Pune and Mumbai service-location data
-   Location validation before submitting an enquiry
-   Name, phone and email validation
-   Future-date validation
-   Trip type selection:
    -   One Way
    -   Round Trip
-   Passenger count
-   Travel date
-   Optional travel time
-   Optional special requests / flight number
-   Reservation/enquiry submission to Supabase
-   Success and error feedback
-   Automatic form reset after successful submission
-   Dark/light theme
-   Persistent theme preference through `localStorage`
-   Responsive navigation
-   Customer-facing About page
-   Customer-facing Fleet page
-   Customer-facing Contact / reservation page

### Administration functionality

-   Supabase email/password authentication
-   Protected admin routes
-   Admin logout
-   Enquiry management
-   Enquiry status updates
-   Enquiry deletion
-   Vehicle management
-   Vehicle creation
-   Vehicle editing
-   Vehicle deletion
-   Route management
-   Route creation
-   Route editing
-   Route deletion
-   Admin sidebar navigation
-   Responsive admin layout
-   Admin theme toggle

------------------------------------------------------------------------

# Important Clarification

The project currently implements a **reservation/enquiry workflow**, not
a complete automated ride-booking marketplace.

When a customer submits the form, the application inserts an enquiry
into the Supabase `enquiries` table. It does not currently contain:

-   Online payment processing
-   Payment gateway integration
-   Automatic driver assignment
-   Driver application/portal
-   Live vehicle tracking
-   Customer accounts
-   Booking confirmation emails
-   SMS/WhatsApp notifications
-   A dispatch optimization system
-   A calendar scheduling engine
-   Real-time fleet location tracking

Therefore, the most technically accurate description is:

> **A Supabase-backed intercity cab reservation/enquiry platform with an
> authenticated administrative management portal.**

------------------------------------------------------------------------

# Key Features

## 1. Premium Customer Website

The customer-facing UI uses a monochrome, editorial visual style with:

-   Large typography
-   Black/white/gray visual system
-   Responsive layouts
-   Route-specific information
-   Fleet cards
-   Calls to action
-   Responsive navigation
-   Dark/light theme support

The home page uses `herobg.png` as its hero background and provides
direct navigation to reservation and information pages.

------------------------------------------------------------------------

## 2. Dynamic Fleet

Fleet information is not hardcoded into the Fleet page.

The Fleet page retrieves active vehicles from Supabase through
`getVehicles()`.

The query:

-   Reads from the `vehicles` table
-   Selects all fields
-   Restricts results to `status = active`
-   Orders vehicles by price ascending

This allows the administrator to change the fleet from the admin portal
and have the customer-facing fleet page consume the updated data.

------------------------------------------------------------------------

## 3. Dynamic Routes

The Pune-to-Mumbai and Mumbai-to-Pune pages retrieve route data from
Supabase using a route slug.

For example:

``` text
pune-to-mumbai
mumbai-to-pune
```

The route service queries the `routes` table and returns the matching
record.

The route page then renders values such as:

-   Origin
-   Destination
-   Distance
-   Travel time
-   One-way price
-   Round-trip price
-   Description

This means route pricing/specification data can be maintained from the
administration interface instead of being permanently hardcoded in the
route page.

------------------------------------------------------------------------

## 4. Reservation / Enquiry Form

The Contact page acts as the customer reservation interface.

The form collects:

-   Full name
-   Phone number
-   Email
-   Pickup location
-   Drop location
-   Travel date
-   Travel time
-   Trip type
-   Vehicle class
-   Passenger count
-   Special requests / flight number

The form performs client-side validation before sending the enquiry.

------------------------------------------------------------------------

## 5. Admin Portal

The administration portal provides three primary management areas:

``` text
Enquiries
Vehicles
Routes
```

The admin interface communicates directly with Supabase through the
service layer and selected admin components.

------------------------------------------------------------------------

# Application Architecture

The application follows a simple React frontend + Supabase backend
architecture.

``` text
                    ┌───────────────────────┐
                    │       Browser         │
                    │    React / Vite UI    │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │   React Router        │
                    │  Public + Admin       │
                    │       Routes          │
                    └───────────┬───────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
      ┌───────▼────────┐                 ┌────────▼─────────┐
      │ Customer Pages │                 │   Admin Pages    │
      │                │                 │                  │
      │ Home           │                 │ Enquiries        │
      │ Fleet          │                 │ Vehicles         │
      │ Routes         │                 │ Routes           │
      │ About          │                 │                  │
      │ Contact        │                 │                  │
      └───────┬────────┘                 └────────┬─────────┘
              │                                   │
              └─────────────────┬─────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │      Service Layer    │
                    │                       │
                    │ authService           │
                    │ enquiryService        │
                    │ routeService          │
                    │ vehicleService        │
                    │ locationService        │
                    │ vehicleUtils           │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │       Supabase        │
                    │                       │
                    │ Authentication        │
                    │ routes                │
                    │ vehicles              │
                    │ enquiries             │
                    └───────────────────────┘
```

------------------------------------------------------------------------

# User Flow

## Customer Reservation Flow

``` text
Home
  │
  ├── Reserve Ride
  │
  ▼
Contact / Booking Form
  │
  ├── Enter customer details
  ├── Select pickup
  ├── Select drop
  ├── Select date/time
  ├── Select trip type
  ├── Select vehicle
  └── Enter passenger count
          │
          ▼
      Validation
          │
     ┌────┴─────┐
     │          │
   Invalid     Valid
     │          │
     ▼          ▼
   Error      Supabase
   Message    Insert
                 │
                 ▼
             New Enquiry
                 │
                 ▼
          Success Message
```

------------------------------------------------------------------------

# Admin Flow

``` text
/admin/login
       │
       ▼
Supabase Authentication
       │
   ┌───┴────┐
   │        │
Failed    Success
   │        │
   ▼        ▼
 Error   /admin/enquiries
             │
     ┌───────┼────────┐
     │       │        │
 Enquiries Vehicles Routes
     │       │        │
     ▼       ▼        ▼
   View    CRUD      CRUD
   Update
   Delete
```

------------------------------------------------------------------------

# Pages

## Home.jsx

The homepage is the primary marketing and navigation page.

### Implemented sections

-   Hero section
-   DeccanRide branding
-   Pune ↔ Mumbai executive service statement
-   Primary reservation CTA
-   About/standards CTA
-   Pune → Mumbai route card
-   Mumbai → Pune route card
-   Route information
-   Customer testimonials
-   Reservation CTA

The route cards currently contain presentation content and link users to
`/contact`.

The hero background is loaded from:

``` text
/public/herobg.png
```

------------------------------------------------------------------------

## About.jsx

The About page is a static brand/story page.

### Sections

-   Brand introduction
-   Mission
-   Vision
-   Origin story
-   Core standards
-   Reliability
-   Safety
-   Flat pricing
-   Human-first support
-   Brand metrics
-   Reservation CTA

The displayed metrics such as:

``` text
5,000+ Journeys Completed
50+ Premium Vehicles
100k+ Safe Kilometers
4.8 / 5 Customer Rating
```

are currently **presentation content in the component**, not dynamically
calculated from the database.

------------------------------------------------------------------------

## Fleet.jsx

The Fleet page is database-backed.

On mount:

``` text
getVehicles()
```

is called.

Only active vehicles are returned by the vehicle service.

Each vehicle card can display:

-   Vehicle type
-   Vehicle name
-   Price
-   Description
-   Seating capacity
-   Fuel type
-   Transmission
-   Luggage capacity

### Filters

The page dynamically derives available:

-   Vehicle types
-   Fuel types

from the retrieved vehicle dataset.

The user can filter the visible fleet by:

``` text
Type
Fuel
```

The filtering is performed locally in React.

If no vehicles match, the page displays an empty state and provides a
reset option.

------------------------------------------------------------------------

## Contact.jsx

This is the main reservation/enquiry page.

### Data loading

When the page loads:

``` text
getVehicles()
```

retrieves active vehicles so that the user can choose a vehicle class.

### Form fields

``` text
Full Name
Phone Number
Email Address
Pickup Location
Drop Location
Travel Date
Travel Time
Trip Type
Vehicle Class
Passengers
Special Requests / Flight Number
```

### Validation

The form checks:

1.  Required fields
2.  Phone format
3.  Email format
4.  Pickup location validity
5.  Drop location validity
6.  Travel date is not in the past

After validation, the selected vehicle ID and passenger count are
converted to integers before submission.

### Submission

The page calls:

``` text
submitEnquiry()
```

which inserts the reservation into Supabase.

The inserted enquiry receives:

``` text
status = "new"
```

After a successful submission:

-   Success message is displayed
-   Form is cleared
-   Success message is automatically removed after 5 seconds

------------------------------------------------------------------------

## PuneToMumbai.jsx

Route-specific page for:

``` text
Pune → Mumbai
```

The page loads:

``` text
getRouteBySlug("pune-to-mumbai")
```

and renders database values.

### Displays

-   Route origin
-   Route destination
-   Distance
-   Travel time
-   Availability presentation
-   Route description
-   One-way price
-   Round-trip price
-   Included features
-   Highlights
-   FAQ
-   Booking CTA

If the database request is still loading, a loading state is displayed.

If no route is returned, the page displays:

``` text
Route specification not found.
```

------------------------------------------------------------------------

## MumbaiToPune.jsx

The reverse corridor follows the same architecture.

It loads:

``` text
getRouteBySlug("mumbai-to-pune")
```

and displays the returned route information.

It includes:

-   Route specifications
-   One-way price
-   Round-trip price
-   Airport pickup information
-   Timings information
-   Fixed billing information
-   FAQ
-   Booking CTA

------------------------------------------------------------------------

## AdminLogin.jsx

The admin login page provides:

-   Email input
-   Password input
-   Client-side email validation
-   Loading state
-   Authentication error display
-   Supabase authentication
-   Redirect after successful authentication

Successful login redirects to:

``` text
/admin/enquiries
```

The form calls:

``` text
adminLogin(email, password)
```

which uses Supabase Auth's email/password sign-in.

------------------------------------------------------------------------

# Services and Data Layer

The service layer separates database/authentication operations from page
components.

------------------------------------------------------------------------

## authService.js

Responsible for authentication operations.

### `adminLogin(email, password)`

Uses Supabase:

``` text
supabase.auth.signInWithPassword()
```

Returns a structured result containing:

-   `success`
-   `user`
-   `session`

or an error.

### `adminLogout()`

Uses:

``` text
supabase.auth.signOut()
```

### `getCurrentUser()`

Uses:

``` text
supabase.auth.getUser()
```

and returns the current authenticated user or `null`.

### `isAuthenticated()`

Calls `getCurrentUser()` and returns:

``` text
true / false
```

### `getSession()`

Retrieves the current Supabase session.

### `onAuthStateChange(callback)`

Subscribes to Supabase authentication state changes and returns an
unsubscribe function.

------------------------------------------------------------------------

## enquiryService.js

Handles reservation enquiries.

### `submitEnquiry(enquiryData)`

Inserts a record into:

``` text
enquiries
```

Fields submitted include:

``` text
name
phone
email
pickup
drop
travel_date
travel_time
trip_type
vehicle_id
passengers
message
status
```

The service explicitly sets:

``` text
status = "new"
```

### `getEnquiries()`

Reads all enquiries and orders them by:

``` text
created_at DESC
```

This allows the newest enquiries to appear first in the admin portal.

------------------------------------------------------------------------

## locationService.js

Provides location searching against the predefined service location
dataset.

### `searchLocations(query)`

Behavior:

-   Returns no results if the query has fewer than 2 characters.
-   Converts the search term to lowercase.
-   Searches location names.
-   Searches configured aliases.
-   Returns simplified objects containing:

``` text
id
label
value
```

------------------------------------------------------------------------

## routeService.js

Handles route database operations.

### `getRouteBySlug(slug)`

Retrieves one route using its slug.

### `getAllRoutes()`

Retrieves all route records.

### `updateRoute(routeId, updates)`

Updates the selected route record.

------------------------------------------------------------------------

## vehicleService.js

Handles vehicle database operations.

### `getVehicles()`

Retrieves active vehicles ordered by price.

``` text
status = active
ORDER BY price ASC
```

### `getVehicleById(vehicleId)`

Retrieves one vehicle.

### `getVehiclesByFilter(filters)`

Supports database-level filtering by:

``` text
vehicleType
fuelType
transmission
maxPrice
minSeats
```

Results are ordered by price ascending.

### `updateVehicle(vehicleId, updates)`

Updates vehicle information.

### `createVehicle(vehicleData)`

Creates a vehicle.

### `deleteVehicle(vehicleId)`

Deletes a vehicle.

------------------------------------------------------------------------

## vehicleUtils.js

Contains reusable presentation/helper functions.

### `getVehicleTypeInfo()`

Supports:

-   Sedan
-   MUV
-   Group Transport

and returns descriptive metadata.

### `getFuelTypeInfo()`

Supports:

-   CNG
-   Petrol
-   Diesel

and provides descriptive fuel information.

### `getTransmissionInfo()`

Supports:

-   Manual
-   Automatic

### `categorizeVehicles()`

Separates a vehicle array into:

``` text
sedans
muvs
groups
```

### `getPricingComparison()`

Calculates:

``` text
minimum price
maximum price
average price
```

### `getVehicleDisplayName()`

Formats a vehicle as:

``` text
Vehicle Name • X seats
```

### `getUseCases()`

Converts a comma-separated `suitable_for` string into an array.

------------------------------------------------------------------------

# Database Integration

The Supabase client is initialized in:

``` text
src/services/supabase.js
```

The application reads the Supabase URL and anonymous key from Vite
environment variables:

``` text
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
```

The client is created using:

``` text
createClient(supabaseUrl, supabaseAnonKey)
```

------------------------------------------------------------------------

# Expected Database Tables

Based on the application code, the following Supabase tables are
expected.

## `vehicles`

The application reads/writes fields including:

``` text
id
name
slug
vehicle_type
fuel_type
transmission
seating_capacity
price
luggage_capacity
description
suitable_for
air_conditioned
status
image
```

The exact SQL schema, constraints, indexes, and RLS policies are **not
included in the supplied source files**, so they should not be assumed
from this README.

------------------------------------------------------------------------

## `routes`

The application expects fields including:

``` text
id
name
slug
origin
destination
distance
travel_time
one_way_price
round_trip_price
description
status
```

Again, the exact database schema and policies should be documented
separately if a Supabase SQL/schema file is added to the repository.

------------------------------------------------------------------------

## `enquiries`

The reservation form submits fields including:

``` text
name
phone
email
pickup
drop
travel_date
travel_time
trip_type
vehicle_id
passengers
message
status
```

The enquiry listing also expects:

``` text
created_at
```

because enquiries are ordered by creation time.

------------------------------------------------------------------------

# Authentication and Route Protection

Admin routes are protected through the `ProtectedRoute` component.

The application checks:

``` text
getCurrentUser()
```

before rendering protected content.

### Unauthenticated flow

``` text
User visits /admin/enquiries
          │
          ▼
ProtectedRoute
          │
          ▼
Check Supabase user
          │
      ┌───┴────┐
      │        │
    User     No User
      │        │
      ▼        ▼
 Render     Redirect
 Admin      /admin/login
```

The protection implemented in React is a client-side navigation guard.

**Important:** actual database authorization should also be enforced
using Supabase Row Level Security policies. The supplied frontend code
does not contain the database RLS policy definitions, so this README
does not claim specific RLS rules.

------------------------------------------------------------------------

# Location System

The project contains two related location datasets.

## `locations.js`

Contains:

-   Pune locations
-   Mumbai locations
-   Combined location list
-   Search helpers
-   Validation helpers
-   Location lookup helpers

The dataset contains approximately 25 Pune entries and 25 Mumbai
entries.

Examples include:

``` text
Pune Railway Station
Shivajinagar
Swargate
Pune Airport
Viman Nagar
Koregaon Park
Kharadi
Hadapsar
Hinjewadi
Wakad
Baner
Aundh
```

and Mumbai-side locations such as:

``` text
Mumbai Airport (CSMI)
Andheri
Bandra
Powai
Thane
Vashi
Navi Mumbai
Panvel
Borivali
Worli
Lower Parel
BKC
Churchgate
CST
```

------------------------------------------------------------------------

## `serviceLocations.js`

Provides a smaller service-oriented location dataset with aliases.

The location service searches both:

``` text
location name
```

and:

``` text
aliases
```

This supports more flexible user searches.

------------------------------------------------------------------------

# Location Validation

The Contact page does not simply accept arbitrary text for pickup/drop.

Before submission it calls:

``` text
isValidLocation(formData.pickup)
isValidLocation(formData.drop)
```

Invalid locations stop submission and produce an error message.

This provides a basic allow-list approach to serviceable locations.

------------------------------------------------------------------------

# Vehicle System

Vehicle information is database-driven.

## Customer side

The Fleet page reads active vehicles.

The Contact page also reads active vehicles and uses them as reservation
choices.

## Admin side

The administrator can:

``` text
Create vehicle
Edit vehicle
Delete vehicle
```

Vehicle information includes:

-   Name
-   Slug
-   Type
-   Fuel
-   Transmission
-   Seating capacity
-   Price
-   Luggage capacity
-   Description
-   Suitable-for information
-   AC status
-   Active/inactive status
-   Image field

------------------------------------------------------------------------

# Vehicle Filtering

The Fleet page creates filter options dynamically from the actual
retrieved dataset.

For example:

``` text
All Vehicles
Sedan
MUV
Group Transport
```

and:

``` text
All Fuel Types
CNG
Petrol
Diesel
```

The visible list is then filtered locally.

The service layer also contains a more general database-level filtering
function that supports:

``` text
vehicleType
fuelType
transmission
maxPrice
minSeats
```

The current Fleet page primarily uses its own local type/fuel filtering.

------------------------------------------------------------------------

# Route System

Routes are represented using database records.

A route can contain:

``` text
Name
Slug
Origin
Destination
Distance
Travel Time
One-Way Price
Round-Trip Price
Description
Status
```

Route pages use the slug to identify the route.

Example:

``` text
/pune-to-mumbai-cab
        ↓
getRouteBySlug("pune-to-mumbai")
        ↓
routes table
        ↓
route record
        ↓
render specifications and prices
```

The reverse route follows the same architecture.

------------------------------------------------------------------------

# Booking / Enquiry System

The reservation flow is deliberately simple.

There is no payment step.

There is no customer login.

There is no automatic confirmation workflow.

The process is:

``` text
Customer submits reservation
            ↓
Frontend validation
            ↓
submitEnquiry()
            ↓
Supabase `enquiries`
            ↓
status = "new"
            ↓
Admin sees enquiry
            ↓
Admin changes status
```

The status values used by the admin UI are:

``` text
new
contacted
confirmed
closed
```

------------------------------------------------------------------------

# Admin Enquiry Management

The Enquiry Manager retrieves enquiries using:

``` text
getEnquiries()
```

The interface presents enquiry information including:

-   Customer
-   Contact
-   Route
-   Travel date
-   Passenger count
-   Status

It also provides status management.

### Status update

The admin can change the enquiry status.

The update is sent to:

``` text
enquiries
```

and the local React state is updated after success.

### Delete

Deleting an enquiry requires browser confirmation.

After confirmation:

``` text
DELETE FROM enquiries
WHERE id = selected_id
```

The removed enquiry is also removed from the local UI state.

### Status summary

The admin page calculates counts for:

``` text
New
Contacted
Confirmed
Closed
```

------------------------------------------------------------------------

# Admin Vehicle Management

The Vehicle Manager supports:

## Create

The admin provides vehicle details and submits them through:

``` text
createVehicle()
```

Numeric values such as:

``` text
price
seating_capacity
```

are converted to numbers before submission.

## Edit

The admin can edit selected fields such as:

``` text
name
price
fuel_type
transmission
seating_capacity
luggage_capacity
description
```

The changes are sent through:

``` text
updateVehicle()
```

## Delete

The administrator can delete a vehicle after confirmation.

------------------------------------------------------------------------

# Admin Route Management

The Route Manager supports:

## Create

The administrator provides:

``` text
name
origin
destination
distance
travel_time
one_way_price
round_trip_price
description
status
```

The application generates a slug from:

``` text
origin-to-destination
```

For example:

``` text
Pune → Mumbai
```

becomes:

``` text
pune-to-mumbai
```

## Edit

Route editing supports:

``` text
one_way_price
round_trip_price
distance
travel_time
description
```

## Delete

Routes can be deleted after browser confirmation.

------------------------------------------------------------------------

# Theme System

The project includes a reusable theme context.

The theme state is stored using:

``` text
localStorage
```

with the key:

``` text
deccan_theme
```

The default theme is:

``` text
dark
```

The ThemeContext adds/removes the:

``` text
.dark
```

class on the document root.

The selected theme is persisted so that it survives page reloads.

------------------------------------------------------------------------

# Responsive UI

The UI is implemented with responsive Tailwind utility classes.

The customer pages adapt across:

``` text
mobile
tablet
desktop
```

The header uses:

-   Desktop navigation
-   Mobile navigation
-   Mobile menu toggle

The admin layout also changes behavior for smaller screens, using a
responsive sidebar/navigation approach.

------------------------------------------------------------------------

# Project Structure

``` text
DeccanRide/
│
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
│
├── public/
│   ├── herobg.png
│   ├── home.png
│   └── logo.png
│
└── src/
    │
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    │
    ├── admin/
    │   ├── AdminLayout.jsx
    │   ├── EnquiryManager.jsx
    │   ├── RouteManager.jsx
    │   └── VehicleManager.jsx
    │
    ├── components/
    │   ├── Footer.jsx
    │   ├── Header.jsx
    │   ├── LocationInput.jsx
    │   ├── ProtectedRoute.jsx
    │   └── ThemeToggle.jsx
    │
    ├── context/
    │   └── ThemeContext.jsx
    │
    ├── data/
    │   ├── locations.js
    │   └── serviceLocations.js
    │
    ├── pages/
    │   ├── About.jsx
    │   ├── AdminLogin.jsx
    │   ├── Contact.jsx
    │   ├── Fleet.jsx
    │   ├── Home.jsx
    │   ├── MumbaiToPune.jsx
    │   └── PuneToMumbai.jsx
    │
    └── services/
        ├── authService.js
        ├── enquiryService.js
        ├── locationService.js
        ├── routeService.js
        ├── supabase.js
        ├── vehicleService.js
        └── vehicleUtils.js
```

------------------------------------------------------------------------

# Environment Variables

Create a `.env` file in the project root.

``` env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These values are consumed by:

``` text
src/services/supabase.js
```

Do not commit private credentials or secret keys.

The application specifically uses the Supabase anonymous client key on
the frontend.

------------------------------------------------------------------------

# Local Setup

## 1. Clone the repository

``` bash
git clone <your-repository-url>
cd DeccanRide
```

## 2. Install dependencies

``` bash
npm install
```

## 3. Configure environment variables

Create:

``` text
.env
```

and add:

``` env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Start the development server

``` bash
npm run dev
```

Vite will start the development server and provide the local URL.

## 5. Build for production

``` bash
npm run build
```

## 6. Preview the production build

``` bash
npm run preview
```

The exact available npm scripts should be confirmed against the
repository's `package.json`.

------------------------------------------------------------------------

# Available Routes

## Public

  Route                   Page           Purpose
  ----------------------- -------------- ---------------------------
  `/`                     Home           Main landing page
  `/pune-to-mumbai-cab`   PuneToMumbai   Pune → Mumbai route
  `/mumbai-to-pune-cab`   MumbaiToPune   Mumbai → Pune route
  `/fleet`                Fleet          Available vehicles
  `/about`                About          Company/brand information
  `/contact`              Contact        Reservation/enquiry form

## Admin

  Route                Page             Protection
  -------------------- ---------------- ------------
  `/admin/login`       AdminLogin       Public
  `/admin/enquiries`   EnquiryManager   Protected
  `/admin/vehicles`    VehicleManager   Protected
  `/admin/routes`      RouteManager     Protected

------------------------------------------------------------------------

# Admin Portal

The admin portal is organized around operational management.

``` text
Admin Portal
│
├── Enquiries
│   ├── View enquiries
│   ├── Change status
│   └── Delete enquiry
│
├── Vehicles
│   ├── View active vehicles
│   ├── Create vehicle
│   ├── Edit vehicle
│   └── Delete vehicle
│
└── Routes
    ├── View routes
    ├── Create route
    ├── Edit route
    └── Delete route
```

The admin layout also provides:

-   Brand/navigation
-   Theme toggle
-   Logout
-   Responsive navigation
-   Administrator identity display

------------------------------------------------------------------------

# Functional Details

## Data Loading

The application generally follows this React pattern:

``` text
Component mounts
      ↓
useEffect()
      ↓
Service function
      ↓
Supabase query
      ↓
Response
      ↓
React state
      ↓
UI render
```

For example, Fleet:

``` text
Fleet.jsx
   ↓
getVehicles()
   ↓
Supabase vehicles table
   ↓
setVehicles()
   ↓
Fleet cards
```

------------------------------------------------------------------------

## Reservation Submission

``` text
Contact.jsx
   ↓
handleSubmit()
   ↓
Required field validation
   ↓
Phone validation
   ↓
Email validation
   ↓
Location validation
   ↓
Date validation
   ↓
Type conversion
   ↓
submitEnquiry()
   ↓
Supabase enquiries table
```

------------------------------------------------------------------------

## Route Retrieval

``` text
PuneToMumbai.jsx
   ↓
getRouteBySlug("pune-to-mumbai")
   ↓
routes table
   ↓
route object
   ↓
UI
```

------------------------------------------------------------------------

## Vehicle Retrieval

``` text
Fleet.jsx
   ↓
getVehicles()
   ↓
vehicles table
   ↓
active vehicles
   ↓
price ascending
   ↓
UI
```

------------------------------------------------------------------------

## Admin Vehicle Update

``` text
VehicleManager
   ↓
Edit
   ↓
saveEdit()
   ↓
updateVehicle()
   ↓
Supabase UPDATE
   ↓
local React state update
   ↓
UI refresh
```

------------------------------------------------------------------------

## Admin Route Update

``` text
RouteManager
   ↓
Edit
   ↓
saveEdit()
   ↓
updateRoute()
   ↓
Supabase UPDATE
   ↓
local React state update
   ↓
UI refresh
```

------------------------------------------------------------------------

# Error Handling

The service functions use `try/catch` and return fallback values.

Examples:

### Vehicle fetch

On error:

``` text
[]
```

is returned.

### Route fetch

On error:

``` text
null
```

is returned.

### Authentication

Errors are returned as:

``` text
{
  success: false,
  error: ...
}
```

### Enquiry submission

Returns:

``` text
{
  success: true
}
```

or:

``` text
{
  success: false,
  error: ...
}
```

This allows the UI to display appropriate feedback.

------------------------------------------------------------------------

# Current Scope and Limitations

This section is intentionally explicit so the README does not overstate
what the code actually implements.

## Implemented

-   React frontend
-   Vite project structure
-   React Router navigation
-   Supabase integration
-   Supabase Auth
-   Protected admin routes
-   Database-backed vehicles
-   Database-backed routes
-   Database-backed enquiries
-   Customer reservation form
-   Client-side validation
-   Location allow-list validation
-   Fleet filtering
-   Admin CRUD operations
-   Persistent theme
-   Responsive UI

## Not implemented in the supplied code

### Payments

No payment gateway is integrated.

The route page contains payment-method text, but there is no payment API
or transaction workflow in the source code.

### Real-time flight tracking

Some route-page copy describes flight tracking/adjustment, but the
supplied React/services code does not contain a flight-tracking API
integration.

Therefore, flight tracking should be considered **marketing/content text
rather than an implemented software integration**.

### Automated booking confirmation

The reservation form only inserts an enquiry.

There is no email/SMS/WhatsApp confirmation service in the supplied
source.

### Driver assignment

There is no driver database/workflow or automatic assignment logic in
the supplied source.

### Live GPS tracking

There is no live location/GPS tracking implementation.

### Customer authentication

Customers do not create accounts or log in.

Authentication is used for the admin portal.

### Online cancellation workflow

Some route-page FAQ copy discusses cancellation, but there is no
customer cancellation API/workflow in the supplied source.

### Dynamic homepage analytics

The About page metrics are static presentation values and are not
calculated from the Supabase database.

### Dynamic testimonials

Homepage testimonials are static JSX content rather than database-backed
reviews.

### Database schema

The frontend expects `vehicles`, `routes`, and `enquiries` tables, but
the SQL schema and RLS policies were not included in the supplied
codebase.

------------------------------------------------------------------------

# Technology Stack

  Technology     Usage
  -------------- -------------------------------------
  React          Component-based frontend
  Vite           Development/build tooling
  React Router   Client-side routing
  Tailwind CSS   Styling and responsive UI
  Supabase       Backend database and authentication
  JavaScript     Application logic
  CSS            Theme variables and Tailwind setup
  LocalStorage   Theme preference persistence

------------------------------------------------------------------------

# Why Supabase Is Used

Supabase provides two major backend capabilities used by this project:

## Authentication

Used for administrator login/logout and session checking.

## Database

Used for:

``` text
vehicles
routes
enquiries
```

This allows the website to have persistent application data without a
custom Node/Express backend.

------------------------------------------------------------------------

# Separation of Responsibilities

The project uses a relatively clear separation:

``` text
Pages
  ↓
User interaction + UI

Components
  ↓
Reusable interface elements

Services
  ↓
Supabase operations / business helpers

Data
  ↓
Static location datasets

Context
  ↓
Global theme state

Admin
  ↓
Operational management interface
```

This structure makes it easier to replace or extend individual parts
later.

------------------------------------------------------------------------

# Development Notes

## Client-side validation

Validation currently happens in the React frontend.

This improves user experience but should not be considered a replacement
for backend/database validation.

For a production system, important constraints should also be enforced
at the database/API layer.

------------------------------------------------------------------------

## Authentication

`ProtectedRoute` prevents unauthenticated users from accessing admin UI
routes.

However, frontend route protection should not be the only security
mechanism.

Supabase Row Level Security should be configured appropriately for
production database authorization.

------------------------------------------------------------------------

## Error fallback behavior

Several service functions return empty arrays or `null` when database
requests fail.

This prevents many API failures from immediately crashing the UI, but it
can also make a database failure appear similar to "no data".

A future version could expose more precise error states.

------------------------------------------------------------------------

# Future Improvements

Potential future enhancements include:

## Booking

-   Booking IDs
-   Booking confirmation
-   Customer accounts
-   Cancellation workflow
-   Booking history
-   Automated email confirmations
-   WhatsApp notifications
-   SMS notifications

## Payments

-   Razorpay/Stripe integration
-   Payment status
-   Online invoices
-   Refund workflow

## Operations

-   Driver management
-   Driver assignment
-   Vehicle availability calendar
-   Dispatch dashboard
-   Trip status
-   Driver contact details

## Tracking

-   Live GPS tracking
-   Driver location
-   Customer trip tracking

## Airport Services

-   Real flight-status API
-   Automatic delay handling
-   Arrival monitoring
-   Terminal-specific pickup workflow

## Admin

-   Dashboard analytics
-   Revenue metrics
-   Booking statistics
-   Search and pagination
-   Advanced enquiry filters
-   Export to CSV/PDF
-   Role-based administration

## Backend

-   Server-side validation
-   Stronger database constraints
-   RLS policies
-   Database indexes
-   API abstraction
-   Audit logging

------------------------------------------------------------------------

# Production Readiness Checklist

Before treating the project as a production transportation platform,
consider adding:

-   [ ] Supabase RLS policies
-   [ ] Server/database-side validation
-   [ ] Secure admin authorization model
-   [ ] Payment integration
-   [ ] Booking confirmation system
-   [ ] Notification system
-   [ ] Driver management
-   [ ] Vehicle availability management
-   [ ] Cancellation/refund workflow
-   [ ] Flight tracking integration
-   [ ] Monitoring/logging
-   [ ] Analytics
-   [ ] Automated tests
-   [ ] Accessibility audit
-   [ ] Production environment configuration
-   [ ] Privacy policy
-   [ ] Terms of service
-   [ ] Error monitoring

------------------------------------------------------------------------

# Summary

DeccanRide currently provides a complete frontend experience for a
premium Pune ↔ Mumbai intercity cab service, backed by Supabase.

The core implemented workflow is:

``` text
                 DECCANRIDE
                     │
       ┌─────────────┴─────────────┐
       │                           │
   CUSTOMER                     ADMIN
       │                           │
       ▼                           ▼
   Browse Site                Login
       │                           │
       ├── Routes                 │
       ├── Fleet                  ├── Enquiries
       ├── About                  ├── Vehicles
       └── Contact                └── Routes
             │
             ▼
       Reservation Form
             │
             ▼
          Validate
             │
             ▼
        Supabase DB
             │
             ▼
       New Enquiry
             │
             ▼
      Admin Processes
```

The project demonstrates:

-   Component-based React development
-   Client-side routing
-   State management with React hooks
-   Reusable components
-   Service-layer architecture
-   Supabase database integration
-   Authentication
-   Protected routes
-   CRUD operations
-   Form validation
-   Dynamic data rendering
-   Responsive UI design
-   Persistent theme state

------------------------------------------------------------------------

# Author

**Sushil Jadhav**

DeccanRide is a fictional/project implementation created as a realistic
premium intercity mobility platform.

------------------------------------------------------------------------

## Project Status

**Status:** Functional prototype / portfolio-ready full-stack frontend
application

**Primary corridor:** Pune ↔ Mumbai

**Frontend:** React + Vite

**Backend services:** Supabase

**Authentication:** Supabase Auth

**Database operations:** Supabase PostgREST client

**Styling:** Tailwind CSS
