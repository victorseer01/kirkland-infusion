export const SITE = {
  name: "Kirkland Specialty Infusion Center",
  shortName: "KSIC",
  tagline: "Your Patient. Our Priority. Every Time.",
  description:
    "Physician-supervised infusions, financial advocacy for every patient, and seamless communication with referring offices. Kirkland, Washington.",
  url: "https://www.kirklandspecialtyinfusions.com",
  domain: "kirklandspecialtyinfusions.com",
  address: {
    line1: "12911 120th Avenue N.E., Suite C-80",
    city: "Kirkland",
    state: "WA",
    zip: "98034",
  },
  phone: "(425) 453-0766",
  phoneExt: "105",
  phoneTel: "+14254530766",
  fax: "(425) 533-2540",
  email: "infusion@kirklandspecialty.com",
  hours: {
    weekdays: "Monday to Friday: 7:30 AM to 5:00 PM",
    weekend: "Saturday & Sunday: Closed",
  },
  affiliatedWith: "Evergreen Rheumatology",
  oaoc: {
    name: "Overlake Arthritis and Osteoporosis Center",
    shortName: "OAOC",
    url: "https://www.overlakearthritis.com",
  },
} as const;

export type NavChild = {
  href: string;
  label: string;
  description?: string;
};

export type NavLink = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const NAV_LINKS: NavLink[] = [
  {
    label: "ABOUT US",
    children: [
      {
        href: "/about",
        label: "About Us",
        description: "Our story and standards",
      },
      {
        href: "/team",
        label: "Our Team",
        description: "Meet your care team",
      },
    ],
  },
  {
    label: "SERVICES",
    children: [
      {
        href: "/specialties",
        label: "Specialties & Conditions",
        description: "Multiple specialties, one suite",
      },
      {
        href: "/medications",
        label: "Medications & Therapies",
        description: "Our specialty formulary",
      },
    ],
  },
  {
    label: "FOR PATIENTS",
    children: [
      {
        href: "/patients",
        label: "What to Expect",
        description: "Before, during, and after your infusion",
      },
      {
        href: "/insurance",
        label: "Insurance & Financial Aid",
        description: "Coverage, copay, and assistance",
      },
      {
        href: "/faqs",
        label: "FAQs",
        description: "Quick answers to common questions",
      },
    ],
  },
  { href: "/physicians", label: "FOR PHYSICIANS" },
  { href: "/contact", label: "CONTACT" },
];

export const ALL_ROUTES: string[] = [
  "/",
  ...NAV_LINKS.flatMap((l) =>
    l.href ? [l.href] : (l.children?.map((c) => c.href) ?? []),
  ),
];

export const THREE_PILLARS = [
  {
    title: "Physician-Supervised",
    body: "A licensed provider is present in the suite for every infusion. This is not the industry standard. It is ours.",
  },
  {
    title: "Financial Advocacy",
    body: "Copay assistance, manufacturer support programs, foundation grants. We pursue every avenue so cost is rarely the barrier.",
  },
  {
    title: "Seamless Communication",
    body: "We close the loop with your referring office after every infusion, medication received, tolerance, next visit scheduled.",
  },
] as const;

// Conditions are named individually (not lumped under umbrella terms such as
// "inflammatory arthritis") so a patient can find their specific diagnosis by
// name. Therapies are grouped under the specialty that uses them; biologics that
// span specialties are listed under each relevant one.
export const SPECIALTIES = [
  {
    slug: "rheumatology",
    name: "Rheumatology",
    body: "Biologic and non-biologic infusions for systemic inflammatory and autoimmune disease, administered under physician supervision.",
    conditions: [
      "Rheumatoid arthritis",
      "Psoriatic arthritis",
      "Ankylosing spondylitis / axial spondyloarthritis",
      "Lupus (systemic lupus erythematosus)",
      "Vasculitis",
      "Gout",
      "Polymyalgia rheumatica",
      "Giant cell arteritis",
    ],
    therapies: [
      "Actemra",
      "Benlysta",
      "Cimzia",
      "Cosentyx",
      "Ilaris",
      "Ilumya",
      "Krystexxa",
      "Octagam (IVIG)",
      "Orencia",
      "Remicade",
      "Rituxan",
      "Saphnelo",
      "Simponi Aria",
      "Stelara",
    ],
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    body: "Biologic infusions for inflammatory bowel disease.",
    conditions: ["Crohn's disease", "Ulcerative colitis"],
    therapies: ["Entyvio", "Remicade", "Stelara", "Simponi Aria"],
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    body: "Biologic infusions for immune-mediated skin disease.",
    conditions: [
      "Severe plaque psoriasis",
      "Psoriatic disease",
      "Hidradenitis suppurativa",
    ],
    therapies: ["Cosentyx", "Ilumya", "Remicade", "Stelara"],
  },
  {
    slug: "neurology",
    name: "Neurology / MS",
    body: "Therapies for neuroinflammatory and neuromuscular conditions.",
    conditions: [
      "Multiple sclerosis",
      "Neuromyelitis optica spectrum disorder",
      "Myasthenia gravis",
      "Chronic inflammatory demyelinating polyneuropathy (CIDP)",
    ],
    therapies: ["Ocrevus", "Uplizna", "Vyvgart", "Octagam (IVIG)"],
  },
  {
    slug: "osteoporosis-bone-health",
    name: "Osteoporosis & Bone Health",
    body: "Anabolic and antiresorptive bone-building infusions, with DEXA coordination.",
    conditions: [
      "Severe osteoporosis",
      "High fracture risk / prior fragility fracture",
    ],
    therapies: ["Evenity"],
  },
  {
    slug: "allergy-immunology",
    name: "Allergy & Immunology",
    body: "IVIG and biologic therapies for immunodeficiency and immunologic disease.",
    conditions: ["Primary immunodeficiency", "Secondary immunodeficiency"],
    therapies: ["Octagam (IVIG)"],
  },
  {
    slug: "endocrinology",
    name: "Endocrinology",
    body: "Specialty infusions with full prior authorization and financial advocacy support.",
    conditions: ["Thyroid eye disease (Graves' ophthalmopathy)"],
    therapies: ["Tepezza"],
  },
] as const;

