//📌 Bu Kod Ne İşe Yarıyor?

//Bu dosyada 3 tane farklı veri listesi (mock data / sahte veri) olarak dışarıya aktarılıyor:

//mockJobs → İş ilanları listesi

//mockCategories → Kategoriler listesi

//mockApplications → Kullanıcının iş başvuruları listesi

//Bu veriler genelde backend hazır olmadığı zaman test amaçlı kullanılır.

export const mockJobs = [
  {
    id: 1,
    title: { tr: 'Kıdemli Frontend Geliştirici', en: 'Senior Frontend Developer' },
    company: 'TechCorp',
    city: 'istanbul',
    sector: 'technology',
    description: { 
      tr: 'Modern web teknolojileri kullanarak kullanıcı dostu arayüzler geliştirmek ve takım içinde liderlik yapmak.',
      en: 'Develop user-friendly interfaces using modern web technologies and provide leadership within the team.'
    },
    requirements: {
      tr: ['5+ yıl React deneyimi', 'TypeScript bilgisi', 'Responsive tasarım uzmanlığı', 'Takım çalışmasına yatkın'],
      en: ['5+ years React experience', 'TypeScript knowledge', 'Responsive design expertise', 'Team player']
    },
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    featured: true
  },
  {
    id: 2,
    title: { tr: 'Dijital Pazarlama Uzmanı', en: 'Digital Marketing Specialist' },
    company: 'MarketPro',
    city: 'ankara',
    sector: 'marketing',
    description: { 
      tr: 'Dijital pazarlama stratejileri geliştirmek, sosyal medya yönetimi ve SEO optimizasyonu yapmak.',
      en: 'Develop digital marketing strategies, manage social media and perform SEO optimization.'
    },
    requirements: {
      tr: ['3+ yıl deneyim', 'Google Analytics bilgisi', 'SEO/SEM uzmanlığı', 'İçerik yönetimi'],
      en: ['3+ years experience', 'Google Analytics knowledge', 'SEO/SEM expertise', 'Content management']
    },
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    featured: true
  },
  {
    id: 3,
    title: { tr: 'Veri Analisti', en: 'Data Analyst' },
    company: 'DataWorks',
    city: 'izmir',
    sector: 'technology',
    description: { 
      tr: 'Büyük veri setlerini analiz etmek, raporlar hazırlamak ve iş önerileri sunmak.',
      en: 'Analyze large datasets, prepare reports and provide business recommendations.'
    },
    requirements: {
      tr: ['SQL ve Python bilgisi', 'Veri görselleştirme araçları', 'İstatistiksel analiz', 'Problem çözme'],
      en: ['SQL and Python knowledge', 'Data visualization tools', 'Statistical analysis', 'Problem solving']
    },
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    featured: false
  },
  {
    id: 4,
    title: { tr: 'İnsan Kaynakları Müdürü', en: 'Human Resources Manager' },
    company: 'HR Solutions',
    city: 'bursa',
    sector: 'finance',
    description: { 
      tr: 'İK süreçlerini yönetmek, işe alım yapmak ve çalışan gelişimini desteklemek.',
      en: 'Manage HR processes, recruitment and support employee development.'
    },
    requirements: {
      tr: ['7+ yıl İK deneyimi', 'İşe alım uzmanlığı', 'Yetenek yönetimi', 'Liderlik becerileri'],
      en: ['7+ years HR experience', 'Recruitment expertise', 'Talent management', 'Leadership skills']
    },
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    featured: true
  },
  {
    id: 5,
    title: { tr: 'UI/UX Tasarımcı', en: 'UI/UX Designer' },
    company: 'DesignHub',
    city: 'istanbul',
    sector: 'technology',
    description: { 
      tr: 'Kullanıcı deneyimi odaklı arayüz tasarımları yapmak ve prototip geliştirmek.',
      en: 'Create user experience-focused interface designs and develop prototypes.'
    },
    requirements: {
      tr: ['Figma/Sketch uzmanlığı', 'Kullanıcı araştırması', 'Prototipleme', 'Portfolyo gerekli'],
      en: ['Figma/Sketch expertise', 'User research', 'Prototyping', 'Portfolio required']
    },
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    featured: false
  },
  {
    id: 6,
    title: { tr: 'Satış Müdürü', en: 'Sales Manager' },
    company: 'SalesForce Inc',
    city: 'antalya',
    sector: 'sales',
    description: { 
      tr: 'Satış ekibini yönetmek, hedefler belirlemek ve müşteri ilişkilerini geliştirmek.',
      en: 'Manage sales team, set targets and develop customer relationships.'
    },
    requirements: {
      tr: ['5+ yıl satış deneyimi', 'CRM bilgisi', 'Müzakere becerileri', 'B2B deneyimi'],
      en: ['5+ years sales experience', 'CRM knowledge', 'Negotiation skills', 'B2B experience']
    },
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    featured: false
  },
  {
    id: 7,
    title: { tr: 'Yazılım Test Uzmanı', en: 'Software QA Engineer' },
    company: 'QualityFirst',
    city: 'ankara',
    sector: 'technology',
    description: { 
      tr: 'Yazılım kalite testleri yapmak, hataları tespit etmek ve raporlamak.',
      en: 'Perform software quality tests, identify and report bugs.'
    },
    requirements: {
      tr: ['Test otomasyon deneyimi', 'Selenium bilgisi', 'API testing', 'Detay odaklı'],
      en: ['Test automation experience', 'Selenium knowledge', 'API testing', 'Detail-oriented']
    },
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    featured: true
  },
  {
    id: 8,
    title: { tr: 'Hemşire', en: 'Registered Nurse' },
    company: 'HealthCare Plus',
    city: 'izmir',
    sector: 'health',
    description: { 
      tr: 'Hasta bakımı sağlamak, tedavi süreçlerini takip etmek ve sağlık ekibiyle koordinasyon.',
      en: 'Provide patient care, monitor treatment processes and coordinate with healthcare team.'
    },
    requirements: {
      tr: ['Hemşirelik lisansı', 'Hasta bakım deneyimi', 'İletişim becerileri', 'Vardiya çalışabilme'],
      en: ['Nursing license', 'Patient care experience', 'Communication skills', 'Shift work ability']
    },
    date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    featured: false
  }
];

