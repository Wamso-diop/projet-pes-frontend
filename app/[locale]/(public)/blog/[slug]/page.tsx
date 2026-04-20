import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft, Clock, Calendar, CheckCircle2,
  Lightbulb, ArrowRight, BookOpen, Share2,
} from 'lucide-react';
import ReadingProgress from '@/components/blog/ReadingProgress';
import NewsletterForm from '@/components/shared/NewsletterForm';

type Props = { params: Promise<{ locale: string; slug: string }> };

/* ═══════════════════════════════════════════════════════════
   DATA — static content (will be replaced by DB/API later)
═══════════════════════════════════════════════════════════ */

interface Section {
  headingFr: string;
  headingEn: string;
  bodyFr: string;
  bodyEn: string;
  tipFr?: string;
  tipEn?: string;
}

interface Article {
  slug: string;
  image: string;
  titleFr: string;
  titleEn: string;
  date: string;
  dateEn: string;
  category: string;
  categoryEn: string;
  readTime: number;
  color: string;
  authorName: string;
  authorRoleFr: string;
  authorRoleEn: string;
  authorInitials: string;
  authorColor: string;
  introFr: string;
  introEn: string;
  sections: Section[];
  keyPointsFr: string[];
  keyPointsEn: string[];
  conclusionFr: string;
  conclusionEn: string;
}

