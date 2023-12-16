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
import { Divider } from "@nextui-org/react";

const leadership = () => {
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
    </div>
  );
};

export default leadership;
