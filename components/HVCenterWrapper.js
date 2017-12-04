export default ({ children }) => (
  <div className="hello">
    <style jsx>{`
      .hello {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
    `}</style>
    {children}
  </div>
);
