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
    weekdays: "Monday – Friday: 7:30 AM – 5:00 PM",
    weekend: "Saturday & Sunday: Closed",
  },
  affiliatedWith: "Evergreen Rheumatology",
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
  { href: "/about", label: "About" },
  {
    label: "Services",
    children: [
      {
        href: "/specialties",
        label: "Specialties",
        description: "Eight specialties, one suite",
      },
      {
        href: "/medications",
        label: "Medications & Therapies",
        description: "Our specialty formulary",
      },
    ],
  },
  {
    label: "For Patients",
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
  { href: "/physicians", label: "For Physicians" },
  { href: "/contact", label: "Contact" },
];

export const ALL_ROUTES: string[] = [
  "/",
  ...NAV_LINKS.flatMap((l) =>
    l.href ? [l.href] : l.children?.map((c) => c.href) ?? [],
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
    body: "We close the loop with your referring office after every infusion — medication received, tolerance, next visit scheduled.",
  },
] as const;

export const SPECIALTIES = [
  {
    slug: "rheumatology",
    name: "Rheumatology",
    body: "Biologic and non-biologic infusions for rheumatoid arthritis, psoriatic arthritis, axial spondyloarthritis, lupus, vasculitis, gout, and other systemic inflammatory diseases.",
    therapies: [
      "Actemra",
      "Benlysta",
      "Cimzia",
      "Cosentyx",
      "Ilaris",
      "Krystexxa",
      "Orencia",
      "Remicade",
      "Rituxan",
      "Simponi Aria",
      "Stelara",
    ],
  },
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    body: "Biologic infusions for Crohn's disease, ulcerative colitis, and other inflammatory bowel disease.",
    therapies: ["Remicade", "Stelara", "Simponi Aria"],
  },
  {
    slug: "oncology-hematology",
    name: "Oncology / Hematology",
    body: "Selected supportive care and immunologic infusions including Rituxan for hematologic indications, IVIG (Octagam) for hematologic and immune conditions, and iron infusions for chemotherapy-related and chronic anemia.",
    therapies: ["Rituxan", "Octagam (IVIG)", "Iron (Venofer)"],
  },
  {
    slug: "dermatology",
    name: "Dermatology",
    body: "Biologic infusions for severe psoriasis, hidradenitis suppurativa, and other immune-mediated skin disease.",
    therapies: ["Cosentyx", "Ilumya", "Remicade", "Stelara"],
  },
  {
    slug: "neurology",
    name: "Neurology",
    body: "Therapies for multiple sclerosis, neuromyelitis optica spectrum disorder, myasthenia gravis, chronic inflammatory demyelinating polyneuropathy (CIDP), and other neuroinflammatory and neuromuscular conditions.",
    therapies: ["Ocrevus", "Uplizna", "Vyvgart", "Octagam (IVIG)"],
  },
  {
    slug: "osteoporosis-bone-health",
    name: "Osteoporosis & Bone Health",
    body: "Anabolic and antiresorptive bone-building infusions for patients with severe osteoporosis or fracture history. DEXA coordination available.",
    therapies: ["Evenity"],
  },
  {
    slug: "allergy-immunology",
    name: "Allergy & Immunology",
    body: "IVIG (Octagam) for primary and secondary immunodeficiency, and biologic therapies for severe allergic and immunologic disease.",
    therapies: ["Octagam (IVIG)"],
  },
  {
    slug: "endocrinology",
    name: "Endocrinology",
    body: "Specialty infusions including Tepezza for thyroid eye disease, with full prior authorization and financial advocacy support.",
    therapies: ["Tepezza"],
  },
] as const;

