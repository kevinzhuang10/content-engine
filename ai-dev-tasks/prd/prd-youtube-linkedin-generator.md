# Product Requirements Document: YouTube Podcast to LinkedIn Posts Generator

## Introduction/Overview

The YouTube Podcast to LinkedIn Posts Generator is a web application that enables content creators to transform their spoken-word YouTube content into engaging LinkedIn posts. Content creators paste their YouTube video URL, the system processes the audio content through transcription and AI analysis, then generates three distinct LinkedIn post variations optimized for different engagement styles. This tool specifically serves content creators who want to maximize their content reach and grow their professional audience across platforms.

**Problem Statement:** Content creators struggle to repurpose their long-form video content into bite-sized, engaging social media posts, missing opportunities for cross-platform audience growth and engagement.

**Goal:** Provide content creators with an automated, intelligent solution that transforms their YouTube video content into ready-to-publish LinkedIn posts, saving time while maintaining content quality and engagement potential.

## Goals

1. **Primary Goal:** Enable content creators to generate 3 distinct LinkedIn post variations from their spoken-word YouTube videos under 1 hour
2. **User Experience Goal:** Provide content creators with a seamless dashboard experience where they can manage multiple video analyses and access their content history
3. **Content Quality Goal:** Generate LinkedIn posts that maintain the original content's value while optimizing for LinkedIn's engagement patterns and the creator's voice
4. **Audience Growth Goal:** Help content creators expand their reach by providing optimized content for LinkedIn's professional audience
5. **Efficiency Goal:** Save content creators time by automating the repurposing process while maintaining quality

## User Stories

### Primary User Stories
- **As a content creator**, I want to paste my YouTube video URL and get 3 LinkedIn post options so that I can quickly promote my content across platforms
- **As a content creator**, I want different post styles (narrative, list, discussion) so that I can vary my content approach and maximize engagement
- **As a content creator**, I want to transform my video content into engaging LinkedIn posts so that I can grow my professional audience
- **As a content creator**, I want copy-ready posts without editing requirements so that I can publish immediately and focus on creating more content

### Secondary User Stories
- **As a returning content creator**, I want to access my previously processed videos so that I can reuse or reference past content
- **As a content creator**, I want to see my content processing history so that I can track which videos I've already repurposed
- **As a content creator**, I want reliable processing so that I can trust the tool with my valuable content

## Functional Requirements

### Core Processing Requirements
1. The system must accept YouTube video URLs as input
2. The system must validate that URLs are valid YouTube links
3. The system must restrict processing to videos under 1 hour in duration
4. The system must download and transcribe the complete audio content of the video
5. The system must process spoken-word content (filtering out music-only videos)
6. The system must generate exactly 3 LinkedIn post variations from each video

### Post Generation Requirements
7. The system must generate posts in three distinct styles:
   - Narrative/story format
   - Key insights list/tips format
   - Discussion starter/question format
8. The system must ensure each post is optimized for LinkedIn's character limits and engagement patterns
9. The system must provide copy-ready posts that require no user editing
10. The system must generate posts that accurately reflect the original video content

### User Account & Dashboard Requirements
11. The system must provide user registration and authentication
12. The system must maintain a dashboard showing all processed videos
13. The system must allow users to view their processing history
14. The system must save generated posts for future access
15. The system must display video metadata (title, duration, processing date)

### Technical Requirements
16. The system must store user data securely
17. The system must provide responsive design for desktop and mobile browsers
18. The system must implement error handling for failed transcription or processing

## Non-Goals (Out of Scope)

- **Custom Post Templates:** Users cannot create custom prompt templates (planned for future release)
- **Video Editing:** No video editing or clipping functionality
- **Advanced Analytics:** No engagement tracking or post performance metrics
- **Social Media Integration:** No direct posting to LinkedIn (copy-paste only)
- **Collaborative Features:** No team accounts or sharing functionality
- **Video Length Extension:** Videos over 1 hour not supported in MVP
- **Segment Detection:** Automatic identification of engaging segments (future feature)
- **Multi-language Support:** English content only
- **API Access:** No external API for integrations
- **Mobile App:** Web application only

## Design Considerations

