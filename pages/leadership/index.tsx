import BoardMemberCard from "@/components/BoardMemberCard";
import AikChoonTan from "@/public/images/leadership/Aik-Choon-Tan.jpg";
import BernieDaigle from "@/public/images/leadership/Bernie-Daigle.jpg";
import ChangSu from "@/public/images/leadership/Chang-Su.jpg";
import JinchengShen from "@/public/images/leadership/Jincheng-Shen.png";
import JonathanSheridan from "@/public/images/leadership/Jonathan-Sheridan.jpg";
import NishaPillai from "@/public/images/leadership/Nisha-Pillai.jpg";
import PelumiAbimbola from "@/public/images/leadership/Pelumi-Abimbola.jpg";
import QianqianSong from "@/public/images/leadership/Qianqian-Song.jpg";
import QinSteve from "@/public/images/leadership/Qin-Steve.jpg";
import VinayRaj from "@/public/images/leadership/Vinay-Raj.jpg";
import XuefengWang from "@/public/images/leadership/Xuefeng-Wang.png";
import ZongliangYue from "@/public/images/leadership/Zongliang-Yue.png";
import {
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Head from "next/head";

const boardMembers = [
  {
    name: "Aik Choon Tan, Ph.D.",
    image: AikChoonTan.src,
    title: "Professor | Senior Director of Data Science",
    department: "Department of Oncological Sciences",
    affiliation: "University of Utah School of Medicine",
  },
  {
    name: "Jincheng Shen, Ph.D",
    image: JinchengShen.src,
    title: "Assistant Professor",
    department: "Division of Biostatistics",
    affiliation: "University of Utah",
  },
  {
    name: "Qianqian Song, Ph.D.",
    image: QianqianSong.src,
    orgPosition: "Society Co-Chair",
    title: "Assistant professor | Director of Translational Bioinformatics",
    department: "Health Outcomes & Biomedical Informatics",
    affiliation: "University of Florida",
  },
  {
    name: "Xuefeng Wang, Ph.D.",
    image: XuefengWang.src,
    title: "Chair & Professor",
    department: "Department of Biostatistics and Bioinformatics",
    affiliation: "Moffitt Cancer Center",
  },
  {
    name: "Pelumi Abimbola",
    image: PelumiAbimbola.src,
    title: "Student",
    affiliation: "Mississippi State University",
  },
  {
    name: "Bernie J. Daigle, Jr., Ph.D.",
    image: BernieDaigle.src,
    title: "Associate Professor",
    department: "Department of Biological Sciences, Computer Science",
    affiliation: "University of Memphis",
  },
  {
    name: "Nisha Pillai, Ph.D.",
    image: NishaPillai.src,
    title: "Research Scientist",
    department: "Department of Computer Science, Engineering",
    affiliation: "Mississippi State University",
  },
  {
    name: "Vinay Raj, Ph.D.",
    image: VinayRaj.src,
    title: "Assistant professor",
    department: "Department of Biology",
    affiliation: "University of Arkansas at Pine Bluff",
  },
  {
    name: "Jonathan Sheridan",
    image: JonathanSheridan.src,
    affiliation: "University of Mississippi",
  },
  {
    name: "Chang Su, Ph.D.",
    image: ChangSu.src,
    title: "Assistant Professor",
    department: "Department of Biostatistics and Bioinformatics",
    affiliation: "Emory University",
  },
  {
    name: "Zongliang Yue, Ph.D.",
    image: ZongliangYue.src,
    title: "Assistant Research Professor",
    department: "Health Outcomes Research and Policy",
    affiliation: "Auburn University",
  },
];

const pastPrez = [
  {
    name: "Zhaohui “Steve” Qin, Ph.D.",
    title: "Professor",
    department: "Department of Biostatistics, Bioinformatics",
    affiliation: "Emory University",
  },
  {
    name: "Inimary Toby, Ph.D.",
    title: "Assistant Professor",
    department:
      "Department of Biology, Community Assistance Research-affiliated Faculty",
    affiliation: "University of Dallas",
  },
  {
    name: "Jake Chen, Ph.D.",
    title: "Chief Bioinformatics Officer",
    department: "Chief Bioinformatics Officer, Professor of Genetics",
    affiliation: "Emory University",
  },
  {
    name: "Inimary Toby, Ph.D.",
    title: "Assistant Professor",
    department:
      "Department of Biology, Community Assistance Research-affiliated Faculty",
    affiliation: "University of Dallas",
  },
  {
    name: "Weida Tong, Ph.D.",
    title: "Division Director",
    department: "Bioinformatics & Biostatistics",
    affiliation: "NCTR FDA",
  },
  {
    name: "Ramin Homayouni, Ph.D.",
    title: "Director of Bioinformatics",
    department: "Biology, Bioinformatics",
    affiliation: "University of Memphis",
  },
  {
    name: "Bindu Nanduri, Ph.D.",
    title: "Associate Professor",
    department: "College of Veterinary Medicine",
    affiliation: "Mississippi State University",
  },
  {
    name: "Cesar M. Compadre, Ph.D.",
    title: "Professor",
    department: "Medical Sciences",
    affiliation: "University of Arkansas",
  },
  {
    name: "Chaoyang (Joe) Zhang, Ph.D.",
    title: "Professor",
    affiliation: "University of Southern Mississippi",
  },
  {
    name: "Andy D. Perkins, Ph.D.",
    title: "Associate Professor",
    department: "Department of Computer Science and Engineering",
    affiliation: "Mississippi State University",
  },
  {
    name: "Ed Perkins, Ph.D.",
    title: "Senior Research Scientist",
    department: "Engineer Research and Development Center",
    affiliation: "US Army Corps of Engineers",
  },
  {
    name: "Doris M. Kupfer, Ph.D.",
    title: "Research Scientist",
    department: "Functional Genomics Civil Aerospace Medical Institute",
    affiliation: "FAA",
  },
  {
    name: "Ulisses Braga-Neto, Ph.D.",
    title: "Assistant Professor",
    department: "Department of Electrical and Computer Engineering",
    affiliation: "Texas A&M University",
  },
  {
    name: "Daniel Berleant, Ph.D.",
    title: "Assistant Professor",
    department: "Department of Information Science",
    affiliation: "University Arkansas at Little Rock",
  },
  {
    name: "Dawn Wilkins Ph.D.",
    title: "Associate Professor",
    department: "Department of Computer and Information Science",
    affiliation: "University of Mississippi",
  },
  {
    name: "Jonathan Wren, Ph.D.",
    title: "Assistant Member",
    affiliation:
      "Arthritis & Immunology Department Oklahoma Medical Research Foundation",
  },
  {
    name: "Stephen Winters-Hilt, Ph.D.",
    title: "PhD Candidate",
    department: "Department of Computer Science",
    affiliation: "University of New Orleans",
  },
  {
    name: "William Slikker, Jr., Ph.D.",
    title: "Director",
    affiliation: "U.S. Food and Drug Administration",
  },
  {
    name: "Steven F. Jennings, Ph.D.",
    title: "Professor",
    department: "Department of Information Science",
    affiliation: "University Arkansas at Little Rock",
  },
];

const leadership = () => {
  return (
    <div className="w-full space-y-10">
      <Head>
        <title>MCBIOS Leadership</title>
        <meta content="MCBIOS Leadership | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <h2 className="text-center my-10">Board of Directors</h2>
      <section>
        <Divider className="w-1/2 mx-auto mb-10" />
        <h4 className="text-center">Presidential Office (2024-2025)</h4>
        <div className="columns-1 md:columns-2 w-11/12 mx-auto my-10 space-y-5 md:space-y-0">
          <BoardMemberCard
            name="Aik Choon Tan, Ph.D."
            image={AikChoonTan.src}
            orgPosition="President"
            title="Professor | Senior Director of Data Science"
            department="Departments of Oncological Sciences and Biomedical Informatics"
            affiliation="University of Utah"
          />
          <BoardMemberCard
            name="Zhaohui “Steve” Qin, Ph.D."
            image={QinSteve.src}
            orgPosition="Past-President"
            title="Professor"
            department="Department of Biostatistics, Bioinformatics"
            affiliation="Emory University"
          />
        </div>
      </section>
      <Tabs align="center" variant="enclosed" size="lg">
        <TabList>
          <Tab key="board" title="Current Board">
            Current Board
          </Tab>
          <Tab key="presidents" title="Past Presidents">
            Past Presidents
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel key="board" title="Current Board">
            <section className="space-y-10">
              <Divider className="w-1/2 mx-auto mb-10" />
              <h4 className="text-center">Board Members</h4>
              <div className="md:flex w-11/12 mx-auto flex-wrap gap-5 items-center space-y-6 md:space-y-0">
                {boardMembers.map((member) => {
                  return (
                    <BoardMemberCard
                      key={member.name}
                      name={member.name}
                      image={member.image}
                      title={member.title}
                      department={member.department}
                      affiliation={member.affiliation}
                    />
                  );
                })}
              </div>
            </section>
          </TabPanel>
          <TabPanel key="presidents" title="Past Presidents">
            <section>
              <Divider className="w-1/2 mx-auto mb-10" />
              <h4 className="text-center">Past Presidents</h4>
              <div className="md:flex w-11/12 mx-auto flex-wrap gap-8 items-center space-y-6 md:space-y-5">
                {pastPrez.map((member, index) => {
                  return (
                    <BoardMemberCard
                      key={member.name}
                      index={pastPrez.length - 1 - index}
                      name={member.name}
                      title={member.title}
                      department={member.department}
                      affiliation={member.affiliation}
                    />
                  );
                })}
              </div>
            </section>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default leadership;
