# BarberBook — Frontend

> Modern appointment booking web app built with Angular 21. Features a beautiful dark UI, JWT authentication, user booking history, and a full admin dashboard.

## Tech Stack

- **Angular 21** — standalone components, new control flow (`@if` / `@for`)
- **TypeScript** — strict typing throughout
- **RxJS** — reactive HTTP with observables
- **Angular Router** — lazy-loaded routes with auth guards
- **CSS** — custom dark theme with purple gradients, fully responsive

## Features

- **Authentication** — login, register, JWT stored in localStorage
- **Booking Form** — request appointments with service selection & date/time picker
- **My Appointments** — personal booking history with status badges
- **Admin Dashboard** — view all bookings, confirm or cancel, delete entries
- **Role-based routing** — guards redirect users and admins to correct pages
- **Responsive design** — single viewport layout on desktop, mobile-friendly
- **No-scroll UI** — full page fits in viewport on desktop (`height: 100vh`)

## Screenshots

| Login | Booking Form | Admin Dashboard |
|-------|-------------|-----------------|
| Split-screen dark UI | Hero + form layout | Sidebar stats + table |

## Getting Started

### Prerequisites

- Node.js 18+
- Angular CLI 21

```bash
npm install -g @angular/cli
```

### Install & Run

```bash
npm install
ng serve
```

App runs at `http://localhost:4200`.

> Make sure the [backend](https://github.com/sebxstixn15/barberbook-backend) is running on `http://localhost:8080`.

## Project Structure

```
src/app/
├── components/
│   ├── admin/           # Admin dashboard
│   ├── booking-form/    # Appointment booking page
│   ├── login/           # Login page
│   ├── my-bookings/     # User appointment history
│   └── register/        # Registration page
├── guards/              # Auth & admin route guards
├── models/              # TypeScript interfaces
├── pipes/               # StatusCount pipe
└── services/            # Auth & Booking HTTP services
```

## Routes

| Path | Component | Guard |
|------|-----------|-------|
| `/login` | LoginComponent | — |
| `/register` | RegisterComponent | — |
| `/book` | BookingFormComponent | — |
| `/my-bookings` | MyBookingsComponent | authGuard |
| `/admin` | AdminComponent | adminGuard |

## Related

- **Backend:** [barberbook-backend](https://github.com/sebxstixn15/barberbook-backend)
