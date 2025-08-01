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
- for the sake of MVP, starting with traditional problem bank

06/28:
- Implemented UI for basic landing page and topics page
- Will have to discuss Problem generation at next meeting (or later time)
- WIll have to disucss content generation for prereq learning pages at a later time

07/02:
- Conducted research on pg_vector
- came upon the idea of using hard coded requirements and then generating suggestions based pg_vector similarity
```
-- STEP 1: Get explicitly defined prerequisites
WITH explicit_prereqs AS (
  SELECT 
    prerequisite_id as topic_id, 
    relationship_type as type,
    confidence,
    'explicit' as source
  FROM topic_prerequisites 
  WHERE topic_id = $1  -- $1 is the current topic we're looking at
),

-- STEP 2: Discover similar topics that could be prerequisites
discovered_prereqs AS (
  SELECT 
    t.id as topic_id,
    'ai_suggested' as type,
    (1 - (current.embedding <=> t.embedding)) as confidence,
    'embedding' as source
  FROM topics current, topics t
  WHERE current.id = $1 
    AND t.id != $1  -- Don't suggest the topic as its own prerequisite
    AND t.difficulty_level < current.difficulty_level  -- Only easier topics
    AND (1 - (current.embedding <=> t.embedding)) > 0.75  -- High similarity threshold
    -- Don't suggest topics that are already explicit prerequisites
    AND t.id NOT IN (
      SELECT prerequisite_id 
      FROM topic_prerequisites 
      WHERE topic_id = $1
    )
  ORDER BY (1 - (current.embedding <=> t.embedding)) DESC
  LIMIT 5  -- Only top 5 AI suggestions
)

-- STEP 3: Combine both sources and return with topic details
SELECT 
  t.name,
  t.description,
  prereqs.type,
  prereqs.confidence,
  prereqs.source
FROM (
  SELECT * FROM explicit_prereqs
  UNION ALL
  SELECT * FROM discovered_prereqs
) prereqs
JOIN topics t ON t.id = prereqs.topic_id
ORDER BY 
  CASE WHEN source = 'explicit' THEN 1 ELSE 2 END,   -- Explicit first
  confidence DESC;
```

- learned that embedding would be generated by AI