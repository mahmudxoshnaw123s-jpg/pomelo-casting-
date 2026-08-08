export const nav = [
  { label: 'من نحن', href: '#about' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'أعمالنا', href: '#work' },
  { label: 'المقالات', href: '#insights' },
  { label: 'الأسئلة الشائعة', href: '#faq' },
  { label: 'تواصل معنا', href: '#contact' },
]

export const hero = {
  eyebrow: 'وكالة كاستينغ المواهب والعارضين',
  headlineLead: 'نحن نجد',
  rotatingWords: ['الوجوه', 'العارضين', 'الممثلين', 'المبدعين'],
  headlineTail: 'خلف العلامة التجارية.',
  subhead:
    'تربط Pomelo Casting العلامات التجارية والوكالات وشركات الإنتاج بالمواهب المناسبة — عارضين وممثلين ومبدعين يمنحون الحملات الإعلانية حياة حقيقية.',
  cta: 'ابدأ الكاستينغ',
}

export const marquee = ['عارضين', 'ممثلين', 'مبدعين', 'مواهب', 'تحريري', 'حملات']

export const about = {
  label: 'من نحن',
  heading: 'كاستينغ بعين تبحث عن التوافق الصحيح، لا الوجه الصحيح فقط.',
  body: 'Pomelo Casting وكالة مواهب قامت على فكرة واحدة: الشخص المناسب هو من يصنع نجاح الحملة. نعمل مع العلامات التجارية والوكالات وفرق الإنتاج لاستقطاب وفحص وتوظيف العارضين والممثلين والمبدعين لجلسات التصوير والحملات والإنتاجات على اختلاف أحجامها.',
  stats: [
    { value: 30, suffix: '+', label: 'موهبة تم توظيفها' },
    { value: 20, suffix: '+', label: 'علامة تجارية خدمناها' },
  ],
}

