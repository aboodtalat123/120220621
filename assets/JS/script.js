// هذا ملف الجافاسكريبت تبع الموقع، فيه كل الحركات والوظائف اللي بتخلي الموقع يتفاعل مع المستخدم

/*==================== إظهار وإخفاء الشريط الجانبي (السايدبار) ====================*/
// بنجيب زر القائمة والسايدبار نفسه من الصفحة
const navToggle = document.getElementById('nav-toggle'); // هذا زر القائمة اللي بيظهر بالشاشات الصغيرة
const sidebar = document.getElementById('sidebar'); // هذا السايدبار اللي بنفتحه وبنسكره

// لما نضغط على زر القائمة
if (navToggle) {
    navToggle.addEventListener('click', () => {
        sidebar.classList.add('show-sidebar'); // بنضيف كلاس عشان السايدبار يظهر
    });
}

// لما نضغط على أي رابط جوا السايدبار، بنسكره
sidebar.addEventListener('click', (e) => {
    // بنتأكد إنه اللي ضغطنا عليه هو رابط جوا السايدبار
    if (e.target.closest('.nav-link-item')) { // استخدمنا الكلاس الجديد للروابط
        sidebar.classList.remove('show-sidebar'); // بنشيل الكلاس عشان السايدبار يختفي
    }
});

// لما نضغط بأي مكان برا السايدبار أو زر القائمة، بنسكره (خاصة للشاشات الصغيرة)
document.body.addEventListener('click', (e) => {
    // إذا السايدبار مفتوح، وما ضغطنا جوا السايدبار، وما ضغطنا على زر القائمة
    if (sidebar.classList.contains('show-sidebar') && !sidebar.contains(e.target) && !navToggle.contains(e.target)) {
        sidebar.classList.remove('show-sidebar'); // بنسكر السايدبار
    }
});

// لما نغير حجم الشاشة (مثلاً نكبر المتصفح)، بنتأكد إنه السايدبار مخفي لو صرنا بشاشة كبيرة
window.addEventListener('resize', () => {
    // إذا عرض الشاشة صار أكبر من أو يساوي 992 بكسل (حجم الديسكتوب)
    if (window.innerWidth >= 992) {
        sidebar.classList.remove('show-sidebar'); // بنخفي السايدبار لو كان مفتوح
    }
});

/*==================== تفعيل الرابط في القائمة حسب القسم اللي بنمرر عليه ====================*/
// بنجيب كل الأقسام اللي الها ID بالصفحة
const sections = document.querySelectorAll('section[id]');

// هاي الوظيفة بتشتغل كل ما نعمل سكرول
function scrollActive() {
    const scrollY = window.pageYOffset; // بنجيب قديه نزلنا بالصفحة

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight; // ارتفاع القسم
        // موقع بداية القسم، بننقص منه 50 بكسل عشان يكون التفعيل أبكر شوي
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id'); // الـ ID تبع القسم

        // إذا كنا جوا هذا القسم (بالسكرول)
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // بنضيف كلاس 'active' للرابط المقابل في السايدبار
            // استخدمنا الكلاس الجديد لروابط القائمة
            document.querySelector('.navigation-list-items a[href*=' + sectionId + ']').classList.add('active');
        } else {
            // وإلا، بنشيل كلاس 'active' من الرابط
            document.querySelector('.navigation-list-items a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

// بنخلي الوظيفة تشتغل كل ما نعمل سكرول
window.addEventListener('scroll', scrollActive);

/*==================== تغيير خلفية الهيدر (مش مستخدمة حالياً بس ممكن نحتاجها بعدين) ====================*/
// هاي الوظيفة حالياً ما بتعمل شي لأنه ما في هيدر منفصل بالتصميم هذا
function scrollHeader() {
    const nav = document.getElementById('header'); // بنفترض إنه في عنصر هيدر بالـ ID هذا
    // إذا نزلنا أكثر من 80 بكسل، بنضيف كلاس 'scroll-header'
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
// window.addEventListener('scroll', scrollHeader); // بنقدر نفعلها لو ضفنا هيدر

/*==================== إظهار زر الصعود لأعلى ====================*/
// بنجيب زر الصعود لأعلى الصفحة
const scrollUp = document.getElementById('scroll-up');

// هاي الوظيفة بتظهر أو بتخفي الزر
function scrollUpButton() {
    // إذا نزلنا أكثر من 350 بكسل
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll-button'); // بنضيف كلاس عشان الزر يظهر (استخدمنا الكلاس الجديد)
    } else {
        scrollUp.classList.remove('show-scroll-button'); // بنشيل الكلاس عشان الزر يختفي
    }
}

// بنخلي الوظيفة تشتغل كل ما نعمل سكرول
window.addEventListener('scroll', scrollUpButton);

/*==================== تبديل الثيم (فاتح/داكن) ====================*/
// بنجيب زر تبديل الثيم وعنصر الـ body تبع الصفحة
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// لما الصفحة تحمل، بنشوف إذا في ثيم محفوظ بالـ Local Storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme); // بنطبق الثيم اللي كان محفوظ
} else {
    // إذا ما في ثيم محفوظ، بنحط الثيم الفاتح افتراضياً
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme'); // وبنحفظه بالـ Local Storage
}

// هاي الوظيفة بتغير أيقونة زر الثيم (قمر أو شمس)
function updateThemeIcon() {
    if (body.classList.contains('dark-theme')) {
        // إذا الثيم داكن، بنغير الأيقونة للشمس
        themeToggle.classList.replace('ri-moon-line', 'ri-sun-line');
    } else {
        // إذا الثيم فاتح، بنغير الأيقونة للقمر
        themeToggle.classList.replace('ri-sun-line', 'ri-moon-line');
    }
}

// بنشغل الوظيفة أول ما الصفحة تحمل عشان الأيقونة تكون صحيحة
updateThemeIcon();

// لما نضغط على زر تبديل الثيم
themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
        // إذا كان الثيم داكن، بنحوله لفاتح
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme'); // بنحفظ التغيير
    } else {
        // وإذا كان فاتح، بنحوله لداكن
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme'); // بنحفظ التغيير
    }
    updateThemeIcon(); // بنحدث الأيقونة بعد التبديل
});

/*==================== تهيئة مكتبة AOS (الحركات عند السكرول) ====================*/
// هاي المكتبة بتعمل حركات حلوة لما نعمل سكرول بالصفحة
// لازم نكون ضايفين روابط المكتبة في ملف الـ HTML
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1200, // مدة الحركة بالمللي ثانية
        once: true, // الحركة تصير مرة واحدة بس لما نمرر عليها
    });
});
