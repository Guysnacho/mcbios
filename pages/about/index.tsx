import { Separator } from "@chakra-ui/react";
import Head from "next/head";

const about = () => {
  const tableOfContents = [
    {
      chapter: "Article I. Name",
      url: "Article_I_Name",
    },
    {
      chapter: "Article II. Purpose",
      url: "Article_II_Purpose",
    },
    {
      chapter: "Article III. Membership",
      url: "Article_III_Membership",
    },
    {
      chapter: "Article IV. General Meetings",
      url: "Article_IV_General_Meetings",
    },
    {
      chapter: "Article V. Officers",
      url: "Article_V_Officers",
    },
    {
      chapter: "Article VI. Board of Directors",
      url: "Article_VI_Board_of_Directors",
    },
    {
      chapter: "Article VII. Board Guidelines",
      url: "Article_VII_Board_Guidelines",
    },
    {
      chapter: "Article VIII. Chapters and Working Groups",
      url: "Article_VIII_Chapters_and_Working_Groups",
    },
    {
      chapter:
        "Article IX. Indemnification of Directors, Officers, Employees and Agents",
      url: "Article_IX_Indemnification",
    },
    {
      chapter: "Article X. Conflicts of Interest",
      url: "Article_X_Conflicts_of_Interest",
    },
    {
      chapter: "Article XI. Fiscal Year",
      url: "Article_XI_Fiscal_Year",
    },
    {
      chapter: "Article XII. Policy against Discrimination",
      url: "Article_XII_Policy_Against_Discrimination",
    },
    {
      chapter: "Article XIII. Amendments",
      url: "Article_XIII_Amendments",
    },
    {
      chapter: "Article XIV. Dissolution",
      url: "Article_XIV_Dissolution",
    },
  ];
  return (
    <div className="space-y-10 mx-auto">
      <Head>
        <title>About Us</title>
        <meta content="About Us | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <h4 className="text-center my-10 mx-auto w-5/6 lg:w-3/4">
        BYLAWS OF THE MIDSOUTH COMPUTATIONAL BIOLOGY AND BIOINFORMATICS SOCIETY
        (MCBIOS)
      </h4>

      <Separator className="w-1/2 mx-auto mb-10" />

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-1">
        <h6 className="font-bold text-center">Table of Contents</h6>
        {tableOfContents.map((chapter) => (
          <div key={chapter.chapter}>
            <a href={"#" + chapter.url} className="hover:text-violet-800">
              {chapter.chapter}
            </a>
            <br />
          </div>
        ))}
      </section>

      <Separator className="w-1/2 mx-auto mb-10" />

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-1">
        <h6 className="font-bold text-center">
          <a id="Article_I_Name">Article I. Name</a>
        </h6>
        <p>
          The name of the Society shall be the
          <span className="font-bold">
            {" "}
            MidSouth Computational Biology and Bioinformatics Society{" "}
          </span>
          (MCBIOS).
        </p>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_II_Purpose">Article II. Purpose</a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Purposes.</h6>
          <p>
            The purposes of the Society are scientific, educational, literary,
            charitable, and no other. In furtherance of these purposes, the
            business and objectives of the Society shall be <br />
            (a) to advance the understanding of bioinformatics and computational
            biology;
            <br />
            (b) to bring together scientists of various backgrounds and
            disciplines;
            <br />
            (c) to facilitate the collaboration of researchers with similar or
            complementary backgrounds to solve biological, health, and/or
            medical problems;
            <br />
            (d) to promote education in bioinformatics and computational
            biology;
            <br />
            (e) to inform the general public on the results and implications of
            current research in bioinformatics and computational biology; and
            <br />
            (f) to promote other activities that will contribute to the
            development of bioinformatics and computational biology.
            <br />
            The Society will especially support, encourage, and mentor our
            Trainee Members.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Non-Profit Status.</h6>
          <p>
            The Society is organized and shall be operated as a not-for-profit
            membership corporation. If the Board of Directors of the Society
            elects to seek and obtains an exemption for the Society from Federal
            taxation pursuant to Section 501(a) of the Internal Revenue Code, as
            amended (the “IRC”), and until such time, if ever, that such
            exemption is denied or lost, the Society shall not be empowered to
            engage directly or indirectly in any activity which the Society
            believes would be likely to invalidate its status as an organization
            exempt from federal taxation under Section 501(a) of the IRC as an
            organization described in Section 501(c)(3) of the IRC.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_III_Membership">Article III. Membership</a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Members.</h6>
          <p>
            The Society shall consist of two classes of members: Professional
            and Trainee. Both member classes are eligible to vote if they are in
            good standing.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Professional Members.</h6>
          <p>
            Any person who has a professional interest in bioinformatics or
            computational biology is eligible to be a Professional Member unless
            he/she is eligible for Trainee Member and chooses that option (see
            the definition below, Section 3). Applications shall follow
            procedures defined by the Board of Directors. Professional members
            are eligible to advance in three membership grades: Regular, Senior,
            and Fellow. The Board of Directors shall define eligibility,
            nomination, and evaluation criteria for each membership grade and
            set the quota each year for the Senior and Fellow grades.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 3. Trainee Members.</h6>
          <p>
            Trainee members would comprise of both Students and Postdoctoral
            Fellows. Any person enrolled in an educational institution and any
            postdoctoral fellow affiliated to an academic, industrial or
            government research facility is eligible to apply for a Trainee
            Membership instead of a Professional Membership. Trainee Membership
            shall terminate at the end of the first membership year in which the
            Trainee is no longer a Student or Postdoctoral Fellow. Trainee
            Members are eligible for reduced dues and assessments.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 4. Dues and Assessments.</h6>
          <p>
            The Board of Directors shall set annual dues and special assessments
            to the Members according to the needs of the Society. Trainee
            Members shall receive a discounted membership rate. The membership
            begins on the first day of the calendar year in which the payment is
            received and cannot be applied retroactively to previous years or
            prospectively to future years.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_IV_General_Meetings">Article IV. General Meetings</a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Annual Meeting.</h6>
          <p>
            The Society membership shall meet annually at a place and time
            designated by the Board of Directors. The Board of Directors may
            also call Special Meetings of the membership.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Notice of Meetings.</h6>
          <p>
            The President shall notify members of Annual Meetings and Special
            Meetings of the membership as a whole, indicating the place and time
            of the meeting and, in case of a Special Meeting, the purpose for
            which the meeting is called. Notice of an Annual or Special Meeting
            shall be distributed not less than ten or more than 60 days before
            the date of the meeting, provided that the Board may tentatively
            schedule the date, place and time of the Annual Meeting, and provide
            notice thereof, more than 60 days before the date of the meeting.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 3. Quorum.</h6>
          <p>
            Ten percent of all of the Members at the meeting constitutes a
            quorum for all purposes at any meeting of the Members. In the
            absence of a quorum at any meeting or any adjournment thereof, a
            majority of the Members entitled to vote who are present may adjourn
            such meeting to another place, date or time.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 4. Voting by Members.</h6>
          <p>
            Each Member has one vote. Except as provided herein, a plurality of
            the votes cast determines all elections and a majority of the votes
            cast determines all other matters. The Members shall vote by ballot,
            whether in person, via paper ballot, or via electronic voting
            software; however, the vote can be carried out by voice if
            requested. Each ballot shall state the name of the Member voting and
            such other information as the Society may require under the
            procedure established for the meeting.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 5. No Proxy Voting.</h6>
          <p>Voting by proxy is not permitted.</p>
        </div>
        <div>
          <h6 className="font-bold">Section 6. Written Consent.</h6>
          <p>
            The Members may take any action that they could take at any Annual
            or Special Meeting without a meeting, with prior notice, a vote, and
            signing consent in writing, setting forth the action taken. For
            this, the minimum number of Members needed is the same as the number
            that would be necessary to authorize or take the action at a meeting
            at which all Members entitled to vote were present and voted. The
            Secretary shall give prompt notice of any corporate action taken by
            less than unanimous consent without a meeting to the Regular Members
            who have not consented in writing.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_V_Officers">Article V. Officers</a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. The Presidential Officers.</h6>
          <p>
            The Presidential Officers consist of the President-Elect, President,
            and Past President.
            <br />
            The President shall preside at meetings of the Board of Directors,
            Annual Meetings, and Special Meetings of the Society; shall be
            responsible for executing policies determined by the Board of
            Directors; shall act as spokesperson for the Society; and shall see
            that all Orders and Resolutions of the Board of Directors are
            carried into effect.
            <br />
            The Past President and the President-Elect shall assist the
            President, shall be members of the Board of Directors, and shall
            substitute for the President when necessary. The Past President
            shall take precedence over the President-Elect in substituting for
            the President. The Past-President shall prepare a slate of nominees
            for the President position to give to the Board of Directors for
            presentation to the membership at the Annual Meeting.
            <br />
            Immediately after the Annual Meeting, the President-Elect will take
            the role of President while the current President shall become Past
            President. The Past President must take care of any remaining items
            from the tenure of their term over the next 3 months, including
            submitting the annual report for the Annual Meeting and other
            organizational tasks.
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 2. Election and Succession of Presidential Officers.
          </h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 3. The Secretaries.</h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 4. The Treasurer.</h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 5. Contracts.</h6>
          <p>
            The Board of Directors may authorize any officer or officers, agent
            or agents, to enter into any contract or execute and deliver any
            instrument in the name and on behalf of the Society. The Board may
            make such authorization general or special.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_VI_Board_of_Directors">
            Article VI. Board of Directors
          </a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Board of Directors.</h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Quorum.</h6>
          <p>
            A quorum of the Board of Directors shall consist of 60% of the total
            number of Directors. In the absence of a quorum, a majority of the
            Directors present at any meeting may adjourn the meeting to another
            place, date or time without further notice.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 3. Meetings.</h6>
          <p>
            The Board of Directors shall meet at the Annual Meeting, notice of
            which need not be given. The Board may meet at other times and
            places as it deems necessary and shall provide written notice to
            each Director of the time, place, date and purpose of the meeting of
            not less than three business days. Meetings may be conducted in
            person, via videoconference, and/or by telephone or other form of
            live telephonic communication. The Board of Directors may also
            conduct business by mail, email, web surveys or other written
            consents.
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 4. Election of Board of Directors.
          </h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 5. Resignation of Board of Directors Members.
          </h6>
          <p>
            In the event that a Director resigns, the Board of Directors is
            authorized to name an acting replacement to serve the remainder of
            the current term year until the next Annual Meeting at which time
            the Members shall elect a replacement to serve out the remaining
            term, if any, of that Director.
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 6. Removal of Board of Directors Members.
          </h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 7. Replacement of a Presidential Officer.
          </h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 8. Limits on Liability of Directors.
          </h6>
          <p>
            To the fullest extent permitted by the General Corporation Act, as
            the same exists or may be amended, a Director of the Society shall
            not be personally liable to the Society or its Members for monetary
            damages for breach of fiduciary duty as a Director.
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 9. Official Declaration of Duties.
          </h6>
          <p>
            Members of the Board of Directors, when assuming their positions,
            are required to sign the MCBIOS Board Guidelines (more in Article
            VII) for which their positions are responsible. They may be held
            accountable for failing to address the responsibilities associated
            with their positions and may not be eligible for similar positions
            in the future.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_VII_Board_Guidelines">
            Article VII. The Board Guidelines
          </a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Context.</h6>
          <p>
            The Board Guidelines summarize key responsibilities and the
            societies&apos; expectations for each position in the Society. They
            also provide a list of standing committees in the Society which have
            been approved by Board of Directors with a majority vote. These
            committees appointed by the Board of Directors act for the Board for
            special purposes and the individuals serving on the committees may
            or may not be Members of the Society.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Execution.</h6>
          <p>
            Each new Board member must sign the Guidelines before officially
            taking a position. The Guidelines needs to be reviewed every year
            for Board approval.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_VIII_Chapters_and_Working_Groups">
            Article VIII. Chapters and Working Groups
          </a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Recognition.</h6>
          <p>
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
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Meeting Requirements.</h6>
          <p>
            Each Chapter or Working Group needs to inform the Board of Directors
            about their meetings. A minimum of one meeting per year and a
            meeting report are required to maintain the Chapter or Working Group
            in good standing.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 3. Hosting Annual Meetings.</h6>
          <p>
            Only recognized Chapters or Working Groups may host the
            Society&apos;s Annual Meetings, upon approval by Board of Directors
            by following the established conference approval process.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_IX_Indemnification">
            Article IX. Indemnification of Directors, Officers, Employees and
            Agents
          </a>
        </h6>
        <div>
          <h6 className="font-bold">
            Section 1. Actions Other Than in the Right of the Society.
          </h6>
          <p>
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
            conduct was unlawful. The termination of any action, suit or
            proceeding by judgment, order, settlement, conviction or upon a plea
            of nolo contendere or its equivalent shall not of itself create a
            presumption that the person did not act in good faith and in a
            manner which such person reasonably believed to be in good faith and
            in a manner which they reasonably believed to be in or not opposed
            to the best interest of the Society and with respect to any criminal
            action or proceeding had reasonable cause to believe that their
            conduct was unlawful.
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 2. Actions by or in the Right of the Society.
          </h6>
          <p>
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
            interest of the Society; except that no indemnification shall be
            made in respect of any claim, issue or matter as to which such
            person shall have been adjudged to be liable to the Society unless
            and only to the extent that the court in which such action or suit
            was brought shall determine, upon application, that despite the
            adjudication of liability, but in the view of all the circumstances
            of the case, such person is fairly and reasonably entitled to
            indemnity for such expenses which the court shall deem proper.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 3. Advancement of Expenses.</h6>
          <p>
            Expenses incurred in defending a civil or criminal action, suit or
            proceeding, in advance of the final disposition of such action, suit
            or proceeding shall be repaid upon receipt of an undertaking by or
            on behalf of the Director, officer, employee or agent to repay such
            amount if it shall ultimately be determined that they are not
            entitled to be indemnified by the Society.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 4. Insurance.</h6>
          <p>
            The Society may purchase (upon resolution duly adopted by the Board
            of Directors) and maintain insurance on behalf of any person who is
            or was a Director, officer, employee or agent of the Society, or is
            or was serving at the request of the Society as a director, trustee,
            officer, employee or agent of another corporation, partnership,
            joint venture, trust or other enterprise against any liability
            asserted against such person and incurred in any such capacity, or
            arising out of their status as such, whether or not the Society
            would have the power to indemnify such person against such
            liability.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 5. Indemnification Required.</h6>
          <p>
            To the extent that a Director, officer, employee or agent of the
            Society has been successful on the merits or otherwise in defense of
            any action, suit, or proceeding referred to herein or in defense of
            any claim, issue or matter therein, such person shall be indemnified
            against expenses (including attorneys&apos; fees) actually and
            reasonably incurred in connection therewith.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 6. Entitlement.</h6>
          <p>
            Every such person shall be entitled, without demand upon the Society
            or any action by the Society, to enforce their right to such
            indemnity in an action at law against the Society. The right of
            indemnification and advancement of expenses provided in this Article
            shall not be deemed exclusive of any rights to which any such person
            may now or later be otherwise entitled and specifically, without
            limiting the generality of the foregoing, shall not be deemed
            exclusive of any rights pursuant to statute or otherwise, of any
            such person in any action, suit or proceeding to have assessed or
            allowed in their favor against the Society or otherwise, costs and
            expenses incurred or in connection therewith or any part thereof.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_X_Conflicts_of_Interest">
            Article X. Conflicts of Interest
          </a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Definitions.</h6>
          <p>
            (a) Interested Person.
            <br />
            Any Director or officer who has a material direct or indirect
            financial interest, as defined in this Article, is an interested
            person.
            <br />
            (b) Financial Interest.
            <br />A person has a financial interest if the person has, directly
            or indirectly, through business, investment or family: (i) an
            ownership or investment interest in any entity with which the
            Society has a transaction or arrangement; (ii) a compensation
            arrangement with the Society or with any entity or individual with
            which the Society has a transaction or arrangement; or (iii) a
            potential ownership or investment interest in, or compensation
            arrangement with, any entity or individual with which the Society is
            negotiating a transaction or arrangement. A person shall not be
            deemed to have a “financial interest” due to an employment
            arrangement with, or serving as a director or officer of, another
            non-profit entity that is exempt from federal income taxation under
            the Code.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Disclosure.</h6>
          <p>
            An Interested Person shall disclose to the Directors the existence
            and nature of their financial interest in any proposed transaction
            or arrangement involving the Society.
          </p>
        </div>
        <div>
          <h6 className="font-bold">
            Section 3. Procedures for Addressing Conflicts of Interest.
          </h6>
          <p>
            The President or the Chair of a committee considering a transaction
            or arrangement involving an Interested Person shall, if appropriate,
            appoint a disinterested person or committee to investigate
            alternatives to the proposed transaction or arrangement. The Board
            or committee shall determine whether the Society may, without undue
            burden, delay or expense, obtain a more advantageous transaction or
            arrangement with reasonable efforts from a person or entity that
            would not give rise to a conflict of interest. If a more
            advantageous transaction or arrangement is not reasonably attainable
            under circumstances that would not give rise to a conflict of
            interest, the Board or committee shall determine, by a majority vote
            of the disinterested Directors, whether the transaction or
            arrangement is in the best interest of the Society and whether the
            transaction is fair to the Society.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 4. Violations.</h6>
          <p>
            If the Board or committee has reasonable cause to believe that an
            Interested Person has failed to disclose a conflict of interest as
            required in this Article, the Board or committee shall inform the
            Interested Person of the basis for such belief and afford the
            Interested Person an opportunity to explain the alleged failure to
            disclose. If, after hearing the response of the Interested Person
            and making such further investigation as may be warranted in the
            circumstances, the Board or committee determines that the Interested
            Person has in fact failed to disclose a conflict of interest as
            required in this Article, the Board or committee shall take
            appropriate disciplinary and corrective action.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 5. Record of Proceedings.</h6>
          <p>
            The minutes of the Board or committee shall contain: <br />
            (a) the names of the persons who disclosed or otherwise were found
            to have a financial interest in connection with a conflict of
            interest, the nature of the financial interest, any action taken to
            determine whether a conflict of interest was present, and the
            decision as to whether a conflict of interest in fact existed, and{" "}
            <br />
            (b) the names of the persons who were present for discussions and
            votes relating to the transaction or arrangement, and a record of
            any votes taken.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 6. Compensation.</h6>
          <p>
            A Director or committee member who receives compensation, directly
            or indirectly, from the Society shall not vote on matters pertaining
            to their compensation.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 7. Annual Statements.</h6>
          <p>
            Each Director, officer and committee Chair shall annually sign a
            statement which affirms such person: <br />
            (a) Has received a copy of the conflicts of interest policy;
            <br />
            (b) Has read and understands the policy;
            <br />
            (c) Has agreed to comply with the policy; and
            <br />
            (d) Understands the Society is charitable and in order to maintain
            its federal tax exemption it must engage primarily in activities
            that accomplish one or more of its tax-exempt purposes.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 8. Periodic Reviews.</h6>
          <p>
            To ensure the Society operates in a manner consistent with
            charitable purposes and does not engage in activities that could
            jeopardize its tax-exempt status, periodic reviews shall be
            conducted. The periodic reviews shall, at a minimum, include the
            following subjects:
            <br />
            (a) Whether compensation arrangements and benefits are reasonable,
            based on competent survey information and the result of arm&apos;s
            length bargaining.
            <br />
            (b) Whether partnerships, joint ventures, and arrangements with
            management organizations conform to the Society&apos;s written
            policies, are properly recorded, reflect reasonable investment or
            payments for goods and services, further charitable purposes and do
            not result in inurement, impermissible private benefit or in an
            excess benefit transaction.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 9. Validation of Contracts.</h6>
          <p>
            No contract or transaction between the Society and one or more of
            its Directors, Officers or Members, or other organization in which
            one or more of its Directors, Officers or Members are Directors,
            Officers or Members or have a financial interest shall be void or
            voidable solely for this reason or solely because the Directors,
            Officers or Member is present at or participates in the meeting of
            the Board which authorizes the contract or transaction or solely
            because their vote is counted for such purposes if:
            <br />
            (a) The material facts as to the Director&apos;s interest and as to
            the contract or transaction are disclosed or are known to the Board
            of Directors and the Board in good faith authorizes the contract or
            transaction by a vote sufficient for such purpose without counting
            the vote of the interested Director(s); or
            <br />
            (b) The contract or transaction is fair as to the Society as of the
            time it is authorized, approved or ratified by the Board of
            Directors.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 10. Quorum.</h6>
          <p>
            Interested Directors may be counted in determining the presence of a
            quorum at a meeting at which the Board of Directors authorizes the
            contract or transaction.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_XI_Fiscal_Year">Article XI. Fiscal Year</a>
        </h6>
        <div>
          <h6 className="font-bold">Section 1. Period.</h6>
          <p>
            The fiscal year of the Society shall be the calendar year commencing
            on the 1st day of January and ending on the 31st day of the
            following December.
          </p>
        </div>
        <div>
          <h6 className="font-bold">Section 2. Treasurer&apos;s Report.</h6>
          <p>
            A report of the fiscal state of the Society shall be made by the
            Treasurer at the Annual Meeting and whenever requested by the Board
            of Directors.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_XII_Policy_against_Discrimination">
            Article XII. Policy against Discrimination
          </a>
        </h6>
        <div>
          <p>
            The Society shall not exclude from participation, deny benefits or
            services, or discriminate against any individual, on the basis of
            race, color, national origin, religion, sex or physical disability
            or impairment, under any program or activity it sponsors or
            conducts.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_XIII_Amendments">Article XIII. Amendments</a>
        </h6>
        <div>
          <p>
            Subject to the provisions of the Certificate of Incorporation, the
            Members or the Board of Directors may amend or repeal these Bylaws
            at any meeting or by written consent. The Secretary shall record all
            amendments or repeals of these Bylaws by making the required changes
            on the Society&apos;s copy of the Bylaws and either noting the
            effective time of the change (and all other changes following the
            last restatement of the Bylaws) in a parenthetical following the
            amended or deleted Section or restating and certifying an amended
            and restated version of the then effective Bylaws.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">
          <a id="Article_XIV_Dissolution">Article XIV. Dissolution</a>
        </h6>
        <div>
          <p>
            In the event of the dissolution or termination of the Society, title
            to and possession of all the property of the incorporated Society
            shall pass forthwith to such organization or organizations qualified
            for exemption under Section 501(c)(3) of the Internal Revenue Code
            of 1954, as amended, that in the option of the Board of Directors is
            or are best fitted to carry on the purpose of the MidSouth
            Computational Biology and Bioinformatics Society.
          </p>
        </div>
      </section>

      <section className="w-3/4 xl:w-1/2 mx-auto space-y-9">
        <h6 className="font-bold text-center">Article XIV. Dissolution</h6>
        <div>
          <p>
            The undersigned hereby certifies that the foregoing constitutes a
            true and correct copy of the Bylaws of the Society, as adopted by
            the Board on 2/19/2021.
          </p>
          <p>Executed as of 3/19/2021, in the presence of our attorney.</p>
          <br />
          <p>Dr. Robert Doerksen, Secretary, Updated 3/19/2021</p>
        </div>
      </section>
    </div>
  );
};

export default about;
