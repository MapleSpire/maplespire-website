import { localeOptions } from './content';
import type { Locale } from './content';

export const STRUCTURIZR_ARTICLE_SLUG = 'maplespire-vs-structurizr';
/** The comparison article is published in every site locale (structurizrArticle is a full Record). */
export const articleLocales: readonly Locale[] = localeOptions.map(({ locale }) => locale);
export type ArticleLocale = Locale;

export function isArticleLocale(locale: Locale): locale is ArticleLocale {
  return articleLocales.includes(locale);
}

/** Each landing page links to the article in its own language, English if one were ever missing. */
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
  /** The skip link to the article body. */
  skipLabel: string;
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

/** The same six sources with translated labels, in the order of `sources`. */
const localizedSources = (labels: [string, string, string, string, string, string]) =>
  sources.map((source, index) => ({ label: labels[index], url: source.url }));

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
    skipLabel: 'Passer au contenu',
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
    skipLabel: 'Skip to content',
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
  es: {
    title: 'MapleSpire o Structurizr: ¿cuál escala a la gobernanza de una gran empresa?',
    seoTitle: 'MapleSpire vs Structurizr: gobernanza de arquitectura C4',
    description:
      '¿Buscas una alternativa a Structurizr? Cómo gestionan MapleSpire y Structurizr las etiquetas, las tecnologías, las versiones, las actualizaciones centralizadas y el control de acceso a escala empresarial.',
    eyebrow: 'Comparativa',
    updatedLabel: 'Actualizado el',
    updatedDate: '12 de octubre de 2026',
    isoDate: '2026-10-12',
    summary:
      'Structurizr y MapleSpire se basan en el modelo C4 y en un modelo real, no en dibujos. Difieren en una cuestión decisiva para una gran organización: dónde viven los metadatos compartidos y quién puede mantenerlos al día.',
    verdict:
      'Structurizr brilla cuando la arquitectura es código, escrito y revisado en Git por equipos de ingeniería. MapleSpire apuesta por un repositorio gobernado: un único conjunto de catálogos de etiquetas y tecnologías para toda la organización, editable visualmente por todas las personas autorizadas.',
    contentsLabel: 'Índice',
    backLabel: 'Volver al inicio',
    ctaTitle: 'Pruébalo con tu propio workspace.',
    ctaBody: 'Importa un archivo Structurizr DSL en la demo o aloja MapleSpire en tu infraestructura a partir del repositorio público.',
    ctaPrimary: 'Probar la demo',
    ctaSecondary: 'Ver el código en GitHub',
    skipLabel: 'Ir al contenido',
    sections: [
      {
        id: 'philosophies',
        title: 'Dos filosofías de modelado',
        paragraphs: [
          'Structurizr es una herramienta de «modelos como código»: la arquitectura se escribe en un DSL de texto, se versiona en Git y se publica en un servidor que genera los diagramas. Su documentación recomienda un workspace por sistema de software, en manos del equipo que lo construye.',
          'MapleSpire es un modelo visual compartido: objetos, relaciones y vistas viven en una base de datos, se editan en equipo en tiempo real y siguen disponibles sin conexión. Los catálogos de etiquetas y tecnologías son entidades de la organización, no texto copiado en cada archivo.',
          'Ningún enfoque es mejor en abstracto. La diferencia aparece cuando crece el número de equipos, sistemas y personas que contribuyen.',
        ],
      },
      {
        id: 'metadata',
        title: 'Asignar metadatos: etiquetas, tecnologías, versiones, grupos',
        paragraphs: [
          'En Structurizr, un elemento se describe con las palabras clave tags, technology, properties y perspectives. Son cadenas libres que se escriben elemento a elemento. Los archetypes aportan valores por defecto y los estilos se enganchan a las etiquetas, pero no existe un registro central que defina qué es una etiqueta o una tecnología válida.',
          'En la práctica, «PostgreSQL», «Postgres» y «postgresql 16» pueden convivir en distintos workspaces. Renombrar una etiqueta implica buscar y reemplazar en todos los repositorios afectados, y nada impide usar una tecnología que la organización ya ha retirado.',
          'En MapleSpire, un objeto no guarda el texto de una etiqueta: guarda una referencia a una etiqueta definida una sola vez para la organización. Las tecnologías proceden de un catálogo gestionado, con alias, iconos y un ciclo de vida.',
        ],
        table: {
          caption: 'Cómo asigna los metadatos cada herramienta',
          columns: ['Metadato', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Etiquetas', 'Texto libre por elemento (tags "A,B"); estilos ligados al texto de la etiqueta', 'Etiquetas y grupos de etiquetas definidos una vez para la organización, referenciados por identificador'],
            ['Renombrar o fusionar una etiqueta', 'Buscar y reemplazar en cada workspace', 'Renombrar, cambiar el color, fusionar o archivar: se aplica en todas partes, en todos los paisajes'],
            ['Tecnologías', 'Texto libre (technology "Java")', 'Catálogo gestionado: alias, iconos claros y oscuros, enlaces a la documentación'],
            ['Ciclo de vida de una tecnología', 'No se modela', 'Activa, obsoleta, retirada o fusionada; las nuevas entradas pasan por aprobación'],
            ['Versión en uso', 'Añadirla a mano en el texto o en properties', 'Versión registrada en cada uso de una tecnología'],
            ['Grupos y dominios', 'Grupos visuales declarados en el DSL', 'Grupos que pueden llevar etiquetas y tecnologías; dominios jerárquicos'],
            ['Propiedades personalizadas', 'properties y perspectives (pares clave-valor libres)', 'Previstas en el modelo, aún no editables en la interfaz'],
          ],
        },
      },
      {
        id: 'owners',
        title: '¿Y los responsables?',
        paragraphs: [
          'La propiedad de un elemento (qué equipo responde de él) suele ser el primer metadato que exige un proceso de gobernanza. En Structurizr se expresa con una propiedad libre, por ejemplo una clave owner, sin vínculo con un directorio de equipos.',
          'MapleSpire ya gestiona equipos para el control de acceso, y su modelo contempla asignar equipos propietarios a los objetos. Esa asignación todavía no está disponible en la interfaz: preferimos decirlo claramente antes que prometerlo.',
        ],
      },
      {
        id: 'central-updates',
        title: 'Actualizar una vez, para todos',
        paragraphs: [
          'Para una vista de empresa, Structurizr propone un enfoque en tres pasos: reunir los sistemas de software en un catálogo DSL compartido por URL, hacer que cada workspace de equipo extienda ese catálogo y generar después un paisaje global. Ese paisaje lo produce un administrador que descarga todos los workspaces, ejecuta el generador y publica el resultado. Es una copia: hay que regenerarla para que refleje los cambios posteriores.',
          'En MapleSpire, las etiquetas y las tecnologías viven en la base de datos de la organización. Un cambio hecho en la consola de administración se ve de inmediato en todos los paisajes, sin paso de publicación. Dentro de un paisaje, cada objeto existe una sola vez y cada diagrama hace referencia a él.',
          'Dos matices, en aras de la exactitud. En MapleSpire, el modelo detallado sigue siendo propio de cada paisaje; solo los catálogos se comparten en toda la organización. Además, cada uso de una tecnología conserva la revisión del catálogo con la que se registró, de modo que un cambio en el catálogo nunca reescribe la historia en silencio.',
        ],
      },
      {
        id: 'access',
        title: 'Control de acceso y revisión de cambios',
        paragraphs: [
          'El núcleo de código abierto de Structurizr server no tiene autenticación ni control de acceso basado en roles: los workspaces son públicos. Los roles, SAML, LDAP y la API de administración vienen con los binarios precompilados bajo licencia. Su gran fortaleza está en otra parte: como el modelo es código, cada cambio puede pasar por una pull request, una revisión y una validación automática en integración continua.',
          'El código AGPL-3.0 de MapleSpire incluye roles de organización, equipos con permisos de lectura o escritura por paisaje, inicio de sesión único OIDC con Google o Microsoft y un registro de auditoría de las acciones de administración. Los cambios se preparan en borradores, con una lista de cambios y una fusión que detecta conflictos.',
          'Límite actual: los borradores de MapleSpire todavía no tienen un paso formal de aprobación antes de la fusión. Si tu gobernanza exige una revisión obligatoria de cada cambio, el flujo de pull requests de Structurizr es hoy más estricto.',
        ],
      },
      {
        id: 'scale',
        title: '¿Cuál escala mejor?',
        table: {
          caption: 'Cómo escala cada herramienta, por criterio',
          columns: ['Criterio', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Vocabulario coherente entre equipos', 'Depende de la disciplina y de las revisiones', 'Garantizado por catálogos únicos'],
            ['Personas que no desarrollan', 'Deben aprender el DSL y Git', 'Edición visual, multiusuario y en tiempo real'],
            ['Visión de conjunto actualizada', 'Paisaje regenerado bajo demanda', 'Catálogos compartidos en directo; modelo detallado por paisaje'],
            ['Revisión obligatoria de cambios', 'Pull requests e integración continua', 'Borradores y fusión, todavía sin aprobación formal'],
            ['Control de acceso y SSO', 'Binarios bajo licencia', 'Incluidos en el código abierto'],
            ['Alta disponibilidad', 'Depende del almacenamiento y la licencia elegidos', 'La sincronización funciona por ahora en una sola instancia'],
          ],
        },
        paragraphs: [
          'Si tu reto es que toda la organización hable el mismo idioma (las mismas etiquetas, tecnologías y versiones) y que contribuyan arquitectos, responsables de producto y equipos que no viven en Git, MapleSpire escala mejor para la gobernanza.',
          'Si tu arquitectura ya se gestiona como código, quienes contribuyen son desarrolladores y la gobernanza pasa por la revisión de pull requests, Structurizr sigue siendo una opción excelente.',
        ],
      },
      {
        id: 'migrate',
        title: 'Migrar o usar ambos',
        paragraphs: [
          'MapleSpire importa un workspace de Structurizr DSL y genera los diagramas C4 correspondientes. También exporta a Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG y Markdown, así que puedes probar MapleSpire con un workspace existente sin renunciar a tus archivos.',
        ],
      },
      {
        id: 'sources',
        title: 'Fuentes',
        paragraphs: [
          'Las afirmaciones sobre Structurizr se basan en su documentación oficial, consultada el 12 de octubre de 2026. Las funciones de MapleSpire descritas aquí son las del código publicado.',
        ],
        links: localizedSources([
          'Structurizr DSL — referencia del lenguaje',
          'Structurizr — alcance de un workspace',
          'Structurizr — modelar una empresa',
          'Structurizr — servidor',
          'Structurizr — comandos',
          'MapleSpire — código fuente',
        ]),
      },
    ],
  },
  pt: {
    title: 'MapleSpire ou Structurizr: qual acompanha a governança de uma grande empresa?',
    seoTitle: 'MapleSpire vs Structurizr: governança de arquitetura C4',
    description:
      'Procurando uma alternativa ao Structurizr? Como o MapleSpire e o Structurizr tratam tags, tecnologias, versões, atualizações centralizadas e controle de acesso em escala corporativa.',
    eyebrow: 'Comparação',
    updatedLabel: 'Atualizado em',
    updatedDate: '12 de outubro de 2026',
    isoDate: '2026-10-12',
    summary:
      'O Structurizr e o MapleSpire se apoiam no modelo C4 e em um modelo de verdade, não em desenhos. Eles divergem em uma questão decisiva para uma grande organização: onde ficam os metadados compartilhados e quem consegue mantê-los atualizados.',
    verdict:
      'O Structurizr brilha quando a arquitetura é código, escrito e revisado no Git por times de engenharia. O MapleSpire mira um repositório governado: um único conjunto de catálogos de tags e tecnologias para toda a organização, editável visualmente por todos que têm permissão.',
    contentsLabel: 'Sumário',
    backLabel: 'Voltar ao início',
    ctaTitle: 'Teste com o seu próprio workspace.',
    ctaBody: 'Importe um arquivo Structurizr DSL na demo ou hospede o MapleSpire por conta própria a partir do repositório público.',
    ctaPrimary: 'Experimentar a demo',
    ctaSecondary: 'Ver o código no GitHub',
    skipLabel: 'Pular para o conteúdo',
    sections: [
      {
        id: 'philosophies',
        title: 'Duas filosofias de modelagem',
        paragraphs: [
          'O Structurizr é uma ferramenta de “modelos como código”: a arquitetura é escrita em uma DSL textual, versionada no Git e publicada em um servidor que gera os diagramas. A documentação recomenda um workspace por sistema de software, mantido pelo time que o constrói.',
          'O MapleSpire é um modelo visual compartilhado: objetos, relações e visões ficam em um banco de dados, são editados em conjunto em tempo real e continuam disponíveis offline. Os catálogos de tags e tecnologias são entidades da organização, não texto copiado em cada arquivo.',
          'Nenhuma abordagem é melhor em termos absolutos. A diferença aparece quando cresce o número de times, sistemas e pessoas contribuindo.',
        ],
      },
      {
        id: 'metadata',
        title: 'Atribuir metadados: tags, tecnologias, versões, grupos',
        paragraphs: [
          'No Structurizr, um elemento é descrito com as palavras-chave tags, technology, properties e perspectives. São textos livres, digitados elemento por elemento. Os archetypes fornecem valores padrão e os estilos se apoiam nas tags, mas não há um registro central que defina o que é uma tag ou uma tecnologia válida.',
          'Na prática, “PostgreSQL”, “Postgres” e “postgresql 16” podem coexistir em workspaces diferentes. Renomear uma tag exige um localizar-e-substituir em todos os repositórios envolvidos, e nada impede o uso de uma tecnologia que a organização já descontinuou.',
          'No MapleSpire, um objeto não guarda o texto de uma tag: guarda uma referência a uma tag definida uma única vez para a organização. As tecnologias vêm de um catálogo gerenciado, com aliases, ícones e ciclo de vida.',
        ],
        table: {
          caption: 'Como cada ferramenta atribui metadados',
          columns: ['Metadado', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Tags', 'Texto livre por elemento (tags "A,B"); estilos ligados ao texto da tag', 'Tags e grupos de tags definidos uma vez para a organização, referenciados por identificador'],
            ['Renomear ou mesclar uma tag', 'Localizar e substituir em cada workspace', 'Renomear, mudar a cor, mesclar ou arquivar: aplicado em todo lugar, em todas as paisagens'],
            ['Tecnologias', 'Texto livre (technology "Java")', 'Catálogo gerenciado: aliases, ícones claros e escuros, links de documentação'],
            ['Ciclo de vida de uma tecnologia', 'Não modelado', 'Ativa, obsoleta, descontinuada ou mesclada; novas entradas passam por aprovação'],
            ['Versão em uso', 'Você mesmo adiciona no texto ou em properties', 'Versão registrada em cada uso de uma tecnologia'],
            ['Grupos e domínios', 'Grupos visuais declarados na DSL', 'Grupos que podem levar tags e tecnologias; domínios hierárquicos'],
            ['Propriedades personalizadas', 'properties e perspectives (pares chave-valor livres)', 'Previstas no modelo, ainda não editáveis na interface'],
          ],
        },
      },
      {
        id: 'owners',
        title: 'E os responsáveis?',
        paragraphs: [
          'A responsabilidade por um elemento (qual time responde por ele) costuma ser o primeiro metadado exigido por um processo de governança. No Structurizr, ela vai para uma propriedade livre, como uma chave owner, sem ligação com um diretório de times.',
          'O MapleSpire já gerencia times para o controle de acesso, e o modelo prevê associar times responsáveis aos objetos. Essa atribuição ainda não está disponível na interface: preferimos dizer isso com clareza a prometer.',
        ],
      },
      {
        id: 'central-updates',
        title: 'Atualizar uma vez, para todos',
        paragraphs: [
          'Para uma visão corporativa, o Structurizr sugere uma abordagem em três etapas: reunir os sistemas de software em um catálogo DSL compartilhado por URL, fazer cada workspace de time estender esse catálogo e então gerar uma paisagem geral. Essa paisagem é produzida por um administrador que baixa todos os workspaces, roda o gerador e publica o resultado. É uma cópia: precisa ser gerada de novo para refletir as mudanças seguintes.',
          'No MapleSpire, tags e tecnologias ficam no banco de dados da organização. Uma alteração feita no console de administração aparece imediatamente em todas as paisagens, sem etapa de publicação. Dentro de uma paisagem, cada objeto existe uma única vez e cada diagrama faz referência a ele.',
          'Duas ressalvas, por precisão. No MapleSpire, o modelo detalhado continua restrito a cada paisagem; só os catálogos são compartilhados por toda a organização. E cada uso de uma tecnologia mantém a revisão do catálogo com que foi registrado, para que uma mudança no catálogo nunca reescreva o histórico silenciosamente.',
        ],
      },
      {
        id: 'access',
        title: 'Controle de acesso e revisão de mudanças',
        paragraphs: [
          'O núcleo de código aberto do Structurizr server não tem autenticação nem controle de acesso por papéis: os workspaces são públicos. Papéis, SAML, LDAP e a API de administração vêm com os binários pré-compilados licenciados. Sua grande força está em outro lugar: como o modelo é código, cada mudança pode passar por um pull request, uma revisão e uma validação automatizada na integração contínua.',
          'O código AGPL-3.0 do MapleSpire inclui papéis na organização, times com permissão de leitura ou escrita por paisagem, login único OIDC com Google ou Microsoft e um log de auditoria das ações administrativas. As mudanças são preparadas em rascunhos, com uma lista de alterações e um merge que detecta conflitos.',
          'Limite atual: os rascunhos do MapleSpire ainda não têm uma etapa formal de aprovação antes do merge. Se a sua governança exige revisão obrigatória de cada mudança, o fluxo de pull requests do Structurizr é hoje mais rigoroso.',
        ],
      },
      {
        id: 'scale',
        title: 'Qual escala melhor?',
        table: {
          caption: 'Como cada ferramenta escala, por critério',
          columns: ['Critério', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Vocabulário coerente entre times', 'Depende de disciplina e revisões', 'Garantido por catálogos únicos'],
            ['Pessoas que não são desenvolvedoras', 'Precisam aprender a DSL e o Git', 'Edição visual, multiusuário, em tempo real'],
            ['Visão geral atualizada', 'Paisagem gerada de novo sob demanda', 'Catálogos compartilhados ao vivo; modelo detalhado por paisagem'],
            ['Revisão obrigatória de mudanças', 'Pull requests e CI', 'Rascunhos e merge, ainda sem aprovação formal'],
            ['Controle de acesso e SSO', 'Binários licenciados', 'Incluídos no código aberto'],
            ['Alta disponibilidade', 'Depende do armazenamento e da licença escolhidos', 'Sincronização em uma única instância por enquanto'],
          ],
        },
        paragraphs: [
          'Se o seu desafio é fazer a organização inteira falar a mesma língua (as mesmas tags, tecnologias e versões) e trazer arquitetos, líderes de produto e times que não vivem no Git, o MapleSpire escala melhor para a governança.',
          'Se a sua arquitetura já é gerenciada como código, quem contribui são desenvolvedores e a governança passa pela revisão de pull requests, o Structurizr continua sendo uma excelente escolha.',
        ],
      },
      {
        id: 'migrate',
        title: 'Migrar ou usar os dois',
        paragraphs: [
          'O MapleSpire importa um workspace Structurizr DSL e gera os diagramas C4 correspondentes. Ele também exporta para Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG e Markdown, então você pode testar o MapleSpire em um workspace existente sem abrir mão dos seus arquivos.',
        ],
      },
      {
        id: 'sources',
        title: 'Fontes',
        paragraphs: [
          'As afirmações sobre o Structurizr se baseiam na documentação oficial, consultada em 12 de outubro de 2026. Os recursos do MapleSpire descritos aqui são os do código publicado.',
        ],
        links: localizedSources([
          'Structurizr DSL — referência da linguagem',
          'Structurizr — escopo de um workspace',
          'Structurizr — modelar uma empresa',
          'Structurizr — servidor',
          'Structurizr — comandos',
          'MapleSpire — código-fonte',
        ]),
      },
    ],
  },
  it: {
    title: 'MapleSpire o Structurizr: quale regge la governance di una grande azienda?',
    seoTitle: 'MapleSpire vs Structurizr: governance dell’architettura C4',
    description:
      'Cerchi un’alternativa a Structurizr? Come MapleSpire e Structurizr gestiscono tag, tecnologie, versioni, aggiornamenti centralizzati e controllo degli accessi su scala aziendale.',
    eyebrow: 'Confronto',
    updatedLabel: 'Aggiornato il',
    updatedDate: '12 ottobre 2026',
    isoDate: '2026-10-12',
    summary:
      'Structurizr e MapleSpire si basano entrambi sul modello C4 e su un vero modello, non su disegni. Divergono su una questione decisiva per una grande organizzazione: dove vivono i metadati condivisi e chi può tenerli aggiornati.',
    verdict:
      'Structurizr dà il meglio quando l’architettura è codice, scritto e revisionato in Git da team di ingegneria. MapleSpire punta a un repository governato: un unico insieme di cataloghi di tag e tecnologie per tutta l’organizzazione, modificabile visualmente da chiunque ne abbia il diritto.',
    contentsLabel: 'Indice',
    backLabel: 'Torna alla home',
    ctaTitle: 'Provalo con il tuo workspace.',
    ctaBody: 'Importa un file Structurizr DSL nella demo, oppure installa MapleSpire sui tuoi server partendo dal repository pubblico.',
    ctaPrimary: 'Prova la demo',
    ctaSecondary: 'Vedi il codice su GitHub',
    skipLabel: 'Vai al contenuto',
    sections: [
      {
        id: 'philosophies',
        title: 'Due filosofie di modellazione',
        paragraphs: [
          'Structurizr è uno strumento di “modelli come codice”: l’architettura si scrive in un DSL testuale, si versiona in Git e si pubblica su un server che genera i diagrammi. La documentazione consiglia un workspace per sistema software, affidato al team che lo costruisce.',
          'MapleSpire è un modello visuale condiviso: oggetti, relazioni e viste vivono in un database, si modificano insieme in tempo reale e restano disponibili offline. I cataloghi di tag e tecnologie sono entità dell’organizzazione, non testo copiato in ogni file.',
          'Nessuno dei due approcci è migliore in assoluto. La differenza emerge quando crescono il numero di team, di sistemi e di persone che contribuiscono.',
        ],
      },
      {
        id: 'metadata',
        title: 'Assegnare i metadati: tag, tecnologie, versioni, gruppi',
        paragraphs: [
          'In Structurizr un elemento si descrive con le parole chiave tags, technology, properties e perspectives. Sono stringhe libere, digitate elemento per elemento. Gli archetypes forniscono valori predefiniti e gli stili si agganciano ai tag, ma non esiste un registro centrale che definisca che cos’è un tag o una tecnologia valida.',
          'In pratica, “PostgreSQL”, “Postgres” e “postgresql 16” possono convivere in workspace diversi. Rinominare un tag significa fare un trova-e-sostituisci in tutti i repository coinvolti, e nulla impedisce di usare una tecnologia che l’organizzazione ha dismesso.',
          'In MapleSpire un oggetto non memorizza il testo di un tag: memorizza un riferimento a un tag definito una sola volta per l’organizzazione. Le tecnologie provengono da un catalogo gestito, con alias, icone e un ciclo di vita.',
        ],
        table: {
          caption: 'Come ogni strumento assegna i metadati',
          columns: ['Metadato', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Tag', 'Testo libero per elemento (tags "A,B"); stili legati al testo del tag', 'Tag e gruppi di tag definiti una volta per l’organizzazione, referenziati per identificativo'],
            ['Rinominare o unire un tag', 'Trova e sostituisci in ogni workspace', 'Rinomina, ricolora, unisci o archivia: applicato ovunque, in tutti i landscape'],
            ['Tecnologie', 'Testo libero (technology "Java")', 'Catalogo gestito: alias, icone chiare e scure, link alla documentazione'],
            ['Ciclo di vita di una tecnologia', 'Non modellato', 'Attiva, deprecata, dismessa o unita; le nuove voci passano per un’approvazione'],
            ['Versione in uso', 'Da aggiungere a mano nel testo o in properties', 'Versione registrata su ogni utilizzo di una tecnologia'],
            ['Gruppi e domini', 'Gruppi visuali dichiarati nel DSL', 'Gruppi che possono portare tag e tecnologie; domini gerarchici'],
            ['Proprietà personalizzate', 'properties e perspectives (coppie chiave-valore libere)', 'Previste nel modello, non ancora modificabili nell’interfaccia'],
          ],
        },
      },
      {
        id: 'owners',
        title: 'E i responsabili?',
        paragraphs: [
          'La titolarità di un elemento (quale team ne risponde) è spesso il primo metadato richiesto da un processo di governance. In Structurizr finisce in una proprietà libera, per esempio una chiave owner, senza alcun legame con un elenco dei team.',
          'MapleSpire gestisce già i team per il controllo degli accessi e il suo modello prevede di assegnare team responsabili agli oggetti. Questa assegnazione però non è ancora disponibile nell’interfaccia: preferiamo dirlo chiaramente piuttosto che prometterla.',
        ],
      },
      {
        id: 'central-updates',
        title: 'Aggiornare una volta, per tutti',
        paragraphs: [
          'Per una vista aziendale, Structurizr suggerisce un percorso in tre passi: riunire i sistemi software in un catalogo DSL condiviso tramite URL, far estendere quel catalogo a ogni workspace di team, poi generare un landscape complessivo. Quel landscape lo produce un amministratore che scarica tutti i workspace, esegue il generatore e pubblica il risultato. È una copia: va rigenerata per riflettere le modifiche successive.',
          'In MapleSpire tag e tecnologie vivono nel database dell’organizzazione. Una modifica fatta nella console di amministrazione è visibile subito in tutti i landscape, senza alcun passaggio di pubblicazione. All’interno di un landscape ogni oggetto esiste una sola volta e ogni diagramma vi fa riferimento.',
          'Due precisazioni, per correttezza. In MapleSpire il modello dettagliato resta circoscritto a ciascun landscape; solo i cataloghi sono condivisi in tutta l’organizzazione. Inoltre ogni utilizzo di una tecnologia conserva la revisione del catalogo con cui è stato registrato, così una modifica al catalogo non riscrive mai la storia in silenzio.',
        ],
      },
      {
        id: 'access',
        title: 'Controllo degli accessi e revisione delle modifiche',
        paragraphs: [
          'Il nucleo open source di Structurizr server non ha autenticazione né controllo degli accessi basato sui ruoli: i workspace sono pubblici. Ruoli, SAML, LDAP e l’API di amministrazione arrivano con i binari precompilati sotto licenza. La sua grande forza sta altrove: poiché il modello è codice, ogni modifica può passare da una pull request, una revisione e una validazione automatica in CI.',
          'Il codice AGPL-3.0 di MapleSpire include ruoli di organizzazione, team con permessi di lettura o scrittura per landscape, single sign-on OIDC con Google o Microsoft e un registro di audit delle azioni amministrative. Le modifiche si preparano in bozze, con un elenco delle modifiche e un merge che rileva i conflitti.',
          'Limite attuale: le bozze di MapleSpire non hanno ancora un passaggio formale di approvazione prima del merge. Se la tua governance richiede la revisione obbligatoria di ogni modifica, il flusso a pull request di Structurizr oggi è più rigoroso.',
        ],
      },
      {
        id: 'scale',
        title: 'Quale scala meglio?',
        table: {
          caption: 'Come scala ogni strumento, criterio per criterio',
          columns: ['Criterio', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Vocabolario coerente tra i team', 'Dipende da disciplina e revisioni', 'Garantito da cataloghi unici'],
            ['Persone che non sviluppano', 'Devono imparare il DSL e Git', 'Modifica visuale, multiutente, in tempo reale'],
            ['Quadro d’insieme aggiornato', 'Landscape rigenerato su richiesta', 'Cataloghi condivisi in tempo reale; modello dettagliato per landscape'],
            ['Revisione obbligatoria delle modifiche', 'Pull request e CI', 'Bozze e merge, per ora senza approvazione formale'],
            ['Controllo degli accessi e SSO', 'Binari sotto licenza', 'Inclusi nel codice open source'],
            ['Alta disponibilità', 'Dipende da archiviazione e licenza scelte', 'Per ora la sincronizzazione gira su una singola istanza'],
          ],
        },
        paragraphs: [
          'Se la tua sfida è far parlare a tutta l’organizzazione la stessa lingua (gli stessi tag, tecnologie e versioni) e coinvolgere architetti, responsabili di prodotto e team che non vivono in Git, MapleSpire scala meglio per la governance.',
          'Se la tua architettura è già gestita come codice, chi contribuisce sono sviluppatori e la governance passa dalla revisione delle pull request, Structurizr resta un’ottima scelta.',
        ],
      },
      {
        id: 'migrate',
        title: 'Migrare, o usarli entrambi',
        paragraphs: [
          'MapleSpire importa un workspace Structurizr DSL e genera i diagrammi C4 corrispondenti. Esporta anche verso Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG e Markdown, quindi puoi provare MapleSpire su un workspace esistente senza rinunciare ai tuoi file.',
        ],
      },
      {
        id: 'sources',
        title: 'Fonti',
        paragraphs: [
          'Le affermazioni su Structurizr si basano sulla sua documentazione ufficiale, consultata il 12 ottobre 2026. Le funzionalità di MapleSpire descritte qui sono quelle del codice pubblicato.',
        ],
        links: localizedSources([
          'Structurizr DSL — riferimento del linguaggio',
          'Structurizr — ambito di un workspace',
          'Structurizr — modellare un’azienda',
          'Structurizr — server',
          'Structurizr — comandi',
          'MapleSpire — codice sorgente',
        ]),
      },
    ],
  },
  de: {
    title: 'MapleSpire oder Structurizr: Welches Werkzeug trägt Governance im Unternehmensmaßstab?',
    seoTitle: 'MapleSpire vs. Structurizr: C4-Architektur-Governance im Vergleich',
    description:
      'Auf der Suche nach einer Alternative zu Structurizr? Wie MapleSpire und Structurizr Tags, Technologien, Versionen, zentrale Aktualisierungen und Zugriffskontrolle im Unternehmensmaßstab handhaben.',
    eyebrow: 'Vergleich',
    updatedLabel: 'Aktualisiert am',
    updatedDate: '12. Oktober 2026',
    isoDate: '2026-10-12',
    summary:
      'Structurizr und MapleSpire bauen beide auf dem C4-Modell auf und auf einem echten Modell statt auf Zeichnungen. Sie unterscheiden sich in einer Frage, die für eine große Organisation entscheidend ist: Wo liegen gemeinsame Metadaten, und wer kann sie aktuell halten?',
    verdict:
      'Structurizr glänzt, wenn Architektur Code ist, der von Engineering-Teams in Git geschrieben und geprüft wird. MapleSpire zielt auf ein verwaltetes Repository: ein einziger Satz von Tag- und Technologiekatalogen für die ganze Organisation, visuell bearbeitbar für alle, die die Berechtigung dazu haben.',
    contentsLabel: 'Inhalt',
    backLabel: 'Zur Startseite',
    ctaTitle: 'Probieren Sie es mit Ihrem eigenen Workspace aus.',
    ctaBody: 'Importieren Sie eine Structurizr-DSL-Datei in die Demo, oder hosten Sie MapleSpire selbst aus dem öffentlichen Repository.',
    ctaPrimary: 'Demo testen',
    ctaSecondary: 'Code auf GitHub ansehen',
    skipLabel: 'Zum Inhalt springen',
    sections: [
      {
        id: 'philosophies',
        title: 'Zwei Modellierungsphilosophien',
        paragraphs: [
          'Structurizr ist ein „Models as Code“-Werkzeug: Architektur wird in einer textuellen DSL geschrieben, in Git versioniert und auf einen Server übertragen, der die Diagramme erzeugt. Die Dokumentation empfiehlt einen Workspace pro Softwaresystem, verantwortet von dem Team, das es baut.',
          'MapleSpire ist ein gemeinsames visuelles Modell: Objekte, Beziehungen und Ansichten liegen in einer Datenbank, werden gemeinsam in Echtzeit bearbeitet und bleiben offline verfügbar. Tag- und Technologiekataloge sind Entitäten der Organisation, kein Text, der in jede Datei kopiert wird.',
          'Keiner der beiden Ansätze ist an sich besser. Der Unterschied zeigt sich, wenn die Zahl der Teams, Systeme und Beitragenden wächst.',
        ],
      },
      {
        id: 'metadata',
        title: 'Metadaten zuweisen: Tags, Technologien, Versionen, Gruppen',
        paragraphs: [
          'In Structurizr beschreibt man ein Element mit den Schlüsselwörtern tags, technology, properties und perspectives. Das sind freie Zeichenketten, Element für Element eingetippt. Archetypes liefern Standardwerte und Styles hängen an Tags, aber es gibt kein zentrales Verzeichnis, das festlegt, was ein gültiger Tag oder eine gültige Technologie ist.',
          'In der Praxis können „PostgreSQL“, „Postgres“ und „postgresql 16“ in verschiedenen Workspaces nebeneinander bestehen. Einen Tag umzubenennen heißt, in jedem betroffenen Repository zu suchen und zu ersetzen, und nichts hindert jemanden daran, eine Technologie zu verwenden, die die Organisation ausgemustert hat.',
          'In MapleSpire speichert ein Objekt nicht den Text eines Tags, sondern einen Verweis auf einen Tag, der einmal für die Organisation definiert ist. Technologien stammen aus einem gepflegten Katalog mit Aliasen, Icons und einem Lebenszyklus.',
        ],
        table: {
          caption: 'Wie jedes Werkzeug Metadaten zuweist',
          columns: ['Metadaten', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Tags', 'Freitext pro Element (tags "A,B"); Styles hängen am Tag-Text', 'Tags und Tag-Gruppen einmal für die Organisation definiert, per ID referenziert'],
            ['Tag umbenennen oder zusammenführen', 'Suchen und Ersetzen in jedem Workspace', 'Umbenennen, umfärben, zusammenführen oder archivieren: überall wirksam, in allen Landschaften'],
            ['Technologien', 'Freitext (technology "Java")', 'Gepflegter Katalog: Aliase, helle und dunkle Icons, Links zur Dokumentation'],
            ['Lebenszyklus einer Technologie', 'Nicht modelliert', 'Aktiv, veraltet, ausgemustert oder zusammengeführt; neue Einträge durchlaufen eine Freigabe'],
            ['Eingesetzte Version', 'Selbst im Text oder in properties ergänzen', 'Version bei jeder Verwendung einer Technologie erfasst'],
            ['Gruppen und Domänen', 'In der DSL deklarierte visuelle Gruppen', 'Gruppen, die Tags und Technologien tragen können; hierarchische Domänen'],
            ['Eigene Eigenschaften', 'properties und perspectives (freie Schlüssel-Wert-Paare)', 'Im Modell vorgesehen, in der Oberfläche noch nicht bearbeitbar'],
          ],
        },
      },
      {
        id: 'owners',
        title: 'Und die Verantwortlichen?',
        paragraphs: [
          'Die Zuständigkeit für ein Element – welches Team dafür geradesteht – ist oft das erste Metadatum, das ein Governance-Prozess verlangt. In Structurizr landet sie in einer freien Eigenschaft, etwa einem owner-Schlüssel, ohne Verbindung zu einem Teamverzeichnis.',
          'MapleSpire verwaltet Teams bereits für die Zugriffskontrolle, und sein Modell sieht vor, Objekten verantwortliche Teams zuzuordnen. Diese Zuordnung ist in der Oberfläche aber noch nicht verfügbar: Wir sagen das lieber offen, als es zu versprechen.',
        ],
      },
      {
        id: 'central-updates',
        title: 'Einmal aktualisieren, für alle',
        paragraphs: [
          'Für eine Unternehmenssicht schlägt Structurizr ein dreistufiges Vorgehen vor: Softwaresysteme in einem per URL geteilten DSL-Katalog sammeln, jeden Team-Workspace diesen Katalog erweitern lassen und dann eine Gesamtlandschaft erzeugen. Diese Landschaft erstellt ein Administrator, der alle Workspaces abruft, den Generator ausführt und das Ergebnis veröffentlicht. Sie ist eine Kopie: Für spätere Änderungen muss sie neu erzeugt werden.',
          'In MapleSpire liegen Tags und Technologien in der Datenbank der Organisation. Eine Änderung in der Administrationskonsole ist sofort in jeder Landschaft sichtbar, ohne Veröffentlichungsschritt. Innerhalb einer Landschaft existiert jedes Objekt genau einmal, und jedes Diagramm verweist darauf.',
          'Zwei Einschränkungen, der Genauigkeit halber. In MapleSpire bleibt das detaillierte Modell auf die jeweilige Landschaft beschränkt; nur die Kataloge werden organisationsweit geteilt. Außerdem behält jede Verwendung einer Technologie die Katalogrevision, mit der sie erfasst wurde, sodass eine Katalogänderung die Historie nie stillschweigend umschreibt.',
        ],
      },
      {
        id: 'access',
        title: 'Zugriffskontrolle und Prüfung von Änderungen',
        paragraphs: [
          'Der Open-Source-Kern von Structurizr server hat weder Authentifizierung noch rollenbasierte Zugriffskontrolle: Workspaces sind öffentlich. Rollen, SAML, LDAP und die Admin-API gibt es mit den lizenzierten, vorgefertigten Binärdateien. Seine große Stärke liegt woanders: Weil das Modell Code ist, kann jede Änderung einen Pull Request, ein Review und eine automatisierte Prüfung in der CI durchlaufen.',
          'Der AGPL-3.0-Code von MapleSpire enthält Organisationsrollen, Teams mit Lese- oder Schreibrechten pro Landschaft, OIDC-Single-Sign-on mit Google oder Microsoft und ein Audit-Log der Administrationsaktionen. Änderungen werden in Entwürfen vorbereitet, mit einer Änderungsliste und einem Merge, der Konflikte erkennt.',
          'Aktuelle Grenze: Entwürfe in MapleSpire haben noch keinen formalen Freigabeschritt vor dem Merge. Wenn Ihre Governance eine verpflichtende Prüfung jeder Änderung verlangt, ist der Pull-Request-Ablauf von Structurizr heute strenger.',
        ],
      },
      {
        id: 'scale',
        title: 'Welches skaliert besser?',
        table: {
          caption: 'Wie jedes Werkzeug skaliert, nach Kriterium',
          columns: ['Kriterium', 'Structurizr', 'MapleSpire'],
          rows: [
            ['Einheitliches Vokabular über Teams hinweg', 'Hängt von Disziplin und Reviews ab', 'Durch zentrale Kataloge sichergestellt'],
            ['Beitragende ohne Entwicklerhintergrund', 'Müssen die DSL und Git lernen', 'Visuelle Bearbeitung, mehrere Personen, in Echtzeit'],
            ['Aktuelles Gesamtbild', 'Landschaft wird bei Bedarf neu erzeugt', 'Live geteilte Kataloge; detailliertes Modell pro Landschaft'],
            ['Verpflichtende Prüfung von Änderungen', 'Pull Requests und CI', 'Entwürfe und Merge, noch ohne formale Freigabe'],
            ['Zugriffskontrolle und SSO', 'Lizenzierte Binärdateien', 'Im Open-Source-Code enthalten'],
            ['Hochverfügbarkeit', 'Hängt von gewähltem Speicher und Lizenz ab', 'Synchronisation läuft vorerst als einzelne Instanz'],
          ],
        },
        paragraphs: [
          'Wenn Ihre Herausforderung darin besteht, die ganze Organisation dieselbe Sprache sprechen zu lassen – dieselben Tags, Technologien und Versionen – und Architekten, Produktverantwortliche und Teams einzubinden, die nicht in Git zu Hause sind, skaliert MapleSpire für die Governance besser.',
          'Wenn Ihre Architektur bereits als Code verwaltet wird, die Beitragenden Entwickler sind und Governance über Pull-Request-Reviews läuft, bleibt Structurizr eine ausgezeichnete Wahl.',
        ],
      },
      {
        id: 'migrate',
        title: 'Migrieren oder beide parallel nutzen',
        paragraphs: [
          'MapleSpire importiert einen Structurizr-DSL-Workspace und erzeugt die passenden C4-Diagramme. Es exportiert außerdem nach Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG und Markdown, sodass Sie MapleSpire mit einem bestehenden Workspace ausprobieren können, ohne Ihre Dateien aufzugeben.',
        ],
      },
      {
        id: 'sources',
        title: 'Quellen',
        paragraphs: [
          'Die Aussagen zu Structurizr beruhen auf seiner offiziellen Dokumentation, abgerufen am 12. Oktober 2026. Die hier beschriebenen Funktionen von MapleSpire sind die des veröffentlichten Codes.',
        ],
        links: localizedSources([
          'Structurizr DSL — Sprachreferenz',
          'Structurizr — Umfang eines Workspace',
          'Structurizr — ein Unternehmen modellieren',
          'Structurizr — Server',
          'Structurizr — Befehle',
          'MapleSpire — Quellcode',
        ]),
      },
    ],
  },
  zh: {
    title: 'MapleSpire 与 Structurizr：哪一个更适合企业级治理？',
    seoTitle: 'MapleSpire 与 Structurizr：C4 架构治理对比',
    description:
      '在寻找 Structurizr 的替代方案？对比 MapleSpire 与 Structurizr 在企业规模下如何处理标签、技术、版本、集中更新与访问控制。',
    eyebrow: '对比',
    updatedLabel: '更新于',
    updatedDate: '2026年10月12日',
    isoDate: '2026-10-12',
    summary:
      'Structurizr 和 MapleSpire 都建立在 C4 模型之上，都是真正的模型，而不是图画。它们的分歧在于一个对大型组织至关重要的问题：共享元数据存放在哪里，以及谁能让它保持最新。',
    verdict:
      '当架构就是代码、由工程团队在 Git 中编写和评审时，Structurizr 表现出色。MapleSpire 的目标是一个受治理的知识库：整个组织只有一套标签和技术目录，凡有权限的人都能以可视化方式编辑。',
    contentsLabel: '目录',
    backLabel: '返回首页',
    ctaTitle: '用你自己的 workspace 试一试。',
    ctaBody: '将 Structurizr DSL 文件导入演示环境，或基于公开仓库自行托管 MapleSpire。',
    ctaPrimary: '试用演示',
    ctaSecondary: '在 GitHub 上查看代码',
    skipLabel: '跳到正文',
    sections: [
      {
        id: 'philosophies',
        title: '两种建模理念',
        paragraphs: [
          'Structurizr 是一款“模型即代码”工具：架构用文本 DSL 编写，在 Git 中进行版本管理，再推送到服务器生成图表。其文档建议每个软件系统一个 workspace，由构建该系统的团队负责。',
          'MapleSpire 是一个共享的可视化模型：对象、关系和视图保存在数据库中，可以多人实时协作编辑，离线时依然可用。标签和技术目录是组织级实体，而不是复制到每个文件里的文本。',
          '抽象地说，两种方式并无优劣之分。差异会在团队、系统和贡献者数量增长时显现出来。',
        ],
      },
      {
        id: 'metadata',
        title: '分配元数据：标签、技术、版本、分组',
        paragraphs: [
          '在 Structurizr 中，用 tags、technology、properties 和 perspectives 关键字描述元素。它们都是自由字符串，需要逐个元素输入。archetypes 提供默认值，样式挂接在标签上，但没有一个中央注册表来定义什么是有效的标签或技术。',
          '实际上，“PostgreSQL”“Postgres”和“postgresql 16”可能同时出现在不同的 workspace 中。重命名一个标签意味着要在所有相关仓库中查找替换，也没有任何机制阻止有人使用组织已经淘汰的技术。',
          '在 MapleSpire 中，对象不保存标签文本，而是保存对一个在组织层面只定义一次的标签的引用。技术来自受管理的目录，带有别名、图标和生命周期。',
        ],
        table: {
          caption: '两款工具如何分配元数据',
          columns: ['元数据', 'Structurizr', 'MapleSpire'],
          rows: [
            ['标签', '每个元素自由填写文本（tags "A,B"）；样式绑定到标签文本', '标签和标签组在组织层面定义一次，按 ID 引用'],
            ['重命名或合并标签', '在每个 workspace 中查找替换', '重命名、改色、合并或归档：处处生效，覆盖所有架构全景'],
            ['技术', '自由文本（technology "Java"）', '受管理的目录：别名、浅色和深色图标、文档链接'],
            ['技术生命周期', '未建模', '启用、弃用、淘汰或合并；新增条目需经审批'],
            ['所用版本', '需自行写进文本或 properties', '每次使用技术时都会记录所用版本'],
            ['分组与领域', '在 DSL 中声明的可视化分组', '可承载标签和技术的分组；层级化领域'],
            ['自定义属性', 'properties 和 perspectives（自由键值对）', '模型中已规划，界面中尚不可编辑'],
          ],
        },
      },
      {
        id: 'owners',
        title: '负责人呢？',
        paragraphs: [
          '归属关系（哪个团队对某个元素负责）往往是治理流程要求的第一项元数据。在 Structurizr 中，它只能写进一个自由属性，例如 owner 键，与团队目录没有任何关联。',
          'MapleSpire 已经为访问控制管理团队，其模型也计划为对象分配负责团队。不过这一分配功能尚未在界面中提供：与其许诺，我们更愿意如实说明。',
        ],
      },
      {
        id: 'central-updates',
        title: '更新一次，人人生效',
        paragraphs: [
          '对于企业视图，Structurizr 建议分三步走：把软件系统汇总到一个通过 URL 共享的 DSL 目录中，让每个团队的 workspace 扩展该目录，再生成整体架构全景。这个全景由管理员拉取所有 workspace、运行生成器并推送结果而得到。它是一份副本：后续变更需要重新生成才能体现。',
          '在 MapleSpire 中，标签和技术保存在组织的数据库里。在管理控制台中做出的修改会立即体现在所有架构全景中，无需发布步骤。在同一个架构全景内，每个对象只存在一次，每张图都引用它。',
          '为准确起见，有两点需要说明。在 MapleSpire 中，详细模型仍以每个架构全景为范围，只有目录在整个组织内共享。此外，每次技术使用都会保留录入时的目录版本，因此目录的修改绝不会悄悄改写历史。',
        ],
      },
      {
        id: 'access',
        title: '访问控制与变更评审',
        paragraphs: [
          'Structurizr server 的开源核心没有身份验证，也没有基于角色的访问控制：workspace 是公开的。角色、SAML、LDAP 和管理 API 随授权的预构建二进制文件提供。它的强项在别处：由于模型就是代码，每次变更都可以经过 pull request、评审以及 CI 中的自动校验。',
          'MapleSpire 的 AGPL-3.0 代码包含组织角色、按架构全景授予读写权限的团队、基于 Google 或 Microsoft 的 OIDC 单点登录，以及管理操作的审计日志。变更在草稿中准备，附带变更清单，并通过能检测冲突的合并完成。',
          '当前的限制：MapleSpire 的草稿在合并前还没有正式的审批步骤。如果你的治理要求每次变更都必须经过评审，那么目前 Structurizr 的 pull request 流程更严格。',
        ],
      },
      {
        id: 'scale',
        title: '哪一个扩展性更好？',
        table: {
          caption: '按标准比较两款工具的扩展性',
          columns: ['标准', 'Structurizr', 'MapleSpire'],
          rows: [
            ['跨团队术语一致', '取决于纪律和评审', '由唯一目录强制保证'],
            ['非开发人员参与', '需要学习 DSL 和 Git', '可视化、多人、实时编辑'],
            ['最新的全局视图', '按需重新生成全景', '实时共享目录；详细模型按架构全景划分'],
            ['强制变更评审', 'pull request 与 CI', '草稿与合并，暂无正式审批'],
            ['访问控制与 SSO', '授权二进制文件', '包含在开源代码中'],
            ['高可用', '取决于所选存储和许可证', '同步目前以单实例运行'],
          ],
        },
        paragraphs: [
          '如果你的挑战是让整个组织说同一种语言（相同的标签、技术和版本），并让架构师、产品负责人以及不常使用 Git 的团队参与进来，那么在治理层面 MapleSpire 的扩展性更好。',
          '如果你的架构已经以代码方式管理，贡献者都是开发人员，治理通过 pull request 评审进行，那么 Structurizr 依然是出色的选择。',
        ],
      },
      {
        id: 'migrate',
        title: '迁移，或两者并用',
        paragraphs: [
          'MapleSpire 可以导入 Structurizr DSL workspace 并生成相应的 C4 图表，也可以导出为 Structurizr DSL、Mermaid、JSON、CSV、SVG、PNG 和 Markdown。因此，你可以在现有 workspace 上试用 MapleSpire，而无需放弃原有文件。',
        ],
      },
      {
        id: 'sources',
        title: '资料来源',
        paragraphs: [
          '关于 Structurizr 的说明基于其官方文档，查阅于 2026年10月12日。本文所述的 MapleSpire 功能均来自已发布的代码。',
        ],
        links: localizedSources([
          'Structurizr DSL — 语言参考',
          'Structurizr — workspace 范围',
          'Structurizr — 企业建模',
          'Structurizr — 服务器',
          'Structurizr — 命令',
          'MapleSpire — 源代码',
        ]),
      },
    ],
  },
  ja: {
    title: 'MapleSpire と Structurizr：企業規模のガバナンスに耐えるのはどちらか',
    seoTitle: 'MapleSpire と Structurizr の比較：C4 アーキテクチャのガバナンス',
    description:
      'Structurizr の代替をお探しですか？MapleSpire と Structurizr が、タグ、テクノロジー、バージョン、一元的な更新、アクセス制御を企業規模でどう扱うかを比較します。',
    eyebrow: '比較',
    updatedLabel: '更新日',
    updatedDate: '2026年10月12日',
    isoDate: '2026-10-12',
    summary:
      'Structurizr と MapleSpire はどちらも C4 モデルに基づき、図ではなく本物のモデルを扱います。両者の違いは、大きな組織にとって決定的な問いにあります。共有メタデータはどこにあり、誰がそれを最新に保てるのか、という点です。',
    verdict:
      'アーキテクチャがコードであり、エンジニアリングチームが Git で書いてレビューする場合、Structurizr は真価を発揮します。MapleSpire が目指すのは統制されたリポジトリです。組織全体でタグとテクノロジーのカタログを一つにまとめ、権限を持つ人なら誰でもビジュアルに編集できます。',
    contentsLabel: '目次',
    backLabel: 'ホームに戻る',
    ctaTitle: 'お手持ちの workspace で試してみてください。',
    ctaBody: 'Structurizr DSL ファイルをデモにインポートするか、公開リポジトリから MapleSpire をセルフホストできます。',
    ctaPrimary: 'デモを試す',
    ctaSecondary: 'GitHub でコードを見る',
    skipLabel: '本文へスキップ',
    sections: [
      {
        id: 'philosophies',
        title: '二つのモデリング思想',
        paragraphs: [
          'Structurizr は「Models as Code」のツールです。アーキテクチャはテキストの DSL で書かれ、Git でバージョン管理され、図を生成するサーバーへ送られます。ドキュメントでは、ソフトウェアシステムごとに一つの workspace を、それを構築するチームが持つことを推奨しています。',
          'MapleSpire は共有のビジュアルモデルです。オブジェクト、リレーション、ビューはデータベースにあり、リアルタイムで共同編集でき、オフラインでも利用できます。タグとテクノロジーのカタログは組織レベルのエンティティであり、各ファイルにコピーされるテキストではありません。',
          'どちらのアプローチも、一般論として優れているわけではありません。違いが表れるのは、チーム、システム、コントリビューターの数が増えたときです。',
        ],
      },
      {
        id: 'metadata',
        title: 'メタデータの付与：タグ、テクノロジー、バージョン、グループ',
        paragraphs: [
          'Structurizr では、tags、technology、properties、perspectives というキーワードで要素を記述します。これらは要素ごとに入力する自由な文字列です。archetypes が既定値を与え、スタイルはタグに紐づきますが、有効なタグやテクノロジーを定義する中央のレジストリはありません。',
          '実際には「PostgreSQL」「Postgres」「postgresql 16」が別々の workspace に共存しえます。タグの名前を変えるには関係するすべてのリポジトリで検索と置換が必要で、組織が廃止したテクノロジーを誰かが使うことも止められません。',
          'MapleSpire では、オブジェクトはタグのテキストを保存しません。組織で一度だけ定義されたタグへの参照を保存します。テクノロジーは、エイリアス、アイコン、ライフサイクルを備えた管理カタログから選びます。',
        ],
        table: {
          caption: '各ツールのメタデータの付与方法',
          columns: ['メタデータ', 'Structurizr', 'MapleSpire'],
          rows: [
            ['タグ', '要素ごとの自由テキスト（tags "A,B"）。スタイルはタグのテキストに紐づく', 'タグとタググループを組織で一度だけ定義し、ID で参照'],
            ['タグの名前変更・統合', '各 workspace で検索と置換', '名前変更、色変更、統合、アーカイブ：すべてのランドスケープに一括で反映'],
            ['テクノロジー', '自由テキスト（technology "Java"）', '管理カタログ：エイリアス、ライト／ダーク用アイコン、ドキュメントへのリンク'],
            ['テクノロジーのライフサイクル', 'モデル化されない', '有効、非推奨、廃止、統合済み。新規追加は承認を経る'],
            ['使用バージョン', 'テキストや properties に自分で追記', 'テクノロジーの利用ごとにバージョンを記録'],
            ['グループとドメイン', 'DSL で宣言するビジュアルなグループ', 'タグとテクノロジーを持てるグループ、階層的なドメイン'],
            ['カスタムプロパティ', 'properties と perspectives（自由なキーと値の組）', 'モデルには組み込み予定、UI ではまだ編集不可'],
          ],
        },
      },
      {
        id: 'owners',
        title: '責任者はどうなるのか',
        paragraphs: [
          'オーナーシップ（どのチームがその要素に責任を持つか）は、ガバナンスのプロセスが最初に求めるメタデータであることがよくあります。Structurizr では owner キーのような自由なプロパティに書くことになり、チームのディレクトリとは結びつきません。',
          'MapleSpire はアクセス制御のためにすでにチームを管理しており、モデルにはオブジェクトに担当チームを割り当てる計画があります。ただし、この割り当てはまだ UI で提供していません。約束するより、はっきりそうお伝えします。',
        ],
      },
      {
        id: 'central-updates',
        title: '一度の更新で、全員に反映',
        paragraphs: [
          '企業全体のビューのために、Structurizr は三段階の方法を提案しています。ソフトウェアシステムを URL で共有する DSL カタログにまとめ、各チームの workspace でそのカタログを拡張し、全体のランドスケープを生成するというものです。このランドスケープは、管理者がすべての workspace を取得してジェネレーターを実行し、結果を公開して作ります。あくまでコピーなので、その後の変更を反映するには再生成が必要です。',
          'MapleSpire では、タグとテクノロジーは組織のデータベースにあります。管理コンソールで行った変更は、公開の手順なしに、すべてのランドスケープへ即座に反映されます。ランドスケープの中では各オブジェクトが一度だけ存在し、すべての図がそれを参照します。',
          '正確を期すために補足が二つあります。MapleSpire でも詳細なモデルはランドスケープごとに閉じており、組織全体で共有されるのはカタログだけです。また、テクノロジーの各利用は記録時のカタログのリビジョンを保持するため、カタログの変更が履歴を黙って書き換えることはありません。',
        ],
      },
      {
        id: 'access',
        title: 'アクセス制御と変更レビュー',
        paragraphs: [
          'Structurizr server のオープンソースのコアには、認証もロールベースのアクセス制御もありません。workspace は公開されます。ロール、SAML、LDAP、管理 API は、ライセンス付きのビルド済みバイナリに含まれます。その大きな強みは別のところにあります。モデルがコードなので、あらゆる変更をプルリクエスト、レビュー、CI での自動検証に通せるのです。',
          'MapleSpire の AGPL-3.0 のコードには、組織のロール、ランドスケープごとに読み取りまたは書き込み権限を持つチーム、Google または Microsoft による OIDC シングルサインオン、管理操作の監査ログが含まれます。変更はドラフトで準備し、変更一覧を確認したうえで、競合を検出するマージで取り込みます。',
          '現時点の制約：MapleSpire のドラフトには、マージ前の正式な承認ステップがまだありません。すべての変更に必須のレビューを求めるガバナンスであれば、現状では Structurizr のプルリクエストのフローの方が厳格です。',
        ],
      },
      {
        id: 'scale',
        title: 'どちらがスケールするか',
        table: {
          caption: '観点別に見た各ツールのスケーラビリティ',
          columns: ['観点', 'Structurizr', 'MapleSpire'],
          rows: [
            ['チーム間で一貫した語彙', '規律とレビュー次第', '単一のカタログで強制'],
            ['開発者以外のコントリビューター', 'DSL と Git の習得が必要', 'ビジュアル、複数人、リアルタイムの編集'],
            ['最新の全体像', 'ランドスケープを必要に応じて再生成', 'カタログはライブで共有、詳細モデルはランドスケープ単位'],
            ['変更レビューの必須化', 'プルリクエストと CI', 'ドラフトとマージ、正式な承認はまだない'],
            ['アクセス制御と SSO', 'ライセンス付きバイナリ', 'オープンソースのコードに含まれる'],
            ['高可用性', '選んだストレージとライセンス次第', '同期は当面シングルインスタンスで動作'],
          ],
        },
        paragraphs: [
          '組織全体に同じ言葉（同じタグ、テクノロジー、バージョン）を話させ、Git を日常的に使わないアーキテクト、プロダクト責任者、チームにも参加してもらうことが課題なら、ガバナンスの面では MapleSpire の方がスケールします。',
          'アーキテクチャがすでにコードとして管理され、コントリビューターが開発者で、ガバナンスがプルリクエストのレビューで回っているなら、Structurizr は今も優れた選択肢です。',
        ],
      },
      {
        id: 'migrate',
        title: '移行するか、併用するか',
        paragraphs: [
          'MapleSpire は Structurizr DSL の workspace をインポートし、対応する C4 図を生成します。Structurizr DSL、Mermaid、JSON、CSV、SVG、PNG、Markdown へのエクスポートにも対応しているため、手元のファイルを手放すことなく、既存の workspace で MapleSpire を試せます。',
        ],
      },
      {
        id: 'sources',
        title: '出典',
        paragraphs: [
          'Structurizr に関する記述は、2026年10月12日に参照した公式ドキュメントに基づいています。ここで説明している MapleSpire の機能は、公開されているコードのものです。',
        ],
        links: localizedSources([
          'Structurizr DSL — 言語リファレンス',
          'Structurizr — workspace のスコープ',
          'Structurizr — 企業全体のモデリング',
          'Structurizr — サーバー',
          'Structurizr — コマンド',
          'MapleSpire — ソースコード',
        ]),
      },
    ],
  },
  ko: {
    title: 'MapleSpire와 Structurizr: 엔터프라이즈 거버넌스에 더 잘 맞는 것은?',
    seoTitle: 'MapleSpire vs Structurizr: C4 아키텍처 거버넌스 비교',
    description:
      'Structurizr 대안을 찾고 계신가요? MapleSpire와 Structurizr가 엔터프라이즈 규모에서 태그, 기술, 버전, 중앙 업데이트, 접근 제어를 어떻게 다루는지 비교합니다.',
    eyebrow: '비교',
    updatedLabel: '업데이트',
    updatedDate: '2026년 10월 12일',
    isoDate: '2026-10-12',
    summary:
      'Structurizr와 MapleSpire는 모두 C4 모델을 바탕으로 하며, 그림이 아닌 실제 모델을 다룹니다. 둘은 큰 조직에서 결정적인 질문에서 갈립니다. 공유 메타데이터가 어디에 있고, 누가 그것을 최신 상태로 유지할 수 있는가 하는 질문입니다.',
    verdict:
      'Structurizr는 아키텍처가 코드이고 엔지니어링 팀이 Git에서 작성하고 리뷰할 때 빛을 발합니다. MapleSpire는 거버넌스가 적용된 저장소를 지향합니다. 조직 전체에 하나뿐인 태그·기술 카탈로그를 두고, 권한이 있는 사람이라면 누구나 시각적으로 편집할 수 있습니다.',
    contentsLabel: '목차',
    backLabel: '홈으로 돌아가기',
    ctaTitle: '여러분의 workspace로 직접 시험해 보세요.',
    ctaBody: 'Structurizr DSL 파일을 데모에 가져오거나, 공개 저장소에서 MapleSpire를 셀프 호스팅하세요.',
    ctaPrimary: '데모 체험하기',
    ctaSecondary: 'GitHub에서 코드 보기',
    skipLabel: '본문으로 건너뛰기',
    sections: [
      {
        id: 'philosophies',
        title: '두 가지 모델링 철학',
        paragraphs: [
          'Structurizr는 ‘모델을 코드로’ 다루는 도구입니다. 아키텍처를 텍스트 DSL로 작성해 Git에서 버전을 관리하고, 다이어그램을 렌더링하는 서버로 푸시합니다. 문서에서는 소프트웨어 시스템마다 하나의 workspace를 두고, 그 시스템을 만드는 팀이 소유하도록 권장합니다.',
          'MapleSpire는 공유되는 시각적 모델입니다. 객체, 관계, 뷰가 데이터베이스에 저장되고, 여러 사람이 실시간으로 함께 편집하며, 오프라인에서도 계속 사용할 수 있습니다. 태그와 기술 카탈로그는 모든 파일에 복사되는 텍스트가 아니라 조직 수준의 엔터티입니다.',
          '어느 쪽이 본질적으로 더 낫다고 할 수는 없습니다. 차이는 팀, 시스템, 기여자의 수가 늘어날 때 드러납니다.',
        ],
      },
      {
        id: 'metadata',
        title: '메타데이터 지정: 태그, 기술, 버전, 그룹',
        paragraphs: [
          'Structurizr에서는 tags, technology, properties, perspectives 키워드로 요소를 설명합니다. 이는 요소마다 직접 입력하는 자유 문자열입니다. archetypes가 기본값을 제공하고 스타일은 태그에 연결되지만, 유효한 태그나 기술이 무엇인지 정의하는 중앙 레지스트리는 없습니다.',
          '실제로는 ‘PostgreSQL’, ‘Postgres’, ‘postgresql 16’이 여러 workspace에 함께 존재할 수 있습니다. 태그 이름을 바꾸려면 관련된 모든 저장소에서 찾아 바꾸기를 해야 하고, 조직이 퇴출한 기술을 누군가 사용하는 것을 막을 방법도 없습니다.',
          'MapleSpire에서 객체는 태그의 텍스트가 아니라, 조직에서 한 번만 정의된 태그에 대한 참조를 저장합니다. 기술은 별칭, 아이콘, 수명 주기를 갖춘 관리형 카탈로그에서 가져옵니다.',
        ],
        table: {
          caption: '각 도구가 메타데이터를 지정하는 방식',
          columns: ['메타데이터', 'Structurizr', 'MapleSpire'],
          rows: [
            ['태그', '요소별 자유 텍스트(tags "A,B"), 스타일은 태그 텍스트에 연결', '태그와 태그 그룹을 조직에서 한 번 정의하고 ID로 참조'],
            ['태그 이름 변경 또는 병합', '모든 workspace에서 찾아 바꾸기', '이름 변경, 색상 변경, 병합, 보관: 모든 랜드스케이프에 일괄 적용'],
            ['기술', '자유 텍스트(technology "Java")', '관리형 카탈로그: 별칭, 라이트·다크 아이콘, 문서 링크'],
            ['기술 수명 주기', '모델링되지 않음', '활성, 지원 중단, 퇴출, 병합; 새 항목은 승인을 거침'],
            ['사용 중인 버전', '텍스트나 properties에 직접 추가', '기술을 사용할 때마다 버전을 기록'],
            ['그룹과 도메인', 'DSL에서 선언하는 시각적 그룹', '태그와 기술을 가질 수 있는 그룹, 계층형 도메인'],
            ['사용자 정의 속성', 'properties와 perspectives(자유로운 키-값 쌍)', '모델에 계획되어 있으나 아직 화면에서 편집 불가'],
          ],
        },
      },
      {
        id: 'owners',
        title: '담당자는 어떻게 하나요?',
        paragraphs: [
          '소유권, 즉 어떤 팀이 그 요소를 책임지는지는 거버넌스 프로세스가 가장 먼저 요구하는 메타데이터인 경우가 많습니다. Structurizr에서는 owner 키 같은 자유 속성에 기록하며, 팀 디렉터리와는 연결되지 않습니다.',
          'MapleSpire는 이미 접근 제어를 위해 팀을 관리하고 있으며, 모델에는 객체에 담당 팀을 지정하는 계획이 포함되어 있습니다. 다만 이 지정 기능은 아직 화면에서 제공되지 않습니다. 약속하기보다 솔직하게 말씀드리는 편을 택했습니다.',
        ],
      },
      {
        id: 'central-updates',
        title: '한 번 업데이트하면 모두에게',
        paragraphs: [
          '엔터프라이즈 뷰를 위해 Structurizr는 세 단계 방식을 제안합니다. 소프트웨어 시스템을 URL로 공유하는 DSL 카탈로그에 모으고, 각 팀의 workspace가 그 카탈로그를 확장하게 한 뒤, 전체 랜드스케이프를 생성하는 방식입니다. 이 랜드스케이프는 관리자가 모든 workspace를 가져와 생성기를 실행하고 결과를 푸시해 만듭니다. 사본이기 때문에 이후 변경 사항을 반영하려면 다시 생성해야 합니다.',
          'MapleSpire에서는 태그와 기술이 조직의 데이터베이스에 있습니다. 관리 콘솔에서 바꾼 내용은 별도의 게시 단계 없이 모든 랜드스케이프에 즉시 반영됩니다. 하나의 랜드스케이프 안에서 각 객체는 한 번만 존재하고, 모든 다이어그램이 그것을 참조합니다.',
          '정확성을 위해 두 가지를 덧붙입니다. MapleSpire에서도 상세 모델은 각 랜드스케이프 범위에 머물며, 조직 전체에서 공유되는 것은 카탈로그뿐입니다. 또한 기술을 사용할 때마다 기록 당시의 카탈로그 리비전이 보존되므로, 카탈로그를 바꿔도 이력이 조용히 다시 쓰이는 일은 없습니다.',
        ],
      },
      {
        id: 'access',
        title: '접근 제어와 변경 리뷰',
        paragraphs: [
          'Structurizr server의 오픈 소스 코어에는 인증도 역할 기반 접근 제어도 없어 workspace가 공개됩니다. 역할, SAML, LDAP, 관리 API는 라이선스가 필요한 사전 빌드 바이너리에 포함됩니다. 이 도구의 큰 강점은 다른 데 있습니다. 모델이 코드이므로 모든 변경이 풀 리퀘스트, 리뷰, CI 자동 검증을 거칠 수 있습니다.',
          'MapleSpire의 AGPL-3.0 코드에는 조직 역할, 랜드스케이프별 읽기·쓰기 권한을 가진 팀, Google 또는 Microsoft를 통한 OIDC 싱글 사인온, 관리 작업 감사 로그가 포함되어 있습니다. 변경은 초안에서 준비하고, 변경 목록을 검토한 뒤 충돌을 감지하는 병합으로 반영합니다.',
          '현재의 한계: MapleSpire 초안에는 아직 병합 전 공식 승인 단계가 없습니다. 거버넌스에서 모든 변경에 대한 필수 리뷰를 요구한다면, 지금은 Structurizr의 풀 리퀘스트 흐름이 더 엄격합니다.',
        ],
      },
      {
        id: 'scale',
        title: '어느 쪽이 더 잘 확장될까?',
        table: {
          caption: '기준별로 본 각 도구의 확장성',
          columns: ['기준', 'Structurizr', 'MapleSpire'],
          rows: [
            ['팀 간 일관된 용어', '규율과 리뷰에 달려 있음', '단일 카탈로그로 강제'],
            ['개발자가 아닌 기여자', 'DSL과 Git을 배워야 함', '시각적, 다중 사용자, 실시간 편집'],
            ['최신 상태의 전체 그림', '필요할 때 랜드스케이프 재생성', '실시간 공유 카탈로그, 상세 모델은 랜드스케이프 단위'],
            ['필수 변경 리뷰', '풀 리퀘스트와 CI', '초안과 병합, 아직 공식 승인 없음'],
            ['접근 제어와 SSO', '라이선스 바이너리', '오픈 소스 코드에 포함'],
            ['고가용성', '선택한 스토리지와 라이선스에 따라 다름', '동기화는 당분간 단일 인스턴스로 실행'],
          ],
        },
        paragraphs: [
          '조직 전체가 같은 언어(같은 태그, 기술, 버전)를 쓰게 하고, Git을 일상적으로 쓰지 않는 아키텍트, 제품 책임자, 팀까지 참여시키는 것이 과제라면 거버넌스 측면에서 MapleSpire가 더 잘 확장됩니다.',
          '아키텍처를 이미 코드로 관리하고, 기여자가 개발자이며, 거버넌스가 풀 리퀘스트 리뷰로 이루어진다면 Structurizr는 여전히 훌륭한 선택입니다.',
        ],
      },
      {
        id: 'migrate',
        title: '마이그레이션하거나 함께 쓰기',
        paragraphs: [
          'MapleSpire는 Structurizr DSL workspace를 가져와 그에 맞는 C4 다이어그램을 생성합니다. 또한 Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG, Markdown으로 내보낼 수 있어, 기존 파일을 포기하지 않고도 기존 workspace로 MapleSpire를 시험해 볼 수 있습니다.',
        ],
      },
      {
        id: 'sources',
        title: '출처',
        paragraphs: [
          'Structurizr에 관한 내용은 2026년 10월 12일에 확인한 공식 문서를 근거로 합니다. 여기서 설명한 MapleSpire 기능은 공개된 코드에 있는 기능입니다.',
        ],
        links: localizedSources([
          'Structurizr DSL — 언어 레퍼런스',
          'Structurizr — workspace 범위',
          'Structurizr — 엔터프라이즈 모델링',
          'Structurizr — 서버',
          'Structurizr — 명령어',
          'MapleSpire — 소스 코드',
        ]),
      },
    ],
  },
  hi: {
    title: 'MapleSpire या Structurizr: एंटरप्राइज़ गवर्नेंस के पैमाने पर कौन टिकता है?',
    seoTitle: 'MapleSpire बनाम Structurizr: C4 आर्किटेक्चर गवर्नेंस की तुलना',
    description:
      'Structurizr का विकल्प ढूँढ रहे हैं? जानिए MapleSpire और Structurizr एंटरप्राइज़ स्तर पर टैग, टेक्नोलॉजी, संस्करण, केंद्रीय अपडेट और एक्सेस कंट्रोल को कैसे संभालते हैं।',
    eyebrow: 'तुलना',
    updatedLabel: 'अपडेट किया गया',
    updatedDate: '12 अक्टूबर 2026',
    isoDate: '2026-10-12',
    summary:
      'Structurizr और MapleSpire दोनों C4 मॉडल पर आधारित हैं और चित्रों के बजाय एक वास्तविक मॉडल पर काम करते हैं। वे एक ऐसे प्रश्न पर अलग होते हैं जो बड़े संगठन के लिए बहुत मायने रखता है: साझा मेटाडेटा कहाँ रहता है, और उसे अद्यतन कौन रख सकता है।',
    verdict:
      'जब आर्किटेक्चर कोड हो और इंजीनियरिंग टीमें उसे Git में लिखें और समीक्षा करें, तब Structurizr सबसे अच्छा काम करता है। MapleSpire का लक्ष्य एक नियंत्रित रिपॉज़िटरी है: पूरे संगठन के लिए टैग और टेक्नोलॉजी का एक ही कैटलॉग, जिसे अनुमति वाला हर व्यक्ति विज़ुअल रूप से संपादित कर सकता है।',
    contentsLabel: 'विषय-सूची',
    backLabel: 'होम पर लौटें',
    ctaTitle: 'अपने ही workspace के साथ आज़माएँ।',
    ctaBody: 'डेमो में Structurizr DSL फ़ाइल आयात करें, या सार्वजनिक रिपॉज़िटरी से MapleSpire को सेल्फ-होस्ट करें।',
    ctaPrimary: 'डेमो आज़माएँ',
    ctaSecondary: 'GitHub पर कोड देखें',
    skipLabel: 'सामग्री पर जाएँ',
    sections: [
      {
        id: 'philosophies',
        title: 'मॉडलिंग के दो दर्शन',
        paragraphs: [
          'Structurizr एक “models as code” टूल है: आर्किटेक्चर एक टेक्स्ट DSL में लिखा जाता है, Git में संस्करणित होता है और ऐसे सर्वर पर भेजा जाता है जो आरेख बनाता है। इसका दस्तावेज़ हर सॉफ़्टवेयर सिस्टम के लिए एक workspace की सलाह देता है, जिसका स्वामित्व उसे बनाने वाली टीम के पास हो।',
          'MapleSpire एक साझा विज़ुअल मॉडल है: ऑब्जेक्ट, संबंध और व्यू एक डेटाबेस में रहते हैं, रीयल टाइम में मिलकर संपादित होते हैं और ऑफ़लाइन भी उपलब्ध रहते हैं। टैग और टेक्नोलॉजी कैटलॉग संगठन-स्तर की इकाइयाँ हैं, हर फ़ाइल में कॉपी किया गया टेक्स्ट नहीं।',
          'सैद्धांतिक रूप से कोई भी तरीका बेहतर नहीं है। अंतर तब दिखता है जब टीमों, सिस्टमों और योगदानकर्ताओं की संख्या बढ़ती है।',
        ],
      },
      {
        id: 'metadata',
        title: 'मेटाडेटा देना: टैग, टेक्नोलॉजी, संस्करण, समूह',
        paragraphs: [
          'Structurizr में किसी तत्व का वर्णन tags, technology, properties और perspectives कीवर्ड से किया जाता है। ये मुक्त स्ट्रिंग हैं, जो हर तत्व पर अलग-अलग टाइप की जाती हैं। archetypes डिफ़ॉल्ट मान देते हैं और स्टाइल टैग से जुड़ते हैं, लेकिन कोई केंद्रीय रजिस्ट्री नहीं है जो तय करे कि मान्य टैग या टेक्नोलॉजी क्या है।',
          'व्यवहार में “PostgreSQL”, “Postgres” और “postgresql 16” अलग-अलग workspace में साथ-साथ मौजूद रह सकते हैं। किसी टैग का नाम बदलने का मतलब है हर संबंधित रिपॉज़िटरी में खोजना-और-बदलना, और कोई चीज़ किसी को ऐसी टेक्नोलॉजी इस्तेमाल करने से नहीं रोकती जिसे संगठन बंद कर चुका है।',
          'MapleSpire में ऑब्जेक्ट टैग का टेक्स्ट नहीं रखता: वह संगठन के लिए एक बार परिभाषित टैग का संदर्भ रखता है। टेक्नोलॉजी एक प्रबंधित कैटलॉग से आती हैं, जिसमें उपनाम, आइकन और जीवनचक्र होते हैं।',
        ],
        table: {
          caption: 'हर टूल मेटाडेटा कैसे देता है',
          columns: ['मेटाडेटा', 'Structurizr', 'MapleSpire'],
          rows: [
            ['टैग', 'हर तत्व पर मुक्त टेक्स्ट (tags "A,B"); स्टाइल टैग के टेक्स्ट से बंधे', 'टैग और टैग समूह संगठन के लिए एक बार परिभाषित, ID से संदर्भित'],
            ['टैग का नाम बदलना या मर्ज करना', 'हर workspace में खोजें-और-बदलें', 'नाम बदलें, रंग बदलें, मर्ज या आर्काइव करें: हर लैंडस्केप में हर जगह लागू'],
            ['टेक्नोलॉजी', 'मुक्त टेक्स्ट (technology "Java")', 'प्रबंधित कैटलॉग: उपनाम, लाइट और डार्क आइकन, दस्तावेज़ लिंक'],
            ['टेक्नोलॉजी का जीवनचक्र', 'मॉडल नहीं किया जाता', 'सक्रिय, अप्रचलित, सेवानिवृत्त या मर्ज; नई प्रविष्टियाँ अनुमोदन से गुज़रती हैं'],
            ['प्रयुक्त संस्करण', 'टेक्स्ट या properties में ख़ुद जोड़ें', 'टेक्नोलॉजी के हर उपयोग पर संस्करण दर्ज'],
            ['समूह और डोमेन', 'DSL में घोषित विज़ुअल समूह', 'टैग और टेक्नोलॉजी रख सकने वाले समूह; पदानुक्रमित डोमेन'],
            ['कस्टम प्रॉपर्टी', 'properties और perspectives (मुक्त की-वैल्यू जोड़े)', 'मॉडल में नियोजित, इंटरफ़ेस में अभी संपादन योग्य नहीं'],
          ],
        },
      },
      {
        id: 'owners',
        title: 'और ज़िम्मेदार कौन?',
        paragraphs: [
          'स्वामित्व — कौन-सी टीम किसी तत्व के लिए जवाबदेह है — अक्सर वह पहला मेटाडेटा होता है जो गवर्नेंस प्रक्रिया माँगती है। Structurizr में यह एक मुक्त प्रॉपर्टी, जैसे owner कुंजी, में जाता है, जिसका किसी टीम निर्देशिका से कोई संबंध नहीं होता।',
          'MapleSpire एक्सेस कंट्रोल के लिए पहले से टीमों का प्रबंधन करता है, और इसका मॉडल ऑब्जेक्ट को ज़िम्मेदार टीमें सौंपने की योजना रखता है। यह असाइनमेंट अभी इंटरफ़ेस में उपलब्ध नहीं है: हम इसका वादा करने के बजाय साफ़-साफ़ बताना पसंद करते हैं।',
        ],
      },
      {
        id: 'central-updates',
        title: 'एक बार अपडेट करें, सबके लिए',
        paragraphs: [
          'एंटरप्राइज़ व्यू के लिए Structurizr तीन चरणों का तरीका सुझाता है: सॉफ़्टवेयर सिस्टमों को URL से साझा किए गए DSL कैटलॉग में इकट्ठा करें, हर टीम के workspace से उस कैटलॉग का विस्तार कराएँ, फिर एक समग्र लैंडस्केप बनाएँ। यह लैंडस्केप एक एडमिनिस्ट्रेटर बनाता है, जो सभी workspace खींचता है, जनरेटर चलाता है और परिणाम प्रकाशित करता है। यह एक प्रति है: बाद के बदलाव दिखाने के लिए इसे फिर से बनाना पड़ता है।',
          'MapleSpire में टैग और टेक्नोलॉजी संगठन के डेटाबेस में रहते हैं। एडमिन कंसोल में किया गया बदलाव बिना किसी प्रकाशन चरण के तुरंत हर लैंडस्केप में दिखता है। किसी लैंडस्केप के भीतर हर ऑब्जेक्ट एक ही बार मौजूद होता है और हर आरेख उसी का संदर्भ लेता है।',
          'सटीकता के लिए दो बातें। MapleSpire में विस्तृत मॉडल अब भी हर लैंडस्केप तक सीमित है; केवल कैटलॉग पूरे संगठन में साझा होते हैं। और टेक्नोलॉजी का हर उपयोग वह कैटलॉग संशोधन सँभालकर रखता है जिसके साथ वह दर्ज हुआ था, ताकि कैटलॉग में बदलाव कभी चुपचाप इतिहास न बदले।',
        ],
      },
      {
        id: 'access',
        title: 'एक्सेस कंट्रोल और बदलावों की समीक्षा',
        paragraphs: [
          'Structurizr server के ओपन सोर्स कोर में न ऑथेंटिकेशन है, न भूमिका-आधारित एक्सेस कंट्रोल: workspace सार्वजनिक होते हैं। भूमिकाएँ, SAML, LDAP और एडमिन API लाइसेंस वाले प्रीबिल्ट बाइनरी के साथ आते हैं। इसकी बड़ी ताक़त कहीं और है: क्योंकि मॉडल कोड है, हर बदलाव pull request, समीक्षा और CI में स्वचालित जाँच से गुज़र सकता है।',
          'MapleSpire के AGPL-3.0 कोड में संगठन भूमिकाएँ, हर लैंडस्केप के लिए पढ़ने या लिखने की अनुमति वाली टीमें, Google या Microsoft के साथ OIDC सिंगल साइन-ऑन और प्रशासनिक कार्रवाइयों का ऑडिट लॉग शामिल है। बदलाव ड्राफ़्ट में तैयार होते हैं, बदलावों की सूची के साथ, और ऐसे मर्ज से जुड़ते हैं जो टकराव पहचानता है।',
          'मौजूदा सीमा: MapleSpire के ड्राफ़्ट में मर्ज से पहले अभी कोई औपचारिक अनुमोदन चरण नहीं है। अगर आपकी गवर्नेंस हर बदलाव की अनिवार्य समीक्षा माँगती है, तो आज Structurizr का pull request प्रवाह ज़्यादा सख़्त है।',
        ],
      },
      {
        id: 'scale',
        title: 'कौन बेहतर तरीके से बढ़ता है?',
        table: {
          caption: 'हर मानदंड पर दोनों टूल कैसे बढ़ते हैं',
          columns: ['मानदंड', 'Structurizr', 'MapleSpire'],
          rows: [
            ['टीमों में एक-सी शब्दावली', 'अनुशासन और समीक्षा पर निर्भर', 'एकल कैटलॉग से लागू'],
            ['गैर-डेवलपर योगदानकर्ता', 'DSL और Git सीखना ज़रूरी', 'विज़ुअल, बहु-उपयोगकर्ता, रीयल-टाइम संपादन'],
            ['अद्यतन समग्र तस्वीर', 'ज़रूरत पड़ने पर लैंडस्केप फिर से बनाया जाता है', 'लाइव साझा कैटलॉग; विस्तृत मॉडल हर लैंडस्केप में'],
            ['बदलावों की अनिवार्य समीक्षा', 'pull request और CI', 'ड्राफ़्ट और मर्ज, अभी औपचारिक अनुमोदन नहीं'],
            ['एक्सेस कंट्रोल और SSO', 'लाइसेंस वाले बाइनरी', 'ओपन सोर्स कोड में शामिल'],
            ['उच्च उपलब्धता', 'चुने गए स्टोरेज और लाइसेंस पर निर्भर', 'सिंक फ़िलहाल एक ही इंस्टेंस पर चलता है'],
          ],
        },
        paragraphs: [
          'अगर आपकी चुनौती पूरे संगठन से एक ही भाषा बुलवाने की है — वही टैग, वही टेक्नोलॉजी, वही संस्करण — और ऐसे आर्किटेक्ट, प्रोडक्ट लीड और टीमों को जोड़ने की है जो Git में नहीं रहते, तो गवर्नेंस के लिए MapleSpire बेहतर तरीके से बढ़ता है।',
          'अगर आपका आर्किटेक्चर पहले से कोड के रूप में संभाला जाता है, योगदानकर्ता डेवलपर हैं और गवर्नेंस pull request समीक्षा से चलती है, तो Structurizr अब भी एक बेहतरीन विकल्प है।',
        ],
      },
      {
        id: 'migrate',
        title: 'माइग्रेट करें, या दोनों साथ चलाएँ',
        paragraphs: [
          'MapleSpire एक Structurizr DSL workspace आयात करता है और उससे मेल खाते C4 आरेख बनाता है। यह Structurizr DSL, Mermaid, JSON, CSV, SVG, PNG और Markdown में निर्यात भी करता है, इसलिए आप अपनी फ़ाइलें छोड़े बिना किसी मौजूदा workspace पर MapleSpire आज़मा सकते हैं।',
        ],
      },
      {
        id: 'sources',
        title: 'स्रोत',
        paragraphs: [
          'Structurizr से जुड़े कथन उसके आधिकारिक दस्तावेज़ों पर आधारित हैं, जिन्हें 12 अक्टूबर 2026 को देखा गया। यहाँ बताई गई MapleSpire की सुविधाएँ प्रकाशित कोड में मौजूद सुविधाएँ हैं।',
        ],
        links: localizedSources([
          'Structurizr DSL — भाषा संदर्भ',
          'Structurizr — workspace का दायरा',
          'Structurizr — एंटरप्राइज़ मॉडलिंग',
          'Structurizr — सर्वर',
          'Structurizr — कमांड',
          'MapleSpire — सोर्स कोड',
        ]),
      },
    ],
  },
  ar: {
    title: 'MapleSpire أم Structurizr: أيّهما يواكب الحوكمة على مستوى المؤسسات؟',
    seoTitle: 'MapleSpire مقابل Structurizr: مقارنة حوكمة البنية المعمارية وفق C4',
    description:
      'تبحث عن بديل لـ Structurizr؟ كيف يتعامل MapleSpire وStructurizr مع الوسوم والتقنيات والإصدارات والتحديثات المركزية والتحكم في الوصول على مستوى المؤسسات.',
    eyebrow: 'مقارنة',
    updatedLabel: 'آخر تحديث',
    updatedDate: '12 أكتوبر 2026',
    isoDate: '2026-10-12',
    summary:
      'يعتمد كلٌّ من Structurizr وMapleSpire على نموذج C4 وعلى نموذج حقيقي لا على رسومات. لكنهما يختلفان في مسألة حاسمة لأي مؤسسة كبيرة: أين توجد البيانات الوصفية المشتركة، ومن يستطيع إبقاءها محدّثة.',
    verdict:
      'يتألق Structurizr حين تكون البنية المعمارية شيفرةً تكتبها فرق الهندسة وتراجعها في Git. أما MapleSpire فيستهدف مستودعًا خاضعًا للحوكمة: مجموعة واحدة من كتالوجات الوسوم والتقنيات للمؤسسة بأكملها، يحرّرها مرئيًا كل من يملك الصلاحية.',
    contentsLabel: 'المحتويات',
    backLabel: 'العودة إلى الرئيسية',
    ctaTitle: 'جرّبه على مساحة عملك الخاصة.',
    ctaBody: 'استورد ملف Structurizr DSL إلى العرض التجريبي، أو استضف MapleSpire بنفسك انطلاقًا من المستودع العام.',
    ctaPrimary: 'جرّب العرض التجريبي',
    ctaSecondary: 'عرض الشيفرة على GitHub',
    skipLabel: 'الانتقال إلى المحتوى',
    sections: [
      {
        id: 'philosophies',
        title: 'فلسفتان في النمذجة',
        paragraphs: [
          'Structurizr أداة من نوع «النماذج ككود»: تُكتب البنية المعمارية بلغة DSL نصية، وتُدار نسخها في Git، وتُرسَل إلى خادم يولّد المخططات. وتوصي وثائقه بمساحة عمل (workspace) واحدة لكل نظام برمجي، يملكها الفريق الذي يبنيه.',
          'أما MapleSpire فنموذج مرئي مشترك: تعيش العناصر والعلاقات والعروض في قاعدة بيانات، ويُحرَّر بشكل جماعي في الوقت الفعلي، ويبقى متاحًا دون اتصال. وكتالوجات الوسوم والتقنيات كيانات على مستوى المؤسسة، لا نص يُنسخ في كل ملف.',
          'لا يتفوّق أيّ من النهجين على الآخر بالمطلق. يظهر الفرق حين يزداد عدد الفرق والأنظمة والمساهمين.',
        ],
      },
      {
        id: 'metadata',
        title: 'إسناد البيانات الوصفية: الوسوم والتقنيات والإصدارات والمجموعات',
        paragraphs: [
          'في Structurizr يُوصَف العنصر بالكلمات المفتاحية tags وtechnology وproperties وperspectives. وهي نصوص حرة تُكتب عنصرًا عنصرًا. توفّر archetypes قيمًا افتراضية وترتبط الأنماط بالوسوم، لكن لا يوجد سجل مركزي يحدّد ما هو الوسم أو التقنية الصالحة.',
          'عمليًا، قد تتعايش «PostgreSQL» و«Postgres» و«postgresql 16» في مساحات عمل مختلفة. وإعادة تسمية وسم تعني البحث والاستبدال في كل المستودعات المعنية، ولا شيء يمنع أحدًا من استخدام تقنية أوقفتها المؤسسة.',
          'في MapleSpire لا يخزّن العنصر نص الوسم، بل مرجعًا إلى وسم مُعرَّف مرة واحدة للمؤسسة. وتأتي التقنيات من كتالوج مُدار يتضمن أسماء بديلة وأيقونات ودورة حياة.',
        ],
        table: {
          caption: 'كيف تُسند كل أداة البيانات الوصفية',
          columns: ['البيانات الوصفية', 'Structurizr', 'MapleSpire'],
          rows: [
            ['الوسوم', 'نص حر لكل عنصر (tags «A,B»)؛ الأنماط مرتبطة بنص الوسم', 'وسوم ومجموعات وسوم تُعرَّف مرة واحدة للمؤسسة ويُشار إليها بمعرّف'],
            ['إعادة تسمية وسم أو دمجه', 'بحث واستبدال في كل مساحة عمل', 'إعادة تسمية أو تغيير لون أو دمج أو أرشفة: تُطبَّق في كل مكان وفي جميع المشاهد المعمارية'],
            ['التقنيات', 'نص حر (technology «Java»)', 'كتالوج مُدار: أسماء بديلة وأيقونات فاتحة وداكنة وروابط إلى الوثائق'],
            ['دورة حياة التقنية', 'غير منمذجة', 'نشطة أو متقادمة أو متوقفة أو مدمجة؛ والإدخالات الجديدة تمر بالموافقة'],
            ['الإصدار المستخدم', 'تضيفه بنفسك في النص أو في properties', 'يُسجَّل الإصدار عند كل استخدام لتقنية'],
            ['المجموعات والنطاقات', 'مجموعات مرئية تُعلَن في DSL', 'مجموعات يمكن أن تحمل وسومًا وتقنيات؛ ونطاقات هرمية'],
            ['خصائص مخصّصة', 'properties وperspectives (أزواج مفتاح وقيمة حرة)', 'مخطَّط لها في النموذج، ولا يمكن تحريرها في الواجهة بعد'],
          ],
        },
      },
      {
        id: 'owners',
        title: 'وماذا عن المسؤولين؟',
        paragraphs: [
          'الملكية — أي الفريق المسؤول عن العنصر — كثيرًا ما تكون أول بيانات وصفية تطلبها عملية الحوكمة. في Structurizr تُكتب في خاصية حرة مثل المفتاح owner، دون أي صلة بدليل للفرق.',
          'يدير MapleSpire الفرق أصلًا لأغراض التحكم في الوصول، ويتضمن نموذجه خطة لإسناد فرق مسؤولة إلى العناصر. غير أن هذا الإسناد غير متاح في الواجهة بعد: ونفضّل قول ذلك بوضوح على أن نَعِد به.',
        ],
      },
      {
        id: 'central-updates',
        title: 'حدّث مرة واحدة، للجميع',
        paragraphs: [
          'للحصول على رؤية على مستوى المؤسسة، يقترح Structurizr نهجًا من ثلاث خطوات: جمع الأنظمة البرمجية في كتالوج DSL مشترك عبر رابط URL، وجعل مساحة عمل كل فريق توسّع هذا الكتالوج، ثم توليد مشهد معماري شامل. يُنتج هذا المشهدَ مسؤولٌ يسحب جميع مساحات العمل ويشغّل المولّد وينشر النتيجة. إنه نسخة: يجب إعادة توليدها لتعكس التغييرات اللاحقة.',
          'في MapleSpire تعيش الوسوم والتقنيات في قاعدة بيانات المؤسسة. ويظهر أي تعديل في لوحة الإدارة فورًا في جميع المشاهد المعمارية، دون أي خطوة نشر. وداخل المشهد المعماري الواحد، يوجد كل عنصر مرة واحدة فقط ويشير إليه كل مخطط.',
          'ملاحظتان توخيًا للدقة. في MapleSpire يبقى النموذج التفصيلي محصورًا في كل مشهد معماري، ولا يُشارَك على مستوى المؤسسة إلا الكتالوجات. كما يحتفظ كل استخدام لتقنية بمراجعة الكتالوج التي سُجّل بها، فلا يعيد أي تعديل على الكتالوج كتابة التاريخ بصمت.',
        ],
      },
      {
        id: 'access',
        title: 'التحكم في الوصول ومراجعة التغييرات',
        paragraphs: [
          'لا تتضمن النواة مفتوحة المصدر لـ Structurizr server مصادقةً ولا تحكمًا في الوصول قائمًا على الأدوار: مساحات العمل فيها عامة. أما الأدوار وSAML وLDAP وواجهة الإدارة البرمجية فتأتي مع الملفات التنفيذية الجاهزة المرخّصة. وقوّته الكبرى في مكان آخر: لأن النموذج شيفرة، يمكن أن يمر كل تغيير عبر طلب سحب (pull request) ومراجعة وتحقق آلي في التكامل المستمر.',
          'تتضمن شيفرة MapleSpire المرخّصة بـ AGPL-3.0 أدوارًا على مستوى المؤسسة، وفرقًا بصلاحيات قراءة أو كتابة لكل مشهد معماري، وتسجيل دخول موحّدًا عبر OIDC مع Google أو Microsoft، وسجل تدقيق للإجراءات الإدارية. وتُحضَّر التغييرات في مسودات، مع قائمة بالتغييرات ودمج يكشف التعارضات.',
          'القيد الحالي: لا تتضمن مسودات MapleSpire بعدُ خطوة موافقة رسمية قبل الدمج. فإذا كانت حوكمتك تشترط مراجعة إلزامية لكل تغيير، فإن مسار طلبات السحب في Structurizr أكثر صرامة اليوم.',
        ],
      },
      {
        id: 'scale',
        title: 'أيّهما يتوسّع بشكل أفضل؟',
        table: {
          caption: 'كيف تتوسّع كل أداة، بحسب المعيار',
          columns: ['المعيار', 'Structurizr', 'MapleSpire'],
          rows: [
            ['مفردات متّسقة بين الفرق', 'يعتمد على الانضباط والمراجعات', 'مفروضة عبر كتالوجات موحّدة'],
            ['مساهمون من غير المطوّرين', 'عليهم تعلّم DSL وGit', 'تحرير مرئي متعدد المستخدمين في الوقت الفعلي'],
            ['صورة شاملة محدّثة', 'يُعاد توليد المشهد عند الطلب', 'كتالوجات مشتركة مباشرة؛ ونموذج تفصيلي لكل مشهد'],
            ['مراجعة إلزامية للتغييرات', 'طلبات السحب والتكامل المستمر', 'مسودات ودمج، دون موافقة رسمية حتى الآن'],
            ['التحكم في الوصول وSSO', 'ملفات تنفيذية مرخّصة', 'مضمَّنة في الشيفرة مفتوحة المصدر'],
            ['التوافر العالي', 'يعتمد على التخزين والترخيص المختارين', 'تعمل المزامنة حاليًا كنسخة واحدة'],
          ],
        },
        paragraphs: [
          'إذا كان تحدّيك أن تتحدث المؤسسة كلها اللغة نفسها — الوسوم نفسها والتقنيات نفسها والإصدارات نفسها — وأن تُشرك المهندسين المعماريين ومسؤولي المنتجات والفرق التي لا تعمل في Git، فإن MapleSpire يتوسّع بشكل أفضل لأغراض الحوكمة.',
          'أما إذا كانت بنيتك المعمارية تُدار أصلًا ككود، والمساهمون مطوّرون، والحوكمة تمر عبر مراجعة طلبات السحب، فإن Structurizr يبقى خيارًا ممتازًا.',
        ],
      },
      {
        id: 'migrate',
        title: 'الانتقال، أو استخدام الأداتين معًا',
        paragraphs: [
          'يستورد MapleSpire مساحة عمل Structurizr DSL وينشئ مخططات C4 المقابلة لها. كما يصدّر إلى Structurizr DSL وMermaid وJSON وCSV وSVG وPNG وMarkdown، لذا يمكنك تجربة MapleSpire على مساحة عمل قائمة دون التخلي عن ملفاتك.',
        ],
      },
      {
        id: 'sources',
        title: 'المصادر',
        paragraphs: [
          'تستند المعلومات عن Structurizr إلى وثائقه الرسمية، التي جرى الاطلاع عليها في 12 أكتوبر 2026. وميزات MapleSpire الموصوفة هنا هي تلك الموجودة في الشيفرة المنشورة.',
        ],
        links: localizedSources([
          'Structurizr DSL — مرجع اللغة',
          'Structurizr — نطاق مساحة العمل',
          'Structurizr — نمذجة مؤسسة',
          'Structurizr — الخادم',
          'Structurizr — الأوامر',
          'MapleSpire — الشيفرة المصدرية',
        ]),
      },
    ],
  },
};
