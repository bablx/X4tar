import Link from "next/link";
import Image from "next/image";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="X4TAR" width={32} height={32} className="rounded-md" />
            <span className="text-lg font-bold">
              X4<span className="text-accent">TAR</span>
            </span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted">
            Wager races, bonuses, and community rewards for the X4TAR crew on Stake.
          </p>
        </div>

        <div className="flex gap-10 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-foreground">Site</span>
            <Link href="/leaderboard" className="text-muted hover:text-accent">Leaderboard</Link>
            <Link href="/bonuses" className="text-muted hover:text-accent">Bonuses</Link>
            <Link href="/rules" className="text-muted hover:text-accent">Rules &amp; FAQ</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold text-foreground">Community</span>
            <Link href="/community" className="text-muted hover:text-accent">Discord</Link>
            <Link href="/community" className="text-muted hover:text-accent">Kick</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted sm:px-6">
        18+ Please gamble responsibly. X4TAR is an independent affiliate/community site and is not operated by Stake, Discord, or Kick.
        © {CURRENT_YEAR} X4TAR.
      </div>
    </footer>
  );
}