export const services = {
  label: 'خدماتنا',
  heading: 'ماذا نقدم',
  subhead: 'أربع طرق نوصل من خلالها الموهبة المناسبة أمام الكاميرا المناسبة.',
  items: [
    {
      title: 'كاستينغ المواهب',
      slug: 'talent-casting',
      icon: 'spotlight',
      description: 'استقطاب وفحص العارضين والممثلين والمبدعين بما يتوافق مع متطلبات مشروعك.',
      overview:
        'نبدأ بمتطلبات مشروعك، ثم نبحث في قائمة مواهبنا وشبكتنا المفتوحة لبناء قائمة مختصرة تتوافق فعلاً مع احتياجك — ليس فقط صوراً جذابة، بل أشخاصاً يمتلكون الطاقة والتوافر والخبرة المناسبة للمشروع.',
      workflow: [
        'استلام تفاصيل المشروع ومكالمة تحديد النطاق',
        'الاستقطاب من قائمة المواهب والدعوات المفتوحة',
        'مراجعة داخلية للقائمة المختصرة',
        'تسليم القائمة المختصرة للعميل',
        'تنسيق الاستدعاءات',
      ],
      deliverables: ['قائمة مواهب مختصرة ومنسقة مع ملفات الأعمال', 'تأكيد التوافر والأجور', 'دعم في جدولة الاستدعاءات'],
      timeline: '3 إلى 7 أيام عمل',
      tools: ['قاعدة بيانات المواهب', 'ملفات أعمال رقمية', 'مراجعة فيديو للاستدعاءات'],
      relatedWork: ['نبحث عن وجوه جديدة'],
    },
    {
      title: 'كاستينغ الحملات والتصوير التحريري',
      slug: 'campaign-editorial-casting',
      icon: 'hanger',
      description: 'إدارة كاملة لعمليات الكاستينغ لجلسات تصوير الأزياء والإعلانات والحملات التجارية.',
      overview:
        'في أعمال الحملات والتصوير التحريري، نُدير الكاستينغ من الألف إلى الياء — من استلام تفاصيل المشروع، إلى الاستقطاب، وقياسات الملابس، والحضور في موقع التصوير كنقطة تواصل مع المواهب، ليتفرغ فريقكم الإبداعي للتصوير.',
      workflow: [
        'مواءمة الرؤية الإبداعية',
        'استقطاب حسب دفتر الأزياء (لوك بوك)',
        'اختيار واعتماد العميل',
        'قياسات الملابس والتأكيدات',
        'تنسيق المواهب في موقع التصوير',
      ],
      deliverables: ['قائمة مختصرة متوافقة مع الستايل المطلوب', 'جدول قياسات الملابس', 'إقرارات موقعة من المواهب', 'دعم في موقع التصوير'],
      timeline: 'أسبوع إلى أسبوعين',
      tools: ['مطابقة لوحة الإلهام (مود بورد)', 'عقود رقمية', 'تنظيم لوجستيات القياسات'],
      relatedWork: ['ظهور تحريري'],
    },
    {
      title: 'كاستينغ الإنتاج',
      slug: 'production-casting',
      icon: 'clapper',
      description: 'توظيف المواهب لإنتاجات السينما والتلفزيون والفيديو.',
      overview:
        'من أدوار الكومبارس إلى الأدوار الرئيسية، نقوم بالكاستينغ لإنتاجات السينما والتلفزيون والفيديوهات الترويجية — وننسق التجارب الأدائية وتسجيلاتها والجدولة وفق الجدول الزمني لإنتاجكم.',
      workflow: ['مراجعة تفاصيل الأدوار', 'جمع تسجيلات التجارب الأدائية', 'جولات استدعاء مع المخرج', 'اعتماد العقود والجدول الزمني'],
      deliverables: ['تسجيلات التجارب الأدائية', 'قائمة مختصرة للاستدعاء', 'عقود موقعة', 'جدول زمني جاهز للتصوير'],
      timeline: 'أسبوعان إلى 4 أسابيع، حسب حجم المشروع',
      tools: ['مراجعة تسجيلات ذاتية', 'تنسيق الجدولة', 'إدارة العقود'],
      relatedWork: ['في موقع التصوير'],
    },
    {
      title: 'إدارة المواهب',
      slug: 'talent-management',
      icon: 'star',
      description: 'تمثيل مستمر ودعم في الحجوزات لمواهب قائمتنا.',
      overview:
        'بالنسبة للمواهب المسجلة لدينا، نتولى التمثيل المستمر — من إيجاد الفرص المناسبة، إلى التفاوض على الحجوزات، وإدارة العلاقة مع العلامات التجارية وشركات الإنتاج على المدى الطويل.',
      workflow: ['الانضمام إلى قائمة المواهب', 'مطابقة الفرص المناسبة', 'التفاوض على الحجوزات', 'دعم مستمر للمسيرة المهنية'],
      deliverables: ['فرص حجز', 'عقود متفاوض عليها', 'إرشاد مهني'],
      timeline: 'مستمر',
      tools: ['إدارة قائمة المواهب', 'مسار الحجوزات', 'علاقات مباشرة مع العلامات التجارية'],
      relatedWork: ['خلف الكواليس'],
    },
  ],
}

export const work = {
  label: 'أعمالنا',
  heading: 'أعمال مختارة',
  items: [
    {
      title: 'نبحث عن وجوه جديدة',
      tag: 'دعوة كاستينغ',
      description: 'حملة دعوة مفتوحة لاستقطاب مواهب جديدة للتقديم على مشاريع قادمة.',
      image: 'work-casting-call.jpg',
    },
    {
      title: 'ظهور تحريري',
      tag: 'صحافة',
      description: 'ظهور Pomelo Casting في تغطيات تحريرية مطبوعة ورقمية.',
      image: 'work-press-feature.jpg',
    },
    {
      title: 'في موقع التصوير',
      tag: 'إنتاج',
      description: 'خلف لوحة الكلاكيت في تصوير إنتاجي لـ Pomelo Casting.',
      image: 'work-on-set.jpg',
    },
    {
      title: 'خلف الكواليس',
      tag: 'خطوات العمل',
      description: 'شرائح تجارب، لوحات إلهام، وفناجين قهوة — نظرة على كيفية عملنا في الكاستينغ.',
      image: 'work-behind-scenes.jpg',
    },
  ],
}

