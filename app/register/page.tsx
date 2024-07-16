import Register, { RegisterMobile } from "@/components/register";

export default function Page(){
    return (
        <>
          <div className="lg:block hidden ">
            <Register  />
          </div>
          <div className="lg:hidden block">
            <RegisterMobile  />
          </div>
        </>
    )
}