export const MEDICATIONS = [
  {
    name: "Actemra",
    generic: "Tocilizumab",
    indication:
      "Rheumatoid arthritis, giant cell arteritis, systemic juvenile idiopathic arthritis, cytokine release syndrome",
  },
  {
    name: "Benlysta",
    generic: "Belimumab",
    indication: "Systemic lupus erythematosus, lupus nephritis",
  },
  {
    name: "Cimzia",
    generic: "Certolizumab pegol",
    indication:
      "Rheumatoid arthritis, psoriatic arthritis, axial spondyloarthritis, Crohn's disease, psoriasis",
  },
  {
    name: "Cosentyx",
    generic: "Secukinumab",
    indication:
      "Psoriasis, psoriatic arthritis, axial spondyloarthritis, hidradenitis suppurativa",
  },
  {
    name: "Evenity",
    generic: "Romosozumab",
    indication: "Severe osteoporosis with high fracture risk",
  },
  {
    name: "Ilaris",
    generic: "Canakinumab",
    indication: "Periodic fever syndromes, Still's disease, gout flares",
  },
  {
    name: "Ilumya",
    generic: "Tildrakizumab",
    indication: "Moderate to severe plaque psoriasis",
  },
  {
    name: "Krystexxa",
    generic: "Pegloticase",
    indication: "Uncontrolled chronic gout refractory to conventional therapy",
  },
  {
    name: "Octagam (IVIG)",
    generic: "Intravenous immunoglobulin",
    indication:
      "Primary and secondary immunodeficiency, immune thrombocytopenia, neuroinflammatory disease",
  },
  {
    name: "Orencia",
    generic: "Abatacept",
    indication:
      "Rheumatoid arthritis, psoriatic arthritis, juvenile idiopathic arthritis",
  },
  {
    name: "Pemgarda",
    generic: "Pemivibart",
    indication: "COVID-19 pre-exposure prophylaxis for immunocompromised patients",
  },
  {
    name: "Remicade",
    generic: "Infliximab",
    indication:
      "Rheumatoid arthritis, ankylosing spondylitis, psoriatic arthritis, Crohn's disease, ulcerative colitis, psoriasis",
  },
  {
    name: "Rituxan",
    generic: "Rituximab",
    indication:
      "Rheumatoid arthritis, vasculitis, non-Hodgkin lymphoma, chronic lymphocytic leukemia, immune thrombocytopenia",
  },
  {
    name: "Simponi Aria",
    generic: "Golimumab IV",
    indication: "Rheumatoid arthritis, psoriatic arthritis, ankylosing spondylitis",
  },
  {
    name: "Stelara",
    generic: "Ustekinumab",
    indication: "Psoriasis, psoriatic arthritis, Crohn's disease, ulcerative colitis",
  },
  {
    name: "Tepezza",
    generic: "Teprotumumab",
    indication: "Thyroid eye disease (Graves' ophthalmopathy)",
  },
  {
    name: "Uplizna",
    generic: "Inebilizumab",
    indication: "Neuromyelitis optica spectrum disorder",
  },
  {
    name: "Vyvgart",
    generic: "Efgartigimod",
    indication: "Generalized myasthenia gravis",
  },
  {
    name: "Ocrevus",
    generic: "Ocrelizumab",
    indication: "Relapsing and primary progressive multiple sclerosis",
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
    title: "Referral & Intake",
    body: "We receive your referral, verify insurance, and schedule the patient at their earliest convenience.",
  },
  {
    number: "02",
    title: "Prior Authorization",
    body: "Our team handles the full prior authorization process — including documentation, peer-to-peer support, and appeals — minimizing the work for your office.",
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
    body: "Patients receive care in a calm, private setting with licensed medical staff and a supervising physician available for clinical guidance and medication questions.",
  },
  {
    number: "06",
    title: "Follow-Up & Compliance",
    body: "We schedule future infusions and send reminders to support adherence and treatment continuity, with a clinical note returned to your office after every visit.",
  },
] as const;

