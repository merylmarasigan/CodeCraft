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
### Phase 1: Foundation & Infrastructure
- [ ] **PR 1.1: Project Setup & Database Schema**
  - [ ] init: Create React app with Javascript, configure Supabase client
  - [ ] db: Add users table with auth integration
  - [ ] db: Create topics table (id, name, description, difficulty_level, category)
  - [ ] db: Create topic_prerequisites table (topic_id, prerequisite_id, relationship_type)
  - [ ] db: Create problem_templates table (id, topic_id, template_type, base_pattern, constraints)
  - [ ] db: Create user_knowledge_profile table (user_id, topic_id, repetition_count, last_seen, next_review, mastery_score)
  - [ ] db: Create problem_attempts table (user_id, problem_id, timestamp, correct, time_taken, complexity_achieved)
- [ ] **PR 1.2: Basic UI Shell & Navigation**
  - [ ] ui: Add layout with nav, routing for /dashboard, /learn, /practice
  - [ ] ui: Create Dashboard component with placeholder sections for progress, daily goals
  - [ ] ui: Create Learn page with topic list placeholder
  - [ ] ui: Create Practice page with code editor integration (Monaco/CodeMirror)

### Phase 2: Knowledge Graph Construction
- [ ] **PR 2.1: Neetcode Roadmap Parser**
  - [ ] feat: Add scraper utility to extract Neetcode roadmap structure
  - [ ] feat: Parse topic categories (Arrays, LinkedLists, Trees, etc.)
  - [ ] feat: Extract topic ordering within each category
  - [ ] feat: Map Neetcode problems to our topic taxonomy
  - [ ] api: Add endpoint to import parsed data into topics table
- [ ] **PR 2.2: Prerequisite Detection Algorithm**
  - [ ] algo: Add concept similarity detection using topic tags/keywords
  - [ ] algo: Implement prerequisite inference rules (e.g., "Two Pointers" before "Sliding Window")
  - [ ] algo: Create topic complexity scorer based on concept dependencies
  - [ ] db: Populate topic_prerequisites with detected relationships
  - [ ] api: Add endpoint to query prerequisite chain for any topic
- [ ] **PR 2.3: Knowledge Graph Visualization**
  - [ ] ui: Add D3.js/React Flow for graph rendering
  - [ ] ui: Implement topic nodes with mastery level coloring
  - [ ] ui: Add prerequisite edges with directional arrows
  - [ ] ui: Enable zoom, pan, and topic selection
  - [ ] api: Add endpoint to fetch user's personalized knowledge graph state

### Phase 3: Problem Generation Engine
- [ ] **PR 3.1: Template-Based Generator**
  - [ ] gen: Create base ProblemTemplate class with generate() method
  - [ ] gen: Implement array problem templates (search, sort, subarray)
  - [ ] gen: Implement tree problem templates (traversal, path, construction)
  - [ ] gen: Add constraint randomization within difficulty bounds
  - [ ] gen: Create test case generator for each template
- [ ] **PR 3.2: Concept Composition Engine**
  - [ ] gen: Define atomic concept library (iteration, comparison, recursion, etc.)
  - [ ] gen: Create concept combination rules and valid pairings
  - [ ] gen: Implement problem synthesizer combining 2-3 concepts
  - [ ] gen: Add edge case injection based on difficulty level
  - [ ] api: Create endpoint to generate N problems for given topic+difficulty
- [ ] **PR 3.3: Solution Validator**
  - [ ] val: Implement reference solution generator for each template
  - [ ] val: Add complexity analyzer (time/space) for solutions
  - [ ] val: Create test harness to validate generated test cases
  - [ ] val: Add problem quality scorer (uniqueness, difficulty accuracy)

### Phase 4: Adaptive Learning System
- [ ] **PR 4.1: Diagnostic Algorithm**
  - [ ] diag: Create adaptive questioning algorithm starting from mid-level topics
  - [ ] diag: Implement binary search strategy for finding knowledge boundary
  - [ ] diag: Add confidence scoring based on speed and correctness
  - [ ] diag: Create knowledge frontier calculation from diagnostic results
  - [ ] api: Add diagnostic session management endpoints
- [ ] **PR 4.2: Spaced Repetition with Implicit Practice**
  - [ ] sr: Create base SpacedRepetition class with review scheduling
  - [ ] sr: Implement implicit credit calculation (solving Tree problem credits Recursion)
  - [ ] sr: Add credit decay function based on topic distance
  - [ ] sr: Create review compression algorithm to minimize redundant practice
  - [ ] db: Add repetition_credits table for tracking implicit practice
- [ ] **PR 4.3: Task Selection Optimizer**
  - [ ] opt: Implement learning velocity calculator per topic
  - [ ] opt: Create task scorer weighing: due reviews, new topics, difficulty progression
  - [ ] opt: Add interference minimizer (avoid similar topics in sequence)
  - [ ] opt: Implement "review knockdown" selector for efficient practice
  - [ ] api: Add endpoint for get_next_task with full selection reasoning

### Phase 5: Progress Tracking & Analytics
- [ ] **PR 5.1: Individual Progress Dashboard**
  - [ ] ui: Create mastery progress bars per topic category
  - [ ] ui: Add learning velocity chart (topics/day over time)
  - [ ] ui: Implement weak area identifier with remediation suggestions
  - [ ] ui: Create streak tracker and consistency metrics
  - [ ] api: Add analytics aggregation endpoints
- [ ] **PR 5.2: Performance Analytics**
  - [ ] analytics: Track time-to-solve distributions per topic
  - [ ] analytics: Implement complexity achievement tracker
  - [ ] analytics: Add error pattern analysis (which edge cases frequently missed)
  - [ ] api: Create performance report generator

### Phase 6: Gamification & Social Features
- [ ] **PR 6.1: Point System & Achievements**
  - [ ] game: Create point calculation (difficulty × speed × streak multiplier)
  - [ ] game: Implement daily/weekly/monthly achievement system
  - [ ] game: Add milestone badges for topic mastery
  - [ ] db: Create user_points and user_achievements tables
- [ ] **PR 6.2: Cohort Competition**
  - [ ] cohort: Implement weekly cohort creation algorithm
  - [ ] cohort: Create real-time leaderboard with daily point tracking
  - [ ] ui: Add cohort leaderboard component with rank changes
  - [ ] api: Add endpoints for cohort stats and rankings

### Phase 7: Problem Practice Interface
- [ ] **PR 7.1: Advanced Code Editor**
  - [ ] editor: Integrate Monaco with syntax highlighting for multiple languages
  - [ ] editor: Add real-time syntax checking and auto-completion
  - [ ] editor: Implement test case runner with result visualization
  - [ ] editor: Add complexity analyzer showing Big-O after submission
- [ ] **PR 7.2: Solution Feedback System**
  - [ ] feedback: Implement correctness checker against test cases
  - [ ] feedback: Add performance comparison to optimal solution
  - [ ] feedback: Create hint system for stuck students
  - [ ] feedback: Generate personalized improvement suggestions