export const mockCategories = [
  { id: 'technology', name: { tr: 'Teknoloji', en: 'Technology' }, count: 234, icon: '💻' },
  { id: 'finance', name: { tr: 'Finans', en: 'Finance' }, count: 156, icon: '💰' },
  { id: 'health', name: { tr: 'Sağlık', en: 'Healthcare' }, count: 89, icon: '🏥' },
  { id: 'education', name: { tr: 'Eğitim', en: 'Education' }, count: 67, icon: '📚' },
  { id: 'marketing', name: { tr: 'Pazarlama', en: 'Marketing' }, count: 123, icon: '📊' },
  { id: 'sales', name: { tr: 'Satış', en: 'Sales' }, count: 98, icon: '🎯' },
  { id: 'design', name: { tr: 'Tasarım', en: 'Design' }, count: 45, icon: '🎨' },
  { id: 'hr', name: { tr: 'İnsan Kaynakları', en: 'Human Resources' }, count: 34, icon: '👥' }
];

export const mockApplications = [
  {
    id: 1,
    title: 'Senior React Developer',
    company: 'Global Tech Corp',
    location: 'İstanbul',
    date: '12 Oct 2023',
    status: 'In Review',
    statusColor: 'yellow'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    company: 'Creative Agency',
    location: 'Remote',
    date: '05 Oct 2023',
    status: 'Interview',
    statusColor: 'green'
  },
  {
    id: 3,
    title: 'Frontend Developer',
    company: 'StartUp Inc',
    location: 'Ankara',
    date: '20 Sep 2023',
    status: 'Rejected',
    statusColor: 'red'
  }
];
