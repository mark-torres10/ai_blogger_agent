# Style Analysis: "Accidentally deleting prod data (and the importance of backups)"

**Article Date:** 2024-05-28  
**Section:** Research  
**Read Time:** 7 minutes  
**URL:** https://markptorres.com/research/importance-of-backups-2024-05-28

---

## I. Key Evaluation Questions

### 1. Dominant Rhetorical and Stylistic Patterns
- **Post-mortem analysis**: Documents what went wrong and how to fix it
- **Problem-solution narrative**: Presents issue, explores solutions, implements fix
- **Technical tutorial**: Provides working code and implementation details
- **Learning from failure**: Uses mistake as teaching opportunity

### 2. Clarity, Depth, and Persuasion Balance
- **Clear problem description**: Specific details about what went wrong
- **Balanced depth**: Technical enough for engineers, accessible enough for general audience
- **Persuasive through consequences**: Shows real impact of not having backups
- **Honest about mistakes**: Open about errors and learning process

### 3. Recurring Tonal Tendencies
- **Self-deprecating humor**: "Deleting prod is never fun, but is a rite of passage"
- **Practical problem-solving**: Focuses on real solutions rather than just theory
- **Educational**: Aims to teach others from his mistakes
- **Resilient**: Shows ability to recover and improve from failures

### 4. Reader Engagement Techniques
- **Relatable scenario**: Many developers have experienced similar issues
- **Concrete examples**: Specific code and implementation details
- **Step-by-step solution**: Clear progression from problem to fix
- **Future prevention**: Shows how to avoid similar issues

### 5. Consistent Weaknesses or Overused Devices
- **Very technical content**: Assumes significant technical background
- **Code-heavy**: Could benefit from more conceptual explanations
- **Limited broader implications**: Could explore more general backup strategies

### 6. Emerging Persona/Voice
- **Experienced engineer**: Shows practical problem-solving skills
- **Honest learner**: Open about mistakes and learning process
- **Helpful educator**: Aims to teach others from his experiences
- **Resilient practitioner**: Demonstrates ability to recover from failures

### 7. Style Shifts Across Content
- **Opening**: Problem description and impact
- **Middle**: Technical investigation and solution development
- **Ending**: Implementation and prevention strategies

---

## II. Benchmark Dimensions (1-5 Scale)

### 1. Clarity & Coherence: **4/5**
- Clear problem-solution structure
- Good technical explanations
- Well-organized progression

### 2. Voice & Personality: **4/5**
- Strong, authentic voice
- Good balance of humor and seriousness
- Engaging and relatable

### 3. Sentence & Syntax Patterns: **4/5**
- Varied sentence lengths
- Good use of technical terminology
- Effective use of code blocks

### 4. Tone & Emotional Resonance: **4/5**
- Relatable and engaging
- Good balance of humor and technical detail
- Honest about challenges

### 5. Persuasiveness & Argumentation: **4/5**
- Strong evidence through concrete example
- Clear methodology and solution
- Demonstrates practical value

### 6. Use of Metaphor, Analogy & Storytelling: **3/5**
- Good narrative structure
- Could benefit from more analogies
- Relatable scenario as story

### 7. Structural Style: **4/5**
- Clear problem-solution structure
- Good use of code examples
- Effective progression

### 8. Lexical Preferences: **4/5**
- Technical but accessible vocabulary
- Good balance of engineering terms and explanation
- Consistent voice throughout

### 9. Reader Engagement Techniques: **4/5**
- Relatable scenario and concrete examples
- Step-by-step solution process
- Future prevention focus

### 10. Evolution Over Time: **N/A** (Single article analysis)

---

## III. Output Fields Summary

| Field | Description |
|-------|-------------|
| **Dominant Traits** | Post-mortem analysis, problem-solution narrative, technical tutorial, learning from failure |
| **Voice Description** | Experienced engineer who combines practical problem-solving with honest learning approach, using mistakes as teaching opportunities |
| **Stylistic Strengths** | Clear problem description, concrete solutions, honest about mistakes, educational value |
| **Common Weaknesses** | Very technical content, code-heavy, could use more analogies, limited broader implications |
| **Representative Excerpts** | "Deleting prod is never fun, but is a rite of passage. This was a very small example of that" |
| **Comparative Analogy** | This style is like a technical post-mortem meets a learning journal - honest, practical, and educational |
| **Actionable Feedback** | Consider adding more analogies and broader implications; could benefit from more conceptual explanations |
| **Evolution Notes** | Shows mature technical writing with good balance of honesty and practical value |

---

## Representative Excerpts

**Problem Description:**
> "When I went to inspect the results, I saw that there were about ~900,000 rows. But when I came back to look at the database again a few hours later, I saw that I only had 5,000 rows."

**Technical Investigation:**
> "Turns out, I didn't use git pull very intelligently. Git overwrites, especially when forced, can be dangerous."

**Solution Implementation:**
> "I created a script to back up my databases. This loads the databases as pandas dataframes and then writes them to the respective format."

**Learning Reflection:**
> "Deleting prod is never fun, but is a rite of passage. This was a very small example of that, but it is a case study of always making sure to have disaster recovery measures enabled."

---

## Style Patterns Observed

1. **Post-Mortem Structure**: Clear problem → investigation → solution → prevention
2. **Honest Self-Reflection**: Open about mistakes and learning process
3. **Practical Problem-Solving**: Focuses on real solutions with working code
4. **Educational Approach**: Uses mistakes as teaching opportunities
5. **Resilient Mindset**: Shows ability to recover and improve from failures 