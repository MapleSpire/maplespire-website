import type { Locale } from './content';

export type AlternativeId =
  | 'maplespire'
  | 'icepanel'
  | 'archyl'
  | 'structurizr'
  | 'c4-model'
  | 'visio'
  | 'lucidchart'
  | 'creately'
  | 'smartdraw'
  | 'drawio'
  | 'excalidraw'
  | 'archi'
  | 'mermaid'
  | 'plantuml'
  | 'd2';

export type AlternativeGroup = 'model' | 'drawing' | 'code' | 'method';
export type AlternativeFilter = 'all' | AlternativeGroup;
export type Approach = 'visualModel' | 'modelAsCode' | 'eaModel' | 'drawing' | 'whiteboard' | 'diagramAsCode' | 'method';
export type C4Support = 'native' | 'strong' | 'experimental' | 'mapping' | 'manual' | 'none' | 'definition';
export type SharedModel = 'yes' | 'partial' | 'no' | 'na';
export type Collaboration = 'realtime' | 'cloud' | 'git' | 'single' | 'none' | 'na';
export type Offline = 'yes' | 'limited' | 'no' | 'na';
export type Deployment = 'yes' | 'enterprise' | 'local' | 'editor' | 'pending' | 'no' | 'na';
export type SourceCode = 'open' | 'mixed' | 'announced' | 'closed' | 'na';

export type AlternativeProduct = {
  id: AlternativeId;
  name: string;
  group: AlternativeGroup;
  approach: Approach;
  c4: C4Support;
  sharedModel: SharedModel;
  collaboration: Collaboration;
  offline: Offline;
  deployment: Deployment;
  sourceCode: SourceCode;
  featured?: boolean;
  sources: Array<{ label: string; url: string }>;
};

export const alternativeProducts: AlternativeProduct[] = [
  {
    id: 'maplespire',
    name: 'MapleSpire',
    group: 'model',
    approach: 'visualModel',
    c4: 'native',
    sharedModel: 'yes',
    collaboration: 'realtime',
    offline: 'yes',
    deployment: 'yes',
    sourceCode: 'open',
    featured: true,
    sources: [{ label: 'GitHub', url: 'https://github.com/MapleSpire/maplespire' }],
  },
  {
    id: 'icepanel',
    name: 'IcePanel',
    group: 'model',
    approach: 'visualModel',
    c4: 'native',
    sharedModel: 'yes',
    collaboration: 'realtime',
    offline: 'no',
    deployment: 'no',
    sourceCode: 'closed',
    sources: [
      { label: 'Docs', url: 'https://docs.icepanel.io/core-features/modelling' },
      { label: 'Pricing', url: 'https://icepanel.io/pricing' },
    ],
  },
  {
    id: 'archyl',
    name: 'Archyl',
    group: 'model',
    approach: 'visualModel',
    c4: 'native',
    sharedModel: 'yes',
    collaboration: 'cloud',
    offline: 'no',
    deployment: 'enterprise',
    sourceCode: 'closed',
    sources: [
      { label: 'Features', url: 'https://www.archyl.com/features' },
      { label: 'Pricing', url: 'https://www.archyl.com/pricing' },
    ],
  },
  {
    id: 'structurizr',
    name: 'Structurizr',
    group: 'model',
    approach: 'modelAsCode',
    c4: 'native',
    sharedModel: 'yes',
    collaboration: 'cloud',
    offline: 'yes',
    deployment: 'yes',
    sourceCode: 'mixed',
    sources: [
      { label: 'Server', url: 'https://docs.structurizr.com/server' },
      { label: 'Enterprise modelling', url: 'https://docs.structurizr.com/workspaces/enterprise' },
    ],
  },
  {
    id: 'c4-model',
    name: 'C4 Model',
    group: 'method',
    approach: 'method',
    c4: 'definition',
    sharedModel: 'na',
    collaboration: 'na',
    offline: 'na',
    deployment: 'na',
    sourceCode: 'na',
    sources: [
      { label: 'Method', url: 'https://c4model.com/' },
      { label: 'Tooling', url: 'https://c4model.com/tooling' },
    ],
  },
  {
    id: 'visio',
    name: 'Microsoft Visio',
    group: 'drawing',
    approach: 'drawing',
    c4: 'manual',
    sharedModel: 'no',
    collaboration: 'realtime',
    offline: 'yes',
    deployment: 'no',
    sourceCode: 'closed',
    sources: [{ label: 'Plans', url: 'https://www.microsoft.com/en-us/microsoft-365/visio/visio-plans-and-pricing' }],
  },
  {
    id: 'lucidchart',
    name: 'Lucidchart',
    group: 'drawing',
    approach: 'drawing',
    c4: 'manual',
    sharedModel: 'no',
    collaboration: 'realtime',
    offline: 'limited',
    deployment: 'no',
    sourceCode: 'closed',
    sources: [
      { label: 'Product', url: 'https://lucid.co/product/lucidchart' },
      { label: 'Pricing', url: 'https://lucid.co/lucidchart/trial' },
    ],
  },
  {
    id: 'creately',
    name: 'Creately',
    group: 'drawing',
    approach: 'drawing',
    c4: 'manual',
    sharedModel: 'partial',
    collaboration: 'realtime',
    offline: 'limited',
    deployment: 'enterprise',
    sourceCode: 'closed',
    sources: [
      { label: 'Plans', url: 'https://creately.com/plans/' },
      { label: 'Plan details', url: 'https://creately.com/help/account-management-and-administration/creately-plans/' },
    ],
  },
  {
    id: 'smartdraw',
    name: 'SmartDraw',
    group: 'drawing',
    approach: 'drawing',
    c4: 'manual',
    sharedModel: 'no',
    collaboration: 'realtime',
    offline: 'no',
    deployment: 'no',
    sourceCode: 'closed',
    sources: [
      { label: 'FAQ', url: 'https://www.smartdraw.com/about/official-smartdraw-faq.htm' },
      { label: 'Pricing', url: 'https://www.smartdraw.com/buy/index.htm' },
    ],
  },
  {
    id: 'drawio',
    name: 'draw.io / diagrams.net',
    group: 'drawing',
    approach: 'drawing',
    c4: 'manual',
    sharedModel: 'no',
    collaboration: 'cloud',
    offline: 'yes',
    deployment: 'yes',
    sourceCode: 'open',
    sources: [
      { label: 'About', url: 'https://www.drawio.com/docs/about/' },
      { label: 'Offline', url: 'https://www.drawio.com/docs/manual/editor/offline/' },
    ],
  },
  {
    id: 'excalidraw',
    name: 'Excalidraw / Excalidraw+',
    group: 'drawing',
    approach: 'whiteboard',
    c4: 'manual',
    sharedModel: 'no',
    collaboration: 'realtime',
    offline: 'limited',
    deployment: 'editor',
    sourceCode: 'mixed',
    sources: [
      { label: 'Pricing', url: 'https://plus.excalidraw.com/pricing' },
      { label: 'Source', url: 'https://github.com/excalidraw/excalidraw' },
    ],
  },
  {
    id: 'archi',
    name: 'Archi + coArchi',
    group: 'model',
    approach: 'eaModel',
    c4: 'mapping',
    sharedModel: 'yes',
    collaboration: 'git',
    offline: 'yes',
    deployment: 'local',
    sourceCode: 'open',
    sources: [
      { label: 'Archi', url: 'https://www.archimatetool.com/' },
      { label: 'Plugins', url: 'https://www.archimatetool.com/plugins/' },
    ],
  },
  {
    id: 'mermaid',
    name: 'Mermaid',
    group: 'code',
    approach: 'diagramAsCode',
    c4: 'experimental',
    sharedModel: 'no',
    collaboration: 'git',
    offline: 'yes',
    deployment: 'yes',
    sourceCode: 'open',
    sources: [
      { label: 'C4 syntax', url: 'https://mermaid.js.org/syntax/c4.html' },
      { label: 'Docs', url: 'https://mermaid.js.org/intro/' },
    ],
  },
  {
    id: 'plantuml',
    name: 'PlantUML + C4-PlantUML',
    group: 'code',
    approach: 'diagramAsCode',
    c4: 'strong',
    sharedModel: 'no',
    collaboration: 'git',
    offline: 'yes',
    deployment: 'yes',
    sourceCode: 'open',
    sources: [
      { label: 'C4 library', url: 'https://github.com/plantuml-stdlib/C4-PlantUML' },
      { label: 'PlantUML', url: 'https://plantuml.com/' },
    ],
  },
  {
    id: 'd2',
    name: 'D2',
    group: 'code',
    approach: 'diagramAsCode',
    c4: 'none',
    sharedModel: 'no',
    collaboration: 'git',
    offline: 'yes',
    deployment: 'yes',
    sourceCode: 'open',
    sources: [{ label: 'Docs', url: 'https://d2lang.com/' }],
  },
];

export function filterAlternativeProducts(filter: AlternativeFilter) {
  if (filter === 'all') return alternativeProducts;
  return alternativeProducts.filter((product) => product.featured || product.group === filter);
}

type TokenLabels = {
  approach: Record<Approach, string>;
  c4: Record<C4Support, string>;
  sharedModel: Record<SharedModel, string>;
  collaboration: Record<Collaboration, string>;
  offline: Record<Offline, string>;
  deployment: Record<Deployment, string>;
  sourceCode: Record<SourceCode, string>;
};

export type AlternativesCopy = {
  nav: string;
  eyebrow: string;
  title: string;
  body: string;
  verified: string;
  caveat: string;
  filtersLabel: string;
  filters: Record<AlternativeFilter, string>;
  columns: {
    product: string;
    approach: string;
    c4: string;
    sharedModel: string;
    collaboration: string;
    offline: string;
    deployment: string;
    sourceCode: string;
    price: string;
    take: string;
  };
  sources: string;
  ourProduct: string;
  legend: { strong: string; conditional: string; unavailable: string; notApplicable: string };
  tokens: TokenLabels;
  prices: Record<AlternativeId, string>;
  takes: Record<AlternativeId, string>;
};

