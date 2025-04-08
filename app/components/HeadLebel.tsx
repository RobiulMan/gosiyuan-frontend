import Link from "next/link";

const HeadLabel = () => {
  return (
    <div className="w-full dark:bg-emerald-900  font-bold text-center p-2 ">
      <p>
        Call for our wholesale price list{" "}
        <Link href="tel:+8615360539718" className="text-blue-300">
        +86 15360 539-718
        </Link>
      </p>
    </div>
  );
};

export default HeadLabel;
