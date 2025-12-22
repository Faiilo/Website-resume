// Данные курсов (сокращенные)
const coursesData = [
    {
        id: 1,
        title: "Айтилогия: Frontend",
        platform: "Айтилогия",
        description: "Курс по обучению Фронтенду",
        skills: ["HTML", "CSS", "Angular"],
        category: "frontend",
        certificateImage: "assets/images/certificate_4.jpeg",
        certificateUrl: "https://drive.google.com/file/d/1WCcSGM1DursIHs2YewpwZslOHt_zXdIs/view?usp=sharing"
    },
    {
        id: 2,
        title: "Введение в ИИ Агенты",
        platform: "Сбер",
        description: "Изучение ИИ агентов",
        skills: ["AI"],
        category: "sber",
        certificateImage: "assets/images/certificate_5.png",
        certificateUrl: "#"
    },
    {
        id: 3,
        title: "ИИ в образовании",
        platform: "Сбер",
        description: "Как может использоваться ИИ в образовании",
        skills: ["AI"],
        category: "sber",
        certificateImage: "assets/images/certificate_6.png",
        certificateUrl: "#"
    },
    {
        id: 4,
        title: "True Tech Champ 2025",
        platform: "МТС",
        description: "Алгоритмический трек",
        skills: ["Python"],
        category: "other",
        certificateImage: "assets/images/certificate_3.png",
        certificateUrl: "#"
    },
    {
        id: 5,
        title: "Новые Медиа: SMM и digital-marketing",
        platform: "VK",
        description: "SMM и digital-маркетинг",
        skills: ["SMM"],
        category: "vk",
        certificateImage: "assets/images/certificate_7.jpg",
        certificateUrl: "#"
    },
    {
        id: 6,
        title: "Базовый HTML",
        platform: "VK",
        description: "Изучение HTML",
        skills: ["HTML", "CSS"],
        category: "vk",
        certificateImage: "assets/images/certificate_8.jpg",
        certificateUrl: "#"
    }
];

// DOM элементы
const coursesContainer = document.getElementById('coursesContainer');
const courseFilters = document.getElementById('courseFilters');
const themeToggle = document.getElementById('themeToggle');
const modal = document.getElementById('certificateModal');
const closeModal = document.querySelector('.close-modal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalLink = document.getElementById('modalLink');

// Загрузка курсов
function loadCourses(filter = 'all') {
    coursesContainer.innerHTML = '';
    
    const filteredCourses = filter === 'all' 
        ? coursesData 
        : coursesData.filter(course => course.category === filter);
    
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        card.innerHTML = `
            <div class="course-image">
                <img src="${course.certificateImage}" alt="${course.title}">
            </div>
            <div class="course-content">
                <h3>${course.title}</h3>
                <span class="course-platform">${course.platform}</span>
                <p>${course.description}</p>
                <div class="course-skills">
                    ${course.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="viewCertificate(${course.id})">
                    <i class="fas fa-certificate"></i> Сертификат
                </button>
            </div>
        `;
        
        coursesContainer.appendChild(card);
    });
}

// Фильтрация курсов
function setupFilters() {
    courseFilters.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            // Сброс активного состояния
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Активация выбранной кнопки
            e.target.classList.add('active');
            
            // Фильтрация
            const filter = e.target.dataset.filter;
            loadCourses(filter);
        }
    });
}

// Смена темы
function setupThemeToggle() {
    themeToggle.addEventListener('click', function() {
        const icon = this.querySelector('i');
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Проверка сохраненной темы
function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const icon = themeToggle.querySelector('i');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.className = 'fas fa-sun';
    }
}

// Просмотр сертификата
function viewCertificate(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;
    
    modalImage.src = course.certificateImage;
    modalImage.alt = course.title;
    modalTitle.textContent = course.title;

    modal.style.display = 'flex';
}

// Закрытие модального окна
function setupModalClose() {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
}

// Плавная навигация
function setupSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadCourses();
    setupFilters();
    setupThemeToggle();
    checkSavedTheme();
    setupModalClose();
    setupSmoothNavigation();
});