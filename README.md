# Rightway Toll

Calculates road toll costs for vehicle trips in India by matching Google Maps routes against an internal database of toll plazas. Used for logistics planning and trip cost estimation.

## Tech Stack

- Java 17, Spring Boot 3.3, MySQL, Hibernate
- Google Maps Directions API
- React, Vite
- Docker, Maven

## Interview Preparation Guide

A comprehensive **Python & DSA Interview Preparation Guide** is available in the `docs/` directory:

- **Markdown**: [`docs/python_dsa_interview_guide.md`](docs/python_dsa_interview_guide.md)
- **PDF**: [`docs/python_dsa_interview_guide.pdf`](docs/python_dsa_interview_guide.pdf)

### What's Covered

1. **Python Mastery** — internals, key modules (`collections`, `heapq`, `bisect`, `itertools`, `functools`), Pythonic patterns, common pitfalls, OOP, Big O analysis
2. **Data Structures Deep Dive** — Arrays, Strings, Linked Lists, Stacks, Queues, Hash Maps, Trees, Heaps, Graphs, Tries, Union-Find, Monotonic Stack/Queue, Segment Trees
3. **14 Algorithm Patterns** — Two Pointers, Sliding Window, Binary Search, BFS, DFS, Backtracking, Dynamic Programming, Greedy, Divide & Conquer, Topological Sort, Shortest Path, Bit Manipulation, Math, String Algorithms
4. **150+ Curated Problems** — organized by topic with difficulty, approach hints, and company frequency tags
5. **12-Week Study Plan** — daily tasks, problem-solving frameworks, mock interview tips, behavioral prep (STAR method), system design basics, resume tips
6. **Quick Reference** — complexity cheat sheets, Python syntax reference, pattern decision tree

### Regenerating the PDF

```bash
pip install markdown pdfkit
sudo apt-get install wkhtmltopdf
python docs/generate_pdf.py
```
