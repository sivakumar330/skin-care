// Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            navMenu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
            
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        }
    });
});

// Image Upload and Analysis
const imageInput = document.getElementById('imageInput');
const uploadArea = document.getElementById('uploadArea');
const previewContainer = document.getElementById('previewContainer');
const resultsSection = document.getElementById('resultsSection');

if (imageInput && uploadArea && previewContainer && resultsSection) {
    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });

    function highlight() {
        uploadArea.style.borderColor = '#ff416c';
        uploadArea.style.transform = 'scale(1.02)';
    }

    function unhighlight() {
        uploadArea.style.borderColor = '#6a11cb';
        uploadArea.style.transform = 'scale(1)';
    }

    uploadArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    imageInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (!files.length) return;
        
        const file = files[0];
        if (!file.type.match('image.*')) {
            alert('Please upload an image file (JPG, PNG, WEBP)');
            return;
        }
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            previewContainer.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded Image">
                <div class="upload-status">
                    <i class="fas fa-check-circle"></i> Image uploaded successfully
                </div>
            `;
            
            // Automatically analyze image
            simulateAnalysis(file);
        };
        reader.readAsDataURL(file);
    }

    // Simulated AI Analysis
    function simulateAnalysis(file) {
        // Show loading animation
        const resultsContent = resultsSection.querySelector('.results-content');
        if (resultsContent) {
            resultsContent.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>AI is analyzing your image...</p>
                </div>
            `;
        }
        
        // Simulate processing delay
        setTimeout(() => {
            const diseases = [
                { name: "Acne Vulgaris", confidence: 92, severity: "Moderate", urgency: "Medium", risk: "Low" },
                { name: "Eczema (Atopic Dermatitis)", confidence: 85, severity: "Mild", urgency: "Low", risk: "Medium" },
                { name: "Psoriasis", confidence: 78, severity: "Severe", urgency: "High", risk: "High" },
                { name: "Rosacea", confidence: 88, severity: "Mild", urgency: "Low", risk: "Low" },
                { name: "Contact Dermatitis", confidence: 82, severity: "Mild", urgency: "Low", risk: "Low" }
            ];
            
            const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
            
            // Update results
            const primaryCondition = document.getElementById('primaryCondition');
            const confidenceFill = document.getElementById('confidenceFill');
            const confidenceText = document.getElementById('confidenceText');
            const severityLevel = document.getElementById('severityLevel');
            const urgencyLevel = document.getElementById('urgencyLevel');
            const riskFactor = document.getElementById('riskFactor');
            const recommendationsList = document.getElementById('recommendationsList');
            
            if (primaryCondition) primaryCondition.textContent = randomDisease.name;
            if (confidenceFill) confidenceFill.style.width = `${randomDisease.confidence}%`;
            if (confidenceText) confidenceText.textContent = `Confidence: ${randomDisease.confidence}%`;
            if (severityLevel) severityLevel.textContent = randomDisease.severity;
            if (urgencyLevel) urgencyLevel.textContent = randomDisease.urgency;
            if (riskFactor) riskFactor.textContent = randomDisease.risk;
            
            // Generate recommendations based on disease
            const recommendations = {
                "Acne Vulgaris": [
                    "Consult a dermatologist within 1-2 weeks",
                    "Avoid picking or squeezing pimples",
                    "Use non-comedogenic skincare products",
                    "Wash face twice daily with gentle cleanser",
                    "Consider over-the-counter benzoyl peroxide or salicylic acid"
                ],
                "Eczema (Atopic Dermatitis)": [
                    "Consult a dermatologist soon",
                    "Apply moisturizer immediately after bathing",
                    "Use fragrance-free skincare products",
                    "Avoid scratching affected areas",
                    "Use lukewarm water instead of hot water"
                ],
                "Psoriasis": [
                    "Consult a dermatologist urgently",
                    "Use medicated shampoos for scalp psoriasis",
                    "Apply topical corticosteroids as prescribed",
                    "Avoid triggers like stress and alcohol",
                    "Consider phototherapy treatment"
                ],
                "Rosacea": [
                    "Consult a dermatologist soon",
                    "Identify and avoid triggers (spicy food, alcohol)",
                    "Use gentle, fragrance-free skincare",
                    "Apply sunscreen daily",
                    "Consider prescribed topical treatments"
                ],
                "Contact Dermatitis": [
                    "Consult a dermatologist if condition worsens",
                    "Identify and avoid irritants/allergens",
                    "Use hypoallergenic products",
                    "Apply cool compresses to affected areas",
                    "Use over-the-counter hydrocortisone cream"
                ]
            };
            
            const diseaseRecs = recommendations[randomDisease.name] || [
                "Consult a dermatologist for proper diagnosis",
                "Avoid scratching or picking at the affected area",
                "Use gentle, fragrance-free skincare products",
                "Monitor for changes in size, shape, or color",
                "Take photos to track progression"
            ];
            
            if (recommendationsList) {
                recommendationsList.innerHTML = diseaseRecs
                    .map(rec => `<li><i class="fas fa-check-circle"></i> ${rec}</li>`)
                    .join('');
            }
            
            // Show save report button
            const saveReportBtn = document.getElementById('saveReportBtn');
            if (saveReportBtn) {
                saveReportBtn.style.display = 'block';
            }
        }, 2000);
    }

    // Save Report
    const saveReportBtn = document.getElementById('saveReportBtn');
    if (saveReportBtn) {
        saveReportBtn.addEventListener('click', () => {
            const primaryCondition = document.getElementById('primaryCondition').textContent;
            const confidenceText = document.getElementById('confidenceText').textContent;
            const severityLevel = document.getElementById('severityLevel').textContent;
            const urgencyLevel = document.getElementById('urgencyLevel').textContent;
            const riskFactor = document.getElementById('riskFactor').textContent;
            
            const reportContent = `
DermAI Skin Analysis Report
============================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

Primary Condition: ${primaryCondition}
${confidenceText}
Severity: ${severityLevel}
Urgency: ${urgencyLevel}
Risk Factor: ${riskFactor}

Recommendations:
${Array.from(document.querySelectorAll('#recommendationsList li'))
    .map(li => li.textContent)
    .join('\n')}

Disclaimer: This report is for informational purposes only.
Please consult a healthcare professional for proper diagnosis.
            `;
            
            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `DermAI_Report_${Date.now()}.txt`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            // Show success message
            alert('Report downloaded successfully!');
        });
    }
}

