import { Montserrat } from "next/font/google"
import Image from "next/image"

const mont = Montserrat({weight:["600"], subsets:["vietnamese"]})
export default function Services(){
    return (
        <>
          <div className="flex lg:p-10 md:p-8 p-2 items-center justify-evenly flex-col">
            <div className="flex flex-col gap-2 items-center justify-center">
              <h2 className={`text-3xl ${mont.className}`}>Our <span className="text-[#37B7C3]">Services</span></h2>
              <p className={mont.className}>Some of our various services includes:</p>
            </div>
            <div className="flex flex-col gap-4 items-center justify-evenly lg:flex-row md:flex-row">
               <div className="bg-[#EBF4F6] flex flex-col gap-2 items-center justify-center p-2">
                    <Image src={'/w1.png'} alt="img of services" width={150} height={150} className="" />
                    <h3>Expense Tracking</h3>
               </div>
               <div className="bg-[#EBF4F6] flex flex-col gap-2 items-center justify-center p-2">
                <Image src={'/s3.png'} alt="img of services" width={150} height={150} className="" />
                <h3>Manage up to 5 Business Customer's Invoices</h3>
               </div>
               <div className="bg-[#EBF4F6] flex flex-col gap-2 items-center justify-center p-2">
                <Image src={'/w3.png'} alt="img of services" width={150} height={150} className="" />
                <h3>Lorem Ipsum dolor</h3>
               </div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        </>
    )
}