# CodeCraft


I'm building an adaptive learning platform for algorithms and data structures interview preparation, inspired by MathAcademy's AI tutoring system. The platform uses React + Supabase and has three core components:

### 1. Problem Generation System
Instead of using static problems, I need to generate infinite variations:
- Template-based: Core patterns with variable parameters (e.g., "find kth element" where k, array size, and constraints change)
- Concept-based: Combining atomic skills (e.g., "array traversal" + "two pointers" = various array problems)
- Difficulty scaling:
  - Easy: Small inputs (n<10), basic cases only, no edge cases
  - Medium: Moderate inputs (n<100), some edge cases, standard constraints  
  - Hard: Large inputs (n<10^5), complex edge cases, tight constraints

### 2. Knowledge Graph & Prerequisites
- Parse Neetcode's roadmap to extract topic ordering and build the initial graph
- Automatically detect implicit prerequisites (e.g., "Merge K Lists" requires "Merge 2 Lists" + "Heaps")
- Track which prerequisite skills each problem variation exercises
- Use frontier detection diagnostics to find the boundary between known/unknown topics

### 3. Adaptive Learning with Spaced Repetition
Implement MathAcademy's approach where:
- Solving complex problems provides implicit practice for simpler prerequisites (e.g., "Binary Tree Maximum Path Sum" implicitly practices tree traversal, recursion, and basic tree properties)
- Reviews are compressed by selecting harder problems that cover multiple due topics
- Mastery is measured by correctness, speed improvement, and achieving optimal complexity
- The system adapts task selection to maximize learning per unit time

Additional features include gamification with weekly cohort-based leaderboards tracking daily points.

Please help me design [specific aspect: the complete system architecture / database schema / problem generation engine / knowledge graph algorithms / spaced repetition implementation].

## Roadmap
### CodeCraft MVP - PR Checklist

### PR #1: Setup + Schema
**feat: Initialize project with database schema**

- [ ] **chore: Create React app with Supabase**
  - [X] Run `create-react-app codecraft --template typescript`
  - [X] Install Supabase client `npm install @supabase/supabase-js`
  - [X] Create `.env.local` with Supabase URL and anon key

- [ ] **migration: Create all tables**
  - [X] Create `concepts` table
  - [X] Create `problems` table  
  - [X] Create `users` table
  - [X] Create `attempts` table

- [ ] **migration: Add RLS policies for user attempts**
  - [ ] Enable RLS on `attempts` table
  - [ ] Add policy: users can only see their own attempts
  - [ ] Add policy: users can insert their own attempts
  - [ ] Add policy: users can update their own attempts

- [ ] **feat: Configure Supabase client**
  - [ ] Create `/lib/supabase.ts` with client initialization
  - [ ] Add type definitions from database
  - [ ] Create helper functions for common queries
  - [ ] Test connection with simple query

- [ ] **feat: Add auth with magic link**
  - [ ] Create login page with email input
  - [ ] Implement magic link send
  - [ ] Handle auth callback route
  - [ ] Add auth context provider
  - [ ] Protect routes with auth check

### PR #2: Load Neetcode Problems  
**feat: Import Neetcode 150 as static problems**

- [ ] **seed: Load problems into database**
  - [ ] Create `/scripts/seed-database.js`
  - [ ] Insert concepts (Arrays, Linked Lists, Trees, etc.)
  - [ ] Insert all 150 problems with descriptions
  - [ ] Add example test cases for each problem

- [ ] **seed: Create basic prerequisite relationships**
  - [ ] Arrays → Two Pointers
  - [ ] Two Pointers → Sliding Window
  - [ ] Trees → Tree Traversal
  - [ ] Tree Traversal → BST
  - [ ] Add other obvious prerequisites

## PR #3: Problem Solving Interface
**feat: Create minimal problem solver**

- [ ] **feat: Problem display page with description**
  - [ ] Create `/pages/problem/[id].tsx`
  - [ ] Fetch problem details from database
  - [ ] Display title, difficulty, description
  - [ ] Show example inputs/outputs
  - [ ] Add breadcrumb navigation

- [ ] **feat: Add textarea for code**
  - [ ] Create code editor component (just textarea)
  - [ ] Add language selector (Python, JavaScript, Java)
  - [ ] Store code in component state
  - [ ] Add reset button to clear code
  - [ ] Persist code to localStorage on change

- [ ] **feat: Integrate Judge0 CE API for code execution**
  - [ ] Sign up for Judge0 CE API key
  - [ ] Create `/lib/judge0.ts` client
  - [ ] Implement code submission function
  - [ ] Poll for execution results
  - [ ] Handle execution errors/timeout

- [ ] **feat: Show test results**
  - [ ] Create test result component
  - [ ] Display pass/fail for each test case
  - [ ] Show actual vs expected output
  - [ ] Display runtime and memory usage
  - [ ] Show error messages if compilation fails