// Diseases Database


const diseasesData = [
  {
    id: 1,
    name: "Acne Vulgaris",
    category: "common",
    severity: "Moderate",
    image: "img/1.jpg",
    description: "Inflammatory skin condition with comedones, papules, and pustules.",
    tags: ["Common", "Teenagers", "Face"]
  },
  {
    id: 2,
    name: "Eczema (Atopic Dermatitis)",
    category: "chronic",
    severity: "Mild-Severe",
    image: "img/2.jpg",
    description: "Chronic inflammatory condition causing dry, itchy, red skin.",
    tags: ["Chronic", "Itchy", "Allergy"]
  },
  {
    id: 3,
    name: "Psoriasis",
    category: "chronic",
    severity: "Severe",
    image: "img/3.webp",
    description: "Autoimmune condition causing rapid skin cell buildup.",
    tags: ["Autoimmune", "Scaly", "Chronic"]
  },
  {
    id: 4,
    name: "Melanoma",
    category: "cancer",
    severity: "Critical",
    image: "img/4.jpg",
    description: "Most dangerous form of skin cancer caused by uncontrolled melanocyte growth.",
    tags: ["Cancer", "Urgent", "Mole"]
  },
  {
    id: 5,
    name: "Rosacea",
    category: "common",
    severity: "Mild",
    image: "img/5.jpg",
    description: "Chronic facial skin disorder causing redness and visible blood vessels.",
    tags: ["Face", "Redness", "Adult"]
  },
  {
    id: 6,
    name: "Contact Dermatitis",
    category: "allergy",
    severity: "Mild",
    image: "img/6.webp",
    description: "Allergic or irritant reaction causing itchy, red rashes on skin.",
    tags: ["Allergy", "Rash", "Itchy"]
  },

  /* 🔽 NEW SKIN DISEASES (7–12) */

  {
    id: 7,
    name: "Vitiligo",
    category: "chronic",
    severity: "Mild",
    image: "img/11.jpg",
    description: "Autoimmune disorder causing loss of skin pigment in patches.",
    tags: ["Autoimmune", "Pigment Loss", "Chronic"]
  },
  {
    id: 8,
    name: "Alopecia Areata",
    category: "chronic",
    severity: "Moderate",
    image: "img/7.webp",
    description: "Autoimmune condition leading to sudden hair loss in round patches.",
    tags: ["Hair Loss", "Autoimmune", "Scalp"]
  },
  {
    id: 9,
    name: "Urticaria (Hives)",
    category: "allergy",
    severity: "Mild",
    image: "img/12.jpg",
    description: "Allergic reaction causing raised, itchy welts on the skin.",
    tags: ["Allergy", "Itchy", "Swelling"]
  },
  {
    id: 10,
    name: "Herpes Zoster (Shingles)",
    category: "infectious",
    severity: "Severe",
    image: "img/8.jpeg",
    description: "Viral infection causing painful skin rash and blisters.",
    tags: ["Viral", "Painful", "Infectious"]
  },
  {
    id: 11,
    name: "Tinea Corporis (Ringworm)",
    category: "infectious",
    severity: "Mild",
    image: "img/9.jpg",
    description: "Fungal infection producing ring-shaped itchy rashes on skin.",
    tags: ["Fungal", "Itchy", "Contagious"]
  },
  {
    id: 12,
    name: "Impetigo",
    category: "infectious",
    severity: "Moderate",
    image: "img/10.jpg",
    description: "Highly contagious bacterial skin infection common in children.",
    tags: ["Bacterial", "Contagious", "Children"]
  }
];



