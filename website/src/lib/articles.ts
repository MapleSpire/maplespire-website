import type { Locale } from './content';

export const STRUCTURIZR_ARTICLE_SLUG = 'maplespire-vs-structurizr';
export const articleLocales = ['fr', 'en'] as const;
export type ArticleLocale = (typeof articleLocales)[number];

export function isArticleLocale(locale: Locale): locale is ArticleLocale {
  return (articleLocales as readonly Locale[]).includes(locale);
}

/** The article only exists in French and English; other locales link to the English version. */
export function structurizrArticlePath(locale: Locale) {
  return `/${isArticleLocale(locale) ? locale : 'en'}/${STRUCTURIZR_ARTICLE_SLUG}/`;
}

export type ArticleTable = {
  caption: string;
  columns: [string, string, string];
  rows: Array<[string, string, string]>;
};

export type ArticleSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: ArticleTable;
  links?: Array<{ label: string; url: string }>;
};

export type ArticleDocument = {
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  updatedLabel: string;
  updatedDate: string;
  isoDate: string;
  summary: string;
  verdict: string;
  contentsLabel: string;
  backLabel: string;
  ctaTitle: string;
  ctaBody: string;
  ctaPrimary: string;
  ctaSecondary: string;
  sections: ArticleSection[];
};

const sources = [
  { label: 'Structurizr DSL — language reference', url: 'https://docs.structurizr.com/dsl/language' },
  { label: 'Structurizr — workspace scope', url: 'https://docs.structurizr.com/workspaces/scope' },
  { label: 'Structurizr — modelling an enterprise', url: 'https://docs.structurizr.com/workspaces/enterprise' },
  { label: 'Structurizr — server', url: 'https://docs.structurizr.com/server' },
  { label: 'Structurizr — commands', url: 'https://docs.structurizr.com/commands' },
  { label: 'MapleSpire — source code', url: 'https://github.com/MapleSpire/maplespire' },
];

