import type { Metadata } from "next";

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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-10">
      <header className="text-center space-y-3">
        <span className="badge badge-outline">About</span>
        <h1 className="text-4xl sm:text-5xl">
          About <span className="text-primary">MCBIOS</span>
        </h1>
        <p>MidSouth Computational Biology and Bioinformatics Society</p>
      </header>

      <div className="space-y-3">
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

      <div className="card card-border bg-base-200/80 backdrop-blur-md">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Organizing committee</h2>
          <p className="opacity-80">To be announced.</p>
        </div>
      </div>
    </div>
  );
}
