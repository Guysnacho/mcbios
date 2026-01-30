import { DnaHelix } from "@/components/svg/DnaHelix";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { LuBookOpen, LuFileText, LuScale } from "react-icons/lu";

export default function Page() {
  return (
    <>
      <Head>
        <title>Bylaws</title>
        <meta content="Bylaws | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>

      {/* Hero Section */}
      <Box as="section" pt="40" pb="16" bg="slate.50" position="relative" overflow="hidden">
        <Box
          position="absolute"
          right="-100px"
          top="50%"
          transform="translateY(-50%) rotate(-15deg)"
          opacity="0.03"
          display={{ base: "none", lg: "block" }}
        >
          <DnaHelix className="w-64 h-[600px]" color="#800000" opacity="1" />
        </Box>

        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Flex align="center" gap="3" mb="4">
            <Flex p="3" bg="red.100" rounded="xl" align="center" justify="center">
              <Icon color="red.700" boxSize="6">
                <LuScale />
              </Icon>
            </Flex>
            <Text
              fontSize="sm"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              color="red.700"
            >
              Governance
            </Text>
          </Flex>
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="black"
            color="slate.900"
            mb="4"
            lineHeight="tight"
          >
            Bylaws of the MidSouth Computational Biology and Bioinformatics Society
          </Heading>
          <Text fontSize="lg" color="slate.600" lineHeight="relaxed">
            The governing document that defines the structure, purpose, and operational
            procedures of MCBIOS.
          </Text>
        </Container>
      </Box>

      {/* Table of Contents */}
      <Box as="section" py="12" bg="white">
        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Box
            bg="slate.50"
            p={{ base: 6, md: 8 }}
            rounded="2xl"
            borderWidth="1px"
            borderColor="slate.200"
          >
            <Flex align="center" gap="3" mb="6">
              <Icon color="red.700" boxSize="5">
                <LuBookOpen />
              </Icon>
              <Heading as="h2" fontSize="lg" fontWeight="bold" color="slate.900">
                Table of Contents
              </Heading>
            </Flex>
            <Stack gap="2">
              {tableOfContents.map((chapter) => (
                <Link
                  key={chapter.url}
                  href={"#" + chapter.url}
                  color="slate.700"
                  fontSize="sm"
                  fontWeight="medium"
                  _hover={{ color: "red.700", textDecoration: "underline" }}
                  transition="all 0.2s"
                >
                  {chapter.chapter}
                </Link>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>

      <Separator />

      {/* Bylaws Content */}
      <Box as="section" py="16" bg="white" position="relative">
        <Box
          position="absolute"
          left="-80px"
          top="200px"
          opacity="0.02"
          display={{ base: "none", xl: "block" }}
        >
          <DnaHelix className="w-48 h-[400px]" color="#800000" opacity="1" />
        </Box>

        <Container maxW="4xl" px={{ base: 4, sm: 6, lg: 8 }} position="relative" zIndex="10">
          <Stack gap="16">
            {/* Article I */}
            <ArticleSection id="Article_I_Name" title="Article I. Name">
              <Text color="slate.700" lineHeight="tall">
                The name of the Society shall be the{" "}
                <Text as="span" fontWeight="bold">
                  MidSouth Computational Biology and Bioinformatics Society
                </Text>{" "}
                (MCBIOS).
              </Text>
            </ArticleSection>

            {/* Article II */}
            <ArticleSection id="Article_II_Purpose" title="Article II. Purpose">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Purposes.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The purposes of the Society are scientific, educational, literary,
                    charitable, and no other. In furtherance of these purposes, the
                    business and objectives of the Society shall be:
                  </Text>
                  <Stack as="ul" gap="2" mt="4" pl="6">
                    <Text as="li" color="slate.700" lineHeight="tall">
                      (a) to advance the understanding of bioinformatics and computational biology;
                    </Text>
                    <Text as="li" color="slate.700" lineHeight="tall">
                      (b) to bring together scientists of various backgrounds and disciplines;
                    </Text>
                    <Text as="li" color="slate.700" lineHeight="tall">
                      (c) to facilitate the collaboration of researchers with similar or
                      complementary backgrounds to solve biological, health, and/or medical problems;
                    </Text>
                    <Text as="li" color="slate.700" lineHeight="tall">
                      (d) to promote education in bioinformatics and computational biology;
                    </Text>
                    <Text as="li" color="slate.700" lineHeight="tall">
                      (e) to inform the general public on the results and implications of
                      current research in bioinformatics and computational biology; and
                    </Text>
                    <Text as="li" color="slate.700" lineHeight="tall">
                      (f) to promote other activities that will contribute to the development
                      of bioinformatics and computational biology.
                    </Text>
                  </Stack>
                  <Text color="slate.700" lineHeight="tall" mt="4">
                    The Society will especially support, encourage, and mentor our Trainee Members.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Non-Profit Status.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Society is organized and shall be operated as a not-for-profit
                    membership corporation. If the Board of Directors of the Society
                    elects to seek and obtains an exemption for the Society from Federal
                    taxation pursuant to Section 501(a) of the Internal Revenue Code, as
                    amended (the &quot;IRC&quot;), and until such time, if ever, that such
                    exemption is denied or lost, the Society shall not be empowered to
                    engage directly or indirectly in any activity which the Society
                    believes would be likely to invalidate its status as an organization
                    exempt from federal taxation under Section 501(a) of the IRC as an
                    organization described in Section 501(c)(3) of the IRC.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article III */}
            <ArticleSection id="Article_III_Membership" title="Article III. Membership">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Members.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Society shall consist of two classes of members: Professional
                    and Trainee. Both member classes are eligible to vote if they are in
                    good standing.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Professional Members.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Any person who has a professional interest in bioinformatics or
                    computational biology is eligible to be a Professional Member unless
                    he/she is eligible for Trainee Member and chooses that option (see
                    the definition below, Section 3). Applications shall follow
                    procedures defined by the Board of Directors. Professional members
                    are eligible to advance in three membership grades: Regular, Senior,
                    and Fellow. The Board of Directors shall define eligibility,
                    nomination, and evaluation criteria for each membership grade and
                    set the quota each year for the Senior and Fellow grades.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 3. Trainee Members.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Trainee members would comprise of both Students and Postdoctoral
                    Fellows. Any person enrolled in an educational institution and any
                    postdoctoral fellow affiliated to an academic, industrial or
                    government research facility is eligible to apply for a Trainee
                    Membership instead of a Professional Membership. Trainee Membership
                    shall terminate at the end of the first membership year in which the
                    Trainee is no longer a Student or Postdoctoral Fellow. Trainee
                    Members are eligible for reduced dues and assessments.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 4. Dues and Assessments.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Board of Directors shall set annual dues and special assessments
                    to the Members according to the needs of the Society. Trainee
                    Members shall receive a discounted membership rate. The membership
                    begins on the first day of the calendar year in which the payment is
                    received and cannot be applied retroactively to previous years or
                    prospectively to future years.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article IV */}
            <ArticleSection id="Article_IV_General_Meetings" title="Article IV. General Meetings">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Annual Meeting.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Society membership shall meet annually at a place and time
                    designated by the Board of Directors. The Board of Directors may
                    also call Special Meetings of the membership.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Notice of Meetings.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The President shall notify members of Annual Meetings and Special
                    Meetings of the membership as a whole, indicating the place and time
                    of the meeting and, in case of a Special Meeting, the purpose for
                    which the meeting is called. Notice of an Annual or Special Meeting
                    shall be distributed not less than ten or more than 60 days before
                    the date of the meeting, provided that the Board may tentatively
                    schedule the date, place and time of the Annual Meeting, and provide
                    notice thereof, more than 60 days before the date of the meeting.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 3. Quorum.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Ten percent of all of the Members at the meeting constitutes a
                    quorum for all purposes at any meeting of the Members. In the
                    absence of a quorum at any meeting or any adjournment thereof, a
                    majority of the Members entitled to vote who are present may adjourn
                    such meeting to another place, date or time.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 4. Voting by Members.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Each Member has one vote. Except as provided herein, a plurality of
                    the votes cast determines all elections and a majority of the votes
                    cast determines all other matters. The Members shall vote by ballot,
                    whether in person, via paper ballot, or via electronic voting
                    software; however, the vote can be carried out by voice if
                    requested. Each ballot shall state the name of the Member voting and
                    such other information as the Society may require under the
                    procedure established for the meeting.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 5. No Proxy Voting.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Voting by proxy is not permitted.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 6. Written Consent.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Members may take any action that they could take at any Annual
                    or Special Meeting without a meeting, with prior notice, a vote, and
                    signing consent in writing, setting forth the action taken. For
                    this, the minimum number of Members needed is the same as the number
                    that would be necessary to authorize or take the action at a meeting
                    at which all Members entitled to vote were present and voted. The
                    Secretary shall give prompt notice of any corporate action taken by
                    less than unanimous consent without a meeting to the Regular Members
                    who have not consented in writing.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article V */}
            <ArticleSection id="Article_V_Officers" title="Article V. Officers">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. The Presidential Officers.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Presidential Officers consist of the President-Elect, President,
                    and Past President. The President shall preside at meetings of the Board of Directors,
                    Annual Meetings, and Special Meetings of the Society; shall be
                    responsible for executing policies determined by the Board of
                    Directors; shall act as spokesperson for the Society; and shall see
                    that all Orders and Resolutions of the Board of Directors are
                    carried into effect. The Past President and the President-Elect shall assist the
                    President, shall be members of the Board of Directors, and shall
                    substitute for the President when necessary. The Past President
                    shall take precedence over the President-Elect in substituting for
                    the President. The Past-President shall prepare a slate of nominees
                    for the President position to give to the Board of Directors for
                    presentation to the membership at the Annual Meeting. Immediately after the Annual Meeting, the President-Elect will take
                    the role of President while the current President shall become Past
                    President. The Past President must take care of any remaining items
                    from the tenure of their term over the next 3 months, including
                    submitting the annual report for the Annual Meeting and other
                    organizational tasks.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Election and Succession of Presidential Officers.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The President-Elect shall be elected annually for a period of one
                    year by a vote of the Members in good standing of the Society during
                    the Annual Meeting. The President-Elect, the President, and the Past
                    President are required to be Members of the Society and in good
                    standing. Election of the President-Elect shall be by simple
                    plurality of votes received from all Members attending the election
                    during the Annual Meeting, either in person or through an electronic
                    voting software. The President-Elect shall assume that office at the
                    conclusion of the Annual Meeting and, at the same time, the previous
                    President-Elect shall assume the office of President at the
                    conclusion of the Annual Meeting and, at the same time, the previous
                    President shall become Past President. The Past President shall not
                    be eligible for re-election to the office of President-Elect for a
                    period of one year after completing their term as Past President.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 3. The Secretaries.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Both Secretary and Past Secretary shall assist the President and
                    shall be responsible for recording, transcribing, and organizing the
                    minutes of all meetings of the Board of Directors and Special
                    Meetings. The Past President shall take over the role of Secretary
                    if neither Secretary or Past Secretary are present for a meeting of
                    the Board of Directors or a Special Meeting. The Secretary shall be
                    appointed by the President from the Board of Directors and approved
                    by the Board of Directors and may not also hold a Presidential
                    Office. The Secretary shall substitute for the President if neither
                    the Past President nor the President-Elect can serve and, at the
                    same time, the Past Secretary will take over the Secretary position.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 4. The Treasurer.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Treasurer and Backup Treasurer shall be responsible for timely
                    oversight of all moneys and valuable effects in the name and to the
                    credit of the Society, and for overseeing full, timely, and accurate
                    accounting of receipts and disbursements in books belonging to the
                    Society. Both Treasurers shall render to the President and Board of
                    Directors at its Regular Meetings, or when the Board of Directors so
                    requires, an account of the financial transactions and status of the
                    Society. The Treasurer shall serve as Chairperson of the Finance
                    Committee. The Treasurer shall be appointed by the President
                    annually and approved by the Board of Directors and does not have
                    term limits. When the President appoints a new Treasurer, the
                    current Treasurer will automatically become the Backup Treasurer.
                    The Treasurer serves as a non-voting Board Member and shall
                    substitute for the President if the Past President, the
                    President-Elect, and the Secretary cannot serve. In a situation in
                    which the Treasurer resigns or is replaced by a majority vote of the
                    Board of Directors, the Backup Treasurer will take his/her position
                    as Treasurer.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 5. Contracts.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Board of Directors may authorize any officer or officers, agent
                    or agents, to enter into any contract or execute and deliver any
                    instrument in the name and on behalf of the Society. The Board may
                    make such authorization general or special.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article VI */}
            <ArticleSection id="Article_VI_Board_of_Directors" title="Article VI. Board of Directors">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Board of Directors.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Society&apos;s affairs shall be conducted through a Board of
                    Directors consisting of 11 total members, including the President,
                    the President-Elect, the Past President, the Secretary, and other
                    non-executive committee members. Each of the Directors shall have
                    one vote. Each director shall serve 3 years per term and can be
                    re-elected for at most one additional term for a total of 6
                    consecutive years. Each board member is required to lead in an area
                    of responsibility deemed important for the maintenance and growth of
                    the organization, including but not limited to: membership
                    development, workgroup coordination, website development, public
                    relations, nomination and election, fund-raising, Annual Meeting
                    organization, documentation, event planning, and budgeting.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Quorum.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    A quorum of the Board of Directors shall consist of 60% of the total
                    number of Directors. In the absence of a quorum, a majority of the
                    Directors present at any meeting may adjourn the meeting to another
                    place, date or time without further notice.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 3. Meetings.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Board of Directors shall meet at the Annual Meeting, notice of
                    which need not be given. The Board may meet at other times and
                    places as it deems necessary and shall provide written notice to
                    each Director of the time, place, date and purpose of the meeting of
                    not less than three business days. Meetings may be conducted in
                    person, via videoconference, and/or by telephone or other form of
                    live telephonic communication. The Board of Directors may also
                    conduct business by mail, email, web surveys or other written
                    consents.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 4. Election of Board of Directors.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    A Board Member shall be elected for a three-year term. Each year, at
                    least one seat for a new Board of Directors position and one seat
                    for re-election of a current Board of Director position will be made
                    available for a total of a minimum of two but a maximum of three
                    Director positions, in addition to the President-Elect, to be
                    elected at the Annual Meeting. If an existing Board Member is
                    elected to be a Presidential Officer (e.g., President-Elect), a
                    replacement will then be elected. Newly-elected Directors are
                    required to be Members of the Society and in good standing. Board
                    Members who are completing their term on the Board may not be
                    immediately re-elected except as President-Elect but may be
                    re-elected to another term as a Board Member after one year.
                    Newly-elected Directors shall assume office at the conclusion of the
                    Annual Meeting.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 5. Resignation of Board of Directors Members.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    In the event that a Director resigns, the Board of Directors is
                    authorized to name an acting replacement to serve the remainder of
                    the current term year until the next Annual Meeting at which time
                    the Members shall elect a replacement to serve out the remaining
                    term, if any, of that Director.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 6. Removal of Board of Directors Members.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    One Director may propose the removal of another Director with a
                    strong justification such as their improper behavior during their
                    term, gross negligence, or failure to properly fulfill the duties of
                    a Director. In such a situation, the President (but if the President
                    is accused, the responsibility should be taken by the Past
                    President) needs to investigate and present the evidence in written
                    form to the rest of the Board of Directors (excluding the accused
                    and accuser) to solicit an anonymous vote of removal. The number of
                    votes must meet or exceed the quorum (calculated based on the
                    remaining number of Board of Directors) to proceed with the removal.
                    If the support for removal exceeds a minimum of 70% of the votes,
                    the announcement of the removal will also be posted on the
                    organization website with the verbiage approved by the Board of
                    Directors. The Board of Directors shall name an acting replacement
                    Director to serve the remainder of the current term year until the
                    next Annual Meeting at which time the Members shall elect a
                    replacement to serve out the remaining term, if any, of that
                    Director.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 7. Replacement of a Presidential Officer.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    If a Director who held a Presidential Office resigns or is removed
                    from office, the Board is authorized to name an acting replacement
                    Director as described above. In addition, if that Director held the
                    office of Past President, the Board will function for the remainder
                    of the term year without that officer, with the Membership electing
                    a new President-Elect (as usual) at the next Annual Meeting. If the
                    resigning/removed Director held the office of President, then the
                    President-Elect will immediately become President for the remainder
                    of the current term year and will remain as President for the
                    subsequent term year, as originally planned, with the Members
                    electing a new President-Elect (as usual) at the next Annual
                    Meeting. If the resigning Director held the office of
                    President-Elect, the Board will function for the remainder of the
                    term year without that officer and the Members shall elect both a
                    President and President-Elect at the next Annual Meeting.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 8. Limits on Liability of Directors.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    To the fullest extent permitted by the General Corporation Act, as
                    the same exists or may be amended, a Director of the Society shall
                    not be personally liable to the Society or its Members for monetary
                    damages for breach of fiduciary duty as a Director.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 9. Official Declaration of Duties.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Members of the Board of Directors, when assuming their positions,
                    are required to sign the MCBIOS Board Guidelines (more in Article
                    VII) for which their positions are responsible. They may be held
                    accountable for failing to address the responsibilities associated
                    with their positions and may not be eligible for similar positions
                    in the future.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article VII */}
            <ArticleSection id="Article_VII_Board_Guidelines" title="Article VII. The Board Guidelines">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Context.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Board Guidelines summarize key responsibilities and the
                    societies&apos; expectations for each position in the Society. They
                    also provide a list of standing committees in the Society which have
                    been approved by Board of Directors with a majority vote. These
                    committees appointed by the Board of Directors act for the Board for
                    special purposes and the individuals serving on the committees may
                    or may not be Members of the Society.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Execution.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Each new Board member must sign the Guidelines before officially
                    taking a position. The Guidelines needs to be reviewed every year
                    for Board approval.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article VIII */}
            <ArticleSection id="Article_VIII_Chapters_and_Working_Groups" title="Article VIII. Chapters and Working Groups">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Recognition.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Chapters are membership subgroups of MCBIOS within a specifically
                    defined geographical region or institution. Working groups are
                    membership subgroups of MCBIOS within a specifically defined topic
                    area regardless of geographical or institutional confines. The Board
                    of Directors may choose to recognize any Chapter or Working Group
                    made up of three or more Members with a duly-elected Chair who may
                    optionally participate in Board of Director meetings in an
                    ex-officio capacity. Chapters or Working Groups who wish to be
                    recognized must apply for recognition and indicate their planned
                    meeting schedule, any proposed Chapter or Working Group structures,
                    and their purpose for organizing. Chapters or Working Groups remain
                    at all times under the supervision and authority of the Board of
                    Directors, which may revoke recognition.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Meeting Requirements.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Each Chapter or Working Group needs to inform the Board of Directors
                    about their meetings. A minimum of one meeting per year and a
                    meeting report are required to maintain the Chapter or Working Group
                    in good standing.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 3. Hosting Annual Meetings.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Only recognized Chapters or Working Groups may host the
                    Society&apos;s Annual Meetings, upon approval by Board of Directors
                    by following the established conference approval process.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article IX */}
            <ArticleSection id="Article_IX_Indemnification" title="Article IX. Indemnification of Directors, Officers, Employees and Agents">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Actions Other Than in the Right of the Society.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Society shall indemnify any person who was or is a party or is
                    threatened to be made a party to any threatened, pending or
                    completed action, suit or proceeding whether civil, criminal,
                    administrative or investigative (other than an action by or in the
                    right of the Society) by reason of the fact that they are or were a
                    Director, officer, employee or agent of the Society or are or were
                    serving at the request of the Society as a director, trustee,
                    officer, employee or agent of another corporation, partnership,
                    joint venture or other enterprise against expenses (including
                    attorney&apos;s fees), judgments, fines and amounts paid in
                    settlement actually and reasonably incurred in connection with such
                    action, suit or proceeding if such person acted in good faith and in
                    a manner they reasonably believed to be in or not opposed to the
                    best interest of the Society and, with respect to any criminal
                    action or proceeding, had no reasonable cause to believe that their
                    conduct was unlawful.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Actions by or in the Right of the Society.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Society shall indemnify any person who was or is a party or is
                    threatened to be made a party to any threatened, pending or
                    completed action or suit by or in the right of the Society to
                    procure a judgment in its favor by reason of the fact that such
                    person is or was a Director, officer, employee or agent of the
                    Society or is or was serving at the request of the Society as a
                    director, trustee, officer, employee or agent of another
                    corporation, partnership, joint venture, trust or other enterprise
                    against expenses (including attorney&apos;s fees) actually and
                    reasonably incurred in connection with the defense or settlement of
                    such action or suit if such person acted in good faith and in a
                    manner they reasonably believed to be in or not opposed to the best
                    interest of the Society.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 3. Advancement of Expenses.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Expenses incurred in defending a civil or criminal action, suit or
                    proceeding, in advance of the final disposition of such action, suit
                    or proceeding shall be repaid upon receipt of an undertaking by or
                    on behalf of the Director, officer, employee or agent to repay such
                    amount if it shall ultimately be determined that they are not
                    entitled to be indemnified by the Society.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 4. Insurance.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The Society may purchase (upon resolution duly adopted by the Board
                    of Directors) and maintain insurance on behalf of any person who is
                    or was a Director, officer, employee or agent of the Society, or is
                    or was serving at the request of the Society as a director, trustee,
                    officer, employee or agent of another corporation, partnership,
                    joint venture, trust or other enterprise against any liability
                    asserted against such person and incurred in any such capacity.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 5. Indemnification Required.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    To the extent that a Director, officer, employee or agent of the
                    Society has been successful on the merits or otherwise in defense of
                    any action, suit, or proceeding referred to herein or in defense of
                    any claim, issue or matter therein, such person shall be indemnified
                    against expenses (including attorneys&apos; fees) actually and
                    reasonably incurred in connection therewith.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 6. Entitlement.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Every such person shall be entitled, without demand upon the Society
                    or any action by the Society, to enforce their right to such
                    indemnity in an action at law against the Society.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article X */}
            <ArticleSection id="Article_X_Conflicts_of_Interest" title="Article X. Conflicts of Interest">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Definitions.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    (a) Interested Person: Any Director or officer who has a material direct or indirect
                    financial interest, as defined in this Article, is an interested person apply.
                    (b) Financial Interest: A person has a financial interest if the person has, directly
                    or indirectly, through business, investment or family: (i) an
                    ownership or investment interest in any entity with which the
                    Society has a transaction or arrangement; (ii) a compensation
                    arrangement with the Society or with any entity or individual with
                    which the Society has a transaction or arrangement; or (iii) a
                    potential ownership or investment interest in, or compensation
                    arrangement with, any entity or individual with which the Society is
                    negotiating a transaction or arrangement.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Disclosure.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    An Interested Person shall disclose to the Directors the existence
                    and nature of their financial interest in any proposed transaction
                    or arrangement involving the Society.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 3. Procedures for Addressing Conflicts of Interest.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The President or the Chair of a committee considering a transaction
                    or arrangement involving an Interested Person shall, if appropriate,
                    appoint a disinterested person or committee to investigate
                    alternatives to the proposed transaction or arrangement.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 4. Violations.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    If the Board or committee has reasonable cause to believe that an
                    Interested Person has failed to disclose a conflict of interest as
                    required in this Article, the Board or committee shall inform the
                    Interested Person of the basis for such belief and afford the
                    Interested Person an opportunity to explain the alleged failure to
                    disclose.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 5. Record of Proceedings.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The minutes of the Board or committee shall contain the names of the persons who disclosed or otherwise were found
                    to have a financial interest in connection with a conflict of
                    interest, the nature of the financial interest, any action taken to
                    determine whether a conflict of interest was present, and the
                    decision as to whether a conflict of interest in fact existed.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 6. Compensation.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    A Director or committee member who receives compensation, directly
                    or indirectly, from the Society shall not vote on matters pertaining
                    to their compensation.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 7. Annual Statements.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    Each Director, officer and committee Chair shall annually sign a
                    statement which affirms such person has received, read, understands,
                    and agrees to comply with the conflicts of interest policy.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 8. Periodic Reviews.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    To ensure the Society operates in a manner consistent with
                    charitable purposes and does not engage in activities that could
                    jeopardize its tax-exempt status, periodic reviews shall be
                    conducted.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article XI */}
            <ArticleSection id="Article_XI_Fiscal_Year" title="Article XI. Fiscal Year">
              <Stack gap="8">
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 1. Period.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    The fiscal year of the Society shall be the calendar year commencing
                    on the 1st day of January and ending on the 31st day of the
                    following December.
                  </Text>
                </Box>
                <Box>
                  <Heading as="h4" fontSize="md" fontWeight="bold" color="slate.900" mb="3">
                    Section 2. Treasurer&apos;s Report.
                  </Heading>
                  <Text color="slate.700" lineHeight="tall">
                    A report of the fiscal state of the Society shall be made by the
                    Treasurer at the Annual Meeting and whenever requested by the Board
                    of Directors.
                  </Text>
                </Box>
              </Stack>
            </ArticleSection>

            {/* Article XII */}
            <ArticleSection id="Article_XII_Policy_Against_Discrimination" title="Article XII. Policy against Discrimination">
              <Text color="slate.700" lineHeight="tall">
                The Society shall not exclude from participation, deny benefits or
                services, or discriminate against any individual, on the basis of
                race, color, national origin, religion, sex or physical disability
                or impairment, under any program or activity it sponsors or
                conducts.
              </Text>
            </ArticleSection>

            {/* Article XIII */}
            <ArticleSection id="Article_XIII_Amendments" title="Article XIII. Amendments">
              <Text color="slate.700" lineHeight="tall">
                Subject to the provisions of the Certificate of Incorporation, the
                Members or the Board of Directors may amend or repeal these Bylaws
                at any meeting or by written consent. The Secretary shall record all
                amendments or repeals of these Bylaws by making the required changes
                on the Society&apos;s copy of the Bylaws and either noting the
                effective time of the change (and all other changes following the
                last restatement of the Bylaws) in a parenthetical following the
                amended or deleted Section or restating and certifying an amended
                and restated version of the then effective Bylaws.
              </Text>
            </ArticleSection>

            {/* Article XIV */}
            <ArticleSection id="Article_XIV_Dissolution" title="Article XIV. Dissolution">
              <Text color="slate.700" lineHeight="tall">
                In the event of the dissolution or termination of the Society, title
                to and possession of all the property of the incorporated Society
                shall pass forthwith to such organization or organizations qualified
                for exemption under Section 501(c)(3) of the Internal Revenue Code
                of 1954, as amended, that in the option of the Board of Directors is
                or are best fitted to carry on the purpose of the MidSouth
                Computational Biology and Bioinformatics Society.
              </Text>
            </ArticleSection>

            {/* Certification */}
            <Box
              bg="slate.50"
              p="8"
              rounded="2xl"
              borderWidth="1px"
              borderColor="slate.200"
            >
              <Flex align="center" gap="3" mb="4">
                <Icon color="red.700" boxSize="5">
                  <LuFileText />
                </Icon>
                <Heading as="h3" fontSize="md" fontWeight="bold" color="slate.900">
                  Certification
                </Heading>
              </Flex>
              <Text color="slate.700" lineHeight="tall" mb="4">
                The undersigned hereby certifies that the foregoing constitutes a
                true and correct copy of the Bylaws of the Society, as adopted by
                the Board on 2/19/2021.
              </Text>
              <Text color="slate.700" lineHeight="tall" mb="4">
                Executed as of 3/19/2021, in the presence of our attorney.
              </Text>
              <Text color="slate.600" fontWeight="medium" fontStyle="italic">
                Dr. Robert Doerksen, Secretary, Updated 3/19/2021
              </Text>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

function ArticleSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box as="article" id={id}>
      <Heading
        as="h3"
        fontSize="xl"
        fontWeight="bold"
        color="red.800"
        mb="6"
        pb="3"
        borderBottomWidth="2px"
        borderColor="red.100"
      >
        {title}
      </Heading>
      {children}
    </Box>
  );
}

const tableOfContents = [
  { chapter: "Article I. Name", url: "Article_I_Name" },
  { chapter: "Article II. Purpose", url: "Article_II_Purpose" },
  { chapter: "Article III. Membership", url: "Article_III_Membership" },
  { chapter: "Article IV. General Meetings", url: "Article_IV_General_Meetings" },
  { chapter: "Article V. Officers", url: "Article_V_Officers" },
  { chapter: "Article VI. Board of Directors", url: "Article_VI_Board_of_Directors" },
  { chapter: "Article VII. Board Guidelines", url: "Article_VII_Board_Guidelines" },
  { chapter: "Article VIII. Chapters and Working Groups", url: "Article_VIII_Chapters_and_Working_Groups" },
  { chapter: "Article IX. Indemnification", url: "Article_IX_Indemnification" },
  { chapter: "Article X. Conflicts of Interest", url: "Article_X_Conflicts_of_Interest" },
  { chapter: "Article XI. Fiscal Year", url: "Article_XI_Fiscal_Year" },
  { chapter: "Article XII. Policy against Discrimination", url: "Article_XII_Policy_Against_Discrimination" },
  { chapter: "Article XIII. Amendments", url: "Article_XIII_Amendments" },
  { chapter: "Article XIV. Dissolution", url: "Article_XIV_Dissolution" },
];
