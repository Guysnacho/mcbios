"use client";

import { Image } from "@nextui-org/react";

const membership = () => {
  return (
    <div className="container space-y-10 mx-auto">
      <Image
        src="https://blush.design/api/download?shareUri=RQxRcTnczKazBPmu&c=Hair_0%7Ef3ddb4-0.0.2%7E765227-0.0.3%7E765227-0.0.4%7Eee4e2f-0.0.5%7E8ae0d3_Skin_0%7Ea15122-0.0.2%7Effd4aa-0.0.3%7Edb8c5c-0.0.4%7Effc280-0.0.5%7Edb8c5c&bg=ffffff&w=800&h=800&fm=png"
        alt="People talking"
        className="mx-auto"
        removeWrapper
        classNames={{
          wrapper: ["mx-auto", "aspect-square", "mb-5", "sm:mb-0"],
        }}
      />
      <section>
        <h3 className="text-center my-10">Join the Community</h3>
        <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
          <div className="space-y-2">
            <p>
              A society member will enjoy numerous benefits, including but not
              limited to:
            </p>
            <ul className="list-disc list-inside">
              <li>
                Competing for the society leadership positions such as board
                members or Presidential Officers.
              </li>
              <li>
                Hosting the auxiliary events such as virtual webinars and
                workshops.
              </li>
              <li>Running a local chapter.</li>
              <li>
                Enjoying a discount rate of registration for the annual
                conference.
              </li>
              <li>
                An opportunity of receiving a discount publication fee for the
                conference proceedings.
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p>
              The membership follows the conference year and you may join the
              society as a member in two ways:
            </p>
            <ul className="list-disc list-inside">
              <li>
                If you attend the annual society conference, the registration
                fee includes one year membership.
              </li>
              <li>
                You may become or maintain the membership status by paying the
                membership fee. For 2023, we offer the introductory membership
                rate of $100/30 for Professional/Student.
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="text-center">
        <p>MCBIOS 2023 Annual Membership Fee</p>
        <p>🏗️ Membership form coming soon 👷🏾‍♀️</p>
      </section>
    </div>
  );
};

export default membership;
