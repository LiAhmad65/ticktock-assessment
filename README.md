# TickTock Assessment - Timesheet Management Application

A Next.js-based timesheet management application that allows users to track time entries, manage projects, and view weekly timesheets.

## Setup Instructions

### Prerequisites

- Node.js 18+ (or compatible version)
- Yarn package manager (or npm/pnpm)

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd ticktock-assessment
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```
   Or if using npm:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   
   Create a `.env.local` file in the root directory with the following variable:
   ```env
   NEXTAUTH_SECRET=your-secret-key-here
   ```
   
   You can generate a secure secret using:
   ```bash
   openssl rand -base64 32
   ```
   
   Or use any random string for development purposes.

4. **Run the development server**:
   ```bash
   yarn dev
   ```
   Or:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
yarn build
yarn start
```

## Frameworks & Libraries Used

### Core Framework
- **Next.js 14.2.35** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5** - Type safety

### Authentication
- **NextAuth.js 4.24.13** - Authentication and session management

### Styling
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### UI/UX
- **react-hot-toast 2.6.0** - Toast notifications

### Development Tools
- **ESLint** - Code linting
- **ESLint Config Next** - Next.js ESLint configuration

## Project Structure

```
ticktock-assessment/
├── app/                          # Next.js App Router
│   ├── (authenticated)/         # Protected routes
│   │   └── timesheets/          # Timesheets pages
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── projects/            # Project management
│   │   ├── time-entries/        # Time entry CRUD operations
│   │   └── timesheets/          # Timesheet management
│   └── login/                   # Login page
├── components/                   # React components
│   ├── timesheets/              # Timesheet-specific components
│   └── WeekTimeSheetPage/       # Weekly timesheet components
├── services/                     # API service layer
├── types/                        # TypeScript type definitions
└── utils/                        # Utility functions and constants
```

## Assumptions & Notes

### Authentication
- **Mock Authentication**: The application currently uses a mock authentication system with hardcoded credentials. The mock user is defined in `app/api/auth/authOptions.ts`.
  - For production, this should be replaced with a proper database-backed authentication system.
  - The current implementation accepts any email/password combination that matches the mock user.

### Data Storage
- **Mock Data**: The application uses in-memory mock data for:
  - Projects (`app/api/projects/projectMockData.ts`)
  - Timesheets (`app/api/timesheets/timesheetsMockData.ts`)
  - Time entries are stored in memory and will be lost on server restart.
  
- **No Database**: There is no database integration. All data is stored in memory, meaning:
  - Data will be lost when the server restarts
  - Changes are not persisted between sessions
  - For production, integrate with a database (PostgreSQL, MongoDB, etc.)

### Features
- **Timesheet Management**: Users can view, create, and manage timesheets
- **Time Entry Tracking**: Add, edit, and delete time entries for projects
- **Project Selection**: Select from available projects when creating time entries
- **Weekly View**: View and manage timesheets on a weekly basis
- **Authentication Required**: All timesheet pages require authentication

### Development Notes
- The application uses the Next.js App Router (not Pages Router)
- Client components are marked with `"use client"` directive
- Server components are used by default for API routes and layouts
- TypeScript is used throughout for type safety
- Tailwind CSS is used for all styling

### Environment Variables
- `NEXTAUTH_SECRET`: Required for NextAuth.js session encryption. Must be set in `.env.local` file.

### Browser Support
- Modern browsers with ES6+ support
- Responsive design for mobile and desktop

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Future Improvements

- [ ] Replace mock authentication with database-backed auth
- [ ] Integrate a database for persistent data storage
- [ ] Add user management and role-based access control
- [ ] Implement proper error handling and validation
- [ ] Add unit and integration tests
- [ ] Add API documentation
- [ ] Implement data export functionality
- [ ] Add search and filtering capabilities