// Each medication links to its manufacturer's official site (opens in a new tab).
export const MEDICATIONS = [
  {
    name: "Actemra",
    generic: "Tocilizumab",
    indication:
      "Rheumatoid arthritis, giant cell arteritis, systemic juvenile idiopathic arthritis, cytokine release syndrome",
    url: "https://www.actemra.com/",
  },
  {
    name: "Benlysta",
    generic: "Belimumab",
    indication: "Systemic lupus erythematosus, lupus nephritis",
    url: "https://www.benlysta.com/",
  },
  {
    name: "Cimzia",
    generic: "Certolizumab pegol",
    indication:
      "Rheumatoid arthritis, psoriatic arthritis, axial spondyloarthritis, Crohn's disease, psoriasis",
    url: "https://www.cimzia.com/",
  },
  {
    name: "Cosentyx",
    generic: "Secukinumab",
    indication:
      "Psoriasis, psoriatic arthritis, axial spondyloarthritis, hidradenitis suppurativa",
    url: "https://www.cosentyx.com/",
  },
  {
    name: "Entyvio",
    generic: "Vedolizumab",
    indication: "Crohn's disease, ulcerative colitis",
    url: "https://www.entyvio.com/",
  },
  {
    name: "Evenity",
    generic: "Romosozumab",
    indication: "Severe osteoporosis with high fracture risk",
    url: "https://www.evenity.com/",
  },
  {
    name: "Ilaris",
    generic: "Canakinumab",
    indication: "Periodic fever syndromes, Still's disease, gout flares",
    url: "https://www.ilaris.com/",
  },
  {
    name: "Ilumya",
    generic: "Tildrakizumab",
    indication: "Moderate to severe plaque psoriasis",
    url: "https://www.ilumya.com/",
  },
  {
    name: "Krystexxa",
    generic: "Pegloticase",
    indication: "Uncontrolled chronic gout refractory to conventional therapy",
    url: "https://www.krystexxa.com/",
  },
  {
    name: "Octagam (IVIG)",
    generic: "Intravenous immunoglobulin",
    indication:
      "Primary and secondary immunodeficiency, immune thrombocytopenia, neuroinflammatory disease",
    url: "https://octagamusa.com/",
  },
  {
    name: "Orencia",
    generic: "Abatacept",
    indication:
      "Rheumatoid arthritis, psoriatic arthritis, juvenile idiopathic arthritis",
    url: "https://www.orencia.com/",
  },
  {
    name: "Pemgarda",
    generic: "Pemivibart",
    indication:
      "COVID-19 pre-exposure prophylaxis for immunocompromised patients",
    url: "https://pemgarda.com/",
  },
  {
    name: "Remicade",
    generic: "Infliximab",
    indication:
      "Rheumatoid arthritis, ankylosing spondylitis, psoriatic arthritis, Crohn's disease, ulcerative colitis, psoriasis",
    url: "https://www.remicade.com/",
  },
  {
    name: "Rituxan",
    generic: "Rituximab",
    indication:
      "Rheumatoid arthritis, vasculitis, non-Hodgkin lymphoma, chronic lymphocytic leukemia, immune thrombocytopenia",
    url: "https://www.rituxan.com/",
  },
  {
    name: "Saphnelo",
    generic: "Anifrolumab",
    indication: "Systemic lupus erythematosus",
    url: "https://www.saphnelohcp.com/",
  },
  {
    name: "Simponi Aria",
    generic: "Golimumab IV",
    indication:
      "Rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis",
    url: "https://www.simponiaria.com/",
  },
  {
    name: "Stelara",
    generic: "Ustekinumab",
    indication:
      "Psoriasis, psoriatic arthritis, Crohn's disease, ulcerative colitis",
    url: "https://www.stelarainfo.com/",
  },
  {
    name: "Tepezza",
    generic: "Teprotumumab",
    indication: "Thyroid eye disease (Graves' ophthalmopathy)",
    url: "https://www.tepezza.com/",
  },
  {
    name: "Uplizna",
    generic: "Inebilizumab",
    indication: "Neuromyelitis optica spectrum disorder",
    url: "https://www.uplizna.com/",
  },
  {
    name: "Vyvgart",
    generic: "Efgartigimod",
    indication: "Generalized myasthenia gravis",
    url: "https://www.vyvgart.com/",
  },
  {
    name: "Ocrevus",
    generic: "Ocrelizumab",
    indication: "Relapsing and primary progressive multiple sclerosis",
    url: "https://www.ocrevus.com/",
  },
] as const;