### User Interface
- **Clean, minimal dashboard** with clear video upload/URL input area
- **Processing progress indicators** to manage user expectations during transcription
- **Video thumbnail and metadata display** for easy identification
- **Copy-to-clipboard functionality** for each generated post
- **Responsive design** ensuring usability across devices

### User Experience Flow
1. Content creator lands on dashboard (Supabase Auth login if returning user)
2. Creator pastes YouTube URL in prominent input field
3. Frontend validates URL format and calls Supabase Edge Function
4. Edge Function calls YouTube transcription API and returns job ID
5. Real-time progress updates via Supabase subscriptions during transcription
6. Edge Function generates LinkedIn posts using AI API once transcription completes
7. Results page displays 3 post variations with copy-to-clipboard buttons
8. Posts automatically saved to Supabase database and accessible in creator's history

## Technical Considerations

### Architecture Overview
The application uses a pure Supabase Backend-as-a-Service architecture with third-party API integrations:

**Supabase handles:**
- User authentication and session management
- Database operations and real-time subscriptions
- All backend API logic via Edge Functions
- Row Level Security for data protection
- Rate limiting and request management

**Supabase Edge Functions handle:**
- YouTube URL validation and metadata fetching
- Third-party transcription API calls
- AI content generation API calls
- Database updates and real-time notifications
- Error handling and retry logic

**Frontend handles:**
- User interface and user experience
- Real-time UI updates via Supabase subscriptions
- Client-side form validation
- Copy-to-clipboard functionality

### Core Technology Stack
- **Frontend:** React/Next.js for responsive web application
- **Backend:** Supabase for authentication, database, real-time updates, and all API logic
- **Database:** Supabase PostgreSQL for user accounts and content storage
- **Authentication:** Supabase Auth with built-in providers and JWT tokens
- **API Logic:** Supabase Edge Functions for all backend processing

### Third-Party Integrations
- **YouTube Transcription API:** Third-party service that accepts YouTube URLs and returns transcripts (e.g., AssemblyAI, Rev.ai, or similar)
- **AI Content Generation:** OpenAI GPT-4 or Claude API for LinkedIn post generation
- **Video Metadata:** YouTube Data API for video title, duration, and thumbnail information

### Infrastructure Requirements
- **Backend Logic:** Supabase Edge Functions for all API processing
- **Real-time Updates:** Supabase real-time subscriptions for processing status
- **Rate Limiting:** Supabase built-in rate limiting and custom logic in Edge Functions
- **Security:** Supabase Row Level Security (RLS) and input validation for YouTube URLs
- **API Management:** All third-party API calls handled through Supabase Edge Functions
- **Deployment:** Single Next.js application deployed on Vercel with Supabase backend

## Success Metrics

### Adoption Metrics
- **Content Creator Registration:** Target 100+ content creators within first month
- **Processing Volume:** Target 500+ videos processed monthly by content creators
- **Creator Retention:** 60% of content creators return within 7 days of first use

### Quality Metrics
- **Processing Success Rate:** 95%+ successful video transcriptions
- **Creator Satisfaction:** 80%+ of generated posts used by content creators without modification
- **Processing Time:** Average processing time under 5 minutes for 30-minute videos

### Content Creator Success Metrics
- **Content Usage:** 70%+ of content creators copy at least one generated post
- **Return Usage:** 40%+ of content creators process multiple videos
- **Content Library Growth:** Content creators regularly access their history to reference past content

## Open Questions

### Technical Questions
1. **Third-party API Selection:** Which YouTube transcription API provides the best balance of cost, accuracy, and reliability?
2. **API Rate Limits:** How do we handle rate limiting across multiple third-party APIs?
3. **Storage Limits:** How long should we retain processed transcripts and generated content?
4. **Error Handling:** How do we handle failures in third-party transcription services?

### Product Questions
4. **Content Filtering:** How should we handle videos with inappropriate content or poor audio quality?
5. **Error Recovery:** What happens if transcription fails mid-process? Should users be able to retry?
6. **Premium Features:** Which advanced features should be considered for future paid tiers?

### User Experience Questions
7. **Onboarding:** Do we need a tutorial or demo video for first-time users?
8. **Feedback Loop:** How should users report inaccurate or poor-quality generated posts?
9. **Content Ownership:** How do we communicate content ownership and usage rights to users?

---

**Next Steps:** Review this PRD with stakeholders, validate technical feasibility, and create detailed task breakdown for development team.