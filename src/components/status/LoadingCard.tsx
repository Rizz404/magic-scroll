import { useEffect, useState } from "react";

interface LoadingCardProps {
  isLoading: boolean;
  context?: string;
}

const LoadingCard = ({ isLoading, context = "Just loading" }: LoadingCardProps) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots((prev) => prev + ".");
      }, 500);
      return () => clearInterval(interval);
    } else {
      setDots("");
    }
  }, [isLoading]);

  return (
    <div className="flex justify-center items-center">
      {isLoading ? (
        <div className="border-4 border-dashed border-black w-96 h-40 p-8 rounded-lg">
          <div className=" text-yellow-950 font-bold text-2xl text-center animate-bounce">
            Loading
          </div>
          <div className=" text-red-500">{context}</div>
          <div className=" text-3xl text-red-500 animate-pulse">{dots}</div>
        </div>
      ) : null}
    </div>
  );
};
export default LoadingCard;
