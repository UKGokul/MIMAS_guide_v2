// MIMAS Documentation Website - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    initMobileMenu();
    
    // Sidebar navigation highlighting
    initSidebarNav();
    
    // Search functionality
    initSearch();
    
    // Accordion functionality
    initAccordion();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Layer toggle (if needed)
    initLayerToggle();

    // Load full Fortran subroutines in code reference page
    initCodeReferenceSnippets();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.getElementById('main-nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = menuBtn.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transition = 'all 0.3s ease';
            });
        });
        
        // Close menu when clicking on a link
        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
            });
        });
    }
}

/**
 * Sidebar Navigation Highlighting
 */
function initSidebarNav() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.main-column section[id]');
    
    if (sidebarLinks.length === 0 || sections.length === 0) return;
    
    // Get all sidebar links that are for sections (not alphabet nav)
    const contentLinks = Array.from(sidebarLinks).filter(link => {
        return link.getAttribute('href') && link.getAttribute('href').startsWith('#');
    });
    
    if (contentLinks.length === 0) return;
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all sidebar links
                contentLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding sidebar link
                const activeLink = document.querySelector(`.sidebar-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Search Functionality
 */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const subroutineEntries = document.querySelectorAll('.subroutine-entry');
    
    if (!searchInput || subroutineEntries.length === 0) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        subroutineEntries.forEach(entry => {
            const name = entry.getAttribute('data-name') || '';
            const text = entry.textContent.toLowerCase();
            
            if (searchTerm === '' || text.includes(searchTerm)) {
                entry.style.display = '';
            } else {
                entry.style.display = 'none';
            }
        });
    });
}

/**
 * Accordion Functionality
 */
function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isActive = content.classList.contains('active');
            
            // Close all other accordion items
            document.querySelectorAll('.accordion-content').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                content.classList.add('active');
            }
            
            // Update arrow icon
            const arrow = this.querySelector('span:last-child');
            if (arrow) {
                arrow.textContent = isActive ? '▼' : '▲';
            }
        });
    });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Layer Toggle (Show/Hide layers in Model Flow)
 */
function initLayerToggle() {
    // Create layer toggle buttons if they don't exist
    const flowSections = document.querySelectorAll('.flow-step');
    
    if (flowSections.length === 0) return;
    
    // Check if toggle buttons already exist
    if (document.querySelector('.layer-toggle')) return;
    
    // Create toggle container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'layer-toggle';
    toggleContainer.style.cssText = `
        display: flex;
        gap: var(--spacing-sm);
        justify-content: center;
        margin: var(--spacing-lg) 0;
        flex-wrap: wrap;
    `;
    
    toggleContainer.innerHTML = `
        <button class="btn btn-outline" data-layer="what" style="font-size: 0.85rem;">
            <span class="layer-badge layer-what">What</span> Toggle
        </button>
        <button class="btn btn-outline" data-layer="code" style="font-size: 0.85rem;">
            <span class="layer-badge layer-code">Code</span> Toggle
        </button>
        <button class="btn btn-outline" data-layer="science" style="font-size: 0.85rem;">
            <span class="layer-badge layer-science">Science</span> Toggle
        </button>
        <button class="btn btn-primary" data-layer="all" style="font-size: 0.85rem;">
            Show All
        </button>
    `;
    
    // Insert toggle before first flow step or after hero
    const hero = document.querySelector('.hero');
    const mainColumn = document.querySelector('.main-column');
    
    if (hero && mainColumn) {
        hero.after(toggleContainer);
    }
    
    // Add event listeners to toggle buttons
    toggleContainer.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', function() {
            const layer = this.getAttribute('data-layer');
            toggleLayers(layer);
            
            // Update button states
            toggleContainer.querySelectorAll('button').forEach(b => {
                b.classList.remove('btn-primary');
                b.classList.add('btn-outline');
            });
            
            if (layer !== 'all') {
                this.classList.remove('btn-outline');
                this.classList.add('btn-primary');
            } else {
                toggleContainer.querySelector('[data-layer="all"]').classList.remove('btn-outline');
                toggleContainer.querySelector('[data-layer="all"]').classList.add('btn-primary');
            }
        });
    });
}

/**
 * Toggle visibility of flow layers
 */
function toggleLayers(layer) {
    const layers = document.querySelectorAll('.flow-layer');
    
    layers.forEach(l => {
        if (layer === 'all') {
            l.style.display = '';
        } else if (l.classList.contains(layer)) {
            l.style.display = '';
        } else {
            l.style.display = 'none';
        }
    });
}

/**
 * Animate elements on scroll
 */
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Copy code snippet to clipboard
 */
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'Copy';
        copyBtn.style.cssText = `
            position: absolute;
            top: var(--spacing-sm);
            right: var(--spacing-sm);
            padding: var(--spacing-xs) var(--spacing-sm);
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', async function() {
            const code = block.querySelector('code');
            if (code) {
                try {
                    await navigator.clipboard.writeText(code.textContent);
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            }
        });
    });
}

/**
 * Load complete subroutines from mimas_A_2014.f into code blocks.
 * Falls back to embedded snippet text if the source file is unavailable.
 */
async function initCodeReferenceSnippets() {
    const subroutineEntries = document.querySelectorAll('.subroutine-entry[data-name]');
    if (subroutineEntries.length === 0) return;

    try {
        const response = await fetch('mimas_A_2014.f');
        if (!response.ok) return;

        const source = await response.text();
        const subroutines = extractFortranSubroutines(source);

        subroutineEntries.forEach(entry => {
            const subroutineName = (entry.getAttribute('data-name') || '').toLowerCase();
            const codeElement = entry.querySelector('.code-block code');
            if (!subroutineName || !codeElement) return;

            const fullCode = subroutines[subroutineName];
            if (fullCode) {
                codeElement.textContent = fullCode;
            }
        });
    } catch (error) {
        // Ignore fetch/parse errors and keep existing embedded snippet text.
    }
}

/**
 * Extract Fortran subroutine blocks keyed by subroutine name.
 */
function extractFortranSubroutines(sourceText) {
    const lines = sourceText.split(/\r?\n/);
    const subroutines = {};
    const startRegex = /^\s*subroutine\s+([a-z0-9_]+)/i;
    const endRegex = /^\s*end\s*(?:subroutine\b(?:\s+[a-z0-9_]+)?\s*)?$/i;

    let activeName = null;
    let activeStart = -1;

    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        const startMatch = line.match(startRegex);

        if (startMatch) {
            if (activeName !== null && activeStart >= 0) {
                subroutines[activeName] = lines.slice(activeStart, i).join('\n');
            }

            activeName = startMatch[1].toLowerCase();
            activeStart = i;
            continue;
        }

        if (activeName !== null && endRegex.test(line)) {
            subroutines[activeName] = lines.slice(activeStart, i + 1).join('\n');
            activeName = null;
            activeStart = -1;
        }
    }

    if (activeName !== null && activeStart >= 0) {
        subroutines[activeName] = lines.slice(activeStart).join('\n');
    }

    return subroutines;
}

// Initialize copy buttons
document.addEventListener('DOMContentLoaded', initCodeCopy);