export const FAQS = [
  {
    q: "What is an infusion?",
    a: "An infusion is the administration of a medication directly into your bloodstream through a small intravenous line (IV) placed in your arm. Many specialty medications — particularly biologic therapies for autoimmune and inflammatory disease, certain cancer therapies, immune globulin, bone-building agents, and others — work best or only when given by infusion.",
  },
  {
    q: "Is the infusion supervised by a doctor?",
    a: "Yes. Every infusion administered at our center is supervised in real time by a physician or licensed provider who is physically present in the building. This is not the standard at most outpatient infusion centers, and it is one of the reasons referring physicians send their patients to us.",
  },
  {
    q: "How long will my infusion take?",
    a: "It depends on the medication. Some infusions take thirty to sixty minutes. Others take three to four hours. We will tell you exactly how long to plan for when we schedule your appointment, and we will not surprise you.",
  },
  {
    q: "Will it hurt?",
    a: "You will feel a small pinch when the IV is started, similar to a routine blood draw. After the IV is in, the infusion itself is not painful. Most patients read, work on a laptop, watch a show, or sleep through their infusion.",
  },
  {
    q: "Is there parking?",
    a: "Yes. Free parking is available on-site at 12911 120th Avenue N.E., Suite C-80.",
  },
  {
    q: "Can I drive myself home?",
    a: "For most medications, yes. A small number of infusions require pre-medication that can make you drowsy. We will tell you in advance if you should arrange a ride.",
  },
  {
    q: "What if I have a reaction to the medication?",
    a: "Infusion reactions are uncommon and almost always mild. Our staff is trained to recognize and manage reactions immediately, and a physician is always present in the suite. We have the medications, equipment, and clinical expertise to respond to any reaction safely.",
  },
  {
    q: "Can I eat before my infusion?",
    a: "Yes. Eat a normal meal before you arrive unless your physician has specifically told you otherwise.",
  },
  {
    q: "Should I take my regular medications on infusion day?",
    a: "Yes, continue your regular medications unless your physician or our team has specifically told you to hold one.",
  },
  {
    q: "What if I am sick on the day of my infusion?",
    a: "Call us. Most infusions should be postponed if you have a fever or active infection. We would rather reschedule you for next week than treat you while you are unwell.",
  },
  {
    q: "Will my insurance cover this?",
    a: "Most major commercial insurance plans and Medicare cover specialty infusion therapies when they are medically necessary and prior-authorized. Our financial team will verify your coverage and out-of-pocket cost before your first infusion, in writing.",
  },
  {
    q: "What if I cannot afford the copay?",
    a: "We will help. Our financial advocacy team applies for manufacturer copay assistance, patient assistance programs, and foundation grants for any patient who needs help. Many of our patients pay little or nothing out of pocket.",
  },
  {
    q: "Do I need a referral?",
    a: "For specialty infusion medications, yes — you will need a referral from your treating physician. For our cash-pay wellness services (B12, vitamin D, Myers Cocktail, iron, joint injections, PRP), a referral is not required, though we recommend discussing with your physician.",
  },
  {
    q: "Can my family or a friend come with me?",
    a: "Yes. You are welcome to bring one companion to your infusion. Many patients prefer to be alone or to have one trusted person along.",
  },
  {
    q: "How do I get started?",
    a: "If you are a patient: ask your physician to send us a referral by fax to (425) 533-2540 or by phone at (425) 453-0766 ext. 105. If you are a physician: send the referral and we will take it from there.",
  },
] as const;

export const WHY_REFER = [
  {
    title: "A Physician Is Always Present",
    body: "Every infusion we administer is supervised by a physician or licensed provider — on-site, in real time. Most outpatient infusion centers cannot say this. We can. Your patient is never in a chair without clinical oversight. That is your peace of mind, and theirs.",
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
    body: "We book follow-up appointments before the patient leaves and send reminders to ensure compliance — protecting your treatment plan and improving your outcomes data. Adherence is the most powerful lever in chronic immunologic and inflammatory disease, and we treat it accordingly.",
  },
] as const;

export const CONTACT_REASONS = [
  { value: "schedule", label: "Schedule a visit" },
  { value: "treatment", label: "Question about my treatment" },
  { value: "billing", label: "Billing question" },
  { value: "referral", label: "Refer a patient" },
  { value: "other", label: "Other" },
] as const;