const english: AlternativesCopy = {
  nav: 'Compare',
  eyebrow: 'A candid market view',
  title: 'Compare approaches, not just feature lists.',
  body: 'Compare MapleSpire with IcePanel, Structurizr, Visio, draw.io and diagram-as-code tools. This grid separates native C4 capabilities from manual work, and centrally governed metadata from free text.',
  verified: 'Checked against official product pages on August 2, 2026.',
  caveat: 'Prices are public list prices in USD where available, before tax. “C4 Model” is a method, not software. Plans change: follow the descriptively labelled official sources in each row.',
  filtersLabel: 'Filter comparison by approach',
  filters: { all: 'All 15', model: 'Architecture models', drawing: 'Drawing & whiteboards', code: 'Diagram as code', method: 'Method' },
  columns: {
    product: 'Product', approach: 'Approach', c4: 'C4 support', sharedModel: 'Connected model', collaboration: 'Teamwork', offline: 'Offline editing', deployment: 'Self-hosting', sourceCode: 'Source', price: 'Public entry point', take: 'Best fit · limits',
  },
  sources: 'Official sources',
  ourProduct: 'Our product',
  legend: { strong: 'Native / available', conditional: 'Partial / conditional', unavailable: 'Not available', notApplicable: 'Not applicable' },
  tokens: {
    approach: { visualModel: 'Visual model', modelAsCode: 'Model as code', eaModel: 'EA model', drawing: 'Drawing canvas', whiteboard: 'Whiteboard', diagramAsCode: 'Diagram as code', method: 'Method / notation' },
    c4: { native: 'Native', strong: 'Strong library', experimental: 'Experimental', mapping: 'Mapping / add-on', manual: 'Manual', none: 'No native C4', definition: 'The definition' },
    sharedModel: { yes: 'Yes', partial: 'Partial', no: 'No', na: 'N/A' },
    collaboration: { realtime: 'Real time', cloud: 'Cloud / platform', git: 'Git workflow', single: 'Single user', none: 'None built in', na: 'N/A' },
    offline: { yes: 'Yes', limited: 'Limited', no: 'No', na: 'N/A' },
    deployment: { yes: 'Yes', enterprise: 'Enterprise / inquiry', local: 'Local + Git', editor: 'Editor only', pending: 'Release pending', no: 'No', na: 'N/A' },
    sourceCode: { open: 'Open source', mixed: 'Mixed', announced: 'Announced · pending', closed: 'Closed', na: 'N/A' },
  },
  prices: {
    maplespire: 'Free and open source (AGPL-3.0) · free hosted demo',
    icepanel: 'Free: 5 editors / 100 objects · Growth: US$40/editor/mo, annual',
    archyl: 'Free individual plan · paid per editor',
    structurizr: 'Free open-core server and local viewer · licensed binaries for SSO and roles',
    'c4-model': 'Free method and documentation',
    visio: 'In some Microsoft 365 plans · Plan 1 US$5 / Plan 2 US$15 user/mo, annual',
    lucidchart: 'Free: 3 docs / 60 shapes · Individual US$9/mo + tax',
    creately: 'Free: 45 items/workspace · paid plans',
    smartdraw: 'Free trial · Individual US$9.95/mo, annual',
    drawio: 'Free core editor · paid Atlassian integrations',
    excalidraw: 'Free editor · Plus US$6/user/mo',
    archi: 'Free',
    mermaid: 'Free open source · optional Mermaid Chart plans',
    plantuml: 'Free open source',
    d2: 'Free open source · optional commercial tooling',
  },
  takes: {
    maplespire: 'Visual C4 on one shared model, with organization-wide tag and technology catalogs, real-time collaboration and offline sync. Self-hosted sync currently runs as a single instance.',
    icepanel: 'A mature hosted visual C4 model. The documented product is SaaS; there is no general offline editor or self-hosted edition.',
    archyl: 'C4, architecture-as-code and AI-assisted discovery in one product. On-premise is a higher-tier feature; offline editing is not documented.',
    structurizr: 'Precise C4 modelling as code, reviewed in Git. Tags and technologies are free text per element, and the enterprise landscape is regenerated from team workspaces.',
    'c4-model': 'The shared vocabulary behind the comparison. It defines abstractions and diagrams, but provides no editor, storage or collaboration itself.',
    visio: 'Broad business and technical diagramming with Microsoft collaboration. C4 and cross-view consistency remain manual.',
    lucidchart: 'Polished cloud diagramming and co-editing. Offline is limited to previously opened documents and it is not a C4 model.',
    creately: 'A flexible visual workspace with data-backed objects and collaboration. C4 semantics and cross-view architecture rules are manual.',
    smartdraw: 'Template-rich technical drawing with real-time multi-user editing. It requires an internet connection and has no free plan.',
    drawio: 'Excellent free, open and offline drawing control. C4 diagrams are drawings, so repeated elements and views must be reconciled manually.',
    excalidraw: 'Fast, human sketches and collaborative workshops. The editor is open source, while Plus is hosted; neither is an architecture model.',
    archi: 'Strong free ArchiMate modelling with Git-based coArchi collaboration. C4 requires a mapping or add-on and collaboration is not live co-editing.',
    mermaid: 'Convenient diagrams inside Markdown and code review. Its C4 syntax is officially experimental and each diagram remains separate.',
    plantuml: 'Mature C4 diagrams in repositories and documentation. It is a drawing library, not a connected visual architecture model.',
    d2: 'Readable, fully offline architecture-as-code with strong automatic layout. It has no native C4 semantics or built-in live collaboration.',
  },
};

const french: AlternativesCopy = {
  ...english,
  nav: 'Comparer',
  eyebrow: 'Comparatif du marché',
  title: 'Comparez les approches, pas seulement les fonctionnalités.',
  body: 'Comparez MapleSpire à IcePanel, Structurizr, Visio, draw.io et aux outils de diagrammes en code. Cette grille distingue les fonctions C4 natives du travail manuel, et les métadonnées gouvernées centralement du texte libre.',
  verified: 'Vérifié sur les pages officielles des produits le 2 août 2026.',
  caveat: 'Prix publics en dollars US lorsqu’ils sont publiés, avant taxes. « C4 Model » est une méthode, pas un logiciel. Les offres évoluent : chaque rangée mène à des sources officielles clairement libellées.',
  filtersLabel: 'Filtrer la comparaison par approche',
  filters: { all: 'Les 15', model: 'Modèles d’architecture', drawing: 'Dessin et tableaux blancs', code: 'Diagrammes en code', method: 'Méthode' },
  columns: { product: 'Produit', approach: 'Approche', c4: 'Prise en charge C4', sharedModel: 'Modèle relié', collaboration: 'Travail d’équipe', offline: 'Édition hors ligne', deployment: 'Auto-hébergement', sourceCode: 'Code source', price: 'Point d’entrée public', take: 'Points forts · limites' },
  sources: 'Sources officielles',
  ourProduct: 'Notre produit',
  legend: { strong: 'Natif / disponible', conditional: 'Partiel / conditionnel', unavailable: 'Non disponible', notApplicable: 'Sans objet' },
  tokens: {
    approach: { visualModel: 'Modèle visuel', modelAsCode: 'Modèle en code', eaModel: 'Modèle EA', drawing: 'Canevas de dessin', whiteboard: 'Tableau blanc', diagramAsCode: 'Diagramme en code', method: 'Méthode / notation' },
    c4: { native: 'Natif', strong: 'Bibliothèque solide', experimental: 'Expérimental', mapping: 'Correspondance / extension', manual: 'Manuel', none: 'Pas de C4 natif', definition: 'La définition' },
    sharedModel: { yes: 'Oui', partial: 'Partiel', no: 'Non', na: 'S.O.' },
    collaboration: { realtime: 'Temps réel', cloud: 'Nuage / plateforme', git: 'Flux Git', single: 'Mono-utilisateur', none: 'Aucune intégrée', na: 'S.O.' },
    offline: { yes: 'Oui', limited: 'Limitée', no: 'Non', na: 'S.O.' },
    deployment: { yes: 'Oui', enterprise: 'Entreprise / sur demande', local: 'Local + Git', editor: 'Éditeur seulement', pending: 'Publication à venir', no: 'Non', na: 'S.O.' },
    sourceCode: { open: 'Open source', mixed: 'Mixte', announced: 'Annoncé · à venir', closed: 'Fermé', na: 'S.O.' },
  },
  prices: {
    maplespire: 'Gratuit et open source (AGPL-3.0) · démo hébergée gratuite', icepanel: 'Gratuit : 5 éditeurs / 100 objets · Growth : 40 $ US/éditeur/mois, annuel', archyl: 'Forfait individuel gratuit · paiement par éditeur', structurizr: 'Serveur open core et visionneuse locale gratuits · binaires sous licence pour SSO et rôles', 'c4-model': 'Méthode et documentation gratuites', visio: 'Inclus dans certains forfaits Microsoft 365 · Plan 1 : 5 $ US / Plan 2 : 15 $ US utilisateur/mois, annuel', lucidchart: 'Gratuit : 3 documents / 60 formes · Individuel : 9 $ US/mois + taxes', creately: 'Gratuit : 45 éléments/espace · forfaits payants', smartdraw: 'Essai gratuit · Individuel : 9,95 $ US/mois, annuel', drawio: 'Éditeur principal gratuit · intégrations Atlassian payantes', excalidraw: 'Éditeur gratuit · Plus : 6 $ US/utilisateur/mois', archi: 'Gratuit', mermaid: 'Open source gratuit · forfaits Mermaid Chart facultatifs', plantuml: 'Open source gratuit', d2: 'Open source gratuit · outils commerciaux facultatifs',
  },
  takes: {
    maplespire: 'C4 visuel sur un modèle partagé, catalogues de tags et de technologies communs à l’organisation, collaboration en temps réel et synchronisation hors ligne. En auto-hébergement, la synchronisation tourne pour l’instant sur une seule instance.',
    icepanel: 'Un modèle C4 visuel hébergé et mature. Le produit documenté est SaaS; aucun éditeur hors ligne ni forfait auto-hébergé général.',
    archyl: 'C4, architecture en code et découverte assistée par IA. Le déploiement sur site est réservé à un niveau supérieur; le hors-ligne n’est pas documenté.',
    structurizr: 'Modélisation C4 précise en code, revue dans Git. Tags et technologies sont du texte libre propre à chaque élément, et le paysage d’entreprise est régénéré à partir des workspaces d’équipe.',
    'c4-model': 'Le vocabulaire commun derrière la comparaison. Il définit abstractions et diagrammes, mais ne fournit ni éditeur, ni stockage, ni collaboration.',
    visio: 'Dessin métier et technique étendu avec collaboration Microsoft. Le C4 et la cohérence entre vues restent manuels.',
    lucidchart: 'Dessin nuagique et coédition soignés. Le hors-ligne se limite aux documents déjà ouverts et ce n’est pas un modèle C4.',
    creately: 'Espace visuel flexible avec objets liés aux données et collaboration. La sémantique C4 et les règles entre vues sont manuelles.',
    smartdraw: 'Dessin technique riche en gabarits avec édition multi-utilisateur. Internet est obligatoire et il n’existe pas de forfait gratuit.',
    drawio: 'Excellent contrôle gratuit, ouvert et hors ligne. Les diagrammes C4 restent des dessins à réconcilier manuellement entre vues.',
    excalidraw: 'Croquis rapides et ateliers collaboratifs. L’éditeur est ouvert, Plus est hébergé; aucun des deux n’est un modèle d’architecture.',
    archi: 'Solide modélisation ArchiMate gratuite avec collaboration Git coArchi. Le C4 exige une correspondance ou extension; la coédition n’est pas en direct.',
    mermaid: 'Pratique dans Markdown et les revues de code. Sa syntaxe C4 est officiellement expérimentale et chaque diagramme reste séparé.',
    plantuml: 'Diagrammes C4 matures dans les dépôts et la documentation. C’est une bibliothèque de dessin, pas un modèle visuel relié.',
    d2: 'Architecture en code lisible, entièrement hors ligne, avec excellente mise en page. Pas de C4 natif ni de collaboration temps réel intégrée.',
  },
};