const diseasesGrid = document.getElementById('diseasesGrid');
const categoryBtns = document.querySelectorAll('.category-btn');
const diseaseSearch = document.getElementById('diseaseSearch');
const loadMoreBtn = document.getElementById('loadMoreBtn');

let currentCategory = 'all';
let displayedCount = 6;

function renderDiseases() {
    if (!diseasesGrid) return;
    
    const searchTerm = diseaseSearch ? diseaseSearch.value.toLowerCase() : '';
    
    const filteredDiseases = diseasesData.filter(disease => {
        const matchesCategory = currentCategory === 'all' || disease.category === currentCategory;
        const matchesSearch = disease.name.toLowerCase().includes(searchTerm) || 
                            disease.description.toLowerCase().includes(searchTerm) ||
                            disease.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        return matchesCategory && matchesSearch;
    });
    
    const diseasesToShow = filteredDiseases.slice(0, displayedCount);
    
diseasesGrid.innerHTML = diseasesToShow.map(disease => `
  <div class="disease-card animate-on-scroll">
    
    <div class="disease-image"
      style="
        background-image: url('${disease.image}');
        background-size: cover;
        background-position: center;
      ">
      
      <div class="disease-badge"
        style="background:${getCategoryColor(disease.category)}">
        ${disease.category.toUpperCase()}
      </div>
    </div>

    <div class="disease-content">
      <h3>${disease.name}</h3>
      <p>${disease.description}</p>

      <div class="disease-tags">
        ${disease.tags.map(tag =>
          `<span class="disease-tag">${tag}</span>`
        ).join("")}
        <span class="disease-tag">${disease.severity}</span>
      </div>
    </div>

  </div>
`).join("");

    
    if (loadMoreBtn) {
        loadMoreBtn.style.display = displayedCount >= filteredDiseases.length ? 'none' : 'block';
    }
    
    // Trigger animation
    setTimeout(() => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

function getCategoryColor(category) {
    const colors = {
        common: '#4CAF50',
        infectious: '#FF9800',
        chronic: '#9C27B0',
        cancer: '#F44336',
        allergy: '#2196F3'
    };
    return colors[category] || '#607D8B';
}

function getDiseaseIcon(category) {
    const icons = {
        common: 'virus',
        infectious: 'biohazard',
        chronic: 'allergies',
        cancer: 'skull-crossbones',
        allergy: 'exclamation-triangle'
    };
    return icons[category] || 'disease';
}

// Category filtering
if (categoryBtns) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            displayedCount = 6;
            renderDiseases();
        });
    });
}

// Search functionality
if (diseaseSearch) {
    diseaseSearch.addEventListener('input', () => {
        displayedCount = 6;
        renderDiseases();
    });
}

// Load more
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        displayedCount += 6;
        renderDiseases();
    });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Validate
        if (!data.name || !data.email || !data.message) {
            alert('Please fill all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will respond within 24 hours.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderDiseases();
    checkScroll();
    
    // Add floating particles
    createParticles();
});

function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.2 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 8 + 8}s linear infinite;
            z-index: 0;
        `;
        hero.appendChild(particle);
    }
    
    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Add active class to nav links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});




