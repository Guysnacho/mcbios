import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "About" };

const ITEMS = [
  {
    title: "Our origins",
    body: "MCBIOS is a non-profit organization founded in 2003 by a small group of researchers at the FDA NCTR in Little Rock, Arkansas. It is now one of only two regional societies in North America (alongside GLBIO) affiliated with ISCB, the world's largest bioinformatics society.",
  },
  {
    title: "Our mission",
    body: "To foster networking, collaboration, and professional development among members at all levels of skill and education. The annual conference is the flagship event, bringing scientists together to share insights and discoveries.",
  },
  {
    title: "Mentorship",
    body: "MCBIOS is committed to mentoring and training the next generation of scientists from diverse educational and background experiences, including the Young Scientist Excellence Podium and Poster Awards.",
  },
];

type Member = {
  name: string;
  role: string;
  affiliation: string;
  photo: string;
  links: { label: string; href: string }[];
};

const CHAIR: Member = {
  name: "Inimary Toby-Ogundeji, PhD",
  role: "Conference Chair",
  affiliation: "University of Dallas",
  photo: "/committee/inimary_toby-ogundeji.jpeg",
  links: [
    {
      label: "University of Dallas",
      href: "https://udallas.edu/academics/programs/biology/faculty/toby-inimary.php",
    },
    {
      label: "Cowell Lab, UT Southwestern",
      href: "https://labs.utsouthwestern.edu/cowell-lab/people",
    },
  ],
};

const COMMITTEE: Member[] = [
  {
    name: "Serdar Bozdag, PhD",
    role: "Committee Member",
    affiliation: "University of North Texas",
    photo: "/committee/serdar_bozdag.jpg",
    links: [
      {
        label: "Profile",
        href: "https://engineering.unt.edu/people/serdar-bozdag.html",
      },
      {
        label: "Publications",
        href: "https://facultyinfo.unt.edu/faculty-profile?query=Serdar%20Bozdag&type=name&profile=sb1262#publications",
      },
      {
        label: "CV",
        href: "https://engineering.unt.edu/people/files/Serdar_Bozdag.pdf",
      },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=cpxoRUMAAAAJ&hl=en&oi=ao",
      },
      {
        label: "Bozdag Research Lab",
        href: "https://engineering.unt.edu/cse/research/labs/biocomp/",
      },
    ],
  },
  {
    name: "Xiaoru Dong, PhD",
    role: "Committee Member",
    affiliation: "Texas A&M University College of Dentistry",
    photo: "/committee/xiaoru_dong.jpg",
    links: [
      { label: "Website", href: "https://xiaorudong.github.io/" },
      {
        label: "TAMU profile",
        href: "https://dentistry.tamu.edu/directory/xiaoru-dong.html",
      },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?user=DLBO3GMAAAAJ&hl=en",
      },
    ],
  },
  {
    name: "Oluwatosin Oluwadare, PhD",
    role: "Committee Member",
    affiliation: "University of North Texas",
    photo: "/committee/oluwatosin_oluwadare.jpg",
    links: [
      {
        label: "Profile",
        href: "https://oluwadarelab.com/oluwatosin-oluwadare/",
      },
      { label: "Lab", href: "https://oluwadarelab.com/" },
      {
        label: "Google Scholar",
        href: "https://scholar.google.com/citations?hl=en&user=uk_vTmMAAAAJ",
      },
      {
        label: "UNT faculty info",
        href: "https://facultyinfo.unt.edu/faculty-profile?profile=oeo0061#research",
      },
    ],
  },
];

function MemberCard({ m }: { m: Member }) {
  return (
    <div className="card card-border bg-base-100/80 backdrop-blur-md h-full">
      <figure className="relative aspect-[4/5] w-full">
        <Image
          src={m.photo}
          alt={m.name}
          fill
          sizes="(min-width: 640px) 384px, 100vw"
          className="object-cover object-top"
        />
      </figure>
      <div className="card-body">
        <span
          className={`badge ${m.role === "Conference Chair" ? "badge-primary" : "badge-outline"}`}
        >
          {m.role}
        </span>
        <h3 className="card-title">{m.name}</h3>
        <p className="opacity-80">{m.affiliation}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {m.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover inline-flex items-center gap-1 text-sm"
            >
              {l.label}
              <ExternalLink className="size-3" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-10">
      <header className="mx-auto max-w-3xl text-center space-y-3">
        <span className="badge badge-outline">About</span>
        <h1 className="text-4xl sm:text-5xl">
          About <span className="text-primary">MCBIOS</span>
        </h1>
        <p>MidSouth Computational Biology and Bioinformatics Society</p>
      </header>

      <div className="mx-auto max-w-3xl space-y-3">
        {ITEMS.map((item, i) => (
          <div
            key={item.title}
            className="collapse collapse-arrow bg-base-100/80 backdrop-blur-md border border-base-300"
          >
            <input
              type="radio"
              name="about"
              defaultChecked={i === 0}
              aria-label={item.title}
            />
            <div className="collapse-title text-lg">{item.title}</div>
            <div className="collapse-content">{item.body}</div>
          </div>
        ))}
      </div>

      <section className="space-y-6">
        <h2 className="text-center text-3xl">Conference chair</h2>
        <div className="mx-auto max-w-sm">
          <MemberCard m={CHAIR} />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-center text-3xl">Organizing committee</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {COMMITTEE.map((m) => (
            <div
              key={m.name}
              className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            >
              <MemberCard m={m} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
