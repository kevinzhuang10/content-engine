# Task List: YouTube Podcast to LinkedIn Posts Generator

Based on PRD: `prd-youtube-linkedin-generator.md`

## Current Codebase Assessment

The project is a fresh Next.js 15 application with:
- **Framework**: Next.js 15.5.3 with App Router, Turbopack, React 19
- **Styling**: Tailwind CSS v4
- **TypeScript**: Strict configuration
- **Current State**: Default Next.js starter with basic layout and homepage

**Key Infrastructure Present:**
- Next.js App Router structure (`src/app/`)
- Tailwind CSS v4 configuration
- TypeScript setup
- ESLint configuration

**Missing Infrastructure:**
- Authentication system (Supabase)
- Database schema and models
- API routes for video processing
- UI components for the application
- Third-party API integrations

## Relevant Files

- `src/lib/supabase/client.ts` - Supabase client configuration for browser
- `src/lib/supabase/server.ts` - Supabase client configuration for server-side
- `src/lib/supabase/middleware.ts` - Auth middleware for protected routes
- `src/lib/database.types.ts` - TypeScript types generated from Supabase schema
- `src/components/ui/button.tsx` - Reusable button component
- `src/components/ui/input.tsx` - Reusable input component
- `src/components/ui/card.tsx` - Reusable card component
- `src/components/ui/loading.tsx` - Loading spinner/skeleton components
- `src/components/auth/login-form.tsx` - Authentication login form
- `src/components/auth/auth-provider.tsx` - Auth context provider
- `src/components/dashboard/dashboard-layout.tsx` - Main dashboard layout
- `src/components/dashboard/video-input.tsx` - YouTube URL input component
- `src/components/dashboard/processing-status.tsx` - Processing status display
- `src/components/dashboard/video-history.tsx` - User's processed videos list
- `src/components/posts/post-variants.tsx` - Display generated LinkedIn posts
- `src/components/posts/copy-button.tsx` - Copy-to-clipboard functionality
- `src/app/api/process-video/route.ts` - API route for video processing
- `src/app/api/generate-posts/route.ts` - API route for LinkedIn post generation
- `src/app/auth/login/page.tsx` - Login page
- `src/app/auth/callback/route.ts` - OAuth callback handler
- `src/app/dashboard/page.tsx` - Main dashboard page
- `src/app/results/[id]/page.tsx` - Results page for processed video
- `src/lib/youtube.ts` - YouTube URL validation and metadata utilities
- `src/lib/transcription.ts` - Third-party transcription API integration
- `src/lib/ai-generation.ts` - AI post generation utilities
- `src/lib/validation.ts` - Input validation schemas
- `src/lib/utils.ts` - General utility functions
- `src/hooks/use-auth.ts` - Authentication state hook
- `src/hooks/use-video-processing.ts` - Video processing state hook
- `migrations/001_initial_schema.sql` - Initial database schema
- `migrations/002_add_indexes.sql` - Database indexes for performance

### Notes

- Unit tests should be placed alongside components (e.g., `button.test.tsx`)
- API routes follow Next.js 15 App Router conventions in `src/app/api/`
- Use `npm run lint` for code quality checks
- Database migrations handled through Supabase CLI

## Tasks

- [x] 1.0 Setup Supabase Infrastructure and Authentication
  - [x] 1.1 Install and configure Supabase client packages (@supabase/supabase-js, @supabase/ssr)
  - [x] 1.2 Create Supabase project and obtain API keys
  - [x] 1.3 Set up environment variables for Supabase configuration
  - [x] 1.4 Create Supabase client configurations for browser and server-side usage
  - [x] 1.5 Configure Supabase authentication providers (email OTP method)
  - [x] 1.6 Set up auth middleware for route protection
  - [x] 1.7 Create authentication context provider and hooks

- [ ] 2.0 Design and Implement Database Schema
  - [ ] 2.1 Design database schema for users, videos, transcripts, and generated posts
  - [ ] 2.2 Create initial migration file with tables and relationships
  - [ ] 2.3 Set up Row Level Security (RLS) policies for data protection
  - [ ] 2.4 Generate TypeScript types from Supabase schema
  - [ ] 2.5 Create database utility functions for common operations
  - [ ] 2.6 Add database indexes for performance optimization