export const CASH_PAY_SERVICES = [
  {
    name: "B12 Injection",
    body: "Vitamin B12 supplementation for fatigue, peripheral neuropathy, and confirmed B12 deficiency.",
  },
  {
    name: "Vitamin D Injection",
    body: "High-dose vitamin D for documented deficiency or insufficiency.",
  },
  {
    name: "Myers Cocktail IV",
    body: "A classic intravenous vitamin and mineral blend used to support energy, immunity, and recovery.",
  },
  {
    name: "Iron Infusion (Venofer)",
    body: "Intravenous iron sucrose for iron-deficiency anemia when oral iron is not tolerated or not effective.",
  },
  {
    name: "Joint Injections / PRP",
    body: "Therapeutic joint injections and platelet-rich plasma therapy for selected musculoskeletal conditions, administered by physician.",
  },
] as const;

export const SIX_STEP_PROCESS = [
  {
    number: "01",
    title: "Referral & Patient Coordination",
    body: "We receive your referral, verify insurance, and schedule the patient at their earliest convenience.",
  },
  {
    number: "02",
    title: "Prior Authorization",
    body: "Our team handles the full prior authorization process, including documentation, peer-to-peer support, and appeals, minimizing the work for your office.",
  },
  {
    number: "03",
    title: "Financial Advocacy",
    body: "We help patients access copay assistance, manufacturer support programs, and foundation grants to reduce financial barriers to care.",
  },
  {
    number: "04",
    title: "Pre-Infusion Safety Review",
    body: "We coordinate with referring providers to confirm labs, DEXA results when needed, and clinical baselines to help avoid treatment delays.",
  },
  {
    number: "05",
    title: "Infusion Day",
    body: "Patients receive care in a calm, private setting with licensed medical staff and a provider available for clinical oversight, guidance, and medication questions.",
  },
  {
    number: "06",
    title: "Follow-Up & Compliance",
    body: "We schedule future infusions and send reminders to support adherence and treatment continuity, with a clinical note returned to your office after every visit.",
  },
] as const;

// The patient journey is presented as three named stages, not a single
// timeline. The Pre-Infusion stage begins when the referral is received (not at
// "recognize symptoms", that is the referring physician's domain), and the
// nurse-practitioner visit is sequenced AFTER prior authorization is confirmed.
export const PATIENT_JOURNEY = [
  {
    stage: "01",
    name: "Pre-Infusion",
    lede: "Before infusion, we take care of the details, verifying benefits, exploring copay assistance and grants when available, and coordinating a provider check-in to review treatment and answer questions.",
    points: [
      {
        title: "We call you and schedule your provider appointment",
        body: "We will contact you to schedule a provider appointment, an opportunity to ask questions about your medication and treatment, and better understand what to expect before your infusion.",
      },
      {
        title: "Your pre-infusion provider visit",
        body: "You will meet with one of our Advanced Practice Providers (APPs) before your infusion to review your treatment, answer questions, and confirm you are ready for treatment. This visit also reinforces information discussed by your referring physician and provides time to discuss any concerns before infusion.",
      },
    ],
  },
  {
    stage: "02",
    name: "Infusion Day",
    lede: "On the day itself, your only job is to be comfortable. Here is what to expect so nothing is a surprise.",
    points: [
      {
        title: "What to bring, and to drink plenty of water",
        body: "Bring your insurance card, a photo ID, and a list of your current medications. Drink plenty of water beforehand, well-hydrated veins make starting your IV easier. Eat a normal meal unless told otherwise.",
      },
      {
        title: "A calm, private setting",
        body: "Our suite is calm and unhurried, patients read, work on a device, watch something, or simply rest in a comfortable chair. This is not a clinical-cold room, and you will not be one of a crowd.",
      },
      {
        title: "Who you will see, and how long it takes",
        body: "A licensed nurse starts your IV and stays with you, and a provider is always on site throughout. Most infusions take between thirty minutes and a few hours; we tell you exactly how long to plan for when we schedule you.",
      },
    ],
  },
  {
    stage: "03",
    name: "Post-Infusion Follow-Up",
    lede: "Your care does not end when the IV comes out. We stay with you after you go home, and we keep the cycle running smoothly to the next visit.",
    points: [
      {
        title: "A free nurse check-in by phone",
        body: "On the day of, or the day after, your infusion, one of our nurses calls you, free of charge, to check on how you are feeling. If anything is off, we want to hear about it early.",
      },
      {
        title: "We close the loop with your physician",
        body: "We send a note to your referring physician confirming you received your medication, how you tolerated it, and when you are scheduled next. Your whole care team stays informed.",
      },
      {
        title: "A managed, repeating cycle",
        body: "Your follow-up flows straight back into preparing for your next infusion, coverage re-checked, appointment booked, reminders sent. This is an ongoing, managed cycle, not a one-off, so you are never left wondering what comes next.",
      },
    ],
  },
] as const;

// FAQ content is client-approved copy (KSI FAQS.md), grouped into categories.
// Each answer is an intro paragraph (use \n\n for multiple), with optional
// bullet points and an optional closing note.
export type FaqItem = {
  q: string;
  a: string;
  bullets?: readonly string[];
  note?: string;
};

export type FaqCategory = {
  name: string;
  blurb?: string;
  intro?: string;
  items: readonly FaqItem[];
};

