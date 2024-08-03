const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <style jsx>{`
        .loading-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          background: white;
          z-index: 9998;
        }
        .spinner {
          border: 8px solid #ff6e00;
          border-top: 8px solid #ff6e00;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          z-index: 9999;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