export const structurizrArticle: Record<ArticleLocale, ArticleDocument> = {
  fr: {
    title: 'MapleSpire ou Structurizr : lequel tient à l’échelle d’une gouvernance d’entreprise?',
    seoTitle: 'MapleSpire vs Structurizr : gouvernance d’architecture C4',
    description:
      'Alternative à Structurizr? Comparaison des tags, technologies, versions, mises à jour centralisées et contrôle d’accès pour une architecture C4 d’entreprise.',
    eyebrow: 'Comparaison',
    updatedLabel: 'Mis à jour le',
    updatedDate: '12 octobre 2026',
    isoDate: '2026-10-12',
    summary:
      'Structurizr et MapleSpire reposent tous deux sur le modèle C4 et sur un vrai modèle, pas sur des dessins. Ils divergent sur une question décisive pour une grande organisation : où vivent les métadonnées partagées, et qui peut les tenir à jour.',
    verdict:
      'Structurizr excelle quand l’architecture est du code, écrite et revue dans Git par des équipes techniques. MapleSpire vise le référentiel gouverné : des catalogues de tags et de technologies uniques pour toute l’organisation, éditables visuellement par tous ceux qui en ont le droit.',
    contentsLabel: 'Sommaire',
    backLabel: 'Retour à l’accueil',
    ctaTitle: 'Faites l’essai avec votre propre workspace.',
    ctaBody: 'Importez un fichier Structurizr DSL dans la démo, ou auto-hébergez MapleSpire à partir du dépôt public.',
    ctaPrimary: 'Essayer la démo',
    ctaSecondary: 'Voir le code sur GitHub',
    sections: [
      {
        id: 'philosophies',
        title: 'Deux philosophies de modélisation',
        paragraphs: [
          'Structurizr est un outil de « modèle en code » : l’architecture s’écrit dans un DSL textuel, se versionne dans Git et se publie vers un serveur qui génère les diagrammes. La documentation recommande un workspace par système logiciel, détenu par l’équipe qui le construit.',
          'MapleSpire est un modèle visuel partagé : objets, relations et vues vivent dans une base de données, se modifient à plusieurs en temps réel et restent consultables hors ligne. Les catalogues de tags et de technologies sont des entités de l’organisation, et non du texte recopié dans chaque fichier.',
          'Aucune des deux approches n’est meilleure dans l’absolu. La différence se voit surtout quand le nombre d’équipes, de systèmes et de contributeurs augmente.',
        ],
      },
      {
        id: 'metadonnees',
        title: 'Attribuer des métadonnées : tags, technologies, versions, groupes',
        paragraphs: [
          'Dans Structurizr, on décrit un élément avec les mots-clés tags, technology, properties et perspectives. Ce sont des chaînes libres, saisies élément par élément. Les archetypes fournissent des valeurs par défaut et les styles s’accrochent aux tags, mais il n’existe pas de registre central qui définit ce qu’est un tag ou une technologie valide.',
          'Conséquence concrète : « PostgreSQL », « Postgres » et « postgresql 16 » peuvent coexister dans différents workspaces. Renommer un tag revient à faire un rechercher-remplacer dans tous les dépôts concernés, et rien n’empêche d’utiliser une technologie que l’organisation a retirée.',
          'Dans MapleSpire, un objet ne stocke pas le texte d’un tag : il stocke une référence vers un tag défini une seule fois pour l’organisation. Les technologies proviennent d’un catalogue géré, avec des alias, des icônes et un cycle de vie.',
        ],
        table: {
          caption: 'Comment chaque outil attribue les métadonnées',
          columns: ['Métadonnée', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Tags', 'Texte libre par élément (tags "A,B"); styles liés au texte du tag', 'Tags et groupes de tags définis une fois pour l’organisation, référencés par identifiant'],
            ['Renommer ou fusionner un tag', 'Rechercher-remplacer dans chaque workspace', 'Renommer, recolorer, fusionner ou archiver : appliqué partout, dans tous les paysages'],
            ['Technologies', 'Texte libre (technology "Java")', 'Catalogue géré : alias, icônes claires et sombres, liens de documentation'],
            ['Cycle de vie d’une technologie', 'Non modélisé', 'Active, dépréciée, retirée ou fusionnée; ajouts soumis à approbation'],
            ['Version utilisée', 'À ajouter soi-même dans le texte ou dans properties', 'Version employée enregistrée sur chaque usage d’une technologie'],
            ['Groupes et domaines', 'Groupes visuels déclarés dans le DSL', 'Groupes pouvant porter tags et technologies; domaines hiérarchiques'],
            ['Propriétés personnalisées', 'properties et perspectives (clé-valeur libres)', 'Prévues dans le modèle, pas encore éditables dans l’interface'],
          ],
        },
      },
      {
        id: 'responsables',
        title: 'Et les responsables?',
        paragraphs: [
          'La propriété d’un élément (quelle équipe en répond) est souvent la première métadonnée exigée par une gouvernance. Dans Structurizr, elle passe par une propriété libre, par exemple une clé owner, sans lien avec un annuaire d’équipes.',
          'MapleSpire gère déjà les équipes pour le contrôle des accès, et son modèle prévoit d’associer des équipes propriétaires aux objets. Cette assignation n’est toutefois pas encore exposée dans l’interface : nous préférons le dire clairement plutôt que de la promettre.',
        ],
      },
      {
        id: 'mise-a-jour',
        title: 'Mettre à jour une seule fois, pour tout le monde',
        paragraphs: [
          'Pour une vue d’entreprise, Structurizr propose une démarche en trois temps : regrouper les systèmes dans un catalogue DSL partagé par URL, faire en sorte que chaque workspace d’équipe étende ce catalogue, puis générer un paysage d’ensemble. Ce paysage est produit par un administrateur qui récupère tous les workspaces, lance la génération et publie le résultat. C’est une copie : il faut la régénérer pour qu’elle reflète les changements suivants.',
          'Dans MapleSpire, tags et technologies vivent dans la base de données de l’organisation. Une modification faite dans la console d’administration est visible immédiatement par tous les paysages, sans étape de publication. À l’intérieur d’un paysage, chaque objet existe une seule fois et chaque diagramme y fait référence.',
          'Deux nuances, par souci d’exactitude. Dans MapleSpire, le modèle détaillé reste propre à chaque paysage; seuls les catalogues sont communs à toute l’organisation. Par ailleurs, chaque usage d’une technologie conserve la révision du catalogue avec laquelle il a été saisi, afin qu’une modification du catalogue ne réécrive pas l’historique en silence.',
        ],
      },
      {
        id: 'acces',
        title: 'Contrôle des accès et revue des changements',
        paragraphs: [
          'Le cœur open source de Structurizr server n’a ni authentification ni contrôle d’accès par rôle : les workspaces y sont publics. Les rôles, SAML, LDAP et l’API d’administration font partie des binaires pré-construits sous licence. Sa grande force est ailleurs : comme le modèle est du code, chaque changement peut passer par une pull request, une revue et une validation automatisée en intégration continue.',
          'MapleSpire inclut dans son code AGPL-3.0 des rôles d’organisation, des équipes dotées de droits de lecture ou d’écriture par paysage, l’authentification unique OIDC avec Google ou Microsoft et un journal d’audit des actions d’administration. Les évolutions se préparent dans des brouillons, avec une liste des changements et une fusion qui détecte les conflits.',
          'Limite actuelle : les brouillons de MapleSpire n’ont pas encore d’étape formelle d’approbation avant fusion. Si votre gouvernance exige une revue obligatoire de chaque changement, le flux pull request de Structurizr reste aujourd’hui plus strict.',
        ],
      },
      {
        id: 'echelle',
        title: 'Lequel tient le mieux à l’échelle?',
        table: {
          caption: 'Passage à l’échelle selon le critère',
          columns: ['Critère', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Cohérence du vocabulaire entre équipes', 'Dépend de la discipline et des revues', 'Imposée par des catalogues uniques'],
            ['Contributeurs non développeurs', 'Doivent apprendre le DSL et Git', 'Édition visuelle, à plusieurs, en temps réel'],
            ['Vue d’ensemble à jour', 'Paysage régénéré à la demande', 'Catalogues partagés en direct; modèle détaillé par paysage'],
            ['Revue obligatoire des changements', 'Pull requests et CI', 'Brouillons et fusion, sans approbation formelle pour l’instant'],
            ['Contrôle d’accès et SSO', 'Binaires sous licence', 'Inclus dans le code open source'],
            ['Haute disponibilité', 'Selon le stockage et la licence choisis', 'Synchronisation sur une seule instance pour l’instant'],
          ],
        },
        paragraphs: [
          'Si votre défi est de faire parler toute l’organisation le même langage (mêmes tags, mêmes technologies, mêmes versions) et d’y faire contribuer des architectes, des responsables produit et des équipes qui ne vivent pas dans Git, MapleSpire tient mieux l’échelle de la gouvernance.',
          'Si votre architecture est déjà gérée comme du code, que vos contributeurs sont des développeurs et que la gouvernance passe par la revue de pull requests, Structurizr reste un excellent choix.',
        ],
      },
      {
        id: 'migrer',
        title: 'Migrer ou faire cohabiter les deux',
        paragraphs: [
          'MapleSpire importe un workspace Structurizr DSL et génère les diagrammes C4 correspondants. Il exporte aussi vers Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG et Markdown. Vous pouvez donc essayer MapleSpire sur un workspace existant sans renoncer à vos fichiers.',
        ],
      },
      {
        id: 'sources',
        title: 'Sources',
        paragraphs: [
          'Les affirmations sur Structurizr s’appuient sur sa documentation officielle, consultée le 12 octobre 2026. Les fonctions de MapleSpire décrites ici sont celles du code publié.',
        ],
        links: sources,
      },
    ],
  },
  en: {
    title: 'MapleSpire or Structurizr: which one scales to enterprise governance?',
    seoTitle: 'MapleSpire vs Structurizr: C4 architecture governance compared',
    description:
      'Looking for a Structurizr alternative? How MapleSpire and Structurizr handle tags, technologies, versions, central updates and access control at enterprise scale.',
    eyebrow: 'Comparison',
    updatedLabel: 'Updated',
    updatedDate: 'October 12, 2026',
    isoDate: '2026-10-12',
    summary:
      'Structurizr and MapleSpire both build on the C4 model and on a real model rather than drawings. They differ on a question that matters a great deal in a large organization: where shared metadata lives, and who can keep it current.',
    verdict:
      'Structurizr shines when architecture is code, written and reviewed in Git by engineering teams. MapleSpire targets a governed repository: one set of tag and technology catalogs for the whole organization, editable visually by everyone who has the right to.',
    contentsLabel: 'Contents',
    backLabel: 'Back to home',
    ctaTitle: 'Try it with your own workspace.',
    ctaBody: 'Import a Structurizr DSL file into the demo, or self-host MapleSpire from the public repository.',
    ctaPrimary: 'Try the demo',
    ctaSecondary: 'View the code on GitHub',
    sections: [
      {
        id: 'philosophies',
        title: 'Two modelling philosophies',
        paragraphs: [
          'Structurizr is a models-as-code tool: architecture is written in a text DSL, versioned in Git and pushed to a server that renders the diagrams. Its documentation recommends one workspace per software system, owned by the team that builds it.',
          'MapleSpire is a shared visual model: objects, relationships and views live in a database, are edited together in real time and stay available offline. Tag and technology catalogs are organization-level entities, not text copied into every file.',
          'Neither approach is better in the abstract. The difference shows when the number of teams, systems and contributors grows.',
        ],
      },
      {
        id: 'metadata',
        title: 'Assigning metadata: tags, technologies, versions, groups',
        paragraphs: [
          'In Structurizr, you describe an element with the tags, technology, properties and perspectives keywords. They are free-form strings, typed element by element. Archetypes provide defaults and styles hook onto tags, but there is no central registry defining what a valid tag or technology is.',
          'In practice, “PostgreSQL”, “Postgres” and “postgresql 16” can coexist across workspaces. Renaming a tag means a find-and-replace across every repository involved, and nothing stops anyone from using a technology the organization has retired.',
          'In MapleSpire, an object does not store a tag’s text: it stores a reference to a tag defined once for the organization. Technologies come from a managed catalog with aliases, icons and a lifecycle.',
        ],
        table: {
          caption: 'How each tool assigns metadata',
          columns: ['Metadata', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Tags', 'Free text per element (tags "A,B"); styles bound to the tag text', 'Tags and tag groups defined once for the organization, referenced by ID'],
            ['Renaming or merging a tag', 'Find-and-replace in every workspace', 'Rename, recolor, merge or archive: applied everywhere, across every landscape'],
            ['Technologies', 'Free text (technology "Java")', 'Managed catalog: aliases, light and dark icons, documentation links'],
            ['Technology lifecycle', 'Not modelled', 'Active, deprecated, retired or merged; new entries go through approval'],
            ['Version in use', 'Add it yourself in text or properties', 'Version recorded on every technology usage'],
            ['Groups and domains', 'Visual groups declared in the DSL', 'Groups that can carry tags and technologies; hierarchical domains'],
            ['Custom properties', 'properties and perspectives (free key-value pairs)', 'Planned in the model, not yet editable in the interface'],
          ],
        },
      },
      {
        id: 'owners',
        title: 'What about owners?',
        paragraphs: [
          'Ownership — which team answers for an element — is often the first metadata a governance process asks for. In Structurizr, it goes into a free property such as an owner key, with no link to a team directory.',
          'MapleSpire already manages teams for access control, and its model plans for assigning owning teams to objects. That assignment is not exposed in the interface yet: we would rather say so plainly than promise it.',
        ],
      },
      {
        id: 'central-updates',
        title: 'Update once, for everyone',
        paragraphs: [
          'For an enterprise view, Structurizr suggests a three-step approach: gather software systems into a DSL catalog shared by URL, have each team workspace extend that catalog, then generate an overall landscape. An administrator produces that landscape by pulling every workspace, running the generator and pushing the result. It is a copy: it must be regenerated to reflect later changes.',
          'In MapleSpire, tags and technologies live in the organization’s database. A change made in the admin console is visible immediately in every landscape, with no publishing step. Within a landscape, each object exists once and every diagram references it.',
          'Two caveats, for accuracy. In MapleSpire, the detailed model is still scoped to each landscape; only the catalogs are shared across the organization. And each technology usage keeps the catalog revision it was recorded with, so a catalog change never silently rewrites history.',
        ],
      },
      {
        id: 'access',
        title: 'Access control and change review',
        paragraphs: [
          'The open-source core of Structurizr server has no authentication or role-based access: workspaces are public. Roles, SAML, LDAP and the admin API come with the licensed prebuilt binaries. Its great strength lies elsewhere: because the model is code, every change can go through a pull request, a review and automated validation in CI.',
          'MapleSpire’s AGPL-3.0 code includes organization roles, teams with read or write grants per landscape, OIDC single sign-on with Google or Microsoft, and an audit log of administrative actions. Changes are prepared in drafts, with a change list and a merge that detects conflicts.',
          'Current limit: MapleSpire drafts do not yet have a formal approval step before merge. If your governance requires mandatory review of every change, Structurizr’s pull-request flow is stricter today.',
        ],
      },
      {
        id: 'scale',
        title: 'Which one scales better?',
        table: {
          caption: 'How each tool scales, by criterion',
          columns: ['Criterion', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Consistent vocabulary across teams', 'Depends on discipline and reviews', 'Enforced by single catalogs'],
            ['Non-developer contributors', 'Must learn the DSL and Git', 'Visual, multi-user, real-time editing'],
            ['Up-to-date big picture', 'Landscape regenerated on demand', 'Live shared catalogs; detailed model per landscape'],
            ['Mandatory change review', 'Pull requests and CI', 'Drafts and merge, no formal approval yet'],
            ['Access control and SSO', 'Licensed binaries', 'Included in the open-source code'],
            ['High availability', 'Depends on chosen storage and license', 'Sync runs as a single instance for now'],
          ],
        },
        paragraphs: [
          'If your challenge is getting the whole organization to speak the same language — the same tags, technologies and versions — and bringing in architects, product leads and teams who do not live in Git, MapleSpire scales better for governance.',
          'If your architecture is already managed as code, your contributors are developers and governance runs through pull-request review, Structurizr remains an excellent choice.',
        ],
      },
      {
        id: 'migrate',
        title: 'Migrating, or running both',
        paragraphs: [
          'MapleSpire imports a Structurizr DSL workspace and generates the matching C4 diagrams. It also exports to Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG and Markdown, so you can try MapleSpire on an existing workspace without giving up your files.',
        ],
      },
      {
        id: 'sources',
        title: 'Sources',
        paragraphs: [
          'Statements about Structurizr are based on its official documentation, consulted on October 12, 2026. The MapleSpire features described here are those in the published code.',
        ],
        links: sources,
      },
    ],
  },
};