export const FAQ_CATEGORIES: readonly FaqCategory[] = [
  {
    name: "General",
    blurb: "About Kirkland Specialty Infusion Center",
    items: [
      {
        q: "What is Kirkland Specialty Infusion Center?",
        a: "We are a physician-led, outpatient specialty infusion suite located in Kirkland, Washington, affiliated with Evergreen Rheumatology, one of the Pacific Northwest's most respected rheumatology practices, with more than 20 years of specialty care.\n\nA licensed provider is present in the suite for every infusion, not nearby, not on call, but in the room.",
      },
      {
        q: "What is infusion therapy?",
        a: "Infusion therapy delivers medication directly into your bloodstream through an intravenous (IV) line. It is used when a medication cannot be taken by mouth effectively, works better when delivered by IV, or needs to be given with close clinical monitoring for your safety.",
      },
      {
        q: "Why would my doctor refer me for infusion therapy?",
        a: "Your physician may refer you for infusion therapy when:",
        bullets: [
          "Your condition requires a biologic or specialty medication only available by IV",
          "Oral medications have not provided enough relief",
          "The medication requires monitoring during administration",
          "Faster or more reliable absorption is needed for your treatment to work",
        ],
        note: "Your doctor chose this because it is the right treatment for you, and we will make the experience as smooth as possible.",
      },
      {
        q: "What conditions and specialties does KSIC serve?",
        a: "We welcome referrals from a wide range of specialties, including:",
        bullets: [
          "Rheumatology (RA, psoriatic arthritis, lupus, gout, ankylosing spondylitis)",
          "Gastroenterology (Crohn's disease, ulcerative colitis)",
          "Dermatology",
          "Neurology & MS",
          "Osteoporosis & Metabolic Bone Disease",
          "Allergy & Immunology (IVIG)",
          "Endocrinology",
        ],
      },
      {
        q: "What medications does KSIC offer?",
        a: "Our formulary includes more than 19 therapies. Some examples: Actemra, Benlysta, Cimzia, Cosentyx, Evenity, Ilaris, Ilumya, Krystexxa, Octagam (IVIG), Orencia, Pemgarda, Prolia, Remicade, Rituxan, Simponi Aria, Stelara, Tepezza, and others. Your physician will prescribe the right therapy for your diagnosis.",
      },
      {
        q: "How is Kirkland Specialty Infusion Center different from a hospital infusion suite?",
        a: "Several meaningful ways:",
        bullets: [
          "A physician is in the suite during every infusion, this is not the industry standard, it is ours",
          "Our suite is calm and private, not a busy hospital floor with rotating staff",
          "You will see the same faces visit after visit, staff who know your name, your treatment, and the small details that make your visit easier",
          "Our financial advocacy team pursues every available assistance program so cost is rarely the barrier",
          "We send a full clinical note back to your referring physician after every infusion",
        ],
      },
    ],
  },
  {
    name: "Billing & Insurance",
    blurb: "Cost should not stand between you and treatment",
    intro:
      "Our financial advocacy program exists because we have watched too many patients delay or decline treatment out of fear of the bill. We will not let that happen if there is any way to prevent it.",
    items: [
      {
        q: "Does KSIC accept my insurance?",
        a: "We accept most major commercial insurance plans, Medicare, and many Medicare Advantage plans, including Premera Blue Cross, Regence BlueShield, Aetna, Cigna, UnitedHealthcare, Kaiser Permanente PPO, and First Choice Health, among others.\n\nCall us with your insurance card in hand and we will give you a clear answer for your specific plan and medication before you commit to anything.",
      },
      {
        q: "Will my insurance cover my infusion therapy?",
        a: "Most specialty infusion medications are covered by commercial insurance and Medicare. Our team handles the prior authorization process for you, including any appeals, peer-to-peer reviews, and supporting documentation. You should not need to call your insurance company yourself.",
      },
      {
        q: "What if I cannot afford the copay or out-of-pocket costs?",
        a: "This is exactly what our financial advocacy team is here for. Before your first infusion, we will:",
        bullets: [
          "Estimate your out-of-pocket costs in writing",
          "Apply for manufacturer copay assistance programs",
          "Apply for patient assistance programs (PAPs) when applicable",
          "Identify and apply for foundation grants from organizations like the HealthWell Foundation, Patient Advocate Foundation, and Good Days",
        ],
        note: "Many of our patients pay little or nothing out of pocket. Before you decline a treatment for financial reasons, please let us run the numbers.",
      },
      {
        q: "Do I need a referral to be seen?",
        a: "Yes. Specialty infusion medications require a physician's prescription and referral. If your doctor has already referred you, our team will contact you within one to two business days of receiving that referral. If you believe you need infusion therapy but have not yet spoken to your doctor, please start there.",
      },
      {
        q: "What if my bill looks wrong?",
        a: "Call us immediately at (425) 453-0766 ext. 105. We will review the charges with you and contact your insurance company on your behalf if needed. You will not have to navigate a billing dispute alone.",
      },
    ],
  },
  {
    name: "Getting Scheduled",
    blurb: "From referral to your first appointment",
    items: [
      {
        q: "What happens after my doctor sends a referral?",
        a: "Once we receive your referral, a member of our team will call you within one to two business days. We will introduce ourselves, confirm your insurance, answer your initial questions, and schedule your first infusion at a time that works for you. We also handle prior authorization and work with your physician to confirm any required labs or screening before your first visit.",
      },
      {
        q: "How long will it take to get scheduled?",
        a: "Scheduling timelines depend on insurance prior authorization, which varies by plan and medication. Our team manages this process for you and works to get you scheduled as quickly as approvals allow. We will keep you informed throughout.",
      },
      {
        q: "How often will I need to come in?",
        a: "It depends on your medication. Some infusions are given every few weeks, others every few months. Your physician will outline the schedule, and our team will coordinate every appointment from there.",
      },
    ],
  },
  {
    name: "Before Your Visit",
    blurb: "How to prepare for your infusion",
    items: [
      {
        q: "How do I prepare for my infusion?",
        a: "For most infusions, the preparation is simple:",
        bullets: [
          "Eat a normal meal beforehand, unless your physician has told you otherwise",
          "Continue your regular medications unless specifically told to hold one",
          "Drink water and stay well hydrated",
          "Wear comfortable, loose clothing with easy access to one arm",
          "Bring something to keep you occupied, a book, tablet, headphones, or a show",
          "Bring your insurance card, a photo ID, and a list of current medications and supplements",
        ],
        note: "Arrive about 15 minutes before your scheduled time. Your care team will give you any medication-specific instructions before your appointment.",
      },
      {
        q: "What is a loading dose?",
        a: "Some medications start with a loading phase, a higher or more frequent initial dose to help the medication reach a therapeutic level in your body more quickly. After the loading period, you transition to a regular maintenance schedule. Your care team will explain what to expect for your specific therapy.",
      },
    ],
  },
  {
    name: "During Your Infusion",
    blurb: "What to expect in the chair",
    items: [
      {
        q: "Will my infusion hurt?",
        a: "The infusion itself is not painful. When your nurse places the IV catheter, you may feel a brief pinch, similar to having blood drawn. After that, the medication is delivered slowly and comfortably over a set period of time. Most patients read, watch something, or simply relax.",
      },
      {
        q: "How big is the needle?",
        a: "Very small, comparable to those used in children's hospitals. Your nurse will take every care to make placement quick and comfortable.",
      },
      {
        q: "Where is the IV placed?",
        a: "Typically in the arm. Your nurse will find the most comfortable and accessible site for you.",
      },
      {
        q: "How long does an infusion take?",
        a: "It depends on the medication. Some infusions take 15 to 30 minutes; others take two to four hours. We will tell you exactly how long to expect when we schedule your appointment. Here are a few examples:",
        bullets: [
          "Prolia: ~15 minutes",
          "Cimzia or Simponi Aria: 30-45 minutes",
          "Orencia or Benlysta: 45 min to 1.5 hours",
          "Remicade: ~2 hours",
          "Krystexxa: ~2 hours + 1-hour observation",
          "Rituxan or IVIG: 3-4+ hours",
        ],
      },
      {
        q: "Who will be supervising my infusion?",
        a: "A licensed registered nurse will administer your infusion. A physician or supervising provider will be present in the suite throughout your visit, available for questions, concerns, or any clinical decisions that arise. This is not standard practice at most infusion centers. It is standard practice here.",
      },
      {
        q: "Can I use the restroom during my infusion?",
        a: "Yes. Let your nurse know and the infusion can be paused. Depending on your medication, your nurse may assist you.",
      },
      {
        q: "Can I bring someone with me?",
        a: "Yes. You are welcome to bring one companion. Just let us know in advance so we can accommodate.",
      },
      {
        q: "What if I have a reaction during my infusion?",
        a: "Infusion reactions can occur, though they are uncommon. Because a physician is in the suite for every infusion, we are prepared to respond immediately. Your nurse monitors you throughout your visit, and our team is trained to manage reactions quickly and calmly. Your safety is why the physician is always on site.",
      },
      {
        q: "What are the possible side effects?",
        a: "Side effects vary by medication. Common ones may include:",
        bullets: [
          "Fatigue or mild tiredness after the infusion",
          "Mild headache",
          "Nausea",
          "Brief discomfort at the IV site",
          "Mild infusion-related reactions during administration",
        ],
        note: "Your care team will review the risks specific to your medication before you begin and will monitor you closely throughout your visit.",
      },
    ],
  },
  {
    name: "After Your Infusion",
    blurb: "Aftercare and follow-up",
    items: [
      {
        q: "Can I drive myself home?",
        a: "Most patients drive themselves home without any difficulty. Your physician will let you know if there are any restrictions based on your specific medication. If you are receiving a medication that may cause drowsiness for the first few visits, we recommend having someone with you.",
      },
      {
        q: "What happens after my infusion is done?",
        a: "We will remove your IV, check your vital signs one final time, and review any aftercare instructions specific to your medication. We will also schedule your next appointment before you leave.\n\nWe then send a full clinical note to your referring physician's office confirming that you received your medication, how you tolerated it, and when you are scheduled next. Your physician will know everything that happened during your visit.",
      },
      {
        q: "What if I feel unwell after I get home?",
        a: "Call us at (425) 453-0766 ext. 105. For any medical emergency, call 911 or go to the nearest emergency department. We also provide a nurse check-in call after your first infusion, so someone from our team will already be in touch.",
      },
      {
        q: "What if I need to cancel or reschedule?",
        a: "Please give us as much notice as possible, ideally 24 hours or more. This allows us to offer your slot to another patient and avoids the significant preparation work (nurse scheduling, insurance authorization, medication preparation) that happens in advance of every appointment. Call us at (425) 453-0766 ext. 105 and we will find a new time that works for you.",
      },
    ],
  },
];

