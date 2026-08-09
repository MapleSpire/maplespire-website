export type Locale = 'fr' | 'en' | 'zh' | 'ja' | 'ko' | 'hi';

export const localeOptions: Array<{
  locale: Locale;
  code: string;
  name: string;
  htmlLang: string;
  ogLocale: string;
}> = [
  { locale: 'fr', code: 'FR', name: 'Français', htmlLang: 'fr-CA', ogLocale: 'fr_CA' },
  { locale: 'en', code: 'EN', name: 'English', htmlLang: 'en-CA', ogLocale: 'en_CA' },
  { locale: 'zh', code: 'ZH', name: '简体中文', htmlLang: 'zh-Hans', ogLocale: 'zh_CN' },
  { locale: 'ja', code: 'JA', name: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP' },
  { locale: 'ko', code: 'KO', name: '한국어', htmlLang: 'ko', ogLocale: 'ko_KR' },
  { locale: 'hi', code: 'HI', name: 'हिन्दी', htmlLang: 'hi', ogLocale: 'hi_IN' },
];

export type Chapter = {
  id: string;
  eyebrow: string;
  shortLabel: string;
  title: string;
  body: string;
  detail: string;
  visualLabel: string;
  callouts: string[];
};

export type SiteCopy = {
  locale: Locale;
  languageName: string;
  meta: { title: string; description: string };
  nav: {
    home: string;
    primaryLabel: string;
    sequenceLabel: string;
    story: string;
    product: string;
    openSource: string;
    contact: string;
  };
  actions: {
    discover: string;
    openApp: string;
    github: string;
    comingSoon: string;
    language: string;
    themeLight: string;
    themeDark: string;
    skip: string;
  };
  hero: {
    kicker: string;
    titleStart: string;
    titleAccent: string;
    body: string;
    free: string;
    open: string;
    selfHosted: string;
    promisesLabel: string;
  };
  comparison: {
    before: string;
    after: string;
    beforeAlt: string;
    control: string;
    beforeMetric: string;
    afterMetric: string;
    hint: string;
  };
  chapters: Chapter[];
  openSource: {
    eyebrow: string;
    title: string;
    body: string;
    proofs: Array<{ title: string; body: string }>;
  };
  facts: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
    messagePlaceholder: string;
    consent: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    privacy: string;
    direct: string;
  };
  footer: { promise: string; github: string; app: string; contact: string; navLabel: string; copyright: string };
};