const chinese: AlternativesCopy = {
  ...english,
  nav: '对比', eyebrow: '坦诚的市场视角', title: '选择合适的方法，而不是最长的功能清单。',
  body: '比较 MapleSpire、IcePanel、Structurizr、Visio、draw.io 与图表即代码工具。本表明确区分原生 C4 能力与手工工作，以及集中治理的元数据与自由文本。',
  verified: '已于 2026 年 8 月 2 日根据各产品官方页面核验。',
  caveat: '价格为公开美元标价（如有），未含税。C4 Model 是方法而非软件。方案会变化，请查看每行带有明确标签的官方来源。',
  filtersLabel: '按方法筛选对比', filters: { all: '全部 15 项', model: '架构模型', drawing: '绘图与白板', code: '图表即代码', method: '方法' },
  columns: { product: '产品', approach: '方式', c4: 'C4 支持', sharedModel: '关联模型', collaboration: '团队协作', offline: '离线编辑', deployment: '自托管', sourceCode: '源代码', price: '公开入门价格', take: '适用场景 · 真实限制' },
  sources: '官方来源', ourProduct: '我们的产品', legend: { strong: '原生 / 可用', conditional: '部分 / 有条件', unavailable: '不可用', notApplicable: '不适用' },
  tokens: {
    approach: { visualModel: '可视化模型', modelAsCode: '模型即代码', eaModel: '企业架构模型', drawing: '绘图画布', whiteboard: '白板', diagramAsCode: '图表即代码', method: '方法 / 表示法' },
    c4: { native: '原生', strong: '成熟库', experimental: '实验性', mapping: '映射 / 扩展', manual: '手工', none: '无原生 C4', definition: '定义本身' },
    sharedModel: { yes: '是', partial: '部分', no: '否', na: '不适用' }, collaboration: { realtime: '实时', cloud: '云端 / 平台', git: 'Git 流程', single: '单用户', none: '无内置', na: '不适用' }, offline: { yes: '是', limited: '有限', no: '否', na: '不适用' }, deployment: { yes: '是', enterprise: '企业版 / 咨询', local: '本地 + Git', editor: '仅编辑器', pending: '等待发布', no: '否', na: '不适用' }, sourceCode: { open: '开源', mixed: '混合', announced: '已宣布 · 待发布', closed: '闭源', na: '不适用' },
  },
  prices: {
    maplespire: '免费开源（AGPL-3.0）· 托管演示免费', icepanel: '免费：5 位编辑者 / 100 个对象 · Growth：每位编辑者每月 40 美元，年付', archyl: '个人免费 · 按编辑者付费', structurizr: '开放核心服务器与本地查看器免费 · SSO 与角色需授权的预构建版本', 'c4-model': '方法与文档免费', visio: '部分 Microsoft 365 方案包含 · Plan 1 每用户每月 5 美元 / Plan 2 为 15 美元，年付', lucidchart: '免费：3 个文档 / 60 个形状 · 个人版每月 9 美元另加税', creately: '免费：每空间 45 个项目 · 有付费方案', smartdraw: '免费试用 · 个人版每月 9.95 美元，年付', drawio: '核心编辑器免费 · Atlassian 集成付费', excalidraw: '编辑器免费 · Plus 每用户每月 6 美元', archi: '免费', mermaid: '开源免费 · Mermaid Chart 方案可选', plantuml: '开源免费', d2: '开源免费 · 商业工具可选',
  },
  takes: {
    maplespire: '基于共享模型的可视化 C4，组织级标签与技术目录、实时协作与离线同步。自托管时同步服务目前以单实例运行。', icepanel: '成熟的托管式可视化 C4 模型。官方产品为 SaaS，未提供通用离线编辑器或自托管版本。', archyl: '整合 C4、架构即代码与 AI 发现。本地部署属于更高阶方案，官方未说明离线编辑。', structurizr: '以代码进行严谨的 C4 建模，并在 Git 中评审。标签与技术是各元素上的自由文本，企业景观需从各团队工作区重新生成。', 'c4-model': '本表背后的共同语言，只定义抽象与图表，不提供编辑器、存储或协作。', visio: '广泛的商务与技术绘图，并支持 Microsoft 协作；C4 与跨视图一致性仍需手工维护。', lucidchart: '精致的云端绘图与协同编辑；离线仅限已打开文档，且不是 C4 模型。', creately: '灵活的视觉工作区、数据对象与协作；C4 语义和跨视图规则需要手工处理。', smartdraw: '模板丰富的技术绘图和多人编辑；必须联网，且没有免费方案。', drawio: '免费、开放、离线控制出色；C4 仍是独立图纸，需要手工同步重复元素。', excalidraw: '适合快速草图与协作研讨；编辑器开源、Plus 托管，但二者都不是架构模型。', archi: '免费的强大 ArchiMate 建模与 coArchi Git 协作；C4 需要映射或扩展，协作并非实时同编。', mermaid: '适合 Markdown 与代码评审；其 C4 语法官方标为实验性，每张图仍彼此独立。', plantuml: '适合仓库与文档中的成熟 C4 图；它是绘图库，不是关联的可视化架构模型。', d2: '可读、完全离线、自动布局优秀的架构即代码；无原生 C4 语义或实时协作。',
  },
};

const japanese: AlternativesCopy = {
  ...english,
  nav: '比較', eyebrow: '率直な市場比較', title: '長い機能表ではなく、目的に合う方法を。', body: 'MapleSpire を IcePanel、Structurizr、Visio、draw.io、Diagram as Code ツールと比較します。ネイティブな C4 機能と手作業、一元管理されたメタデータと自由記述を分けています。', verified: '2026年8月2日に各製品の公式ページで確認しました。', caveat: '価格は公開されている米ドルの税別定価です。C4 Model はソフトウェアではなく手法です。プランは変わるため、各行の公式情報をご確認ください。', filtersLabel: '方式で比較を絞り込む', filters: { all: '全15件', model: 'アーキテクチャモデル', drawing: '作図・ホワイトボード', code: 'Diagram as Code', method: '手法' }, columns: { product: '製品', approach: '方式', c4: 'C4 対応', sharedModel: '連結モデル', collaboration: 'チーム作業', offline: 'オフライン編集', deployment: 'セルフホスト', sourceCode: 'ソース', price: '公開開始価格', take: '向いている用途 · 正直な制約' }, sources: '公式情報', ourProduct: '自社製品', legend: { strong: 'ネイティブ / 利用可', conditional: '一部 / 条件付き', unavailable: '利用不可', notApplicable: '該当なし' },
  tokens: { approach: { visualModel: 'ビジュアルモデル', modelAsCode: 'Model as Code', eaModel: 'EAモデル', drawing: '作図キャンバス', whiteboard: 'ホワイトボード', diagramAsCode: 'Diagram as Code', method: '手法 / 記法' }, c4: { native: 'ネイティブ', strong: '強力なライブラリ', experimental: '実験的', mapping: 'マッピング / 拡張', manual: '手作業', none: 'ネイティブC4なし', definition: '定義そのもの' }, sharedModel: { yes: 'あり', partial: '一部', no: 'なし', na: '該当なし' }, collaboration: { realtime: 'リアルタイム', cloud: 'クラウド / 基盤', git: 'Gitワークフロー', single: '単一ユーザー', none: '組み込みなし', na: '該当なし' }, offline: { yes: '可', limited: '制限あり', no: '不可', na: '該当なし' }, deployment: { yes: '可', enterprise: 'Enterprise / 要問合せ', local: 'ローカル + Git', editor: 'エディターのみ', pending: '公開待ち', no: '不可', na: '該当なし' }, sourceCode: { open: 'オープンソース', mixed: '混在', announced: '発表済み · 公開待ち', closed: '非公開', na: '該当なし' } },
  prices: { maplespire: '無料・オープンソース（AGPL-3.0）· ホスト版デモも無料', icepanel: '無料：編集者5名 / 100オブジェクト · Growth：編集者1名あたり月40米ドル、年払い', archyl: '個人無料 · 編集者ごとの有料プラン', structurizr: 'オープンコアのサーバーとローカルビューアーは無料 · SSO とロールはライセンス版', 'c4-model': '手法と文書は無料', visio: '一部Microsoft 365に含む · Plan 1 月5米ドル / Plan 2 月15米ドル、年払い', lucidchart: '無料：3文書 / 60図形 · 個人版 月9米ドル+税', creately: '無料：ワークスペース45項目 · 有料プランあり', smartdraw: '無料試用 · 個人版 月9.95米ドル、年払い', drawio: 'コアエディター無料 · Atlassian連携は有料', excalidraw: 'エディター無料 · Plus 月6米ドル/ユーザー', archi: '無料', mermaid: 'オープンソース無料 · Mermaid Chartは任意', plantuml: 'オープンソース無料', d2: 'オープンソース無料 · 商用ツールは任意' },
  takes: { maplespire: '共有モデル上のビジュアルC4、組織共通のタグと技術カタログ、リアルタイム共同作業とオフライン同期。セルフホスト時の同期は現在単一インスタンスで動作します。', icepanel: '成熟したホスト型ビジュアルC4。公式製品はSaaSで、一般向けオフライン編集やセルフホスト版はありません。', archyl: 'C4、Architecture as Code、AI探索を統合。オンプレミスは上位機能で、オフライン編集は明記されていません。', structurizr: 'コードによる厳密なC4モデリングをGitでレビュー。タグと技術は要素ごとの自由記述で、企業全体のランドスケープはチームのワークスペースから再生成します。', 'c4-model': '比較の共通語彙。抽象と図を定義しますが、エディター、保存、共同作業は提供しません。', visio: 'Microsoft共同作業を備えた幅広い業務・技術作図。C4とビュー間整合性は手作業です。', lucidchart: '洗練されたクラウド作図と共同編集。オフラインは開いていた文書に限られ、C4モデルではありません。', creately: 'データ付きオブジェクトを持つ柔軟な視覚ワークスペース。C4意味論とビュー間ルールは手作業です。', smartdraw: 'テンプレート豊富な技術作図と複数人編集。インターネット必須で無料プランはありません。', drawio: '無料・オープン・オフラインの自由度が高い一方、C4は図面であり重複要素は手動同期です。', excalidraw: '素早いスケッチとワークショップ向け。エディターはOSS、Plusはホスト型で、どちらもアーキテクチャモデルではありません。', archi: '無料の強力なArchiMateとcoArchiのGit連携。C4はマッピング/拡張が必要で、リアルタイム共同編集ではありません。', mermaid: 'Markdownやコードレビューに便利。C4構文は公式に実験的で、図は個別管理です。', plantuml: 'リポジトリや文書内の成熟したC4図。作図ライブラリであり、連結ビジュアルモデルではありません。', d2: '読みやすく完全オフラインで自動レイアウトに強いDiagram as Code。C4意味論とリアルタイム共同作業はありません。' },
};