- [ ] 3.0 Create Core UI Components and Layout
  - [ ] 3.1 Build reusable UI components (Button, Input, Card, Loading)
  - [ ] 3.2 Update root layout with proper font loading and global styles
  - [ ] 3.3 Create authentication components (LoginForm, AuthProvider)
  - [ ] 3.4 Build responsive dashboard layout component
  - [ ] 3.5 Implement consistent color scheme and design tokens
  - [ ] 3.6 Add responsive navigation and user menu

- [ ] 4.0 Build Dashboard and Video Processing Interface
  - [ ] 4.1 Create main dashboard page with video input section
  - [ ] 4.2 Build YouTube URL input component with validation
  - [ ] 4.3 Create processing status display component
  - [ ] 4.4 Implement video history/library component
  - [ ] 4.5 Add video metadata display (thumbnail, title, duration)
  - [ ] 4.6 Create empty states and onboarding messaging

- [ ] 5.0 Implement YouTube URL Processing and Validation
  - [ ] 5.1 Create YouTube URL validation utilities
  - [ ] 5.2 Build YouTube Data API integration for metadata
  - [ ] 5.3 Implement URL parsing and video ID extraction
  - [ ] 5.4 Add video duration and content type validation
  - [ ] 5.5 Create API route for video processing initiation
  - [ ] 5.6 Handle YouTube API rate limiting and errors

- [ ] 6.0 Integrate Third-Party Transcription API
  - [ ] 6.1 Research and select transcription service (AssemblyAI, Rev.ai, etc.)
  - [ ] 6.2 Create transcription service integration module
  - [ ] 6.3 Implement job submission and status polling
  - [ ] 6.4 Add error handling for transcription failures
  - [ ] 6.5 Create Supabase Edge Function for transcription workflow
  - [ ] 6.6 Store transcription results in database

- [ ] 7.0 Build LinkedIn Post Generation System
  - [ ] 7.1 Create AI post generation utility functions
  - [ ] 7.2 Design prompts for three post styles (narrative, insights, discussion)
  - [ ] 7.3 Implement OpenAI/Claude API integration
  - [ ] 7.4 Create API route for post generation
  - [ ] 7.5 Add post length and format validation
  - [ ] 7.6 Store generated posts in database with metadata

- [ ] 8.0 Create Results Display and Copy Functionality
  - [ ] 8.1 Build post variants display component
  - [ ] 8.2 Implement copy-to-clipboard functionality
  - [ ] 8.3 Create results page with proper routing
  - [ ] 8.4 Add post preview and formatting
  - [ ] 8.5 Implement success feedback for copy actions
  - [ ] 8.6 Add social sharing preparation features

- [ ] 9.0 Implement User History and Data Management
  - [ ] 9.1 Create video history listing component
  - [ ] 9.2 Implement pagination for large datasets
  - [ ] 9.3 Add search and filtering capabilities
  - [ ] 9.4 Create individual video detail views
  - [ ] 9.5 Implement data export functionality
  - [ ] 9.6 Add user preferences and settings

- [ ] 10.0 Add Error Handling and User Feedback
  - [ ] 10.1 Create global error boundary component
  - [ ] 10.2 Implement API error handling and user messages
  - [ ] 10.3 Add loading states throughout the application
  - [ ] 10.4 Create toast notification system
  - [ ] 10.5 Handle network connectivity issues
  - [ ] 10.6 Add form validation and error messaging

- [ ] 11.0 Testing and Quality Assurance
  - [ ] 11.1 Set up testing framework (Jest, React Testing Library)
  - [ ] 11.2 Write unit tests for utility functions
  - [ ] 11.3 Create component tests for UI elements
  - [ ] 11.4 Test API routes and error scenarios
  - [ ] 11.5 Perform end-to-end testing of the full workflow
  - [ ] 11.6 Optimize performance and bundle size