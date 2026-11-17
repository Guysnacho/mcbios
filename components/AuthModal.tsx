"use client";

import { Alert } from "@/components/ui/alert";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import {
  StepsContent,
  StepsItem,
  StepsList,
  StepsRoot,
} from "@/components/ui/steps";
import { toaster } from "@/components/ui/toaster";
import { Events, getBaseServiceURL, useAnalytics } from "@/lib";
import useStore from "@/lib/store/useStore";
import { useUserStore } from "@/lib/store/userStore";
import { createClient } from "@/lib/supabase/client";
import { Button, Heading, Input, Link, Stack, Text } from "@chakra-ui/react";
import { Eye, EyeOff, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { z } from "zod";

export const AuthModal = ({
  isOpen,
  setIsOpen,
  isSignUp,
  setIsSignUp,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isSignUp?: boolean;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [step, setStep] = useState(0); // 0: email entry, 1: password/signup fields
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [password, setPassword] = useState("");
  const [institution, setInstitution] = useState("");
  const [emailFoundInOtherOrg, setEmailFoundInOtherOrg] = useState(false);
  const client = createClient();
  const store = useStore(useUserStore, (store) => store);
  const [showPassword, setShowPassword] = useState(false);
  const { trackEvent } = useAnalytics();

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setFname("");
    setLname("");
    setInstitution("");
    setIsReset(false);
    setStep(0);
    setEmailFoundInOtherOrg(false);
    setIsOpen(false);
  };

  const handleLogin = async () => {
    setLoading(true);

    const { success, error } = SignInSchema.safeParse({
      email,
      password,
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
    });
    if (success) {
      // Perform auth
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      // Handle response
      if (error) {
        trackEvent(Events.AUTH.LOGIN_ATTEMPT, { error: error.message });
        throw error;
      } else {
        trackEvent(Events.AUTH.LOGIN_ATTEMPT, { error: false });
        // If email was found in another org, sync to this org's member table
        if (emailFoundInOtherOrg) {
          try {
            await fetch(`${getBaseServiceURL()}/api/auth`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                org_id: process.env.NEXT_PUBLIC_ORG_ID,
                token: data.session.access_token,
              }),
            });
          } catch (err) {
            console.error("Failed to sync member to org:", err);
            // Don't throw - user is still logged in, just log the error
          }
        }

        toaster.success({
          title: "Welcome Back!",
        });
        store?.setId(data.user?.id);
        setIsOpen(false);
        router.push("/dashboard");
      }
    } else {
      setPassword("");
      trackEvent(Events.AUTH.LOGIN_ATTEMPT, { error: "Validation failed" });
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(", "))
          .join(", "),
      );
    }
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);

    const { success, error } = SignUpSchema.safeParse({
      email,
      password,
      institution,
      fname,
      lname,
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
    });
    console.log(error);
    if (success) {
      // If account already exists, use login method instead of signup
      if (emailFoundInOtherOrg) {
        const { data, error } = await client.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          trackEvent(Events.AUTH.SIGNUP_ATTEMPT, { error: error.message });
          throw error;
        } else {
          trackEvent(Events.AUTH.SIGNUP_ATTEMPT, { error: false });
          // Sync member to this org's member table
          try {
            await fetch(`${getBaseServiceURL()}/api/auth`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                signup: "true",
              },
              body: JSON.stringify({
                org_id: process.env.NEXT_PUBLIC_ORG_ID,
                token: data.session.access_token,
                fname,
                lname,
                institution,
              }),
            });
          } catch (err) {
            console.error("Failed to sync member to org:", err);
            // Don't throw - user is still logged in, just log the error
          }

          toaster.success({
            title: "Welcome Back!",
          });
          store?.setId(data.user?.id);
          setIsOpen(false);
          router.push("/dashboard");
        }
      } else {
        // Normal signup flow
        const { error } = await client.auth.signUp({
          email,
          password,
          options: {
            data: {
              fname,
              lname,
              role: "student",
              institution,
              org_id: process.env.NEXT_PUBLIC_ORG_ID,
            },
          },
        });
        // Handle response
        if (error) {
          trackEvent(Events.AUTH.SIGNUP_ATTEMPT, { error: error.message });
          throw error;
        } else {
          trackEvent(Events.AUTH.SIGNUP_ATTEMPT, { error: false });
          setIsOpen(false);
          toaster.success({
            title: "Success",
            description: "Please check your email for a confirmation.",
            duration: 6000,
          });
        }
      }
    } else {
      trackEvent(Events.AUTH.SIGNUP_ATTEMPT, { error: "Validation failed" });
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(" | "))
          .join(" | "),
      );
    }
    setLoading(false);
  };

  const handleReset = async () => {
    setLoading(true);

    const { success, error } = ResetSchema.safeParse({
      email,
    });
    if (success) {
      // Perform auth
      const { error } = await client.auth.resetPasswordForEmail(email);
      // Handle response
      if (error) {
        trackEvent(Events.AUTH.PASSWORD_RESET_ATTEMPT, { error: error.message });
        if (error.message.toLocaleLowerCase().includes("rate limit")) {
          throw new Error(
            "Too many signup requests recieved for the provided email. Try again later.",
          );
        }
        throw error;
      } else {
        trackEvent(Events.AUTH.PASSWORD_RESET_ATTEMPT, { error: false });
        setIsOpen(false);
        toaster.success({
          title: "Success",
          description:
            "If an account is found in our system, you will recieve an email.",
          duration: 6000,
        });
      }
    } else {
      trackEvent(Events.AUTH.PASSWORD_RESET_ATTEMPT, { error: "Validation failed" });
      throw new Error(
        Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(" | "))
          .join(" | "),
      );
    }
    setLoading(false);
  };

  const checkEmail = async () => {
    setLoading(true);

    const { success, error } = EmailCheckSchema.safeParse({
      email,
      org_id: process.env.NEXT_PUBLIC_ORG_ID,
    });

    if (!success) {
      setLoading(false);
      toaster.error({
        title: "Invalid email",
        description: Object.entries(z.treeifyError(error).properties!)
          .map((err) => err[1].errors.join(" | "))
          .join(" | "),
      });
      return;
    }

    try {
      // The suite moved the eligibility check to /api/auth/[org_id]?email=...
      // (a plain GET: no custom headers, so no CORS preflight)
      const res = await fetch(
        `${getBaseServiceURL()}/api/auth/${process.env.NEXT_PUBLIC_ORG_ID}?email=${encodeURIComponent(email)}`,
      );
      // 200 { authed }: authed=false is a guest-only member row (paid or submitted a
      // form before, no account yet). There is no password to enter, so treat it
      // like "not registered": signing up claims that row.
      const authed = res.ok
        ? ((await res.json()) as { authed: boolean }).authed
        : undefined;
      const notRegistered =
        res.status === 404 || (res.ok && authed === false);

      if (res.ok && authed) {
        // Email found and matches organization - proceed to step 2
        setStep(1);
        if (isSignUp) {
          // Account already exists in current org, redirect to login flow
          setEmailFoundInOtherOrg(true);
          toaster.success({
            title: "Account found",
            description: "Please enter your password to continue.",
          });
        } else {
          toaster.success({
            title: "Email verified",
            description: "Please enter your password to continue.",
          });
        }
      } else if (notRegistered) {
        // Email not found (or only a guest row, no account yet)
        if (isSignUp) {
          // For signup, 404 is good - proceed to signup form
          setStep(1);
          toaster.success({
            title: "Email available",
            description: "Please complete the signup form.",
          });
        } else {
          // For login, 404 means they need to sign up first
          toaster.error({
            title: "Email not found",
            description: "This email is not registered. Please sign up first.",
          });
        }
      } else if (res.status === 406) {
        // Email found but belongs to different organization
        setEmailFoundInOtherOrg(true);
        setStep(1);
        if (isSignUp) {
          toaster.create({
            title: "Email found in another organization",
            description:
              "This email is registered with another Conference Suite organization. You can create an account here and link it. If you prefer, go back and use a different email.",
            type: "info",
          });
        } else {
          toaster.create({
            title: "Email found in another organization",
            description:
              "You may login with the same email and password as your other Conference Suite account. If you prefer, go back and use a different email.",
            type: "info",
          });
        }
      } else if (res.status === 429) {
        toaster.error({
          title: "Too many attempts",
          description: "Please wait a minute and try again.",
        });
      } else {
        // Other errors
        toaster.error({
          title: "Error",
          description: "Ran into an issue checking your email.",
        });
      }
    } catch (err) {
      console.error(err);
      toaster.error({
        title: "Network error",
        description: "Failed to verify email. Please try again.",
      });
    }

    setLoading(false);
  };

  return (
    <DialogRoot
      size="sm"
      open={isOpen}
      onOpenChange={(e) => !e.open && handleClose()}
    >
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (isReset) {
              handleReset()
                .then(() => handleClose())
                .catch((error) => {
                  toaster.error({
                    title: "Ran into an issue resetting your password",
                    description: error.message,
                  });
                  console.error(error);
                })
                .finally(() => setLoading(false));
            } else if (step === 1) {
              // Only submit on step 1 (password/signup form)
              if (isSignUp) {
                handleSignUp()
                  .then(() => handleClose())
                  .catch((error) => {
                    toaster.error({
                      title: "Ran into an issue signing up",
                      description: error.message,
                    });
                    console.error(error);
                  })
                  .finally(() => setLoading(false));
              } else {
                handleLogin()
                  .then(() => handleClose())
                  .catch((error) => {
                    toaster.error({
                      title: "Ran into an issue logging in",
                      description: error.message,
                    });
                    console.error(error);
                  })
                  .finally(() => setLoading(false));
              }
            }
          }}
        >
          <DialogHeader className="flex flex-col gap-1 text-xl">
            <DialogTitle>
              {isReset
                ? "Reset your Password"
                : isSignUp
                  ? "Join the Community"
                  : "Log In"}
            </DialogTitle>
          </DialogHeader>
          <DialogCloseTrigger />
          <DialogBody gap={3}>
            {isReset ? (
              /* Password Reset Flow - Single Step */
              <Stack gap={4}>
                <Stack align="center" mb={5}>
                  <Heading fontSize="4xl" textAlign="center">
                    Reset your Password
                  </Heading>
                  <Text
                    color={{ base: "gray.600", _dark: "gray.300" }}
                    className="border-l-gray-600 border-l-2 pl-3"
                  >
                    If you&apos;re having trouble logging into your account or
                    have just plain forgotten your password, please enter the
                    email you&apos;ve signed up with.
                  </Text>
                </Stack>
                <Field label="Email Address" required disabled={loading}>
                  <Input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    value={email}
                  />
                </Field>
              </Stack>
            ) : (
              /* Login/Signup Flow - 2 Steps */
              <StepsRoot
                step={step}
                count={2}
                colorPalette="green"
                variant="subtle"
              >
                {/* Steps indicator */}
                <StepsList mb={6}>
                  <StepsItem index={0} title="Email" />
                  <StepsItem
                    index={1}
                    title={isSignUp ? "Create Account" : "Password"}
                  />
                </StepsList>

                {/* Step 0: Email Entry */}
                <StepsContent index={0}>
                  <Stack gap={4}>
                    <Stack align="center" mb={3}>
                      <Text
                        color={{ base: "gray.600", _dark: "gray.300" }}
                        className="border-l-gray-600 border-l-2 pl-3"
                      >
                        {isSignUp
                          ? "Signing up will allow you to register for the conference and gain access to other features like conference session recordings. An MCBIOS account is not, however, a requirement for attending the conference."
                          : "Enter your email to access your MCBIOS account."}
                      </Text>
                      {isSignUp && (
                        <Alert
                          borderRadius="xl"
                          icon={<Info />}
                          title="Email Delivery Notice"
                        >
                          Some email providers may delay confirmation emails. If
                          you don&apos;t receive one shortly, check your spam
                          folder or{" "}
                          <Link
                            href="/events"
                            textDecoration="underline"
                            _hover={{ fontWeight: "bold" }}
                          >
                            register for the conference without an account.
                          </Link>
                        </Alert>
                      )}
                    </Stack>
                    <Field label="Email Address" required disabled={loading}>
                      <Input
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        value={email}
                      />
                    </Field>
                    <Stack pt={4}>
                      <Text textAlign="center">
                        {isSignUp
                          ? "Already a member? "
                          : "Haven't signed up yet? "}
                        <Link
                          color="blue.400"
                          onClick={() => {
                            if (!loading) {
                              setIsSignUp(!isSignUp);
                              setStep(0);
                              setEmailFoundInOtherOrg(false);
                            }
                          }}
                          cursor="pointer"
                        >
                          {isSignUp ? "Login" : "Sign Up"}
                        </Link>
                      </Text>
                      <Text textAlign="center">
                        Forgot your password?{" "}
                        <Link
                          color="blue.400"
                          onClick={() => !loading && setIsReset(true)}
                          cursor="pointer"
                        >
                          Password Reset
                        </Link>
                      </Text>
                    </Stack>
                  </Stack>
                </StepsContent>

                {/* Step 1: Password (Login) or Full Form (Signup) */}
                <StepsContent index={1}>
                  <Stack gap={4}>
                    {emailFoundInOtherOrg && (
                      <Alert
                        borderRadius="xl"
                        icon={<Info />}
                        title="Email found in another organization"
                        status="info"
                      >
                        {isSignUp
                          ? 'This email is registered with another Conference Suite organization. Creating an account here will link your accounts. None of your information will be lost. If you prefer a different email, click "Back" below.'
                          : 'This email is registered with another Conference Suite organization, you may login with the same email and password, linking that account to this organization. None of your information will be lost. If you would prefer to use a different email, click "Back" below.'}
                      </Alert>
                    )}
                    {isSignUp && (
                      <>
                        <Stack direction={["column", null, "row"]}>
                          <Field label="First Name" required disabled={loading}>
                            <Input
                              type="text"
                              inputMode="text"
                              autoComplete="given-name"
                              onChange={(e) => setFname(e.currentTarget.value)}
                              value={fname}
                            />
                          </Field>
                          <Field label="Last Name" required disabled={loading}>
                            <Input
                              type="text"
                              inputMode="text"
                              autoComplete="family-name"
                              onChange={(e) => setLname(e.currentTarget.value)}
                              value={lname}
                            />
                          </Field>
                        </Stack>
                        <Field
                          label="Institution / Organization"
                          required
                          disabled={loading}
                        >
                          <Input
                            type="text"
                            inputMode="text"
                            onChange={(e) =>
                              setInstitution(e.currentTarget.value)
                            }
                            value={institution}
                            required
                          />
                        </Field>
                      </>
                    )}
                    <Field
                      label="Password"
                      required
                      disabled={loading}
                      helperText={
                        isSignUp && emailFoundInOtherOrg
                          ? "Password must match the found account"
                          : undefined
                      }
                    >
                      <InputGroup
                        w="100%"
                        endElement={
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <Eye /> : <EyeOff />}
                          </Button>
                        }
                      >
                        <Input
                          type={showPassword ? "text" : "password"}
                          autoComplete="new-password"
                          onChange={(e) => setPassword(e.currentTarget.value)}
                          value={password}
                        />
                      </InputGroup>
                    </Field>
                  </Stack>
                </StepsContent>
              </StepsRoot>
            )}
          </DialogBody>

          <DialogFooter>
            <Button
              onClick={() => {
                if (isReset) {
                  setIsReset(false);
                } else if (step === 1 && !isReset) {
                  // Go back to step 0
                  setStep(0);
                  setEmailFoundInOtherOrg(false);
                } else {
                  handleClose();
                }
              }}
              disabled={loading}
              className="mr-3"
            >
              {!isReset && step === 1 ? "Back" : "Cancel"}
            </Button>
            {isReset ? (
              <Button type="submit" colorPalette="green" disabled={loading}>
                Submit
              </Button>
            ) : step === 0 ? (
              <Button
                onClick={checkEmail}
                colorPalette="green"
                disabled={loading || !email}
              >
                Next
              </Button>
            ) : isSignUp ? (
              <Button type="submit" colorPalette="green" disabled={loading}>
                Sign Up
              </Button>
            ) : (
              <Button type="submit" colorPalette="green" disabled={loading}>
                Login
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

const EmailCheckSchema = z.object({
  email: z.email({ error: "Invalid email" }),
  org_id: z.uuid(),
});

const SignUpSchema = z.object({
  fname: z
    .string()
    .min(2, {
      error: "Invalid given name, minimum of 2 characters",
    })
    .describe("User's given name // Please provide your given name"),
  lname: z
    .string()
    .min(3, { error: "Invalid given name, minimum of 2 characters" })
    .describe("User's family name // Please provide your family name"),
  institution: z
    .string()
    .min(3, {
      error: "Please provide your affiliated institution",
    })
    .describe("Affiliated institution"),
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
  password: z
    .string()
    .min(3, {
      error: "Password too short, minimum of 3 characters",
    })
    .describe("User's password"),
  org_id: z.uuid().describe("User's organization identifier"),
});

const SignInSchema = z.object({
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
  password: z
    .string()
    .min(3, {
      error: "Password too short, minimum of 3 characters",
    })
    .describe("User's password"),
  org_id: z.uuid().describe("User's organization identifier"),
});

const ResetSchema = z.object({
  email: z
    .email({
      error: "Invalid email",
    })
    .describe("User's email name"),
  org_id: z.uuid().describe("User's organization identifier"),
});