const korean: AlternativesCopy = {
  ...english,
  nav: '비교', eyebrow: '솔직한 시장 비교', title: '가장 긴 기능표가 아니라 알맞은 방식을 고르세요.', body: 'MapleSpire를 IcePanel, Structurizr, Visio, draw.io 및 다이어그램 코드화 도구와 비교합니다. 네이티브 C4 기능과 수작업, 중앙에서 관리되는 메타데이터와 자유 텍스트를 구분했습니다.', verified: '2026년 8월 2일 각 제품의 공식 페이지에서 확인했습니다.', caveat: '가격은 공개된 미국 달러 세전 정가입니다. C4 Model은 소프트웨어가 아닌 방법론입니다. 요금제는 바뀔 수 있으므로 각 행의 공식 출처를 확인하세요.', filtersLabel: '방식별 비교 필터', filters: { all: '전체 15개', model: '아키텍처 모델', drawing: '드로잉·화이트보드', code: '다이어그램 코드화', method: '방법론' }, columns: { product: '제품', approach: '방식', c4: 'C4 지원', sharedModel: '연결 모델', collaboration: '팀 작업', offline: '오프라인 편집', deployment: '셀프 호스팅', sourceCode: '소스', price: '공개 시작 가격', take: '적합한 용도 · 솔직한 한계' }, sources: '공식 출처', ourProduct: '자사 제품', legend: { strong: '네이티브 / 제공', conditional: '부분 / 조건부', unavailable: '미제공', notApplicable: '해당 없음' },
  tokens: { approach: { visualModel: '시각 모델', modelAsCode: '모델 코드화', eaModel: 'EA 모델', drawing: '드로잉 캔버스', whiteboard: '화이트보드', diagramAsCode: '다이어그램 코드화', method: '방법론 / 표기법' }, c4: { native: '네이티브', strong: '강력한 라이브러리', experimental: '실험적', mapping: '매핑 / 확장', manual: '수동', none: '네이티브 C4 없음', definition: '정의 자체' }, sharedModel: { yes: '예', partial: '부분', no: '아니요', na: '해당 없음' }, collaboration: { realtime: '실시간', cloud: '클라우드 / 플랫폼', git: 'Git 워크플로', single: '단일 사용자', none: '내장 없음', na: '해당 없음' }, offline: { yes: '예', limited: '제한적', no: '아니요', na: '해당 없음' }, deployment: { yes: '예', enterprise: '엔터프라이즈 / 문의', local: '로컬 + Git', editor: '편집기만', pending: '출시 예정', no: '아니요', na: '해당 없음' }, sourceCode: { open: '오픈 소스', mixed: '혼합', announced: '발표됨 · 공개 예정', closed: '비공개', na: '해당 없음' } },
  prices: { maplespire: '무료 오픈 소스(AGPL-3.0) · 호스팅 데모 무료', icepanel: '무료: 편집자 5명 / 객체 100개 · Growth: 편집자당 월 US$40, 연간 결제', archyl: '개인 무료 · 편집자별 유료', structurizr: '오픈 코어 서버와 로컬 뷰어 무료 · SSO와 역할은 라이선스 바이너리', 'c4-model': '방법론과 문서 무료', visio: '일부 Microsoft 365 포함 · Plan 1 월 US$5 / Plan 2 월 US$15, 연간 결제', lucidchart: '무료: 문서 3개 / 도형 60개 · 개인 월 US$9+세금', creately: '무료: 작업공간당 45개 항목 · 유료 요금제', smartdraw: '무료 체험 · 개인 월 US$9.95, 연간 결제', drawio: '핵심 편집기 무료 · Atlassian 통합 유료', excalidraw: '편집기 무료 · Plus 사용자당 월 US$6', archi: '무료', mermaid: '오픈 소스 무료 · Mermaid Chart 선택형', plantuml: '오픈 소스 무료', d2: '오픈 소스 무료 · 상용 도구 선택형' },
  takes: { maplespire: '공유 모델 기반 시각적 C4, 조직 전체 태그·기술 카탈로그, 실시간 협업과 오프라인 동기화. 셀프 호스팅 시 동기화는 현재 단일 인스턴스로 실행됩니다.', icepanel: '성숙한 호스팅형 시각 C4 모델. 공식 제품은 SaaS이며 범용 오프라인 편집기나 셀프 호스팅 판은 없습니다.', archyl: 'C4, Architecture as Code, AI 탐색을 결합합니다. 온프레미스는 상위 기능이며 오프라인 편집은 문서화되지 않았습니다.', structurizr: '코드로 하는 정밀한 C4 모델링을 Git에서 검토합니다. 태그와 기술은 요소별 자유 텍스트이며, 전사 랜드스케이프는 팀 워크스페이스에서 다시 생성해야 합니다.', 'c4-model': '비교의 공통 어휘입니다. 추상화와 다이어그램을 정의하지만 편집기·저장·협업은 제공하지 않습니다.', visio: 'Microsoft 협업을 갖춘 범용 비즈니스·기술 드로잉. C4와 뷰 간 일관성은 수동입니다.', lucidchart: '세련된 클라우드 드로잉과 공동 편집. 오프라인은 열었던 문서로 제한되며 C4 모델은 아닙니다.', creately: '데이터 객체와 협업을 갖춘 유연한 시각 작업공간. C4 의미와 뷰 간 규칙은 수동입니다.', smartdraw: '템플릿이 풍부한 기술 드로잉과 다중 사용자 편집. 인터넷이 필수이며 무료 요금제가 없습니다.', drawio: '무료·오픈·오프라인 제어가 뛰어납니다. C4는 독립 도면이므로 반복 요소를 수동으로 맞춰야 합니다.', excalidraw: '빠른 스케치와 협업 워크숍에 적합합니다. 편집기는 오픈 소스, Plus는 호스팅형이며 둘 다 아키텍처 모델은 아닙니다.', archi: '강력한 무료 ArchiMate와 coArchi Git 협업. C4는 매핑/확장이 필요하고 실시간 공동 편집은 아닙니다.', mermaid: 'Markdown과 코드 리뷰에 편리합니다. C4 문법은 공식적으로 실험적이며 각 다이어그램은 분리됩니다.', plantuml: '저장소와 문서의 성숙한 C4 다이어그램. 드로잉 라이브러리이지 연결된 시각 모델은 아닙니다.', d2: '읽기 쉽고 완전 오프라인이며 자동 레이아웃이 강한 다이어그램 코드화. 네이티브 C4나 실시간 협업은 없습니다.' },
};