export const contact = {
  label: 'تواصل معنا',
  heading: 'لنبدأ الكاستينغ لمشروعك القادم.',
  subhead: 'أخبرنا عن تفاصيل مشروعك — نرد عادة خلال يوم عمل واحد.',
  email: 'support@pomeloagency.com',
  phoneDisplay: '+964 750 765 7877',
  phoneHref: 'tel:+9647507657877',
  whatsappHref: 'https://wa.me/9647507657877',
  address: 'عنكاوا، شارع 120 متر، أربيل، إقليم كردستان، العراق',
  mapPlaceName: 'Pomelo Agency',
  mapCoords: { lat: 36.2409381, lng: 43.9977745 },
  instagramHandle: '@pomelo.casting',
  instagramHref: 'https://www.instagram.com/pomelo.casting',
  hours: [
    { day: 'السبت – الخميس', time: '9:00 صباحاً – 5:00 مساءً' },
    { day: 'الجمعة', time: 'مغلق' },
  ],
  subjects: ['استفسار عن كاستينغ', 'تقديم كموهبة', 'شراكة مع علامة تجارية', 'صحافة', 'أخرى'],
  faq: [
    {
      question: 'كيف يمكنني التقديم للانضمام إلى Pomelo Casting؟',
      answer:
        'قدّم طلبك عبر نموذجنا الإلكتروني مع بيانات التواصل والمقاسات وصور حديثة طبيعية لك. يراجع فريقنا كل طلب بعناية.',
    },
    {
      question: 'هل أحتاج إلى صور احترافية للتقديم؟',
      answer:
        'لا. تكفي صور واضحة وطبيعية مُلتقطة بإضاءة جيدة للتقديم الأولي. لا حاجة لصور احترافية من ملف أعمال في هذه المرحلة.',
    },
    {
      question: 'هل أحتاج إلى خبرة سابقة في عرض الأزياء؟',
      answer:
        'ليس بالضرورة. نرحب بالمحترفين ذوي الخبرة وبالوجوه الجديدة الواعدة على حد سواء. نبحث عن الإمكانات والاحترافية والملاءمة لمشاريع عملائنا.',
    },
    {
      question: 'ماذا يحدث بعد تقديم طلبي؟',
      answer:
        'إذا كان ملفك يتوافق مع احتياجاتنا الحالية، سيتواصل معك أحد أعضاء فريقنا بخصوص الخطوات التالية، والتي قد تشمل مقابلة أو صوراً إضافية.',
    },
    {
      question: 'هل هناك رسوم للتقديم أو الانضمام إلى Pomelo Casting؟',
      answer:
        'لا. التقديم إلى Pomelo Casting مجاني بالكامل. الوكالات ذات السمعة الجيدة لا تفرض عادة أي رسوم تقديم أو تسجيل مقابل النظر في طلب التمثيل.',
    },
  ],
}

