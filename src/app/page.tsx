import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <nav>
        <div className="flex justify-center items-center p-4 gap-6">
          <Link href="/feed">Feed</Link>
          <Link href="/createPost">Create Post</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">signup</Link>
          <Link href="/profile">Profile</Link>
        </div>
      </nav>
    </div>
  );
}
