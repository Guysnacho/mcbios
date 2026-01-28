import { NameTagForm } from "@/components/forms/NameTagForm";
import { Button, Heading, Image, VStack } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

const Forms = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head>
        <title>MCBIOS Forms</title>
        <meta content="MCBIOS Forms | MidSouth Computational Biology and Bioinformatics Society" />
      </Head>
      <NameTagForm isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="container space-y-10 mx-auto">
        <div className="h-1/2 w-1/2 mx-auto">
          <Image
            src="https://blush.design/api/download?shareUri=unSj1VTUqC9V06JG&c=Hair_0%7E878787-0.2%7Ec38741_Skin_0%7Ec26e5e-0.2%7E7d4439&w=800&h=800&fm=png"
            alt="People talking"
            className="mx-auto object-contain h-[20rem] md:h-[25rem]"
          />
        </div>
        <section>
          <h3 className="text-center my-10">MCBIOS Forms</h3>
          <div className="w-3/4 xl:w-1/2 mx-auto space-y-5">
            <VStack gap={3}>
              <Heading size="md">
                2025 Conference - Name Tag Confirmation
              </Heading>
              <section className="text-center space-y-3">
                <Button
                  aria-describedby="name tag submission"
                  type="button"
                  colorPalette="purple"
                  onClick={() => setIsOpen(true)}
                  disabled
                >
                  Closed
                </Button>
              </section>
            </VStack>
          </div>
        </section>
      </div>
    </>
  );
};

export default Forms;
