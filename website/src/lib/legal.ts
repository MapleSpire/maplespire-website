import type { Locale } from './content';

export const LEGAL_VERSION = '2026-08-02';
export const LEGAL_EFFECTIVE_DATE = '2026-08-02';

export type LegalKind = 'termsofservice' | 'privacystatement';

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  eyebrow: string;
  updatedLabel: string;
  updatedDate: string;
  summary: string;
  important?: string;
  sections: LegalSection[];
};

export type LegalLocaleCopy = {
  languageLabel: string;
  home: string;
  terms: string;
  privacy: string;
  contact: string;
  operatorLabel: string;
  operator: string;
  termsDocument: LegalDocument;
  privacyDocument: LegalDocument;
};

const operator = 'Olivier Albertini, individual operator of MapleSpire, Québec, Canada';
const operatorFr = 'Olivier Albertini, exploitant individuel de MapleSpire, Québec, Canada';

export const legalCopy: Record<Locale, LegalLocaleCopy> = {
  fr: {
    languageLabel: 'Langue', home: 'Accueil', terms: 'Conditions d’utilisation', privacy: 'Déclaration de confidentialité', contact: 'Contact',
    operatorLabel: 'Exploitant', operator: operatorFr,
    termsDocument: {
      title: 'Conditions d’utilisation',
      description: 'Conditions applicables à la démo MapleSpire offerte sur app.maplespire.ca.',
      eyebrow: 'MapleSpire · Démo publique', updatedLabel: 'Entrée en vigueur', updatedDate: '2 août 2026',
      summary: 'Ces conditions encadrent l’utilisation de la démo gratuite MapleSpire. La démo sert à l’évaluation et à l’apprentissage; elle n’est pas un service de production.',
      important: 'N’y déposez aucun secret, renseignement sensible ou contenu dont la perte pourrait vous causer un préjudice. Aucun niveau de service ni aucune sauvegarde ne sont garantis.',
      sections: [
        { title: '1. Exploitant et portée du contrat', paragraphs: [
          `Le service disponible sur app.maplespire.ca (le « Service ») est exploité par ${operatorFr}. Vous pouvez écrire à support@maplespire.ca.`,
          'Les présentes conditions forment le contrat entre vous et l’exploitant relativement au Service. La landing page maplespire.ca peut être consultée sans compte; les fonctions de création, de collaboration et de synchronisation relèvent du Service.'
        ]},
        { title: '2. Acceptation, langue et admissibilité', paragraphs: [
          'En créant un compte, en choisissant un fournisseur d’identité ou en continuant vers le Service après que ces conditions vous ont été présentées, vous acceptez ces conditions et reconnaissez avoir pris connaissance de la Déclaration de confidentialité.',
          'Vous devez avoir au moins 18 ans et être légalement en mesure de contracter. Si vous agissez pour une organisation, vous déclarez être autorisé à l’engager. La version française est disponible avant l’acceptation; les autres traductions visent à transmettre le même contenu.'
        ]},
        { title: '3. Une démo gratuite, pas un environnement de production', paragraphs: [
          'Le Service est une démo expérimentale gratuite destinée à essayer la modélisation C4 visuelle, la collaboration, le mode hors ligne et la synchronisation. Il n’est pas conçu pour des charges de production, des obligations réglementaires, des plans de continuité ou des décisions critiques.',
          'Nous pouvons modifier, limiter, interrompre ou réinitialiser la démo. Aucun SLA, temps de disponibilité, délai de réponse, support, capacité, compatibilité ou maintien d’une fonction n’est promis.',
          'Les textes de la landing décrivent le produit de bonne foi, mais peuvent comporter une omission ou devenir désuets pendant l’évolution de la démo. Vérifiez toute caractéristique importante directement dans le Service avant de prendre une décision.'
        ]},
        { title: '4. Votre compte', bullets: [
          'Fournissez des renseignements exacts et protégez l’accès à votre compte et à votre fournisseur d’identité.',
          'Avertissez-nous rapidement à support@maplespire.ca si vous soupçonnez un accès non autorisé.',
          'Vous êtes responsable des actions faites au moyen de votre compte, sauf dans la mesure où la loi prévoit autrement.',
          'L’authentification locale et les fournisseurs tiers, notamment Microsoft Entra ID, peuvent être offerts selon la configuration de la démo.'
        ]},
        { title: '5. Vos contenus et la licence technique', paragraphs: [
          'Vous conservez vos droits sur les diagrammes, commentaires, modèles, fichiers et autres contenus que vous fournissez. Vous nous accordez uniquement une licence non exclusive, mondiale et sans redevance, pendant la durée nécessaire, pour héberger, copier, traiter, synchroniser, afficher et transmettre ces contenus afin d’exploiter, sécuriser et dépanner le Service.',
          'Vous confirmez avoir les droits nécessaires sur vos contenus et être autorisé à y inclure les renseignements personnels concernés. Évitez les secrets commerciaux, identifiants, données de santé, données financières, données de mineurs et autres renseignements sensibles.'
        ]},
        { title: '6. Collaboration et liens de partage', paragraphs: [
          'Le Service peut permettre à des membres d’une organisation de voir ou modifier un espace et de créer des liens de partage ou d’intégration. Toute personne ayant accès à un lien selon les paramètres choisis pourrait consulter le contenu visé. Vous êtes responsable des destinataires, permissions et révocations que vous configurez.'
        ]},
        { title: '7. Utilisations interdites', bullets: [
          'Utiliser le Service contrairement à la loi, aux droits d’autrui ou à une obligation de confidentialité.',
          'Téléverser du code malveillant, contourner une mesure de sécurité, sonder le Service sans autorisation ou perturber son fonctionnement.',
          'Usurper une identité, accéder au compte ou au contenu d’autrui, ou automatiser abusivement les requêtes.',
          'Publier du contenu illicite, haineux, diffamatoire, trompeur ou contrefaisant.',
          'Revendre la démo ou la présenter comme un service de production garanti.'
        ]},
        { title: '8. Services tiers et fonctions d’IA facultatives', paragraphs: [
          'L’authentification, la livraison de courriels, la diffusion du site et certaines fonctions peuvent dépendre de Microsoft, Cloudflare, AWS ou d’autres fournisseurs décrits dans la Déclaration de confidentialité et soumis à leurs propres conditions.',
          'Les liens externes sont fournis pour aider l’utilisateur. En les suivant, vous quittez MapleSpire; le tiers devient responsable de son site, de ses contenus et de ses pratiques de confidentialité. Un lien ne signifie pas que nous garantissons ou approuvons tout son contenu.',
          'Si une organisation configure une fonction d’IA avec sa propre clé ou son propre fournisseur, les requêtes et le contexte qu’elle choisit d’envoyer sont transmis à ce fournisseur. L’organisation est responsable de son choix, de sa clé, de ses autorisations et des conditions applicables. Les résultats d’IA peuvent être inexacts et doivent être vérifiés par une personne compétente.'
        ]},
        { title: '9. Conservation, export et perte de données', paragraphs: [
          'La démo peut être réinitialisée et des comptes ou contenus peuvent être suspendus, corrompus ou supprimés. Aucune sauvegarde ni restauration n’est garantie. Conservez vos propres copies et exportez régulièrement ce qui compte pour vous.',
          'Vous pouvez demander l’accès, la correction, la désactivation ou la suppression de renseignements personnels à support@maplespire.ca. Certaines traces de sécurité, obligations légales ou sauvegardes résiduelles, s’il en existe, peuvent être conservées pendant une période limitée comme l’explique la Déclaration de confidentialité.'
        ]},
        { title: '10. Propriété de MapleSpire et rétroaction', paragraphs: [
          'Sous réserve de vos contenus, l’exploitant et ses concédants conservent leurs droits sur le Service, le design, la marque et les éléments logiciels. La publication future de code source n’est pas une promesse de date, de portée ou de licence. Seuls un dépôt public précis et son fichier LICENSE détermineraient les droits open source.',
          'Les textes, captures, photographies, illustrations, logos et autres médias de maplespire.ca ne peuvent pas être réutilisés commercialement sans autorisation, sauf licence ou exception légale indiquée. Les marques et contenus de tiers demeurent la propriété de leurs titulaires.',
          'Vous pouvez nous transmettre volontairement des suggestions. Vous nous autorisez alors à les utiliser sans obligation de rémunération, sans nous transférer vos contenus ni vos renseignements personnels.'
        ]},
        { title: '11. Suspension et fin', paragraphs: [
          'Nous pouvons suspendre ou fermer un compte pour protéger le Service ou des tiers, répondre à une obligation légale, prévenir un abus ou faire respecter ces conditions. Lorsque raisonnablement possible, nous donnerons un avis et une occasion d’exporter les contenus. Vous pouvez cesser d’utiliser le Service en tout temps et demander la fermeture du compte.'
        ]},
        { title: '12. Garanties et responsabilité', paragraphs: [
          'Dans la mesure permise par la loi, le Service est fourni « tel quel » et « selon disponibilité », sans garantie implicite de qualité marchande, d’adaptation à un usage particulier, de non-contrefaçon, d’exactitude, de sécurité absolue ou de conservation des données.',
          'Dans la mesure permise par la loi, l’exploitant n’est pas responsable des dommages indirects, spéciaux, consécutifs, exemplaires, de la perte de profits ou de la perte de données. Pour les autres réclamations liées au Service, sa responsabilité cumulée est limitée au plus élevé de 100 $ CA ou du montant que vous avez payé pour le Service au cours des 12 mois précédents.',
          'Ces exclusions et limites ne s’appliquent pas lorsqu’elles sont interdites, notamment à la faute intentionnelle ou lourde, au préjudice corporel ou moral, ni aux droits impératifs des consommateurs. Rien dans ces conditions ne réduit un droit auquel vous ne pouvez légalement renoncer.'
        ]},
        { title: '13. Modifications', paragraphs: [
          'Nous pouvons mettre ces conditions à jour pour refléter le Service ou la loi. La date et la version sont affichées sur cette page. Pour une modification importante, nous fournirons un avis raisonnable et demanderons une nouvelle acceptation lorsque la nature du changement ou la loi l’exige. Une version antérieure peut être demandée à support@maplespire.ca.'
        ]},
        { title: '14. Droit applicable et contact', paragraphs: [
          'Ces conditions sont régies par les lois du Québec et les lois fédérales du Canada applicables, sans priver un consommateur des protections impératives de son lieu de résidence ni limiter les recours qui ne peuvent être exclus. Si une disposition est invalide, les autres demeurent en vigueur.',
          'Questions, signalements ou avis : support@maplespire.ca.'
        ]}
      ]
    },
    privacyDocument: {
      title: 'Déclaration de confidentialité',
      description: 'Comment MapleSpire recueille, utilise, communique, conserve et protège les renseignements personnels.',
      eyebrow: 'Vie privée · Transparence', updatedLabel: 'Entrée en vigueur', updatedDate: '2 août 2026',
      summary: 'Cette déclaration explique les pratiques de maplespire.ca, du formulaire de contact et de la démo app.maplespire.ca. MapleSpire ne vend pas vos renseignements et n’utilise actuellement ni publicité, ni analyse comportementale, ni profilage.',
      important: 'La démo n’est pas destinée aux renseignements sensibles ou confidentiels. Le stockage local hors ligne peut conserver des données sur votre appareil jusqu’à ce que vous les effaciez dans votre navigateur.',
      sections: [
        { title: '1. Responsable et portée', paragraphs: [
          `${operatorFr} est responsable des renseignements personnels sous son contrôle. Le titre public du responsable de la protection des renseignements personnels est « Responsable de la protection des renseignements personnels ». Contact : support@maplespire.ca.`,
          'Cette déclaration vise la landing page, son formulaire de contact, la démo, les comptes, les espaces d’architecture, les fonctions collaboratives, les liens de partage, le support et les courriels transactionnels.'
        ]},
        { title: '2. Renseignements recueillis et finalités', bullets: [
          'Compte : adresse courriel, nom ou pseudonyme, préférence linguistique, identifiant du fournisseur d’identité et appartenance à une organisation — pour créer le compte, authentifier, autoriser et personnaliser l’interface.',
          'Compte local : mot de passe sous forme de hachage irréversible, état et jetons hachés de vérification du courriel — pour sécuriser la connexion.',
          'Contenu du Service : diagrammes, objets, relations, commentaires, décisions, fichiers, permissions, invitations et historique de collaboration — pour enregistrer, synchroniser, partager et afficher votre travail.',
          'Contact et support : nom, courriel, organisation facultative, sujet, message, consentement et échanges — pour répondre, envoyer un accusé de réception et résoudre la demande.',
          'Données techniques : adresse IP, date, route demandée, événements de sécurité, erreurs, type d’appareil ou de navigateur et identifiants de session — pour livrer, protéger, diagnostiquer et prévenir les abus.',
          'Configuration d’IA facultative : fournisseur, modèle, adresse de service et clé d’API chiffrée; les instructions et le contexte choisis sont transmis au fournisseur configuré uniquement lorsqu’une fonction d’IA est utilisée.'
        ]},
        { title: '3. Sources et consentement', paragraphs: [
          'Nous recueillons ces renseignements directement de vous, de votre organisation, de votre navigateur ou de votre fournisseur d’identité choisi. Les traitements nécessaires à la création du compte, à la sécurité, à la synchronisation et au support sont inhérents au Service demandé. Les usages facultatifs futurs feront l’objet d’un choix séparé lorsque requis.',
          'L’adresse courriel et les données d’authentification sont obligatoires pour un compte; sans elles, la connexion n’est pas possible. Dans le formulaire de contact, le nom, le courriel, le sujet, le message et la confirmation de traitement sont obligatoires pour recevoir une réponse; l’organisation est facultative. Le contenu d’architecture est volontaire, mais certaines fonctions ne peuvent pas fonctionner sans le contenu que vous choisissez de créer ou partager.',
          'Vous pouvez retirer un consentement facultatif, sous réserve d’obligations légales et des conséquences expliquées au moment du retrait. Le retrait des traitements essentiels peut nécessiter la fermeture du compte.'
        ]},
        { title: '4. Cookies et stockage sur l’appareil', paragraphs: [
          'La landing page mémorise seulement la langue et le thème dans le stockage local. La démo utilise un cookie de session HTTP-only essentiel, normalement valable au plus 30 jours, ainsi qu’un cookie OIDC essentiel de 10 minutes pendant une connexion externe. Les fonctions hors ligne utilisent IndexedDB et le stockage local pour conserver le modèle, les caches, la langue, le thème et les préférences sur votre appareil.',
          'Ces mécanismes sont nécessaires au service demandé ou à une préférence explicite; ils ne servent pas à la publicité ou au profilage. Aucun bandeau publicitaire n’est donc affiché actuellement. Si nous ajoutons une analyse, une mesure comportementale ou une technologie non essentielle, elle sera désactivée par défaut jusqu’à un consentement valide et révocable.'
        ]},
        { title: '5. Communications', paragraphs: [
          'Nous envoyons les messages nécessaires au compte ou à la demande : vérification du courriel, invitation, sécurité, support et accusé de réception. Nous n’inscrivons pas automatiquement les utilisateurs à des messages promotionnels. Toute infolettre ou communication commerciale facultative aura son propre consentement et un mécanisme de désabonnement.'
        ]},
        { title: '6. Fournisseurs et communications', paragraphs: [
          'Nous limitons l’accès aux personnes et fournisseurs qui en ont besoin pour fournir ou protéger le Service. Les catégories actuelles comprennent Cloudflare (DNS, réseau, tunnel et sécurité), Amazon Web Services (CloudFront, formulaire de contact, file d’attente et SES), Microsoft Entra ID ou Google si vous choisissez ces connexions, les fournisseurs de courriel, et le fournisseur d’IA choisi par votre organisation.',
          'Nous pouvons aussi communiquer des renseignements si la loi l’exige, pour protéger les droits et la sécurité, enquêter sur une fraude ou une atteinte, ou dans le cadre d’une réorganisation avec des garanties appropriées. Nous ne vendons ni ne louons vos renseignements.'
        ]},
        { title: '7. Lieu de traitement et transferts', paragraphs: [
          'Les données principales de la démo sont actuellement exploitées sur une infrastructure contrôlée par l’exploitant au Canada. Cloudflare, AWS, Microsoft, Google ou un fournisseur d’IA choisi peuvent traiter certains renseignements au Québec, ailleurs au Canada, aux États-Unis ou dans d’autres pays où ils opèrent. Les lois locales peuvent alors permettre l’accès par les autorités.',
          'Avant un nouveau transfert hors Québec, nous évaluons les facteurs relatifs à la vie privée et utilisons des engagements contractuels et des mesures proportionnés aux risques.'
        ]},
        { title: '8. Conservation et destruction', bullets: [
          'Compte et contenu : pendant l’utilisation du compte, puis jusqu’à la fermeture, la réinitialisation de la démo ou l’exécution d’une demande valide, sous réserve des obligations légales et de sécurité.',
          'Jetons de vérification : valables 24 heures; les valeurs brutes ne sont pas conservées et les enregistrements expirés sont supprimés lors des opérations d’entretien.',
          'Session : le cookie normal expire au plus tard après 30 jours et le cookie OIDC après 10 minutes ou au retour du fournisseur.',
          'Formulaire de contact et échanges de support : pendant le traitement et généralement au plus 24 mois après le dernier échange, sauf litige ou obligation légale.',
          'Journaux techniques ordinaires : ils sont limités et font l’objet d’une rotation; les événements de sécurité, preuves d’acceptation, incidents et pistes d’audit peuvent être conservés plus longtemps lorsque nécessaire pour la sécurité, la reddition de comptes ou la loi.',
          'Stockage hors ligne : jusqu’à ce que vous effaciez les données du site dans votre navigateur ou supprimiez le contenu synchronisé.'
        ]},
        { title: '9. Sécurité et incidents', paragraphs: [
          'Nous utilisons des mesures adaptées à une démo, notamment le chiffrement en transit, des cookies HTTP-only, le hachage des mots de passe, le chiffrement des clés d’IA, des contrôles d’accès, des limites de requêtes et des journaux d’audit. Aucune mesure ne garantit une sécurité absolue.',
          'Nous tenons un registre des incidents de confidentialité et évaluons leur risque. Nous aviserons les autorités et les personnes concernées lorsque la loi l’exige. Signalez rapidement une atteinte soupçonnée à support@maplespire.ca.'
        ]},
        { title: '10. Vos droits', paragraphs: [
          'Selon la loi applicable, vous pouvez demander de connaître les renseignements détenus et leur usage, d’y accéder, de les rectifier, de retirer un consentement facultatif, d’obtenir la portabilité de renseignements admissibles, ou d’en demander la suppression. Vous pouvez aussi demander des informations sur la durée de conservation et les personnes ayant accès.',
          'Écrivez à support@maplespire.ca avec votre nom, le courriel du compte, la nature de la demande et les faits pertinents. Nous traitons la demande ou la plainte de façon confidentielle et pouvons vérifier votre identité. Nous répondrons dans les délais légaux, normalement dans les 30 jours prévus au Québec, ou expliquerons tout refus permis. Vous pouvez porter plainte au responsable, à la Commission d’accès à l’information du Québec ou au Commissariat à la protection de la vie privée du Canada.'
        ]},
        { title: '11. Mineurs, décisions automatisées et profilage', paragraphs: [
          'Le Service est réservé aux personnes de 18 ans ou plus et nous ne cherchons pas à recueillir sciemment les renseignements de mineurs. Communiquez avec nous si vous croyez qu’un mineur a créé un compte.',
          'MapleSpire ne collecte actuellement aucune géolocalisation précise, ne prend aucune décision ayant des effets juridiques ou importants uniquement au moyen d’un traitement automatisé et ne fait aucun profilage publicitaire. Les suggestions d’IA, si activées, demeurent des outils que l’utilisateur doit vérifier.'
        ]},
        { title: '12. Changements et questions', paragraphs: [
          'Nous publierons la date de toute mise à jour. Si un changement important crée une nouvelle finalité, une nouvelle communication ou un nouveau risque, nous fournirons un avis visible et demanderons un nouveau consentement lorsque requis.',
          'Questions, demandes ou plaintes : Responsable de la protection des renseignements personnels, support@maplespire.ca.'
        ]}
      ]
    }
  },
  en: {
    languageLabel: 'Language', home: 'Home', terms: 'Terms of Use', privacy: 'Privacy Statement', contact: 'Contact',
    operatorLabel: 'Operator', operator,
    termsDocument: {
      title: 'Terms of Use', description: 'Terms governing the MapleSpire demo available at app.maplespire.ca.',
      eyebrow: 'MapleSpire · Public demo', updatedLabel: 'Effective', updatedDate: 'August 2, 2026',
      summary: 'These terms govern the free MapleSpire demo. The demo is for evaluation and learning; it is not a production service.',
      important: 'Do not put secrets, sensitive information, or content whose loss could harm you in the demo. No service level or backup is guaranteed.',
      sections: [
        { title: '1. Operator and scope', paragraphs: [`The service at app.maplespire.ca (the “Service”) is operated by ${operator}. Contact: support@maplespire.ca.`, 'These Terms are the agreement between you and the operator for the Service. The public maplespire.ca website may be viewed without an account; creation, collaboration, and synchronization features are part of the Service.'] },
        { title: '2. Acceptance, language, and eligibility', paragraphs: ['By creating an account, selecting an identity provider, or continuing to the Service after these Terms are presented, you accept these Terms and acknowledge the Privacy Statement.', 'You must be at least 18 and legally able to contract. If you act for an organization, you represent that you may bind it. A French version is available before acceptance; the other translations are intended to convey the same content.'] },
        { title: '3. Free demo—not production', paragraphs: ['The Service is a free experimental demo for trying visual C4 modelling, collaboration, offline work, and synchronization. It is not designed for production workloads, regulatory duties, business continuity, or critical decisions.', 'We may change, limit, interrupt, or reset the demo. No SLA, uptime, response time, support level, capacity, compatibility, or continued feature is promised.', 'The landing site describes the product in good faith, but information may contain an omission or become outdated as the demo changes. Confirm any important capability in the Service before relying on it.'] },
        { title: '4. Your account', bullets: ['Provide accurate details and secure your account and identity provider.', 'Notify support@maplespire.ca promptly if you suspect unauthorized access.', 'You are responsible for activity through your account except where law provides otherwise.', 'Local authentication and third-party providers, including Microsoft Entra ID, may be offered depending on demo configuration.'] },
        { title: '5. Your content and the technical licence', paragraphs: ['You keep your rights in diagrams, comments, models, files, and other content you provide. You grant us only a non-exclusive, worldwide, royalty-free licence, for as long as needed, to host, copy, process, synchronize, display, and transmit that content to operate, secure, and troubleshoot the Service.', 'You confirm that you have the needed rights and authority for any personal information in your content. Do not include trade secrets, credentials, health or financial data, minors’ data, or other sensitive information.'] },
        { title: '6. Collaboration and share links', paragraphs: ['The Service may let organization members view or edit a workspace and create sharing or embed links. Anyone with access under the chosen settings may be able to view the linked content. You are responsible for recipients, permissions, and revocations you configure.'] },
        { title: '7. Prohibited use', bullets: ['Use that violates law, another person’s rights, or a confidentiality duty.', 'Malware, bypassing security, unauthorized probing, or disrupting the Service.', 'Impersonation, access to another account or content, or abusive automation.', 'Illegal, hateful, defamatory, deceptive, or infringing content.', 'Reselling the demo or representing it as a guaranteed production service.'] },
        { title: '8. Third parties and optional AI', paragraphs: ['Authentication, email delivery, site distribution, and some functions may rely on Microsoft, Cloudflare, AWS, or other providers described in the Privacy Statement and governed by their own terms.', 'External links are provided for convenience. After you follow one, the third party is responsible for its site, content, and privacy practices; a link is not a guarantee or endorsement of all its content.', 'If an organization configures AI with its own key or provider, requests and selected context are sent to that provider. The organization is responsible for the provider, key, permissions, and applicable terms. AI output may be wrong and must be reviewed by a qualified person.'] },
        { title: '9. Retention, export, and data loss', paragraphs: ['The demo may be reset, and accounts or content may be suspended, corrupted, or deleted. No backup or restoration is guaranteed. Keep your own copies and regularly export anything important.', 'You may request access, correction, deactivation, or deletion of personal information at support@maplespire.ca. Limited security records, legal records, or residual backups, if any, may remain as described in the Privacy Statement.'] },
        { title: '10. MapleSpire intellectual property and feedback', paragraphs: ['Except for your content, the operator and licensors retain rights in the Service, design, marks, and software. Future source publication is not a promise of date, scope, or licence. Only a specific public repository and its LICENSE file would grant open-source rights.', 'Text, screenshots, photographs, illustrations, logos, and other media on maplespire.ca may not be commercially reused without permission unless a stated licence or legal exception applies. Third-party marks and content remain their owners’ property.', 'You may voluntarily send feedback. You permit us to use it without payment, but this does not transfer your content or personal information.'] },
        { title: '11. Suspension and termination', paragraphs: ['We may suspend or close an account to protect the Service or others, comply with law, prevent abuse, or enforce these Terms. Where reasonably possible, we will give notice and an opportunity to export content. You may stop using the Service and request account closure at any time.'] },
        { title: '12. Warranties and liability', paragraphs: ['To the extent allowed by law, the Service is provided “as is” and “as available,” without implied warranties of merchantability, fitness for a particular purpose, non-infringement, accuracy, absolute security, or data retention.', 'To the extent allowed by law, the operator is not liable for indirect, special, consequential, or exemplary damages, lost profits, or lost data. For other Service claims, aggregate liability is limited to the greater of CA$100 or the amount you paid for the Service in the previous 12 months.', 'These exclusions and limits do not apply where prohibited, including intentional or gross fault, bodily or moral injury, or mandatory consumer rights. Nothing limits a right you cannot legally waive.'] },
        { title: '13. Changes', paragraphs: ['We may update these Terms to reflect the Service or law. The date and version appear on this page. For a material change, we will give reasonable notice and request acceptance again when the change or law requires it. A prior version may be requested from support@maplespire.ca.'] },
        { title: '14. Governing law and contact', paragraphs: ['These Terms are governed by Québec law and applicable federal Canadian law, without removing mandatory consumer protections where you live or restricting remedies that cannot be excluded. If a provision is invalid, the rest remains effective.', 'Questions, reports, or notices: support@maplespire.ca.'] }
      ]
    },
    privacyDocument: {
      title: 'Privacy Statement', description: 'How MapleSpire collects, uses, discloses, retains, and protects personal information.',
      eyebrow: 'Privacy · Transparency', updatedLabel: 'Effective', updatedDate: 'August 2, 2026',
      summary: 'This statement covers maplespire.ca, its contact form, and the app.maplespire.ca demo. MapleSpire does not sell personal information and currently uses no advertising, behavioural analytics, or profiling.',
      important: 'The demo is not intended for sensitive or confidential information. Offline browser storage may keep data on your device until you clear the site’s data.',
      sections: [
        { title: '1. Accountable person and scope', paragraphs: [`${operator} is accountable for personal information under his control. The published role of the Privacy Officer is “Privacy Officer.” Contact: support@maplespire.ca.`, 'This Statement covers the landing site, contact form, demo, accounts, architecture workspaces, collaboration, share links, support, and transactional email.'] },
        { title: '2. Information and purposes', bullets: ['Account: email, name or alias, language, identity-provider identifier, and organization membership—to create, authenticate, authorize, and personalize the account.', 'Local account: irreversibly hashed password, email-verification status, and hashed verification tokens—to secure sign-in.', 'Service content: diagrams, objects, relationships, comments, decisions, files, permissions, invitations, and collaboration history—to save, synchronize, share, and display work.', 'Contact and support: name, email, optional organization, subject, message, consent, and correspondence—to respond, send a receipt, and resolve the request.', 'Technical information: IP address, time, requested route, security events, errors, device or browser type, and session identifiers—to deliver, secure, diagnose, and prevent abuse.', 'Optional AI configuration: provider, model, service address, and encrypted API key; selected prompts and context are sent to the configured provider only when an AI feature is used.'] },
        { title: '3. Sources and consent', paragraphs: ['We collect information from you, your organization, your browser, or the identity provider you choose. Processing needed for account creation, security, synchronization, and support is integral to the requested Service. Optional future uses will have a separate choice where required.', 'An email address and authentication data are required for an account; without them, sign-in is unavailable. In the contact form, name, email, subject, message, and the processing confirmation are required to receive a response; organization is optional. Architecture content is voluntary, but features cannot operate without the content you choose to create or share.', 'You may withdraw optional consent, subject to legal limits and consequences explained at withdrawal. Withdrawing processing essential to the Service may require closing the account.'] },
        { title: '4. Cookies and device storage', paragraphs: ['The landing site stores only language and theme preferences in local storage. The demo uses an essential HTTP-only session cookie, normally lasting no more than 30 days, and a 10-minute essential OIDC cookie during external sign-in. Offline features use IndexedDB and local storage for models, caches, language, theme, and preferences on your device.', 'These are necessary for the requested service or an explicit preference, not advertising or profiling. We therefore do not currently show an advertising consent banner. If we add analytics, behavioural measurement, or other non-essential technology, it will be off by default until valid, revocable consent.'] },
        { title: '5. Communications', paragraphs: ['We send messages necessary for an account or request: email verification, invitations, security, support, and receipts. Users are not automatically subscribed to promotions. Any optional newsletter or commercial message will have separate consent and an unsubscribe method.'] },
        { title: '6. Providers and disclosures', paragraphs: ['Access is limited to people and providers that need it to provide or protect the Service. Current categories include Cloudflare (DNS, network, tunnel, security), Amazon Web Services (CloudFront, contact handling, queue, SES), Microsoft Entra ID or Google when chosen for sign-in, email providers, and an AI provider selected by your organization.', 'We may also disclose information when law requires, to protect rights and safety, investigate fraud or an incident, or during a reorganization with appropriate safeguards. We do not sell or rent personal information.'] },
        { title: '7. Processing location and transfers', paragraphs: ['Core demo data is currently operated on infrastructure controlled by the operator in Canada. Cloudflare, AWS, Microsoft, Google, or a chosen AI provider may process some information in Québec, elsewhere in Canada, the United States, or other countries where they operate. Local law may permit government access.', 'Before a new transfer outside Québec, we assess privacy factors and use contractual commitments and safeguards proportionate to risk.'] },
        { title: '8. Retention and destruction', bullets: ['Account and content: while the account is used, then until closure, a demo reset, or completion of a valid request, subject to legal and security needs.', 'Verification tokens: valid for 24 hours; raw values are not stored and expired records are removed during maintenance.', 'Session: the normal cookie expires within 30 days; the OIDC cookie within 10 minutes or on return.', 'Contact and support correspondence: during handling and generally no more than 24 months after the last exchange, unless needed for a dispute or law.', 'Ordinary technical logs are bounded and rotated; security events, acceptance evidence, incidents, and audit trails may be retained longer where needed for security, accountability, or law.', 'Offline storage: until you clear site data in your browser or delete synchronized content.'] },
        { title: '9. Security and incidents', paragraphs: ['Safeguards appropriate to a demo include encryption in transit, HTTP-only cookies, password hashing, AI-key encryption, access controls, rate limits, and audit records. No safeguard offers absolute security.', 'We maintain an incident register and assess risk. We notify regulators and affected people where required. Report a suspected incident promptly to support@maplespire.ca.'] },
        { title: '10. Your rights', paragraphs: ['Depending on applicable law, you may ask what information is held and how it is used, access or correct it, withdraw optional consent, obtain portability of eligible information, or request deletion. You may also ask about retention and who can access it.', 'Email support@maplespire.ca with your name, account email, the request, and relevant facts. We handle requests and complaints confidentially and may verify identity. We respond within legal time limits—normally the 30 days provided in Québec—or explain a permitted refusal. You may complain to the Privacy Officer, Québec’s Commission d’accès à l’information, or the Office of the Privacy Commissioner of Canada.'] },
        { title: '11. Minors, automated decisions, and profiling', paragraphs: ['The Service is for people 18 or older and we do not knowingly seek minors’ information. Contact us if you believe a minor created an account.', 'MapleSpire currently collects no precise geolocation, makes no decision with legal or similarly important effects solely by automated processing, and performs no advertising profiling. AI suggestions, if enabled, remain tools that users must review.'] },
        { title: '12. Changes and questions', paragraphs: ['We post the update date. If a material change introduces a new purpose, disclosure, or risk, we provide prominent notice and obtain new consent where required.', 'Questions, requests, or complaints: Privacy Officer, support@maplespire.ca.'] }
      ]
    }
  },
  zh: {
    languageLabel: '语言', home: '首页', terms: '使用条款', privacy: '隐私声明', contact: '联系', operatorLabel: '运营者', operator: 'Olivier Albertini，MapleSpire 个体运营者，加拿大魁北克省',
    termsDocument: {
      title: '使用条款', description: '适用于 app.maplespire.ca MapleSpire 演示服务的条款。', eyebrow: 'MapleSpire · 公共演示', updatedLabel: '生效日期', updatedDate: '2026年8月2日',
      summary: '本条款适用于免费的 MapleSpire 演示。该演示仅用于评估和学习，不是生产服务。', important: '请勿提交秘密、敏感信息或丢失后可能造成损害的内容。我们不保证服务等级、备份或恢复。',
      sections: [
        { title: '1. 运营者与范围', paragraphs: ['app.maplespire.ca 的服务（“服务”）由 Olivier Albertini（MapleSpire 个体运营者，加拿大魁北克省）运营。联系邮箱：support@maplespire.ca。', '本条款构成您与运营者之间关于服务的协议。maplespire.ca 可无需账户访问；创建、协作和同步功能属于本服务。'] },
        { title: '2. 接受、语言与资格', paragraphs: ['创建账户、选择身份提供商或在看到本条款后继续使用，即表示您接受本条款并确认已阅读隐私声明。', '您必须年满18岁并具有缔约能力。代表组织使用时，您保证有权使该组织受约束。魁北克用户可在接受前获得法文版本；其他译文旨在表达相同内容。'] },
        { title: '3. 免费演示，不适用于生产', paragraphs: ['本服务是免费的实验性演示，用于体验可视化 C4 建模、协作、离线工作和同步。不得用于生产负载、合规义务、业务连续性或关键决策。', '我们可修改、限制、中断或重置演示，不承诺 SLA、可用性、响应时间、支持、容量或功能持续性。'] },
        { title: '4. 账户与内容', paragraphs: ['请提供准确信息，妥善保护账户，并在怀疑未经授权访问时立即联系 support@maplespire.ca。', '您保留对图表、评论、文件和其他内容的权利；仅授予我们为运行、保护和排查服务所必需的非独占、全球、免版税许可，包括托管、复制、处理、同步、显示和传输。请勿放入商业秘密、凭据、健康/财务数据、未成年人数据或其他敏感信息。'] },
        { title: '5. 协作、分享与禁用行为', bullets: ['您负责自己配置的收件人、权限、公开或嵌入链接以及撤销。', '不得违法、侵犯他人权利或违反保密义务。', '不得上传恶意代码、绕过安全措施、未经授权测试、冒充他人或干扰服务。', '不得转售演示或将其描述为有保证的生产服务。'] },
        { title: '6. 第三方与可选 AI', paragraphs: ['身份验证、邮件、网站分发及部分功能可能依赖 Microsoft、Cloudflare、AWS 等第三方及其条款。', '组织配置自己的 AI 提供商或密钥时，所选提示和上下文会发送给该提供商。组织负责选择、授权与核查；AI 输出可能错误。'] },
        { title: '7. 数据丢失与服务终止', paragraphs: ['演示可能被重置，账户或内容可能暂停、损坏或删除。我们不保证备份或恢复。请自行保存并导出重要内容。', '我们可为保护服务、遵守法律或制止滥用而暂停账户；在合理可行时会通知并提供导出机会。您可随时停止使用并申请关闭账户。'] },
        { title: '8. 知识产权', paragraphs: ['除您的内容外，运营者及许可方保留服务、设计、商标和软件的权利。未来公开源代码不代表对日期、范围或许可证的承诺；只有具体公开仓库中的 LICENSE 文件授予开源权利。'] },
        { title: '9. 保证与责任', paragraphs: ['在法律允许范围内，服务按“现状”和“可用状态”提供，不保证适销性、特定用途适用性、不侵权、准确性、绝对安全或数据保存。', '在法律允许范围内，不承担间接、特殊、后果性、示范性损害、利润或数据损失。其他索赔的累计责任上限为 100 加元或您过去12个月支付金额中的较高者。本限制不适用于法律禁止排除的故意或重大过错、人身/精神损害或强制性消费者权利。'] },
        { title: '10. 变更、适用法律与联系', paragraphs: ['重大变更会提供合理通知，并在法律或变更性质要求时重新征得接受。', '本条款适用魁北克法律及加拿大联邦适用法律，但不排除您所在地的强制性消费者保护。问题或通知：support@maplespire.ca。'] }
      ]
    },
    privacyDocument: {
      title: '隐私声明', description: 'MapleSpire 如何收集、使用、披露、保留和保护个人信息。', eyebrow: '隐私 · 透明', updatedLabel: '生效日期', updatedDate: '2026年8月2日',
      summary: '本声明适用于 maplespire.ca、联系表单及 app.maplespire.ca 演示。MapleSpire 不出售个人信息，目前不使用广告、行为分析或画像。', important: '演示不适合敏感或机密信息。离线浏览器存储会在您的设备上保留数据，直至您清除该网站的数据。',
      sections: [
        { title: '1. 负责人和范围', paragraphs: ['Olivier Albertini（MapleSpire 个体运营者，加拿大魁北克省）对其控制的个人信息负责。隐私负责人：Privacy Officer；邮箱 support@maplespire.ca。', '本声明涵盖落地页、联系表单、演示、账户、架构空间、协作、分享链接、支持及事务性邮件。'] },
        { title: '2. 收集的信息与用途', bullets: ['账户：邮箱、姓名或别名、语言、身份提供商标识和组织成员关系，用于创建、验证、授权及个性化账户。', '本地账户：不可逆密码哈希、邮箱验证状态及哈希验证令牌，用于安全登录。', '服务内容：图表、对象、关系、评论、决策、文件、权限、邀请和协作历史，用于保存、同步、分享和显示。', '联系与支持：姓名、邮箱、可选组织、主题、消息、同意记录及往来，用于答复、发送回执和处理请求。', '技术信息：IP、时间、请求路径、安全事件、错误、设备/浏览器类型及会话标识，用于交付、安全、诊断和防滥用。', '可选 AI：提供商、模型、服务地址和加密 API 密钥；仅在使用 AI 时把所选提示与上下文发给已配置提供商。'] },
        { title: '3. 来源、同意与通信', paragraphs: ['信息来自您、您的组织、浏览器或您选择的身份提供商。账户、安全、同步和支持所必需的处理是所请求服务的一部分；未来非必要用途会在需要时提供独立选择。', '仅发送账户验证、邀请、安全、支持和回执等必要消息；不会自动订阅推广。商业邮件将另行征得同意并提供退订。'] },
        { title: '4. Cookie 与设备存储', paragraphs: ['落地页仅在本地存储语言和主题。演示使用最长约30天的必要 HTTP-only 会话 cookie，以及外部登录期间10分钟的必要 OIDC cookie。离线功能使用 IndexedDB 和本地存储保存模型、缓存与偏好。', '这些机制不用于广告或画像，因此目前无需广告同意横幅。未来任何非必要分析或追踪将默认关闭，直到取得可撤回的有效同意。'] },
        { title: '5. 提供商、披露与跨境', paragraphs: ['当前类别包括 Cloudflare（DNS、网络、隧道、安全）、AWS（CloudFront、联系处理、队列、SES）、您选择的 Microsoft Entra ID 或 Google、邮件提供商及组织选择的 AI 提供商。我们不出售或出租个人信息。', '核心演示数据目前在运营者控制的加拿大基础设施上运行。上述提供商可能在魁北克、加拿大其他地区、美国或其运营国家处理部分信息。新增加的魁北克境外传输会先评估隐私风险并采用相应保障。'] },
        { title: '6. 保留', bullets: ['账户和内容：账户使用期间，之后直至关闭、演示重置或有效请求处理完成，但法律和安全需要除外。', '验证令牌：有效24小时；不保存原始值，过期记录在维护时删除。', '会话：普通 cookie 最长30天，OIDC cookie 10分钟或回调时清除。', '联系和支持：通常至最后一次交流后不超过24个月。', '普通技术日志：通常30天；安全、同意、事件和审计记录在必要时可更久。', '离线数据：直至您清除浏览器网站数据或删除同步内容。'] },
        { title: '7. 安全与事件', paragraphs: ['措施包括传输加密、HTTP-only cookie、密码哈希、AI 密钥加密、访问控制、速率限制和审计记录，但不存在绝对安全。我们维护隐私事件记录，并依法通知监管机构和受影响个人。'] },
        { title: '8. 您的权利', paragraphs: ['依适用法律，您可申请知悉、访问、更正、撤回可选同意、取得符合条件的数据可携带副本或删除。联系 support@maplespire.ca；我们可能核验身份，并通常在魁北克规定的30天内答复。', '您可向隐私负责人、魁北克信息获取委员会或加拿大隐私专员办公室投诉。'] },
        { title: '9. 未成年人、自动决策与变更', paragraphs: ['服务仅面向18岁以上人士，不会故意收集未成年人信息。目前不基于纯自动处理作出具有法律或类似重大影响的决定，也不进行广告画像。', '重大隐私变更会显著通知，并在法律要求时重新取得同意。问题或投诉：Privacy Officer，support@maplespire.ca。'] }
      ]
    }
  },
  ja: {
    languageLabel: '言語', home: 'ホーム', terms: '利用規約', privacy: 'プライバシー声明', contact: 'お問い合わせ', operatorLabel: '運営者', operator: 'Olivier Albertini（MapleSpire 個人事業運営者、カナダ・ケベック州）',
    termsDocument: {
      title: '利用規約', description: 'app.maplespire.ca の MapleSpire デモに適用される条件です。', eyebrow: 'MapleSpire · 公開デモ', updatedLabel: '発効日', updatedDate: '2026年8月2日',
      summary: '本規約は無料の MapleSpire デモに適用されます。評価・学習用であり、本番サービスではありません。', important: '秘密情報、機微情報、または消失すると損害が生じる内容を保存しないでください。SLA、バックアップ、復元は保証されません。',
      sections: [
        { title: '1. 運営者と適用範囲', paragraphs: ['app.maplespire.ca のサービス（以下「本サービス」）は Olivier Albertini（MapleSpire 個人事業運営者、カナダ・ケベック州）が運営します。連絡先：support@maplespire.ca。', '本規約は本サービスに関する利用者と運営者の契約です。maplespire.ca はアカウントなしで閲覧できますが、作成・共同作業・同期は本サービスに含まれます。'] },
        { title: '2. 同意・言語・利用資格', paragraphs: ['アカウント作成、ID プロバイダーの選択、または本規約の提示後に続行することにより、本規約に同意しプライバシー声明を確認したものとします。', '18歳以上で契約能力が必要です。組織を代表する場合、その組織を拘束する権限があることを表明します。ケベックでは同意前にフランス語版を利用できます。各翻訳は同じ内容を伝えることを目的とします。'] },
        { title: '3. 無料デモ（本番利用不可）', paragraphs: ['本サービスは、ビジュアル C4 モデリング、共同作業、オフライン作業、同期を試すための無料・実験的デモです。本番処理、規制対応、事業継続、重要判断には使用しないでください。', 'デモは変更、制限、中断、リセットされることがあります。SLA、稼働率、応答時間、サポート、容量、機能継続は約束されません。'] },
        { title: '4. アカウントと利用者コンテンツ', paragraphs: ['正確な情報を提供し、アカウントを保護してください。不正アクセスの疑いは support@maplespire.ca に直ちに連絡してください。', '図、コメント、ファイル等の権利は利用者に残ります。本サービスの運営・保護・障害対応に必要な期間、ホスト、複製、処理、同期、表示、送信するための非独占・世界的・無償の技術的ライセンスのみを当方に付与します。営業秘密、認証情報、健康・金融・未成年者等の機微情報を含めないでください。'] },
        { title: '5. 共有と禁止事項', bullets: ['共有先、権限、公開・埋込リンクおよび取消しは利用者の責任です。', '違法行為、第三者の権利侵害、守秘義務違反を禁止します。', 'マルウェア、安全対策の回避、無許可の検査、なりすまし、妨害を禁止します。', 'デモの再販売や、保証された本番サービスであるかのような表示を禁止します。'] },
        { title: '6. 第三者サービスと任意の AI', paragraphs: ['認証、メール、配信等は Microsoft、Cloudflare、AWS その他の提供者とその規約に依存する場合があります。', '組織が独自の AI 提供者またはキーを設定した場合、選択された指示と文脈がその提供者に送信されます。選択、権限、結果の検証は組織の責任です。AI 出力は誤る可能性があります。'] },
        { title: '7. データ消失・停止・知的財産', paragraphs: ['デモはリセットされ、アカウントや内容は停止、破損、削除される可能性があります。バックアップや復元は保証されません。重要な内容は利用者が保存・書き出してください。', '利用者コンテンツを除き、サービス、デザイン、商標、ソフトウェアの権利は運営者等に残ります。将来のソース公開は時期・範囲・ライセンスの約束ではなく、公開リポジトリの LICENSE のみが権利を定めます。'] },
        { title: '8. 保証と責任', paragraphs: ['法の許す範囲で、本サービスは「現状有姿」「提供可能な状態」で提供され、商品性、特定目的適合性、非侵害、正確性、絶対的安全性、データ保持を保証しません。', '法の許す範囲で、間接・特別・結果的・懲罰的損害、利益やデータの喪失には責任を負いません。その他の請求に対する累積責任は100カナダドルまたは直近12か月の支払額の高い方を上限とします。故意・重大な過失、身体・精神的損害、強行的消費者権など法律上除外できないものには適用されません。'] },
        { title: '9. 変更・準拠法・連絡先', paragraphs: ['重要な変更は合理的に通知し、変更内容または法令が求める場合は再同意を求めます。', '本規約はケベック州法および適用されるカナダ連邦法に準拠しますが、居住地の強行的消費者保護を奪いません。お問い合わせ：support@maplespire.ca。'] }
      ]
    },
    privacyDocument: {
      title: 'プライバシー声明', description: 'MapleSpire における個人情報の収集、利用、開示、保持および保護。', eyebrow: 'プライバシー · 透明性', updatedLabel: '発効日', updatedDate: '2026年8月2日',
      summary: '本声明は maplespire.ca、問い合わせフォーム、app.maplespire.ca デモに適用されます。個人情報を販売せず、現在は広告、行動分析、プロファイリングを行っていません。', important: 'デモは機微・機密情報向けではありません。オフラインのブラウザ保存は、サイトデータを削除するまで端末に残ることがあります。',
      sections: [
        { title: '1. 責任者と範囲', paragraphs: ['Olivier Albertini（MapleSpire 個人事業運営者、カナダ・ケベック州）が管理下の個人情報に責任を負います。プライバシー責任者：Privacy Officer、support@maplespire.ca。', '対象はランディングページ、問い合わせ、デモ、アカウント、アーキテクチャ空間、共同作業、共有リンク、サポート、取引メールです。'] },
        { title: '2. 情報と目的', bullets: ['アカウント：メール、氏名または別名、言語、ID プロバイダー識別子、組織所属。作成、認証、認可、表示のため。', 'ローカル認証：不可逆ハッシュ化パスワード、メール確認状態、ハッシュ化確認トークン。安全なログインのため。', 'サービス内容：図、オブジェクト、関係、コメント、決定、ファイル、権限、招待、共同作業履歴。保存、同期、共有、表示のため。', '問い合わせ：氏名、メール、任意の組織、件名、本文、同意記録、通信。回答と受領通知のため。', '技術情報：IP、時刻、ルート、安全イベント、エラー、端末/ブラウザ、セッション識別子。配信、安全、診断、不正防止のため。', '任意 AI：提供者、モデル、サービス URL、暗号化 API キー。AI 使用時のみ選択した指示と文脈を設定先へ送信。'] },
        { title: '3. 取得元・同意・通信', paragraphs: ['情報は利用者、所属組織、ブラウザ、選択した ID プロバイダーから取得します。アカウント、安全、同期、サポートに必要な処理は求められたサービスに不可欠です。将来の任意目的には必要に応じ別の選択肢を設けます。', '確認、招待、安全、サポート、受領通知等の必要なメールのみを送り、販促に自動登録しません。商用メールは別同意と配信停止手段を設けます。'] },
        { title: '4. Cookie と端末保存', paragraphs: ['ランディングページは言語とテーマだけを localStorage に保存します。デモは最長約30日の必須 HTTP-only セッション Cookie と、外部ログイン時の10分の必須 OIDC Cookie を使います。オフライン機能は IndexedDB/localStorage にモデル、キャッシュ、設定を保存します。', '広告・プロファイリング目的ではないため、現在広告同意バナーはありません。非必須の分析や追跡を追加する場合、取消可能な有効同意まで既定で無効にします。'] },
        { title: '5. 提供者・開示・国外移転', paragraphs: ['現在のカテゴリーは Cloudflare（DNS、ネットワーク、トンネル、安全）、AWS（CloudFront、問い合わせ、キュー、SES）、選択した Microsoft Entra ID/Google、メール提供者、組織が選んだ AI 提供者です。個人情報を販売・賃貸しません。', '主要なデモデータは現在カナダで運営者管理のインフラ上で動作します。各提供者はケベック、カナダ、米国その他の運営国で処理する場合があります。新たなケベック外移転は事前に影響評価と保護措置を行います。'] },
        { title: '6. 保持期間', bullets: ['アカウント・内容：利用中、その後は閉鎖、デモリセット、有効な請求の完了まで（法令・安全上の必要を除く）。', '確認トークン：24時間有効。生値は保存せず、期限切れ記録は保守時に削除。', 'セッション：通常 Cookie は最長30日、OIDC は10分またはコールバック時。', '問い合わせ・サポート：通常、最終連絡後24か月以内。', '通常技術ログ：概ね30日。安全、同意、事故、監査記録は必要に応じ長期保持。', 'オフラインデータ：ブラウザのサイトデータを削除するまで。'] },
        { title: '7. 安全と事故', paragraphs: ['通信暗号化、HTTP-only Cookie、パスワードハッシュ、AI キー暗号化、アクセス制御、レート制限、監査記録等を用いますが絶対安全ではありません。事故記録を保持し、法令が求める場合は当局と本人に通知します。'] },
        { title: '8. 利用者の権利', paragraphs: ['適用法により、保有・利用状況の確認、アクセス、訂正、任意同意の撤回、対象情報のポータビリティ、削除を請求できます。support@maplespire.ca へ連絡してください。本人確認後、通常ケベック法の30日以内に回答します。', 'プライバシー責任者、ケベック州情報アクセス委員会、カナダ・プライバシーコミッショナー事務局に苦情を申し立てられます。'] },
        { title: '9. 未成年者・自動判断・変更', paragraphs: ['本サービスは18歳以上向けです。現在、法的または同等に重大な影響を純粋な自動処理だけで決定せず、広告プロファイリングも行いません。', '重要な変更は明確に通知し、法令が求める場合は再同意を得ます。連絡先：Privacy Officer、support@maplespire.ca。'] }
      ]
    }
  },
  ko: {
    languageLabel: '언어', home: '홈', terms: '이용약관', privacy: '개인정보 보호정책', contact: '문의', operatorLabel: '운영자', operator: 'Olivier Albertini(MapleSpire 개인 운영자, 캐나다 퀘벡)',
    termsDocument: {
      title: '이용약관', description: 'app.maplespire.ca의 MapleSpire 데모에 적용되는 약관입니다.', eyebrow: 'MapleSpire · 공개 데모', updatedLabel: '시행일', updatedDate: '2026년 8월 2일',
      summary: '본 약관은 무료 MapleSpire 데모에 적용됩니다. 평가와 학습을 위한 것이며 프로덕션 서비스가 아닙니다.', important: '비밀, 민감정보 또는 손실 시 피해가 발생할 콘텐츠를 저장하지 마십시오. SLA, 백업 또는 복구는 보장되지 않습니다.',
      sections: [
        { title: '1. 운영자와 범위', paragraphs: ['app.maplespire.ca의 서비스(“서비스”)는 Olivier Albertini(MapleSpire 개인 운영자, 캐나다 퀘벡)가 운영합니다. 연락처: support@maplespire.ca.', '본 약관은 서비스에 관한 이용자와 운영자의 계약입니다. maplespire.ca는 계정 없이 볼 수 있으나 생성, 협업, 동기화 기능은 서비스에 포함됩니다.'] },
        { title: '2. 동의, 언어, 자격', paragraphs: ['계정을 만들거나 ID 공급자를 선택하거나 약관 제시 후 서비스를 계속하면 본 약관에 동의하고 개인정보 보호정책을 확인한 것입니다.', '만 18세 이상이며 계약 능력이 있어야 합니다. 조직을 대신할 경우 조직을 구속할 권한이 있음을 진술합니다. 퀘벡 이용자는 동의 전에 프랑스어본을 볼 수 있으며 번역본은 같은 내용을 전달하기 위한 것입니다.'] },
        { title: '3. 무료 데모이며 프로덕션용이 아님', paragraphs: ['서비스는 시각적 C4 모델링, 협업, 오프라인 작업, 동기화를 시험하는 무료 실험 데모입니다. 프로덕션 워크로드, 규제 의무, 업무 연속성 또는 중대한 결정에 사용하지 마십시오.', '데모는 변경, 제한, 중단 또는 초기화될 수 있습니다. SLA, 가동시간, 지원, 용량 또는 기능 유지는 약속되지 않습니다.'] },
        { title: '4. 계정과 콘텐츠', paragraphs: ['정확한 정보를 제공하고 계정을 보호하십시오. 무단 접근이 의심되면 support@maplespire.ca로 즉시 알려 주십시오.', '다이어그램, 댓글, 파일 등의 권리는 이용자에게 남습니다. 서비스 운영·보안·문제 해결에 필요한 기간 동안 호스팅, 복제, 처리, 동기화, 표시, 전송하기 위한 비독점적·전 세계적·무상 기술 라이선스만 부여합니다. 영업비밀, 자격증명, 건강·금융·미성년자 등 민감정보를 넣지 마십시오.'] },
        { title: '5. 공유 및 금지행위', bullets: ['공유 대상, 권한, 공개/임베드 링크 및 취소는 이용자 책임입니다.', '불법행위, 제3자 권리 침해, 비밀유지 의무 위반을 금지합니다.', '악성코드, 보안 우회, 무단 시험, 사칭, 서비스 방해를 금지합니다.', '데모를 재판매하거나 보장된 프로덕션 서비스로 표현하지 마십시오.'] },
        { title: '6. 제3자와 선택형 AI', paragraphs: ['인증, 이메일, 배포 등은 Microsoft, Cloudflare, AWS 및 각 약관에 의존할 수 있습니다.', '조직이 자체 AI 공급자나 키를 설정하면 선택한 프롬프트와 맥락이 해당 공급자에게 전송됩니다. 선택, 권한, 결과 검토는 조직 책임이며 AI 출력은 부정확할 수 있습니다.'] },
        { title: '7. 데이터 손실, 종료, 지식재산', paragraphs: ['데모는 초기화될 수 있고 계정이나 콘텐츠가 정지·손상·삭제될 수 있습니다. 백업과 복구는 보장되지 않습니다. 중요한 자료는 직접 보관하고 내보내십시오.', '이용자 콘텐츠를 제외한 서비스, 디자인, 상표, 소프트웨어 권리는 운영자 등에 남습니다. 향후 소스 공개는 일정·범위·라이선스 약속이 아니며 공개 저장소의 LICENSE만 권리를 정합니다.'] },
        { title: '8. 보증과 책임', paragraphs: ['법이 허용하는 범위에서 서비스는 “있는 그대로”, “이용 가능한 상태로” 제공되며 상품성, 특정 목적 적합성, 비침해, 정확성, 절대 보안 또는 데이터 보존을 보증하지 않습니다.', '법이 허용하는 범위에서 간접·특별·결과적·징벌적 손해, 이익 또는 데이터 손실에 책임지지 않습니다. 그 밖의 청구에 대한 누적 책임은 100캐나다달러 또는 최근 12개월 지급액 중 큰 금액으로 제한됩니다. 고의·중대한 과실, 신체·정신 손해, 강행적 소비자 권리 등 법상 배제할 수 없는 경우에는 적용되지 않습니다.'] },
        { title: '9. 변경, 준거법, 연락처', paragraphs: ['중요한 변경은 합리적으로 알리고 변경 내용이나 법이 요구하면 다시 동의를 받습니다.', '퀘벡법과 적용되는 캐나다 연방법이 적용되며 거주지의 강행적 소비자 보호를 배제하지 않습니다. 문의: support@maplespire.ca.'] }
      ]
    },
    privacyDocument: {
      title: '개인정보 보호정책', description: 'MapleSpire가 개인정보를 수집, 이용, 공개, 보관 및 보호하는 방법입니다.', eyebrow: '개인정보 · 투명성', updatedLabel: '시행일', updatedDate: '2026년 8월 2일',
      summary: '본 정책은 maplespire.ca, 문의 양식, app.maplespire.ca 데모에 적용됩니다. MapleSpire는 개인정보를 판매하지 않으며 현재 광고, 행동 분석 또는 프로파일링을 하지 않습니다.', important: '데모는 민감하거나 기밀인 정보용이 아닙니다. 오프라인 브라우저 저장소는 사이트 데이터를 지울 때까지 기기에 정보를 남길 수 있습니다.',
      sections: [
        { title: '1. 책임자와 범위', paragraphs: ['Olivier Albertini(MapleSpire 개인 운영자, 캐나다 퀘벡)가 통제하는 개인정보에 책임을 집니다. 개인정보 보호책임자: Privacy Officer, support@maplespire.ca.', '랜딩 사이트, 문의, 데모, 계정, 아키텍처 공간, 협업, 공유 링크, 지원 및 거래성 이메일을 포함합니다.'] },
        { title: '2. 정보와 목적', bullets: ['계정: 이메일, 이름/별칭, 언어, ID 공급자 식별자, 조직 소속—계정 생성, 인증, 권한 및 개인화.', '로컬 인증: 비가역 비밀번호 해시, 이메일 확인 상태, 해시된 확인 토큰—안전한 로그인.', '서비스 콘텐츠: 다이어그램, 객체, 관계, 댓글, 결정, 파일, 권한, 초대, 협업 이력—저장, 동기화, 공유, 표시.', '문의: 이름, 이메일, 선택적 조직, 제목, 메시지, 동의 기록, 통신—응답, 접수 확인, 해결.', '기술정보: IP, 시간, 요청 경로, 보안 사건, 오류, 기기/브라우저, 세션 식별자—전달, 보안, 진단, 남용 방지.', '선택형 AI: 공급자, 모델, 서비스 주소, 암호화 API 키. AI 사용 시 선택한 프롬프트와 맥락만 설정 공급자에게 전송.'] },
        { title: '3. 출처, 동의, 통신', paragraphs: ['정보는 이용자, 소속 조직, 브라우저 또는 선택한 ID 공급자로부터 받습니다. 계정·보안·동기화·지원에 필요한 처리는 요청한 서비스의 필수 부분이며 향후 선택적 목적에는 필요한 경우 별도 선택을 제공합니다.', '이메일 확인, 초대, 보안, 지원, 접수 확인 등 필요한 메시지만 보내며 홍보에 자동 가입시키지 않습니다. 상업 이메일은 별도 동의와 수신거부를 제공합니다.'] },
        { title: '4. 쿠키와 기기 저장소', paragraphs: ['랜딩은 언어와 테마만 localStorage에 저장합니다. 데모는 최장 약30일의 필수 HTTP-only 세션 쿠키와 외부 로그인 중 10분의 필수 OIDC 쿠키를 사용합니다. 오프라인 기능은 IndexedDB/localStorage에 모델, 캐시, 설정을 저장합니다.', '광고나 프로파일링 목적이 아니므로 현재 광고 동의 배너를 표시하지 않습니다. 비필수 분석이나 추적을 추가하면 취소 가능한 유효 동의 전까지 기본 비활성화합니다.'] },
        { title: '5. 공급자, 공개, 국외처리', paragraphs: ['현재 범주는 Cloudflare(DNS, 네트워크, 터널, 보안), AWS(CloudFront, 문의, 큐, SES), 선택한 Microsoft Entra ID/Google, 이메일 공급자, 조직 선택 AI 공급자입니다. 개인정보를 판매하거나 임대하지 않습니다.', '핵심 데모 데이터는 현재 캐나다에서 운영자가 통제하는 인프라에서 운영됩니다. 공급자는 퀘벡, 캐나다, 미국 또는 운영 국가에서 일부 정보를 처리할 수 있습니다. 새로운 퀘벡 외 이전은 사전 영향평가와 보호조치를 거칩니다.'] },
        { title: '6. 보관', bullets: ['계정/콘텐츠: 이용 중 및 폐쇄, 데모 초기화 또는 유효 요청 처리까지(법·보안 필요 제외).', '확인 토큰: 24시간 유효, 원문 미보관, 만료 기록은 유지보수 중 삭제.', '세션: 일반 쿠키 최장30일, OIDC 10분 또는 콜백 시.', '문의/지원: 일반적으로 마지막 교신 후 24개월 이내.', '일반 기술 로그: 대체로30일. 보안, 동의, 사고, 감사 기록은 필요 시 더 오래.', '오프라인 데이터: 브라우저 사이트 데이터를 삭제할 때까지.'] },
        { title: '7. 보안과 사고', paragraphs: ['전송 암호화, HTTP-only 쿠키, 비밀번호 해시, AI 키 암호화, 접근제어, 요청 제한, 감사기록 등을 사용하지만 절대 보안은 없습니다. 사고 기록을 유지하고 법에 따라 당국과 당사자에게 통지합니다.'] },
        { title: '8. 이용자 권리', paragraphs: ['적용법에 따라 보유·이용 정보 확인, 접근, 수정, 선택적 동의 철회, 적격 정보 이동, 삭제를 요청할 수 있습니다. support@maplespire.ca로 연락하면 신원을 확인한 뒤 보통 퀘벡의 법정 30일 안에 답변합니다.', '개인정보 보호책임자, 퀘벡 정보접근위원회 또는 캐나다 개인정보보호위원회에 불만을 제기할 수 있습니다.'] },
        { title: '9. 미성년자, 자동결정, 변경', paragraphs: ['서비스는 만18세 이상용입니다. 현재 법적 또는 유사하게 중대한 영향을 오직 자동처리로 결정하지 않고 광고 프로파일링도 하지 않습니다.', '중요한 변경은 명확히 알리고 법이 요구하면 새 동의를 받습니다. 문의/불만: Privacy Officer, support@maplespire.ca.'] }
      ]
    }
  },
  hi: {
    languageLabel: 'भाषा', home: 'होम', terms: 'उपयोग की शर्तें', privacy: 'गोपनीयता वक्तव्य', contact: 'संपर्क', operatorLabel: 'संचालक', operator: 'Olivier Albertini, MapleSpire के व्यक्तिगत संचालक, क्यूबेक, कनाडा',
    termsDocument: {
      title: 'उपयोग की शर्तें', description: 'app.maplespire.ca पर MapleSpire डेमो पर लागू शर्तें।', eyebrow: 'MapleSpire · सार्वजनिक डेमो', updatedLabel: 'प्रभावी', updatedDate: '2 अगस्त 2026',
      summary: 'ये शर्तें मुफ़्त MapleSpire डेमो पर लागू होती हैं। डेमो मूल्यांकन और सीखने के लिए है; यह प्रोडक्शन सेवा नहीं है।', important: 'रहस्य, संवेदनशील जानकारी या ऐसा कंटेंट न रखें जिसके खोने से नुकसान हो। SLA, बैकअप या पुनर्स्थापना की गारंटी नहीं है।',
      sections: [
        { title: '1. संचालक और दायरा', paragraphs: ['app.maplespire.ca की सेवा (“सेवा”) Olivier Albertini, MapleSpire के व्यक्तिगत संचालक, क्यूबेक, कनाडा द्वारा संचालित है। संपर्क: support@maplespire.ca।', 'ये शर्तें सेवा के संबंध में आपके और संचालक के बीच अनुबंध हैं। maplespire.ca बिना खाते देखा जा सकता है; निर्माण, सहयोग और सिंक सेवा का भाग हैं।'] },
        { title: '2. स्वीकृति, भाषा और पात्रता', paragraphs: ['खाता बनाकर, पहचान प्रदाता चुनकर या शर्तें दिखाए जाने के बाद आगे बढ़कर आप इन शर्तों को स्वीकार और गोपनीयता वक्तव्य को पढ़ा हुआ मानते हैं।', 'आपकी आयु कम से कम 18 वर्ष और अनुबंध करने की कानूनी क्षमता होनी चाहिए। किसी संगठन के लिए कार्य करते समय आप उसे बाध्य करने के अधिकार की पुष्टि करते हैं। क्यूबेक में स्वीकृति से पहले फ़्रेंच संस्करण उपलब्ध है; अनुवाद समान अर्थ देने के लिए हैं।'] },
        { title: '3. मुफ़्त डेमो—प्रोडक्शन नहीं', paragraphs: ['सेवा विज़ुअल C4 मॉडलिंग, सहयोग, ऑफ़लाइन काम और सिंक आज़माने का मुफ़्त प्रयोगात्मक डेमो है। इसे प्रोडक्शन भार, नियामक दायित्व, व्यवसाय निरंतरता या महत्वपूर्ण निर्णयों के लिए उपयोग न करें।', 'हम डेमो बदल, सीमित, रोक या रीसेट कर सकते हैं। SLA, उपलब्धता, सहायता, क्षमता या किसी सुविधा के बने रहने का वादा नहीं है।'] },
        { title: '4. खाता और आपका कंटेंट', paragraphs: ['सही जानकारी दें और खाता सुरक्षित रखें। अनधिकृत पहुँच का संदेह होने पर support@maplespire.ca को तुरंत बताएँ।', 'डायग्राम, टिप्पणियों, फ़ाइलों आदि पर आपके अधिकार बने रहते हैं। आप हमें केवल सेवा चलाने, सुरक्षित रखने और समस्या हल करने के लिए आवश्यक अवधि तक होस्ट, कॉपी, प्रोसेस, सिंक, प्रदर्शित और भेजने का गैर-अनन्य, विश्वव्यापी, रॉयल्टी-मुक्त तकनीकी लाइसेंस देते हैं। व्यापार रहस्य, क्रेडेंशियल, स्वास्थ्य/वित्तीय/नाबालिग या अन्य संवेदनशील डेटा न रखें।'] },
        { title: '5. साझा करना और निषिद्ध उपयोग', bullets: ['प्राप्तकर्ता, अनुमतियाँ, सार्वजनिक/एम्बेड लिंक और निरस्तीकरण आपकी जिम्मेदारी हैं।', 'कानून, तीसरे पक्ष के अधिकार या गोपनीयता दायित्व का उल्लंघन निषिद्ध है।', 'मैलवेयर, सुरक्षा को दरकिनार करना, अनधिकृत परीक्षण, प्रतिरूपण या व्यवधान निषिद्ध हैं।', 'डेमो को फिर से बेचना या गारंटीकृत प्रोडक्शन सेवा बताना निषिद्ध है।'] },
        { title: '6. तीसरे पक्ष और वैकल्पिक AI', paragraphs: ['प्रमाणीकरण, ईमेल और वितरण Microsoft, Cloudflare, AWS या अन्य प्रदाताओं और उनकी शर्तों पर निर्भर हो सकते हैं।', 'यदि कोई संगठन अपना AI प्रदाता या कुंजी सेट करता है, तो चुने गए निर्देश और संदर्भ उसी प्रदाता को भेजे जाते हैं। चुनाव, अनुमति और परिणाम जाँचना संगठन की जिम्मेदारी है; AI गलत हो सकता है।'] },
        { title: '7. डेटा हानि, समाप्ति और बौद्धिक संपदा', paragraphs: ['डेमो रीसेट हो सकता है और खाते या कंटेंट निलंबित, खराब या मिट सकते हैं। बैकअप/बहाली की गारंटी नहीं है। महत्वपूर्ण सामग्री की अपनी प्रति और निर्यात रखें।', 'आपके कंटेंट को छोड़कर सेवा, डिज़ाइन, चिह्न और सॉफ़्टवेयर के अधिकार संचालक/लाइसेंसदाताओं के हैं। भविष्य में सोर्स प्रकाशित करना तारीख, दायरे या लाइसेंस का वादा नहीं; केवल सार्वजनिक रिपॉज़िटरी की LICENSE फ़ाइल अधिकार देती है।'] },
        { title: '8. वारंटी और दायित्व', paragraphs: ['कानून द्वारा अनुमत सीमा तक सेवा “जैसी है” और “जैसी उपलब्ध है” दी जाती है; बिक्रीयोग्यता, विशेष उद्देश्य, गैर-उल्लंघन, शुद्धता, पूर्ण सुरक्षा या डेटा संरक्षण की वारंटी नहीं है।', 'कानून द्वारा अनुमत सीमा तक अप्रत्यक्ष, विशेष, परिणामी, दंडात्मक नुकसान, लाभ या डेटा हानि का दायित्व नहीं है। अन्य दावों की कुल सीमा CA$100 या पिछले12 महीनों में आपके भुगतान में जो अधिक हो है। जानबूझकर/गंभीर दोष, शारीरिक/नैतिक हानि या अनिवार्य उपभोक्ता अधिकार जैसे गैर-बहिष्करणीय मामलों पर यह लागू नहीं होता।'] },
        { title: '9. बदलाव, कानून और संपर्क', paragraphs: ['महत्वपूर्ण बदलाव की उचित सूचना दी जाएगी और कानून या बदलाव की प्रकृति माँगे तो फिर स्वीकृति ली जाएगी।', 'क्यूबेक कानून और लागू कनाडाई संघीय कानून लागू हैं, पर आपके निवास के अनिवार्य उपभोक्ता अधिकार बने रहते हैं। संपर्क: support@maplespire.ca।'] }
      ]
    },
    privacyDocument: {
      title: 'गोपनीयता वक्तव्य', description: 'MapleSpire व्यक्तिगत जानकारी कैसे एकत्र, उपयोग, साझा, रखता और सुरक्षित करता है।', eyebrow: 'गोपनीयता · पारदर्शिता', updatedLabel: 'प्रभावी', updatedDate: '2 अगस्त 2026',
      summary: 'यह वक्तव्य maplespire.ca, संपर्क फ़ॉर्म और app.maplespire.ca डेमो पर लागू है। MapleSpire व्यक्तिगत जानकारी नहीं बेचता और अभी विज्ञापन, व्यवहार विश्लेषण या प्रोफाइलिंग नहीं करता।', important: 'डेमो संवेदनशील या गोपनीय जानकारी के लिए नहीं है। ऑफ़लाइन ब्राउज़र स्टोरेज साइट डेटा मिटाने तक आपके उपकरण पर डेटा रख सकता है।',
      sections: [
        { title: '1. जिम्मेदार व्यक्ति और दायरा', paragraphs: ['Olivier Albertini, MapleSpire के व्यक्तिगत संचालक, क्यूबेक, कनाडा अपने नियंत्रण की व्यक्तिगत जानकारी के लिए जिम्मेदार हैं। Privacy Officer: support@maplespire.ca।', 'यह लैंडिंग साइट, संपर्क, डेमो, खाते, आर्किटेक्चर वर्कस्पेस, सहयोग, शेयर लिंक, सहायता और लेनदेन ईमेल पर लागू है।'] },
        { title: '2. जानकारी और उद्देश्य', bullets: ['खाता: ईमेल, नाम/उपनाम, भाषा, पहचान-प्रदाता ID और संगठन सदस्यता—खाता बनाने, प्रमाणित, अधिकृत और वैयक्तिकृत करने के लिए।', 'स्थानीय खाता: अपरिवर्तनीय पासवर्ड हैश, ईमेल सत्यापन स्थिति और हैश किए टोकन—सुरक्षित लॉगिन के लिए।', 'सेवा कंटेंट: डायग्राम, ऑब्जेक्ट, संबंध, टिप्पणियाँ, निर्णय, फ़ाइलें, अनुमतियाँ, आमंत्रण और सहयोग इतिहास—सहेजने, सिंक, साझा और दिखाने के लिए।', 'संपर्क: नाम, ईमेल, वैकल्पिक संगठन, विषय, संदेश, सहमति रिकॉर्ड और पत्राचार—उत्तर, रसीद और समाधान के लिए।', 'तकनीकी: IP, समय, अनुरोधित मार्ग, सुरक्षा घटनाएँ, त्रुटियाँ, उपकरण/ब्राउज़र और सत्र ID—वितरण, सुरक्षा, निदान और दुरुपयोग रोकने के लिए।', 'वैकल्पिक AI: प्रदाता, मॉडल, सेवा पता और एन्क्रिप्टेड API कुंजी; AI उपयोग पर चुने हुए निर्देश और संदर्भ सेट प्रदाता को जाते हैं।'] },
        { title: '3. स्रोत, सहमति और संदेश', paragraphs: ['जानकारी आपसे, आपके संगठन, ब्राउज़र या चुने पहचान प्रदाता से आती है। खाता, सुरक्षा, सिंक और सहायता के आवश्यक प्रोसेस अनुरोधित सेवा का अभिन्न भाग हैं; भविष्य के वैकल्पिक उपयोग के लिए जहाँ जरूरी हो अलग चुनाव होगा।', 'हम सत्यापन, आमंत्रण, सुरक्षा, सहायता और रसीद जैसे आवश्यक संदेश भेजते हैं; प्रचार के लिए स्वतः सदस्यता नहीं। वाणिज्यिक संदेश के लिए अलग सहमति और unsubscribe होगा।'] },
        { title: '4. कुकी और उपकरण स्टोरेज', paragraphs: ['लैंडिंग पेज localStorage में केवल भाषा और थीम रखता है। डेमो अधिकतम लगभग30 दिन की आवश्यक HTTP-only सत्र कुकी और बाहरी लॉगिन में10 मिनट की आवश्यक OIDC कुकी उपयोग करता है। ऑफ़लाइन सुविधाएँ IndexedDB/localStorage में मॉडल, कैश और प्राथमिकताएँ रखती हैं।', 'ये विज्ञापन या प्रोफाइलिंग के लिए नहीं हैं, इसलिए अभी विज्ञापन-सहमति बैनर नहीं है। गैर-आवश्यक विश्लेषण या ट्रैकिंग जोड़ी गई तो वैध, वापस ली जा सकने वाली सहमति से पहले डिफ़ॉल्ट रूप से बंद रहेगी।'] },
        { title: '5. प्रदाता, खुलासा और सीमा-पार प्रोसेसिंग', paragraphs: ['वर्तमान श्रेणियाँ: Cloudflare (DNS, नेटवर्क, टनल, सुरक्षा), AWS (CloudFront, संपर्क, कतार, SES), चुना Microsoft Entra ID/Google, ईमेल प्रदाता और संगठन का चुना AI प्रदाता। हम व्यक्तिगत जानकारी बेचते या किराए पर नहीं देते।', 'मुख्य डेमो डेटा अभी कनाडा में संचालक-नियंत्रित ढाँचे पर चलता है। प्रदाता क्यूबेक, कनाडा, अमेरिका या अन्य संचालन देशों में कुछ डेटा प्रोसेस कर सकते हैं। नए क्यूबेक-बाहर हस्तांतरण से पहले प्रभाव आकलन और सुरक्षा उपाय होंगे।'] },
        { title: '6. रखने की अवधि', bullets: ['खाता/कंटेंट: उपयोग के दौरान, फिर बंद होने, डेमो रीसेट या वैध अनुरोध पूरा होने तक; कानूनी/सुरक्षा जरूरतें अलग।', 'सत्यापन टोकन:24 घंटे; कच्चा मान नहीं रखा जाता, समाप्त रिकॉर्ड रखरखाव में हटते हैं।', 'सत्र: सामान्य कुकी अधिकतम30 दिन, OIDC 10 मिनट या callback तक।', 'संपर्क/सहायता: सामान्यतः अंतिम बातचीत के24 महीने तक।', 'सामान्य तकनीकी लॉग: लगभग30 दिन; सुरक्षा, सहमति, घटना और ऑडिट रिकॉर्ड जरूरत पर अधिक।', 'ऑफ़लाइन डेटा: ब्राउज़र में साइट डेटा मिटाने तक।'] },
        { title: '7. सुरक्षा और घटनाएँ', paragraphs: ['ट्रांज़िट एन्क्रिप्शन, HTTP-only कुकी, पासवर्ड हैश, AI कुंजी एन्क्रिप्शन, access control, rate limit और audit record जैसे उपाय हैं, पर पूर्ण सुरक्षा नहीं। हम घटना रजिस्टर रखते और कानून के अनुसार नियामक/प्रभावित लोगों को सूचित करते हैं।'] },
        { title: '8. आपके अधिकार', paragraphs: ['लागू कानून के अनुसार आप जानकारी/उपयोग जानने, पहुँच, सुधार, वैकल्पिक सहमति वापस लेने, योग्य डेटा पोर्टेबिलिटी या मिटाने का अनुरोध कर सकते हैं। support@maplespire.ca पर लिखें; पहचान सत्यापन के बाद सामान्यतः क्यूबेक की30 दिन सीमा में उत्तर देंगे।', 'आप Privacy Officer, Commission d’accès à l’information du Québec या Office of the Privacy Commissioner of Canada में शिकायत कर सकते हैं।'] },
        { title: '9. नाबालिग, स्वचालित निर्णय और बदलाव', paragraphs: ['सेवा18 वर्ष या अधिक के लिए है। अभी केवल स्वचालित प्रोसेस से कानूनी या समान महत्वपूर्ण निर्णय नहीं होते और विज्ञापन प्रोफाइलिंग नहीं है।', 'महत्वपूर्ण बदलाव स्पष्ट बताए जाएँगे और कानून माँगे तो नई सहमति ली जाएगी। प्रश्न/शिकायत: Privacy Officer, support@maplespire.ca।'] }
      ]
    }
  }
};

export function getLegalDocument(locale: Locale, kind: LegalKind): LegalDocument {
  return kind === 'termsofservice' ? legalCopy[locale].termsDocument : legalCopy[locale].privacyDocument;
}
