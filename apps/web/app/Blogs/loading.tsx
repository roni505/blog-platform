const Loading = () => {
  return (
    <div className="flex justify-center h-screen bg-black mt-8">
      <div className="loader relative flex space-x-2">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <style>
          {`
            .dot {
              width: 8px;
              height: 8px;
              background-color: #007bff; /* Standard Blue */
              border-radius: 50%;
              animation: bounce 1.4s infinite ease-in-out both;
            }

            .dot:nth-child(1) {
              animation-delay: -0.32s;
            }

            .dot:nth-child(2) {
              animation-delay: -0.16s;
            }

            .dot:nth-child(3) {
              animation-delay: 0s;
            }

            @keyframes bounce {
              0%, 80%, 100% { transform: scale(0.5); opacity: 0.3; }
              40% { transform: scale(1.2); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Loading;


  
  