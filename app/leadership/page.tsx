"use client";

import BoardMemberCard from "@/components/BoardMemberCard";
import AikChoonTan from "@/public/images/leadership/Aik-Choon-Tan.jpg";
import BernieDaigle from "@/public/images/leadership/Bernie-Daigle.jpg";
import InimaryToby from "@/public/images/leadership/Inimary-Toby.jpg";
import JonathanSheridan from "@/public/images/leadership/Jonathan-Sheridan.jpg";
import KristinaFeye from "@/public/images/leadership/Kristina-Feye.jpg";
import MazenIstanbouli from "@/public/images/leadership/Mazen-Istanbouli.jpg";
import NishaPillai from "@/public/images/leadership/Nisha-Pillai.jpg";
import QianqianSong from "@/public/images/leadership/Qianqian-Song.jpg";
import QinSteve from "@/public/images/leadership/Qin-Steve.jpg";
import VinayRaj from "@/public/images/leadership/Vinay-Raj.jpg";
import { Divider, Tab, Tabs } from "@nextui-org/react";

const boardMembers = [
  {
    name: "Bernie J. Daigle, Jr., Ph. D.",
    image: BernieDaigle.src,
    title: "Associate Professor",
    department: "Department of Biological Sciences, Computer Science",
    affiliation: "University of Memphis",
  },
  {
    name: "Kristina Feye, Ph. D.",
    image: KristinaFeye.src,
    title: "Research Microbiologist",
    affiliation: "U.S. Food and Drug Administration",
  },
  {
    name: "Mazen Istanbouli, M.S.",
    image: MazenIstanbouli.src,
    title: "PhD Candidate",
    department: "Department of Biological Sciences",
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
    name: "Qianqian Song, Ph.D.",
    image: QianqianSong.src,
    title: "Assistant professor",
    department: "College of Medicine",
    affiliation: "University of Florida",
  },
  {
    name: "Aik Choon Tan, Ph.D.",
    image: AikChoonTan.src,
    title: "Professor | Senior Director of Data Science",
    department: "Department of Oncological Sciences",
    affiliation: "University of Utah School of Medicine",
  },
  {
    name: "Jonathan Sheridan",
    image: JonathanSheridan.src,
    affiliation: "University of Mississippi",
  },
];
const pastPrez = [
  {
    name: "Steven F. Jennings, Ph.D.",
    formerMember: true,
    title: "Professor",
    department: "Department of Information Science",
    affiliation: "University Arkansas at Little Rock",
  },
  {
    name: "William Slikker, Jr., Ph.D.",
    formerMember: true,
    title: "Director",
    affiliation: "U.S. Food and Drug Administration",
  },
  {
    name: "Stephen Winters-Hilt, Ph.D.",
    formerMember: true,
    title: "PhD Candidate",
    department: "Department of Computer Science",
    affiliation: "University of New Orleans",
  },
  {
    name: "Jonathan Wren, Ph.D.",
    formerMember: true,
    title: "Assistant Member",
    affiliation:
      "Arthritis & Immunology Department Oklahoma Medical Research Foundation",
  },
  {
    name: "Dawn Wilkins Ph.D.",
    formerMember: true,
    title: "Associate Professor",
    department: "Department of Computer and Information Science",
    affiliation: "University of Mississippi",
  },
  {
    name: "Daniel Berleant, Ph.D.",
    formerMember: true,
    title: "Assistant Professor",
    department: "Department of Information Science",
    affiliation: "University Arkansas at Little Rock",
  },
  {
    name: "Ulisses Braga-Neto, Ph.D.",
    formerMember: true,
    title: "Assistant Professor",
    department: "Department of Electrical and Computer Engineering",
    affiliation: "Texas A&M University",
  },
  {
    name: "Doris M. Kupfer, Ph.D.",
    formerMember: true,
    title: "Research Scientist",
    department: "Functional Genomics Civil Aerospace Medical Institute",
    affiliation: "FAA",
  },
  {
    name: "Ed Perkins, Ph.D.",
    formerMember: true,
    title: "Senior Research Scientist",
    department: "Engineer Research and Development Center",
    affiliation: "US Army Corps of Engineers",
  },
  {
    name: "Andy D. Perkins, Ph.D.",
    formerMember: true,
    title: "Associate Professor",
    department: "Department of Computer Science and Engineering",
    affiliation: "Mississippi State University",
  },
  {
    name: "Chaoyang (Joe) Zhang, Ph.D.",
    formerMember: true,
    title: "Professor",
    affiliation: "University of Southern Mississippi",
  },
  {
    name: "Cesar M. Compadre, Ph.D.",
    formerMember: true,
    title: "Professor",
    department: "Medical Sciences",
    affiliation: "University of Arkansas",
  },
  {
    name: "Bindu Nanduri, Ph.D.",
    formerMember: true,
    title: "Associate Professor",
    department: "College of Veterinary Medicine",
    affiliation: "Mississippi State University",
  },
  {
    name: "Ramin Homayouni, Ph.D.",
    title: "Director of Bioinformatics",
    department: "Biology, Bioinformatics",
    affiliation: "University of Memphis",
  },
  {
    name: "Weida Tong, Ph.D.",
    title: "Division Director",
    department: "Bioinformatics & Biostatistics",
    affiliation: "NCTR FDA",
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
];

const leadership = () => {
  return (
    <div className="w-full space-y-10">
      <h2 className="text-center my-10">Board of Directors</h2>
      <section>
        <Divider className="w-1/2 mx-auto mb-10" />
        <h4 className="text-center">Presidential Office (2023-2024)</h4>
        <div className="columns-1 md:columns-2 w-11/12 mx-auto my-10 space-y-5 md:space-y-0">
          <BoardMemberCard
            name="Zhaohui “Steve” Qin, PhD"
            image={QinSteve.src}
            orgPosition="President"
            title="Professor"
            department="Department of Biostatistics, Bioinformatics"
            affiliation="Emory University"
          />
          <BoardMemberCard
            name="Inimary Toby, Ph. D."
            image={InimaryToby.src}
            orgPosition="Past-President"
            title="Assistant Professor"
            department="Department of Biology, Community Assistance Research"
            affiliation="University of Dallas"
          />
        </div>
      </section>
      <Tabs
        aria-label="Options"
        size="lg"
        className="mx-auto justify-center align-middle w-full items-center self-center"
        classNames={{
          base: ["justify-around", "items-middle", "align-middle", ""],
          tabList: ["mx-auto", "w-2/3"],
        }}
      >
        <Tab key="board" title="Current Board">
          <section>
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
        </Tab>
        <Tab key="presidents" title="Past Presidents">
          <section>
            <Divider className="w-1/2 mx-auto mb-10" />
            <h4 className="text-center">Past Presidents</h4>
            <div className="md:flex w-11/12 mx-auto flex-wrap gap-8 items-center space-y-6 md:space-y-5">
              {pastPrez.map((member, index) => {
                return (
                  <BoardMemberCard
                    key={member.name}
                    index={index}
                    name={member.name}
                    title={member.title}
                    department={member.department}
                    affiliation={member.affiliation}
                  />
                );
              })}
            </div>
          </section>
        </Tab>
      </Tabs>
    </div>
  );
};

export default leadership;
