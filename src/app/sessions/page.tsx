import { SessionProposals } from "@/components/SessionProposals";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[var(--maroon)] via-[var(--pink)] to-[var(--off-white)]">
      <SessionProposals deadlinePassed />
    </div>
  );
}
