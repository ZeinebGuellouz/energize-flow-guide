import { ReactNode } from "react";
import benefitWeightloss from "@/assets/benefit-weightloss.jpg";
import benefitMuscle from "@/assets/benefit-muscle.jpg";
import benefitRecovery from "@/assets/benefit-recovery.jpg";

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  keyword: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  date: string; // ISO
  updated?: string;
  author: string;
  readingMinutes: number;
  draft?: boolean;
  related: string[]; // slugs
  body: ReactNode;
};

const AUTHOR = "Équipe VitaFit Fréjus Plage";

export const ARTICLES: Article[] = [
  {
    slug: "ems-ou-salle-de-sport",
    title: "EMS ou salle de sport classique : que choisir à Fréjus ?",
    seoTitle:
      "EMS ou salle de sport à Fréjus : comparatif, résultats & prix",
    description:
      "EMS ou salle de sport classique à Fréjus ? Comparatif honnête : temps, résultats, encadrement, prix. Comment choisir selon votre objectif.",
    keyword: "ems ou salle de sport",
    excerpt:
      "20 minutes d'EMS ou 1h30 de musculation ? On compare honnêtement les deux approches à Fréjus, avec les résultats, les prix et pour qui c'est fait.",
    cover: benefitMuscle,
    coverAlt: "Séance d'électrostimulation EMS dans une salle de sport à Fréjus Plage",
    date: "2026-06-15",
    author: AUTHOR,
    readingMinutes: 7,
    related: ["perte-de-poids-ems-frejus", "nutrition-sportive-recuperation"],
    body: (
      <>
        <p>
          Si vous cherchez une <strong>salle de sport à Fréjus</strong>, vous avez sans doute
          remarqué que l'offre a beaucoup évolué. À côté des grandes enseignes de musculation,
          des studios d'<strong>électrostimulation musculaire (EMS)</strong> comme VitaFit Fréjus
          Plage proposent désormais un format radicalement différent : 20 minutes de séance,
          encadrées par un coach, avec une combinaison qui active jusqu'à 350 muscles en même temps.
          Alors, EMS ou salle de sport classique&nbsp;? La réponse dépend surtout de votre objectif,
          du temps dont vous disposez et du type d'accompagnement que vous recherchez.
        </p>

        <h2>1. Le temps passé à s'entraîner</h2>
        <p>
          C'est probablement la différence la plus visible. Une séance en salle de sport
          traditionnelle demande en général entre <strong>60 et 90 minutes</strong> : échauffement,
          cardio, séries de musculation, étirements. Multipliez par 2 à 4 séances par semaine et
          vous voilà à 4 à 6 heures d'activité, sans compter les trajets.
        </p>
        <p>
          En EMS, une séance dure <strong>20 minutes</strong>, une à deux fois par semaine.
          Les impulsions électriques recrutent en profondeur les fibres musculaires que vous
          activeriez naturellement en salle, mais de manière plus dense. Pour un actif de Fréjus,
          un parent, ou toute personne dont l'agenda est saturé, c'est souvent le format le plus
          réaliste sur la durée &mdash; et la régularité reste le facteur numéro un du résultat.
        </p>

        <h2>2. Les résultats visés : perte de poids, tonification, remise en forme</h2>
        <p>
          Une salle de sport classique reste un excellent choix si vous aimez la charge lourde,
          la performance ou la préparation à un sport spécifique. En revanche, si votre objectif
          est la <strong>perte de poids</strong>, la <strong>tonification</strong> ou une
          <strong> remise en forme progressive</strong>, l'EMS a plusieurs atouts.
        </p>
        <ul>
          <li>Recrutement musculaire plus complet (profond + superficiel).</li>
          <li>Sollicitation intense sans impact articulaire &mdash; utile après une blessure,
          en surpoids ou en reprise du sport.</li>
          <li>Dépense énergétique élevée sur 20 min, prolongée par l'afterburn les heures suivantes.</li>
        </ul>
        <p>
          Chez VitaFit, nous voyons régulièrement des personnes perdre du volume au niveau de la
          taille, des cuisses ou des bras en 6 à 10 séances, à condition d'associer les séances
          à une nutrition cohérente &mdash; ce que nous accompagnons dans notre programme
          {" "}<a href="/nutrition">nutrition sportive</a>.
        </p>

        <h2>3. L'encadrement et la sécurité</h2>
        <p>
          Dans une grande salle, vous êtes le plus souvent seul face aux machines. Cela convient
          aux pratiquants avancés, moins aux débutants qui risquent des mauvaises postures ou
          un abandon après quelques semaines. En EMS, un coach est présent à chaque séance :
          il règle l'intensité muscle par muscle, corrige la posture, adapte les exercices à
          votre niveau. C'est un vrai coaching personnalisé, ce qui explique pourquoi
          la progression est souvent plus rapide.
        </p>

        <h2>4. Le prix : ce que vous payez vraiment</h2>
        <p>
          Une salle de sport à Fréjus tourne autour de 20 à 40&nbsp;€ par mois pour un accès
          libre. C'est peu, mais uniquement pour l'accès aux machines &mdash; sans coach, sans
          programme, sans suivi. Ajoutez un coaching individuel et vous grimpez rapidement.
        </p>
        <p>
          L'EMS est plus cher à la séance, mais chaque séance inclut le coach, la combinaison,
          le programme et le suivi. Chez VitaFit Fréjus Plage, vous pouvez tester la méthode
          avec une <strong>première séance à -50&nbsp;%</strong>. Retrouvez le détail sur notre
          page <a href="/tarifs">tarifs</a>.
        </p>

        <h2>5. Pour qui l'EMS est particulièrement adaptée</h2>
        <p>
          L'EMS convient particulièrement aux personnes qui&nbsp;:
        </p>
        <ul>
          <li>manquent de temps mais veulent des résultats mesurables&nbsp;;</li>
          <li>reprennent le sport après une longue pause ou une grossesse&nbsp;;</li>
          <li>souhaitent perdre du poids sans traumatiser les articulations&nbsp;;</li>
          <li>veulent un cadre motivant plutôt qu'une salle anonyme.</li>
        </ul>

        <h2>Alors, EMS ou salle de sport ?</h2>
        <p>
          Les deux fonctionnent. La vraie question est&nbsp;: laquelle allez-vous pratiquer
          régulièrement pendant 6 mois&nbsp;? Si vous aimez le format libre et long, gardez
          la salle classique. Si vous voulez un rendez-vous court, encadré, efficace et
          adapté à votre corps, l'EMS est probablement le bon choix. Le mieux reste encore
          d'essayer une séance et de comparer par vous-même.
        </p>
        <p>
          Pour découvrir la méthode dans notre studio à Fréjus Plage, réservez votre séance
          via notre <a href="/contact">page contact</a> ou revenez sur la
          {" "}<a href="/">page d'accueil</a> pour tout savoir sur VitaFit.
        </p>
      </>
    ),
  },
  {
    slug: "perte-de-poids-ems-frejus",
    title: "Perte de poids et EMS à Fréjus : ce qui marche vraiment",
    seoTitle: "Perte de poids EMS Fréjus : méthode, résultats & conseils",
    description:
      "Perte de poids avec l'EMS à Fréjus : comment ça marche, en combien de temps, quels résultats attendre et comment associer nutrition et coaching.",
    keyword: "perte de poids frejus",
    excerpt:
      "Combien de kilos peut-on réellement perdre avec l'EMS ? Méthode, rythme, alimentation : le guide complet pour une perte de poids durable à Fréjus.",
    cover: benefitWeightloss,
    coverAlt: "Coaching perte de poids et EMS à Fréjus Plage",
    date: "2026-06-22",
    author: AUTHOR,
    readingMinutes: 8,
    related: ["ems-ou-salle-de-sport", "nutrition-sportive-recuperation"],
    body: (
      <>
        <p>
          La <strong>perte de poids à Fréjus</strong> est l'une des demandes les plus fréquentes
          dans notre studio. Bonne nouvelle&nbsp;: l'électrostimulation musculaire (EMS) est
          particulièrement efficace pour cet objectif, à condition de comprendre comment elle
          fonctionne et de l'associer à quelques bons réflexes nutritionnels. Voici un guide
          honnête, sans promesse magique, pour savoir à quoi vous attendre.
        </p>

        <h2>Pourquoi l'EMS aide à perdre du poids</h2>
        <p>
          La perte de poids repose sur un principe simple&nbsp;: dépenser plus d'énergie que ce
          que l'on consomme, tout en préservant sa masse musculaire. L'EMS agit sur ces deux
          leviers en même temps.
        </p>
        <ul>
          <li>
            <strong>Dépense énergétique élevée&nbsp;:</strong> 20 minutes d'EMS activent jusqu'à
            350 muscles simultanément. La séance sollicite le corps de manière très dense.
          </li>
          <li>
            <strong>Effet afterburn&nbsp;:</strong> après la séance, votre métabolisme reste
            élevé pendant plusieurs heures. Vous continuez à brûler des calories au repos.
          </li>
          <li>
            <strong>Maintien de la masse musculaire&nbsp;:</strong> contrairement aux régimes
            seuls, l'EMS préserve et renforce le muscle, ce qui évite l'effet «&nbsp;yoyo&nbsp;».
          </li>
        </ul>

        <h2>Combien de kilos en combien de temps ?</h2>
        <p>
          Chaque corps est différent, mais nous observons chez la plupart de nos clients
          <strong> 2 à 5&nbsp;kg perdus sur 6 à 10 séances</strong>, à raison d'une à deux
          séances par semaine. Plus important encore&nbsp;: la silhouette change nettement
          &mdash; taille plus fine, cuisses plus toniques, ventre plus plat &mdash; parfois
          avant même que la balance ne bouge, parce que vous gagnez du muscle et perdez du gras.
        </p>
        <p>
          Attention aux promesses de «&nbsp;10&nbsp;kg en 1 mois&nbsp;»&nbsp;: elles sont
          rarement durables et souvent obtenues au détriment de la masse musculaire. L'objectif
          d'un studio sérieux à Fréjus Plage, c'est une perte de poids stable, sur laquelle
          vous n'aurez pas besoin de revenir.
        </p>

        <h2>Le rôle de la nutrition</h2>
        <p>
          Aucun entraînement, aussi efficace soit-il, ne compense une alimentation déséquilibrée.
          Sur nos programmes minceur, nous accompagnons chaque client sur des principes simples&nbsp;:
        </p>
        <ul>
          <li>Un petit-déjeuner riche en protéines pour couper les envies de sucré.</li>
          <li>Des repas structurés autour de protéines, légumes et bonnes graisses.</li>
          <li>Une hydratation suffisante &mdash; souvent sous-estimée l'été à Fréjus.</li>
          <li>Des collations intelligentes plutôt que le grignotage.</li>
        </ul>
        <p>
          Nous détaillons cette approche sur notre page <a href="/nutrition">nutrition</a>,
          et notre bar à smoothies permet de tester la récupération post-séance dans notre
          studio.
        </p>

        <h2>Le protocole recommandé à Fréjus Plage</h2>
        <p>
          Pour une perte de poids visible et durable, nous recommandons&nbsp;:
        </p>
        <ol>
          <li>Un bilan initial (poids, mensurations, objectifs, mode de vie).</li>
          <li>1 à 2 séances EMS par semaine pendant 6 à 10 semaines.</li>
          <li>Un plan nutrition adapté à votre quotidien, sans frustration.</li>
          <li>Un suivi régulier avec votre coach pour ajuster l'intensité et le programme.</li>
        </ol>

        <h2>Les erreurs à éviter</h2>
        <ul>
          <li>Sauter des repas&nbsp;: le corps stocke encore plus au repas suivant.</li>
          <li>Multiplier les séances par obsession&nbsp;: le muscle a besoin de récupération.</li>
          <li>Attendre la motivation&nbsp;: c'est la régularité qui installe le résultat.</li>
          <li>Se peser tous les jours&nbsp;: une fois par semaine, à jeun, suffit largement.</li>
        </ul>

        <h2>Prêt(e) à commencer ?</h2>
        <p>
          Si vous voulez tester la méthode, la <strong>première séance est à -50&nbsp;%</strong>.
          C'est le format idéal pour découvrir la sensation, poser vos questions et voir si
          le studio vous correspond. Retrouvez les formules sur la page <a href="/tarifs">tarifs</a>,
          consultez notre <a href="/">page d'accueil</a> pour une vue globale, ou contactez-nous
          via la <a href="/contact">page contact</a>. Un objectif de perte de poids clair, un
          coach à vos côtés et un cadre motivant &mdash; c'est souvent tout ce qui manque pour
          enfin voir des résultats.
        </p>
      </>
    ),
  },
  {
    slug: "nutrition-sportive-recuperation",
    title: "Nutrition sportive et récupération : bien manger autour de vos séances",
    seoTitle: "Nutrition sportive & récupération EMS à Fréjus Plage",
    description:
      "Que manger avant et après une séance EMS à Fréjus ? Le guide nutrition et récupération pour maximiser vos résultats sportifs.",
    keyword: "nutrition sportive frejus",
    excerpt:
      "Avant, pendant, après : le guide pratique pour bien manger autour de vos séances EMS et accélérer la récupération musculaire.",
    cover: benefitRecovery,
    coverAlt: "Nutrition sportive et récupération à Fréjus Plage",
    date: "2026-06-29",
    author: AUTHOR,
    readingMinutes: 7,
    related: ["perte-de-poids-ems-frejus", "ems-ou-salle-de-sport"],
    body: (
      <>
        <p>
          On l'oublie souvent&nbsp;: <strong>vos résultats se jouent autant dans l'assiette
          que dans la salle</strong>. Une bonne nutrition sportive amplifie les effets de vos
          séances EMS, accélère la récupération musculaire et vous évite le fameux coup de
          barre du lendemain. Voici, sans jargon, ce que nous conseillons à nos clients de
          VitaFit Fréjus Plage.
        </p>

        <h2>Avant la séance : donner du carburant sans alourdir</h2>
        <p>
          L'objectif du repas d'avant-séance est simple&nbsp;: avoir de l'énergie disponible
          sans se sentir lourd. Idéalement 1h30 à 2h avant la séance&nbsp;:
        </p>
        <ul>
          <li>Une source de glucides à index modéré : riz complet, patate douce, flocons d'avoine.</li>
          <li>Une portion de protéines maigres : œuf, poulet, poisson, tofu.</li>
          <li>Un peu de légumes, peu de matières grasses (elles ralentissent la digestion).</li>
        </ul>
        <p>
          Si vous êtes pressé, une banane et une poignée d'amandes 30 minutes avant font
          parfaitement l'affaire. À éviter&nbsp;: les plats gras, les sauces lourdes et
          l'alcool la veille &mdash; vous le sentirez pendant la séance.
        </p>

        <h2>Pendant la séance : l'hydratation avant tout</h2>
        <p>
          Une séance EMS dure 20 minutes, vous n'avez donc pas besoin de manger pendant. En
          revanche, l'hydratation est cruciale&nbsp;: les impulsions passent mieux, les muscles
          répondent mieux, la récupération est plus rapide. Buvez de l'eau régulièrement dans
          la journée, pas seulement pendant la séance. À Fréjus Plage, avec la chaleur, comptez
          au minimum 1,5 à 2 litres par jour.
        </p>

        <h2>Après la séance : la fenêtre métabolique</h2>
        <p>
          C'est la période la plus stratégique. Dans les 30 à 60 minutes après l'EMS, le corps
          absorbe particulièrement bien les nutriments&nbsp;: c'est le moment de nourrir le
          muscle et de lancer la récupération.
        </p>
        <ul>
          <li>
            <strong>Protéines&nbsp;:</strong> 20 à 30&nbsp;g pour la reconstruction musculaire
            (yaourt grec, blanc de poulet, shake protéiné, smoothie).
          </li>
          <li>
            <strong>Glucides&nbsp;:</strong> pour refaire les réserves d'énergie (fruits, riz,
            pain complet).
          </li>
          <li>
            <strong>Hydratation + minéraux&nbsp;:</strong> eau, éventuellement enrichie en
            magnésium.
          </li>
        </ul>
        <p>
          C'est aussi pour ça que nous avons ouvert un <strong>bar à smoothies</strong> dans
          le studio&nbsp;: en une minute, vous avez une collation post-séance parfaitement
          calibrée. Découvrez notre approche complète sur la page <a href="/nutrition">nutrition</a>.
        </p>

        <h2>Les 24 heures qui suivent : dormir et bien manger</h2>
        <p>
          La croissance musculaire et la perte de gras se produisent surtout <em>en dehors</em>
          {" "}de la séance, pendant la récupération. Deux règles simples&nbsp;:
        </p>
        <ul>
          <li>
            <strong>7 à 9 heures de sommeil.</strong> C'est là que le corps répare et sécrète
            les hormones qui construisent le muscle et brûlent la graisse.
          </li>
          <li>
            <strong>Repas structurés le lendemain</strong> avec protéines, légumes, féculents
            à index modéré. Évitez la sensation de faim prolongée qui pousse au grignotage sucré.
          </li>
        </ul>

        <h2>Compléments : utiles ou pas ?</h2>
        <p>
          Les compléments ne remplacent jamais une bonne alimentation, mais certains sont utiles
          quand le quotidien est chargé&nbsp;:
        </p>
        <ul>
          <li>Protéines en poudre pour compléter les apports.</li>
          <li>Magnésium pour la récupération et le sommeil.</li>
          <li>Oméga-3 pour limiter l'inflammation musculaire.</li>
        </ul>
        <p>
          Chez VitaFit Fréjus Plage, nous vous orientons uniquement vers ce qui vous est vraiment
          utile, en fonction de votre objectif (perte de poids, tonification, prise de masse).
        </p>

        <h2>Envie d'un accompagnement complet ?</h2>
        <p>
          Nutrition, EMS et coaching forment un trio gagnant. Si vous voulez enfin combiner
          les trois dans un cadre premium à Fréjus Plage, découvrez nos formules sur la
          page <a href="/tarifs">tarifs</a>, contactez-nous via la
          {" "}<a href="/contact">page contact</a>, ou revenez sur la
          {" "}<a href="/">page d'accueil</a> pour tout savoir sur le studio.
        </p>
      </>
    ),
  },
];

export const getPublishedArticles = () =>
  ARTICLES.filter((a) => !a.draft).sort((a, b) => (a.date < b.date ? 1 : -1));

export const getArticleBySlug = (slug: string) =>
  ARTICLES.find((a) => a.slug === slug);