const ARTICLES: Article[] = [
  /* ─── 1. BEPC en 3 mois ─── */
  {
    slug: 'preparer-bepc-3-mois',
    image: '/images/preparer-bepc.jpg',
    titleFr: 'Comment préparer le BEPC en 3 mois',
    titleEn: 'How to prepare for BEPC in 3 months',
    date: '15 mars 2026',
    dateEn: 'March 15, 2026',
    category: 'Examens',
    categoryEn: 'Exams',
    readTime: 5,
    color: '#2563EB',
    authorName: 'Dr. Marcel Mballa',
    authorRoleFr: 'Directeur pédagogique · Mathématiques & Physique',
    authorRoleEn: 'Academic Director · Mathematics & Physics',
    authorInitials: 'DM',
    authorColor: '#2563EB',
    introFr: `Le BEPC approche et l'inquiétude s'installe ? Rassurez-vous : trois mois de travail structuré suffisent à transformer une préparation chaotique en un plan solide et rassurant. Chez PES, nous accompagnons chaque année des dizaines d'élèves dans ce défi, et nous avons distillé pour vous les stratégies qui font vraiment la différence.\n\nCet article vous donne un programme semaine par semaine, des techniques de révision éprouvées et les pièges à éviter absolument. Lisez-le attentivement : votre enfant mérite le meilleur départ possible.`,
    introEn: `Is the BEPC approaching and anxiety setting in? Don't worry — three months of structured work is enough to transform chaotic revision into a solid, reassuring plan. At PES, we support dozens of students through this challenge every year, and we have distilled the strategies that really make a difference.\n\nThis article gives you a week-by-week programme, proven revision techniques, and the pitfalls to absolutely avoid. Read it carefully — your child deserves the best possible start.`,
    sections: [
      {
        headingFr: 'Mois 1 — Cartographier ses lacunes',
        headingEn: 'Month 1 — Mapping the gaps',
        bodyFr: `La première erreur que commettent la plupart des élèves est de réviser de façon linéaire, du début du programme jusqu'à la fin, sans jamais cibler les points faibles. Le premier mois doit être consacré à un audit honnête : quelles matières posent problème ? Quels chapitres restent flous ?\n\nNous recommandons de commencer par une série d'annales (sujets des années précédentes) sur toutes les matières clés : Mathématiques, Sciences, Français, Anglais, Histoire-Géographie. Notez chaque réponse fausse. Ces erreurs forment votre feuille de route.\n\nEnsuite, élaborez un planning hebdomadaire avec 2 h de révision par jour, réparties sur 5 jours. Le week-end est réservé aux révisions croisées et à la détente — un cerveau fatigué n'enregistre rien.`,
        bodyEn: `The first mistake most students make is revising linearly, from the start of the syllabus to the end, without ever targeting weak points. The first month should be dedicated to an honest audit: which subjects are problematic? Which chapters remain unclear?\n\nWe recommend starting with a series of past papers (subjects from previous years) across all key subjects: Mathematics, Sciences, French, English, History-Geography. Note every wrong answer. These errors form your roadmap.\n\nThen draw up a weekly schedule with 2 hours of revision per day, spread over 5 days. Weekends are reserved for cross-revision and rest — a tired brain retains nothing.`,
        tipFr: `Astuce PES : Créez une feuille A3 avec toutes les matières en colonnes et les semaines en lignes. Colorez en rouge ce qui est non maîtrisé, en orange ce qui est fragile, en vert ce qui est acquis. Ce tableau visuel devient votre boussole.`,
        tipEn: `PES tip: Create an A3 sheet with all subjects in columns and weeks in rows. Colour in red what is not mastered, orange what is fragile, green what is solid. This visual table becomes your compass.`,
      },
      {
        headingFr: 'Mois 2 — Consolider et pratiquer',
        headingEn: 'Month 2 — Consolidate and practise',
        bodyFr: `C'est le mois le plus intense. Vous avez votre feuille de route : attaquez maintenant les zones rouges avec méthode. Pour les Mathématiques, rien ne remplace la pratique répétée : 5 exercices par chapitre chaque semaine, en conditions de temps.\n\nPour les matières littéraires (Français, Histoire-Géo), travaillez la structure des réponses. Un correcteur du BEPC évalue autant la clarté d'expression que le fond. Apprenez à introduire, développer et conclure en 3 paragraphes propres.\n\nC'est aussi le moment d'intégrer les cours particuliers ciblés si certains chapitres résistent. Une seule séance bien menée avec un enseignant expert peut débloquer ce qu'une semaine de travail solitaire ne résout pas.`,
        bodyEn: `This is the most intense month. You have your roadmap: now attack the red zones methodically. For Mathematics, nothing replaces repeated practice — 5 exercises per chapter each week, under timed conditions.\n\nFor literary subjects (French, History-Geography), work on the structure of answers. A BEPC examiner evaluates clarity of expression as much as content. Learn to introduce, develop and conclude in 3 neat paragraphs.\n\nThis is also the time to bring in targeted private lessons if certain chapters continue to resist. One well-run session with an expert teacher can unlock what a week of solo work cannot.`,
        tipFr: `La règle des 48 h : tout concept révisé doit être revu 48 h plus tard, puis une semaine après. Cette technique de répétition espacée augmente la mémorisation à long terme de 70 %.`,
        tipEn: `The 48-hour rule: any concept revised must be reviewed 48 hours later, then again one week later. This spaced repetition technique increases long-term retention by 70%.`,
      },
      {
        headingFr: 'Mois 3 — Simuler l\'examen',
        headingEn: 'Month 3 — Simulate the exam',
        bodyFr: `Le dernier mois est entièrement dédié à la simulation. Organisez des épreuves blanches complètes dans les mêmes conditions que l'examen officiel : durée respectée, cahier de brouillon, pas de téléphone, surveillance chronométrée. Cette démarche démystifie la salle d'examen.\n\nCorrigez chaque épreuve blanche avec rigueur. L'erreur répétée est une mine d'or : elle révèle un automatisme défaillant qui, une fois corrigé, ne reviendra plus. Concentrez les derniers jours sur les formules, dates-clés et définitions à mémoriser.\n\nLa veille de l'examen : pas de révision intensive. Relisez vos fiches de synthèse, dormez 8 heures, prenez un bon petit-déjeuner. Le cerveau a besoin de repos pour exprimer ce qu'il a appris.`,
        bodyEn: `The final month is entirely dedicated to simulation. Organise complete mock exams under the same conditions as the official examination: time respected, rough work book, no phone, timed supervision. This approach demystifies the exam room.\n\nCorrect each mock paper rigorously. A repeated error is a goldmine — it reveals a faulty automatism that, once corrected, will not return. Spend the final days on formulas, key dates and definitions to memorise.\n\nThe eve of the exam: no intensive revision. Re-read your summary sheets, sleep 8 hours, eat a good breakfast. The brain needs rest to express what it has learnt.`,
      },
    ],
    keyPointsFr: [
      'Commencer par un audit des lacunes avec les annales',
      'Planifier 2 h de révision par jour, 5 jours sur 7',
      'Utiliser la répétition espacée (48 h puis 1 semaine)',
      'Faire au moins 3 épreuves blanches complètes',
      'Reposer le cerveau la veille de l\'examen',
    ],
    keyPointsEn: [
      'Start with a gap audit using past papers',
      'Plan 2 hours of revision per day, 5 days out of 7',
      'Use spaced repetition (48 hours then 1 week)',
      'Do at least 3 full mock exams',
      'Rest the brain the day before the exam',
    ],
    conclusionFr: `Trois mois, c'est à la fois court et suffisant — à condition de ne pas les gaspiller. La différence entre un élève qui réussit le BEPC et un autre qui échoue de peu tient rarement au niveau initial : elle tient à la méthode, à la régularité et à l'encadrement. C'est exactement ce que l'équipe PES est là pour vous apporter. N'attendez pas : chaque semaine compte.`,
    conclusionEn: `Three months is both short and sufficient — provided they are not wasted. The difference between a student who passes the BEPC and one who narrowly fails rarely comes down to initial level: it comes down to method, consistency and guidance. That is exactly what the PES team is here to provide. Don't wait — every week counts.`,
  },

  /* ─── 2. Maths astuces ─── */
  {
    slug: 'maths-astuces-aimer',
    image: '/images/tips-of-math.jpg',
    titleFr: '5 astuces pour aimer les mathématiques',
    titleEn: '5 tips to love mathematics',
    date: '28 fév. 2026',
    dateEn: 'Feb 28, 2026',
    category: 'Mathématiques',
    categoryEn: 'Mathematics',
    readTime: 4,
    color: '#16A34A',
    authorName: 'Dr. Marcel Mballa',
    authorRoleFr: 'Directeur pédagogique · Mathématiques & Physique',
    authorRoleEn: 'Academic Director · Mathematics & Physics',
    authorInitials: 'DM',
    authorColor: '#2563EB',
    introFr: `« Je suis nul en maths. » Combien de fois avez-vous entendu cette phrase de la bouche de votre enfant, ou peut-être l'avez-vous dite vous-même autrefois ? La vérité, c'est que la "nullité" en mathématiques n'existe pas : il n'existe que des lacunes non comblées et une méthode inadaptée.\n\nEn quinze ans d'enseignement à Douala, nos professeurs de maths ont transformé d'innombrables élèves "allergiques aux chiffres" en élèves confiants et performants. Voici les cinq leviers qui changent tout.`,
    introEn: `"I'm terrible at maths." How many times have you heard that from your child, or perhaps said it yourself once upon a time? The truth is that being "bad at maths" does not exist — there are only unfilled gaps and an ill-suited method.\n\nIn fifteen years of teaching in Douala, our maths teachers have transformed countless "number-allergic" students into confident, high-performing ones. Here are the five levers that change everything.`,
    sections: [
      {
        headingFr: '1. Comprendre avant de mémoriser',
        headingEn: '1. Understand before memorising',
        bodyFr: `Le piège le plus fréquent : apprendre des formules par cœur sans comprendre d'où elles viennent ni pourquoi elles fonctionnent. Un élève qui récite "a² + b² = c²" sans visualiser le triangle rectangle ne pourra jamais appliquer la formule dans un contexte légèrement différent.\n\nAvant toute mémorisation, demandez à votre enfant de vous expliquer le concept avec ses propres mots. S'il ne peut pas, c'est qu'il n'a pas encore compris — et c'est normal. Un bon enseignant repart de zéro autant de fois que nécessaire, avec des exemples concrets du quotidien.`,
        bodyEn: `The most common trap: learning formulas by heart without understanding where they come from or why they work. A student who recites "a² + b² = c²" without visualising the right-angled triangle will never be able to apply the formula in a slightly different context.\n\nBefore any memorisation, ask your child to explain the concept in their own words. If they cannot, they have not yet understood — and that is fine. A good teacher starts from scratch as many times as necessary, with concrete everyday examples.`,
        tipFr: `Demandez à votre enfant d'enseigner le concept qu'il vient d'apprendre à un frère, une sœur ou même à un jouet. "L'effet protégé" : expliquer force le cerveau à organiser sa connaissance.`,
        tipEn: `Ask your child to teach the concept they just learnt to a sibling or even a toy. The "protégé effect": explaining forces the brain to organise its knowledge.`,
      },
      {
        headingFr: '2. Travailler en petites doses quotidiennes',
        headingEn: '2. Work in small daily doses',
        bodyFr: `20 minutes de maths tous les jours valent infiniment mieux que 3 heures le samedi matin. Le cerveau consolide les apprentissages pendant le sommeil : si votre enfant révise un chapitre le soir, il aura mieux intégré le lendemain matin.\n\nConstruisez un rituel : même heure, même endroit, sans écrans. Commencez par un exercice de révision (quelque chose déjà maîtrisé) pour mettre le cerveau en confiance, puis abordez le nouveau contenu. Terminez toujours par un succès — jamais sur une difficulté non résolue.`,
        bodyEn: `20 minutes of maths every day is infinitely better than 3 hours on Saturday morning. The brain consolidates learning during sleep — if your child revises a chapter in the evening, they will have better retained it the next morning.\n\nBuild a ritual: same time, same place, no screens. Start with a revision exercise (something already mastered) to put the brain in a confident state, then approach the new content. Always end on a success — never on an unresolved difficulty.`,
      },
      {
        headingFr: '3. Relier les maths à la vie réelle',
        headingEn: '3. Connect maths to real life',
        bodyFr: `Les mathématiques ne sont pas une abstraction réservée aux livres scolaires. Elles sont partout : dans la cuisine (fractions lors d'une recette), dans le marché (pourcentages de réduction), dans le foot (statistiques, angles de tir), dans l'architecture (géométrie).\n\nNotre enseignant Paul Essomba a l'habitude d'ouvrir ses cours de géométrie par une photo de bâtiment à Douala et de demander aux élèves d'y trouver les formes géométriques. Ce simple ancrage dans le réel transforme une leçon abstraite en exploration enthousiasmante.`,
        bodyEn: `Mathematics is not an abstraction reserved for textbooks. It is everywhere: in the kitchen (fractions in a recipe), in the market (discount percentages), in football (statistics, shooting angles), in architecture (geometry).\n\nOur teacher Paul Essomba habitually opens his geometry lessons with a photo of a building in Douala and asks students to find the geometric shapes in it. This simple real-world anchor transforms an abstract lesson into an exciting exploration.`,
        tipFr: `Jeu du marché : lors des courses, demandez à votre enfant de calculer mentalement le total et la monnaie à rendre. Ce jeu concret développe le calcul rapide et la confiance en soi.`,
        tipEn: `Market game: while shopping, ask your child to mentally calculate the total and change due. This concrete game develops quick calculation and self-confidence.`,
      },
      {
        headingFr: '4. Accepter l\'erreur comme un outil',
        headingEn: '4. Accept mistakes as a tool',
        bodyFr: `Dans beaucoup de familles camerounaises, l'erreur est vécue comme une honte. Or, en mathématiques, l'erreur est le matériau principal de l'apprentissage. Un élève qui n'ose pas se tromper n'ose pas essayer — et qui n'essaie pas n'apprend pas.\n\nQuand votre enfant fait une erreur, ne dites pas "c'est faux". Dites "intéressant, explique-moi comment tu as raisonné". Cette question oblige à retracer le cheminement mental et à identifier exactement où le raisonnement a dévié. C'est bien plus puissant que simplement donner la bonne réponse.`,
        bodyEn: `In many Cameroonian families, making a mistake is experienced as a shame. Yet in mathematics, mistakes are the main raw material of learning. A student who is afraid to be wrong is afraid to try — and someone who does not try does not learn.\n\nWhen your child makes a mistake, do not say "that's wrong". Say "interesting — explain how you reasoned". This question forces a retracing of the mental path and identifies exactly where the reasoning went off track. This is far more powerful than simply giving the right answer.`,
      },
      {
        headingFr: '5. Valoriser chaque progrès',
        headingEn: '5. Value every step of progress',
        bodyFr: `La confiance en soi en mathématiques se construit brique par brique. Une note de 12/20 après des mois à 6/20 est une victoire immense qui mérite d'être célébrée — pas minimisée d'un "oui mais tu aurais pu avoir 15".\n\nTenez un journal des progrès avec votre enfant : une liste de tout ce qu'il ne savait pas faire il y a un mois et qu'il maîtrise aujourd'hui. Relire ce journal dans les moments de découragement rappelle que le chemin parcouru est réel, même si la destination semble encore loin.`,
        bodyEn: `Self-confidence in mathematics is built brick by brick. A mark of 12/20 after months of 6/20 is an immense victory that deserves to be celebrated — not minimised with "yes but you could have got 15".\n\nKeep a progress journal with your child: a list of everything they could not do a month ago that they now master. Re-reading this journal in moments of discouragement is a reminder that the ground covered is real, even if the destination still seems far away.`,
      },
    ],
    keyPointsFr: [
      'Comprendre d\'abord, mémoriser ensuite',
      '20 min par jour valent mieux que 3 h le week-end',
      'Ancrer les concepts dans des situations du quotidien',
      'Traiter l\'erreur comme une information, pas une honte',
      'Célébrer chaque progrès, même petit',
    ],
    keyPointsEn: [
      'Understand first, memorise later',
      '20 min per day beats 3 hours at the weekend',
      'Anchor concepts in everyday situations',
      'Treat mistakes as information, not shame',
      'Celebrate every step of progress, however small',
    ],
    conclusionFr: `Aimer les mathématiques n'est pas un talent inné : c'est le résultat d'une pédagogie bienveillante, de pratique régulière et d'un environnement qui autorise l'erreur. Si votre enfant souffre encore en maths, ce n'est pas une fatalité — c'est un signal que la méthode doit changer. C'est précisément notre spécialité chez PES.`,
    conclusionEn: `Loving mathematics is not an innate talent — it is the result of supportive teaching, regular practice, and an environment that allows mistakes. If your child is still struggling with maths, it is not inevitable — it is a signal that the method needs to change. That is precisely our speciality at PES.`,
  },

  /* ─── 3. Motivation scolaire ─── */
  {
    slug: 'motivation-scolaire-annee',
    image: '/images/rester-discipler.jpg',
    titleFr: 'Maintenir la motivation scolaire toute l\'année',
    titleEn: 'Keeping school motivation all year round',
    date: '10 fév. 2026',
    dateEn: 'Feb 10, 2026',
    category: 'Conseils',
    categoryEn: 'Tips',
    readTime: 6,
    color: '#7C3AED',
    authorName: 'Jeanne Fotso',
    authorRoleFr: 'Responsable section primaire · Psychologie scolaire',
    authorRoleEn: 'Primary Section Head · Educational Psychology',
    authorInitials: 'JF',
    authorColor: '#DB2777',
    introFr: `En septembre, l'enthousiasme est palpable : nouveaux cahiers, nouveaux stylos, promesses d'une année parfaite. En janvier, la réalité frappe : fatigue accumulée, cours difficiles, baisse des notes. Comment maintenir l'élan sur neuf mois d'école ?\n\nLa motivation scolaire n'est pas un robinet qu'on ouvre ou ferme. C'est un écosystème qu'on entretient quotidiennement. Voici les leviers concrets que nous utilisons à MAS pour que chaque élève reste engagé du premier jour de classe au dernier.`,
    introEn: `In September, the enthusiasm is palpable: new notebooks, new pens, promises of a perfect year. In January, reality strikes: accumulated fatigue, difficult lessons, falling grades. How do you maintain momentum across nine months of school?\n\nSchool motivation is not a tap you open or shut. It is an ecosystem maintained daily. Here are the concrete levers we use at PES to keep every student engaged from the first day of school to the last.`,
    sections: [
      {
        headingFr: 'Comprendre les deux types de motivation',
        headingEn: 'Understanding the two types of motivation',
        bodyFr: `Les psychologues distinguent la motivation extrinsèque (travailler pour une récompense ou pour éviter une punition) de la motivation intrinsèque (travailler parce qu'on y trouve un sens ou un plaisir). La seconde est bien plus durable.\n\nUn enfant qui travaille uniquement pour avoir de bonnes notes ou éviter les punitions parentales sera épuisé avant la fin du premier trimestre. Notre objectif chez PES est toujours de connecter l'apprentissage à quelque chose qui compte pour l'élève : son futur métier rêvé, sa curiosité naturelle, la fierté de comprendre enfin un concept difficile.`,
        bodyEn: `Psychologists distinguish between extrinsic motivation (working for a reward or to avoid punishment) and intrinsic motivation (working because one finds meaning or pleasure in it). The latter is far more sustainable.\n\nA child who works solely for good grades or to avoid parental punishment will be exhausted before the end of the first term. Our goal at PES is always to connect learning to something that matters to the student: their dream future job, their natural curiosity, the pride of finally understanding a difficult concept.`,
        tipFr: `Posez cette question à votre enfant : "Qu'est-ce que tu voudrais faire quand tu seras grand ?" Puis montrez-lui concrètement pourquoi les matières qu'il apprend aujourd'hui y mènent. Ce pont entre le présent et le futur est extraordinairement motivant.`,
        tipEn: `Ask your child: "What would you like to do when you grow up?" Then show them concretely why the subjects they are learning today lead there. This bridge between the present and the future is extraordinarily motivating.`,
      },
      {
        headingFr: 'Créer une routine qui protège l\'énergie',
        headingEn: 'Creating a routine that protects energy',
        bodyFr: `La motivation n'est pas une ressource infinie : elle s'épuise. Les élèves qui "attendent d'avoir envie" pour travailler échouent. Les élèves qui ont une routine solide réussissent — même les jours sans envie.\n\nUne bonne routine scolaire comprend : une heure fixe de travail (de préférence après un goûter et 30 min de jeu libre), un espace dédié sans écrans, un ordre des matières qui alterne difficile et facile, et une pause de 10 min toutes les 45 min. Cette structure préserve l'énergie cognitive et transforme le travail en habitude plutôt qu'en épreuve.`,
        bodyEn: `Motivation is not an infinite resource — it depletes. Students who "wait until they feel like it" to work fail. Students who have a solid routine succeed — even on days when they do not feel like it.\n\nA good school routine includes: a fixed work time (preferably after a snack and 30 minutes of free play), a dedicated screen-free space, an order of subjects that alternates between difficult and easy, and a 10-minute break every 45 minutes. This structure preserves cognitive energy and turns work into a habit rather than an ordeal.`,
      },
      {
        headingFr: 'Gérer les périodes de creux',
        headingEn: 'Managing low-motivation periods',
        bodyFr: `Janvier-février et avril sont les deux périodes creuses classiques : après les fêtes et en fin d'année scolaire. Les notes baissent, la fatigue s'accumule, les élèves doutent d'eux-mêmes. C'est normal — et c'est gérable.\n\nDans ces périodes, réduisez les exigences de quantité et augmentez la qualité. Plutôt que de réviser 3 h, faites 1 h de travail de haute qualité avec un objectif précis. Félicitez les efforts, pas seulement les résultats. Et surtout, ne laissez pas une mauvaise note créer une spirale de découragement : analysez-la ensemble comme un diagnostic, pas comme un jugement.`,
        bodyEn: `January-February and April are the two classic low periods: after the holidays and at the end of the school year. Grades drop, fatigue accumulates, and students doubt themselves. This is normal — and it is manageable.\n\nDuring these periods, reduce the quantity demands and increase quality. Rather than revising for 3 hours, do 1 hour of high-quality work with a precise objective. Praise efforts, not just results. And above all, do not let a bad grade create a spiral of discouragement — analyse it together as a diagnosis, not a judgement.`,
        tipFr: `Le "tableau de victoires" : affichez dans la chambre de votre enfant une feuille où il note chaque semaine une chose qu'il a accomplie. En période de creux, relire ces victoires passées restaure la confiance en 5 minutes.`,
        tipEn: `The "wins board": display in your child's room a sheet where they note each week one thing they have accomplished. During low periods, re-reading these past wins restores confidence in 5 minutes.`,
      },
      {
        headingFr: 'Le rôle irremplaçable de l\'entourage',
        headingEn: 'The irreplaceable role of the people around them',
        bodyFr: `Un enfant entouré d'adultes qui croient en lui accomplit des choses qu'il n'aurait jamais tentées seul. Des études en psychologie de l'éducation montrent que l'effet "pygmalion" — le fait d'être perçu comme capable — a un impact mesurable sur les résultats scolaires.\n\nConcrètement : dites à votre enfant ce que vous avez observé de positif ("j'ai vu que tu as relu ton cours sans qu'on te le demande"), posez des questions sur ce qu'il apprend plutôt que sur ses notes, et montrez un intérêt sincère pour ce qui le passionne à l'école. Ces petites attentions construisent un socle de confiance qui résiste aux moments difficiles.`,
        bodyEn: `A child surrounded by adults who believe in them achieves things they would never have attempted alone. Studies in educational psychology show that the "Pygmalion effect" — being perceived as capable — has a measurable impact on academic results.\n\nIn practice: tell your child what you observed that was positive ("I noticed you re-read your lesson without being asked"), ask questions about what they are learning rather than their grades, and show genuine interest in what excites them at school. These small attentions build a foundation of confidence that withstands difficult moments.`,
      },
    ],
    keyPointsFr: [
      'Privilégier la motivation intrinsèque (sens, curiosité) à l\'extrinsèque (notes, punitions)',
      'Bâtir une routine fixe plutôt qu\'attendre l\'envie',
      'Gérer les creux de janvier et avril sans catastrophisme',
      'Féliciter les efforts autant que les résultats',
      'Être un adulte qui croit en son enfant — l\'effet Pygmalion est réel',
    ],
    keyPointsEn: [
      'Favour intrinsic motivation (meaning, curiosity) over extrinsic (grades, punishments)',
      'Build a fixed routine rather than waiting to feel motivated',
      'Manage the January and April low periods without catastrophising',
      'Praise efforts as much as results',
      'Be an adult who believes in your child — the Pygmalion effect is real',
    ],
    conclusionFr: `La motivation scolaire est une plante qui pousse dans un sol nourri de confiance, de routine et de sens. Elle ne pousse pas seule — elle a besoin des adultes qui entourent l'enfant. En tant que parent, vous avez plus de pouvoir que vous ne le croyez sur l'engagement scolaire de votre enfant. Et chez PES, nous sommes là pour être vos alliés dans cette mission.`,
    conclusionEn: `School motivation is a plant that grows in soil nourished by trust, routine and meaning. It does not grow alone — it needs the adults around the child. As a parent, you have more power than you realise over your child's school engagement. And at PES, we are here to be your allies in this mission.`,
  },

  /* ─── 4. Anglais bilingue ─── */
  {
    slug: 'anglais-bilingue-cameroun',
    image: "/images/l'anglais.jpg",
    titleFr: 'Maîtriser l\'anglais dans le système bilingue camerounais',
    titleEn: 'Mastering English in the Cameroonian bilingual system',
    date: '20 jan. 2026',
    dateEn: 'Jan 20, 2026',
    category: 'Anglais',
    categoryEn: 'English',
    readTime: 5,
    color: '#D97706',
    authorName: 'Alice Nguema',
    authorRoleFr: 'Référente bilingue · Anglais & Allemand',
    authorRoleEn: 'Bilingual Lead · English & German',
    authorInitials: 'AN',
    authorColor: '#D97706',
    introFr: `Le Cameroun est l'un des rares pays au monde à avoir deux langues officielles d'enseignement : le français et l'anglais. Cette réalité est une chance extraordinaire — mais elle est souvent mal exploitée. Des millions d'élèves francophones sortent du lycée avec un anglais scolaire fragile, incapables de communiquer fluidement dans la langue de Shakespeare.\n\nComment changer cela ? Comment faire du bilinguisme camerounais un vrai avantage compétitif pour votre enfant ? C'est ce que nous allons explorer ensemble.`,
    introEn: `Cameroon is one of the rare countries in the world with two official languages of instruction: French and English. This reality is an extraordinary asset — but it is often poorly exploited. Millions of francophone students leave secondary school with fragile school English, unable to communicate fluently in the language of Shakespeare.\n\nHow can this be changed? How can Cameroonian bilingualism become a genuine competitive advantage for your child? That is what we will explore together.`,
    sections: [
      {
        headingFr: 'Pourquoi l\'anglais scolaire ne suffit pas',
        headingEn: 'Why school English is not enough',
        bodyFr: `L'anglais enseigné dans les établissements francophones camerounais souffre d'un mal structurel : il est trop axé sur la grammaire et la traduction, pas assez sur la communication réelle. Un élève peut connaître les règles des temps verbaux sur le bout des doigts et être incapable d'engager une conversation de 5 minutes.\n\nLa raison est simple : on apprend une langue en la parlant, pas en l'analysant. Le cerveau acquiert la fluidité par l'exposition répétée à des contextes authentiques — films, musiques, conversations — pas par la mémorisation de règles.`,
        bodyEn: `The English taught in Cameroonian francophone schools suffers from a structural flaw: it is too focused on grammar and translation, and not enough on real communication. A student can know verb tense rules inside out yet be unable to hold a 5-minute conversation.\n\nThe reason is simple: one learns a language by speaking it, not by analysing it. The brain acquires fluency through repeated exposure to authentic contexts — films, music, conversations — not through memorising rules.`,
        tipFr: `Changez la langue d'interface du téléphone de votre enfant en anglais. Ce simple geste crée une exposition quotidienne à des centaines de mots dans un contexte signifiant.`,
        tipEn: `Change the interface language of your child's phone to English. This simple gesture creates daily exposure to hundreds of words in a meaningful context.`,
      },
      {
        headingFr: 'Les 4 piliers d\'un anglais solide',
        headingEn: 'The 4 pillars of solid English',
        bodyFr: `Comprendre (listening), parler (speaking), lire (reading), écrire (writing) : ces quatre compétences doivent être développées en parallèle, pas séquentiellement. Malheureusement, le système scolaire camerounais sur-pondère l'écrit et l'écrit formel, au détriment de l'oral.\n\nNos cours d'anglais chez PES intègrent systématiquement des activités orales : jeux de rôle, débats en anglais sur des sujets d'actualité, présentation orale de 2 minutes. Ces exercices semblent inconfortables au début — c'est exactement ce que nous cherchons. L'inconfort cognitif est le signal que le cerveau est en train d'apprendre.`,
        bodyEn: `Listening, speaking, reading, writing: these four skills must be developed in parallel, not sequentially. Unfortunately, the Cameroonian school system over-weights writing and formal writing, at the expense of oral communication.\n\nOur English lessons at PES systematically include oral activities: role plays, debates in English on current affairs topics, 2-minute oral presentations. These exercises feel uncomfortable at first — which is exactly what we are looking for. Cognitive discomfort is the signal that the brain is learning.`,
      },
      {
        headingFr: 'Exploiter le contexte anglophone camerounais',
        headingEn: 'Leveraging the Cameroonian anglophone context',
        bodyFr: `L'une des ressources les plus sous-utilisées par les élèves francophones est la proximité géographique des régions anglophones du Cameroun. Les familles de Douala ont accès à des locuteurs natifs de l'anglais camerounais à quelques heures de route.\n\nEncouragez les échanges avec des élèves anglophones via les réseaux sociaux ou des programmes d'échanges. À MAS, nous organisons ponctuellement des sessions mixtes franco-anglophones où les élèves doivent communiquer exclusivement en anglais. Ces immersions courtes mais intenses accélèrent dramatiquement la fluidité.`,
        bodyEn: `One of the most underused resources by francophone students is the geographical proximity of Cameroon's anglophone regions. Families in Douala can reach native Cameroonian English speakers within a few hours' drive.\n\nEncourage exchanges with anglophone students via social media or exchange programmes. At PES, we periodically organise mixed franco-anglophone sessions where students must communicate exclusively in English. These short but intense immersions dramatically accelerate fluency.`,
        tipFr: `Série TV recommandée pour les élèves du collège : "Dix pour cent" existe en version anglaise ("Call My Agent"), et passer de la version française à la version anglaise du même épisode est un exercice de compréhension orale excellentissime.`,
        tipEn: `Recommended TV series for middle school students: watch the same episode first in French ("Dix pour cent") then in English ("Call My Agent"). Switching versions is an excellent listening comprehension exercise.`,
      },
    ],
    keyPointsFr: [
      'L\'anglais s\'apprend en parlant, pas en mémorisant des règles',
      'Développer les 4 compétences en parallèle (oral, écrit, lecture, écoute)',
      'Changer la langue d\'interface des appareils numériques',
      'Exploiter la richesse bilingue du contexte camerounais',
      'Accepter l\'inconfort de parler avant d\'être prêt',
    ],
    keyPointsEn: [
      'English is learnt by speaking, not memorising rules',
      'Develop all 4 skills in parallel (speaking, writing, reading, listening)',
      'Change the interface language of digital devices',
      'Leverage the bilingual richness of the Cameroonian context',
      'Accept the discomfort of speaking before being ready',
    ],
    conclusionFr: `Le bilinguisme camerounais est une richesse que trop d'élèves laissent inexploitée. Dans un monde où l'anglais est la langue des affaires, de la technologie et de la recherche, maîtriser cette langue n'est pas un luxe — c'est une nécessité. Nos enseignants bilingues chez PES sont passionnés par l'idée de faire de chaque élève un vrai bilingue, pas seulement un élève qui passe l'examen.`,
    conclusionEn: `Cameroonian bilingualism is an asset that too many students leave unexploited. In a world where English is the language of business, technology and research, mastering this language is not a luxury — it is a necessity. Our bilingual teachers at PES are passionate about making every student a true bilingual, not just a student who passes the exam.`,
  },

  /* ─── 5. BAC série C ─── */
  {
    slug: 'bac-serie-c-conseils',
    image: '/images/cles-succes-bac.jpg',
    titleFr: 'BAC série C : les clés pour décrocher la mention',
    titleEn: 'BAC série C: keys to getting a distinction',
    date: '5 jan. 2026',
    dateEn: 'Jan 5, 2026',
    category: 'Examens',
    categoryEn: 'Exams',
    readTime: 7,
    color: '#DB2777',
    authorName: 'Paul Essomba',
    authorRoleFr: 'Coordinateur lycée · SVT & Chimie',
    authorRoleEn: 'High School Coordinator · Biology & Chemistry',
    authorInitials: 'PE',
    authorColor: '#16A34A',
    introFr: `Le BAC série C est, de l'avis de nombreux enseignants camerounais, l'examen le plus exigeant de l'enseignement secondaire. Il combine la rigueur des mathématiques, la précision des sciences physiques et la profondeur des SVT. Réussir ce BAC est un exploit ; décrocher la mention, c'est entrer dans le cercle des élèves d'élite.\n\nComment y parvenir ? Nous avons interviewé nos meilleurs enseignants et analysé les bulletins de nos 30 derniers mentions pour dégager une méthode reproductible.`,
    introEn: `BAC série C is, in the view of many Cameroonian teachers, the most demanding examination in secondary education. It combines the rigour of mathematics, the precision of physical sciences and the depth of biology. Passing this BAC is an achievement; getting a distinction means entering the circle of elite students.\n\nHow can it be achieved? We interviewed our best teachers and analysed the results of our last 30 distinction holders to extract a reproducible method.`,
    sections: [
      {
        headingFr: 'Comprendre la grille de notation du jury',
        headingEn: 'Understanding the jury\'s marking scheme',
        bodyFr: `Avant de réviser, il faut comprendre comment on est noté. Le jury du BAC C évalue trois dimensions : les connaissances (savoir), les compétences (savoir-faire) et l'expression (savoir communiquer). La plupart des élèves ne travaillent que la première dimension — et c'est pour ça qu'ils plafonnent à 12/20.\n\nLa mention Bien (14/20) ou Très Bien (16/20) s'obtient en maîtrisant aussi le savoir-faire : résoudre des problèmes inconnus, transférer des connaissances à des contextes nouveaux. En Sciences physiques, cela signifie savoir dériver une formule, pas juste l'appliquer. En Maths, cela signifie justifier chaque étape, pas juste donner le résultat.`,
        bodyEn: `Before revising, you must understand how you are marked. The BAC C jury evaluates three dimensions: knowledge (knowing), skills (knowing how to do), and expression (knowing how to communicate). Most students only work on the first dimension — which is why they plateau at 12/20.\n\nA Merit (14/20) or Distinction (16/20) is achieved by also mastering the know-how: solving unfamiliar problems, transferring knowledge to new contexts. In Physical Sciences, this means being able to derive a formula, not just apply it. In Maths, it means justifying every step, not just giving the result.`,
        tipFr: `Demandez à votre enseignant de vous montrer le barème officiel du dernier BAC. Identifiez les points attribués à la "démarche" plutôt qu'au résultat final — c'est souvent 40 à 50 % de la note.`,
        tipEn: `Ask your teacher to show you the official mark scheme from the last BAC. Identify the points awarded for the "approach" rather than the final result — this is often 40 to 50% of the mark.`,
      },
      {
        headingFr: 'Planifier ses révisions sur 6 mois',
        headingEn: 'Planning revision over 6 months',
        bodyFr: `Les élèves qui décrochent la mention ne commencent pas à réviser en avril. Ils construisent, dès le début de la terminale, une base solide qui leur permet d'aborder les derniers mois sereinement.\n\nNotre programme recommandé : de septembre à décembre, solidifier les bases et remplir les lacunes identifiées en première. De janvier à mars, travailler les problèmes complexes et les sujets transversaux. D'avril à juin, exclusivement des sujets d'annales en conditions d'examen, suivis d'une correction minutieuse.`,
        bodyEn: `Students who get distinctions do not start revising in April. From the very beginning of their final year, they build a solid foundation that allows them to approach the last months serenely.\n\nOur recommended programme: September to December — solidify the foundations and fill gaps identified in the penultimate year. January to March — work on complex problems and cross-disciplinary topics. April to June — exclusively past exam papers under exam conditions, followed by meticulous correction.`,
      },
      {
        headingFr: 'Les matières coefficientées : prioriser sans négliger',
        headingEn: 'High-coefficient subjects: prioritise without neglecting',
        bodyFr: `En série C, les Mathématiques et les Sciences Physiques ont les coefficients les plus élevés. Un point gagné en Maths vaut davantage qu'un point en Histoire. Mais attention : beaucoup d'élèves font l'erreur inverse — négliger les matières littéraires et perdre des points "faciles".\n\nLa stratégie optimale : viser 16+ en Maths et Sciences Physiques, maintenir 14 en SVT, et ne jamais descendre sous 12 dans les matières littéraires et sportives. Cette répartition arithmétique garantit la mention si elle est respectée.`,
        bodyEn: `In série C, Mathematics and Physical Sciences have the highest coefficients. A point gained in Maths is worth more than a point in History. However, many students make the opposite mistake — neglecting literary subjects and losing "easy" points.\n\nThe optimal strategy: aim for 16+ in Maths and Physical Sciences, maintain 14 in Biology, and never drop below 12 in literary and sports subjects. This arithmetic distribution guarantees a distinction if respected.`,
        tipFr: `Calculez votre moyenne cible matière par matière avant l'examen. Si votre moyenne simulée atteint 14, vous savez que la mention Bien est accessible. Cette clarté arithmétique remplace le vague et l'anxiété.`,
        tipEn: `Calculate your target grade subject by subject before the exam. If your simulated average reaches 14, you know a Merit is within reach. This arithmetic clarity replaces vagueness and anxiety.`,
      },
    ],
    keyPointsFr: [
      'Comprendre les 3 dimensions de notation : connaissances, compétences, expression',
      'Commencer les révisions dès septembre de terminale',
      'Prioriser les matières à fort coefficient sans négliger les autres',
      'Faire des annales sous chrono chaque semaine à partir d\'avril',
      'Justifier chaque étape de raisonnement, même évidente',
    ],
    keyPointsEn: [
      'Understand the 3 marking dimensions: knowledge, skills, expression',
      'Start revising from September of final year',
      'Prioritise high-coefficient subjects without neglecting others',
      'Do timed past papers every week from April',
      'Justify every step of reasoning, even obvious ones',
    ],
    conclusionFr: `La mention au BAC série C n'est pas un hasard : c'est le résultat d'une stratégie construite sur deux ans, d'une discipline quotidienne et d'un encadrement de qualité. Si votre enfant est en terminale C et vise la mention, il est encore temps de mettre en place les bonnes habitudes. Notre équipe de spécialistes BAC chez PES est prête à l'accompagner.`,
    conclusionEn: `A BAC série C distinction is not a matter of chance — it is the result of a strategy built over two years, daily discipline and quality guidance. If your child is in their final year of série C and aims for a distinction, there is still time to establish the right habits. Our BAC specialist team at PES is ready to support them.`,
  },

  /* ─── 6. Stress examens ─── */
  {
    slug: 'stress-examens-gestion',
    image: '/images/gerer-le-stress.jpg',
    titleFr: 'Gérer le stress avant les examens : guide pratique',
    titleEn: 'Managing exam stress: a practical guide',
    date: '15 déc. 2025',
    dateEn: 'Dec 15, 2025',
    category: 'Bien-être',
    categoryEn: 'Well-being',
    readTime: 4,
    color: '#059669',
    authorName: 'Jeanne Fotso',
    authorRoleFr: 'Responsable section primaire · Psychologie scolaire',
    authorRoleEn: 'Primary Section Head · Educational Psychology',
    authorInitials: 'JF',
    authorColor: '#DB2777',
    introFr: `Un peu de stress avant un examen est sain : il mobilise l'attention, affûte la concentration et libère l'énergie nécessaire à la performance. Mais au-delà d'un certain seuil, ce même stress devient un ennemi : il provoque des blocages, des trous de mémoire et des erreurs stupides sur des questions connues.\n\nComment aider votre enfant à maintenir ce stress dans la zone utile ? Les neurosciences et la psychologie scolaire ont beaucoup à nous dire sur ce sujet. Voici les approches que nous utilisons chez PES avec succès.`,
    introEn: `A little stress before an exam is healthy — it mobilises attention, sharpens concentration and releases the energy needed for performance. But beyond a certain threshold, this same stress becomes an enemy: it causes blocks, memory blanks and silly mistakes on questions that are known.\n\nHow can you help your child keep this stress in the useful zone? Neuroscience and educational psychology have much to tell us on this subject. Here are the approaches we use successfully at PES.`,
    sections: [
      {
        headingFr: 'Démystifier l\'examen : ce qu\'il est vraiment',
        headingEn: 'Demystifying the exam: what it really is',
        bodyFr: `La première source de stress est la représentation mentale de l'examen comme un événement extraordinaire, une épreuve existentielle dont dépend toute la vie future. Cette dramatisation est contre-productive et souvent transmise inconsciemment par les parents.\n\nRappelez à votre enfant qu'un examen est simplement une conversation sur papier avec des enseignants qui veulent vérifier ce qu'il sait. Qu'il a le droit à l'erreur. Que même en cas d'échec, la vie continue et les possibilités de rattrapage existent. Cette dédramatisation n'enlève pas l'importance de l'examen — elle enlève la terreur paralysante.`,
        bodyEn: `The first source of stress is the mental image of the exam as an extraordinary event, an existential test on which all of future life depends. This dramatisation is counterproductive and often unconsciously transmitted by parents.\n\nRemind your child that an exam is simply a paper conversation with teachers who want to check what they know. That they are allowed to make mistakes. That even in case of failure, life goes on and catch-up opportunities exist. This de-dramatisation does not reduce the importance of the exam — it removes the paralysing terror.`,
        tipFr: `"L'examen passé" : demandez à votre enfant d'imaginer qu'il est un an après l'examen. Comment va-t-il ? Qu'est-ce qui lui semble important maintenant ? Cette projection dans le futur met les choses en perspective.`,
        tipEn: `"The exam that's over": ask your child to imagine it is one year after the exam. How are they? What seems important now? This projection into the future puts things in perspective.`,
      },
      {
        headingFr: 'Techniques de régulation corporelle',
        headingEn: 'Body regulation techniques',
        bodyFr: `Le stress est d'abord une réaction du corps. Le cortisol et l'adrénaline accélèrent le cœur, tendent les muscles, perturbent le sommeil. Pour retrouver le calme, il faut passer par le corps — les techniques purement cognitives (se dire "calme-toi") sont inefficaces.\n\nLes deux techniques les plus efficaces et les plus faciles à enseigner aux élèves : la respiration 4-7-8 (inspirer 4 secondes, retenir 7 secondes, expirer 8 secondes — 3 cycles suffisent à calmer le système nerveux) et la relaxation musculaire progressive (contracter puis relâcher chaque groupe musculaire). Ces techniques peuvent être pratiquées la veille de l'examen et même pendant, entre deux exercices.`,
        bodyEn: `Stress is primarily a bodily reaction. Cortisol and adrenaline speed up the heart, tense the muscles, and disrupt sleep. To regain calm, one must go through the body — purely cognitive techniques (telling oneself "calm down") are ineffective.\n\nThe two most effective and easiest techniques to teach students: 4-7-8 breathing (inhale 4 seconds, hold 7 seconds, exhale 8 seconds — 3 cycles are enough to calm the nervous system) and progressive muscle relaxation (tense then release each muscle group). These techniques can be practised the evening before the exam and even during it, between exercises.`,
      },
      {
        headingFr: 'Préparer le "jour J" comme un rituel',
        headingEn: 'Preparing "D-Day" as a ritual',
        bodyFr: `Les sportifs de haut niveau ne laissent rien au hasard le jour de la compétition : heure de réveil fixe, repas précis, échauffement rituel. Cette approche s'applique parfaitement aux examens.\n\nLa veille : pas de révision intensive après 20 h, dîner léger, préparation du matériel (trousse, carte d'identité, convocation), coucher à l'heure habituelle. Le matin : réveil 90 min avant, petit-déjeuner complet (glucides lents + protéines), relecture de 3 fiches maximum. Ces rituels envoient un signal puissant au cerveau : "je suis préparé, je suis prêt".`,
        bodyEn: `Elite athletes leave nothing to chance on competition day: fixed wake-up time, specific meal, ritual warm-up. This approach applies perfectly to exams.\n\nThe evening before: no intensive revision after 8 pm, light dinner, preparation of equipment (pencil case, ID, examination permit), bed at the usual time. The morning: wake up 90 minutes early, full breakfast (slow carbohydrates + protein), read at most 3 summary sheets. These rituals send a powerful signal to the brain: "I am prepared, I am ready".`,
        tipFr: `La liste de préparation : imprimez une checklist que votre enfant coche la veille de chaque examen. Carte d'identité ✓, convocation ✓, stylos ✓, eau ✓, collation ✓. Ce rituel simple réduit l'anxiété du "j'ai oublié quelque chose".`,
        tipEn: `The preparation checklist: print a checklist for your child to tick the evening before each exam. ID ✓, exam permit ✓, pens ✓, water ✓, snack ✓. This simple ritual reduces the anxiety of "I have forgotten something".`,
      },
    ],
    keyPointsFr: [
      'Un peu de stress est utile — l\'objectif est de le maintenir dans la zone optimale',
      'Dédramatiser : l\'examen n\'est pas une question de vie ou de mort',
      'La respiration 4-7-8 calme le système nerveux en moins de 2 minutes',
      'Préparer le "jour J" comme un rituel avec une checklist',
      'Éviter les révisions intensives la veille au soir',
    ],
    keyPointsEn: [
      'Some stress is useful — the goal is to keep it in the optimal zone',
      'De-dramatise: the exam is not a matter of life and death',
      '4-7-8 breathing calms the nervous system in under 2 minutes',
      'Prepare "D-Day" as a ritual with a checklist',
      'Avoid intensive revision the evening before',
    ],
    conclusionFr: `Gérer le stress n'est pas une faiblesse — c'est une compétence. Et comme toute compétence, elle s'apprend et se pratique. Les élèves qui réussissent le mieux les examens ne sont pas ceux qui ne stressent pas, mais ceux qui ont appris à transformer leur stress en carburant. Chez PES, nous intégrons cette dimension psychologique dans tous nos programmes de préparation aux examens.`,
    conclusionEn: `Managing stress is not a weakness — it is a skill. And like any skill, it can be learnt and practised. The students who perform best in exams are not those who do not feel stress, but those who have learnt to transform their stress into fuel. At PES, we integrate this psychological dimension into all our exam preparation programmes.`,
  },
];

