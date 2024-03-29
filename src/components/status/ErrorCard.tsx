import { CustomAxiosError, ServerErrorResponse } from "@/types/Response";

interface ErrorCardProps {
  isError: boolean;
  error?: CustomAxiosError<ServerErrorResponse>;
  context?: string;
}

const ErrorCard = ({ isError, error, context = "Just an ordinary error" }: ErrorCardProps) => {
  return (
    <div className="flex justify-center items-center">
      {isError ? (
        <div className="border-4 border-dashed border-black w-96 h-40 p-8 rounded-lg box-border">
          <div className=" text-red-950 font-bold text-2xl text-center animate-bounce">Error</div>
          <div className="text-red-500">{context}</div>
          <div className=" text-sm text-red-500 animate-pulse">
            Message: {error?.response?.data.message}
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ErrorCard;
