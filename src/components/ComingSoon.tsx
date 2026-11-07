import { Clock } from "lucide-react";
import Link from "next/link";

export function ComingSoon({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero min-h-[60vh]">
      <div className="hero-content text-center">
        <div className="max-w-lg space-y-4">
          <Clock className="size-12 text-primary mx-auto" />
          <span className="badge badge-outline">Coming soon</span>
          <h1 className="text-4xl">{title}</h1>
          <p>
            {children ?? "Details will be announced as planning progresses."}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/" className="btn">
              Back to home
            </Link>
            <Link href="/sessions" className="btn btn-outline">
              Session proposals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
