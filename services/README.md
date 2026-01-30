# API Service Documentation

## Overview

This directory contains the API service layer for the application, including:
- **endpoints.ts**: Centralized list of all API endpoints
- **api.ts**: Main fetch function for making API requests
- **mockData.ts**: Mock data service for development

## How It Works

### 1. Endpoints Configuration (`endpoints.ts`)

Centralized endpoint definitions that can be used throughout the application:

```typescript
import { endpoints } from '@/services/endpoints';

// Use endpoints
const url = endpoints.timesheets.list; // "/api/timesheets"
const detailUrl = endpoints.timesheets.detail('123'); // "/api/timesheets/123"
```

### 2. API Service (`api.ts`)

Main fetch function that handles:
- Request/response transformation
- Error handling
- Query parameter building
- JSON serialization

**Usage:**

```typescript
import api from '@/services/api';
import { endpoints } from '@/services/endpoints';

// GET request
const response = await api.get(endpoints.timesheets.list, {
  dateRange: '30',
  status: 'completed',
  page: 1,
  limit: 10
});

if (response.error) {
  console.error(response.error);
} else {
  console.log(response.data); // GetTimesheetsResponse
}

// POST request
const createResponse = await api.post(endpoints.timeEntries.create, {
  projectId: '1',
  taskName: 'Homepage Development',
  date: '2024-01-21',
  hours: 4
});
```

### 3. Mock Data Service (`mockData.ts`)

In-memory data store that:
- Generates mock week timesheets from time entries
- Calculates status (COMPLETED, INCOMPLETE, MISSING)
- Provides helper functions for filtering

## GET /api/timesheets Endpoint

### How It Works

1. **Authentication**: Checks for valid NextAuth session
2. **Query Parameters**: Parses filtering and pagination params
3. **Data Retrieval**: Gets mock week timesheets for the user
4. **Filtering**: Applies date range and status filters
5. **Pagination**: Slices data based on page and limit
6. **Response**: Returns formatted response with metadata

### Request Example

```
GET /api/timesheets?dateRange=30&status=completed&page=1&limit=10
```

### Response Structure

```json
{
  "data": {
    "timesheets": [
      {
        "id": "week-1",
        "userId": "1",
        "weekNumber": 1,
        "weekStartDate": "2024-01-01",
        "weekEndDate": "2024-01-05",
        "status": "completed",
        "totalHours": 40,
        "entries": [...]
      }
    ],
    "total": 5,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  },
  "message": "Timesheets retrieved successfully"
}
```

### Status Calculation Logic

- **MISSING**: No time entries for the week
- **INCOMPLETE**: Some weekdays have < 8 hours
- **COMPLETED**: All weekdays (Mon-Fri) have >= 8 hours

### Date Range Filters

- `"7"`: Last 7 days
- `"30"`: Last 30 days
- `"90"`: Last 90 days
- `"this_month"`: Current month
- `"last_month"`: Previous month
