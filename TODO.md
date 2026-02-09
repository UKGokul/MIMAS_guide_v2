# MIMAS Documentation Website (v2) - Todo List

## Phase 1 - Foundation

### Project Setup
- [ ] Set up static site generator (e.g., Jekyll, Hugo, or MkDocs)
- [ ] Configure project structure based on information architecture
- [ ] Set up navigation system with all primary sections
- [ ] Implement responsive design with scientist-centric UI
- [ ] Ensure keyboard navigation and accessibility compliance

### Home Page
- [ ] Create one-sentence MIMAS description
- [ ] Differentiate "what model is" vs "what site contains"
- [ ] Add "Start with Overview" entry button
- [ ] Add "Jump to Model Flow" entry button
- [ ] Minimize cognitive load design

### Model Overview
- [ ] Document what MIMAS simulates
- [ ] Document why MIMAS exists
- [ ] Highlight unique features:
  - [ ] Eulerian H₂O + Lagrangian particles
  - [ ] Dust recycling
  - [ ] Fixed vs evolving dynamics
- [ ] List key assumptions
- [ ] Document known limitations
- [ ] Clarify non-requirements
- [ ] Exclude code and equations (optional later)

### Model Architecture
- [ ] Create architecture diagrams
- [ ] Document grids (lat/lon/z)
- [ ] Document time stepping
- [ ] Document data sources (LIMA, climatologies)
- [ ] Distinguish background fields
- [ ] Distinguish tracer fields
- [ ] Document particle ensemble

### Model Flow (Core Feature)
- [ ] Map all 21 execution steps
- [ ] For each step, create three separated layers:
  - **What Happens Layer:**
    - [ ] Procedural description
    - [ ] No interpretation
  - **Code Layer:**
    - [ ] Subroutine references
    - [ ] Variable references
    - [ ] Call relationships
  - **Science Layer:**
    - [ ] Physical meaning
    - [ ] Why step exists
    - [ ] What breaks if removed
- [ ] Ensure strict separation between layers
- [ ] Verify no scientific interpretation contradicts code

## Phase 2 - Physics Modules

### Transport Module
- [ ] Document what is modeled
- [ ] Document how implemented
- [ ] Link to flow appearance
- [ ] Add key references

### Microphysics Module
- [ ] Document ice microphysics
- [ ] Document water vapor transport
- [ ] Document sedimentation
- [ ] Link to flow appearance
- [ ] Add key references

### Turbulence Module
- [ ] Document eddy diffusion (Kz)
- [ ] Document turbulence vs diffusion mismatch
- [ ] Link to flow appearance
- [ ] Add key references

### Additional Physics Modules
- [ ] Photolysis & solar forcing
- [ ] Dust reallocation logic

## Phase 3 - Thesis Integration

### Code Reference
- [ ] Create alphabetical subroutine list
- [ ] For each subroutine, document:
  - [ ] Purpose
  - [ ] Called by relationships
  - [ ] Calls relationships
  - [ ] Key variables
- [ ] Include code snippets only (never full files)
- [ ] Implement case-insensitive search

### Experiments & Results
- [ ] Create experiment matrix
- [ ] Document parameter variations
- [ ] List output variables
- [ ] Embed static key plots
- [ ] Add interpretation links

### Institute & People
- [ ] Write institute description
- [ ] Document department focus
- [ ] Explain scientific motivation
- [ ] List contributors with roles

### Publications
- [ ] Organize papers by category:
  - [ ] Core framework
  - [ ] Microphysics
  - [ ] Transport
  - [ ] Applications
- [ ] State what each paper contributes to MIMAS

## Non-Functional Requirements

### Performance
- [ ] Verify load time < 1s on local server
- [ ] Avoid heavy JS frameworks

### Maintainability
- [ ] Ensure content editable without touching JS
- [ ] Clear separation of data, layout, logic

### Longevity
- [ ] Use stable, non-trendy UI dependencies
- [ ] Ensure documentation makes sense 5 years later

## Future Enhancements (Out of Scope for Now)
- [ ] Running simulations backend
- [ ] NetCDF file upload functionality
- [ ] Live plotting dashboards
- [ ] User accounts system
- [ ] External reader access for NLC modeling community

## Quality Checklist
- [ ] All questions answerable in <10 seconds: "Where exactly is this physics implemented?"
- [ ] New student can explain full model flow after 1-2 days
- [ ] Website sections linkable directly in thesis
- [ ] Adding new sections doesn't require rewriting existing pages