export const WHY_REFER = [
  {
    title: "A Physician Is Always Present",
    body: "Every infusion we administer is supervised by a physician or licensed provider, on-site, in real time. Most outpatient infusion centers cannot say this. We can. Your patient is never in a chair without clinical oversight. That is your peace of mind, and theirs.",
  },
  {
    title: "We Close the Loop With You",
    body: "We communicate back to your office after every infusion. You will know your patient received their medication, tolerated it well, and is scheduled for their next dose. No black box. No wondering. No surprises at the next follow-up.",
  },
  {
    title: "We Handle Everything Your Office Should Not Have To",
    body: "Prior authorizations. Peer-to-peer reviews. Copay cards. Patient assistance programs. Foundation grant applications. Insurance appeals. Pre-infusion lab coordination. DEXA scheduling. Same-day adjustments. Our team manages it all. Your staff sends the referral. We do the rest.",
  },
  {
    title: "Patients Arrive Prepared",
    body: "We confirm labs, coordinate DEXA scans where indicated, screen for any health changes before infusion day, and verify premedication compliance. No last-minute surprises. No delays. No wasted chair time.",
  },
  {
    title: "We Keep Patients on Schedule",
    body: "We book follow-up appointments before the patient leaves and send reminders to ensure compliance, protecting your treatment plan and improving your outcomes data. Adherence is the most powerful lever in chronic immunologic and inflammatory disease, and we treat it accordingly.",
  },
] as const;

