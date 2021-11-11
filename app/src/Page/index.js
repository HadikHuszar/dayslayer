import Nav from "../Nav";

const Page = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
      <footer>
        <span id="biline">Lead the Day. Slay the Lead.&trade;</span>
      </footer>
    </>
  );
};

export default Page;