export const insights = {
  label: 'المقالات',
  heading: 'قصص من الاستديو',
  subhead: 'نصائح كاستينغ، ملاحظات من خلف الكواليس، ورؤى من فريق Pomelo.',
  featured: {
    title: 'ما الذي نبحث عنه فعلاً في دعوة الكاستينغ',
    excerpt:
      'الكاستينغ الناجح لا يتعلق بأكثر صورة لافتة — بل بالتوافق. إليك كيف يقيّم مخرجونا الطلبات قبل أن تبدأ أي تجربة أداء.',
    category: 'نصائح كاستينغ',
    author: 'فريق Pomelo',
    date: '24 يونيو 2026',
    readTime: 'قراءة 6 دقائق',
    image: 'work-on-set.jpg',
  },
  posts: [
    {
      title: '5 أشياء يجب تجهيزها قبل تجربة أدائك الأولى',
      excerpt: 'من أساسيات الملابس إلى طريقة دخولك إلى الغرفة — تفاصيل صغيرة تغيّر الطريقة التي يراك بها مخرج الكاستينغ.',
      category: 'للمواهب',
      author: 'ليلى حسن',
      date: '12 يونيو 2026',
      readTime: 'قراءة 4 دقائق',
      image: 'work-casting-call.jpg',
    },
    {
      title: 'خلف العدسة: كاستينغ لظهور تحريري',
      excerpt: 'نظرة على كيفية استقطابنا واختيارنا للمواهب لتغطية صحفية إقليمية حديثة، من البداية إلى النهاية.',
      category: 'خلف الكواليس',
      author: 'فريق Pomelo',
      date: '28 مايو 2026',
      readTime: 'قراءة 5 دقائق',
      image: 'work-press-feature.jpg',
    },
    {
      title: 'لماذا يفوز الكاستينغ الأصيل بالحملات',
      excerpt: 'يستطيع الجمهور تمييز عندما لا يتناسب الوجه مع العلامة التجارية. إليك لماذا ندفع العلامات التجارية نحو الأصالة بدلاً من المألوف.',
      category: 'الصناعة',
      author: 'أحمد كريم',
      date: '14 مايو 2026',
      readTime: 'قراءة 7 دقائق',
      image: 'hero-crosswalk-purple.jpg',
    },
    {
      title: 'بناء ملف أعمال يحصل فعلاً على فرص عمل',
      excerpt: 'ما يتجاهله مخرجو الكاستينغ، وما الذي يجعلهم يتوقفون عن التمرير. دليل عملي للمواهب الجديدة.',
      category: 'للمواهب',
      author: 'ليلى حسن',
      date: '30 أبريل 2026',
      readTime: 'قراءة 5 دقائق',
      image: 'hero-crosswalk-blue.jpg',
    },
    {
      title: 'من أربيل إلى الخارج: الكاستينغ عبر المنطقة',
      excerpt: 'كيف ننسق عمليات كاستينغ في مدن متعددة، وما الذي يجب أن تعرفه العلامات التجارية قبل حجز مواهب عبر الحدود.',
      category: 'الصناعة',
      author: 'فريق Pomelo',
      date: '9 أبريل 2026',
      readTime: 'قراءة 6 دقائق',
      image: 'work-behind-scenes.jpg',
    },
    {
      title: 'داخل عمليتنا: من تفاصيل المشروع إلى القائمة المختصرة',
      excerpt: 'شرح شفاف لما يحدث في الأيام الفاصلة بين استلام تفاصيل مشروع العميل وإصدار القائمة المختصرة.',
      category: 'خطوات العمل',
      author: 'أحمد كريم',
      date: '22 مارس 2026',
      readTime: 'قراءة 4 دقائق',
      image: 'work-on-set.jpg',
    },
  ],
}

export const faqSection = {
  label: 'الأسئلة الشائعة',
  heading: 'أسئلة شائعة',
  subhead: 'كل ما تسأل عنه العلامات التجارية عادة قبل بدء مشروع معنا.',
  items: [
    {
      question: 'كيف أحجز مواهب مع Pomelo Casting؟',
      answer:
        'ببساطة أرسل لنا تفاصيل مشروعك عبر نموذج التواصل أو الحجز لدينا. أضف تفاصيل حملتك والتواريخ والموقع ومتطلبات المواهب، وسيقوم فريقنا باختيار المواهب الأنسب لمشروعك.',
    },
    {
      question: 'ما أنواع المشاريع التي تقدمون لها خدمات الكاستينغ؟',
      answer:
        'نقدم خدمات الكاستينغ لحملات الأزياء، والتصوير التحريري، والإنتاجات التجارية، والتجارة الإلكترونية، وحملات مستحضرات التجميل، ومحتوى وسائل التواصل الاجتماعي، والفعاليات، والإنتاجات الإبداعية.',
    },
    {
      question: 'ما مدى سرعة تزويدنا بخيارات كاستينغ؟',
      answer:
        'حسب تعقيد مشروعك، نقدم عادةً قائمة مختصرة ومنتقاة خلال أيام عمل قليلة، مع تركيزنا على الجودة أكثر من الكمية.',
    },
    {
      question: 'هل يمكنكم توفير مواهب للإنتاجات الدولية؟',
      answer:
        'نعم. ندعم الإنتاجات المحلية والدولية، ونعمل عن قرب مع العملاء لتنسيق المواهب لحملات في أسواق مختلفة.',
    },
    {
      question: 'هل تديرون عملية الكاستينغ من البداية إلى النهاية؟',
      answer:
        'نعم. من فهم رؤيتكم الإبداعية إلى اختيار المواهب والجدولة والتنسيق والحجوزات النهائية، ندير عملية الكاستينغ بأكملها لضمان تجربة سلسة.',
    },
  ],
}

