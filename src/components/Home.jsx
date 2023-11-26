import Upload from "./Upload";

const Home = () => {
  return (
    <>
    <div className="main">
      <div className="nav">
        <div className="icon">
          <p>🌈</p>
          <p>SnapCV</p>
        </div>
        <a href="https:github.com/siddhantsingh1230/" className="ghub">
          <i className="ri-github-fill"></i>
        </a>
      </div>
      <div className="blr" id="blrone"></div>
      <div className="blr" id="blrtwo"></div>
      <div className="blr" id="blrthree"></div>
      <Upload />
    </div>
      <footer>
        created with
        &nbsp;<i className="ri-heart-3-fill"></i>&nbsp;
        by me
      </footer>
    </>
  );
};

export default Home;