const hindi: AlternativesCopy = {
  ...english,
  nav: 'तुलना', eyebrow: 'बाज़ार का ईमानदार दृष्टिकोण', title: 'सबसे लंबी सूची नहीं, सही तरीका चुनें।', body: 'MapleSpire की तुलना IcePanel, Structurizr, Visio, draw.io और diagram-as-code टूल से करें। यह तालिका नेटिव C4 क्षमता को मैनुअल काम से और केंद्रीय रूप से नियंत्रित मेटाडेटा को मुक्त टेक्स्ट से अलग करती है।', verified: '2 अगस्त 2026 को आधिकारिक उत्पाद पृष्ठों से जाँचा गया।', caveat: 'जहाँ उपलब्ध है, कीमतें सार्वजनिक अमेरिकी डॉलर सूची-मूल्य हैं और कर से पहले हैं। C4 Model सॉफ़्टवेयर नहीं, एक पद्धति है। योजनाएँ बदलती हैं; हर पंक्ति के आधिकारिक स्रोत देखें।', filtersLabel: 'तरीके के अनुसार तुलना छाँटें', filters: { all: 'सभी 15', model: 'आर्किटेक्चर मॉडल', drawing: 'ड्रॉइंग और व्हाइटबोर्ड', code: 'Diagram as code', method: 'पद्धति' }, columns: { product: 'उत्पाद', approach: 'तरीका', c4: 'C4 समर्थन', sharedModel: 'जुड़ा मॉडल', collaboration: 'टीमवर्क', offline: 'ऑफ़लाइन संपादन', deployment: 'सेल्फ-होस्टिंग', sourceCode: 'स्रोत', price: 'सार्वजनिक शुरुआती कीमत', take: 'किसके लिए · ईमानदार सीमा' }, sources: 'आधिकारिक स्रोत', ourProduct: 'हमारा उत्पाद', legend: { strong: 'नेटिव / उपलब्ध', conditional: 'आंशिक / सशर्त', unavailable: 'उपलब्ध नहीं', notApplicable: 'लागू नहीं' },
  tokens: { approach: { visualModel: 'विज़ुअल मॉडल', modelAsCode: 'Model as code', eaModel: 'EA मॉडल', drawing: 'ड्रॉइंग कैनवास', whiteboard: 'व्हाइटबोर्ड', diagramAsCode: 'Diagram as code', method: 'पद्धति / नोटेशन' }, c4: { native: 'नेटिव', strong: 'मज़बूत लाइब्रेरी', experimental: 'प्रयोगात्मक', mapping: 'मैपिंग / ऐड-ऑन', manual: 'मैनुअल', none: 'नेटिव C4 नहीं', definition: 'परिभाषा स्वयं' }, sharedModel: { yes: 'हाँ', partial: 'आंशिक', no: 'नहीं', na: 'लागू नहीं' }, collaboration: { realtime: 'रीयल टाइम', cloud: 'क्लाउड / प्लेटफ़ॉर्म', git: 'Git वर्कफ़्लो', single: 'एक उपयोगकर्ता', none: 'अंतर्निहित नहीं', na: 'लागू नहीं' }, offline: { yes: 'हाँ', limited: 'सीमित', no: 'नहीं', na: 'लागू नहीं' }, deployment: { yes: 'हाँ', enterprise: 'एंटरप्राइज़ / पूछताछ', local: 'लोकल + Git', editor: 'केवल एडिटर', pending: 'रिलीज़ लंबित', no: 'नहीं', na: 'लागू नहीं' }, sourceCode: { open: 'ओपन सोर्स', mixed: 'मिश्रित', announced: 'घोषित · लंबित', closed: 'बंद', na: 'लागू नहीं' } },
  prices: { maplespire: 'मुफ़्त और ओपन सोर्स (AGPL-3.0) · होस्ट किया गया डेमो मुफ़्त', icepanel: 'मुफ़्त: 5 एडिटर / 100 ऑब्जेक्ट · Growth: US$40 प्रति एडिटर/माह, वार्षिक', archyl: 'व्यक्तिगत मुफ़्त · प्रति एडिटर भुगतान', structurizr: 'ओपन-कोर सर्वर और लोकल व्यूअर मुफ़्त · SSO और भूमिकाओं के लिए लाइसेंस वाले बाइनरी', 'c4-model': 'पद्धति और दस्तावेज़ मुफ़्त', visio: 'कुछ Microsoft 365 योजनाओं में · Plan 1 US$5 / Plan 2 US$15 प्रति उपयोगकर्ता/माह, वार्षिक', lucidchart: 'मुफ़्त: 3 दस्तावेज़ / 60 आकार · व्यक्तिगत US$9/माह + कर', creately: 'मुफ़्त: 45 आइटम/वर्कस्पेस · सशुल्क योजनाएँ', smartdraw: 'मुफ़्त ट्रायल · व्यक्तिगत US$9.95/माह, वार्षिक', drawio: 'मुख्य एडिटर मुफ़्त · Atlassian इंटीग्रेशन सशुल्क', excalidraw: 'एडिटर मुफ़्त · Plus US$6/उपयोगकर्ता/माह', archi: 'मुफ़्त', mermaid: 'ओपन सोर्स मुफ़्त · Mermaid Chart वैकल्पिक', plantuml: 'ओपन सोर्स मुफ़्त', d2: 'ओपन सोर्स मुफ़्त · व्यावसायिक टूल वैकल्पिक' },
  takes: { maplespire: 'साझा मॉडल पर विज़ुअल C4, संगठन-स्तरीय टैग और टेक्नोलॉजी कैटलॉग, रीयल-टाइम सहयोग और ऑफ़लाइन सिंक। सेल्फ-होस्टिंग में सिंक अभी एक ही इंस्टेंस पर चलता है।', icepanel: 'परिपक्व होस्टेड विज़ुअल C4 मॉडल। आधिकारिक उत्पाद SaaS है; सामान्य ऑफ़लाइन एडिटर या सेल्फ-होस्टेड संस्करण नहीं है।', archyl: 'C4, architecture-as-code और AI खोज एक साथ। ऑन-प्रिमाइज़ ऊँचे स्तर की सुविधा है; ऑफ़लाइन संपादन दस्तावेज़ित नहीं है।', structurizr: 'कोड के रूप में सटीक C4 मॉडलिंग, Git में समीक्षा। टैग और टेक्नोलॉजी हर तत्व पर मुक्त टेक्स्ट हैं, और एंटरप्राइज़ लैंडस्केप टीम वर्कस्पेस से दोबारा बनाना पड़ता है।', 'c4-model': 'इस तुलना की साझा भाषा। यह अमूर्तन और डायग्राम परिभाषित करता है, एडिटर, स्टोरेज या सहयोग नहीं देता।', visio: 'Microsoft सहयोग के साथ व्यापक व्यवसाय और तकनीकी ड्रॉइंग। C4 और व्यू के बीच संगति मैनुअल रहती है।', lucidchart: 'सुव्यवस्थित क्लाउड ड्रॉइंग और सह-संपादन। ऑफ़लाइन केवल पहले खुले दस्तावेज़ों तक सीमित है और यह C4 मॉडल नहीं है।', creately: 'डेटा ऑब्जेक्ट और सहयोग वाला लचीला विज़ुअल वर्कस्पेस। C4 अर्थ और व्यू के नियम मैनुअल हैं।', smartdraw: 'टेम्पलेट-समृद्ध तकनीकी ड्रॉइंग और बहु-उपयोगकर्ता संपादन। इंटरनेट आवश्यक है और मुफ़्त योजना नहीं है।', drawio: 'मुफ़्त, खुला और ऑफ़लाइन नियंत्रण उत्कृष्ट। C4 अलग ड्रॉइंग हैं, इसलिए दोहराए तत्व मैनुअल मिलाने पड़ते हैं।', excalidraw: 'तेज़ स्केच और सहयोगी कार्यशालाओं के लिए। एडिटर ओपन सोर्स और Plus होस्टेड है; दोनों आर्किटेक्चर मॉडल नहीं हैं।', archi: 'मज़बूत मुफ़्त ArchiMate और coArchi Git सहयोग। C4 के लिए मैपिंग/ऐड-ऑन चाहिए और सहयोग लाइव सह-संपादन नहीं है।', mermaid: 'Markdown और कोड समीक्षा में सुविधाजनक। इसकी C4 सिंटैक्स आधिकारिक रूप से प्रयोगात्मक है और हर डायग्राम अलग रहता है।', plantuml: 'रिपॉज़िटरी और दस्तावेज़ों में परिपक्व C4 डायग्राम। यह ड्रॉइंग लाइब्रेरी है, जुड़ा विज़ुअल मॉडल नहीं।', d2: 'पढ़ने योग्य, पूरी तरह ऑफ़लाइन और मजबूत ऑटो-लेआउट वाला diagram-as-code। नेटिव C4 या लाइव सहयोग नहीं।' },
};

const spanish: AlternativesCopy = {
  ...english,
  nav: 'Comparar',
  eyebrow: 'Una visión honesta del mercado',
  title: 'Compara enfoques, no solo listas de funciones.',
  body: 'Compara MapleSpire con IcePanel, Structurizr, Visio, draw.io y las herramientas de diagramas como código. Esta tabla distingue las capacidades C4 nativas del trabajo manual, y los metadatos gobernados de forma centralizada del texto libre.',
  verified: 'Verificado en las páginas oficiales de cada producto el 2 de agosto de 2026.',
  caveat: 'Los precios son tarifas públicas en dólares estadounidenses cuando existen, sin impuestos. «C4 Model» es un método, no un software. Las ofertas cambian: cada fila enlaza a fuentes oficiales claramente identificadas.',
  filtersLabel: 'Filtrar la comparativa por enfoque',
  filters: { all: 'Los 15', model: 'Modelos de arquitectura', drawing: 'Dibujo y pizarras', code: 'Diagramas como código', method: 'Método' },
  columns: { product: 'Producto', approach: 'Enfoque', c4: 'Soporte C4', sharedModel: 'Modelo conectado', collaboration: 'Trabajo en equipo', offline: 'Edición sin conexión', deployment: 'Autoalojamiento', sourceCode: 'Código fuente', price: 'Punto de entrada público', take: 'Puntos fuertes · límites' },
  sources: 'Fuentes oficiales',
  ourProduct: 'Nuestro producto',
  legend: { strong: 'Nativo / disponible', conditional: 'Parcial / condicional', unavailable: 'No disponible', notApplicable: 'No aplica' },
  tokens: {
    approach: { visualModel: 'Modelo visual', modelAsCode: 'Modelo como código', eaModel: 'Modelo EA', drawing: 'Lienzo de dibujo', whiteboard: 'Pizarra', diagramAsCode: 'Diagrama como código', method: 'Método / notación' },
    c4: { native: 'Nativo', strong: 'Biblioteca sólida', experimental: 'Experimental', mapping: 'Correspondencia / complemento', manual: 'Manual', none: 'Sin C4 nativo', definition: 'La definición' },
    sharedModel: { yes: 'Sí', partial: 'Parcial', no: 'No', na: 'N/A' },
    collaboration: { realtime: 'Tiempo real', cloud: 'Nube / plataforma', git: 'Flujo Git', single: 'Un solo usuario', none: 'No integrada', na: 'N/A' },
    offline: { yes: 'Sí', limited: 'Limitada', no: 'No', na: 'N/A' },
    deployment: { yes: 'Sí', enterprise: 'Empresa / bajo consulta', local: 'Local + Git', editor: 'Solo el editor', pending: 'Publicación pendiente', no: 'No', na: 'N/A' },
    sourceCode: { open: 'Código abierto', mixed: 'Mixto', announced: 'Anunciado · pendiente', closed: 'Cerrado', na: 'N/A' },
  },
  prices: {
    maplespire: 'Gratuito y de código abierto (AGPL-3.0) · demo alojada gratuita', icepanel: 'Gratis: 5 editores / 100 objetos · Growth: 40 USD/editor/mes, anual', archyl: 'Plan individual gratuito · de pago por editor', structurizr: 'Servidor open core y visor local gratuitos · binarios con licencia para SSO y roles', 'c4-model': 'Método y documentación gratuitos', visio: 'Incluido en algunos planes de Microsoft 365 · Plan 1: 5 USD / Plan 2: 15 USD por usuario/mes, anual', lucidchart: 'Gratis: 3 documentos / 60 formas · Individual: 9 USD/mes + impuestos', creately: 'Gratis: 45 elementos por espacio · planes de pago', smartdraw: 'Prueba gratuita · Individual: 9,95 USD/mes, anual', drawio: 'Editor principal gratuito · integraciones de Atlassian de pago', excalidraw: 'Editor gratuito · Plus: 6 USD/usuario/mes', archi: 'Gratuito', mermaid: 'Código abierto gratuito · planes opcionales de Mermaid Chart', plantuml: 'Código abierto gratuito', d2: 'Código abierto gratuito · herramientas comerciales opcionales',
  },
  takes: {
    maplespire: 'C4 visual sobre un modelo compartido, con catálogos de etiquetas y tecnologías comunes a toda la organización, colaboración en tiempo real y sincronización sin conexión. Autoalojado, el servidor de sincronización funciona por ahora como una sola instancia.',
    icepanel: 'Un modelo C4 visual alojado y maduro. El producto documentado es SaaS; no hay editor sin conexión general ni edición autoalojada.',
    archyl: 'C4, arquitectura como código y descubrimiento asistido por IA en un solo producto. La instalación local es de un plan superior; la edición sin conexión no está documentada.',
    structurizr: 'Modelado C4 preciso como código, revisado en Git. Las etiquetas y tecnologías son texto libre en cada elemento, y el paisaje de empresa se regenera a partir de los workspaces de los equipos.',
    'c4-model': 'El vocabulario común detrás de esta comparativa. Define abstracciones y diagramas, pero no ofrece editor, almacenamiento ni colaboración.',
    visio: 'Diagramas empresariales y técnicos muy completos con la colaboración de Microsoft. El C4 y la coherencia entre vistas siguen siendo manuales.',
    lucidchart: 'Diagramas en la nube y coedición muy pulidos. Sin conexión solo funciona con documentos ya abiertos y no es un modelo C4.',
    creately: 'Un espacio visual flexible con objetos vinculados a datos y colaboración. La semántica C4 y las reglas entre vistas son manuales.',
    smartdraw: 'Dibujo técnico con muchas plantillas y edición multiusuario en tiempo real. Requiere conexión a internet y no tiene plan gratuito.',
    drawio: 'Excelente dibujo gratuito, abierto y sin conexión. Los diagramas C4 son dibujos, así que los elementos y vistas repetidos se concilian a mano.',
    excalidraw: 'Bocetos rápidos y talleres colaborativos. El editor es de código abierto y Plus es alojado; ninguno de los dos es un modelo de arquitectura.',
    archi: 'Sólido modelado ArchiMate gratuito con colaboración coArchi basada en Git. El C4 requiere una correspondencia o complemento y no hay coedición en directo.',
    mermaid: 'Práctico dentro de Markdown y las revisiones de código. Su sintaxis C4 es oficialmente experimental y cada diagrama sigue siendo independiente.',
    plantuml: 'Diagramas C4 maduros en repositorios y documentación. Es una biblioteca de dibujo, no un modelo visual de arquitectura conectado.',
    d2: 'Arquitectura como código legible, totalmente sin conexión y con un excelente diseño automático. Sin semántica C4 nativa ni colaboración en directo integrada.',
  },
};