export const footer = {
  line: `© ${new Date().getUTCFullYear()} Pomelo Casting. جميع الحقوق محفوظة.`,
}

export const featuredTalent = {
  label: 'المواهب',
  heading: 'وجوه جاهزة لحملتك القادمة.',
  subhead: 'لمحة عن المواهب والأعمال التحريرية وأجواء الاستديو خلف كل كاستينغ من Pomelo.',
  images: [
    { image: 'talent-feature-press.jpg', caption: 'يوم صحفي', tag: 'حملة' },
    { image: 'talent-feature-cover.jpg', caption: 'قصة الغلاف', tag: 'تحريري' },
    { image: 'talent-feature-walk.jpg', caption: 'مشي في الاستديو', tag: 'تجاري' },
    { image: 'talent-feature-bts.jpg', caption: 'خلف الكواليس', tag: 'استديو' },
  ],
  showTalentCta: 'عرض المواهب',
  applyCta: 'قدّم الآن',
}

export const talentPage = {
  label: 'المواهب',
  heading: 'الوجوه خلف كل حملة.',
  subhead: 'نظرة منتقاة على المواهب والأعمال التحريرية وأجواء الاستديو التي تقدمها Pomelo Casting لكل مشروع.',
  gallery: [
    {
      id: 'campaign-press',
      image: 'talent-feature-press.jpg',
      title: 'يوم صحفي',
      category: 'حملة',
      description: 'تغطية صحفية متوافقة مع الهوية، بتنسيق وكاستينغ لحملة وطنية.',
    },
    {
      id: 'editorial-cover',
      image: 'talent-feature-cover.jpg',
      title: 'قصة الغلاف',
      category: 'تحريري',
      description: 'تنسيق تحريري لقصة غلاف، باختيار مواهب حسب الطابع والحضور.',
    },
    {
      id: 'commercial-walk',
      image: 'talent-feature-walk.jpg',
      title: 'مشي في الاستديو',
      category: 'تجاري',
      description: 'مواهب لكتالوج تجاري، تم اختيارها للحركة والثقة أمام الكاميرا.',
    },
    {
      id: 'studio-bts',
      image: 'talent-feature-bts.jpg',
      title: 'خلف الكواليس',
      category: 'استديو',
      description: 'نظرة داخل الاستديو — كيف نُخرج ونُضيء كل تجربة كاستينغ.',
    },
  ],
  spotlight: {
    label: 'داخل الاستديو',
    heading: 'كل كاستينغ يبدأ بجلسة استديو حقيقية.',
    body: 'قبل أن تصل أي موهبة إلى القائمة المختصرة للعميل، نختبرها في ظروف استديو حقيقية — من إضاءة وإخراج وحضور أمام الكاميرا — لتحصل بالضبط على ما تراه في موقع التصوير.',
    image: 'talent-feature-bts.jpg',
  },
  cta: {
    heading: 'هل ترى نفسك هنا؟',
    body: 'إن كنت تملك الإطلالة والحضور، نريد أن نرى طلبك.',
  },
}

