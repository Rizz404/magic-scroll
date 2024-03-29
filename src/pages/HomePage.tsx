import ErrorCard from "@/components/status/ErrorCard";
import LoadingCard from "@/components/status/LoadingCard";
import UserCard from "@/components/user/UserCard";
import { useGetPaginatedUsersQuery } from "@/services/user";
import React from "react";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;

  const { users, isLoading, isError, error, paginationState } = useGetPaginatedUsersQuery({
    page,
    limit,
  });

  const handlePrevPage = () => {
    setSearchParams({ page: `${page - 1}`, limit: `${limit}` });
  };

  const handleNextPage = () => {
    setSearchParams({ page: `${page + 1}`, limit: `${limit}` });
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams({ page: "1", limit: e.target.value });
  };

  return (
    <div className="text-cyan-950 bg-cyan-100 py-2">
      <div className="px-2 lg:px-8">
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 min-h-screen relative mb-3">
          <div className="absolute inset-0 z-10 flex justify-center items-center">
            {isLoading && <LoadingCard isLoading={isLoading} context="Loading user data" />}
            {isError && <ErrorCard isError={isError} context="Error user data" error={error!} />}
          </div>
          {users.map((user, index) => (
            <UserCard {...user} key={index} />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handlePrevPage}
            disabled={!paginationState?.hasPrevPage}
            className={` bg-cyan-600 text-cyan-950 text-lg p-1 font-semibold rounded-l-full hover:text-white ${
              !paginationState?.hasPrevPage && "text-cyan-950 hover:text-red-500"
            }`}>
            prev
          </button>
          <select
            value={limit}
            onChange={handleLimitChange}
            className=" px-2 py-1 bg-inherit text-lg focus:outline-none focus:ring-0 border border-black border-dashed">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button
            onClick={handleNextPage}
            disabled={!paginationState?.hasNextPage}
            className={` bg-cyan-600 text-cyan-950 text-lg p-1 font-semibold rounded-r-full hover:text-white ${
              !paginationState?.hasNextPage && "text-cyan-950 hover:text-red-500"
            }`}>
            next
          </button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
