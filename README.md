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
### database schema
# MathAcademy-Neetcode Schema

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