const italian: AlternativesCopy = {
  ...english,
  nav: 'Confronta',
  eyebrow: 'Uno sguardo onesto sul mercato',
  title: 'Confronta gli approcci, non solo gli elenchi di funzioni.',
  body: 'Confronta MapleSpire con IcePanel, Structurizr, Visio, draw.io e gli strumenti di diagrammi come codice. Questa tabella separa le funzionalità C4 native dal lavoro manuale, e i metadati governati centralmente dal testo libero.',
  verified: 'Verificato sulle pagine ufficiali dei prodotti il 2 agosto 2026.',
  caveat: 'I prezzi sono listini pubblici in dollari USA, dove disponibili, al netto delle imposte. «C4 Model» è un metodo, non un software. Le offerte cambiano: ogni riga rimanda a fonti ufficiali chiaramente indicate.',
  filtersLabel: 'Filtra il confronto per approccio',
  filters: { all: 'Tutti e 15', model: 'Modelli di architettura', drawing: 'Disegno e lavagne', code: 'Diagrammi come codice', method: 'Metodo' },
  columns: { product: 'Prodotto', approach: 'Approccio', c4: 'Supporto C4', sharedModel: 'Modello collegato', collaboration: 'Lavoro di squadra', offline: 'Modifica offline', deployment: 'Self-hosting', sourceCode: 'Codice sorgente', price: 'Punto di accesso pubblico', take: 'Punti di forza · limiti' },
  sources: 'Fonti ufficiali',
  ourProduct: 'Il nostro prodotto',
  legend: { strong: 'Nativo / disponibile', conditional: 'Parziale / condizionato', unavailable: 'Non disponibile', notApplicable: 'Non applicabile' },
  tokens: {
    approach: { visualModel: 'Modello visuale', modelAsCode: 'Modello come codice', eaModel: 'Modello EA', drawing: 'Area di disegno', whiteboard: 'Lavagna', diagramAsCode: 'Diagramma come codice', method: 'Metodo / notazione' },
    c4: { native: 'Nativo', strong: 'Libreria solida', experimental: 'Sperimentale', mapping: 'Mappatura / estensione', manual: 'Manuale', none: 'Nessun C4 nativo', definition: 'La definizione' },
    sharedModel: { yes: 'Sì', partial: 'Parziale', no: 'No', na: 'N/D' },
    collaboration: { realtime: 'Tempo reale', cloud: 'Cloud / piattaforma', git: 'Flusso Git', single: 'Utente singolo', none: 'Non integrata', na: 'N/D' },
    offline: { yes: 'Sì', limited: 'Limitata', no: 'No', na: 'N/D' },
    deployment: { yes: 'Sì', enterprise: 'Enterprise / su richiesta', local: 'Locale + Git', editor: 'Solo editor', pending: 'Rilascio in sospeso', no: 'No', na: 'N/D' },
    sourceCode: { open: 'Open source', mixed: 'Misto', announced: 'Annunciato · in sospeso', closed: 'Chiuso', na: 'N/D' },
  },
  prices: {
    maplespire: 'Gratuito e open source (AGPL-3.0) · demo ospitata gratuita', icepanel: 'Gratis: 5 editor / 100 oggetti · Growth: 40 USD/editor/mese, annuale', archyl: 'Piano individuale gratuito · a pagamento per editor', structurizr: 'Server open core e visualizzatore locale gratuiti · binari con licenza per SSO e ruoli', 'c4-model': 'Metodo e documentazione gratuiti', visio: 'Incluso in alcuni piani Microsoft 365 · Piano 1: 5 USD / Piano 2: 15 USD per utente/mese, annuale', lucidchart: 'Gratis: 3 documenti / 60 forme · Individual: 9 USD/mese + imposte', creately: 'Gratis: 45 elementi per spazio · piani a pagamento', smartdraw: 'Prova gratuita · Individual: 9,95 USD/mese, annuale', drawio: 'Editor principale gratuito · integrazioni Atlassian a pagamento', excalidraw: 'Editor gratuito · Plus: 6 USD/utente/mese', archi: 'Gratuito', mermaid: 'Open source gratuito · piani Mermaid Chart facoltativi', plantuml: 'Open source gratuito', d2: 'Open source gratuito · strumenti commerciali facoltativi',
  },
  takes: {
    maplespire: 'C4 visuale su un modello condiviso, con cataloghi di tag e tecnologie comuni a tutta l’organizzazione, collaborazione in tempo reale e sincronizzazione offline. In self-hosting, la sincronizzazione gira per ora su una singola istanza.',
    icepanel: 'Un modello C4 visuale ospitato e maturo. Il prodotto documentato è SaaS; non esistono un editor offline generale né un’edizione self-hosted.',
    archyl: 'C4, architettura come codice e scoperta assistita dall’IA in un unico prodotto. L’installazione on-premise è riservata a un piano superiore; la modifica offline non è documentata.',
    structurizr: 'Modellazione C4 precisa come codice, revisionata in Git. Tag e tecnologie sono testo libero su ogni elemento, e il landscape aziendale viene rigenerato dai workspace dei team.',
    'c4-model': 'Il vocabolario comune alla base del confronto. Definisce astrazioni e diagrammi, ma non offre editor, archiviazione né collaborazione.',
    visio: 'Diagrammi aziendali e tecnici a tutto campo, con la collaborazione Microsoft. Il C4 e la coerenza tra le viste restano manuali.',
    lucidchart: 'Diagrammi cloud e co-editing curati. L’uso offline è limitato ai documenti già aperti e non è un modello C4.',
    creately: 'Uno spazio visuale flessibile con oggetti collegati ai dati e collaborazione. La semantica C4 e le regole tra le viste sono manuali.',
    smartdraw: 'Disegno tecnico ricco di modelli, con modifica multiutente in tempo reale. Richiede una connessione internet e non ha un piano gratuito.',
    drawio: 'Ottimo controllo del disegno, gratuito, aperto e offline. I diagrammi C4 sono disegni: elementi e viste ripetuti vanno riconciliati a mano.',
    excalidraw: 'Schizzi rapidi e workshop collaborativi. L’editor è open source, Plus è ospitato; nessuno dei due è un modello di architettura.',
    archi: 'Solida modellazione ArchiMate gratuita con collaborazione coArchi basata su Git. Il C4 richiede una mappatura o un’estensione e la collaborazione non è co-editing dal vivo.',
    mermaid: 'Comodo dentro Markdown e nelle code review. La sua sintassi C4 è ufficialmente sperimentale e ogni diagramma resta separato.',
    plantuml: 'Diagrammi C4 maturi in repository e documentazione. È una libreria di disegno, non un modello visuale di architettura collegato.',
    d2: 'Architettura come codice leggibile, completamente offline, con un ottimo layout automatico. Nessuna semantica C4 nativa né collaborazione dal vivo integrata.',
  },
};

