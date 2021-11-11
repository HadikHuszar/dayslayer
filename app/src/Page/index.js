import Nav from "../Nav";

const Page = ({ children }) => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>{children}</main>
      <footer>
        <span id="biline">
          Copyright &copy; EHB, 2021. All Rights Reserved WorldWide.
        </span>
      </footer>
    </>
  );
};

export default Page;
