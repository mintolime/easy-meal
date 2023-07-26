import "./Loader.css";

function Loader() {
  return (
    <div className="pan-loader page__flexbox-column">
      <div className="loader"></div>
      <div className="pan-container">
        <div className="pan"></div>
        <div className="handle"></div>
      </div>
      <div className="shadow"></div>
    </div>
  );
}

export default Loader;
