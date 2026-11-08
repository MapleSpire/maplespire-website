import type { ArticleDocument, ArticleLocale } from './articles';

/**
 * Spotlight, the global search (⌘K): a feature presentation with its video, in every
 * site locale. Text between backticks is a key, shortcut or filter: it is rendered as
 * left-to-right code and stays literal in every language. In Arabic, a bare ⌘K sits in a
 * left-to-right isolate (\u2066…\u2069) so it does not read "K⌘".
 */
export const spotlightArticle: Record<ArticleLocale, ArticleDocument> = {
  fr: {
    title: 'Spotlight : trouvez tout dans votre architecture avec ⌘K',
    seoTitle: 'Spotlight : la recherche globale de votre architecture C4 | MapleSpire',
    description:
      'Spotlight est la recherche globale de MapleSpire : ⌘K retrouve n’importe quel objet, diagramme, flux, décision d’architecture ou action de votre workspace, avec des filtres et une navigation au clavier.',
    eyebrow: 'Nouveauté',
    updatedLabel: 'Publié le',
    updatedDate: '8 novembre 2026',
    isoDate: '2026-11-08',
    summary:
      'Où était ce service, déjà? Dans une grande architecture, la réponse se cache dans l’un des dizaines de diagrammes, flux et décisions d’architecture. Spotlight, la nouvelle recherche globale de MapleSpire, la retrouve de partout : ⌘K, quelques lettres, et vous y êtes.',
    verdict:
      'En bref : un raccourci et une seule zone de recherche pour les objets du modèle, les groupes, les diagrammes, les flux, les décisions d’architecture, les connexions et les commandes. Elle tolère accents et fautes de frappe, ses filtres se lisent comme du langage courant, et elle couvre tout le workspace.',
    contentsLabel: 'Sommaire',
    backLabel: 'Retour à l’accueil',
    ctaTitle: 'Appuyez sur ⌘K dans votre propre workspace.',
    ctaBody:
      'MapleSpire est gratuit et open source (AGPL-3.0). Ouvrez l’application pour essayer Spotlight, ou auto-hébergez MapleSpire à partir du dépôt public.',
    ctaPrimary: 'Ouvrir l’application',
    ctaSecondary: 'Voir le code sur GitHub',
    skipLabel: 'Passer au contenu',
    video: {
      set: 'spotlight',
      id: 'video',
      title: 'Spotlight en 71 secondes',
      body: 'La vidéo montre l’ouverture de Spotlight, la recherche tolérante et les filtres, les portées et les actions au clavier.',
      play: 'Lire la vidéo',
      watchOnYoutube: 'Voir sur YouTube',
      otherLanguage: 'English version',
      captionsNote: 'Vidéo sans narration, avec les textes à l’écran en français.',
    },
    sections: [
      {
        id: 'ouvrir',
        title: 'Ouvrir Spotlight de partout avec ⌘K',
        paragraphs: [
          'Appuyez sur `⌘K` (`Ctrl K` sous Windows et Linux) où que vous soyez dans MapleSpire, ou cliquez sur l’icône de recherche de la barre d’outils flottante. Pas besoin de savoir dans quel diagramme ou quelle liste se trouve ce que vous cherchez.',
        ],
      },
      {
        id: 'tout-chercher',
        title: 'Une seule recherche pour tout, avec un aperçu',
        paragraphs: [
          'Une même requête couvre les objets du modèle (systèmes, applications, stockages, composants et acteurs), les groupes, les diagrammes, les flux, les décisions d’architecture (ADR), les connexions et les actions. Les résultats sont regroupés par type, avec un meilleur résultat en tête.',
          'Le classement suit ce que vous tapez : d’abord le nom exact, puis les noms qui commencent par votre texte, puis ceux dont un mot commence par lui, et enfin ceux qui le contiennent.',
          'Un panneau d’aperçu affiche le résultat actif et ses champs — technologie, portée, statut, domaine, étiquettes, diagrammes où il apparaît… — pour vérifier que c’est le bon avant de l’ouvrir.',
        ],
      },
      {
        id: 'tolerante',
        title: 'Une recherche qui pardonne',
        bullets: [
          'Les accents et la casse ne comptent pas : `energie` trouve « Énergie ».',
          'Pendant la frappe, Spotlight complète le meilleur résultat en texte fantôme; `→` l’accepte.',
          'Une clé de filtre mal tapée propose « Vouliez-vous dire » : `tga:` suggère `tag:`.',
        ],
      },
      {
        id: 'filtres',
        title: 'Des filtres qui se lisent comme du langage courant',
        lead:
          'Tapez une clé de filtre suivie d’une valeur pour resserrer les résultats. Pendant la saisie, Spotlight propose des valeurs (étiquettes, technologies, types…) et `↵` ajoute la valeur suggérée.',
        table: {
          caption: 'Exemples de filtres',
          columns: ['Filtre', 'Exemple', 'Ce qu’il garde'],
          rows: [
            ['Type', '`kind:store`', 'Un seul type de résultat, ici les stockages de données'],
            ['Étiquette', '`tag:pii`', 'Les objets qui portent cette étiquette'],
            ['Technologie', '`tech:kafka`', 'Les objets qui utilisent cette technologie'],
            ['Statut, portée, domaine', '`status:` `scope:` `domain:`', 'Les objets selon la valeur de ce champ'],
            ['Diagramme', '`in:"Payments"`', 'Les objets placés sur ce diagramme'],
            ['Phrase exacte', '`"outage detection"`', 'Cette phrase, mot pour mot'],
            ['Exclusion', '`-legacy` · `NOT legacy`', 'Retire les résultats qui correspondent'],
            ['Alternative', '`kafka OR rabbitmq`', 'Les résultats qui correspondent à l’un ou l’autre'],
            ['Liste', '`tag:pii,gdpr`', 'Plusieurs valeurs pour un même filtre'],
          ],
        },
        paragraphs: [
          'Les filtres se combinent entre eux et avec des mots : `kind:store tag:pii` liste les stockages étiquetés pii. `has:`, `from:` et `to:` complètent la liste, et les clés françaises fonctionnent aussi (`genre:`, `etiquette:`, `statut:`…).',
        ],
      },
      {
        id: 'portees',
        title: 'Portées, astuces et navigation vers un résultat',
        bullets: [
          '`Tab` passe d’une portée à l’autre — Diagrammes, Objets, Décisions, Actions — et `⌘1` à `⌘4` en choisit une directement.',
          '`?` affiche les dix astuces de recherche.',
          '`↵` ouvre l’objet choisi sur le diagramme qui le place, déjà sélectionné.',
          '`⌘↵` le révèle plutôt dans Objets du modèle ou Connexions du modèle, ou ouvre un diagramme dans un nouvel onglet.',
          'Un champ vide affiche vos éléments récents, et votre requête est conservée quand vous refermez Spotlight.',
        ],
      },
      {
        id: 'actions',
        title: 'Des actions au clavier',
        paragraphs: [
          'Spotlight est aussi une palette de commandes. Sans quitter le clavier, ouvrez tous les diagrammes, les objets du modèle, les connexions du modèle, les dépendances, le visualiseur de modèle, les décisions d’architecture ou les brouillons; créez un diagramme; basculez entre 2D et 3D; ouvrez l’historique; partagez; passez au thème sombre ou clair; ou ouvrez les paramètres.',
        ],
      },
      {
        id: 'echelle',
        title: 'Tout le workspace, même très grand',
        paragraphs: [
          'Dans un grand workspace, votre navigateur ne détient parfois qu’une partie du modèle. Spotlight interroge alors aussi le modèle de lecture du serveur et fusionne sa réponse avec les résultats locaux : la recherche couvre tout le workspace, avec le même classement.',
          'Si le serveur ne peut pas répondre, Spotlight vous le dit : il indique que les résultats sont partiels plutôt que de les présenter comme complets.',
        ],
      },
    ],
  },
  en: {
    title: 'Spotlight: find anything in your architecture with ⌘K',
    seoTitle: 'Spotlight: global search for your C4 architecture | MapleSpire',
    description:
      'Spotlight is MapleSpire’s global search: press ⌘K to find any object, diagram, flow, decision record or action in your workspace, with filters and keyboard navigation.',
    eyebrow: 'New feature',
    updatedLabel: 'Published',
    updatedDate: 'November 8, 2026',
    isoDate: '2026-11-08',
    summary:
      'Where was that service again? In a large architecture, the answer hides in one of dozens of diagrams, flows and decision records. Spotlight, MapleSpire’s new global search, finds it from anywhere: press ⌘K, type a few letters, and you are there.',
    verdict:
      'In short: one shortcut and one search box for model objects, groups, diagrams, flows, decision records, connections and commands. It forgives accents and typos, its filters read like plain language, and it covers the whole workspace.',
    contentsLabel: 'Contents',
    backLabel: 'Back to home',
    ctaTitle: 'Press ⌘K in your own workspace.',
    ctaBody:
      'MapleSpire is free and open source (AGPL-3.0). Open the app to try Spotlight, or self-host MapleSpire from the public repository.',
    ctaPrimary: 'Open the app',
    ctaSecondary: 'View the code on GitHub',
    skipLabel: 'Skip to content',
    video: {
      set: 'spotlight',
      id: 'video',
      title: 'Spotlight in 71 seconds',
      body: 'The video shows how to open Spotlight, forgiving search and filters, scopes, and keyboard actions.',
      play: 'Play the video',
      watchOnYoutube: 'Watch on YouTube',
      otherLanguage: 'Version française',
      captionsNote: 'No narration: the on-screen text is in English.',
    },
    sections: [
      {
        id: 'open',
        title: 'Open it from anywhere with ⌘K',
        paragraphs: [
          'Press `⌘K` (`Ctrl K` on Windows and Linux) wherever you are in MapleSpire, or click the search icon in the tool pill. You no longer need to remember which diagram or list holds what you are looking for.',
        ],
      },
      {
        id: 'everything',
        title: 'One search for everything, with a preview',
        paragraphs: [
          'A single query covers model objects (systems, apps, stores, components and actors), groups, diagrams, flows, architecture decision records (ADRs), connections and actions. Results are grouped by kind, with a top hit first.',
          'Ranking follows what you type: the exact name comes first, then names that start with your text, then names with a word that starts with it, and finally names that contain it.',
          'A preview pane shows the active result and its fields — technology, scope, status, domain, tags, the diagrams it appears in… — so you can check it is the right one before you open it.',
        ],
      },
      {
        id: 'forgiving',
        title: 'Forgiving by design',
        bullets: [
          'Accents and case do not matter: `energie` finds “Énergie”.',
          'As you type, Spotlight completes the top hit in ghost text; `→` accepts it.',
          'A mistyped filter key gets a “Did you mean”: `tga:` suggests `tag:`.',
        ],
      },
      {
        id: 'filters',
        title: 'Filters that read like plain language',
        lead:
          'Type a filter key followed by a value to narrow the results. While you type, Spotlight suggests values (tags, technologies, kinds…) and `↵` adds the suggested value.',
        table: {
          caption: 'Filter examples',
          columns: ['Filter', 'Example', 'What it keeps'],
          rows: [
            ['Kind', '`kind:store`', 'One kind of result, here data stores'],
            ['Tag', '`tag:pii`', 'Objects that carry the tag'],
            ['Technology', '`tech:kafka`', 'Objects that use the technology'],
            ['Status, scope, domain', '`status:` `scope:` `domain:`', 'Objects by the value of that field'],
            ['Diagram', '`in:"Payments"`', 'Objects placed on that diagram'],
            ['Exact phrase', '`"outage detection"`', 'That phrase, word for word'],
            ['Exclude', '`-legacy` · `NOT legacy`', 'Leaves matching results out'],
            ['Either', '`kafka OR rabbitmq`', 'Results that match one or the other'],
            ['List', '`tag:pii,gdpr`', 'Several values for one filter'],
          ],
        },
        paragraphs: [
          'Filters combine with each other and with words: `kind:store tag:pii` lists the stores tagged pii. `has:`, `from:` and `to:` complete the set, and French keys work too (`genre:`, `etiquette:`, `statut:`…).',
        ],
      },
      {
        id: 'scopes',
        title: 'Scopes, tips and jumping to a result',
        bullets: [
          '`Tab` cycles through the scopes — Diagrams, Objects, Decisions, Actions — and `⌘1` to `⌘4` picks one directly.',
          '`?` lists all ten search tips.',
          '`↵` opens the chosen object on the diagram that places it, already selected.',
          '`⌘↵` reveals it in Model objects or Model connections instead, or opens a diagram in a new tab.',
          'An empty field shows your recent items, and your query is kept when you close Spotlight.',
        ],
      },
      {
        id: 'actions',
        title: 'Actions from the keyboard',
        paragraphs: [
          'Spotlight is also a command palette. Without leaving the keyboard, open all diagrams, model objects, model connections, dependencies, the model viewer, decision records or drafts; create a diagram; switch between 2D and 3D; open the history; share; switch to the dark or light theme; or open the settings.',
        ],
      },
      {
        id: 'scale',
        title: 'The whole workspace, however large',
        paragraphs: [
          'In a large workspace, your browser may hold only part of the model. Spotlight then also asks the server’s read model and merges its answer with the local results, so the search covers the whole workspace, ranked the same way.',
          'If the server cannot answer, Spotlight tells you: it says the results are partial instead of presenting them as complete.',
        ],
      },
    ],
  },
  es: {
    title: 'Spotlight: encuentra cualquier cosa en tu arquitectura con ⌘K',
    seoTitle: 'Spotlight: búsqueda global para tu arquitectura C4 | MapleSpire',
    description:
      'Spotlight es la búsqueda global de MapleSpire: pulsa ⌘K y encuentra cualquier objeto, diagrama, flujo, registro de decisión o acción de tu workspace, con filtros y teclado.',
    eyebrow: 'Novedad',
    updatedLabel: 'Publicado el',
    updatedDate: '8 de noviembre de 2026',
    isoDate: '2026-11-08',
    summary:
      '¿Dónde estaba ese servicio? En una arquitectura grande, la respuesta se esconde entre decenas de diagramas, flujos y registros de decisiones. Spotlight, la nueva búsqueda global de MapleSpire, la encuentra desde cualquier lugar: pulsa ⌘K, escribe unas letras y listo.',
    verdict:
      'En resumen: un atajo y un único cuadro de búsqueda para objetos del modelo, grupos, diagramas, flujos, registros de decisiones, conexiones y comandos. Perdona acentos y erratas, sus filtros se leen como lenguaje natural y abarca todo el workspace.',
    contentsLabel: 'Índice',
    backLabel: 'Volver al inicio',
    ctaTitle: 'Pulsa ⌘K en tu propio workspace.',
    ctaBody:
      'MapleSpire es gratuito y de código abierto (AGPL-3.0). Abre la aplicación para probar Spotlight o aloja MapleSpire en tu propia infraestructura a partir del repositorio público.',
    ctaPrimary: 'Abrir la aplicación',
    ctaSecondary: 'Ver el código en GitHub',
    skipLabel: 'Ir al contenido',
    video: {
      set: 'spotlight',
      id: 'video',
      title: 'Spotlight en 71 segundos',
      body: 'El vídeo muestra cómo abrir Spotlight, la búsqueda tolerante y los filtros, los ámbitos y las acciones de teclado.',
      play: 'Reproducir el vídeo',
      watchOnYoutube: 'Ver en YouTube',
      otherLanguage: 'Version française',
      captionsNote: 'El vídeo no tiene narración; los textos en pantalla están en inglés.',
    },
    sections: [
      {
        id: 'open',
        title: 'Ábrelo desde cualquier lugar con ⌘K',
        paragraphs: [
          'Pulsa `⌘K` (`Ctrl K` en Windows y Linux) estés donde estés en MapleSpire, o haz clic en el icono de búsqueda de la barra de herramientas flotante. Ya no hace falta recordar en qué diagrama o lista está lo que buscas.',
        ],
      },
      {
        id: 'everything',
        title: 'Una sola búsqueda para todo, con vista previa',
        paragraphs: [
          'Una misma consulta abarca los objetos del modelo (sistemas, aplicaciones, almacenes de datos, componentes y actores), los grupos, los diagramas, los flujos, los registros de decisiones de arquitectura (ADR), las conexiones y las acciones. Los resultados se agrupan por tipo, con el mejor resultado en primer lugar.',
          'La clasificación sigue lo que escribes: primero el nombre exacto, luego los nombres que empiezan por tu texto, después los que tienen una palabra que empieza por él y, por último, los que lo contienen.',
          'Un panel de vista previa muestra el resultado activo y sus campos —tecnología, ámbito, estado, dominio, etiquetas, diagramas en los que aparece…— para que compruebes que es el correcto antes de abrirlo.',
        ],
      },
      {
        id: 'forgiving',
        title: 'Una búsqueda que perdona',
        bullets: [
          'Ni los acentos ni las mayúsculas importan: `energie` encuentra «Énergie».',
          'Mientras escribes, Spotlight completa el mejor resultado en texto fantasma; `→` lo acepta.',
          'Si escribes mal una clave de filtro, aparece un «¿Quisiste decir…?»: `tga:` sugiere `tag:`.',
        ],
      },
      {
        id: 'filters',
        title: 'Filtros que se leen como lenguaje natural',
        lead:
          'Escribe una clave de filtro seguida de un valor para acotar los resultados. Mientras escribes, Spotlight sugiere valores (etiquetas, tecnologías, tipos…) y `↵` añade el valor sugerido.',
        table: {
          caption: 'Ejemplos de filtros',
          columns: ['Filtro', 'Ejemplo', 'Qué conserva'],
          rows: [
            ['Tipo', '`kind:store`', 'Un solo tipo de resultado, aquí los almacenes de datos'],
            ['Etiqueta', '`tag:pii`', 'Los objetos que llevan la etiqueta'],
            ['Tecnología', '`tech:kafka`', 'Los objetos que usan la tecnología'],
            ['Estado, ámbito, dominio', '`status:` `scope:` `domain:`', 'Los objetos según el valor de ese campo'],
            ['Diagrama', '`in:"Payments"`', 'Los objetos colocados en ese diagrama'],
            ['Frase exacta', '`"outage detection"`', 'Esa frase, palabra por palabra'],
            ['Exclusión', '`-legacy` · `NOT legacy`', 'Deja fuera los resultados que coinciden'],
            ['Alternativa', '`kafka OR rabbitmq`', 'Los resultados que coinciden con uno u otro'],
            ['Lista', '`tag:pii,gdpr`', 'Varios valores para un mismo filtro'],
          ],
        },
        paragraphs: [
          'Los filtros se combinan entre sí y con palabras: `kind:store tag:pii` muestra los almacenes etiquetados pii. `has:`, `from:` y `to:` completan el conjunto, y las claves en francés también funcionan (`genre:`, `etiquette:`, `statut:`…).',
        ],
      },
      {
        id: 'scopes',
        title: 'Ámbitos, consejos y salto a un resultado',
        bullets: [
          '`Tab` recorre los ámbitos —Diagramas, Objetos, Decisiones, Acciones— y de `⌘1` a `⌘4` eliges uno directamente.',
          '`?` muestra los diez consejos de búsqueda.',
          '`↵` abre el objeto elegido en el diagrama donde está colocado, ya seleccionado.',
          '`⌘↵` lo muestra en cambio en Objetos del modelo o Conexiones del modelo, o abre un diagrama en una pestaña nueva.',
          'Con el campo vacío ves tus elementos recientes, y tu consulta se conserva al cerrar Spotlight.',
        ],
      },
      {
        id: 'actions',
        title: 'Acciones desde el teclado',
        paragraphs: [
          'Spotlight también es una paleta de comandos. Sin soltar el teclado, abre todos los diagramas, los objetos del modelo, las conexiones del modelo, las dependencias, el visor del modelo, los registros de decisiones o los borradores; crea un diagrama; cambia entre 2D y 3D; abre el historial; comparte; cambia al tema oscuro o claro; o abre los ajustes.',
        ],
      },
      {
        id: 'scale',
        title: 'Todo el workspace, por grande que sea',
        paragraphs: [
          'En un workspace grande, puede que tu navegador solo tenga una parte del modelo. Spotlight consulta entonces también el modelo de lectura del servidor y combina su respuesta con los resultados locales, de modo que la búsqueda abarca todo el workspace, con la misma clasificación.',
          'Si el servidor no puede responder, Spotlight te lo dice: indica que los resultados son parciales en lugar de presentarlos como completos.',
        ],
      },
    ],
  },
  pt: {
    title: 'Spotlight: encontre qualquer coisa na sua arquitetura com ⌘K',
    seoTitle: 'Spotlight: busca global para a sua arquitetura C4 | MapleSpire',
    description:
      'O Spotlight é a busca global do MapleSpire: pressione ⌘K e encontre qualquer objeto, diagrama, fluxo, registro de decisão ou ação do seu workspace, com filtros e teclado.',
    eyebrow: 'Novidade',
    updatedLabel: 'Publicado em',
    updatedDate: '8 de novembro de 2026',
    isoDate: '2026-11-08',
    summary:
      'Onde estava mesmo aquele serviço? Em uma arquitetura grande, a resposta se esconde entre dezenas de diagramas, fluxos e registros de decisões. O Spotlight, a nova busca global do MapleSpire, encontra a resposta de qualquer lugar: pressione ⌘K, digite algumas letras e pronto.',
    verdict:
      'Em resumo: um atalho e uma única caixa de busca para objetos do modelo, grupos, diagramas, fluxos, registros de decisões, conexões e comandos. Ela tolera acentos e erros de digitação, seus filtros se leem como linguagem natural e ela cobre o workspace inteiro.',
    contentsLabel: 'Sumário',
    backLabel: 'Voltar ao início',
    ctaTitle: 'Pressione ⌘K no seu próprio workspace.',
    ctaBody:
      'O MapleSpire é gratuito e de código aberto (AGPL-3.0). Abra o app para experimentar o Spotlight ou hospede o MapleSpire por conta própria a partir do repositório público.',
    ctaPrimary: 'Abrir o app',
    ctaSecondary: 'Ver o código no GitHub',
    skipLabel: 'Pular para o conteúdo',
    video: {
      set: 'spotlight',
      id: 'video',
      title: 'Spotlight em 71 segundos',
      body: 'O vídeo mostra como abrir o Spotlight, a busca tolerante e os filtros, os escopos e as ações pelo teclado.',
      play: 'Reproduzir o vídeo',
      watchOnYoutube: 'Assistir no YouTube',
      otherLanguage: 'Version française',
      captionsNote: 'O vídeo não tem narração; os textos na tela estão em inglês.',
    },
    sections: [
      {
        id: 'open',
        title: 'Abra de qualquer lugar com ⌘K',
        paragraphs: [
          'Pressione `⌘K` (`Ctrl K` no Windows e no Linux) em qualquer ponto do MapleSpire, ou clique no ícone de busca da barra de ferramentas flutuante. Você não precisa mais lembrar em qual diagrama ou lista está o que procura.',
        ],
      },
      {
        id: 'everything',
        title: 'Uma busca para tudo, com pré-visualização',
        paragraphs: [
          'Uma única consulta abrange objetos do modelo (sistemas, apps, armazenamentos de dados, componentes e atores), grupos, diagramas, fluxos, registros de decisões de arquitetura (ADRs), conexões e ações. Os resultados são agrupados por tipo, com o melhor resultado no topo.',
          'A ordenação segue o que você digita: primeiro o nome exato, depois os nomes que começam com o seu texto, em seguida os nomes com uma palavra que começa com ele e, por fim, os nomes que o contêm.',
          'Um painel de pré-visualização mostra o resultado ativo e seus campos — tecnologia, escopo, status, domínio, tags, diagramas em que ele aparece… — para você conferir se é o certo antes de abri-lo.',
        ],
      },
      {
        id: 'forgiving',
        title: 'Feita para perdoar',
        bullets: [
          'Acentos e maiúsculas não importam: `energie` encontra “Énergie”.',
          'Enquanto você digita, o Spotlight completa o melhor resultado em texto fantasma; `→` aceita a sugestão.',
          'Uma chave de filtro digitada errado ganha um “Você quis dizer”: `tga:` sugere `tag:`.',
        ],
      },
      {
        id: 'filters',
        title: 'Filtros que se leem como linguagem natural',
        lead:
          'Digite uma chave de filtro seguida de um valor para refinar os resultados. Enquanto você digita, o Spotlight sugere valores (tags, tecnologias, tipos…) e `↵` adiciona o valor sugerido.',
        table: {
          caption: 'Exemplos de filtros',
          columns: ['Filtro', 'Exemplo', 'O que ele mantém'],
          rows: [
            ['Tipo', '`kind:store`', 'Um único tipo de resultado, aqui os armazenamentos de dados'],
            ['Tag', '`tag:pii`', 'Objetos que têm a tag'],
            ['Tecnologia', '`tech:kafka`', 'Objetos que usam a tecnologia'],
            ['Status, escopo, domínio', '`status:` `scope:` `domain:`', 'Objetos pelo valor desse campo'],
            ['Diagrama', '`in:"Payments"`', 'Objetos colocados nesse diagrama'],
            ['Frase exata', '`"outage detection"`', 'Essa frase, palavra por palavra'],
            ['Exclusão', '`-legacy` · `NOT legacy`', 'Deixa de fora os resultados correspondentes'],
            ['Alternativa', '`kafka OR rabbitmq`', 'Resultados que correspondem a um ou ao outro'],
            ['Lista', '`tag:pii,gdpr`', 'Vários valores para um mesmo filtro'],
          ],
        },
        paragraphs: [
          'Os filtros se combinam entre si e com palavras: `kind:store tag:pii` lista os armazenamentos com a tag pii. `has:`, `from:` e `to:` completam o conjunto, e as chaves em francês também funcionam (`genre:`, `etiquette:`, `statut:`…).',
        ],
      },
      {
        id: 'scopes',
        title: 'Escopos, dicas e acesso direto a um resultado',
        bullets: [
          '`Tab` alterna entre os escopos — Diagramas, Objetos, Decisões, Ações — e `⌘1` a `⌘4` escolhe um diretamente.',
          '`?` lista as dez dicas de busca.',
          '`↵` abre o objeto escolhido no diagrama em que ele está, já selecionado.',
          '`⌘↵` o mostra em Objetos do modelo ou Conexões do modelo, ou abre um diagrama em uma nova aba.',
          'Com o campo vazio, você vê seus itens recentes, e a sua consulta é mantida quando você fecha o Spotlight.',
        ],
      },
      {
        id: 'actions',
        title: 'Ações pelo teclado',
        paragraphs: [
          'O Spotlight também é uma paleta de comandos. Sem tirar as mãos do teclado, abra todos os diagramas, os objetos do modelo, as conexões do modelo, as dependências, o visualizador do modelo, os registros de decisões ou os rascunhos; crie um diagrama; alterne entre 2D e 3D; abra o histórico; compartilhe; mude para o tema escuro ou claro; ou abra as configurações.',
        ],
      },
      {
        id: 'scale',
        title: 'O workspace inteiro, por maior que seja',
        paragraphs: [
          'Em um workspace grande, o seu navegador pode ter só parte do modelo. O Spotlight então consulta também o modelo de leitura do servidor e mescla a resposta com os resultados locais, para que a busca cubra o workspace inteiro, com a mesma ordenação.',
          'Se o servidor não puder responder, o Spotlight avisa: ele indica que os resultados são parciais em vez de apresentá-los como completos.',
        ],
      },
    ],
  },
  it: {
    title: 'Spotlight: trova qualsiasi cosa nella tua architettura con ⌘K',
    seoTitle: 'Spotlight: la ricerca globale per la tua architettura C4 | MapleSpire',
    description:
      'Spotlight è la ricerca globale di MapleSpire: premi ⌘K per trovare oggetti, diagrammi, flussi, registri delle decisioni o azioni del tuo workspace, con filtri e tastiera.',
    eyebrow: 'Novità',
    updatedLabel: 'Pubblicato il',
    updatedDate: '8 novembre 2026',
    isoDate: '2026-11-08',
    summary:
      'Dov’era quel servizio? In una grande architettura, la risposta si nasconde tra decine di diagrammi, flussi e registri delle decisioni. Spotlight, la nuova ricerca globale di MapleSpire, la trova da qualsiasi punto: premi ⌘K, digita qualche lettera e ci sei.',
    verdict:
      'In breve: una scorciatoia e un’unica casella di ricerca per oggetti del modello, gruppi, diagrammi, flussi, registri delle decisioni, connessioni e comandi. Perdona accenti e refusi, i suoi filtri si leggono come linguaggio naturale e copre l’intero workspace.',
    contentsLabel: 'Indice',
    backLabel: 'Torna alla home',
    ctaTitle: 'Premi ⌘K nel tuo workspace.',
    ctaBody:
      'MapleSpire è gratuito e open source (AGPL-3.0). Apri l’app per provare Spotlight, oppure installa MapleSpire sui tuoi server partendo dal repository pubblico.',
    ctaPrimary: 'Apri l’app',
    ctaSecondary: 'Vedi il codice su GitHub',
    skipLabel: 'Vai al contenuto',
    video: {
      set: 'spotlight',
      id: 'video',
      title: 'Spotlight in 71 secondi',
      body: 'Il video mostra come aprire Spotlight, la ricerca tollerante e i filtri, gli ambiti e le azioni da tastiera.',
      play: 'Riproduci il video',
      watchOnYoutube: 'Guarda su YouTube',
      otherLanguage: 'Version française',
      captionsNote: 'Il video non ha narrazione; i testi sullo schermo sono in inglese.',
    },
    sections: [
      {
        id: 'open',
        title: 'Aprilo da qualsiasi punto con ⌘K',
        paragraphs: [
          'Premi `⌘K` (`Ctrl K` su Windows e Linux) ovunque ti trovi in MapleSpire, oppure fai clic sull’icona di ricerca nella barra degli strumenti flottante. Non devi più ricordare in quale diagramma o elenco si trova ciò che cerchi.',
        ],
      },
      {
        id: 'everything',
        title: 'Un’unica ricerca per tutto, con anteprima',
        paragraphs: [
          'Una sola query copre gli oggetti del modello (sistemi, app, archivi di dati, componenti e attori), i gruppi, i diagrammi, i flussi, i registri delle decisioni architetturali (ADR), le connessioni e le azioni. I risultati sono raggruppati per tipo, con il risultato migliore in cima.',
          'L’ordinamento segue ciò che digiti: prima il nome esatto, poi i nomi che iniziano con il tuo testo, poi quelli con una parola che inizia con esso e infine quelli che lo contengono.',
          'Un pannello di anteprima mostra il risultato attivo e i suoi campi — tecnologia, ambito, stato, dominio, tag, diagrammi in cui compare… — così puoi verificare che sia quello giusto prima di aprirlo.',
        ],
      },
      {
        id: 'forgiving',
        title: 'Una ricerca che perdona',
        bullets: [
          'Accenti e maiuscole non contano: `energie` trova “Énergie”.',
          'Mentre digiti, Spotlight completa il risultato migliore in testo fantasma; `→` lo accetta.',
          'Una chiave di filtro digitata male riceve un “Forse cercavi”: `tga:` suggerisce `tag:`.',
        ],
      },
      {
        id: 'filters',
        title: 'Filtri che si leggono come linguaggio naturale',
        lead:
          'Digita una chiave di filtro seguita da un valore per restringere i risultati. Mentre digiti, Spotlight suggerisce dei valori (tag, tecnologie, tipi…) e `↵` aggiunge il valore suggerito.',
        table: {
          caption: 'Esempi di filtri',
          columns: ['Filtro', 'Esempio', 'Cosa mantiene'],
          rows: [
            ['Tipo', '`kind:store`', 'Un solo tipo di risultato, qui gli archivi di dati'],
            ['Tag', '`tag:pii`', 'Gli oggetti che hanno il tag'],
            ['Tecnologia', '`tech:kafka`', 'Gli oggetti che usano la tecnologia'],
            ['Stato, ambito, dominio', '`status:` `scope:` `domain:`', 'Gli oggetti in base al valore di quel campo'],
            ['Diagramma', '`in:"Payments"`', 'Gli oggetti posizionati su quel diagramma'],
            ['Frase esatta', '`"outage detection"`', 'Quella frase, parola per parola'],
            ['Esclusione', '`-legacy` · `NOT legacy`', 'Esclude i risultati corrispondenti'],
            ['Alternativa', '`kafka OR rabbitmq`', 'I risultati che corrispondono all’uno o all’altro'],
            ['Elenco', '`tag:pii,gdpr`', 'Più valori per uno stesso filtro'],
          ],
        },
        paragraphs: [
          'I filtri si combinano tra loro e con le parole: `kind:store tag:pii` elenca gli archivi con il tag pii. `has:`, `from:` e `to:` completano l’insieme, e funzionano anche le chiavi in francese (`genre:`, `etiquette:`, `statut:`…).',
        ],
      },
      {
        id: 'scopes',
        title: 'Ambiti, suggerimenti e salto a un risultato',
        bullets: [
          '`Tab` scorre gli ambiti — Diagrammi, Oggetti, Decisioni, Azioni — e da `⌘1` a `⌘4` ne scegli uno direttamente.',
          '`?` elenca tutti e dieci i suggerimenti di ricerca.',
          '`↵` apre l’oggetto scelto sul diagramma che lo contiene, già selezionato.',
          '`⌘↵` lo mostra invece in Oggetti del modello o Connessioni del modello, oppure apre un diagramma in una nuova scheda.',
          'Con il campo vuoto vedi gli elementi recenti, e la query viene conservata quando chiudi Spotlight.',
        ],
      },
      {
        id: 'actions',
        title: 'Azioni da tastiera',
        paragraphs: [
          'Spotlight è anche una palette dei comandi. Senza staccare le mani dalla tastiera, apri tutti i diagrammi, gli oggetti del modello, le connessioni del modello, le dipendenze, il visualizzatore del modello, i registri delle decisioni o le bozze; crea un diagramma; passa dal 2D al 3D; apri la cronologia; condividi; passa al tema scuro o chiaro; oppure apri le impostazioni.',
        ],
      },
      {
        id: 'scale',
        title: 'L’intero workspace, per quanto grande',
        paragraphs: [
          'In un workspace grande, il browser può contenere solo una parte del modello. Spotlight interroga allora anche il modello di lettura del server e unisce la sua risposta ai risultati locali: la ricerca copre l’intero workspace, con lo stesso ordinamento.',
          'Se il server non può rispondere, Spotlight te lo dice: segnala che i risultati sono parziali invece di presentarli come completi.',
        ],
      },
    ],
  },
  de: {
    title: 'Spotlight: Mit ⌘K alles in Ihrer Architektur finden',
    seoTitle: 'Spotlight: die globale Suche für Ihre C4-Architektur | MapleSpire',
    description:
      'Spotlight ist die globale Suche von MapleSpire: ⌘K findet Objekte, Diagramme, Flows, Entscheidungen und Aktionen im Workspace, mit Filtern und Tastaturnavigation.',
    eyebrow: 'Neue Funktion',
    updatedLabel: 'Veröffentlicht am',
    updatedDate: '8. November 2026',
    isoDate: '2026-11-08',
    summary:
      'Wo war dieser Service noch gleich? In einer großen Architektur versteckt sich die Antwort in einem von Dutzenden Diagrammen, Flows und Architekturentscheidungen. Spotlight, die neue globale Suche von MapleSpire, findet sie von überall aus: ⌘K drücken, ein paar Buchstaben tippen, und Sie sind am Ziel.',
    verdict:
      'Kurz gesagt: ein Tastenkürzel und ein einziges Suchfeld für Modellobjekte, Gruppen, Diagramme, Flows, Architekturentscheidungen, Verbindungen und Befehle. Die Suche verzeiht Akzente und Tippfehler, ihre Filter lesen sich wie Alltagssprache, und sie deckt den gesamten Workspace ab.',
    contentsLabel: 'Inhalt',
    backLabel: 'Zur Startseite',
    ctaTitle: 'Drücken Sie ⌘K in Ihrem eigenen Workspace.',
    ctaBody:
      'MapleSpire ist kostenlos und Open Source (AGPL-3.0). Öffnen Sie die App, um Spotlight auszuprobieren, oder hosten Sie MapleSpire selbst aus dem öffentlichen Repository.',
    ctaPrimary: 'App öffnen',
    ctaSecondary: 'Code auf GitHub ansehen',
    skipLabel: 'Zum Inhalt springen',
    video: {
      set: 'spotlight',
      id: 'video',
      title: 'Spotlight in 71 Sekunden',
      body: 'Das Video zeigt, wie Sie Spotlight öffnen, dazu die fehlertolerante Suche und die Filter, die Suchbereiche und die Aktionen per Tastatur.',
      play: 'Video abspielen',
      watchOnYoutube: 'Auf YouTube ansehen',
      otherLanguage: 'Version française',
      captionsNote: 'Das Video hat keinen Sprecher; die Texte im Bild sind auf Englisch.',
    },
    sections: [
      {
        id: 'open',
        title: 'Mit ⌘K von überall aus öffnen',
        paragraphs: [
          'Drücken Sie `⌘K` (`Ctrl K` unter Windows und Linux), wo immer Sie sich in MapleSpire befinden, oder klicken Sie auf das Suchsymbol in der schwebenden Werkzeugleiste. Sie müssen sich nicht mehr merken, in welchem Diagramm oder in welcher Liste das Gesuchte steckt.',
        ],
      },
      {
        id: 'everything',
        title: 'Eine Suche für alles, mit Vorschau',
        paragraphs: [
          'Eine einzige Abfrage umfasst Modellobjekte (Systeme, Apps, Datenspeicher, Komponenten und Akteure), Gruppen, Diagramme, Flows, Architekturentscheidungen (ADRs), Verbindungen und Aktionen. Die Ergebnisse sind nach Art gruppiert, mit dem besten Treffer an erster Stelle.',
          'Die Rangfolge richtet sich nach Ihrer Eingabe: zuerst der exakte Name, dann Namen, die mit Ihrem Text beginnen, dann Namen mit einem Wort, das damit beginnt, und zuletzt Namen, die ihn enthalten.',
          'Ein Vorschaubereich zeigt das aktive Ergebnis und seine Felder – Technologie, Geltungsbereich, Status, Domäne, Tags, die Diagramme, in denen es vorkommt … –, damit Sie vor dem Öffnen prüfen können, ob es das richtige ist.',
        ],
      },
      {
        id: 'forgiving',
        title: 'Von Grund auf fehlertolerant',
        bullets: [
          'Akzente sowie Groß- und Kleinschreibung spielen keine Rolle: `energie` findet „Énergie“.',
          'Während Sie tippen, vervollständigt Spotlight den besten Treffer als Ghost-Text; `→` übernimmt ihn.',
          'Bei einem vertippten Filterschlüssel fragt Spotlight „Meinten Sie“: `tga:` schlägt `tag:` vor.',
        ],
      },
      {
        id: 'filters',
        title: 'Filter, die sich wie Alltagssprache lesen',
        lead:
          'Geben Sie einen Filterschlüssel gefolgt von einem Wert ein, um die Ergebnisse einzugrenzen. Während der Eingabe schlägt Spotlight Werte vor (Tags, Technologien, Arten …), und `↵` übernimmt den vorgeschlagenen Wert.',
        table: {
          caption: 'Beispiele für Filter',
          columns: ['Filter', 'Beispiel', 'Was übrig bleibt'],
          rows: [
            ['Art', '`kind:store`', 'Eine einzige Ergebnisart, hier Datenspeicher'],
            ['Tag', '`tag:pii`', 'Objekte, die den Tag tragen'],
            ['Technologie', '`tech:kafka`', 'Objekte, die die Technologie verwenden'],
            ['Status, Geltungsbereich, Domäne', '`status:` `scope:` `domain:`', 'Objekte nach dem Wert dieses Felds'],
            ['Diagramm', '`in:"Payments"`', 'Objekte, die auf diesem Diagramm platziert sind'],
            ['Exakte Phrase', '`"outage detection"`', 'Genau diese Phrase, Wort für Wort'],
            ['Ausschließen', '`-legacy` · `NOT legacy`', 'Lässt passende Ergebnisse weg'],
            ['Entweder–oder', '`kafka OR rabbitmq`', 'Ergebnisse, die auf das eine oder das andere passen'],
            ['Liste', '`tag:pii,gdpr`', 'Mehrere Werte für einen Filter'],
          ],
        },
        paragraphs: [
          'Filter lassen sich miteinander und mit Suchbegriffen kombinieren: `kind:store tag:pii` listet die mit pii getaggten Datenspeicher auf. `has:`, `from:` und `to:` vervollständigen das Repertoire, und auch französische Schlüssel funktionieren (`genre:`, `etiquette:`, `statut:`…).',
        ],
      },
      {
        id: 'scopes',
        title: 'Suchbereiche, Tipps und der Sprung zum Ergebnis',
        bullets: [
          '`Tab` wechselt reihum zwischen den Suchbereichen – Diagramme, Objekte, Entscheidungen, Aktionen –, und `⌘1` bis `⌘4` wählt einen direkt aus.',
          '`?` zeigt alle zehn Suchtipps an.',
          '`↵` öffnet das gewählte Objekt auf dem Diagramm, auf dem es platziert ist, und hat es dort bereits ausgewählt.',
          '`⌘↵` zeigt es stattdessen unter Modellobjekte oder Modellverbindungen an oder öffnet ein Diagramm in einem neuen Tab.',
          'Ein leeres Feld zeigt Ihre zuletzt verwendeten Elemente, und Ihre Abfrage bleibt erhalten, wenn Sie Spotlight schließen.',
        ],
      },
      {
        id: 'actions',
        title: 'Aktionen per Tastatur',
        paragraphs: [
          'Spotlight ist auch eine Befehlspalette. Ohne die Tastatur zu verlassen, öffnen Sie alle Diagramme, die Modellobjekte, die Modellverbindungen, die Abhängigkeiten, den Modell-Viewer, die Architekturentscheidungen oder die Entwürfe; erstellen ein Diagramm; wechseln zwischen 2D und 3D; öffnen den Verlauf; teilen; schalten auf das dunkle oder helle Design um; oder öffnen die Einstellungen.',
        ],
      },
      {
        id: 'scale',
        title: 'Der ganze Workspace, egal wie groß',
        paragraphs: [
          'In einem großen Workspace hält Ihr Browser unter Umständen nur einen Teil des Modells. Spotlight fragt dann zusätzlich das Lesemodell des Servers ab und führt dessen Antwort mit den lokalen Ergebnissen zusammen: So deckt die Suche den ganzen Workspace ab, mit derselben Rangfolge.',
          'Kann der Server nicht antworten, sagt Spotlight Ihnen das: Es weist darauf hin, dass die Ergebnisse unvollständig sind, statt sie als vollständig darzustellen.',
        ],
      },
    ],
  },
  zh: {
    title: 'Spotlight：用 ⌘K 找到架构中的一切',
    seoTitle: 'Spotlight：C4 架构的全局搜索 | MapleSpire',
    description:
      'Spotlight 是 MapleSpire 的全局搜索：按 ⌘K 即可找到 workspace 中的任何对象、图表、流程、决策记录或操作，支持筛选和键盘导航。',
    eyebrow: '新功能',
    updatedLabel: '发布于',
    updatedDate: '2026年11月8日',
    isoDate: '2026-11-08',
    summary:
      '那个服务到底在哪儿？在大型架构里，答案往往藏在几十张图表、流程和决策记录中的某一处。MapleSpire 全新的全局搜索 Spotlight 让你在任何地方都能找到它：按下 ⌘K，输入几个字母，即可直达。',
    verdict:
      '简而言之：一个快捷键、一个搜索框，涵盖模型对象、分组、图表、流程、决策记录、连接和命令。它能容忍重音和拼写错误，筛选条件读起来就像日常语言，而且覆盖整个 workspace。',
    contentsLabel: '目录',
    backLabel: '返回首页',
    ctaTitle: '在你自己的 workspace 里按下 ⌘K。',
    ctaBody:
      'MapleSpire 免费且开源（AGPL-3.0）。打开应用即可试用 Spotlight，也可以基于公开仓库自行托管 MapleSpire。',
    ctaPrimary: '打开应用',
    ctaSecondary: '在 GitHub 上查看代码',
    skipLabel: '跳到正文',
    video: {
      set: 'spotlight',
      id: 'video',
      title: '71 秒了解 Spotlight',
      body: '视频演示了如何打开 Spotlight，以及容错搜索与筛选、搜索范围和键盘操作。',
      play: '播放视频',
      watchOnYoutube: '在 YouTube 上观看',
      otherLanguage: 'Version française',
      captionsNote: '视频没有旁白，画面中的文字为英文。',
    },
    sections: [
      {
        id: 'open',
        title: '随时随地按 ⌘K 打开',
        paragraphs: [
          '无论你在 MapleSpire 的哪个位置，按下 `⌘K`（Windows 和 Linux 上为 `Ctrl K`），或点击浮动工具栏中的搜索图标即可打开。你不必再记住要找的内容在哪张图表或哪个列表里。',
        ],
      },
      {
        id: 'everything',
        title: '一次搜索涵盖一切，还附带预览',
        paragraphs: [
          '一次查询即可涵盖模型对象（系统、应用、存储、组件和参与者）、分组、图表、流程、架构决策记录（ADR）、连接和操作。结果按类型分组，最佳匹配排在最前。',
          '排序取决于你的输入：完全匹配的名称排在最前，其次是以你输入的文字开头的名称，然后是其中某个词以它开头的名称，最后是包含它的名称。',
          '预览面板会显示当前结果及其字段（技术、范围、状态、领域、标签、它所出现的图表……），方便你在打开之前确认找对了。',
        ],
      },
      {
        id: 'forgiving',
        title: '为容错而设计',
        bullets: [
          '重音和大小写都不影响结果：`energie` 也能找到“Énergie”。',
          '输入时，Spotlight 会以浅色提示文字（ghost text）补全最佳匹配；按 `→` 即可接受。',
          '筛选键输错时会提示“你是不是要找”：输入 `tga:` 会建议 `tag:`。',
        ],
      },
      {
        id: 'filters',
        title: '读起来像日常语言的筛选条件',
        lead:
          '输入筛选键再加一个值，即可缩小结果范围。输入过程中，Spotlight 会建议可用的值（标签、技术、类型……），按 `↵` 即可添加建议的值。',
        table: {
          caption: '筛选示例',
          columns: ['筛选', '示例', '保留的结果'],
          rows: [
            ['类型', '`kind:store`', '只保留一种结果，这里是数据存储'],
            ['标签', '`tag:pii`', '带有该标签的对象'],
            ['技术', '`tech:kafka`', '使用该技术的对象'],
            ['状态、范围、领域', '`status:` `scope:` `domain:`', '按该字段的值筛选的对象'],
            ['图表', '`in:"Payments"`', '放置在该图表上的对象'],
            ['精确短语', '`"outage detection"`', '逐字匹配该短语的结果'],
            ['排除', '`-legacy` · `NOT legacy`', '去掉匹配的结果'],
            ['任选其一', '`kafka OR rabbitmq`', '匹配其中任意一个的结果'],
            ['列表', '`tag:pii,gdpr`', '同一个筛选的多个值'],
          ],
        },
        paragraphs: [
          '筛选条件可以相互组合，也可以与关键词组合：`kind:store tag:pii` 会列出标记为 pii 的存储。`has:`、`from:` 和 `to:` 补全了这套筛选，法语键同样可用（`genre:`、`etiquette:`、`statut:`…）。',
        ],
      },
      {
        id: 'scopes',
        title: '范围、提示与跳转到结果',
        bullets: [
          '`Tab` 在各个范围（图表、对象、决策、操作）之间循环切换，`⌘1` 到 `⌘4` 可直接选择其中之一。',
          '`?` 会列出全部十条搜索提示。',
          '`↵` 会在放置该对象的图表上打开它，并已将其选中。',
          '`⌘↵` 则改为在“模型对象”或“模型连接”中显示它，或在新标签页中打开图表。',
          '搜索框为空时会显示你最近访问的项目；关闭 Spotlight 后，你的查询也会保留。',
        ],
      },
      {
        id: 'actions',
        title: '用键盘执行操作',
        paragraphs: [
          'Spotlight 也是一个命令面板。无需离开键盘，就能打开所有图表、模型对象、模型连接、依赖关系、模型查看器、决策记录或草稿；新建图表；在 2D 和 3D 之间切换；打开历史记录；分享；切换到深色或浅色主题；或打开设置。',
        ],
      },
      {
        id: 'scale',
        title: '覆盖整个 workspace，无论多大',
        paragraphs: [
          '在大型 workspace 中，浏览器可能只持有模型的一部分。此时 Spotlight 还会查询服务器的读模型，并将其返回的结果与本地结果合并，因此搜索能覆盖整个 workspace，排序方式也完全一致。',
          '如果服务器无法响应，Spotlight 会明确告诉你：它会注明结果不完整，而不是把它们当作完整结果呈现。',
        ],
      },
    ],
  },
  ja: {
    title: 'Spotlight：⌘K でアーキテクチャのすべてを見つける',
    seoTitle: 'Spotlight：C4 アーキテクチャのグローバル検索 | MapleSpire',
    description:
      'Spotlight は MapleSpire のグローバル検索。⌘K でオブジェクト、図、フロー、意思決定記録、アクションを探せ、フィルターとキーボード操作に対応します。',
    eyebrow: '新機能',
    updatedLabel: '公開日',
    updatedDate: '2026年11月8日',
    isoDate: '2026-11-08',
    summary:
      'あのサービス、どこにあったっけ？大規模なアーキテクチャでは、その答えは何十もの図、フロー、意思決定記録のどこかに埋もれています。MapleSpire の新しいグローバル検索 Spotlight なら、どこからでも見つけられます。⌘K を押して数文字入力するだけで、すぐにたどり着けます。',
    verdict:
      'ひとことで言えば、一つのショートカットと一つの検索ボックスで、モデルオブジェクト、グループ、図、フロー、意思決定記録、接続、コマンドを探せます。アクセントやタイプミスに寛容で、フィルターは普段の言葉のように読め、workspace 全体を対象にします。',
    contentsLabel: '目次',
    backLabel: 'ホームに戻る',
    ctaTitle: 'お使いの workspace で ⌘K を押してみてください。',
    ctaBody:
      'MapleSpire は無料のオープンソースです（AGPL-3.0）。アプリを開いて Spotlight を試すか、公開リポジトリから MapleSpire をセルフホストできます。',
    ctaPrimary: 'アプリを開く',
    ctaSecondary: 'GitHub でコードを見る',
    skipLabel: '本文へスキップ',
    video: {
      set: 'spotlight',
      id: 'video',
      title: '71 秒でわかる Spotlight',
      body: 'この動画では、Spotlight の開き方、ミスに寛容な検索とフィルター、スコープ、キーボードからのアクションを紹介します。',
      play: '動画を再生',
      watchOnYoutube: 'YouTube で見る',
      otherLanguage: 'Version française',
      captionsNote: '動画にナレーションはなく、画面上のテキストは英語です。',
    },
    sections: [
      {
        id: 'open',
        title: '⌘K でどこからでも開く',
        paragraphs: [
          'MapleSpire のどこにいても `⌘K`（Windows と Linux では `Ctrl K`）を押すか、フローティングツールバーの検索アイコンをクリックします。探しているものがどの図やどの一覧にあるかを覚えておく必要は、もうありません。',
        ],
      },
      {
        id: 'everything',
        title: 'すべてを一つの検索で、プレビュー付き',
        paragraphs: [
          '一つのクエリで、モデルオブジェクト（システム、アプリ、データストア、コンポーネント、アクター）、グループ、図、フロー、アーキテクチャ意思決定記録（ADR）、接続、アクションをまとめて検索できます。結果は種類ごとにグループ化され、最上位の一致が先頭に表示されます。',
          '並び順は入力内容に従います。まず名前が完全に一致するもの、次に入力した文字で始まる名前、続いてその文字で始まる単語を含む名前、最後にその文字を含む名前の順です。',
          'プレビューパネルには、選択中の結果とそのフィールド（テクノロジー、スコープ、ステータス、ドメイン、タグ、その結果が登場する図など）が表示されるので、開く前に目的のものかどうかを確かめられます。',
        ],
      },
      {
        id: 'forgiving',
        title: 'ミスに寛容な設計',
        bullets: [
          'アクセントや大文字・小文字は区別しません。`energie` で「Énergie」が見つかります。',
          '入力中、Spotlight は最上位の一致をゴーストテキストで補完します。`→` で確定できます。',
          'フィルターキーを打ち間違えると「もしかして」と提案します。`tga:` なら `tag:` を候補に出します。',
        ],
      },
      {
        id: 'filters',
        title: '普段の言葉のように読めるフィルター',
        lead:
          'フィルターキーに続けて値を入力すると、結果を絞り込めます。入力中は Spotlight が値の候補（タグ、テクノロジー、種類など）を示し、`↵` で候補の値を追加できます。',
        table: {
          caption: 'フィルターの例',
          columns: ['フィルター', '例', '残る結果'],
          rows: [
            ['種類', '`kind:store`', '一種類の結果だけ。この例ではデータストア'],
            ['タグ', '`tag:pii`', 'そのタグが付いたオブジェクト'],
            ['テクノロジー', '`tech:kafka`', 'そのテクノロジーを使うオブジェクト'],
            ['ステータス、スコープ、ドメイン', '`status:` `scope:` `domain:`', 'そのフィールドの値で絞り込んだオブジェクト'],
            ['図', '`in:"Payments"`', 'その図に配置されたオブジェクト'],
            ['完全一致のフレーズ', '`"outage detection"`', 'そのフレーズに一字一句一致する結果'],
            ['除外', '`-legacy` · `NOT legacy`', '一致する結果を除外'],
            ['いずれか', '`kafka OR rabbitmq`', 'どちらか一方に一致する結果'],
            ['リスト', '`tag:pii,gdpr`', '一つのフィルターに複数の値'],
          ],
        },
        paragraphs: [
          'フィルターは互いに、また単語とも組み合わせられます。`kind:store tag:pii` なら、pii タグの付いたデータストアを一覧表示します。さらに `has:`、`from:`、`to:` もあり、フランス語のキー（`genre:`、`etiquette:`、`statut:`…）も使えます。',
        ],
      },
      {
        id: 'scopes',
        title: 'スコープ、ヒント、結果へのジャンプ',
        bullets: [
          '`Tab` でスコープ（図、オブジェクト、意思決定、アクション）を順に切り替え、`⌘1` から `⌘4` で直接選べます。',
          '`?` を押すと、10 個の検索ヒントがすべて表示されます。',
          '`↵` を押すと、選んだオブジェクトを配置している図が開き、そのオブジェクトが選択された状態になります。',
          '`⌘↵` を押すと、代わりにモデルオブジェクトまたはモデル接続の一覧で表示します。図の場合は新しいタブで開きます。',
          '入力欄が空のときは最近の項目が表示され、Spotlight を閉じても入力したクエリは保持されます。',
        ],
      },
      {
        id: 'actions',
        title: 'キーボードからアクションを実行',
        paragraphs: [
          'Spotlight はコマンドパレットでもあります。キーボードから手を離さずに、すべての図、モデルオブジェクト、モデル接続、依存関係、モデルビューアー、意思決定記録、ドラフトを開く、図を作成する、2D と 3D を切り替える、履歴を開く、共有する、ダークテーマとライトテーマを切り替える、設定を開く、といった操作ができます。',
        ],
      },
      {
        id: 'scale',
        title: 'どれほど大きくても workspace 全体を',
        paragraphs: [
          '大規模な workspace では、ブラウザーがモデルの一部しか保持していないことがあります。その場合、Spotlight はサーバーの読み取りモデルにも問い合わせ、その応答をローカルの結果とマージします。こうして検索は workspace 全体を対象とし、並び順も変わりません。',
          'サーバーが応答できない場合、Spotlight はそのことを伝えます。結果を完全なものとして見せるのではなく、結果が部分的であると表示します。',
        ],
      },
    ],
  },
  ko: {
    title: 'Spotlight: ⌘K로 아키텍처의 모든 것을 찾으세요',
    seoTitle: 'Spotlight: C4 아키텍처를 위한 전역 검색 | MapleSpire',
    description:
      'Spotlight는 MapleSpire의 전역 검색입니다. ⌘K를 누르면 workspace의 모든 객체, 다이어그램, 흐름, 의사결정 기록, 작업을 필터와 키보드 탐색으로 찾을 수 있습니다.',
    eyebrow: '새 기능',
    updatedLabel: '게시일',
    updatedDate: '2026년 11월 8일',
    isoDate: '2026-11-08',
    summary:
      '그 서비스가 어디 있었더라? 큰 아키텍처에서는 답이 수십 개의 다이어그램, 흐름, 의사결정 기록 가운데 어딘가에 숨어 있습니다. MapleSpire의 새로운 전역 검색 Spotlight는 어디서든 그것을 찾아 줍니다. ⌘K를 누르고 몇 글자만 입력하면 바로 그곳에 도착합니다.',
    verdict:
      '한마디로, 모델 객체, 그룹, 다이어그램, 흐름, 의사결정 기록, 연결, 명령을 위한 하나의 단축키와 하나의 검색 상자입니다. 악센트와 오타를 너그럽게 받아 주고, 필터는 일상 언어처럼 읽히며, workspace 전체를 검색합니다.',
    contentsLabel: '목차',
    backLabel: '홈으로 돌아가기',
    ctaTitle: '여러분의 workspace에서 ⌘K를 눌러 보세요.',
    ctaBody:
      'MapleSpire는 무료 오픈 소스(AGPL-3.0)입니다. 앱을 열어 Spotlight를 사용해 보거나, 공개 저장소에서 MapleSpire를 셀프 호스팅하세요.',
    ctaPrimary: '앱 열기',
    ctaSecondary: 'GitHub에서 코드 보기',
    skipLabel: '본문으로 건너뛰기',
    video: {
      set: 'spotlight',
      id: 'video',
      title: '71초로 보는 Spotlight',
      body: '영상에서는 Spotlight를 여는 방법, 너그러운 검색과 필터, 범위, 키보드 작업을 보여 줍니다.',
      play: '동영상 재생',
      watchOnYoutube: 'YouTube에서 보기',
      otherLanguage: 'Version française',
      captionsNote: '영상에는 내레이션이 없으며, 화면의 텍스트는 영어입니다.',
    },
    sections: [
      {
        id: 'open',
        title: '어디서든 ⌘K로 열기',
        paragraphs: [
          'MapleSpire 어디에서든 `⌘K`(Windows와 Linux에서는 `Ctrl K`)를 누르거나, 플로팅 도구 모음의 검색 아이콘을 클릭하세요. 찾는 것이 어느 다이어그램이나 목록에 있는지 더 이상 기억할 필요가 없습니다.',
        ],
      },
      {
        id: 'everything',
        title: '미리보기와 함께, 모든 것을 하나의 검색으로',
        paragraphs: [
          '하나의 검색어로 모델 객체(시스템, 앱, 데이터 저장소, 컴포넌트, 액터), 그룹, 다이어그램, 흐름, 아키텍처 의사결정 기록(ADR), 연결, 작업을 모두 찾습니다. 결과는 종류별로 묶이고, 가장 잘 맞는 결과가 맨 위에 표시됩니다.',
          '순위는 입력한 내용을 따릅니다. 정확히 일치하는 이름이 먼저 오고, 그다음 입력한 텍스트로 시작하는 이름, 그 텍스트로 시작하는 단어가 들어 있는 이름, 마지막으로 그 텍스트를 포함하는 이름 순입니다.',
          '미리보기 창에는 선택된 결과와 그 필드 — 기술, 범위, 상태, 도메인, 태그, 해당 항목이 나오는 다이어그램… — 가 표시되므로, 열기 전에 원하는 항목인지 확인할 수 있습니다.',
        ],
      },
      {
        id: 'forgiving',
        title: '실수를 너그럽게 받아 주는 검색',
        bullets: [
          '악센트와 대소문자는 구분하지 않습니다. `energie`로 “Énergie”를 찾을 수 있습니다.',
          '입력하는 동안 Spotlight가 가장 잘 맞는 결과를 흐린 글자로 미리 완성해 보여 주고, `→`로 이를 수락합니다.',
          '필터 키를 잘못 입력하면 “이것을 찾으셨나요?”가 표시됩니다. `tga:`를 입력하면 `tag:`를 제안합니다.',
        ],
      },
      {
        id: 'filters',
        title: '일상 언어처럼 읽히는 필터',
        lead:
          '필터 키 뒤에 값을 입력해 결과를 좁히세요. 입력하는 동안 Spotlight가 값(태그, 기술, 종류…)을 제안하고, `↵`로 제안된 값을 추가합니다.',
        table: {
          caption: '필터 예시',
          columns: ['필터', '예시', '남기는 결과'],
          rows: [
            ['종류', '`kind:store`', '한 종류의 결과만, 여기서는 데이터 저장소'],
            ['태그', '`tag:pii`', '해당 태그가 붙은 객체'],
            ['기술', '`tech:kafka`', '해당 기술을 사용하는 객체'],
            ['상태, 범위, 도메인', '`status:` `scope:` `domain:`', '그 필드의 값에 따른 객체'],
            ['다이어그램', '`in:"Payments"`', '그 다이어그램에 배치된 객체'],
            ['정확한 문구', '`"outage detection"`', '그 문구와 글자 그대로 일치하는 결과'],
            ['제외', '`-legacy` · `NOT legacy`', '일치하는 결과를 뺍니다'],
            ['둘 중 하나', '`kafka OR rabbitmq`', '둘 중 어느 하나와 일치하는 결과'],
            ['목록', '`tag:pii,gdpr`', '하나의 필터에 여러 값'],
          ],
        },
        paragraphs: [
          '필터는 서로, 그리고 일반 단어와 함께 조합할 수 있습니다. `kind:store tag:pii`는 pii 태그가 붙은 데이터 저장소를 나열합니다. `has:`, `from:`, `to:`도 함께 제공되며, 프랑스어 키(`genre:`, `etiquette:`, `statut:`…)도 사용할 수 있습니다.',
        ],
      },
      {
        id: 'scopes',
        title: '범위, 도움말, 결과로 바로 이동',
        bullets: [
          '`Tab`으로 범위 — 다이어그램, 객체, 의사결정, 작업 — 를 차례로 전환하고, `⌘1`부터 `⌘4`까지로 하나를 바로 선택합니다.',
          '`?`를 누르면 열 가지 검색 도움말이 모두 표시됩니다.',
          '`↵`는 선택한 객체를 그 객체가 배치된 다이어그램에서, 이미 선택된 상태로 엽니다.',
          '`⌘↵`는 대신 모델 객체나 모델 연결에서 해당 항목을 보여 주거나, 다이어그램을 새 탭에서 엽니다.',
          '입력란이 비어 있으면 최근 항목이 표시되고, Spotlight를 닫아도 검색어는 그대로 유지됩니다.',
        ],
      },
      {
        id: 'actions',
        title: '키보드로 실행하는 작업',
        paragraphs: [
          'Spotlight는 명령 팔레트이기도 합니다. 키보드에서 손을 떼지 않고 모든 다이어그램, 모델 객체, 모델 연결, 의존성, 모델 뷰어, 의사결정 기록, 초안을 열고, 다이어그램을 만들고, 2D와 3D를 전환하고, 이력을 열고, 공유하고, 다크 또는 라이트 테마로 바꾸거나 설정을 열 수 있습니다.',
        ],
      },
      {
        id: 'scale',
        title: '아무리 커도, workspace 전체를',
        paragraphs: [
          '큰 workspace에서는 브라우저가 모델의 일부만 가지고 있을 수 있습니다. 이때 Spotlight는 서버의 읽기 모델에도 질의하고 그 응답을 로컬 결과와 병합하므로, 같은 순위 방식으로 workspace 전체를 검색합니다.',
          '서버가 응답하지 못하면 Spotlight가 알려 줍니다. 결과를 완전한 것처럼 보여 주지 않고, 결과가 일부뿐이라고 표시합니다.',
        ],
      },
    ],
  },
  hi: {
    title: 'Spotlight: ⌘K से अपने आर्किटेक्चर में कुछ भी खोजें',
    seoTitle: 'Spotlight: आपके C4 आर्किटेक्चर के लिए ग्लोबल खोज | MapleSpire',
    description:
      'Spotlight, MapleSpire की ग्लोबल खोज है: ⌘K दबाकर अपने workspace का कोई भी ऑब्जेक्ट, आरेख, फ़्लो, निर्णय रिकॉर्ड या कार्रवाई खोजें, फ़िल्टर और कीबोर्ड नेविगेशन के साथ।',
    eyebrow: 'नई सुविधा',
    updatedLabel: 'प्रकाशित',
    updatedDate: '8 नवंबर 2026',
    isoDate: '2026-11-08',
    summary:
      'वह सर्विस आख़िर थी कहाँ? बड़े आर्किटेक्चर में जवाब दर्जनों आरेखों, फ़्लो और निर्णय रिकॉर्ड में से किसी एक में छिपा होता है। MapleSpire की नई ग्लोबल खोज, Spotlight, उसे कहीं से भी ढूँढ़ निकालती है: ⌘K दबाएँ, कुछ अक्षर टाइप करें, और आप वहीं पहुँच जाते हैं।',
    verdict:
      'संक्षेप में: मॉडल ऑब्जेक्ट, समूह, आरेख, फ़्लो, निर्णय रिकॉर्ड, कनेक्शन और कमांड के लिए एक ही शॉर्टकट और एक ही खोज बॉक्स। यह एक्सेंट और टाइपिंग की गलतियों को माफ़ कर देता है, इसके फ़िल्टर आम भाषा की तरह पढ़े जाते हैं, और यह पूरे workspace को कवर करता है।',
    contentsLabel: 'विषय-सूची',
    backLabel: 'होम पर लौटें',
    ctaTitle: 'अपने ही workspace में ⌘K दबाएँ।',
    ctaBody:
      'MapleSpire निःशुल्क और ओपन सोर्स (AGPL-3.0) है। Spotlight आज़माने के लिए ऐप खोलें, या सार्वजनिक रिपॉज़िटरी से MapleSpire को सेल्फ-होस्ट करें।',
    ctaPrimary: 'ऐप खोलें',
    ctaSecondary: 'GitHub पर कोड देखें',
    skipLabel: 'सामग्री पर जाएँ',
    video: {
      set: 'spotlight',
      id: 'video',
      title: '71 सेकंड में Spotlight',
      body: 'वीडियो दिखाता है कि Spotlight कैसे खोलें, गलतियाँ माफ़ करने वाली खोज और फ़िल्टर, स्कोप, और कीबोर्ड से कार्रवाइयाँ।',
      play: 'वीडियो चलाएँ',
      watchOnYoutube: 'YouTube पर देखें',
      otherLanguage: 'Version française',
      captionsNote: 'वीडियो में कोई वॉइसओवर नहीं है; स्क्रीन पर लिखा टेक्स्ट अंग्रेज़ी में है।',
    },
    sections: [
      {
        id: 'open',
        title: '⌘K से इसे कहीं से भी खोलें',
        paragraphs: [
          'MapleSpire में आप कहीं भी हों, `⌘K` (Windows और Linux पर `Ctrl K`) दबाएँ, या फ़्लोटिंग टूलबार में खोज आइकन पर क्लिक करें। अब यह याद रखने की ज़रूरत नहीं कि आप जो ढूँढ़ रहे हैं, वह किस आरेख या सूची में है।',
        ],
      },
      {
        id: 'everything',
        title: 'हर चीज़ के लिए एक खोज, प्रीव्यू के साथ',
        paragraphs: [
          'एक ही क्वेरी मॉडल ऑब्जेक्ट (सिस्टम, ऐप, डेटा स्टोर, कंपोनेंट और एक्टर), समूह, आरेख, फ़्लो, आर्किटेक्चर निर्णय रिकॉर्ड (ADR), कनेक्शन और कार्रवाइयों को कवर करती है। परिणाम प्रकार के अनुसार समूहों में दिखते हैं, और सबसे अच्छा परिणाम सबसे ऊपर रहता है।',
          'क्रम वही तय करता है जो आप टाइप करते हैं: पहले सटीक नाम, फिर वे नाम जो आपके टेक्स्ट से शुरू होते हैं, फिर वे जिनका कोई शब्द उससे शुरू होता है, और अंत में वे जिनमें वह टेक्स्ट शामिल है।',
          'प्रीव्यू पैनल सक्रिय परिणाम और उसके फ़ील्ड दिखाता है — टेक्नोलॉजी, स्कोप, स्टेटस, डोमेन, टैग, वे आरेख जिनमें वह दिखता है… — ताकि खोलने से पहले आप पक्का कर सकें कि यही सही परिणाम है।',
        ],
      },
      {
        id: 'forgiving',
        title: 'गलतियों को माफ़ करने वाली खोज',
        bullets: [
          'एक्सेंट और छोटे-बड़े अक्षरों से कोई फ़र्क़ नहीं पड़ता: `energie` से “Énergie” मिल जाता है।',
          'टाइप करते समय Spotlight सबसे अच्छे परिणाम को हल्के घोस्ट टेक्स्ट में पूरा करता है; `→` उसे स्वीकार करता है।',
          'गलत टाइप की गई फ़िल्टर कुंजी पर “क्या आपका मतलब था” सुझाव मिलता है: `tga:` पर `tag:` सुझाया जाता है।',
        ],
      },
      {
        id: 'filters',
        title: 'आम भाषा की तरह पढ़े जाने वाले फ़िल्टर',
        lead:
          'परिणाम सीमित करने के लिए फ़िल्टर कुंजी और उसके बाद कोई मान टाइप करें। टाइप करते समय Spotlight मान सुझाता है (टैग, टेक्नोलॉजी, प्रकार…) और `↵` सुझाया गया मान जोड़ देता है।',
        table: {
          caption: 'फ़िल्टर के उदाहरण',
          columns: ['फ़िल्टर', 'उदाहरण', 'क्या रखता है'],
          rows: [
            ['प्रकार', '`kind:store`', 'एक ही प्रकार के परिणाम, यहाँ डेटा स्टोर'],
            ['टैग', '`tag:pii`', 'वे ऑब्जेक्ट जिन पर यह टैग लगा है'],
            ['टेक्नोलॉजी', '`tech:kafka`', 'वे ऑब्जेक्ट जो यह टेक्नोलॉजी इस्तेमाल करते हैं'],
            ['स्टेटस, स्कोप, डोमेन', '`status:` `scope:` `domain:`', 'उस फ़ील्ड के मान के अनुसार ऑब्जेक्ट'],
            ['आरेख', '`in:"Payments"`', 'उस आरेख पर रखे गए ऑब्जेक्ट'],
            ['सटीक वाक्यांश', '`"outage detection"`', 'यही वाक्यांश, शब्दशः'],
            ['बाहर रखें', '`-legacy` · `NOT legacy`', 'मेल खाने वाले परिणाम हटा देता है'],
            ['दोनों में से कोई', '`kafka OR rabbitmq`', 'वे परिणाम जो किसी एक से मेल खाते हैं'],
            ['सूची', '`tag:pii,gdpr`', 'एक फ़िल्टर के लिए कई मान'],
          ],
        },
        paragraphs: [
          'फ़िल्टर आपस में और शब्दों के साथ जोड़े जा सकते हैं: `kind:store tag:pii` उन डेटा स्टोर की सूची देता है जिन पर pii टैग है। `has:`, `from:` और `to:` इस सेट को पूरा करते हैं, और फ़्रेंच कुंजियाँ भी काम करती हैं (`genre:`, `etiquette:`, `statut:`…)।',
        ],
      },
      {
        id: 'scopes',
        title: 'स्कोप, सुझाव और सीधे परिणाम तक पहुँचना',
        bullets: [
          '`Tab` एक-एक करके स्कोप बदलता है — आरेख, ऑब्जेक्ट, निर्णय, कार्रवाइयाँ — और `⌘1` से `⌘4` तक कोई एक सीधे चुन लेता है।',
          '`?` सभी दस खोज सुझाव दिखाता है।',
          '`↵` चुने गए ऑब्जेक्ट को उस आरेख पर खोलता है जिस पर वह रखा गया है, पहले से चयनित।',
          '`⌘↵` इसके बजाय उसे मॉडल ऑब्जेक्ट या मॉडल कनेक्शन में दिखाता है, या किसी आरेख को नए टैब में खोलता है।',
          'खाली फ़ील्ड आपके हाल के आइटम दिखाता है, और Spotlight बंद करने पर भी आपकी क्वेरी बनी रहती है।',
        ],
      },
      {
        id: 'actions',
        title: 'कीबोर्ड से कार्रवाइयाँ',
        paragraphs: [
          'Spotlight एक कमांड पैलेट भी है। कीबोर्ड छोड़े बिना सभी आरेख, मॉडल ऑब्जेक्ट, मॉडल कनेक्शन, निर्भरताएँ, मॉडल व्यूअर, निर्णय रिकॉर्ड या ड्राफ़्ट खोलें; आरेख बनाएँ; 2D और 3D के बीच बदलें; इतिहास खोलें; साझा करें; डार्क या लाइट थीम पर जाएँ; या सेटिंग्स खोलें।',
        ],
      },
      {
        id: 'scale',
        title: 'पूरा workspace, चाहे कितना भी बड़ा हो',
        paragraphs: [
          'बड़े workspace में आपके ब्राउज़र के पास मॉडल का केवल एक हिस्सा हो सकता है। तब Spotlight सर्वर के रीड मॉडल से भी पूछता है और उसके जवाब को स्थानीय परिणामों के साथ मिला देता है, ताकि खोज पूरे workspace को कवर करे और क्रम भी वही रहे।',
          'अगर सर्वर जवाब नहीं दे पाता, तो Spotlight आपको बताता है: वह परिणामों को पूरा बताने के बजाय साफ़ कहता है कि वे आंशिक हैं।',
        ],
      },
    ],
  },
  ar: {
    title: 'Spotlight: اعثر على أي شيء في بنيتك المعمارية باستخدام \u2066⌘K\u2069',
    seoTitle: 'Spotlight: البحث الشامل في بنيتك المعمارية وفق C4 | MapleSpire',
    description:
      'Spotlight هو البحث الشامل في MapleSpire: اضغط \u2066⌘K\u2069 للعثور على أي عنصر أو مخطط أو تدفق أو سجل قرار أو إجراء في مساحة عملك، مع مرشّحات وتنقّل بلوحة المفاتيح.',
    eyebrow: 'ميزة جديدة',
    updatedLabel: 'تاريخ النشر',
    updatedDate: '8 نوفمبر 2026',
    isoDate: '2026-11-08',
    summary:
      'أين كانت تلك الخدمة يا ترى؟ في بنية معمارية كبيرة، يختبئ الجواب في واحد من عشرات المخططات والتدفقات وسجلات القرارات. ويعثر عليه Spotlight، البحث الشامل الجديد في MapleSpire، من أي مكان: اضغط \u2066⌘K\u2069، واكتب بضعة أحرف، وها أنت هناك.',
    verdict:
      'باختصار: اختصار واحد ومربع بحث واحد لعناصر النموذج والمجموعات والمخططات والتدفقات وسجلات القرارات والاتصالات والأوامر. يتسامح مع علامات التشكيل والأخطاء الإملائية، وتُقرأ مرشّحاته كلغة عادية، ويغطي مساحة العمل بأكملها.',
    contentsLabel: 'المحتويات',
    backLabel: 'العودة إلى الرئيسية',
    ctaTitle: 'اضغط \u2066⌘K\u2069 في مساحة عملك الخاصة.',
    ctaBody:
      'MapleSpire مجاني ومفتوح المصدر (AGPL-3.0). افتح التطبيق لتجربة Spotlight، أو استضف MapleSpire بنفسك انطلاقًا من المستودع العام.',
    ctaPrimary: 'افتح التطبيق',
    ctaSecondary: 'عرض الشيفرة على GitHub',
    skipLabel: 'الانتقال إلى المحتوى',
    video: {
      set: 'spotlight',
      id: 'video',
      title: 'Spotlight في 71 ثانية',
      body: 'يعرض الفيديو كيفية فتح Spotlight، والبحث المتسامح مع الأخطاء والمرشّحات، والنطاقات، والإجراءات عبر لوحة المفاتيح.',
      play: 'تشغيل الفيديو',
      watchOnYoutube: 'المشاهدة على YouTube',
      otherLanguage: 'Version française',
      captionsNote: 'الفيديو بلا تعليق صوتي، والنصوص الظاهرة على الشاشة باللغة الإنجليزية.',
    },
    sections: [
      {
        id: 'open',
        title: 'افتحه من أي مكان باستخدام \u2066⌘K\u2069',
        paragraphs: [
          'اضغط `⌘K` (أو `Ctrl K` على Windows وLinux) أينما كنت في MapleSpire، أو انقر أيقونة البحث في شريط الأدوات العائم. لم تعد بحاجة إلى تذكّر المخطط أو القائمة التي تضم ما تبحث عنه.',
        ],
      },
      {
        id: 'everything',
        title: 'بحث واحد لكل شيء، مع معاينة',
        paragraphs: [
          'يغطي استعلام واحد عناصر النموذج (الأنظمة والتطبيقات ومخازن البيانات والمكوّنات والجهات الفاعلة)، والمجموعات، والمخططات، والتدفقات، وسجلات القرارات المعمارية (ADR)، والاتصالات، والإجراءات. وتُجمَّع النتائج حسب النوع، وتتصدّرها النتيجة الأفضل.',
          'يتبع الترتيب ما تكتبه: الاسم المطابق تمامًا أولًا، ثم الأسماء التي تبدأ بنصك، ثم الأسماء التي تحتوي على كلمة تبدأ به، وأخيرًا الأسماء التي تتضمنه.',
          'تعرض لوحة المعاينة النتيجة النشطة وحقولها — التقنية والنطاق والحالة والمجال والوسوم والمخططات التي يظهر فيها… — لتتحقق من أنها النتيجة الصحيحة قبل فتحها.',
        ],
      },
      {
        id: 'forgiving',
        title: 'بحث متسامح مع الأخطاء',
        bullets: [
          'لا تهمّ علامات التشكيل ولا حالة الأحرف: كتابة `energie` تعثر على «Énergie».',
          'أثناء الكتابة، يُكمل Spotlight أفضل نتيجة بنص خافت؛ ويقبلها `→`.',
          'إذا أخطأت في كتابة مفتاح مرشّح، يقترح عليك «هل تقصد؟»: فكتابة `tga:` تقترح `tag:`.',
        ],
      },
      {
        id: 'filters',
        title: 'مرشّحات تُقرأ كلغة عادية',
        lead:
          'اكتب مفتاح مرشّح متبوعًا بقيمة لتضييق النتائج. وأثناء الكتابة يقترح Spotlight قيمًا (وسوم، تقنيات، أنواع…) ويضيف `↵` القيمة المقترحة.',
        table: {
          caption: 'أمثلة على المرشّحات',
          columns: ['المرشّح', 'مثال', 'ما يُبقيه'],
          rows: [
            ['النوع', '`kind:store`', 'نوع واحد من النتائج، وهنا مخازن البيانات'],
            ['الوسم', '`tag:pii`', 'العناصر التي تحمل الوسم'],
            ['التقنية', '`tech:kafka`', 'العناصر التي تستخدم التقنية'],
            ['الحالة والنطاق والمجال', '`status:` `scope:` `domain:`', 'العناصر حسب قيمة ذلك الحقل'],
            ['المخطط', '`in:"Payments"`', 'العناصر الموضوعة على ذلك المخطط'],
            ['عبارة مطابقة', '`"outage detection"`', 'تلك العبارة، كلمةً بكلمة'],
            ['الاستبعاد', '`-legacy` · `NOT legacy`', 'يستبعد النتائج المطابقة'],
            ['أحد الخيارين', '`kafka OR rabbitmq`', 'النتائج المطابقة لأحدهما أو للآخر'],
            ['قائمة', '`tag:pii,gdpr`', 'عدة قيم لمرشّح واحد'],
          ],
        },
        paragraphs: [
          'تتجمّع المرشّحات فيما بينها ومع الكلمات: `kind:store tag:pii` يسرد مخازن البيانات الموسومة بـ pii. وتُكمل `has:` و`from:` و`to:` المجموعة، كما تعمل المفاتيح الفرنسية أيضًا (`genre:`، `etiquette:`، `statut:`…).',
        ],
      },
      {
        id: 'scopes',
        title: 'النطاقات والتلميحات والانتقال إلى نتيجة',
        bullets: [
          'ينتقل `Tab` بين النطاقات — المخططات، العناصر، القرارات، الإجراءات — ويختار `⌘1` إلى `⌘4` أحدها مباشرة.',
          'يعرض `?` تلميحات البحث العشرة كلها.',
          'يفتح `↵` العنصر المختار على المخطط الذي يتضمنه، وهو محدَّد مسبقًا.',
          'أما `⌘↵` فيُظهره بدلًا من ذلك في عناصر النموذج أو اتصالات النموذج، أو يفتح مخططًا في علامة تبويب جديدة.',
          'يعرض الحقل الفارغ عناصرك الأخيرة، ويُحتفَظ باستعلامك عند إغلاق Spotlight.',
        ],
      },
      {
        id: 'actions',
        title: 'إجراءات من لوحة المفاتيح',
        paragraphs: [
          'Spotlight لوحة أوامر أيضًا. دون أن تترك لوحة المفاتيح، افتح كل المخططات أو عناصر النموذج أو اتصالات النموذج أو التبعيات أو عارض النموذج أو سجلات القرارات أو المسودات؛ أنشئ مخططًا؛ بدّل بين 2D و3D؛ افتح سجل التعديلات؛ شارك؛ انتقل إلى السمة الداكنة أو الفاتحة؛ أو افتح الإعدادات.',
        ],
      },
      {
        id: 'scale',
        title: 'مساحة العمل كاملةً، مهما كبرت',
        paragraphs: [
          'في مساحة عمل كبيرة، قد لا يحمل متصفحك إلا جزءًا من النموذج. عندها يستعلم Spotlight أيضًا نموذج القراءة على الخادم ويدمج إجابته مع النتائج المحلية، فيغطي البحث مساحة العمل بأكملها، بالترتيب نفسه.',
          'إذا تعذّر على الخادم الإجابة، يخبرك Spotlight بذلك: فهو يشير إلى أن النتائج جزئية بدلًا من عرضها على أنها كاملة.',
        ],
      },
    ],
  },
};
