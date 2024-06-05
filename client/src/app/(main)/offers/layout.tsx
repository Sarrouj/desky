import Footer from "@/Components/layout/footer"
import Header from "@/Components/layout/Header"  


export default function offers({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
    <>
        <div className="bg-white border-b-2 ">
            <Header/>
        </div>
        {children}
        <div className="bg-neutralBg pt-10">
        <Footer/>
        </div>
    </>
    )
}