const german: AlternativesCopy = {
  ...english,
  nav: 'Vergleich',
  eyebrow: 'Ein ehrlicher Marktüberblick',
  title: 'Vergleichen Sie Ansätze, nicht nur Funktionslisten.',
  body: 'Vergleichen Sie MapleSpire mit IcePanel, Structurizr, Visio, draw.io und Diagram-as-Code-Werkzeugen. Die Tabelle trennt native C4-Fähigkeiten von Handarbeit und zentral verwaltete Metadaten von Freitext.',
  verified: 'Am 2. August 2026 anhand der offiziellen Produktseiten geprüft.',
  caveat: 'Preise sind öffentliche Listenpreise in US-Dollar, sofern verfügbar, zuzüglich Steuern. „C4 Model“ ist eine Methode, keine Software. Angebote ändern sich: Jede Zeile verweist auf klar bezeichnete offizielle Quellen.',
  filtersLabel: 'Vergleich nach Ansatz filtern',
  filters: { all: 'Alle 15', model: 'Architekturmodelle', drawing: 'Zeichnen & Whiteboards', code: 'Diagram as Code', method: 'Methode' },
  columns: { product: 'Produkt', approach: 'Ansatz', c4: 'C4-Unterstützung', sharedModel: 'Verknüpftes Modell', collaboration: 'Teamarbeit', offline: 'Offline-Bearbeitung', deployment: 'Self-Hosting', sourceCode: 'Quellcode', price: 'Öffentlicher Einstieg', take: 'Stärken · Grenzen' },
  sources: 'Offizielle Quellen',
  ourProduct: 'Unser Produkt',
  legend: { strong: 'Nativ / verfügbar', conditional: 'Teilweise / bedingt', unavailable: 'Nicht verfügbar', notApplicable: 'Nicht zutreffend' },
  tokens: {
    approach: { visualModel: 'Visuelles Modell', modelAsCode: 'Model as Code', eaModel: 'EA-Modell', drawing: 'Zeichenfläche', whiteboard: 'Whiteboard', diagramAsCode: 'Diagram as Code', method: 'Methode / Notation' },
    c4: { native: 'Nativ', strong: 'Starke Bibliothek', experimental: 'Experimentell', mapping: 'Mapping / Add-on', manual: 'Manuell', none: 'Kein natives C4', definition: 'Die Definition' },
    sharedModel: { yes: 'Ja', partial: 'Teilweise', no: 'Nein', na: 'k. A.' },
    collaboration: { realtime: 'Echtzeit', cloud: 'Cloud / Plattform', git: 'Git-Workflow', single: 'Einzelnutzer', none: 'Nicht integriert', na: 'k. A.' },
    offline: { yes: 'Ja', limited: 'Eingeschränkt', no: 'Nein', na: 'k. A.' },
    deployment: { yes: 'Ja', enterprise: 'Enterprise / auf Anfrage', local: 'Lokal + Git', editor: 'Nur Editor', pending: 'Veröffentlichung ausstehend', no: 'Nein', na: 'k. A.' },
    sourceCode: { open: 'Open Source', mixed: 'Gemischt', announced: 'Angekündigt · ausstehend', closed: 'Proprietär', na: 'k. A.' },
  },
  prices: {
    maplespire: 'Kostenlos und Open Source (AGPL-3.0) · gehostete Demo kostenlos', icepanel: 'Kostenlos: 5 Editoren / 100 Objekte · Growth: 40 USD pro Editor/Monat, jährlich', archyl: 'Kostenloser Einzelplan · kostenpflichtig pro Editor', structurizr: 'Open-Core-Server und lokaler Viewer kostenlos · lizenzierte Binärdateien für SSO und Rollen', 'c4-model': 'Methode und Dokumentation kostenlos', visio: 'In einigen Microsoft-365-Plänen enthalten · Plan 1: 5 USD / Plan 2: 15 USD pro Nutzer/Monat, jährlich', lucidchart: 'Kostenlos: 3 Dokumente / 60 Formen · Individual: 9 USD/Monat zzgl. Steuern', creately: 'Kostenlos: 45 Elemente pro Workspace · kostenpflichtige Pläne', smartdraw: 'Kostenlose Testversion · Individual: 9,95 USD/Monat, jährlich', drawio: 'Kern-Editor kostenlos · kostenpflichtige Atlassian-Integrationen', excalidraw: 'Editor kostenlos · Plus: 6 USD pro Nutzer/Monat', archi: 'Kostenlos', mermaid: 'Kostenlos und Open Source · optionale Mermaid-Chart-Pläne', plantuml: 'Kostenlos und Open Source', d2: 'Kostenlos und Open Source · optionale kommerzielle Werkzeuge',
  },
  takes: {
    maplespire: 'Visuelles C4 auf einem gemeinsamen Modell, mit organisationsweiten Tag- und Technologiekatalogen, Echtzeit-Zusammenarbeit und Offline-Synchronisation. Selbst gehostet läuft die Synchronisation derzeit als einzelne Instanz.',
    icepanel: 'Ein ausgereiftes, gehostetes visuelles C4-Modell. Das dokumentierte Produkt ist SaaS; es gibt weder einen allgemeinen Offline-Editor noch eine selbst gehostete Edition.',
    archyl: 'C4, Architecture as Code und KI-gestützte Erkennung in einem Produkt. On-Premise ist einem höheren Tarif vorbehalten; Offline-Bearbeitung ist nicht dokumentiert.',
    structurizr: 'Präzise C4-Modellierung als Code, geprüft in Git. Tags und Technologien sind Freitext pro Element, und die Unternehmenslandschaft wird aus den Team-Workspaces neu erzeugt.',
    'c4-model': 'Das gemeinsame Vokabular hinter diesem Vergleich. Es definiert Abstraktionen und Diagramme, bietet aber selbst weder Editor noch Speicherung oder Zusammenarbeit.',
    visio: 'Umfassende Geschäfts- und Technikdiagramme mit Microsoft-Zusammenarbeit. C4 und die Konsistenz zwischen Ansichten bleiben Handarbeit.',
    lucidchart: 'Ausgefeilte Cloud-Diagramme und gemeinsames Bearbeiten. Offline gilt nur für bereits geöffnete Dokumente, und es ist kein C4-Modell.',
    creately: 'Ein flexibler visueller Arbeitsbereich mit datengestützten Objekten und Zusammenarbeit. C4-Semantik und Regeln über Ansichten hinweg sind manuell.',
    smartdraw: 'Vorlagenreiches technisches Zeichnen mit Mehrbenutzer-Bearbeitung in Echtzeit. Es erfordert eine Internetverbindung und hat keinen kostenlosen Plan.',
    drawio: 'Hervorragendes kostenloses, offenes und offline nutzbares Zeichnen. C4-Diagramme bleiben Zeichnungen: Wiederholte Elemente und Ansichten müssen von Hand abgeglichen werden.',
    excalidraw: 'Schnelle Skizzen und gemeinsame Workshops. Der Editor ist Open Source, Plus ist gehostet; keines von beiden ist ein Architekturmodell.',
    archi: 'Starke kostenlose ArchiMate-Modellierung mit Git-basierter coArchi-Zusammenarbeit. C4 erfordert ein Mapping oder Add-on, und gemeinsames Bearbeiten erfolgt nicht live.',
    mermaid: 'Praktisch in Markdown und Code-Reviews. Die C4-Syntax ist offiziell experimentell, und jedes Diagramm bleibt für sich.',
    plantuml: 'Ausgereifte C4-Diagramme in Repositorys und Dokumentation. Es ist eine Zeichenbibliothek, kein verknüpftes visuelles Architekturmodell.',
    d2: 'Gut lesbares, vollständig offline nutzbares Architecture as Code mit starkem automatischem Layout. Keine native C4-Semantik und keine integrierte Live-Zusammenarbeit.',
  },
};

const portuguese: AlternativesCopy = {
  ...english,
  nav: 'Comparar',
  eyebrow: 'Um olhar honesto sobre o mercado',
  title: 'Compare abordagens, não apenas listas de recursos.',
  body: 'Compare o MapleSpire com IcePanel, Structurizr, Visio, draw.io e ferramentas de diagramas como código. Esta tabela separa os recursos C4 nativos do trabalho manual, e os metadados governados de forma centralizada do texto livre.',
  verified: 'Verificado nas páginas oficiais dos produtos em 2 de agosto de 2026.',
  caveat: 'Os preços são valores públicos de tabela em dólares americanos, quando disponíveis, sem impostos. “C4 Model” é um método, não um software. Os planos mudam: cada linha leva a fontes oficiais claramente identificadas.',
  filtersLabel: 'Filtrar a comparação por abordagem',
  filters: { all: 'Todos os 15', model: 'Modelos de arquitetura', drawing: 'Desenho e quadros brancos', code: 'Diagramas como código', method: 'Método' },
  columns: { product: 'Produto', approach: 'Abordagem', c4: 'Suporte a C4', sharedModel: 'Modelo conectado', collaboration: 'Trabalho em equipe', offline: 'Edição offline', deployment: 'Auto-hospedagem', sourceCode: 'Código-fonte', price: 'Porta de entrada pública', take: 'Pontos fortes · limites' },
  sources: 'Fontes oficiais',
  ourProduct: 'Nosso produto',
  legend: { strong: 'Nativo / disponível', conditional: 'Parcial / condicional', unavailable: 'Indisponível', notApplicable: 'Não se aplica' },
  tokens: {
    approach: { visualModel: 'Modelo visual', modelAsCode: 'Modelo como código', eaModel: 'Modelo EA', drawing: 'Tela de desenho', whiteboard: 'Quadro branco', diagramAsCode: 'Diagrama como código', method: 'Método / notação' },
    c4: { native: 'Nativo', strong: 'Biblioteca sólida', experimental: 'Experimental', mapping: 'Mapeamento / extensão', manual: 'Manual', none: 'Sem C4 nativo', definition: 'A definição' },
    sharedModel: { yes: 'Sim', partial: 'Parcial', no: 'Não', na: 'N/A' },
    collaboration: { realtime: 'Tempo real', cloud: 'Nuvem / plataforma', git: 'Fluxo Git', single: 'Usuário único', none: 'Não integrada', na: 'N/A' },
    offline: { yes: 'Sim', limited: 'Limitada', no: 'Não', na: 'N/A' },
    deployment: { yes: 'Sim', enterprise: 'Enterprise / sob consulta', local: 'Local + Git', editor: 'Só o editor', pending: 'Lançamento pendente', no: 'Não', na: 'N/A' },
    sourceCode: { open: 'Código aberto', mixed: 'Misto', announced: 'Anunciado · pendente', closed: 'Fechado', na: 'N/A' },
  },
  prices: {
    maplespire: 'Gratuito e de código aberto (AGPL-3.0) · demo hospedada gratuita', icepanel: 'Grátis: 5 editores / 100 objetos · Growth: US$ 40/editor/mês, anual', archyl: 'Plano individual gratuito · pago por editor', structurizr: 'Servidor open core e visualizador local gratuitos · binários licenciados para SSO e papéis', 'c4-model': 'Método e documentação gratuitos', visio: 'Incluído em alguns planos do Microsoft 365 · Plano 1: US$ 5 / Plano 2: US$ 15 por usuário/mês, anual', lucidchart: 'Grátis: 3 documentos / 60 formas · Individual: US$ 9/mês + impostos', creately: 'Grátis: 45 itens por espaço · planos pagos', smartdraw: 'Teste gratuito · Individual: US$ 9,95/mês, anual', drawio: 'Editor principal gratuito · integrações pagas com a Atlassian', excalidraw: 'Editor gratuito · Plus: US$ 6/usuário/mês', archi: 'Gratuito', mermaid: 'Código aberto gratuito · planos opcionais do Mermaid Chart', plantuml: 'Código aberto gratuito', d2: 'Código aberto gratuito · ferramentas comerciais opcionais',
  },
  takes: {
    maplespire: 'C4 visual sobre um modelo compartilhado, com catálogos de tags e tecnologias comuns a toda a organização, colaboração em tempo real e sincronização offline. Auto-hospedado, o servidor de sincronização roda por enquanto como uma única instância.',
    icepanel: 'Um modelo C4 visual hospedado e maduro. O produto documentado é SaaS; não há editor offline geral nem edição auto-hospedada.',
    archyl: 'C4, arquitetura como código e descoberta assistida por IA em um só produto. A instalação on-premise fica em um plano superior; a edição offline não está documentada.',
    structurizr: 'Modelagem C4 precisa como código, revisada no Git. Tags e tecnologias são texto livre em cada elemento, e a paisagem corporativa é regenerada a partir dos workspaces das equipes.',
    'c4-model': 'O vocabulário comum por trás desta comparação. Define abstrações e diagramas, mas não oferece editor, armazenamento nem colaboração.',
    visio: 'Diagramas de negócios e técnicos abrangentes, com a colaboração da Microsoft. O C4 e a coerência entre visões continuam manuais.',
    lucidchart: 'Diagramas na nuvem e coedição bem acabados. O uso offline se limita a documentos já abertos, e não é um modelo C4.',
    creately: 'Um espaço visual flexível, com objetos ligados a dados e colaboração. A semântica C4 e as regras entre visões são manuais.',
    smartdraw: 'Desenho técnico com muitos modelos e edição multiusuário em tempo real. Exige conexão com a internet e não tem plano gratuito.',
    drawio: 'Excelente desenho gratuito, aberto e offline. Os diagramas C4 são desenhos: elementos e visões repetidos precisam ser conciliados à mão.',
    excalidraw: 'Esboços rápidos e workshops colaborativos. O editor é de código aberto e o Plus é hospedado; nenhum dos dois é um modelo de arquitetura.',
    archi: 'Modelagem ArchiMate sólida e gratuita, com colaboração coArchi baseada em Git. O C4 exige um mapeamento ou extensão, e não há coedição ao vivo.',
    mermaid: 'Prático dentro do Markdown e em revisões de código. Sua sintaxe C4 é oficialmente experimental, e cada diagrama continua separado.',
    plantuml: 'Diagramas C4 maduros em repositórios e documentação. É uma biblioteca de desenho, não um modelo visual de arquitetura conectado.',
    d2: 'Arquitetura como código legível, totalmente offline, com ótimo layout automático. Sem semântica C4 nativa nem colaboração ao vivo integrada.',
  },
};