- [ ] **feat: Record attempts in database**
  - [ ] Save attempt on each submission
  - [ ] Track success/failure
  - [ ] Store execution time
  - [ ] Update attempt count
  - [ ] Store submitted code

- [ ] **feat: Mark problem as solved, show checkmark**
  - [ ] Update `solved` flag on successful submission
  - [ ] Show green checkmark on problem list
  - [ ] Show "Solved" badge on problem page
  - [ ] Display first solve timestamp
  - [ ] Update user's solved count

## PR #4: Basic Spaced Repetition
**feat: Implement simple review system**

- [ ] **feat: Add next_review_date to attempts table**
  - [ ] Create migration to add column
  - [ ] Set default to tomorrow for new solves
  - [ ] Backfill existing attempts with dates
  - [ ] Add index on next_review_date

- [ ] **feat: Calculate next review (1, 3, 7, 21 days)**
  - [ ] Create review interval calculator function
  - [ ] 1 day after first solve
  - [ ] 3 days after second solve
  - [ ] 7 days after third solve
  - [ ] 21 days after fourth+ solve
  (What's going to be the query when a user logs in?)

- [ ] **feat: Update review date on successful attempt**
  - [ ] Check if problem is being reviewed
  - [ ] Calculate next interval on success
  - [ ] Reset to 1 day on failure
  - [ ] Update next_review_date in database
  - [ ] Show next review date to user

## PR #5: Track Progress
**feat: Add minimal progress tracking**

- [ ] **feat: Show solved count on homepage**
  - [ ] Create dashboard/home page
  - [ ] Display "X / 150 Problems Solved"
  - [ ] Show percentage complete
  - [ ] Break down by difficulty (Easy/Medium/Hard)
  - [ ] Update in real-time after solving

- [ ] **feat: Add streak counter**
  - [ ] Track consecutive days with attempts
  - [ ] Display current streak
  - [ ] Show longest streak
  - [ ] Add flame icon for active streaks
  - [ ] Reset at midnight if no activity

- [ ] **feat: Display concept completion percentage**
  - [ ] Calculate % solved per concept
  - [ ] Show progress bar for each concept
  - [ ] Sort concepts by completion
  - [ ] Highlight fully completed concepts
  - [ ] Show next recommended concept

- [ ] **feat: Create simple progress bar per concept**
  - [ ] Visual progress bar (green fill)
  - [ ] "7/10 Arrays problems solved"
  - [ ] Click to filter problems by concept
  - [ ] Animate progress bar on update
  - [ ] Show checkmark when 100% complete

## Ship Checklist

### Before Deploy:
- [ ] Test auth flow end-to-end
- [ ] Verify all 150 problems load
- [ ] Solve at least 5 problems yourself
- [ ] Check spaced repetition dates calculate correctly
- [ ] Ensure progress tracking updates properly
- [ ] Test on mobile (should be usable even if not optimized)

### Deploy:
- [ ] Deploy to Vercel
- [ ] Set production environment variables
- [ ] Run database migrations on production
- [ ] Seed production database with problems
- [ ] Test critical path on production

### Day 1 Success Metrics:
- [ ] User can sign up
- [ ] User can solve a problem
- [ ] User sees their progress
## database schema
### MathAcademy-Neetcode Schema

## 1. Concept
| Field       | Type        | Description |
|-------------|-------------|-------------|
| concept_id  | PK, int     | Unique identifier for the concept |
| name        | string      | Name of the concept |
| description | text        | Detailed explanation of the concept |
| difficulty  | enum(easy, medium, hard) | Difficulty level |
| prereqs     | array<int>  | List of `concept_id` values for prerequisite concepts |

---

## 2. Problem
| Field       | Type        | Description |
|-------------|-------------|-------------|
| problem_id  | PK, int     | Unique identifier for the problem |
| title       | string      | Problem title |
| source_url  | string      | Link to original source (e.g., Neetcode) |
| difficulty  | enum(easy, medium, hard) | Difficulty level |
| concept_id  | FK → Concept | Associated concept for this problem |
| example_1  | (input(str), output(str)) | Example to be shown |
| example_2  | (input(str), output(str)) | Example to be shown |


---

## 3. User
| Field      | Type    | Description |
|------------|---------|-------------|
| user_id    | PK, int | Unique identifier for the user |
| name       | string  | User's name |
| email      | string  | User's email address |

---

## 4. Attempt
| Field                   | Type        | Description |
|-------------------------|-------------|-------------|
| attempt_id              | PK, int     | Unique identifier for the attempt |
| user_id                 | FK → User   | The user making the attempt |
| problem_id              | FK → Problem| The problem attempted |
| last_successful_attempt | datetime    | Date/time of the last successful attempt |