export const copy: Record<Locale, SiteCopy> = {
  fr: {
    locale: 'fr',
    languageName: 'Français',
    meta: {
      title: 'MapleSpire — Outil gratuit de modélisation d’architecture C4',
      description:
        'MapleSpire relie modèles, vues et décisions dans un modèle C4 collaboratif. La démo est gratuite; le code source et l’auto-hébergement sont annoncés.',
    },
    nav: {
      home: 'Accueil MapleSpire',
      primaryLabel: 'Navigation principale',
      sequenceLabel: 'Étapes de la transformation',
      story: 'Avant / après',
      product: 'Le produit',
      openSource: 'Disponibilité',
      contact: 'Contact',
    },
    actions: {
      discover: 'Voir la transformation',
      openApp: 'Essayer la démo',
      github: 'Voir sur GitHub',
      comingSoon: 'Bientôt disponible',
      language: 'Choisir la langue',
      themeLight: 'Activer le thème clair',
      themeDark: 'Activer le thème sombre',
      skip: 'Passer au contact',
    },
    hero: {
      kicker: 'Avant / après · une transformation visible',
      titleStart: 'Un modèle C4 relié.',
      titleAccent: 'Chaque vue reste à jour.',
      body:
        'MapleSpire remplace les dessins qui vieillissent par un modèle vivant où vues, dépendances et décisions restent reliées.',
      free: 'Gratuit',
      open: 'Code source annoncé',
      selfHosted: 'Auto-hébergement prévu',
      promisesLabel: 'Les engagements MapleSpire',
    },
    comparison: {
      before: 'Dessin figé',
      after: 'MapleSpire',
      beforeAlt: 'Architecte devant plusieurs relations difficiles à maintenir dans un outil de dessin statique.',
      control: 'Comparer le dessin figé et MapleSpire',
      beforeMetric: 'Des copies à réconcilier',
      afterMetric: 'Un modèle vivant',
      hint: 'Glissez pour comparer',
    },
    chapters: [
      {
        id: 'modele-vivant',
        eyebrow: 'Entrez dans le modèle',
        shortLabel: 'Modèle',
        title: 'Un changement. Toutes les vues suivent.',
        body:
          'Objets, relations et diagrammes partagent la même source. Vous ne redessinez plus le système à chaque mise à jour.',
        detail: 'Modélisez une fois. Expliquez sous plusieurs angles.',
        visualLabel: 'MapleSpire présente un modèle architectural clair sur l’écran de travail.',
        callouts: ['Objets reliés', 'Vues cohérentes', 'Décisions visibles'],
      },
      {
        id: 'architecture-complete',
        eyebrow: 'Voyez le système',
        shortLabel: 'Système',
        title: 'Du contexte au détail, sans perdre le fil.',
        body:
          'Services, données, équipes et dépendances restent lisibles comme un tout — puis explorables à la profondeur utile.',
        detail: 'La bonne vue pour chaque conversation.',
        visualLabel: 'Les composants d’un système architectural se reconnectent autour d’un service central.',
        callouts: ['Systèmes', 'Équipes', 'Données'],
      },
      {
        id: 'architecture-vivante',
        eyebrow: 'Gardez-la vivante',
        shortLabel: 'Temps réel',
        title: 'Chaque changement circule.',
        body:
          'Collaborez en temps réel, continuez hors ligne et laissez la synchronisation reprendre quand le réseau revient.',
        detail: 'L’architecture reste utile après la réunion.',
        visualLabel: 'Gros plan net sur un service temps réel relié aux systèmes, données et équipes.',
        callouts: ['Temps réel', 'Hors ligne', 'Synchronisé'],
      },
    ],
    openSource: {
      eyebrow: 'Votre architecture, votre choix',
      title: 'Votre modèle reste vivant — et reste à vous.',
      body:
        'MapleSpire est gratuit. L’instance hébergée est une démo destinée à l’essai, pas à la production. Le code source et le paquet d’auto-hébergement seront publiés ultérieurement.',
      proofs: [
        { title: 'Gratuit', body: 'MapleSpire est gratuit, y compris l’accès à sa démo.' },
        { title: 'Code source annoncé', body: 'Le dépôt public et sa licence ne sont pas encore publiés.' },
        { title: 'Auto-hébergement prévu', body: 'Le paquet de production auto-hébergeable n’est pas encore disponible.' },
      ],
    },
    facts: {
      eyebrow: 'Réponses directes',
      title: 'Ce qui est disponible aujourd’hui.',
      items: [
        { question: 'MapleSpire est-il gratuit?', answer: 'Oui. MapleSpire est gratuit, y compris l’accès à sa démo.' },
        { question: 'La démo est-elle destinée à la production?', answer: 'Non. L’instance hébergée sert uniquement à découvrir et évaluer le produit.' },
        { question: 'Peut-on l’auto-héberger?', answer: 'L’auto-hébergement est prévu, mais le paquet de production n’est pas encore publié.' },
        { question: 'Le code source est-il déjà disponible?', answer: 'Non. Sa publication est annoncée; le lien GitHub mène pour l’instant à l’organisation MapleSpire.' },
        { question: 'MapleSpire repose-t-il sur un modèle C4 relié?', answer: 'Oui. Objets, relations et vues C4 partagent un modèle commun.' },
      ],
    },
    contact: {
      eyebrow: 'Parlons architecture',
      title: 'Que voulez-vous rendre plus clair?',
      body:
        'Parlez-nous de votre contexte, de votre équipe ou de votre projet d’auto-hébergement. Nous vous répondrons directement.',
      name: 'Nom',
      email: 'Courriel professionnel',
      company: 'Organisation (facultatif)',
      subject: 'Sujet',
      message: 'Votre message',
      messagePlaceholder: 'Aujourd’hui, nos diagrammes…',
      consent: 'J’accepte que MapleSpire utilise ces renseignements pour répondre à ma demande.',
      submit: 'Envoyer le message',
      sending: 'Envoi en cours…',
      success: 'Message reçu. Votre accusé de réception est en route par courriel.',
      error: 'Le message n’a pas pu partir. Réessayez ou écrivez-nous directement.',
      privacy: 'Vos coordonnées servent uniquement à répondre à votre demande.',
      direct: 'Ou écrivez à support@maplespire.ca',
    },
    footer: {
      promise: 'Une architecture claire, du premier contexte au prochain changement.',
      github: 'GitHub',
      app: 'Démo',
      contact: 'Contact',
      navLabel: 'Navigation de pied de page',
      copyright: '© 2026 MapleSpire contributors · Projet canadien',
    },
  },
  en: {
    locale: 'en',
    languageName: 'English',
    meta: {
      title: 'MapleSpire — Free collaborative C4 architecture modeling tool',
      description:
        'MapleSpire connects models, views and decisions in one collaborative C4 model. The demo is free; source code and self-hosting are announced.',
    },
    nav: {
      home: 'MapleSpire home',
      primaryLabel: 'Primary navigation',
      sequenceLabel: 'Transformation steps',
      story: 'Before / after',
      product: 'Product',
      openSource: 'Availability',
      contact: 'Contact',
    },
    actions: {
      discover: 'See the transformation',
      openApp: 'Try the demo',
      github: 'View on GitHub',
      comingSoon: 'Coming soon',
      language: 'Choose language',
      themeLight: 'Switch to light theme',
      themeDark: 'Switch to dark theme',
      skip: 'Skip to contact',
    },
    hero: {
      kicker: 'Before / after · a visible transformation',
      titleStart: 'One connected C4 model.',
      titleAccent: 'Every view stays current.',
      body:
        'MapleSpire replaces drawings that age with a living model where views, dependencies and decisions stay connected.',
      free: 'Free',
      open: 'Source code announced',
      selfHosted: 'Self-hosting planned',
      promisesLabel: 'MapleSpire commitments',
    },
    comparison: {
      before: 'Static drawing',
      after: 'MapleSpire',
      beforeAlt: 'Architect facing many relationships that are difficult to maintain in a static drawing tool.',
      control: 'Compare the static drawing with MapleSpire',
      beforeMetric: 'Copies to reconcile',
      afterMetric: 'One living model',
      hint: 'Drag to compare',
    },
    chapters: [
      {
        id: 'living-model',
        eyebrow: 'Enter the model',
        shortLabel: 'Model',
        title: 'One change. Every view follows.',
        body:
          'Objects, relationships and diagrams share the same source. You no longer redraw the system after every update.',
        detail: 'Model once. Explain from many angles.',
        visualLabel: 'MapleSpire presents a clear architecture model on the workspace screen.',
        callouts: ['Connected objects', 'Consistent views', 'Visible decisions'],
      },
      {
        id: 'complete-architecture',
        eyebrow: 'See the system',
        shortLabel: 'System',
        title: 'From context to detail, without losing the thread.',
        body:
          'Services, data, teams and dependencies remain readable as a whole — then explorable at the depth you need.',
        detail: 'The right view for every conversation.',
        visualLabel: 'Architecture components reconnect around a central service.',
        callouts: ['Systems', 'Teams', 'Data'],
      },
      {
        id: 'living-architecture',
        eyebrow: 'Keep it alive',
        shortLabel: 'Realtime',
        title: 'Every change travels.',
        body:
          'Collaborate in real time, keep working offline, and let synchronization resume when the network returns.',
        detail: 'Architecture stays useful after the meeting.',
        visualLabel: 'Crisp close-up of a realtime service connected to systems, data and teams.',
        callouts: ['Realtime', 'Offline', 'Synced'],
      },
    ],
    openSource: {
      eyebrow: 'Your architecture, your choice',
      title: 'Your model stays alive — and stays yours.',
      body:
        'MapleSpire is free. The hosted instance is an evaluation demo, not a production service. The source code and self-hosted production package will be published later.',
      proofs: [
        { title: 'Free', body: 'MapleSpire is free, including access to its demo.' },
        { title: 'Source code announced', body: 'The public repository and its license have not been published yet.' },
        { title: 'Self-hosting planned', body: 'The self-hosted production package is not available yet.' },
      ],
    },
    facts: {
      eyebrow: 'Direct answers',
      title: 'What is available today.',
      items: [
        { question: 'Is MapleSpire free?', answer: 'Yes. MapleSpire is free, including access to its demo.' },
        { question: 'Is the demo intended for production?', answer: 'No. The hosted instance is only for product discovery and evaluation.' },
        { question: 'Can MapleSpire be self-hosted?', answer: 'Self-hosting is planned, but the production package has not been published yet.' },
        { question: 'Is the source code available now?', answer: 'No. Publication is announced; the GitHub link currently points to the MapleSpire organization.' },
        { question: 'Does MapleSpire use a connected C4 model?', answer: 'Yes. C4 objects, relationships and views share one model.' },
      ],
    },
    contact: {
      eyebrow: 'Let’s talk architecture',
      title: 'What would you like to make clearer?',
      body:
        'Tell us about your context, your team or a self-hosting project. We will answer you directly.',
      name: 'Name',
      email: 'Work email',
      company: 'Organization (optional)',
      subject: 'Subject',
      message: 'Your message',
      messagePlaceholder: 'Today, our diagrams…',
      consent: 'I agree that MapleSpire may use this information to reply to my request.',
      submit: 'Send the message',
      sending: 'Sending…',
      success: 'Message received. Your email confirmation is on its way.',
      error: 'The message could not be sent. Try again or email us directly.',
      privacy: 'We only use your details to answer your request.',
      direct: 'Or email support@maplespire.ca',
    },
    footer: {
      promise: 'Clear architecture, from the first context to the next change.',
      github: 'GitHub',
      app: 'Demo',
      contact: 'Contact',
      navLabel: 'Footer navigation',
      copyright: '© 2026 MapleSpire contributors · Canadian project',
    },
  },
  zh: {
    locale: 'zh',
    languageName: '简体中文',
    meta: {
      title: 'MapleSpire — 免费协作式 C4 架构建模工具',
      description: 'MapleSpire 将模型、视图和决策连接到同一个协作式 C4 模型中。演示免费；源代码与自行托管功能已宣布但尚未发布。',
    },
    nav: {
      home: 'MapleSpire 首页',
      primaryLabel: '主导航',
      sequenceLabel: '转型步骤',
      story: '前后对比',
      product: '产品',
      openSource: '可用情况',
      contact: '联系',
    },
    actions: {
      discover: '查看转型过程',
      openApp: '试用演示',
      github: '在 GitHub 上查看',
      comingSoon: '即将推出',
      language: '选择语言',
      themeLight: '切换到浅色主题',
      themeDark: '切换到深色主题',
      skip: '跳到联系表单',
    },
    hero: {
      kicker: '前后对比 · 清晰可见的转型',
      titleStart: '一个互联的 C4 模型。',
      titleAccent: '每个视图都保持最新。',
      body: 'MapleSpire 用鲜活的模型取代会过时的图纸，让视图、依赖关系和决策始终保持连接。',
      free: '免费',
      open: '源代码已宣布',
      selfHosted: '计划支持自行托管',
      promisesLabel: 'MapleSpire 的承诺',
    },
    comparison: {
      before: '静态图纸',
      after: 'MapleSpire',
      beforeAlt: '一位架构师面对静态绘图工具中难以维护的大量关系。',
      control: '比较静态图纸与 MapleSpire',
      beforeMetric: '需要协调的多个副本',
      afterMetric: '一个鲜活的模型',
      hint: '拖动进行比较',
    },
    chapters: [
      {
        id: 'living-model',
        eyebrow: '进入模型',
        shortLabel: '模型',
        title: '一次更改，所有视图同步更新。',
        body: '对象、关系和图表共享同一个来源。每次更新后，您都不必重新绘制整个系统。',
        detail: '建模一次，从多个角度清晰说明。',
        visualLabel: 'MapleSpire 在工作区屏幕上呈现清晰的架构模型。',
        callouts: ['对象相互连接', '视图保持一致', '决策清晰可见'],
      },
      {
        id: 'complete-architecture',
        eyebrow: '看清整个系统',
        shortLabel: '系统',
        title: '从全局到细节，始终不失脉络。',
        body: '服务、数据、团队和依赖关系作为一个整体清晰可读，并可按需要深入探索。',
        detail: '为每次讨论提供恰当的视图。',
        visualLabel: '架构组件围绕一个核心服务重新连接。',
        callouts: ['系统', '团队', '数据'],
      },
      {
        id: 'living-architecture',
        eyebrow: '让架构保持鲜活',
        shortLabel: '实时',
        title: '每项更改都会传递。',
        body: '实时协作、离线继续工作，并在网络恢复后自动继续同步。',
        detail: '会议结束后，架构依然有用。',
        visualLabel: '实时服务与系统、数据和团队连接的清晰特写。',
        callouts: ['实时', '离线', '已同步'],
      },
    ],
    openSource: {
      eyebrow: '您的架构，由您选择',
      title: '模型始终鲜活，也始终属于您。',
      body: 'MapleSpire 免费。托管实例仅用于演示和评估，不适用于生产。源代码和自行托管的生产软件包将在以后发布。',
      proofs: [
        { title: '免费', body: 'MapleSpire 免费，包括其演示访问。' },
        { title: '源代码已宣布', body: '公共代码仓库及其许可证尚未发布。' },
        { title: '计划支持自行托管', body: '自行托管的生产软件包尚不可用。' },
      ],
    },
    facts: {
      eyebrow: '直接回答',
      title: '目前可用的内容。',
      items: [
        { question: 'MapleSpire 免费吗？', answer: '是的。MapleSpire 免费，包括其演示访问。' },
        { question: '演示适用于生产环境吗？', answer: '不适用。托管实例仅用于了解和评估产品。' },
        { question: '可以自行托管吗？', answer: '自行托管已列入计划，但生产软件包尚未发布。' },
        { question: '源代码现在可用吗？', answer: '不可用。发布计划已宣布；GitHub 链接目前仅指向 MapleSpire 组织。' },
        { question: 'MapleSpire 使用关联的 C4 模型吗？', answer: '是的。C4 对象、关系和视图共享同一个模型。' },
      ],
    },
    contact: {
      eyebrow: '聊聊架构',
      title: '您希望让什么变得更清晰？',
      body: '告诉我们您的背景、团队或自行托管计划，我们会直接回复您。',
      name: '姓名',
      email: '工作邮箱',
      company: '组织（可选）',
      subject: '主题',
      message: '您的留言',
      messagePlaceholder: '目前，我们的图表……',
      consent: '我同意 MapleSpire 使用这些信息回复我的请求。',
      submit: '发送留言',
      sending: '正在发送……',
      success: '留言已收到，确认邮件正在发送。',
      error: '留言未能发送，请重试或直接给我们发送邮件。',
      privacy: '您的信息仅用于回复此请求。',
      direct: '或发送邮件至 support@maplespire.ca',
    },
    footer: {
      promise: '从最初的全局视图到下一次变更，架构始终清晰。',
      github: 'GitHub',
      app: '演示',
      contact: '联系',
      navLabel: '页脚导航',
      copyright: '© 2026 MapleSpire 贡献者 · 加拿大项目',
    },
  },
  ja: {
    locale: 'ja',
    languageName: '日本語',
    meta: {
      title: 'MapleSpire — 無料の共同 C4 アーキテクチャモデリングツール',
      description: 'MapleSpire はモデル、ビュー、意思決定を一つの共同 C4 モデルにつなぎます。デモは無料で、ソース公開とセルフホストは発表済みです。',
    },
    nav: {
      home: 'MapleSpire ホーム',
      primaryLabel: 'メインナビゲーション',
      sequenceLabel: '変革のステップ',
      story: 'ビフォー／アフター',
      product: '製品',
      openSource: '提供状況',
      contact: 'お問い合わせ',
    },
    actions: {
      discover: '変化を見る',
      openApp: 'デモを試す',
      github: 'GitHub で見る',
      comingSoon: '近日公開',
      language: '言語を選択',
      themeLight: 'ライトテーマに切り替える',
      themeDark: 'ダークテーマに切り替える',
      skip: 'お問い合わせへ移動',
    },
    hero: {
      kicker: 'ビフォー／アフター · 目に見える変革',
      titleStart: 'つながった C4 モデル。',
      titleAccent: 'すべてのビューを最新に。',
      body: 'MapleSpire は古くなる図を生きたモデルに置き換え、ビュー、依存関係、意思決定を常につなぎます。',
      free: '無料',
      open: 'ソース公開予定',
      selfHosted: 'セルフホスト予定',
      promisesLabel: 'MapleSpire の約束',
    },
    comparison: {
      before: '静的な図',
      after: 'MapleSpire',
      beforeAlt: '静的な作図ツールで多数の関係を維持することに苦労しているアーキテクト。',
      control: '静的な図と MapleSpire を比較',
      beforeMetric: '照合が必要な複数のコピー',
      afterMetric: '一つの生きたモデル',
      hint: 'ドラッグして比較',
    },
    chapters: [
      {
        id: 'living-model',
        eyebrow: 'モデルの中へ',
        shortLabel: 'モデル',
        title: '一度の変更で、すべてのビューが追随。',
        body: 'オブジェクト、関係、図は同じ情報源を共有します。更新のたびにシステムを描き直す必要はありません。',
        detail: '一度モデル化し、複数の視点から説明できます。',
        visualLabel: 'MapleSpire がワークスペース画面に明快なアーキテクチャモデルを表示している。',
        callouts: ['つながるオブジェクト', '一貫したビュー', '見える意思決定'],
      },
      {
        id: 'complete-architecture',
        eyebrow: 'システム全体を見る',
        shortLabel: 'システム',
        title: '全体像から詳細まで、流れを失わない。',
        body: 'サービス、データ、チーム、依存関係を全体として読み取り、必要な深さまで探索できます。',
        detail: 'あらゆる会話に最適なビューを。',
        visualLabel: 'アーキテクチャの構成要素が中央のサービスを中心に再接続される。',
        callouts: ['システム', 'チーム', 'データ'],
      },
      {
        id: 'living-architecture',
        eyebrow: '生きた状態を保つ',
        shortLabel: 'リアルタイム',
        title: 'すべての変更が伝わる。',
        body: 'リアルタイムで共同作業し、オフラインでも続け、ネットワーク復旧後に同期を再開できます。',
        detail: '会議の後もアーキテクチャは役立ち続けます。',
        visualLabel: 'システム、データ、チームにつながるリアルタイムサービスの鮮明なクローズアップ。',
        callouts: ['リアルタイム', 'オフライン', '同期済み'],
      },
    ],
    openSource: {
      eyebrow: 'あなたのアーキテクチャ、あなたの選択',
      title: 'モデルは生き続け、あなたのものであり続けます。',
      body: 'MapleSpire は無料です。ホスト版は評価用デモであり、本番サービスではありません。ソースコードとセルフホスト用本番パッケージは後日公開予定です。',
      proofs: [
        { title: '無料', body: 'MapleSpire はデモへのアクセスを含め無料です。' },
        { title: 'ソース公開予定', body: '公開リポジトリとライセンスはまだ公開されていません。' },
        { title: 'セルフホスト予定', body: 'セルフホスト用本番パッケージはまだ利用できません。' },
      ],
    },
    facts: {
      eyebrow: '端的な回答',
      title: '現在利用できるもの。',
      items: [
        { question: 'MapleSpire は無料ですか？', answer: 'はい。MapleSpire はデモへのアクセスを含め無料です。' },
        { question: 'デモは本番環境向けですか？', answer: 'いいえ。ホスト版は製品の確認と評価のみを目的としています。' },
        { question: 'セルフホストできますか？', answer: 'セルフホストは予定されていますが、本番パッケージはまだ公開されていません。' },
        { question: 'ソースコードは公開済みですか？', answer: 'いいえ。公開予定で、GitHub リンクは現在 MapleSpire 組織を示しています。' },
        { question: 'MapleSpire は連結された C4 モデルを使いますか？', answer: 'はい。C4 のオブジェクト、関係、ビューが一つのモデルを共有します。' },
      ],
    },
    contact: {
      eyebrow: 'アーキテクチャについて話しましょう',
      title: '何をもっと明確にしたいですか？',
      body: '状況、チーム、セルフホストの計画についてお聞かせください。直接ご返信します。',
      name: 'お名前',
      email: '仕事用メールアドレス',
      company: '組織名（任意）',
      subject: '件名',
      message: 'メッセージ',
      messagePlaceholder: '現在、私たちの図は…',
      consent: 'MapleSpire がこの情報を問い合わせへの返信に使用することに同意します。',
      submit: 'メッセージを送信',
      sending: '送信中…',
      success: 'メッセージを受け取りました。確認メールを送信しています。',
      error: 'メッセージを送信できませんでした。再試行するか、直接メールでお問い合わせください。',
      privacy: '入力情報はお問い合わせへの回答にのみ使用します。',
      direct: 'または support@maplespire.ca までメールしてください',
    },
    footer: {
      promise: '最初の全体像から次の変更まで、明快なアーキテクチャを。',
      github: 'GitHub',
      app: 'デモ',
      contact: 'お問い合わせ',
      navLabel: 'フッターナビゲーション',
      copyright: '© 2026 MapleSpire コントリビューター · カナダ発のプロジェクト',
    },
  },
  ko: {
    locale: 'ko',
    languageName: '한국어',
    meta: {
      title: 'MapleSpire — 무료 협업형 C4 아키텍처 모델링 도구',
      description: 'MapleSpire는 모델, 뷰, 의사결정을 하나의 협업 C4 모델로 연결합니다. 데모는 무료이며 소스 공개와 셀프 호스팅은 예고된 상태입니다.',
    },
    nav: {
      home: 'MapleSpire 홈',
      primaryLabel: '주요 탐색',
      sequenceLabel: '전환 단계',
      story: '전과 후',
      product: '제품',
      openSource: '제공 현황',
      contact: '문의',
    },
    actions: {
      discover: '변화 살펴보기',
      openApp: '데모 체험하기',
      github: 'GitHub에서 보기',
      comingSoon: '곧 공개',
      language: '언어 선택',
      themeLight: '라이트 테마로 전환',
      themeDark: '다크 테마로 전환',
      skip: '문의로 건너뛰기',
    },
    hero: {
      kicker: '전과 후 · 눈에 보이는 전환',
      titleStart: '하나로 연결된 C4 모델.',
      titleAccent: '모든 뷰를 최신 상태로.',
      body: 'MapleSpire는 시간이 지나면 낡는 그림을 살아 있는 모델로 바꾸어 뷰, 의존성, 의사결정을 계속 연결합니다.',
      free: '무료',
      open: '소스 공개 예고',
      selfHosted: '셀프 호스팅 예정',
      promisesLabel: 'MapleSpire의 약속',
    },
    comparison: {
      before: '정적인 그림',
      after: 'MapleSpire',
      beforeAlt: '정적인 그리기 도구에서 유지하기 어려운 수많은 관계를 마주한 아키텍트.',
      control: '정적인 그림과 MapleSpire 비교',
      beforeMetric: '맞춰야 하는 여러 사본',
      afterMetric: '하나의 살아 있는 모델',
      hint: '드래그하여 비교',
    },
    chapters: [
      {
        id: 'living-model',
        eyebrow: '모델 안으로',
        shortLabel: '모델',
        title: '한 번 바꾸면 모든 뷰가 따라옵니다.',
        body: '객체, 관계, 다이어그램이 같은 원천을 공유합니다. 업데이트할 때마다 시스템을 다시 그릴 필요가 없습니다.',
        detail: '한 번 모델링하고 여러 관점에서 설명하세요.',
        visualLabel: 'MapleSpire가 작업 공간 화면에 명확한 아키텍처 모델을 보여 줍니다.',
        callouts: ['연결된 객체', '일관된 뷰', '보이는 의사결정'],
      },
      {
        id: 'complete-architecture',
        eyebrow: '시스템 전체 보기',
        shortLabel: '시스템',
        title: '전체 맥락에서 세부 사항까지, 흐름을 놓치지 않습니다.',
        body: '서비스, 데이터, 팀, 의존성을 하나의 전체로 읽고 필요한 깊이까지 탐색할 수 있습니다.',
        detail: '모든 대화에 맞는 뷰를 제공합니다.',
        visualLabel: '아키텍처 구성 요소가 중앙 서비스를 중심으로 다시 연결됩니다.',
        callouts: ['시스템', '팀', '데이터'],
      },
      {
        id: 'living-architecture',
        eyebrow: '계속 살아 있게',
        shortLabel: '실시간',
        title: '모든 변경 사항이 전달됩니다.',
        body: '실시간으로 협업하고 오프라인에서도 계속 작업하며 네트워크가 돌아오면 동기화를 다시 시작합니다.',
        detail: '회의가 끝난 뒤에도 아키텍처는 유용합니다.',
        visualLabel: '시스템, 데이터, 팀에 연결된 실시간 서비스를 선명하게 확대한 모습입니다.',
        callouts: ['실시간', '오프라인', '동기화됨'],
      },
    ],
    openSource: {
      eyebrow: '당신의 아키텍처, 당신의 선택',
      title: '모델은 살아 있고, 소유권은 당신에게 있습니다.',
      body: 'MapleSpire는 무료입니다. 호스팅 인스턴스는 평가용 데모이며 운영 서비스가 아닙니다. 소스 코드와 셀프 호스팅용 운영 패키지는 추후 공개됩니다.',
      proofs: [
        { title: '무료', body: 'MapleSpire는 데모 이용을 포함해 무료입니다.' },
        { title: '소스 공개 예고', body: '공개 저장소와 라이선스는 아직 게시되지 않았습니다.' },
        { title: '셀프 호스팅 예정', body: '셀프 호스팅용 운영 패키지는 아직 제공되지 않습니다.' },
      ],
    },
    facts: {
      eyebrow: '명확한 답변',
      title: '현재 이용 가능한 범위.',
      items: [
        { question: 'MapleSpire는 무료인가요?', answer: '예. MapleSpire는 데모 이용을 포함해 무료입니다.' },
        { question: '데모를 운영 환경에 사용할 수 있나요?', answer: '아니요. 호스팅 인스턴스는 제품 확인과 평가만을 위한 것입니다.' },
        { question: '셀프 호스팅할 수 있나요?', answer: '셀프 호스팅은 예정되어 있지만 운영 패키지는 아직 공개되지 않았습니다.' },
        { question: '소스 코드는 지금 공개되어 있나요?', answer: '아니요. 공개가 예고되었으며 GitHub 링크는 현재 MapleSpire 조직을 가리킵니다.' },
        { question: 'MapleSpire는 연결된 C4 모델을 사용하나요?', answer: '예. C4 객체, 관계, 뷰가 하나의 모델을 공유합니다.' },
      ],
    },
    contact: {
      eyebrow: '아키텍처에 대해 이야기해 보세요',
      title: '무엇을 더 명확하게 만들고 싶으신가요?',
      body: '현재 상황, 팀 또는 셀프 호스팅 계획을 알려 주시면 직접 답변드리겠습니다.',
      name: '이름',
      email: '업무용 이메일',
      company: '조직(선택 사항)',
      subject: '제목',
      message: '메시지',
      messagePlaceholder: '현재 저희 다이어그램은…',
      consent: 'MapleSpire가 문의에 답변하기 위해 이 정보를 사용하는 데 동의합니다.',
      submit: '메시지 보내기',
      sending: '보내는 중…',
      success: '메시지를 받았습니다. 확인 이메일을 보내고 있습니다.',
      error: '메시지를 보내지 못했습니다. 다시 시도하거나 이메일로 직접 문의해 주세요.',
      privacy: '입력하신 정보는 문의에 답변하는 데만 사용합니다.',
      direct: '또는 support@maplespire.ca로 이메일을 보내 주세요',
    },
    footer: {
      promise: '첫 맥락부터 다음 변화까지, 명확한 아키텍처를 유지합니다.',
      github: 'GitHub',
      app: '데모',
      contact: '문의',
      navLabel: '바닥글 탐색',
      copyright: '© 2026 MapleSpire 기여자 · 캐나다 프로젝트',
    },
  },
  hi: {
    locale: 'hi',
    languageName: 'हिन्दी',
    meta: {
      title: 'MapleSpire — निःशुल्क सहयोगी C4 आर्किटेक्चर मॉडलिंग टूल',
      description: 'MapleSpire मॉडल, व्यू और निर्णयों को एक सहयोगी C4 मॉडल में जोड़ता है। डेमो निःशुल्क है; सोर्स और सेल्फ-होस्टिंग की घोषणा हुई है।',
    },
    nav: {
      home: 'MapleSpire होम',
      primaryLabel: 'मुख्य नेविगेशन',
      sequenceLabel: 'बदलाव के चरण',
      story: 'पहले / बाद में',
      product: 'उत्पाद',
      openSource: 'उपलब्धता',
      contact: 'संपर्क',
    },
    actions: {
      discover: 'बदलाव देखें',
      openApp: 'डेमो आज़माएँ',
      github: 'GitHub पर देखें',
      comingSoon: 'जल्द उपलब्ध',
      language: 'भाषा चुनें',
      themeLight: 'लाइट थीम पर जाएँ',
      themeDark: 'डार्क थीम पर जाएँ',
      skip: 'संपर्क पर जाएँ',
    },
    hero: {
      kicker: 'पहले / बाद में · साफ़ दिखाई देने वाला बदलाव',
      titleStart: 'एक जुड़ा हुआ C4 मॉडल।',
      titleAccent: 'हर व्यू हमेशा अद्यतन।',
      body: 'MapleSpire पुराने पड़ने वाले चित्रों को एक जीवंत मॉडल से बदलता है, जहाँ व्यू, निर्भरताएँ और निर्णय जुड़े रहते हैं।',
      free: 'निःशुल्क',
      open: 'सोर्स की घोषणा',
      selfHosted: 'सेल्फ-होस्टिंग नियोजित',
      promisesLabel: 'MapleSpire की प्रतिबद्धताएँ',
    },
    comparison: {
      before: 'स्थिर चित्र',
      after: 'MapleSpire',
      beforeAlt: 'एक आर्किटेक्ट स्थिर ड्रॉइंग टूल में बनाए रखना कठिन कई संबंधों को संभाल रहा है।',
      control: 'स्थिर चित्र और MapleSpire की तुलना करें',
      beforeMetric: 'मिलान करने के लिए कई प्रतियाँ',
      afterMetric: 'एक जीवंत मॉडल',
      hint: 'तुलना के लिए खींचें',
    },
    chapters: [
      {
        id: 'living-model',
        eyebrow: 'मॉडल के अंदर जाएँ',
        shortLabel: 'मॉडल',
        title: 'एक बदलाव। हर व्यू साथ बदलता है।',
        body: 'ऑब्जेक्ट, संबंध और आरेख एक ही स्रोत साझा करते हैं। हर अपडेट के बाद सिस्टम दोबारा बनाने की ज़रूरत नहीं है।',
        detail: 'एक बार मॉडल बनाएँ। कई दृष्टिकोणों से समझाएँ।',
        visualLabel: 'MapleSpire कार्यक्षेत्र स्क्रीन पर एक स्पष्ट आर्किटेक्चर मॉडल दिखाता है।',
        callouts: ['जुड़े ऑब्जेक्ट', 'एकरूप व्यू', 'दिखाई देने वाले निर्णय'],
      },
      {
        id: 'complete-architecture',
        eyebrow: 'पूरे सिस्टम को देखें',
        shortLabel: 'सिस्टम',
        title: 'संदर्भ से विवरण तक, बिना कड़ी खोए।',
        body: 'सेवाएँ, डेटा, टीमें और निर्भरताएँ एक साथ स्पष्ट रहती हैं और ज़रूरत के अनुसार गहराई से देखी जा सकती हैं।',
        detail: 'हर बातचीत के लिए सही व्यू।',
        visualLabel: 'आर्किटेक्चर के घटक एक केंद्रीय सेवा के आसपास फिर से जुड़ते हैं।',
        callouts: ['सिस्टम', 'टीमें', 'डेटा'],
      },
      {
        id: 'living-architecture',
        eyebrow: 'इसे जीवंत रखें',
        shortLabel: 'रीयल टाइम',
        title: 'हर बदलाव सब तक पहुँचता है।',
        body: 'रीयल टाइम में सहयोग करें, ऑफ़लाइन काम जारी रखें और नेटवर्क लौटने पर सिंक को फिर शुरू होने दें।',
        detail: 'बैठक के बाद भी आर्किटेक्चर उपयोगी रहता है।',
        visualLabel: 'सिस्टम, डेटा और टीमों से जुड़ी रीयल-टाइम सेवा का स्पष्ट क्लोज़-अप।',
        callouts: ['रीयल टाइम', 'ऑफ़लाइन', 'सिंक किया गया'],
      },
    ],
    openSource: {
      eyebrow: 'आपका आर्किटेक्चर, आपका चुनाव',
      title: 'आपका मॉडल जीवंत भी रहता है और आपका भी।',
      body: 'MapleSpire निःशुल्क है। होस्ट किया गया इंस्टेंस मूल्यांकन डेमो है, प्रोडक्शन सेवा नहीं। सोर्स कोड और सेल्फ-होस्टेड प्रोडक्शन पैकेज बाद में प्रकाशित होंगे।',
      proofs: [
        { title: 'निःशुल्क', body: 'MapleSpire और उसके डेमो का उपयोग निःशुल्क है।' },
        { title: 'सोर्स की घोषणा', body: 'सार्वजनिक रिपॉज़िटरी और उसका लाइसेंस अभी प्रकाशित नहीं हुए हैं।' },
        { title: 'सेल्फ-होस्टिंग नियोजित', body: 'सेल्फ-होस्टेड प्रोडक्शन पैकेज अभी उपलब्ध नहीं है।' },
      ],
    },
    facts: {
      eyebrow: 'सीधे उत्तर',
      title: 'आज क्या उपलब्ध है।',
      items: [
        { question: 'क्या MapleSpire निःशुल्क है?', answer: 'हाँ। MapleSpire और उसके डेमो का उपयोग निःशुल्क है।' },
        { question: 'क्या डेमो प्रोडक्शन के लिए है?', answer: 'नहीं। होस्ट किया गया इंस्टेंस केवल उत्पाद को देखने और परखने के लिए है।' },
        { question: 'क्या इसे सेल्फ-होस्ट किया जा सकता है?', answer: 'सेल्फ-होस्टिंग नियोजित है, लेकिन प्रोडक्शन पैकेज अभी प्रकाशित नहीं हुआ है।' },
        { question: 'क्या सोर्स कोड अभी उपलब्ध है?', answer: 'नहीं। प्रकाशन की घोषणा हुई है; GitHub लिंक अभी MapleSpire संगठन पर जाता है।' },
        { question: 'क्या MapleSpire जुड़े हुए C4 मॉडल पर आधारित है?', answer: 'हाँ। C4 ऑब्जेक्ट, संबंध और व्यू एक मॉडल साझा करते हैं।' },
      ],
    },
    contact: {
      eyebrow: 'आर्किटेक्चर पर बात करें',
      title: 'आप क्या अधिक स्पष्ट बनाना चाहते हैं?',
      body: 'हमें अपने संदर्भ, टीम या सेल्फ-होस्टिंग योजना के बारे में बताएँ। हम आपको सीधे उत्तर देंगे।',
      name: 'नाम',
      email: 'कार्य ईमेल',
      company: 'संगठन (वैकल्पिक)',
      subject: 'विषय',
      message: 'आपका संदेश',
      messagePlaceholder: 'आज हमारे आरेख…',
      consent: 'मैं सहमत हूँ कि MapleSpire मेरे अनुरोध का उत्तर देने के लिए इस जानकारी का उपयोग कर सकता है।',
      submit: 'संदेश भेजें',
      sending: 'भेजा जा रहा है…',
      success: 'संदेश प्राप्त हुआ। पुष्टि ईमेल भेजा जा रहा है।',
      error: 'संदेश नहीं भेजा जा सका। फिर प्रयास करें या हमें सीधे ईमेल करें।',
      privacy: 'आपकी जानकारी केवल आपके अनुरोध का उत्तर देने के लिए उपयोग की जाती है।',
      direct: 'या support@maplespire.ca पर ईमेल करें',
    },
    footer: {
      promise: 'पहले संदर्भ से अगले बदलाव तक स्पष्ट आर्किटेक्चर।',
      github: 'GitHub',
      app: 'डेमो',
      contact: 'संपर्क',
      navLabel: 'फुटर नेविगेशन',
      copyright: '© 2026 MapleSpire योगदानकर्ता · कनाडाई परियोजना',
    },
  },
};

export function getCopy(locale: Locale): SiteCopy {
  return copy[locale];
}