const arabic: AlternativesCopy = {
  ...english,
  nav: 'المقارنة',
  eyebrow: 'نظرة صريحة على السوق',
  title: 'قارن بين المناهج، لا بين قوائم الميزات فقط.',
  body: 'قارن MapleSpire بـ IcePanel وStructurizr وVisio وdraw.io وأدوات المخططات ككود. يفصل هذا الجدول بين قدرات C4 الأصلية والعمل اليدوي، وبين البيانات الوصفية المحكومة مركزيًا والنص الحر.',
  verified: 'تم التحقق منها عبر الصفحات الرسمية للمنتجات في 2 أغسطس 2026.',
  caveat: 'الأسعار هي أسعار القوائم العامة بالدولار الأمريكي حيثما توفرت، قبل الضرائب. «C4 Model» منهجية وليس برنامجًا. والعروض تتغير: يقود كل صف إلى مصادر رسمية واضحة التسمية.',
  filtersLabel: 'تصفية المقارنة حسب المنهج',
  filters: { all: 'الكل (15)', model: 'نماذج معمارية', drawing: 'الرسم واللوحات البيضاء', code: 'المخططات ككود', method: 'المنهجية' },
  columns: { product: 'المنتج', approach: 'المنهج', c4: 'دعم C4', sharedModel: 'نموذج مترابط', collaboration: 'العمل الجماعي', offline: 'التحرير دون اتصال', deployment: 'الاستضافة الذاتية', sourceCode: 'الشيفرة المصدرية', price: 'نقطة الدخول المعلنة', take: 'نقاط القوة · الحدود' },
  sources: 'المصادر الرسمية',
  ourProduct: 'منتجنا',
  legend: { strong: 'أصلي / متاح', conditional: 'جزئي / مشروط', unavailable: 'غير متاح', notApplicable: 'لا ينطبق' },
  tokens: {
    approach: { visualModel: 'نموذج مرئي', modelAsCode: 'النموذج ككود', eaModel: 'نموذج معمارية مؤسسية', drawing: 'لوحة رسم', whiteboard: 'لوحة بيضاء', diagramAsCode: 'المخطط ككود', method: 'منهجية / ترميز' },
    c4: { native: 'أصلي', strong: 'مكتبة متينة', experimental: 'تجريبي', mapping: 'مواءمة / إضافة', manual: 'يدوي', none: 'لا C4 أصلي', definition: 'التعريف نفسه' },
    sharedModel: { yes: 'نعم', partial: 'جزئي', no: 'لا', na: 'لا ينطبق' },
    collaboration: { realtime: 'الوقت الفعلي', cloud: 'سحابة / منصة', git: 'سير عمل Git', single: 'مستخدم واحد', none: 'غير مدمج', na: 'لا ينطبق' },
    offline: { yes: 'نعم', limited: 'محدود', no: 'لا', na: 'لا ينطبق' },
    deployment: { yes: 'نعم', enterprise: 'للمؤسسات / عند الطلب', local: 'محلي + Git', editor: 'المحرر فقط', pending: 'الإصدار معلّق', no: 'لا', na: 'لا ينطبق' },
    sourceCode: { open: 'مفتوح المصدر', mixed: 'مختلط', announced: 'مُعلَن · معلّق', closed: 'مغلق', na: 'لا ينطبق' },
  },
  prices: {
    maplespire: 'مجاني ومفتوح المصدر (AGPL-3.0) · عرض تجريبي مستضاف مجاني', icepanel: 'مجاني: 5 محررين / 100 عنصر · Growth: 40 دولارًا أمريكيًا للمحرر شهريًا، سنويًا', archyl: 'خطة فردية مجانية · مدفوعة لكل محرر', structurizr: 'خادم open core وعارض محلي مجانيان · ملفات تنفيذية مرخّصة لـ SSO والأدوار', 'c4-model': 'المنهجية والوثائق مجانية', visio: 'مضمَّن في بعض خطط Microsoft 365 · الخطة 1: 5 دولارات / الخطة 2: 15 دولارًا للمستخدم شهريًا، سنويًا', lucidchart: 'مجاني: 3 مستندات / 60 شكلًا · Individual: 9 دولارات شهريًا + الضرائب', creately: 'مجاني: 45 عنصرًا لكل مساحة · خطط مدفوعة', smartdraw: 'تجربة مجانية · Individual: 9.95 دولارات شهريًا، سنويًا', drawio: 'المحرر الأساسي مجاني · تكاملات Atlassian مدفوعة', excalidraw: 'المحرر مجاني · Plus: 6 دولارات للمستخدم شهريًا', archi: 'مجاني', mermaid: 'مفتوح المصدر ومجاني · خطط Mermaid Chart اختيارية', plantuml: 'مفتوح المصدر ومجاني', d2: 'مفتوح المصدر ومجاني · أدوات تجارية اختيارية',
  },
  takes: {
    maplespire: 'C4 مرئي على نموذج مشترك، مع كتالوجات وسوم وتقنيات على مستوى المؤسسة، وتعاون في الوقت الفعلي، ومزامنة دون اتصال. في الاستضافة الذاتية، يعمل خادم المزامنة حاليًا كنسخة واحدة.',
    icepanel: 'نموذج C4 مرئي مستضاف وناضج. المنتج الموثّق خدمة SaaS؛ ولا يوجد محرر عام يعمل دون اتصال ولا إصدار للاستضافة الذاتية.',
    archyl: 'C4 والمعمارية ككود والاكتشاف بمساعدة الذكاء الاصطناعي في منتج واحد. التثبيت المحلي حكر على فئة أعلى، والتحرير دون اتصال غير موثّق.',
    structurizr: 'نمذجة C4 دقيقة ككود تُراجَع في Git. الوسوم والتقنيات نص حر في كل عنصر، ويُعاد توليد المشهد المؤسسي من مساحات عمل الفرق.',
    'c4-model': 'المفردات المشتركة وراء هذه المقارنة. تعرّف التجريدات والمخططات، لكنها لا توفر محررًا ولا تخزينًا ولا تعاونًا.',
    visio: 'مخططات أعمال وتقنية شاملة مع تعاون Microsoft. يبقى C4 والاتساق بين العروض عملًا يدويًا.',
    lucidchart: 'رسم سحابي وتحرير مشترك متقنان. العمل دون اتصال يقتصر على المستندات المفتوحة مسبقًا، وهو ليس نموذج C4.',
    creately: 'مساحة مرئية مرنة بعناصر مرتبطة بالبيانات وتعاون. دلالات C4 وقواعد الاتساق بين العروض يدوية.',
    smartdraw: 'رسم تقني غني بالقوالب مع تحرير متعدد المستخدمين في الوقت الفعلي. يتطلب اتصالًا بالإنترنت ولا يقدّم خطة مجانية.',
    drawio: 'رسم ممتاز مجاني ومفتوح ويعمل دون اتصال. مخططات C4 فيه رسومات، لذا تجب مواءمة العناصر والعروض المكررة يدويًا.',
    excalidraw: 'رسومات سريعة وورش عمل تعاونية. المحرر مفتوح المصدر وPlus مستضاف، وليس أيٌّ منهما نموذجًا معماريًا.',
    archi: 'نمذجة ArchiMate مجانية ومتينة مع تعاون coArchi القائم على Git. يتطلب C4 مواءمة أو إضافة، والتعاون ليس تحريرًا مشتركًا مباشرًا.',
    mermaid: 'عملي داخل Markdown ومراجعات الشيفرة. صيغة C4 فيه تجريبية رسميًا، ويبقى كل مخطط منفصلًا.',
    plantuml: 'مخططات C4 ناضجة في المستودعات والوثائق. إنه مكتبة رسم، لا نموذج معماري مرئي مترابط.',
    d2: 'معمارية ككود مقروءة تعمل دون اتصال بالكامل مع تخطيط تلقائي قوي. لا دلالات C4 أصلية ولا تعاون مباشر مدمج.',
  },
};

export const alternativesCopy: Record<Locale, AlternativesCopy> = {
  en: english,
  fr: french,
  es: spanish,
  pt: portuguese,
  it: italian,
  de: german,
  zh: chinese,
  ja: japanese,
  ko: korean,
  hi: hindi,
  ar: arabic,
};

export function statusTone(value: string): 'strong' | 'conditional' | 'unavailable' | 'na' | 'plain' {
  if (['native', 'strong', 'definition', 'yes', 'realtime', 'open'].includes(value)) return 'strong';
  if (['experimental', 'mapping', 'manual', 'partial', 'cloud', 'git', 'single', 'limited', 'enterprise', 'local', 'editor', 'mixed', 'pending', 'announced'].includes(value)) return 'conditional';
  if (['none', 'no', 'closed'].includes(value)) return 'unavailable';
  if (value === 'na') return 'na';
  return 'plain';
}
