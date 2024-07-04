import { Inter, Montserrat, Ubuntu } from "next/font/google";
import Image from "next/image";

const inter = Inter({ weight: ["800"], subsets: ["vietnamese"] });
const ubuntu = Ubuntu({weight:["500"], subsets:["latin"]})
const mont = Montserrat({weight:["400"], subsets:["vietnamese"]})

const reasons = [
  {
    image: "/w2.png",
    content:
      "Discover how our application helps you achieve greater profitability by providing tools to track income and expenses accurately. Minimize your losses with precise financial management",
    title: " Maximize Profits, Minimize Losses",
  },
  {
    image: "/w1.png",
    content: "Prioritize your financial well-being with our comprehensive management tools. Ensure your business remains financially healthy and resilient against market fluctuations",
    title: "Your Financial Health",
  },
  {
    image: "/s2.png",
    content: "Transform your business operations with precise financial insights. Our application provides accurate data analysis to help you fine-tune your business strategies",
    title: "Precision Financial Insights",
  },
];

function ChooseUs({
  image,
  content,
  title,
}: {
  image: string;
  content: string;
  title: string;
}) {
  return (
    <>
      <div className="flex flex-col px-8 lg:px-16 text-center items-center justify-center">
        <div className="p-6 border-[#071952] rounded-full border-[0.5rem]">
          <Image src={image} alt="img" height={80} width={80} />
        </div>
        <h3 className={`text-xl ${ubuntu.className}`}>{title}</h3>
        <p className={mont.className}>{content}</p>
      </div>
    </>
  );
}

export default function Why() {
  return (
    <>
      <div className="flex flex-col gap-3 items-center justify-center pt-10">
        <h2 className={`text-2xl ${inter.className}`}>
          Why Choose <span className="text-[#088395]">Us</span>
        </h2>
        <div className="flex flex-col gap-4">
          {reasons.map((r,i)=>{
            return (
                <ChooseUs image={r.image} content={r.content} title={r.title} key={i} />
            )
          })}
        </div>
      </div>
    </>
  );
}
