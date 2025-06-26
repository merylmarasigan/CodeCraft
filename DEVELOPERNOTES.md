### DEVELOPER NOTES

## topics to learn to implement knowledge graph
- Graph Theory
    - Directed Acyclic Graphs [X] and cycle detection [X]
        - 6/25/2025: researched and learned cycle detection algorithm
    - topological sorting 
    - Graph traversal (DFS/BFS for finding learning paths) [X]
    - Reachability analysis (what topics become available after mastering others)

- Database Design for Graph Structures
    - Adjacency list representation in SQL [X]
    - Recursive Common Table Expressions (CTEs) for path finding[X]
    - Indexing strategies for graph queries

-  Knowledge Graph Construction Algorithms (Why necessary: You need algorithms to automatically detect implicit prerequisites (like "Merge K Lists" requiring "Merge 2 Lists" + "Heaps") rather than manually defining every relationship.
Key concepts:)
    - Concept similarity detection using embeddings
    - Dependency inference rules and heuristics
    - Topic complexity scoring algorithms
    - Automated prerequisite discovery
^ OUR RECURSIVE CTE DETECTS IMPLICIT PREREQS


06/26:
- established that topics and their prerequisite topics have a many-to-many relationship
- Supabase doesn't support graph databases so going to use PostgreSQL recursive CTE (to find all prereqs that must be completed before a student can access a particular topic)
```
WITH RECURSIVE all_prereqs AS (
    -- Base case: finds ALL direct prerequisites
    SELECT prereq_id, 1 as depth
    FROM topic_prereqs
    WHERE topic_id = 3  -- specific topic (i.e.Merge K Lists)'s id
    
    UNION
    
    -- Recursive case: for EACH prerequisite found
    SELECT tp.prereq_id, ap.depth + 1
    FROM all_prereqs ap
    JOIN topic_prereqs tp ON tp.topic_id = ap.prereq_id
)
SELECT * FROM all_prereqs;
```
- 