/* ═══════════════════════════════════════════════════════════
   RELATED POSTS helper
═══════════════════════════════════════════════════════════ */
function getRelated(currentSlug: string, isFr: boolean, locale: string) {
  return ARTICLES.filter((a) => a.slug !== currentSlug).slice(0, 3);
}

/* ═══════════════════════════════════════════════════════════
   METADATA
═══════════════════════════════════════════════════════════ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  const isFr = locale === 'fr';
  return {
    title: `${isFr ? article.titleFr : article.titleEn} | PES Blog`,
    description: isFr ? article.introFr.slice(0, 155) : article.introEn.slice(0, 155),
  };
}

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

/* ═══════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════ */
export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'blog' });
  const isFr = locale === 'fr';

  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = getRelated(slug, isFr, locale);

  return (
    <div className="bg-[var(--background)] min-h-screen">

      {/* ── Reading progress bar (client) ── */}
      <ReadingProgress color={article.color} />

      {/* ══════════════════════════════════════════════════
          HERO — full-width image with overlay
      ══════════════════════════════════════════════════ */}
      <div className="relative w-full" style={{ height: 'min(65vh, 520px)' }}>
        <Image
          src={article.image}
          alt={isFr ? article.titleFr : article.titleEn}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back link */}
        <div className="absolute top-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full"
          >
            <ArrowLeft size={15} />
            {isFr ? 'Retour au blog' : 'Back to blog'}
          </Link>
        </div>

        {/* Title block at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide"
                style={{ backgroundColor: article.color }}
              >
                {isFr ? article.category : article.categoryEn}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs">
                <Clock size={12} />
                {article.readTime} {t('min_read')}
              </span>
              <span className="flex items-center gap-1.5 text-white/70 text-xs">
                <Calendar size={12} />
                {isFr ? article.date : article.dateEn}
              </span>
            </div>
            <h1 className="font-display font-black text-3xl md:text-5xl text-white leading-tight drop-shadow-lg">
              {isFr ? article.titleFr : article.titleEn}
            </h1>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          CONTENT LAYOUT
      ══════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">

          {/* ── Main article body ── */}
          <article>

            {/* Author strip */}
            <div className="flex items-center gap-3 mb-10 pb-8 border-b border-[var(--border-color)]">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                style={{ background: `linear-gradient(135deg, ${article.authorColor}, ${article.authorColor}bb)` }}
              >
                {article.authorInitials}
              </div>
              <div>
                <p className="font-semibold text-sm text-[var(--text-primary)]">{article.authorName}</p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {isFr ? article.authorRoleFr : article.authorRoleEn}
                </p>
              </div>
              <button
                className="ml-auto flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] px-3 py-1.5 rounded-full transition-colors"
                title={isFr ? 'Partager cet article' : 'Share this article'}
              >
                <Share2 size={12} />
                {isFr ? 'Partager' : 'Share'}
              </button>
            </div>

            {/* Intro */}
            {(isFr ? article.introFr : article.introEn).split('\n\n').map((para, i) => (
              <p key={i} className="text-lg text-[var(--text-secondary)] leading-relaxed mb-5">
                {para}
              </p>
            ))}

            {/* Key points box */}
            <div
              className="my-10 rounded-2xl p-6 border"
              style={{
                background: `linear-gradient(to right, ${article.color}10, ${article.color}06)`,
                borderColor: `${article.color}30`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen size={16} style={{ color: article.color }} />
                <span className="font-bold text-sm uppercase tracking-wide" style={{ color: article.color }}>
                  {isFr ? 'Ce que vous allez retenir' : 'Key takeaways'}
                </span>
              </div>
              <ul className="space-y-2">
                {(isFr ? article.keyPointsFr : article.keyPointsEn).map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: article.color }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sections */}
            {article.sections.map((section, i) => (
              <div key={i} className="mb-12">
                <h2
                  id={`section-${i}`}
                  className="font-display font-bold text-2xl text-[var(--text-primary)] mb-5 mt-10 flex items-center gap-3"
                >
                  <span
                    className="inline-block w-1.5 h-8 rounded-full flex-shrink-0"
                    style={{ backgroundColor: article.color }}
                  />
                  {isFr ? section.headingFr : section.headingEn}
                </h2>

                {(isFr ? section.bodyFr : section.bodyEn).split('\n\n').map((para, j) => (
                  <p key={j} className="text-[var(--text-secondary)] leading-relaxed mb-4">
                    {para}
                  </p>
                ))}

                {(isFr ? section.tipFr : section.tipEn) && (
                  <div
                    className="flex gap-3 p-4 rounded-xl mt-5 border"
                    style={{
                      background: `linear-gradient(to right, ${article.color}12, ${article.color}06)`,
                      borderColor: `${article.color}28`,
                    }}
                  >
                    <Lightbulb size={18} className="flex-shrink-0 mt-0.5" style={{ color: article.color }} />
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {isFr ? section.tipFr : section.tipEn}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div
              className="mt-12 p-6 rounded-2xl border-l-4"
              style={{
                borderLeftColor: article.color,
                background: 'var(--background-soft)',
              }}
            >
              <p className="text-[var(--text-secondary)] leading-relaxed italic">
                {isFr ? article.conclusionFr : article.conclusionEn}
              </p>
            </div>

            {/* Author bio card */}
            <div className="mt-14 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] flex gap-5">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-white font-black text-xl"
                style={{ background: `linear-gradient(135deg, ${article.authorColor}, ${article.authorColor}aa)` }}
              >
                {article.authorInitials}
              </div>
              <div>
                <p className="font-bold text-[var(--text-primary)] mb-0.5">{article.authorName}</p>
                <p className="text-sm text-[var(--text-secondary)] mb-2">
                  {isFr ? article.authorRoleFr : article.authorRoleEn}
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {isFr
                    ? `Enseignant expert à la MAS depuis plus de 10 ans. Spécialiste de la pédagogie active et de la préparation aux examens officiels camerounais.`
                    : `Expert teacher at PES for over 10 years. Specialist in active pedagogy and preparation for official Cameroonian examinations.`}
                </p>
              </div>
            </div>

          </article>

          {/* ── Sticky sidebar ── */}
          <aside className="hidden lg:block sticky top-24 space-y-6">

            {/* Table of contents */}
            <div className="p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)]">
              <p className="font-bold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wide">
                {isFr ? 'Dans cet article' : 'In this article'}
              </p>
              <ol className="space-y-2">
                {article.sections.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="flex items-start gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
                    >
                      <span
                        className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: article.color }}
                      />
                      {isFr ? s.headingFr : s.headingEn}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* CTA sidebar */}
            <div
              className="p-5 rounded-2xl text-white overflow-hidden relative"
              style={{ background: `linear-gradient(135deg, ${article.color}, ${article.color}bb)` }}
            >
              <div className="absolute -right-4 -bottom-4 font-black text-[7rem] leading-none select-none pointer-events-none opacity-10 text-white">
                MAS
              </div>
              <p className="font-bold text-base mb-1 relative">
                {isFr ? 'Votre enfant a besoin d\'aide ?' : 'Does your child need help?'}
              </p>
              <p className="text-sm text-white/80 mb-4 relative">
                {isFr
                  ? 'Prenez rendez-vous pour un bilan gratuit.'
                  : 'Book a free assessment.'}
              </p>
              <Link
                href={`/${locale}/auth/login`}
                className="inline-flex items-center gap-1.5 bg-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-opacity hover:opacity-90 relative"
                style={{ color: article.color }}
              >
                {isFr ? 'Bilan gratuit' : 'Free assessment'}
                <ArrowRight size={14} />
              </Link>
            </div>

          </aside>
        </div>

        {/* ══════════════════════════════════════════════════
            RELATED ARTICLES
        ══════════════════════════════════════════════════ */}
        <div className="mt-20 pt-12 border-t border-[var(--border-color)]">
          <h2 className="font-display font-bold text-2xl text-[var(--text-primary)] mb-8">
            {isFr ? 'Articles qui pourraient vous intéresser' : 'Articles you might enjoy'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((rel) => (
              <Link key={rel.slug} href={`/${locale}/blog/${rel.slug}`} className="group block">
                <article className="h-full flex flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--background-soft)] overflow-hidden hover:shadow-[0_4px_20px_rgb(0_0_0/0.09)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden bg-[var(--background-muted)]">
                    <Image
                      src={rel.image}
                      alt={isFr ? rel.titleFr : rel.titleEn}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: rel.color }}
                    >
                      {isFr ? rel.category : rel.categoryEn}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)] transition-colors leading-snug flex-1">
                      {isFr ? rel.titleFr : rel.titleEn}
                    </h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border-color)]">
                      <span className="flex items-center gap-1 text-[10px] text-[var(--text-secondary)]">
                        <Clock size={10} />
                        {rel.readTime} {t('min_read')}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[var(--accent-primary)] text-xs font-medium group-hover:gap-1.5 transition-all">
                        {t('read_more')} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            NEWSLETTER
        ══════════════════════════════════════════════════ */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[var(--accent-primary)] to-[#7C3AED] text-white text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-3">{t('newsletter_title')}</h2>
          <p className="text-white/80 mb-7 max-w-md mx-auto">{t('newsletter_subtitle')}</p>
          <NewsletterForm />
        </div>

      </div>
    </div>
  );
}
