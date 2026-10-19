export type Locale = 'fr' | 'en' | 'es' | 'pt' | 'it' | 'de' | 'zh' | 'ja' | 'ko' | 'hi' | 'ar';

export const REPOSITORY_URL = 'https://github.com/MapleSpire/maplespire';
export const LICENSE_ID = 'AGPL-3.0';
export const LICENSE_URL = 'https://www.gnu.org/licenses/agpl-3.0.html';

export const localeOptions: Array<{
  locale: Locale;
  code: string;
  name: string;
  htmlLang: string;
  ogLocale: string;
  /** Text direction of the page; every locale is left-to-right except Arabic. */
  dir: 'ltr' | 'rtl';
}> = [
  { locale: 'fr', code: 'FR', name: 'Français', htmlLang: 'fr-CA', ogLocale: 'fr_CA', dir: 'ltr' },
  { locale: 'en', code: 'EN', name: 'English', htmlLang: 'en-CA', ogLocale: 'en_CA', dir: 'ltr' },
  { locale: 'es', code: 'ES', name: 'Español', htmlLang: 'es', ogLocale: 'es_ES', dir: 'ltr' },
  { locale: 'pt', code: 'PT', name: 'Português', htmlLang: 'pt-BR', ogLocale: 'pt_BR', dir: 'ltr' },
  { locale: 'it', code: 'IT', name: 'Italiano', htmlLang: 'it', ogLocale: 'it_IT', dir: 'ltr' },
  { locale: 'de', code: 'DE', name: 'Deutsch', htmlLang: 'de', ogLocale: 'de_DE', dir: 'ltr' },
  { locale: 'zh', code: 'ZH', name: '简体中文', htmlLang: 'zh-Hans', ogLocale: 'zh_CN', dir: 'ltr' },
  { locale: 'ja', code: 'JA', name: '日本語', htmlLang: 'ja', ogLocale: 'ja_JP', dir: 'ltr' },
  { locale: 'ko', code: 'KO', name: '한국어', htmlLang: 'ko', ogLocale: 'ko_KR', dir: 'ltr' },
  { locale: 'hi', code: 'HI', name: 'हिन्दी', htmlLang: 'hi', ogLocale: 'hi_IN', dir: 'ltr' },
  { locale: 'ar', code: 'AR', name: 'العربية', htmlLang: 'ar', ogLocale: 'ar_AR', dir: 'rtl' },
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
    governance: string;
    openSource: string;
    contact: string;
  };
  actions: {
    discover: string;
    openApp: string;
    github: string;
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
  governance: {
    eyebrow: string;
    title: string;
    body: string;
    items: Array<{ title: string; body: string }>;
    articleLabel: string;
    articleCta: string;
  };
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
      title: 'MapleSpire — Modélisation d’architecture C4 open source et collaborative',
      description:
        'Outil open source de modélisation d’architecture C4 : un modèle partagé, des tags et technologies gouvernés, la collaboration en temps réel. Gratuit, AGPL-3.0, auto-hébergeable.',
    },
    nav: {
      home: 'Accueil MapleSpire',
      primaryLabel: 'Navigation principale',
      sequenceLabel: 'Étapes de la présentation',
      story: 'Avant / après',
      product: 'Produit',
      governance: 'Gouvernance',
      openSource: 'Open source',
      contact: 'Contact',
    },
    actions: {
      discover: 'Voir la différence',
      openApp: 'Essayer la démo',
      github: 'Voir le code sur GitHub',
      language: 'Choisir la langue',
      themeLight: 'Activer le thème clair',
      themeDark: 'Activer le thème sombre',
      skip: 'Passer au contact',
    },
    hero: {
      kicker: 'Modélisation C4 · open source',
      titleStart: 'Un seul modèle C4.',
      titleAccent: 'Toutes vos vues à jour.',
      body:
        'MapleSpire remplace les diagrammes qui se périment par un modèle partagé : chaque objet existe une seule fois, chaque vue le reflète, et les tags et technologies se gèrent au même endroit pour toute l’organisation.',
      free: 'Gratuit',
      open: 'Open source · AGPL-3.0',
      selfHosted: 'Auto-hébergeable',
      promisesLabel: 'Les engagements MapleSpire',
    },
    comparison: {
      before: 'Diagrammes dessinés',
      after: 'MapleSpire',
      beforeAlt: 'Architecte devant de nombreuses relations difficiles à tenir à jour dans un outil de dessin.',
      control: 'Comparer les diagrammes dessinés et MapleSpire',
      beforeMetric: 'Des copies à réconcilier',
      afterMetric: 'Une seule source de vérité',
      hint: 'Glissez pour comparer',
    },
    chapters: [
      {
        id: 'modele-vivant',
        eyebrow: 'Le modèle',
        shortLabel: 'Modèle',
        title: 'Modifiez une fois. Toutes les vues suivent.',
        body:
          'Chaque objet et chaque relation existent une seule fois. Les diagrammes y font référence : renommer un service ou corriger une dépendance met à jour toutes les vues où il apparaît.',
        detail: 'Modélisez une fois, expliquez sous tous les angles.',
        visualLabel: 'MapleSpire présente un modèle d’architecture clair sur l’écran de travail.',
        callouts: ['Objets uniques', 'Vues cohérentes', 'Décisions tracées'],
      },
      {
        id: 'architecture-complete',
        eyebrow: 'Le système',
        shortLabel: 'Système',
        title: 'Du contexte au composant, sans perdre le fil.',
        body:
          'Systèmes, conteneurs, composants et dépendances se lisent d’un coup d’œil, puis s’explorent au niveau de détail utile à chaque conversation.',
        detail: 'La bonne vue pour chaque public.',
        visualLabel: 'Les composants d’un système se reconnectent autour d’un service central.',
        callouts: ['Systèmes', 'Domaines', 'Dépendances'],
      },
      {
        id: 'architecture-vivante',
        eyebrow: 'La collaboration',
        shortLabel: 'Temps réel',
        title: 'Toute l’équipe sur le même modèle.',
        body:
          'Modifiez à plusieurs en temps réel ou continuez hors ligne : vos changements se synchronisent dès le retour du réseau.',
        detail: 'L’architecture reste à jour bien après la réunion.',
        visualLabel: 'Gros plan sur un service relié en temps réel aux systèmes, aux données et aux équipes.',
        callouts: ['Temps réel', 'Hors ligne', 'Synchronisé'],
      },
    ],
    governance: {
      eyebrow: 'Gouvernance',
      title: 'Un référentiel gouverné, pas une pile de fichiers.',
      body:
        'Dans un outil de dessin comme dans un DSL, les tags et les technologies sont du texte libre, recopié d’un élément à l’autre et d’un dépôt à l’autre. MapleSpire les centralise dans des catalogues propres à l’organisation : une correction faite au bon endroit s’applique partout.',
      items: [
        {
          title: 'Tags centralisés',
          body: 'Tags et groupes de tags sont définis une seule fois pour toute l’organisation. Renommer, recolorer, fusionner ou archiver un tag s’applique à chaque objet qui le porte, dans tous les paysages.',
        },
        {
          title: 'Catalogue de technologies',
          body: 'Les technologies proviennent d’un catalogue géré : alias, icônes et cycle de vie (active, dépréciée, retirée). Chaque usage précise la version employée, et les ajouts passent par une soumission puis une approbation.',
        },
        {
          title: 'Accès par équipe',
          body: 'Rôles d’organisation, équipes dotées de droits de lecture ou d’écriture par paysage, hérités vers le bas, et authentification unique OIDC avec Google ou Microsoft.',
        },
        {
          title: 'Changements maîtrisés',
          body: 'Préparez une évolution dans un brouillon, consultez la liste des changements, puis fusionnez avec détection des conflits. Historique par diagramme, points de restauration et ADR complètent la traçabilité.',
        },
      ],
      articleLabel: 'MapleSpire ou Structurizr : lequel tient à l’échelle d’une gouvernance d’entreprise?',
      articleCta: 'Lire la comparaison',
    },
    openSource: {
      eyebrow: 'Open source',
      title: 'Votre modèle, sur votre infrastructure.',
      body:
        'Le code de MapleSpire est publié sous licence AGPL-3.0. Hébergez-le chez vous avec Docker Compose, ou découvrez-le d’abord sur la démo hébergée, conçue pour l’essai et non pour la production.',
      proofs: [
        { title: 'Gratuit', body: 'Aucune licence par éditeur : le logiciel et sa démo sont gratuits.' },
        { title: 'Open source', body: 'Code public sous licence AGPL-3.0 sur github.com/MapleSpire/maplespire.' },
        { title: 'Auto-hébergeable', body: 'Docker Compose avec PostgreSQL et Redis : vos données restent sur votre infrastructure.' },
      ],
    },
    facts: {
      eyebrow: 'En bref',
      title: 'Questions fréquentes.',
      items: [
        { question: 'MapleSpire est-il gratuit?', answer: 'Oui. Le logiciel est gratuit et open source, tout comme la démo hébergée.' },
        { question: 'La démo convient-elle à la production?', answer: 'Non. L’instance hébergée sert à découvrir et évaluer le produit. Pour un usage réel, auto-hébergez MapleSpire.' },
        { question: 'Comment l’auto-héberger?', answer: 'Le dépôt fournit une configuration Docker Compose : PostgreSQL 16, Redis, serveur de synchronisation et interface web.' },
        { question: 'Sous quelle licence le code est-il publié?', answer: 'AGPL-3.0 (GNU Affero General Public License v3). Vous pouvez utiliser, modifier et auto-héberger MapleSpire librement; si vous offrez une version modifiée comme service en ligne, vous devez en publier le code. Le dépôt est sur github.com/MapleSpire/maplespire.' },
        { question: 'Peut-on migrer depuis Structurizr?', answer: 'Oui. MapleSpire importe un workspace Structurizr DSL et en génère les diagrammes C4. Il exporte aussi en DSL, Mermaid, JSON, SVG et PNG.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Parlez-nous de votre architecture.',
      body:
        'Un contexte à modéliser, une équipe à outiller, un projet d’auto-hébergement ou une migration depuis Structurizr : écrivez-nous, nous vous répondrons directement.',
      name: 'Nom',
      email: 'Courriel professionnel',
      company: 'Organisation (facultatif)',
      subject: 'Sujet',
      message: 'Votre message',
      messagePlaceholder: 'Aujourd’hui, nos diagrammes…',
      consent: 'J’accepte que MapleSpire utilise ces renseignements pour répondre à ma demande.',
      submit: 'Envoyer le message',
      sending: 'Envoi en cours…',
      success: 'Message reçu. Un accusé de réception vous a été envoyé par courriel.',
      error: 'Le message n’a pas pu être envoyé. Réessayez ou écrivez-nous directement.',
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
      title: 'MapleSpire — Open-source, collaborative C4 architecture modeling',
      description:
        'Open-source C4 architecture modeling: one shared model, governed tags and technologies, real-time collaboration. Free, AGPL-3.0 and self-hostable.',
    },
    nav: {
      home: 'MapleSpire home',
      primaryLabel: 'Primary navigation',
      sequenceLabel: 'Product walkthrough steps',
      story: 'Before / after',
      product: 'Product',
      governance: 'Governance',
      openSource: 'Open source',
      contact: 'Contact',
    },
    actions: {
      discover: 'See the difference',
      openApp: 'Try the demo',
      github: 'View the code on GitHub',
      language: 'Choose language',
      themeLight: 'Switch to light theme',
      themeDark: 'Switch to dark theme',
      skip: 'Skip to contact',
    },
    hero: {
      kicker: 'C4 modeling · open source',
      titleStart: 'One C4 model.',
      titleAccent: 'Every view up to date.',
      body:
        'MapleSpire replaces diagrams that drift out of date with one shared model: every object exists once, every view reflects it, and tags and technologies are managed in one place for the whole organization.',
      free: 'Free',
      open: 'Open source · AGPL-3.0',
      selfHosted: 'Self-hostable',
      promisesLabel: 'MapleSpire commitments',
    },
    comparison: {
      before: 'Hand-drawn diagrams',
      after: 'MapleSpire',
      beforeAlt: 'Architect facing many relationships that are hard to keep current in a drawing tool.',
      control: 'Compare hand-drawn diagrams with MapleSpire',
      beforeMetric: 'Copies to reconcile',
      afterMetric: 'One source of truth',
      hint: 'Drag to compare',
    },
    chapters: [
      {
        id: 'living-model',
        eyebrow: 'The model',
        shortLabel: 'Model',
        title: 'Change it once. Every view follows.',
        body:
          'Every object and relationship exists exactly once. Diagrams reference them, so renaming a service or fixing a dependency updates every view it appears in.',
        detail: 'Model once, explain from every angle.',
        visualLabel: 'MapleSpire shows a clear architecture model on the workspace screen.',
        callouts: ['Single objects', 'Consistent views', 'Tracked decisions'],
      },
      {
        id: 'complete-architecture',
        eyebrow: 'The system',
        shortLabel: 'System',
        title: 'From context to component, without losing the thread.',
        body:
          'Systems, containers, components and dependencies read at a glance, then open up to the level of detail each conversation needs.',
        detail: 'The right view for every audience.',
        visualLabel: 'Architecture components reconnect around a central service.',
        callouts: ['Systems', 'Domains', 'Dependencies'],
      },
      {
        id: 'living-architecture',
        eyebrow: 'Collaboration',
        shortLabel: 'Realtime',
        title: 'The whole team, one model.',
        body:
          'Edit together in real time or keep working offline: your changes sync as soon as the network is back.',
        detail: 'Architecture stays current long after the meeting.',
        visualLabel: 'Close-up of a service connected in real time to systems, data and teams.',
        callouts: ['Realtime', 'Offline', 'Synced'],
      },
    ],
    governance: {
      eyebrow: 'Governance',
      title: 'A governed repository, not a pile of files.',
      body:
        'In drawing tools and DSLs alike, tags and technologies are free text, copied from element to element and repository to repository. MapleSpire keeps them in organization-wide catalogs, so a fix made in the right place applies everywhere.',
      items: [
        {
          title: 'Central tags',
          body: 'Tags and tag groups are defined once for the whole organization. Renaming, recoloring, merging or archiving a tag applies to every object that carries it, across every landscape.',
        },
        {
          title: 'Technology catalog',
          body: 'Technologies come from a managed catalog with aliases, icons and a lifecycle (active, deprecated, retired). Each usage records the version in use, and new entries go through submission and approval.',
        },
        {
          title: 'Team-based access',
          body: 'Organization roles, teams with read or write grants per landscape that inherit downward, and OIDC single sign-on with Google or Microsoft.',
        },
        {
          title: 'Controlled change',
          body: 'Prepare a change in a draft, review the change list, then merge with conflict detection. Per-diagram history, restore points and ADRs complete the audit trail.',
        },
      ],
      articleLabel: 'MapleSpire or Structurizr: which one scales to enterprise governance?',
      articleCta: 'Read the comparison',
    },
    openSource: {
      eyebrow: 'Open source',
      title: 'Your model, on your infrastructure.',
      body:
        'MapleSpire’s code is published under the AGPL-3.0 license. Host it yourself with Docker Compose, or try the hosted demo first — it is built for evaluation, not production.',
      proofs: [
        { title: 'Free', body: 'No per-editor licensing: the software and its demo are free.' },
        { title: 'Open source', body: 'Public code under the AGPL-3.0 license at github.com/MapleSpire/maplespire.' },
        { title: 'Self-hostable', body: 'Docker Compose with PostgreSQL and Redis: your data stays on your infrastructure.' },
      ],
    },
    facts: {
      eyebrow: 'In short',
      title: 'Frequently asked questions.',
      items: [
        { question: 'Is MapleSpire free?', answer: 'Yes. The software is free and open source, and so is the hosted demo.' },
        { question: 'Is the demo meant for production?', answer: 'No. The hosted instance is for discovering and evaluating the product. For real work, self-host MapleSpire.' },
        { question: 'How do I self-host it?', answer: 'The repository ships a Docker Compose setup: PostgreSQL 16, Redis, the sync server and the web app.' },
        { question: 'What license is the code under?', answer: 'AGPL-3.0 (GNU Affero General Public License v3). You can use, modify and self-host MapleSpire freely; if you offer a modified version as an online service, you must publish its source. The repository is at github.com/MapleSpire/maplespire.' },
        { question: 'Can I migrate from Structurizr?', answer: 'Yes. MapleSpire imports a Structurizr DSL workspace and generates its C4 diagrams. It also exports to DSL, Mermaid, JSON, SVG and PNG.' },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us about your architecture.',
      body:
        'A system to model, a team to equip, a self-hosting project or a migration from Structurizr: write to us and we will get back to you directly.',
      name: 'Name',
      email: 'Work email',
      company: 'Organization (optional)',
      subject: 'Subject',
      message: 'Your message',
      messagePlaceholder: 'Today, our diagrams…',
      consent: 'I agree that MapleSpire may use this information to reply to my request.',
      submit: 'Send message',
      sending: 'Sending…',
      success: 'Message received. A confirmation email is on its way.',
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
  es: {
    locale: 'es',
    languageName: 'Español',
    meta: {
      title: 'MapleSpire — Modelado de arquitectura C4 colaborativo y de código abierto',
      description:
        'Herramienta de código abierto para modelar arquitectura C4: un modelo compartido, etiquetas y tecnologías gobernadas y colaboración en tiempo real. Gratuita, AGPL-3.0 y autoalojable.',
    },
    nav: {
      home: 'Inicio de MapleSpire',
      primaryLabel: 'Navegación principal',
      sequenceLabel: 'Pasos de la presentación',
      story: 'Antes / después',
      product: 'Producto',
      governance: 'Gobernanza',
      openSource: 'Código abierto',
      contact: 'Contacto',
    },
    actions: {
      discover: 'Ver la diferencia',
      openApp: 'Probar la demo',
      github: 'Ver el código en GitHub',
      language: 'Elegir idioma',
      themeLight: 'Activar el tema claro',
      themeDark: 'Activar el tema oscuro',
      skip: 'Ir al contacto',
    },
    hero: {
      kicker: 'Modelado C4 · código abierto',
      titleStart: 'Un solo modelo C4.',
      titleAccent: 'Todas tus vistas al día.',
      body:
        'MapleSpire sustituye los diagramas que se quedan obsoletos por un modelo compartido: cada objeto existe una sola vez, cada vista lo refleja, y las etiquetas y tecnologías se gestionan en un único lugar para toda la organización.',
      free: 'Gratis',
      open: 'Código abierto · AGPL-3.0',
      selfHosted: 'Autoalojable',
      promisesLabel: 'Los compromisos de MapleSpire',
    },
    comparison: {
      before: 'Diagramas dibujados',
      after: 'MapleSpire',
      beforeAlt: 'Arquitecto ante numerosas relaciones difíciles de mantener al día en una herramienta de dibujo.',
      control: 'Comparar los diagramas dibujados con MapleSpire',
      beforeMetric: 'Copias que conciliar',
      afterMetric: 'Una única fuente de verdad',
      hint: 'Desliza para comparar',
    },
    chapters: [
      {
        id: 'modelo-vivo',
        eyebrow: 'El modelo',
        shortLabel: 'Modelo',
        title: 'Cámbialo una vez. Todas las vistas lo reflejan.',
        body:
          'Cada objeto y cada relación existen una sola vez. Los diagramas hacen referencia a ellos: renombrar un servicio o corregir una dependencia actualiza todas las vistas en las que aparece.',
        detail: 'Modela una vez y explícalo desde todos los ángulos.',
        visualLabel: 'MapleSpire muestra un modelo de arquitectura claro en la pantalla de trabajo.',
        callouts: ['Objetos únicos', 'Vistas coherentes', 'Decisiones trazadas'],
      },
      {
        id: 'arquitectura-completa',
        eyebrow: 'El sistema',
        shortLabel: 'Sistema',
        title: 'Del contexto al componente, sin perder el hilo.',
        body:
          'Sistemas, contenedores, componentes y dependencias se entienden de un vistazo y se despliegan hasta el nivel de detalle que necesita cada conversación.',
        detail: 'La vista adecuada para cada público.',
        visualLabel: 'Los componentes de la arquitectura se reconectan en torno a un servicio central.',
        callouts: ['Sistemas', 'Dominios', 'Dependencias'],
      },
      {
        id: 'arquitectura-viva',
        eyebrow: 'La colaboración',
        shortLabel: 'Tiempo real',
        title: 'Todo el equipo, un solo modelo.',
        body:
          'Edita con tu equipo en tiempo real o sigue trabajando sin conexión: tus cambios se sincronizan en cuanto vuelve la red.',
        detail: 'La arquitectura sigue al día mucho después de la reunión.',
        visualLabel: 'Primer plano de un servicio conectado en tiempo real con sistemas, datos y equipos.',
        callouts: ['Tiempo real', 'Sin conexión', 'Sincronizado'],
      },
    ],
    governance: {
      eyebrow: 'Gobernanza',
      title: 'Un repositorio gobernado, no un montón de archivos.',
      body:
        'Tanto en las herramientas de dibujo como en los DSL, las etiquetas y las tecnologías son texto libre que se copia de un elemento a otro y de un repositorio a otro. MapleSpire las centraliza en catálogos propios de la organización: una corrección hecha en el lugar adecuado se aplica en todas partes.',
      items: [
        {
          title: 'Etiquetas centralizadas',
          body: 'Las etiquetas y los grupos de etiquetas se definen una sola vez para toda la organización. Renombrar, cambiar de color, fusionar o archivar una etiqueta se aplica a cada objeto que la lleva, en todos los paisajes.',
        },
        {
          title: 'Catálogo de tecnologías',
          body: 'Las tecnologías provienen de un catálogo gestionado, con alias, iconos y ciclo de vida (activa, obsoleta, retirada). Cada uso indica la versión empleada, y las nuevas entradas pasan por una propuesta y una aprobación.',
        },
        {
          title: 'Acceso por equipos',
          body: 'Roles de organización, equipos con permisos de lectura o escritura por paisaje que se heredan hacia abajo, e inicio de sesión único OIDC con Google o Microsoft.',
        },
        {
          title: 'Cambios bajo control',
          body: 'Prepara una evolución en un borrador, revisa la lista de cambios y fusiona con detección de conflictos. El historial por diagrama, los puntos de restauración y los ADR completan la trazabilidad.',
        },
      ],
      articleLabel: 'MapleSpire o Structurizr: ¿cuál escala a la gobernanza de una gran empresa?',
      articleCta: 'Leer la comparativa',
    },
    openSource: {
      eyebrow: 'Código abierto',
      title: 'Tu modelo, en tu infraestructura.',
      body:
        'El código de MapleSpire se publica bajo la licencia AGPL-3.0. Alójalo en tu propia infraestructura con Docker Compose o pruébalo antes en la demo alojada, pensada para evaluar el producto, no para producción.',
      proofs: [
        { title: 'Gratis', body: 'Sin licencias por editor: el software y su demo son gratuitos.' },
        { title: 'Código abierto', body: 'Código público bajo licencia AGPL-3.0 en github.com/MapleSpire/maplespire.' },
        { title: 'Autoalojable', body: 'Docker Compose con PostgreSQL y Redis: tus datos se quedan en tu infraestructura.' },
      ],
    },
    facts: {
      eyebrow: 'En resumen',
      title: 'Preguntas frecuentes.',
      items: [
        { question: '¿MapleSpire es gratuito?', answer: 'Sí. El software es gratuito y de código abierto, igual que la demo alojada.' },
        { question: '¿La demo sirve para producción?', answer: 'No. La instancia alojada sirve para descubrir y evaluar el producto. Para un uso real, aloja MapleSpire en tu propia infraestructura.' },
        { question: '¿Cómo se autoaloja?', answer: 'El repositorio incluye una configuración de Docker Compose: PostgreSQL 16, Redis, el servidor de sincronización y la aplicación web.' },
        { question: '¿Bajo qué licencia se publica el código?', answer: 'AGPL-3.0 (GNU Affero General Public License v3). Puedes usar, modificar y autoalojar MapleSpire libremente; si ofreces una versión modificada como servicio en línea, debes publicar su código fuente. El repositorio está en github.com/MapleSpire/maplespire.' },
        { question: '¿Se puede migrar desde Structurizr?', answer: 'Sí. MapleSpire importa un workspace de Structurizr DSL y genera sus diagramas C4. También exporta a DSL, Mermaid, JSON, SVG y PNG.' },
      ],
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Háblanos de tu arquitectura.',
      body:
        'Un sistema que modelar, un equipo al que dar herramientas, un proyecto de autoalojamiento o una migración desde Structurizr: escríbenos y te responderemos directamente.',
      name: 'Nombre',
      email: 'Correo electrónico profesional',
      company: 'Organización (opcional)',
      subject: 'Asunto',
      message: 'Tu mensaje',
      messagePlaceholder: 'Hoy, nuestros diagramas…',
      consent: 'Acepto que MapleSpire use estos datos para responder a mi solicitud.',
      submit: 'Enviar mensaje',
      sending: 'Enviando…',
      success: 'Mensaje recibido. Te hemos enviado un acuse de recibo por correo electrónico.',
      error: 'No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbenos directamente.',
      privacy: 'Solo usamos tus datos para responder a tu solicitud.',
      direct: 'O escribe a support@maplespire.ca',
    },
    footer: {
      promise: 'Una arquitectura clara, del primer contexto al próximo cambio.',
      github: 'GitHub',
      app: 'Demo',
      contact: 'Contacto',
      navLabel: 'Navegación del pie de página',
      copyright: '© 2026 MapleSpire contributors · Proyecto canadiense',
    },
  },
  it: {
    locale: 'it',
    languageName: 'Italiano',
    meta: {
      title: 'MapleSpire — Modellazione dell’architettura C4 open source e collaborativa',
      description:
        'Strumento open source per modellare l’architettura C4: un modello condiviso, tag e tecnologie governati, collaborazione in tempo reale. Gratuito, AGPL-3.0 e installabile sui tuoi server.',
    },
    nav: {
      home: 'Home di MapleSpire',
      primaryLabel: 'Navigazione principale',
      sequenceLabel: 'Fasi della presentazione',
      story: 'Prima / dopo',
      product: 'Prodotto',
      governance: 'Governance',
      openSource: 'Open source',
      contact: 'Contatti',
    },
    actions: {
      discover: 'Scopri la differenza',
      openApp: 'Prova la demo',
      github: 'Vedi il codice su GitHub',
      language: 'Scegli la lingua',
      themeLight: 'Passa al tema chiaro',
      themeDark: 'Passa al tema scuro',
      skip: 'Vai ai contatti',
    },
    hero: {
      kicker: 'Modellazione C4 · open source',
      titleStart: 'Un solo modello C4.',
      titleAccent: 'Tutte le viste aggiornate.',
      body:
        'MapleSpire sostituisce i diagrammi che invecchiano con un modello condiviso: ogni oggetto esiste una sola volta, ogni vista lo riflette, e tag e tecnologie si gestiscono in un unico punto per tutta l’organizzazione.',
      free: 'Gratuito',
      open: 'Open source · AGPL-3.0',
      selfHosted: 'Self-hosting',
      promisesLabel: 'Gli impegni di MapleSpire',
    },
    comparison: {
      before: 'Diagrammi disegnati',
      after: 'MapleSpire',
      beforeAlt: 'Un architetto alle prese con molte relazioni difficili da tenere aggiornate in uno strumento di disegno.',
      control: 'Confronta i diagrammi disegnati con MapleSpire',
      beforeMetric: 'Copie da riconciliare',
      afterMetric: 'Un’unica fonte di verità',
      hint: 'Trascina per confrontare',
    },
    chapters: [
      {
        id: 'modello-vivo',
        eyebrow: 'Il modello',
        shortLabel: 'Modello',
        title: 'Modifica una volta. Tutte le viste si aggiornano.',
        body:
          'Ogni oggetto e ogni relazione esistono una sola volta. I diagrammi vi fanno riferimento: rinominare un servizio o correggere una dipendenza aggiorna tutte le viste in cui compare.',
        detail: 'Modella una volta, spiega da ogni angolazione.',
        visualLabel: 'MapleSpire mostra un modello architetturale chiaro sullo schermo di lavoro.',
        callouts: ['Oggetti unici', 'Viste coerenti', 'Decisioni tracciate'],
      },
      {
        id: 'architettura-completa',
        eyebrow: 'Il sistema',
        shortLabel: 'Sistema',
        title: 'Dal contesto al componente, senza perdere il filo.',
        body:
          'Sistemi, container, componenti e dipendenze si leggono a colpo d’occhio, poi si esplorano fino al livello di dettaglio che serve a ogni conversazione.',
        detail: 'La vista giusta per ogni pubblico.',
        visualLabel: 'I componenti dell’architettura si ricollegano attorno a un servizio centrale.',
        callouts: ['Sistemi', 'Domini', 'Dipendenze'],
      },
      {
        id: 'architettura-viva',
        eyebrow: 'La collaborazione',
        shortLabel: 'Tempo reale',
        title: 'Tutto il team, un solo modello.',
        body:
          'Modifica insieme al team in tempo reale o continua a lavorare offline: le modifiche si sincronizzano appena torna la rete.',
        detail: 'L’architettura resta aggiornata ben oltre la riunione.',
        visualLabel: 'Primo piano di un servizio collegato in tempo reale a sistemi, dati e team.',
        callouts: ['Tempo reale', 'Offline', 'Sincronizzato'],
      },
    ],
    governance: {
      eyebrow: 'Governance',
      title: 'Un repository governato, non una pila di file.',
      body:
        'Negli strumenti di disegno come nei DSL, tag e tecnologie sono testo libero, copiato da un elemento all’altro e da un repository all’altro. MapleSpire li centralizza in cataloghi dell’organizzazione: una correzione fatta nel punto giusto vale ovunque.',
      items: [
        {
          title: 'Tag centralizzati',
          body: 'Tag e gruppi di tag si definiscono una sola volta per tutta l’organizzazione. Rinominare, ricolorare, unire o archiviare un tag vale per ogni oggetto che lo porta, in tutti i landscape.',
        },
        {
          title: 'Catalogo delle tecnologie',
          body: 'Le tecnologie provengono da un catalogo gestito, con alias, icone e ciclo di vita (attiva, deprecata, dismessa). Ogni utilizzo indica la versione impiegata e le nuove voci passano per una proposta e un’approvazione.',
        },
        {
          title: 'Accesso per team',
          body: 'Ruoli di organizzazione, team con permessi di lettura o scrittura per landscape ereditati verso il basso, e single sign-on OIDC con Google o Microsoft.',
        },
        {
          title: 'Modifiche sotto controllo',
          body: 'Prepara un’evoluzione in una bozza, rivedi l’elenco delle modifiche, poi esegui il merge con rilevamento dei conflitti. Cronologia per diagramma, punti di ripristino e ADR completano la tracciabilità.',
        },
      ],
      articleLabel: 'MapleSpire o Structurizr: quale regge la governance di una grande azienda?',
      articleCta: 'Leggi il confronto',
    },
    openSource: {
      eyebrow: 'Open source',
      title: 'Il tuo modello, sulla tua infrastruttura.',
      body:
        'Il codice di MapleSpire è pubblicato con licenza AGPL-3.0. Installalo sui tuoi server con Docker Compose, oppure provalo prima sulla demo ospitata, pensata per la valutazione e non per la produzione.',
      proofs: [
        { title: 'Gratuito', body: 'Nessuna licenza per editor: il software e la sua demo sono gratuiti.' },
        { title: 'Open source', body: 'Codice pubblico con licenza AGPL-3.0 su github.com/MapleSpire/maplespire.' },
        { title: 'Self-hosting', body: 'Docker Compose con PostgreSQL e Redis: i tuoi dati restano sulla tua infrastruttura.' },
      ],
    },
    facts: {
      eyebrow: 'In breve',
      title: 'Domande frequenti.',
      items: [
        { question: 'MapleSpire è gratuito?', answer: 'Sì. Il software è gratuito e open source, così come la demo ospitata.' },
        { question: 'La demo è adatta alla produzione?', answer: 'No. L’istanza ospitata serve a scoprire e valutare il prodotto. Per un uso reale, installa MapleSpire sui tuoi server.' },
        { question: 'Come si installa sui propri server?', answer: 'Il repository include una configurazione Docker Compose: PostgreSQL 16, Redis, il server di sincronizzazione e l’applicazione web.' },
        { question: 'Con quale licenza è pubblicato il codice?', answer: 'AGPL-3.0 (GNU Affero General Public License v3). Puoi usare, modificare e ospitare MapleSpire liberamente; se offri una versione modificata come servizio online, devi pubblicarne il codice sorgente. Il repository è su github.com/MapleSpire/maplespire.' },
        { question: 'Si può migrare da Structurizr?', answer: 'Sì. MapleSpire importa un workspace Structurizr DSL e ne genera i diagrammi C4. Esporta anche in DSL, Mermaid, JSON, SVG e PNG.' },
      ],
    },
    contact: {
      eyebrow: 'Contatti',
      title: 'Raccontaci la tua architettura.',
      body:
        'Un sistema da modellare, un team da dotare degli strumenti giusti, un progetto di self-hosting o una migrazione da Structurizr: scrivici e ti risponderemo direttamente.',
      name: 'Nome',
      email: 'Email di lavoro',
      company: 'Organizzazione (facoltativo)',
      subject: 'Oggetto',
      message: 'Il tuo messaggio',
      messagePlaceholder: 'Oggi i nostri diagrammi…',
      consent: 'Accetto che MapleSpire utilizzi queste informazioni per rispondere alla mia richiesta.',
      submit: 'Invia il messaggio',
      sending: 'Invio in corso…',
      success: 'Messaggio ricevuto. Ti abbiamo inviato una conferma via email.',
      error: 'Non è stato possibile inviare il messaggio. Riprova o scrivici direttamente.',
      privacy: 'Usiamo i tuoi dati solo per rispondere alla tua richiesta.',
      direct: 'Oppure scrivi a support@maplespire.ca',
    },
    footer: {
      promise: 'Un’architettura chiara, dal primo contesto alla prossima modifica.',
      github: 'GitHub',
      app: 'Demo',
      contact: 'Contatti',
      navLabel: 'Navigazione a piè di pagina',
      copyright: '© 2026 MapleSpire contributors · Progetto canadese',
    },
  },
  de: {
    locale: 'de',
    languageName: 'Deutsch',
    meta: {
      title: 'MapleSpire — Kollaborative C4-Architekturmodellierung als Open Source',
      description:
        'Open-Source-Werkzeug für die C4-Architekturmodellierung: ein gemeinsames Modell, zentral verwaltete Tags und Technologien, Zusammenarbeit in Echtzeit. Kostenlos, AGPL-3.0 und selbst hostbar.',
    },
    nav: {
      home: 'MapleSpire Startseite',
      primaryLabel: 'Hauptnavigation',
      sequenceLabel: 'Schritte der Produkttour',
      story: 'Vorher / nachher',
      product: 'Produkt',
      governance: 'Governance',
      openSource: 'Open Source',
      contact: 'Kontakt',
    },
    actions: {
      discover: 'Den Unterschied sehen',
      openApp: 'Demo testen',
      github: 'Code auf GitHub ansehen',
      language: 'Sprache wählen',
      themeLight: 'Helles Design aktivieren',
      themeDark: 'Dunkles Design aktivieren',
      skip: 'Zum Kontakt springen',
    },
    hero: {
      kicker: 'C4-Modellierung · Open Source',
      titleStart: 'Ein C4-Modell.',
      titleAccent: 'Jede Ansicht aktuell.',
      body:
        'MapleSpire ersetzt Diagramme, die veralten, durch ein gemeinsames Modell: Jedes Objekt existiert genau einmal, jede Ansicht spiegelt es wider, und Tags und Technologien werden an einer Stelle für die ganze Organisation verwaltet.',
      free: 'Kostenlos',
      open: 'Open Source · AGPL-3.0',
      selfHosted: 'Selbst hostbar',
      promisesLabel: 'Was MapleSpire verspricht',
    },
    comparison: {
      before: 'Gezeichnete Diagramme',
      after: 'MapleSpire',
      beforeAlt: 'Ein Architekt vor zahlreichen Beziehungen, die sich in einem Zeichenwerkzeug kaum aktuell halten lassen.',
      control: 'Gezeichnete Diagramme und MapleSpire vergleichen',
      beforeMetric: 'Kopien, die abgeglichen werden müssen',
      afterMetric: 'Eine einzige Quelle der Wahrheit',
      hint: 'Zum Vergleichen ziehen',
    },
    chapters: [
      {
        id: 'lebendiges-modell',
        eyebrow: 'Das Modell',
        shortLabel: 'Modell',
        title: 'Einmal ändern. Alle Ansichten ziehen mit.',
        body:
          'Jedes Objekt und jede Beziehung existiert genau einmal. Diagramme verweisen darauf: Benennen Sie einen Service um oder korrigieren Sie eine Abhängigkeit, wird jede betroffene Ansicht automatisch aktualisiert.',
        detail: 'Einmal modellieren, aus jedem Blickwinkel erklären.',
        visualLabel: 'MapleSpire zeigt ein übersichtliches Architekturmodell auf dem Arbeitsbildschirm.',
        callouts: ['Eindeutige Objekte', 'Konsistente Ansichten', 'Nachvollziehbare Entscheidungen'],
      },
      {
        id: 'vollstaendige-architektur',
        eyebrow: 'Das System',
        shortLabel: 'System',
        title: 'Vom Kontext bis zur Komponente, ohne den Faden zu verlieren.',
        body:
          'Systeme, Container, Komponenten und Abhängigkeiten erschließen sich auf einen Blick und öffnen sich bis zu dem Detailgrad, den jedes Gespräch braucht.',
        detail: 'Die richtige Ansicht für jedes Publikum.',
        visualLabel: 'Architekturkomponenten verbinden sich neu um einen zentralen Service.',
        callouts: ['Systeme', 'Domänen', 'Abhängigkeiten'],
      },
      {
        id: 'lebendige-architektur',
        eyebrow: 'Zusammenarbeit',
        shortLabel: 'Echtzeit',
        title: 'Das ganze Team, ein Modell.',
        body:
          'Bearbeiten Sie gemeinsam in Echtzeit oder arbeiten Sie offline weiter: Ihre Änderungen werden synchronisiert, sobald das Netz zurück ist.',
        detail: 'Die Architektur bleibt aktuell, lange nach dem Meeting.',
        visualLabel: 'Nahaufnahme eines Service, der in Echtzeit mit Systemen, Daten und Teams verbunden ist.',
        callouts: ['Echtzeit', 'Offline', 'Synchronisiert'],
      },
    ],
    governance: {
      eyebrow: 'Governance',
      title: 'Ein verwaltetes Repository statt eines Dateistapels.',
      body:
        'In Zeichenwerkzeugen wie in DSLs sind Tags und Technologien Freitext, der von Element zu Element und von Repository zu Repository kopiert wird. MapleSpire führt sie in organisationsweiten Katalogen: Eine Korrektur an der richtigen Stelle gilt überall.',
      items: [
        {
          title: 'Zentrale Tags',
          body: 'Tags und Tag-Gruppen werden einmal für die ganze Organisation definiert. Wer einen Tag umbenennt, umfärbt, zusammenführt oder archiviert, ändert ihn an jedem Objekt, das ihn trägt – in allen Landschaften.',
        },
        {
          title: 'Technologiekatalog',
          body: 'Technologien stammen aus einem gepflegten Katalog mit Aliasen, Icons und Lebenszyklus (aktiv, veraltet, ausgemustert). Jede Verwendung hält die eingesetzte Version fest, und neue Einträge durchlaufen Einreichung und Freigabe.',
        },
        {
          title: 'Teambasierter Zugriff',
          body: 'Organisationsrollen, Teams mit Lese- oder Schreibrechten pro Landschaft, die nach unten vererbt werden, und OIDC-Single-Sign-on mit Google oder Microsoft.',
        },
        {
          title: 'Kontrollierte Änderungen',
          body: 'Bereiten Sie eine Änderung in einem Entwurf vor, prüfen Sie die Änderungsliste und führen Sie sie dann mit Konflikterkennung zusammen. Verlauf pro Diagramm, Wiederherstellungspunkte und ADRs machen jede Änderung nachvollziehbar.',
        },
      ],
      articleLabel: 'MapleSpire oder Structurizr: Welches Werkzeug trägt Governance im Unternehmensmaßstab?',
      articleCta: 'Vergleich lesen',
    },
    openSource: {
      eyebrow: 'Open Source',
      title: 'Ihr Modell, auf Ihrer Infrastruktur.',
      body:
        'Der Code von MapleSpire steht unter der Lizenz AGPL-3.0. Hosten Sie ihn selbst mit Docker Compose oder testen Sie zuerst die gehostete Demo – sie dient der Evaluierung, nicht dem Produktivbetrieb.',
      proofs: [
        { title: 'Kostenlos', body: 'Keine Lizenzen pro Editor: Software und Demo sind kostenlos.' },
        { title: 'Open Source', body: 'Öffentlicher Code unter der Lizenz AGPL-3.0 auf github.com/MapleSpire/maplespire.' },
        { title: 'Selbst hostbar', body: 'Docker Compose mit PostgreSQL und Redis: Ihre Daten bleiben auf Ihrer Infrastruktur.' },
      ],
    },
    facts: {
      eyebrow: 'Kurz gesagt',
      title: 'Häufige Fragen.',
      items: [
        { question: 'Ist MapleSpire kostenlos?', answer: 'Ja. Die Software ist kostenlos und Open Source, die gehostete Demo ebenfalls.' },
        { question: 'Ist die Demo für den Produktivbetrieb gedacht?', answer: 'Nein. Die gehostete Instanz dient zum Kennenlernen und Evaluieren. Für den echten Einsatz hosten Sie MapleSpire selbst.' },
        { question: 'Wie hoste ich MapleSpire selbst?', answer: 'Das Repository enthält ein Docker-Compose-Setup: PostgreSQL 16, Redis, den Synchronisationsserver und die Web-App.' },
        { question: 'Unter welcher Lizenz steht der Code?', answer: 'AGPL-3.0 (GNU Affero General Public License v3). Sie dürfen MapleSpire frei nutzen, ändern und selbst hosten; wenn Sie eine geänderte Version als Onlinedienst anbieten, müssen Sie deren Quellcode veröffentlichen. Das Repository liegt unter github.com/MapleSpire/maplespire.' },
        { question: 'Kann ich von Structurizr migrieren?', answer: 'Ja. MapleSpire importiert einen Structurizr-DSL-Workspace und erzeugt daraus die C4-Diagramme. Außerdem exportiert es nach DSL, Mermaid, JSON, SVG und PNG.' },
      ],
    },
    contact: {
      eyebrow: 'Kontakt',
      title: 'Erzählen Sie uns von Ihrer Architektur.',
      body:
        'Ein System, das modelliert werden soll, ein Team, das die richtigen Werkzeuge braucht, ein Self-Hosting-Projekt oder eine Migration von Structurizr: Schreiben Sie uns, wir antworten Ihnen direkt.',
      name: 'Name',
      email: 'Geschäftliche E-Mail',
      company: 'Organisation (optional)',
      subject: 'Betreff',
      message: 'Ihre Nachricht',
      messagePlaceholder: 'Heute sind unsere Diagramme…',
      consent: 'Ich bin einverstanden, dass MapleSpire diese Angaben verwendet, um meine Anfrage zu beantworten.',
      submit: 'Nachricht senden',
      sending: 'Wird gesendet…',
      success: 'Nachricht erhalten. Eine Bestätigung ist per E-Mail unterwegs.',
      error: 'Die Nachricht konnte nicht gesendet werden. Versuchen Sie es erneut oder schreiben Sie uns direkt.',
      privacy: 'Wir verwenden Ihre Angaben ausschließlich zur Beantwortung Ihrer Anfrage.',
      direct: 'Oder schreiben Sie an support@maplespire.ca',
    },
    footer: {
      promise: 'Klare Architektur, vom ersten Kontext bis zur nächsten Änderung.',
      github: 'GitHub',
      app: 'Demo',
      contact: 'Kontakt',
      navLabel: 'Fußzeilennavigation',
      copyright: '© 2026 MapleSpire contributors · Kanadisches Projekt',
    },
  },
  pt: {
    locale: 'pt',
    languageName: 'Português',
    meta: {
      title: 'MapleSpire — Modelagem de arquitetura C4 colaborativa e de código aberto',
      description:
        'Ferramenta de código aberto para modelagem de arquitetura C4: um modelo compartilhado, tags e tecnologias governadas e colaboração em tempo real. Gratuita, AGPL-3.0 e auto-hospedável.',
    },
    nav: {
      home: 'Página inicial do MapleSpire',
      primaryLabel: 'Navegação principal',
      sequenceLabel: 'Etapas da apresentação',
      story: 'Antes / depois',
      product: 'Produto',
      governance: 'Governança',
      openSource: 'Código aberto',
      contact: 'Contato',
    },
    actions: {
      discover: 'Veja a diferença',
      openApp: 'Experimente a demo',
      github: 'Ver o código no GitHub',
      language: 'Escolher idioma',
      themeLight: 'Ativar o tema claro',
      themeDark: 'Ativar o tema escuro',
      skip: 'Pular para o contato',
    },
    hero: {
      kicker: 'Modelagem C4 · código aberto',
      titleStart: 'Um único modelo C4.',
      titleAccent: 'Todas as visões em dia.',
      body:
        'O MapleSpire substitui diagramas que ficam desatualizados por um modelo compartilhado: cada objeto existe uma única vez, cada visão o reflete, e tags e tecnologias são gerenciadas em um só lugar para toda a organização.',
      free: 'Gratuito',
      open: 'Código aberto · AGPL-3.0',
      selfHosted: 'Auto-hospedável',
      promisesLabel: 'Os compromissos do MapleSpire',
    },
    comparison: {
      before: 'Diagramas desenhados',
      after: 'MapleSpire',
      beforeAlt: 'Arquiteto diante de muitas relações difíceis de manter atualizadas em uma ferramenta de desenho.',
      control: 'Comparar diagramas desenhados com o MapleSpire',
      beforeMetric: 'Cópias para conciliar',
      afterMetric: 'Uma única fonte da verdade',
      hint: 'Arraste para comparar',
    },
    chapters: [
      {
        id: 'modelo-vivo',
        eyebrow: 'O modelo',
        shortLabel: 'Modelo',
        title: 'Altere uma vez. Todas as visões acompanham.',
        body:
          'Cada objeto e cada relação existem uma única vez. Os diagramas fazem referência a eles: renomear um serviço ou corrigir uma dependência atualiza todas as visões em que ele aparece.',
        detail: 'Modele uma vez, explique de todos os ângulos.',
        visualLabel: 'O MapleSpire mostra um modelo de arquitetura claro na tela de trabalho.',
        callouts: ['Objetos únicos', 'Visões coerentes', 'Decisões rastreadas'],
      },
      {
        id: 'arquitetura-completa',
        eyebrow: 'O sistema',
        shortLabel: 'Sistema',
        title: 'Do contexto ao componente, sem perder o fio da meada.',
        body:
          'Sistemas, contêineres, componentes e dependências são compreendidos num relance e se abrem até o nível de detalhe que cada conversa exige.',
        detail: 'A visão certa para cada público.',
        visualLabel: 'Os componentes da arquitetura se reconectam em torno de um serviço central.',
        callouts: ['Sistemas', 'Domínios', 'Dependências'],
      },
      {
        id: 'arquitetura-viva',
        eyebrow: 'Colaboração',
        shortLabel: 'Tempo real',
        title: 'O time inteiro, um só modelo.',
        body:
          'Edite com a equipe em tempo real ou continue trabalhando offline: suas alterações são sincronizadas assim que a rede volta.',
        detail: 'A arquitetura continua atualizada muito depois da reunião.',
        visualLabel: 'Close de um serviço conectado em tempo real a sistemas, dados e equipes.',
        callouts: ['Tempo real', 'Offline', 'Sincronizado'],
      },
    ],
    governance: {
      eyebrow: 'Governança',
      title: 'Um repositório governado, não uma pilha de arquivos.',
      body:
        'Em ferramentas de desenho e em DSLs, tags e tecnologias são texto livre, copiado de elemento em elemento e de repositório em repositório. O MapleSpire as centraliza em catálogos da organização: uma correção feita no lugar certo vale para tudo.',
      items: [
        {
          title: 'Tags centralizadas',
          body: 'Tags e grupos de tags são definidos uma única vez para toda a organização. Renomear, mudar a cor, mesclar ou arquivar uma tag vale para cada objeto que a usa, em todas as paisagens.',
        },
        {
          title: 'Catálogo de tecnologias',
          body: 'As tecnologias vêm de um catálogo gerenciado, com aliases, ícones e ciclo de vida (ativa, obsoleta, descontinuada). Cada uso registra a versão empregada, e novas entradas passam por submissão e aprovação.',
        },
        {
          title: 'Acesso por equipe',
          body: 'Papéis na organização, equipes com permissão de leitura ou escrita por paisagem, herdada para baixo, e login único OIDC com Google ou Microsoft.',
        },
        {
          title: 'Mudanças sob controle',
          body: 'Prepare uma evolução em um rascunho, revise a lista de alterações e faça o merge com detecção de conflitos. Histórico por diagrama, pontos de restauração e ADRs completam a rastreabilidade.',
        },
      ],
      articleLabel: 'MapleSpire ou Structurizr: qual acompanha a governança de uma grande empresa?',
      articleCta: 'Ler a comparação',
    },
    openSource: {
      eyebrow: 'Código aberto',
      title: 'Seu modelo, na sua infraestrutura.',
      body:
        'O código do MapleSpire é publicado sob a licença AGPL-3.0. Hospede-o você mesmo com Docker Compose ou experimente antes a demo hospedada, feita para avaliação, não para produção.',
      proofs: [
        { title: 'Gratuito', body: 'Sem licença por editor: o software e a demo são gratuitos.' },
        { title: 'Código aberto', body: 'Código público sob licença AGPL-3.0 em github.com/MapleSpire/maplespire.' },
        { title: 'Auto-hospedável', body: 'Docker Compose com PostgreSQL e Redis: seus dados ficam na sua infraestrutura.' },
      ],
    },
    facts: {
      eyebrow: 'Em resumo',
      title: 'Perguntas frequentes.',
      items: [
        { question: 'O MapleSpire é gratuito?', answer: 'Sim. O software é gratuito e de código aberto, assim como a demo hospedada.' },
        { question: 'A demo serve para produção?', answer: 'Não. A instância hospedada serve para conhecer e avaliar o produto. Para uso real, hospede o MapleSpire na sua própria infraestrutura.' },
        { question: 'Como hospedar por conta própria?', answer: 'O repositório inclui uma configuração Docker Compose: PostgreSQL 16, Redis, o servidor de sincronização e a aplicação web.' },
        { question: 'Sob qual licença o código é publicado?', answer: 'AGPL-3.0 (GNU Affero General Public License v3). Você pode usar, modificar e hospedar o MapleSpire livremente; se oferecer uma versão modificada como serviço online, deve publicar o código-fonte dela. O repositório está em github.com/MapleSpire/maplespire.' },
        { question: 'Dá para migrar do Structurizr?', answer: 'Sim. O MapleSpire importa um workspace Structurizr DSL e gera os diagramas C4 correspondentes. Também exporta para DSL, Mermaid, JSON, SVG e PNG.' },
      ],
    },
    contact: {
      eyebrow: 'Contato',
      title: 'Conte-nos sobre a sua arquitetura.',
      body:
        'Um sistema para modelar, uma equipe para equipar, um projeto de auto-hospedagem ou uma migração do Structurizr: escreva para nós e responderemos diretamente.',
      name: 'Nome',
      email: 'E-mail corporativo',
      company: 'Organização (opcional)',
      subject: 'Assunto',
      message: 'Sua mensagem',
      messagePlaceholder: 'Hoje, nossos diagramas…',
      consent: 'Concordo que o MapleSpire use estas informações para responder à minha solicitação.',
      submit: 'Enviar mensagem',
      sending: 'Enviando…',
      success: 'Mensagem recebida. Um e-mail de confirmação está a caminho.',
      error: 'Não foi possível enviar a mensagem. Tente novamente ou escreva diretamente para nós.',
      privacy: 'Usamos seus dados apenas para responder à sua solicitação.',
      direct: 'Ou escreva para support@maplespire.ca',
    },
    footer: {
      promise: 'Arquitetura clara, do primeiro contexto à próxima mudança.',
      github: 'GitHub',
      app: 'Demo',
      contact: 'Contato',
      navLabel: 'Navegação do rodapé',
      copyright: '© 2026 MapleSpire contributors · Projeto canadense',
    },
  },
  zh: {
    locale: 'zh',
    languageName: '简体中文',
    meta: {
      title: 'MapleSpire — 开源协作式 C4 架构建模工具',
      description: 'MapleSpire 将 C4 模型、视图、受治理的标签与技术目录以及架构决策汇集到同一个共享空间。免费、开源（AGPL-3.0），可自行托管。',
    },
    nav: {
      home: 'MapleSpire 首页',
      primaryLabel: '主导航',
      sequenceLabel: '转型步骤',
      story: '前后对比',
      product: '产品',
      governance: '治理',
      openSource: '开源',
      contact: '联系',
    },
    actions: {
      discover: '查看转型过程',
      openApp: '试用演示',
      github: '在 GitHub 上查看代码',
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
      open: '开源 · AGPL-3.0',
      selfHosted: '可自行托管',
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
    governance: {
      eyebrow: '治理',
      title: '受治理的统一资源库，而不是一堆文件。',
      body: '无论是绘图工具还是 DSL，标签和技术通常都是自由文本，在元素之间、代码仓库之间反复复制。MapleSpire 将它们集中在组织级目录中：在正确的位置修改一次，处处生效。',
      items: [
        { title: '集中管理的标签', body: '标签和标签组只需为整个组织定义一次。重命名、改色、合并或归档标签，会作用于所有景观中带有该标签的每个对象。' },
        { title: '技术目录', body: '技术来自受管理的目录，包含别名、图标和生命周期（使用中、已弃用、已退役）。每次使用都会记录所用版本，新条目需经过提交和审批。' },
        { title: '按团队授权', body: '组织角色、按景观授予并向下继承的团队读写权限，以及通过 Google 或 Microsoft 的 OIDC 单点登录。' },
        { title: '可控的变更', body: '在草稿中准备变更，查看变更清单，再通过冲突检测进行合并。按图表的历史记录、还原点和 ADR 让变更可追溯。' },
      ],
      articleLabel: 'MapleSpire 与 Structurizr：哪一个更适合企业级治理？',
      articleCta: '阅读对比',
    },
    openSource: {
      eyebrow: '开源',
      title: '您的模型，运行在您的基础设施上。',
      body: 'MapleSpire 的代码以 AGPL-3.0 许可证发布。您可以使用 Docker Compose 自行托管，也可以先试用托管演示——它仅用于评估，不适用于生产。',
      proofs: [
        { title: '免费', body: '不按编辑者收费：软件及其演示均免费。' },
        { title: '开源', body: '公开代码，采用 AGPL-3.0 许可证：github.com/MapleSpire/maplespire。' },
        { title: '可自行托管', body: '使用 Docker Compose、PostgreSQL 和 Redis：数据始终留在您的基础设施中。' },
      ],
    },
    facts: {
      eyebrow: '简要说明',
      title: '常见问题。',
      items: [
        { question: 'MapleSpire 免费吗？', answer: '是的。软件免费且开源，托管演示同样免费。' },
        { question: '演示适用于生产环境吗？', answer: '不适用。托管实例仅用于了解和评估产品。实际使用请自行托管 MapleSpire。' },
        { question: '如何自行托管？', answer: '代码仓库提供 Docker Compose 配置：PostgreSQL 16、Redis、同步服务器和 Web 应用。' },
        { question: '代码采用什么许可证？', answer: 'AGPL-3.0。源代码位于 github.com/MapleSpire/maplespire。' },
        { question: '可以从 Structurizr 迁移吗？', answer: '可以。MapleSpire 可导入 Structurizr DSL 工作区并生成 C4 图表，也可导出为 DSL、Mermaid、JSON、SVG 和 PNG。' },
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
      title: 'MapleSpire — オープンソースの共同 C4 アーキテクチャモデリングツール',
      description: 'MapleSpire は C4 モデル、ビュー、管理されたタグと技術カタログ、アーキテクチャの意思決定を一つの共有スペースにまとめます。無料、オープンソース（AGPL-3.0）、セルフホスト可能です。',
    },
    nav: {
      home: 'MapleSpire ホーム',
      primaryLabel: 'メインナビゲーション',
      sequenceLabel: '変革のステップ',
      story: 'ビフォー／アフター',
      product: '製品',
      governance: 'ガバナンス',
      openSource: 'オープンソース',
      contact: 'お問い合わせ',
    },
    actions: {
      discover: '変化を見る',
      openApp: 'デモを試す',
      github: 'GitHub でコードを見る',
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
      open: 'オープンソース · AGPL-3.0',
      selfHosted: 'セルフホスト可能',
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
    governance: {
      eyebrow: 'ガバナンス',
      title: 'ファイルの山ではなく、管理されたリポジトリを。',
      body: '作図ツールでも DSL でも、タグや技術は自由記述のテキストで、要素からリポジトリへとコピーされていきます。MapleSpire はそれらを組織全体のカタログにまとめるため、正しい場所で一度直せばすべてに反映されます。',
      items: [
        { title: '一元管理のタグ', body: 'タグとタググループは組織全体で一度だけ定義します。名前の変更、色の変更、統合、アーカイブは、すべてのランドスケープでそのタグを持つ各オブジェクトに反映されます。' },
        { title: '技術カタログ', body: '技術は別名、アイコン、ライフサイクル（有効・非推奨・廃止）を持つ管理カタログから選びます。各利用箇所で使用バージョンを記録し、新規項目は申請と承認を経て追加されます。' },
        { title: 'チーム単位のアクセス', body: '組織ロール、ランドスケープごとに付与され下位へ継承されるチームの読み取り・書き込み権限、Google または Microsoft による OIDC シングルサインオン。' },
        { title: '管理された変更', body: '変更をドラフトで準備し、変更一覧を確認してから、競合検出付きでマージします。図ごとの履歴、復元ポイント、ADR が追跡性を支えます。' },
      ],
      articleLabel: 'MapleSpire と Structurizr：企業のガバナンスに向いているのは？',
      articleCta: '比較を読む',
    },
    openSource: {
      eyebrow: 'オープンソース',
      title: 'あなたのモデルを、あなたのインフラで。',
      body: 'MapleSpire のコードは AGPL-3.0 ライセンスで公開されています。Docker Compose でセルフホストするか、まずホスト版デモでお試しください（デモは評価用で、本番向けではありません）。',
      proofs: [
        { title: '無料', body: '編集者ごとのライセンスは不要です。ソフトウェアもデモも無料です。' },
        { title: 'オープンソース', body: 'AGPL-3.0 ライセンスの公開コード：github.com/MapleSpire/maplespire。' },
        { title: 'セルフホスト可能', body: 'Docker Compose、PostgreSQL、Redis で運用でき、データは自社のインフラに留まります。' },
      ],
    },
    facts: {
      eyebrow: '要点',
      title: 'よくある質問。',
      items: [
        { question: 'MapleSpire は無料ですか？', answer: 'はい。ソフトウェアは無料のオープンソースで、ホスト版デモも無料です。' },
        { question: 'デモは本番環境向けですか？', answer: 'いいえ。ホスト版は製品の確認と評価のためのものです。実運用ではセルフホストしてください。' },
        { question: 'セルフホストするには？', answer: 'リポジトリに Docker Compose 構成（PostgreSQL 16、Redis、同期サーバー、Web アプリ）が含まれています。' },
        { question: 'コードのライセンスは？', answer: 'AGPL-3.0 です。ソースコードは github.com/MapleSpire/maplespire にあります。' },
        { question: 'Structurizr から移行できますか？', answer: 'はい。Structurizr DSL のワークスペースを取り込み、C4 図を生成します。DSL、Mermaid、JSON、SVG、PNG への書き出しにも対応しています。' },
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
      title: 'MapleSpire — 오픈 소스 협업형 C4 아키텍처 모델링 도구',
      description: 'MapleSpire는 C4 모델, 뷰, 관리되는 태그·기술 카탈로그와 아키텍처 의사결정을 하나의 공유 공간에 모읍니다. 무료이며 오픈 소스(AGPL-3.0)이고 셀프 호스팅할 수 있습니다.',
    },
    nav: {
      home: 'MapleSpire 홈',
      primaryLabel: '주요 탐색',
      sequenceLabel: '전환 단계',
      story: '전과 후',
      product: '제품',
      governance: '거버넌스',
      openSource: '오픈 소스',
      contact: '문의',
    },
    actions: {
      discover: '변화 살펴보기',
      openApp: '데모 체험하기',
      github: 'GitHub에서 코드 보기',
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
      open: '오픈 소스 · AGPL-3.0',
      selfHosted: '셀프 호스팅 가능',
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
    governance: {
      eyebrow: '거버넌스',
      title: '파일 더미가 아닌, 관리되는 저장소.',
      body: '드로잉 도구든 DSL이든 태그와 기술은 대개 자유 텍스트로, 요소에서 요소로, 저장소에서 저장소로 복사됩니다. MapleSpire는 이를 조직 전체 카탈로그로 모아 올바른 곳에서 한 번 고치면 모든 곳에 반영되게 합니다.',
      items: [
        { title: '중앙 관리 태그', body: '태그와 태그 그룹은 조직 전체에 한 번만 정의합니다. 태그의 이름 변경, 색상 변경, 병합, 보관은 모든 랜드스케이프에서 해당 태그가 붙은 모든 객체에 적용됩니다.' },
        { title: '기술 카탈로그', body: '기술은 별칭, 아이콘, 수명 주기(활성·사용 중단·폐기)를 갖춘 관리 카탈로그에서 선택합니다. 사용처마다 사용 버전을 기록하며, 새 항목은 제출과 승인을 거칩니다.' },
        { title: '팀 단위 접근 제어', body: '조직 역할, 랜드스케이프별로 부여되고 하위로 상속되는 팀의 읽기·쓰기 권한, Google 또는 Microsoft를 통한 OIDC 싱글 사인온.' },
        { title: '통제된 변경', body: '초안에서 변경을 준비하고 변경 목록을 검토한 뒤 충돌 감지와 함께 병합합니다. 다이어그램별 이력, 복원 지점, ADR이 추적성을 보완합니다.' },
      ],
      articleLabel: 'MapleSpire와 Structurizr: 엔터프라이즈 거버넌스에 더 잘 맞는 것은?',
      articleCta: '비교 읽기',
    },
    openSource: {
      eyebrow: '오픈 소스',
      title: '당신의 모델을, 당신의 인프라에서.',
      body: 'MapleSpire 코드는 AGPL-3.0 라이선스로 공개되어 있습니다. Docker Compose로 직접 호스팅하거나, 먼저 호스팅 데모로 체험해 보세요. 데모는 평가용이며 운영용이 아닙니다.',
      proofs: [
        { title: '무료', body: '편집자별 라이선스가 없습니다. 소프트웨어와 데모 모두 무료입니다.' },
        { title: '오픈 소스', body: 'AGPL-3.0 라이선스 공개 코드: github.com/MapleSpire/maplespire.' },
        { title: '셀프 호스팅 가능', body: 'Docker Compose, PostgreSQL, Redis로 운영하며 데이터는 귀사 인프라에 남습니다.' },
      ],
    },
    facts: {
      eyebrow: '요약',
      title: '자주 묻는 질문.',
      items: [
        { question: 'MapleSpire는 무료인가요?', answer: '예. 소프트웨어는 무료 오픈 소스이며 호스팅 데모도 무료입니다.' },
        { question: '데모를 운영 환경에 사용할 수 있나요?', answer: '아니요. 호스팅 인스턴스는 제품 확인과 평가용입니다. 실제 업무에는 MapleSpire를 직접 호스팅하세요.' },
        { question: '어떻게 셀프 호스팅하나요?', answer: '저장소에 Docker Compose 구성(PostgreSQL 16, Redis, 동기화 서버, 웹 앱)이 포함되어 있습니다.' },
        { question: '코드 라이선스는 무엇인가요?', answer: 'AGPL-3.0입니다. 소스 코드는 github.com/MapleSpire/maplespire에 있습니다.' },
        { question: 'Structurizr에서 옮겨 올 수 있나요?', answer: '예. Structurizr DSL 워크스페이스를 가져와 C4 다이어그램을 생성합니다. DSL, Mermaid, JSON, SVG, PNG로 내보내기도 지원합니다.' },
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
      title: 'MapleSpire — ओपन सोर्स सहयोगी C4 आर्किटेक्चर मॉडलिंग टूल',
      description: 'MapleSpire C4 मॉडल, उसके व्यू, नियंत्रित टैग और टेक्नोलॉजी कैटलॉग और आर्किटेक्चर निर्णयों को एक साझा स्थान में लाता है। निःशुल्क, ओपन सोर्स (AGPL-3.0) और सेल्फ-होस्ट करने योग्य।',
    },
    nav: {
      home: 'MapleSpire होम',
      primaryLabel: 'मुख्य नेविगेशन',
      sequenceLabel: 'बदलाव के चरण',
      story: 'पहले / बाद में',
      product: 'उत्पाद',
      governance: 'गवर्नेंस',
      openSource: 'ओपन सोर्स',
      contact: 'संपर्क',
    },
    actions: {
      discover: 'बदलाव देखें',
      openApp: 'डेमो आज़माएँ',
      github: 'GitHub पर कोड देखें',
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
      open: 'ओपन सोर्स · AGPL-3.0',
      selfHosted: 'सेल्फ-होस्ट करने योग्य',
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
    governance: {
      eyebrow: 'गवर्नेंस',
      title: 'फ़ाइलों का ढेर नहीं, एक नियंत्रित रिपॉज़िटरी।',
      body: 'ड्रॉइंग टूल हो या DSL, टैग और टेक्नोलॉजी आम तौर पर मुक्त टेक्स्ट होते हैं, जो एक तत्व से दूसरे और एक रिपॉज़िटरी से दूसरी में कॉपी होते रहते हैं। MapleSpire उन्हें पूरे संगठन के कैटलॉग में रखता है, ताकि सही जगह किया गया एक सुधार हर जगह लागू हो।',
      items: [
        { title: 'केंद्रीय टैग', body: 'टैग और टैग समूह पूरे संगठन के लिए एक बार परिभाषित होते हैं। किसी टैग का नाम या रंग बदलना, उसे मर्ज या आर्काइव करना हर लैंडस्केप में उस टैग वाले हर ऑब्जेक्ट पर लागू होता है।' },
        { title: 'टेक्नोलॉजी कैटलॉग', body: 'टेक्नोलॉजी एक प्रबंधित कैटलॉग से आती हैं, जिसमें उपनाम, आइकन और जीवनचक्र (सक्रिय, अप्रचलित, सेवानिवृत्त) होते हैं। हर उपयोग में प्रयुक्त संस्करण दर्ज होता है, और नई प्रविष्टियाँ सबमिशन और अनुमोदन से गुज़रती हैं।' },
        { title: 'टीम-आधारित पहुँच', body: 'संगठन भूमिकाएँ, हर लैंडस्केप के लिए टीमों को पढ़ने या लिखने की अनुमति जो नीचे तक विरासत में मिलती है, और Google या Microsoft के साथ OIDC सिंगल साइन-ऑन।' },
        { title: 'नियंत्रित बदलाव', body: 'बदलाव को ड्राफ़्ट में तैयार करें, बदलावों की सूची देखें, फिर टकराव पहचान के साथ मर्ज करें। हर आरेख का इतिहास, रिस्टोर पॉइंट और ADR ट्रेसबिलिटी पूरी करते हैं।' },
      ],
      articleLabel: 'MapleSpire या Structurizr: एंटरप्राइज़ गवर्नेंस के लिए कौन बेहतर है?',
      articleCta: 'तुलना पढ़ें',
    },
    openSource: {
      eyebrow: 'ओपन सोर्स',
      title: 'आपका मॉडल, आपके इन्फ्रास्ट्रक्चर पर।',
      body: 'MapleSpire का कोड AGPL-3.0 लाइसेंस के तहत प्रकाशित है। इसे Docker Compose के साथ स्वयं होस्ट करें, या पहले होस्ट किया गया डेमो आज़माएँ — वह मूल्यांकन के लिए है, प्रोडक्शन के लिए नहीं।',
      proofs: [
        { title: 'निःशुल्क', body: 'प्रति एडिटर कोई लाइसेंस नहीं: सॉफ़्टवेयर और उसका डेमो निःशुल्क हैं।' },
        { title: 'ओपन सोर्स', body: 'AGPL-3.0 लाइसेंस के तहत सार्वजनिक कोड: github.com/MapleSpire/maplespire।' },
        { title: 'सेल्फ-होस्ट करने योग्य', body: 'PostgreSQL और Redis के साथ Docker Compose: आपका डेटा आपके इन्फ्रास्ट्रक्चर पर रहता है।' },
      ],
    },
    facts: {
      eyebrow: 'संक्षेप में',
      title: 'अक्सर पूछे जाने वाले प्रश्न।',
      items: [
        { question: 'क्या MapleSpire निःशुल्क है?', answer: 'हाँ। सॉफ़्टवेयर निःशुल्क और ओपन सोर्स है, और होस्ट किया गया डेमो भी।' },
        { question: 'क्या डेमो प्रोडक्शन के लिए है?', answer: 'नहीं। होस्ट किया गया इंस्टेंस उत्पाद को देखने और परखने के लिए है। वास्तविक काम के लिए MapleSpire को सेल्फ-होस्ट करें।' },
        { question: 'इसे सेल्फ-होस्ट कैसे करें?', answer: 'रिपॉज़िटरी में Docker Compose सेटअप है: PostgreSQL 16, Redis, सिंक सर्वर और वेब ऐप।' },
        { question: 'कोड किस लाइसेंस के तहत है?', answer: 'AGPL-3.0। सोर्स कोड github.com/MapleSpire/maplespire पर है।' },
        { question: 'क्या Structurizr से माइग्रेट किया जा सकता है?', answer: 'हाँ। MapleSpire Structurizr DSL वर्कस्पेस आयात करके उसके C4 आरेख बनाता है। यह DSL, Mermaid, JSON, SVG और PNG में निर्यात भी करता है।' },
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
  ar: {
    locale: 'ar',
    languageName: 'العربية',
    meta: {
      title: 'MapleSpire — نمذجة معمارية وفق C4، تعاونية ومفتوحة المصدر',
      description:
        'أداة مفتوحة المصدر لنمذجة البنية المعمارية وفق C4: نموذج مشترك، ووسوم وتقنيات خاضعة للحوكمة، وتعاون في الوقت الفعلي. مجانية، بترخيص AGPL-3.0، وقابلة للاستضافة الذاتية.',
    },
    nav: {
      home: 'الصفحة الرئيسية لـ MapleSpire',
      primaryLabel: 'التنقل الرئيسي',
      sequenceLabel: 'مراحل العرض',
      story: 'قبل / بعد',
      product: 'المنتج',
      governance: 'الحوكمة',
      openSource: 'مفتوح المصدر',
      contact: 'تواصل معنا',
    },
    actions: {
      discover: 'شاهد الفرق',
      openApp: 'جرّب العرض التجريبي',
      github: 'عرض الشيفرة على GitHub',
      language: 'اختر اللغة',
      themeLight: 'التبديل إلى المظهر الفاتح',
      themeDark: 'التبديل إلى المظهر الداكن',
      skip: 'الانتقال إلى نموذج التواصل',
    },
    hero: {
      kicker: 'نمذجة C4 · مفتوحة المصدر',
      titleStart: 'نموذج C4 واحد.',
      titleAccent: 'وكل العروض محدّثة.',
      body:
        'يستبدل MapleSpire المخططات التي تتقادم بنموذج مشترك: كل عنصر موجود مرة واحدة فقط، وكل عرض يعكسه، وتُدار الوسوم والتقنيات في مكان واحد للمؤسسة بأكملها.',
      free: 'مجاني',
      open: 'مفتوح المصدر · AGPL-3.0',
      selfHosted: 'قابل للاستضافة الذاتية',
      promisesLabel: 'التزامات MapleSpire',
    },
    comparison: {
      before: 'مخططات مرسومة',
      after: 'MapleSpire',
      beforeAlt: 'مهندس معماري أمام علاقات كثيرة يصعب إبقاؤها محدّثة في أداة رسم.',
      control: 'قارن بين المخططات المرسومة وMapleSpire',
      beforeMetric: 'نسخ تحتاج إلى مواءمة',
      afterMetric: 'مصدر واحد للحقيقة',
      hint: 'اسحب للمقارنة',
    },
    chapters: [
      {
        id: 'living-model',
        eyebrow: 'النموذج',
        shortLabel: 'النموذج',
        title: 'عدّل مرة واحدة، فتتبعك كل العروض.',
        body:
          'كل عنصر وكل علاقة موجودان مرة واحدة فقط، والمخططات تشير إليهما؛ لذا فإن إعادة تسمية خدمة أو تصحيح اعتمادية يحدّث كل عرض تظهر فيه.',
        detail: 'نمذج مرة واحدة، واشرح من كل زاوية.',
        visualLabel: 'يعرض MapleSpire نموذجًا معماريًا واضحًا على شاشة العمل.',
        callouts: ['عناصر فريدة', 'عروض متّسقة', 'قرارات موثّقة'],
      },
      {
        id: 'complete-architecture',
        eyebrow: 'النظام',
        shortLabel: 'النظام',
        title: 'من السياق إلى المكوّن، دون أن تفقد الخيط.',
        body:
          'تُقرأ الأنظمة والحاويات والمكوّنات والاعتماديات بنظرة واحدة، ثم تتكشّف حتى مستوى التفصيل الذي يحتاجه كل نقاش.',
        detail: 'العرض المناسب لكل جمهور.',
        visualLabel: 'تعيد مكوّنات البنية المعمارية الاتصال حول خدمة مركزية.',
        callouts: ['الأنظمة', 'النطاقات', 'الاعتماديات'],
      },
      {
        id: 'living-architecture',
        eyebrow: 'التعاون',
        shortLabel: 'الوقت الفعلي',
        title: 'الفريق كله على نموذج واحد.',
        body:
          'حرّر مع فريقك في الوقت الفعلي أو تابع العمل دون اتصال: تُزامَن تعديلاتك فور عودة الشبكة.',
        detail: 'تبقى البنية المعمارية محدّثة بعد الاجتماع بوقت طويل.',
        visualLabel: 'لقطة مقرّبة لخدمة متصلة في الوقت الفعلي بالأنظمة والبيانات والفرق.',
        callouts: ['الوقت الفعلي', 'دون اتصال', 'متزامن'],
      },
    ],
    governance: {
      eyebrow: 'الحوكمة',
      title: 'مستودع خاضع للحوكمة، لا كومة من الملفات.',
      body:
        'في أدوات الرسم كما في لغات DSL، الوسوم والتقنيات نص حر يُنسخ من عنصر إلى آخر ومن مستودع إلى آخر. يجمعها MapleSpire في كتالوجات على مستوى المؤسسة، فيسري التصحيح المُجرى في المكان الصحيح على كل شيء.',
      items: [
        {
          title: 'وسوم مركزية',
          body: 'تُعرَّف الوسوم ومجموعاتها مرة واحدة للمؤسسة بأكملها. وإعادة تسمية وسم أو تغيير لونه أو دمجه أو أرشفته تنطبق على كل عنصر يحمله، في جميع المشاهد المعمارية.',
        },
        {
          title: 'كتالوج التقنيات',
          body: 'تأتي التقنيات من كتالوج مُدار يتضمن أسماء بديلة وأيقونات ودورة حياة (نشطة، متقادمة، متوقفة). يسجّل كل استخدام الإصدار المعتمد، وتمر الإدخالات الجديدة بمرحلتَي تقديم وموافقة.',
        },
        {
          title: 'وصول حسب الفريق',
          body: 'أدوار على مستوى المؤسسة، وفرق بصلاحيات قراءة أو كتابة لكل مشهد معماري تُورَّث إلى المستويات الأدنى، وتسجيل دخول موحّد عبر OIDC مع Google أو Microsoft.',
        },
        {
          title: 'تغييرات منضبطة',
          body: 'حضّر التغيير في مسودة، وراجع قائمة التغييرات، ثم ادمجه مع كشف التعارضات. ويكمل سجلُّ كل مخطط ونقاطُ الاستعادة وسجلاتُ القرارات المعمارية (ADR) إمكانيةَ التتبّع.',
        },
      ],
      articleLabel: 'MapleSpire أم Structurizr: أيّهما يواكب الحوكمة على مستوى المؤسسات؟',
      articleCta: 'اقرأ المقارنة',
    },
    openSource: {
      eyebrow: 'مفتوح المصدر',
      title: 'نموذجك، على بنيتك التحتية.',
      body:
        'شيفرة MapleSpire منشورة بترخيص AGPL-3.0. استضفه بنفسك باستخدام Docker Compose، أو جرّب أولًا العرض التجريبي المستضاف، المصمَّم للتقييم لا للإنتاج.',
      proofs: [
        { title: 'مجاني', body: 'لا تراخيص لكل محرّر: البرنامج وعرضه التجريبي مجانيان.' },
        { title: 'مفتوح المصدر', body: 'شيفرة عامة بترخيص AGPL-3.0 على github.com/MapleSpire/maplespire.' },
        { title: 'قابل للاستضافة الذاتية', body: 'Docker Compose مع PostgreSQL وRedis: تبقى بياناتك على بنيتك التحتية.' },
      ],
    },
    facts: {
      eyebrow: 'باختصار',
      title: 'الأسئلة الشائعة.',
      items: [
        { question: 'هل MapleSpire مجاني؟', answer: 'نعم. البرنامج مجاني ومفتوح المصدر، وكذلك العرض التجريبي المستضاف.' },
        { question: 'هل العرض التجريبي مخصص للإنتاج؟', answer: 'لا. النسخة المستضافة مخصّصة لاكتشاف المنتج وتقييمه. للاستخدام الفعلي، استضف MapleSpire بنفسك.' },
        { question: 'كيف أستضيفه بنفسي؟', answer: 'يتضمن المستودع إعداد Docker Compose يضم PostgreSQL 16 وRedis وخادم المزامنة وتطبيق الويب.' },
        { question: 'ما ترخيص الشيفرة؟', answer: 'AGPL-3.0 (رخصة جنو العمومية أفيرو، الإصدار 3). يمكنك استخدام MapleSpire وتعديله واستضافته بحرية؛ وإذا قدّمت نسخة معدّلة منه كخدمة عبر الإنترنت، فعليك نشر شيفرتها المصدرية. المستودع متاح على github.com/MapleSpire/maplespire.' },
        { question: 'هل يمكن الانتقال من Structurizr؟', answer: 'نعم. يستورد MapleSpire مساحة عمل Structurizr DSL وينشئ منها مخططات C4، كما يصدّر إلى DSL وMermaid وJSON وSVG وPNG.' },
      ],
    },
    contact: {
      eyebrow: 'تواصل معنا',
      title: 'حدّثنا عن بنيتك المعمارية.',
      body:
        'نظام تريد نمذجته، أو فريق تريد تجهيزه، أو مشروع استضافة ذاتية، أو انتقال من Structurizr: راسلنا وسنرد عليك مباشرة.',
      name: 'الاسم',
      email: 'البريد الإلكتروني المهني',
      company: 'المؤسسة (اختياري)',
      subject: 'الموضوع',
      message: 'رسالتك',
      messagePlaceholder: 'اليوم، مخططاتنا…',
      consent: 'أوافق على أن يستخدم MapleSpire هذه المعلومات للرد على طلبي.',
      submit: 'إرسال الرسالة',
      sending: 'جارٍ الإرسال…',
      success: 'تم استلام رسالتك. رسالة تأكيد في طريقها إلى بريدك الإلكتروني.',
      error: 'تعذّر إرسال الرسالة. حاول مرة أخرى أو راسلنا مباشرة.',
      privacy: 'نستخدم بياناتك فقط للرد على طلبك.',
      direct: 'أو راسلنا على support@maplespire.ca',
    },
    footer: {
      promise: 'بنية معمارية واضحة، من السياق الأول إلى التغيير التالي.',
      github: 'GitHub',
      app: 'العرض التجريبي',
      contact: 'تواصل معنا',
      navLabel: 'تنقل التذييل',
      copyright: '© 2026 MapleSpire contributors · مشروع كندي',
    },
  },
};

export function getCopy(locale: Locale): SiteCopy {
  return copy[locale];
}
