import Image from "next/image";

export default function Header() {
  return (
    <nav>
      <Image
        src={"/logo.svg"}
        width={40}
        height={40}
        alt="dish dash logo"
        className="mt-5"
      />
    </nav>
  );
}
