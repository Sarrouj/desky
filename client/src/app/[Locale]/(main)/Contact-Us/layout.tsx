import Footer from "@/Components/layout/footer";

export default function offers({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <div className="bg-neutralBg pt-10">
        <Footer />
      </div>
    </>
  );
}