export const application = {
  label: 'التقديم',
  heading: 'ابدأ رحلتك في عالم الكاستينغ.',
  subhead: 'أخبرنا عن نفسك وشارك بعض الصور الحديثة — يراجع فريقنا كل طلب بشكل شخصي.',
  // NOTE: these stay in English on purpose — they're the literal <option value>s submitted and
  // stored with each application, and must match what the (English-only) admin panel expects and
  // what the talent filter matches against. Only their *displayed* text is translated, via
  // ui.application.hairColorLabels / eyeColorLabels below.
  genders: ['Female', 'Male'],
  hairColors: ['Black', 'Brown', 'Blonde', 'Red', 'Gray / Silver', 'Other'],
  eyeColors: ['Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Other'],
  shirtSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  success: {
    heading: 'تم استلام طلبك',
    body: 'شكراً لتقديمك — يراجع فريق الكاستينغ لدينا كل طلب وسنتواصل معك إذا كان هناك توافق.',
  },
}

export const ui = {
  arrow: '←',
  navbar: {
    getInTouch: 'تواصل معنا',
    toggleMenu: 'تبديل القائمة',
    close: 'إغلاق',
    homeAria: 'الصفحة الرئيسية لـ Pomelo Casting',
    logoAlt: 'Pomelo Casting',
    language: 'اللغة',
  },
  footer: {
    backToTop: 'العودة إلى الأعلى',
    talent: 'المواهب',
    apply: 'التقديم',
  },
  about: {
    sectionAria: 'من نحن',
    mockupAltOne: 'Pomelo Casting — لا نعرض الوجوه فقط، بل نختار الحضور',
    mockupAltTwo: 'Pomelo Casting — لا نعرض، بل نختار',
  },
  services: {
    sectionAria: 'خدماتنا',
    startAProject: 'ابدأ مشروعاً',
    enquire: 'استفسر عن هذه الخدمة',
    typicalTimeline: 'المدة المعتادة — ',
  },
  work: {
    sectionAria: 'أعمال مختارة',
    previous: 'المشروع السابق',
    next: 'المشروع التالي',
    view: 'عرض ',
  },
  contact: {
    sectionAria: 'تواصل معنا',
    genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    studio: 'الاستديو',
    getDirections: 'احصل على الاتجاهات ←',
    phone: 'الهاتف',
    email: 'البريد الإلكتروني',
    businessHours: 'ساعات العمل',
    instagramAria: 'Pomelo Casting على إنستغرام',
    chatOnWhatsapp: 'راسلنا على واتساب',
    messageSentHeading: 'تم إرسال الرسالة',
    messageSentBody: 'شكراً لتواصلك معنا — سنرد عليك خلال يوم عمل واحد.',
    sendAnother: 'إرسال رسالة أخرى',
    namePlaceholder: 'سارة أحمد',
    emailPlaceholder: 'name@brand.com',
    phonePlaceholder: '+964 750 000 0000',
    selectSubject: 'اختر موضوعاً',
    messagePlaceholder: 'أخبرنا عن مشروعك أو تفاصيله...',
    sending: 'جارٍ الإرسال...',
    sendMessage: 'إرسال الرسالة ←',
    questionsFromTalent: 'أسئلة من المواهب',
    name: 'الاسم',
    subject: 'الموضوع',
    message: 'الرسالة',
  },
  studioMap: {
    clickToLocate: 'اضغط لتحديد موقعنا',
    sectionAria: 'موقع الاستديو',
    mapTitle: 'موقع Pomelo Casting',
    findUsHeading: 'تجدنا في قلب عنكاوا.',
  },
  whatsapp: {
    fabAria: 'راسل Pomelo Casting على واتساب',
    chatWithUs: 'راسلنا',
  },
  faq: {
    forBrands: 'للعلامات التجارية',
    forTalent: 'للمواهب',
    showNext: 'عرض السؤال التالي',
    sectionAria: 'الأسئلة الشائعة',
    headingLine1: 'أسئلتكم،',
    headingLine2: 'مُجابة.',
    questionAria: 'سؤال ',
    press: 'اضغط',
  },
  insights: {
    sectionAria: 'المقالات',
    closeArticle: 'إغلاق المقال',
    previous: 'المقال السابق',
    next: 'المقال التالي',
    readTheStory: 'اقرأ المقال',
  },
  featuredTalent: {
    sectionAria: 'مواهب مميزة',
    pomeloTalentTag: 'موهبة Pomelo',
  },
  talentShowcase: {
    view: 'عرض ',
    closePreview: 'إغلاق المعاينة',
    previousPhoto: 'الصورة السابقة',
    nextPhoto: 'الصورة التالية',
    photos: 'صور',
    rosterAria: 'قائمة المواهب',
    rosterHeading: 'قائمة المواهب',
    noMatches: 'لا توجد مواهب تطابق هذه الفلاتر.',
    tryAdjusting: 'حاول تعديل الفلاتر أو مسحها لرؤية المزيد من القائمة.',
    insideStudioAria: 'داخل الاستديو',
    applyCtaAria: 'دعوة للتقديم',
    applyNow: 'قدّم الآن',
    pomeloTalentTag: 'موهبة Pomelo',
    modelDescription: (height: string, hairColor: string, eyeColor: string) => `${height} · شعر ${hairColor} · عيون ${eyeColor}`,
  },
  application: {
    fullBodyRequired: 'صورة كاملة للجسم مطلوبة.',
    mediumShotRequired: 'صورة نصفية مطلوبة.',
    closeUpRequired: 'صورة مقربة للوجه مطلوبة.',
    formAria: 'نموذج التقديم',
    submitAnother: 'إرسال طلب آخر',
    modelInfoHeading: 'المعلومات الشخصية',
    fullName: 'الاسم الكامل',
    fullNamePh: 'سارة أحمد',
    age: 'العمر',
    agePh: '24',
    phone: 'رقم الهاتف',
    phonePh: '+964 750 000 0000',
    email: 'البريد الإلكتروني',
    emailPh: 'sara@email.com',
    height: 'الطول',
    heightPh: `5'8" / 173cm`,
    weight: 'الوزن',
    weightPh: '130lb / 59kg',
    hairColor: 'لون الشعر',
    select: 'اختر',
    hairColorLabels: {
      Black: 'أسود',
      Brown: 'بني',
      Blonde: 'أشقر',
      Red: 'أحمر',
      'Gray / Silver': 'رمادي / فضي',
      Other: 'أخرى',
    } as Record<string, string>,
    eyeColorLabels: {
      Brown: 'بني',
      Blue: 'أزرق',
      Green: 'أخضر',
      Hazel: 'عسلي',
      Gray: 'رمادي',
      Other: 'أخرى',
    } as Record<string, string>,
    eyeColor: 'لون العينين',
    shoeSize: 'مقاس الحذاء',
    shoeSizePh: 'US 8',
    shirtSize: 'مقاس القميص',
    languages: 'اللغات المتحدثة',
    languagesPh: 'الإنجليزية، الكردية، العربية',
    photosHeading: 'الصور',
    fullBodyLabel: 'صورة كاملة للجسم',
    mediumShotLabel: 'صورة نصفية',
    closeUpLabel: 'صورة مقربة (للوجه)',
    additionalLabel: 'صور إضافية',
    additionalHint: 'حتى 3 صور إضافية — كاملة، أو أثناء الحركة، أو بأسلوب تحريري.',
    submitting: 'جارٍ الإرسال… ',
    submit: 'إرسال الطلب ←',
  },
  hero: {
    introAria: 'مقدمة',
    imageAlt: 'عارضون يسيرون لصالح Pomelo Casting',
    stepInside: 'استكشف المزيد',
  },
  form: {
    optional: '(اختياري)',
    removePhoto: 'إزالة ',
    uploadPhoto: 'رفع ',
    addPhoto: 'إضافة صورة',
  },
  validateContact: {
    name: 'يرجى إدخال اسمك.',
    nameShort: 'الاسم قصير جداً.',
    email: 'يرجى إدخال بريدك الإلكتروني.',
    emailInvalid: 'أدخل بريداً إلكترونياً صحيحاً.',
    phoneInvalid: 'أدخل رقم هاتف صحيحاً.',
    subject: 'يرجى اختيار موضوع.',
    message: 'يرجى إضافة رسالة قصيرة.',
    messageShort: 'أخبرنا بمزيد من التفاصيل (10 أحرف على الأقل).',
  },
  validateApplication: {
    fullName: 'يرجى إدخال اسمك الكامل.',
    nameShort: 'الاسم قصير جداً.',
    age: 'يرجى إدخال عمرك.',
    ageInvalid: 'أدخل عمراً صحيحاً (14–90).',
    phone: 'يرجى إدخال رقم هاتفك.',
    phoneInvalid: 'أدخل رقم هاتف صحيحاً.',
    email: 'أدخل بريداً إلكترونياً صحيحاً.',
    height: 'يرجى إدخال طولك.',
    weight: 'يرجى إدخال وزنك.',
    hairColor: 'يرجى اختيار لون الشعر.',
    eyeColor: 'يرجى اختيار لون العينين.',
    shoeSize: 'يرجى إدخال مقاس حذائك.',
    shirtSize: 'يرجى اختيار مقاس القميص.',
    languages: 'يرجى ذكر لغة واحدة على الأقل.',
  },
  filterBar: {
    filter: 'تصفية',
    talentFound: 'موهبة تم العثور عليها',
    talentsFound: 'موهبة تم العثور عليها',
    gender: 'الجنس',
    height: 'الطول',
    hairColor: 'لون الشعر',
    eyeColor: 'لون العينين',
    female: 'أنثى',
    male: 'ذكر',
    underHeight: 'أقل من 160 سم',
    height160170: '160–170 سم',
    height170180: '170–180 سم',
    height180plus: '180 سم فأكثر',
    hairBlack: 'أسود',
    hairBrown: 'بني',
    hairBlonde: 'أشقر',
    hairRed: 'أحمر',
    hairGray: 'رمادي',
    eyeBrown: 'بني',
    eyeBlue: 'أزرق',
    eyeGreen: 'أخضر',
    eyeHazel: 'عسلي',
    eyeGray: 'رمادي',
    hairChip: (color: string) => `شعر ${color}`,
    eyeChip: (color: string) => `عيون ${color}`,
    clearAll: 'مسح الكل',
  },
  seo: {
    homeTitle: 'Pomelo Casting | وكالة كاستينغ في أربيل، العراق',
    homeDescription:
      'تربط Pomelo Casting العلامات التجارية وشركات الإنتاج بالمواهب المناسبة — عارضين وممثلين ومبدعين لحملات في أربيل وإقليم كردستان.',
    talentTitle: 'قائمة مواهبنا | Pomelo Casting',
    talentDescription:
      'نظرة منتقاة على المواهب والأعمال التحريرية وأجواء الاستديو التي تقدمها Pomelo Casting لكل مشروع — تصفح قائمتنا الكاملة وحملاتنا السابقة.',
    applyTitle: 'قدّم للانضمام إلى قائمة مواهبنا | Pomelo Casting',
    applyDescription:
      'أخبرنا عن نفسك وشارك بعض الصور الحديثة — يراجع فريقنا كل طلب شخصياً ويتابع مع المرشحين المناسبين.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbTalent: 'المواهب',
    breadcrumbApply: 'التقديم',
  },
  api: {
    genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
    networkError: 'خطأ في الشبكة. يرجى التحقق من اتصالك والمحاولة مرة أخرى.',
  },
}

export const ar = {
  nav,
  hero,
  marquee,
  about,
  services,
  work,
  contact,
  insights,
  faqSection,
  footer,
  featuredTalent,
  talentPage,
  application,
  ui,
}