export const CONTACT_REASONS = [
  { value: "schedule", label: "Schedule a visit" },
  { value: "treatment", label: "Question about my treatment" },
  { value: "billing", label: "Billing question" },
  { value: "referral", label: "Refer a patient" },
  { value: "other", label: "Other" },
] as const;

// Team members for the /team page, in display order. Photos live at
// /staff/<slug>.jpg; the gallery falls back to an initials avatar until a real
// photograph is supplied. `bio` is an array of paragraphs. `badge` shows a small
// status pill (e.g. "Incoming"). Members are grouped by consecutive `category`.
export type TeamMember = {
  slug: string;
  name: string;
  credentials?: string;
  role: string;
  category: string;
  badge?: string;
  photo: string;
  bio: readonly string[];
};

export const TEAM: readonly TeamMember[] = [
  {
    slug: "arinola-dada",
    name: "Arinola Dada",
    credentials: "MD, FACR",
    role: "Rheumatologist",
    category: "Providers",
    photo: "/staff/arinola-dada.jpg",
    bio: [
      "Dr. Arinola Dada is a board-certified rheumatologist with more than 20 years of experience caring for patients with complex autoimmune and inflammatory conditions in the greater Seattle area. At Kirkland Specialty Infusion Center, she brings that depth of subspecialty expertise directly to the infusion suite, overseeing patient care with the same precision and personal attention that has defined her career.",
      "Dr. Dada completed her rheumatology fellowship at the University of Washington and later served as a clinical instructor there, grounding her practice in both rigorous science and a genuine commitment to her patients. Her expertise spans rheumatoid arthritis, lupus, gout, psoriatic arthritis, ankylosing spondylitis, Sjögren's syndrome, osteoporosis, and a broad range of connective tissue and inflammatory diseases.",
      "Dr. Dada has been recognized repeatedly as a top physician in the Pacific Northwest, including by Castle Connolly, Seattle Magazine, Seattle Metropolitan, and Vitals Top Doctors, and she brings that same standard of excellence to every patient she sees at Kirkland Specialty Infusion Center. Her approach is unhurried, evidence-based, and always centered on the individual in the chair.",
    ],
  },
  {
    slug: "deepa-gali",
    name: "Deepa Gali",
    credentials: "MD",
    role: "Rheumatologist",
    category: "Providers",
    photo: "/staff/deepa-gali.jpg",
    bio: [
      "Dr. Deepa Gali is a board-certified rheumatologist with more than a decade of experience diagnosing and treating complex autoimmune and inflammatory conditions in the greater Seattle area. Her clinical expertise spans rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis, gout, and a wide range of musculoskeletal and autoimmune diseases.",
      "Dr. Gali completed her medical degree in India before pursuing a combined Internal Medicine and Pediatrics residency at Louisiana State University, followed by a rheumatology fellowship at Wayne State University and Henry Ford Medical Center, training under nationally respected specialists in autoimmune disease. That foundation shaped her approach to care: thorough, collaborative, and deeply attuned to what each patient needs.",
      "At Kirkland Specialty Infusion Center, Dr. Gali pairs her subspecialty knowledge with a genuine warmth that patients notice from their very first visit. She is known for taking time to listen, truly listen, and for helping patients feel confident and informed at every stage of their care. For patients navigating conditions that have been difficult to control, she offers something rare: both the science and the presence to help them move forward.",
    ],
  },
  {
    slug: "justin-putz",
    name: "Justin Putz",
    credentials: "DO",
    role: "Rheumatologist",
    category: "Providers",
    photo: "/staff/justin-putz.jpg",
    bio: [
      "Dr. Justin Putz is a board-certified rheumatologist with specialized training in the full spectrum of autoimmune and inflammatory disease. His clinical expertise includes rheumatoid arthritis, ankylosing spondylitis, gout, lupus, vasculitis, scleroderma, inflammatory myopathies, and connective tissue diseases. At Kirkland Specialty Infusion Center, he brings that expertise, and a distinctly methodical, patient-first approach, to every infusion visit.",
      "Dr. Putz earned his medical degree from Pacific Northwest University, completed his internal medicine residency in Iowa, and went on to finish his rheumatology fellowship at the University of California, San Diego, where he trained under nationally recognized leaders in autoimmune disease. Before medicine, he served five years in the U.S. Army as a combat medic, an experience that shaped his deep respect for resilience and his steady, disciplined approach to patient care.",
      "That background translates directly into how Dr. Putz shows up for his patients: calm under pressure, meticulous in his thinking, and fully committed to finding meaningful relief for those whose conditions have been difficult to treat with standard therapies. Patients who have cycled through treatments without success often find in Dr. Putz a physician who doesn't give up, and a team that doesn't either.",
    ],
  },
  {
    slug: "sabahat-usmani",
    name: "Sabahat Usmani",
    credentials: "MD",
    role: "Rheumatologist",
    category: "Providers",
    photo: "/staff/sabahat-usmani.jpg",
    bio: [
      "Dr. Sabahat Usmani is an incoming rheumatologist at Kirkland Specialty Infusion Center, bringing advanced training in autoimmune and inflammatory diseases and a compassionate, patient-centered approach to care. She is dedicated to helping patients navigate complex rheumatologic conditions with evidence-based treatment and individualized attention.",
      "Dr. Usmani completed her internal medicine training at Weiss Memorial Hospital in Chicago, where she served as Chief Resident, and is completing her rheumatology fellowship at the Medical College of Wisconsin, where she was selected as incoming Chief Fellow for 2025-2026. Her clinical interests include rheumatoid arthritis, lupus, psoriatic arthritis, ankylosing spondylitis, gout, Sjögren's syndrome, osteoporosis, and other autoimmune conditions.",
      "At Kirkland Specialty Infusion Center, Dr. Usmani is committed to providing safe, seamless infusion care while ensuring patients feel supported every step of the way.",
    ],
  },
  {
    slug: "megan-schluentz",
    name: "Megan Schluentz",
    credentials: "MD",
    role: "Rheumatologist",
    category: "Providers",
    photo: "/staff/megan-schluentz.jpg",
    bio: [
      "Dr. Megan Schluentz is an incoming rheumatologist at Kirkland Specialty Infusion Center, bringing advanced training in autoimmune and inflammatory diseases along with a thoughtful, patient-centered approach to care. She is committed to helping patients manage complex rheumatologic conditions through evidence-based treatment and compassionate support.",
      "Dr. Schluentz completed her internal medicine residency at Legacy Health Emanuel in Portland, Oregon, and is completing her rheumatology fellowship at Ochsner Medical Center in New Orleans. Her clinical interests include rheumatoid arthritis, lupus, psoriatic arthritis, ankylosing spondylitis, vasculitis, osteoporosis, and other autoimmune and connective tissue diseases.",
      "At Kirkland Specialty Infusion Center, Dr. Schluentz is dedicated to providing safe, seamless infusion care while ensuring patients feel informed, supported, and cared for throughout their treatment journey.",
    ],
  },
  {
    slug: "tierra-anderson",
    name: "Tierra Anderson",
    credentials: "ARNP",
    role: "Nurse Practitioner",
    category: "Providers",
    photo: "/staff/tierra-anderson.jpg",
    bio: [
      "Tierra Anderson is a board-certified nurse practitioner with more than 15 years of hands-on experience in direct patient care. Her clinical background spans intensive care, primary care, and chronic disease management, with a particular focus on autoimmune and musculoskeletal conditions including rheumatoid arthritis, osteoporosis, and inflammatory arthritis.",
      "Tierra earned her Bachelor of Science in Nursing from Pace University and her Master of Science in Nursing with a focus in Acute Care from the University of Maryland, a combination that gives her the clinical depth to navigate complex presentations and the instincts to recognize when something needs immediate attention.",
      "At Kirkland Specialty Infusion Center, Tierra's approach starts with listening. She takes time to understand each patient's story, their concerns, and what they need to feel truly supported during their infusion visits. Her experience caring for patients across all stages of life, including a special focus on older adults, makes her an exceptional advocate for those navigating chronic conditions that can sometimes feel overwhelming. Patients describe her as a calm, reassuring presence on even the most complicated days.",
    ],
  },
  {
    slug: "diana-szilvasi",
    name: "Diana Szilvasi",
    credentials: "DNP, ARNP",
    role: "Family Nurse Practitioner",
    category: "Providers",
    photo: "/staff/diana-szilvasi.jpg",
    bio: [
      "Diana Szilvasi is a board-certified Family Nurse Practitioner with a Doctor of Nursing Practice degree and more than a decade of experience across home health, acute care, and outpatient rheumatology. At Kirkland Specialty Infusion Center, she brings that breadth of clinical experience to patients receiving infusion therapy for conditions including rheumatoid arthritis, lupus, psoriatic arthritis, ankylosing spondylitis, gout, osteoporosis, Sjögren's syndrome, and other complex autoimmune diseases.",
      "Diana earned her Bachelor of Science in Nursing from the University of Washington and her Doctor of Nursing Practice from Seattle University, equipping her with both the academic foundation and the real-world clinical insight to deliver whole-person care in a rigorous setting.",
      "Diana believes that healing begins with listening, and she brings that philosophy to every patient interaction, making the infusion experience feel less like a process and more like a partnership. Patients consistently describe her as thoughtful, attentive, and someone who makes them feel genuinely known.",
    ],
  },
  {
    slug: "christopher-dinh",
    name: "Christopher Dinh",
    credentials: "MSPAS, PA-C",
    role: "Physician Assistant",
    category: "Providers",
    photo: "/staff/christopher-dinh.jpg",
    bio: [
      "Christopher Dinh is a nationally certified Physician Assistant with a Master of Science in Physician Assistant Studies from Baylor College of Medicine, one of the nation's leading PA programs, where he graduated with high honors. His clinical training spans primary care, internal medicine, geriatrics, and emergency medicine at institutions including Baylor St. Luke's Hospital, the Michael E. DeBakey VA Medical Center, and Texas Children's Hospital.",
      "That breadth of training gives Christopher a sophisticated clinical foundation that he brings to every patient at Kirkland Specialty Infusion Center. He is thorough, equity-minded, and deeply committed to ensuring that every person in the suite feels genuinely cared for, not just processed through a protocol.",
      "Originally from Mukilteo, Washington, Christopher returned home to serve his community and is proud to be part of the Kirkland Specialty Infusion team. His prior research experience, combined with earlier work as a Certified Nursing Assistant and an engineering internship at Stryker, gives him both the scientific mindset and the patient-centered instincts that infusion care demands. Patients appreciate his ability to explain what is happening in plain language and his genuine interest in how they are doing.",
    ],
  },
  {
    slug: "felicia-jones",
    name: "Felicia Jones",
    credentials: "MA-C",
    role: "Medical Assistant & Phlebotomist",
    category: "Infusion Nurses",
    photo: "/staff/felicia-jones.jpg",
    bio: [
      "Felicia Jones is a certified Medical Assistant and Phlebotomist at Kirkland Specialty Infusion Center, playing an essential role in supporting patients through every step of their infusion visits, from specimen collection and vital sign assessments to patient education and hands-on care throughout their time in the suite.",
      "Felicia's strengths lie in her exceptional organizational skills, her precision, and her genuine warmth with patients. She has a gift for keeping people informed and at ease, ensuring that each visit meets the highest standards of care from beginning to end. Her calm, attentive presence is often the first thing new patients notice, and the thing they mention when they return.",
      "For patients who want to know who will be supporting them during their time at Kirkland Specialty Infusion Center, Felicia is exactly the kind of dedicated, compassionate professional they can count on from their very first visit.",
    ],
  },
  {
    slug: "kristal-lui",
    name: "Kristal Lui",
    role: "Infusion Nurse",
    category: "Infusion Nurses",
    photo: "/staff/kristal-lui.jpg",
    bio: [
      "Kristal Lui is an infusion nurse at Kirkland Specialty Infusion Center, specializing in the coordination and administration of therapeutic IV treatments. She brings both clinical precision and a naturally calming presence to every infusion visit, qualities that matter enormously when patients are navigating an unfamiliar experience.",
      "Kristal understands that receiving an infusion for the first time, or the tenth, can feel uncertain. She is committed to making sure every patient feels safe, informed, and well cared for from the moment they arrive to the moment they leave. Patients and families consistently describe her as someone who puts them at ease without ever making them feel rushed.",
    ],
  },
  {
    slug: "sherry-qian",
    name: "Sherry Qian",
    role: "Infusion Nurse",
    category: "Infusion Nurses",
    photo: "/staff/sherry-qian.jpg",
    bio: [
      "Sherry Qian is an infusion nurse at Kirkland Specialty Infusion Center with nearly five years of experience in patient care. Her background in rheumatology infusion therapy makes her a knowledgeable and reassuring presence for patients receiving IV treatments for autoimmune and inflammatory conditions.",
      "Sherry brings an organized, detail-oriented approach to every visit, attending carefully to each patient's individual needs, communicating closely with the clinical team, and consistently prioritizing comfort throughout the infusion process. She finds her work most meaningful in the moments when she sees patients beginning to experience relief and renewed quality of life. Her ability to connect with patients and keep them fully informed reflects the kind of attentive, personal care that defines the Kirkland Specialty Infusion experience.",
    ],
  },
  {
    slug: "elizabeth-kubay",
    name: "Elizabeth Kubay",
    role: "Infusion Nurse",
    category: "Infusion Nurses",
    photo: "/staff/elizabeth-kubay.jpg",
    bio: [
      "Elizabeth Kubay is an infusion nurse at Kirkland Specialty Infusion Center, where she plays an integral role in the day-to-day care of patients receiving IV therapy. She works closely with physicians and the broader clinical team to ensure that every infusion visit runs smoothly and that every patient receives attentive, high-quality care.",
      "Elizabeth is known for her genuine curiosity and compassion when it comes to the people she serves. She takes time to understand each patient's unique background, preferences, and needs, creating an environment where patients feel heard, respected, and well supported. Her strong attention to detail and collaborative spirit make her a trusted and dependable presence throughout the infusion experience.",
    ],
  },
  {
    slug: "mary-kim",
    name: "Mary Kim",
    role: "Registered Nurse & Infusion Specialist",
    category: "Infusion Nurses",
    photo: "/staff/mary-kim.jpg",
    bio: [
      "Mary Kim is a Registered Nurse and Infusion Specialist at Kirkland Specialty Infusion Center, bringing a strong academic and clinical foundation to her role. She earned her Master of Science in Nursing from Emory University and has a deep familiarity with the day-to-day rhythms of the infusion suite, having joined the broader practice family in early 2023 before returning in her advanced nursing role.",
      "In her current position, Mary oversees infusion visits from start to finish, performing blood draws, closely monitoring patients, and administering IV therapies with precision and genuine care. She is known for her attentiveness and her ability to tailor her approach to each person in the chair, ensuring that every patient feels truly seen rather than simply scheduled.",
      "Mary is passionate about what infusion therapy can do for people, the return of mobility, the reduction of pain, the renewed ability to live fully, and she carries that belief into every interaction at the clinic.",
    ],
  },
];
