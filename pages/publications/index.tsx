import Head from "next/head";

const publications = () => {
  const publications = [
    {
      year: 2004,
      url: "https://www.liebertpub.com/toc/dna/23/10",
    },
    {
      year: 2005,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-6-S2-S1",
    },
    {
      year: 2006,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-7-S2-S1",
    },
    {
      year: 2007,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-8-S7-S1",
    },
    {
      year: 2008,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-9-S9-S1",
    },
    {
      year: 2009,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-10-supplement-11",
    },
    {
      year: 2010,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-11-S6-S1",
    },
    {
      year: 2011,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-12-S10-S1",
    },
    {
      year: 2012,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/1471-2105-13-S15-S1",
    },
    {
      year: 2013,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-14-supplement-14",
    },
    {
      year: 2014,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-15-supplement-11",
    },
    {
      year: 2015,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-16-supplement-13",
    },
    {
      year: 2016,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-17-supplement-13",
    },
    {
      year: 2017,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/supplements/volume-18-supplement-14",
    },
    {
      year: 2018,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-019-2618-7",
    },
    {
      year: 2019,
      url: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-020-03580-9",
    },
  ];
  return (
    <div className="container space-y-10 mx-auto">
      <Head>
        <title>MCBIOS Publications</title>
        <meta content="MCBIOS Publications | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <h3 className="text-center my-10">Publications</h3>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-5">
        <p>
          Individuals whose poster or platform abstracts are accepted for
          presentation at the MCBIOS conference are eligible to submit a full
          paper to be considered for formal, peer-reviewed publication in the
          conference proceedings. The proceedings appear in a{" "}
          <a
            href="http://www.biomedcentral.com/bmcbioinformatics/"
            className="text-purple-400"
          >
            special issue of BMC Bioinformatics
          </a>
          .
        </p>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-5">
        <h6 className="text-lg font-bold">MCBIOS on Google Scholar</h6>
        <p>
          Proceedings papers for all previous MCBIOS meetings are now available
          on Google Scholar. For a listing of the papers and citation metrics
          please{" "}
          <a
            href="https://scholar.google.com/citations?user=UX8w0_MAAAAJ&hl=en"
            className="text-purple-400"
          >
            click here
          </a>
          .
        </p>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-5">
        <h6 className="text-lg font-bold">Archive</h6>
        <p>
          Feel free to browse through the MCBIOS conference proceedings at the
          <span className="italic"> BMC Bioinformatics</span> publication
          archivals:
        </p>
        <div>
          <ul className="list-disc list-inside">
            {publications.reverse().map((pub) => {
              return (
                <li key={pub.year} className="text-purple-400">
                  <a href={pub.url}>{pub.year}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-5">
        <h6 className="text-lg font-bold">Impact</h6>
        <p>BMC Bioinformatics special issue journal impact factors:</p>
        <div className="space-y-2">
          <p>2004 6.0</p>
          <p>2006 6.2</p>
          <p>2007 5.35</p>
          <p>2008 5.35</p>
          <p>2009 5.5</p>
          <p>2010 4.45</p>
        </div>
      </section>
    </div>
  );
};

export default publications;
