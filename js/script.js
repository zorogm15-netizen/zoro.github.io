// بيانات الروايات
const stories = [
    {
        id: 1,
        title: "نجوم الليل",
        author: "فاطمة الزهراء",
        category: "رومانسي",
        description: "قصة حب تتجاوز حدود الزمن والمكان، تجمع بين شخصين من عالمين مختلفين.",
        cover: "📖",
        fullContent: "تحت سماء مرصعة بالنجوم، التقت ياسمين بكريم لأول مرة في مكتبة قديمة بالمدينة العتيقة. لم يكن أحدهما يعلم أن هذا اللقاء العابر سيغيّر مسار حياتيهما إلى الأبد. رواية تنسج خيوط الحب والقدر في نسيج واحد، وتأخذ القارئ في رحلة عاطفية مليئة بالمفاجآت."
    },
    {
        id: 2,
        title: "ساحر القمر",
        author: "أحمد محمود",
        category: "خيال",
        description: "مغامرة سحرية في عالم مليء بالأسرار والسحر.",
        cover: "✨",
        fullContent: "في مملكة تحكمها الأقمار السبعة، يخرج الساحر الشاب إدريس في رحلة لاستعادة ضوء القمر المفقود قبل أن يبتلع الظلام الأبدي مملكته. على الطريق، يواجه مخلوقات غريبة، ويكتشف أسرارا عن نفسه لم يكن يتخيلها."
    },
    {
        id: 3,
        title: "الحقيقة المخفية",
        author: "سارة علي",
        category: "غموض",
        description: "لغز يكشف عن حقائق مرعبة تهز الأساس.",
        cover: "🔍",
        fullContent: "عندما تختفي جارتها فجأة دون أي أثر، تقرر المحققة ليلى أن تخوض تحقيقا خاصا بها، بعيدا عن أعين الشرطة. كل دليل يقودها إلى سؤال أكبر، وكل إجابة تفتح بابا لغموض جديد، إلى أن تصل إلى حقيقة لم تكن تتوقعها أبدا."
    },
    {
        id: 4,
        title: "قلب الصحراء",
        author: "محمد إبراهيم",
        category: "درامي",
        description: "دراما عميقة تلمس روح القارئ في كل صفحة.",
        cover: "🏜️",
        fullContent: "وسط رمال الصحراء الشاسعة، تنمو قصة عائلة تكافح من أجل البقاء والحفاظ على تراثها. بين الفقد والأمل، يروي الكاتب حكاية إنسانية صادقة عن الصمود والانتماء للأرض."
    }
];

// عرض قائمة الروايات
function renderStories(list) {
    const grid = document.getElementById('storiesGrid');

    if (list.length === 0) {
        grid.innerHTML = '<p class="alert alert-info">ما لقيناش أي رواية تطابق البحث ديالك.</p>';
        return;
    }

    grid.innerHTML = list.map(story => `
        <div class="story-card" onclick="openModal(${story.id})">
            <div class="cover">${story.cover}</div>
            <h3>${story.title}</h3>
            <span class="category">${story.category}</span>
            <p class="description">${story.description}</p>
            <p class="author">✍️ ${story.author}</p>
            <button class="read-btn" onclick="event.stopPropagation(); openModal(${story.id})">اقرأ المزيد</button>
        </div>
    `).join('');
}

// البحث والتصفية
function filterStories() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    const category = document.getElementById('categoryFilter').value;

    const filtered = stories.filter(story => {
        const matchesQuery = story.title.toLowerCase().includes(query) ||
                              story.author.toLowerCase().includes(query);
        const matchesCategory = category === '' || story.category === category;
        return matchesQuery && matchesCategory;
    });

    renderStories(filtered);
}

// فتح مودال تفاصيل الرواية
function openModal(id) {
    const story = stories.find(s => s.id === id);
    if (!story) return;

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="cover-large">${story.cover}</div>
        <h2>${story.title}</h2>
        <span class="category">${story.category}</span>
        <p class="author">✍️ بقلم: ${story.author}</p>
        <p>${story.fullContent}</p>
        <button class="close-btn" onclick="closeModal()">إغلاق</button>
    `;

    document.getElementById('storyModal').classList.add('show');
}

// إغلاق المودال
function closeModal() {
    document.getElementById('storyModal').classList.remove('show');
}

// إغلاق المودال عند الضغط خارج المحتوى
window.addEventListener('click', function (event) {
    const modal = document.getElementById('storyModal');
    if (event.target === modal) {
        closeModal();
    }
});

// إرسال نموذج التواصل
function submitForm(event) {
    event.preventDefault();
    const form = event.target;

    form.innerHTML = '<p class="alert alert-info">شكرا ليك! تم إرسال رسالتك بنجاح، غادي نتواصلو معاك قريبا.</p>';
}

// تشغيل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    renderStories(stories);
});
