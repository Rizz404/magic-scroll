import NoteCard from "@/components/note/NoteCard";
import ErrorCard from "@/components/status/ErrorCard";
import LoadingCard from "@/components/status/LoadingCard";
import { useGetPaginatedNotes } from "@/services/note";
import { useGetPaginatedUsersQuery } from "@/services/user";
import { categories } from "@/types/Note";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 20;
  const [category, setCategory] = useState<categories>("home");

  const {
    users,
    isLoading,
    isError,
    error,
  } = useGetPaginatedUsersQuery({
    page,
    limit,
  });

  const categoryButtons: Record<string, categories>[] = [
    { label: "home", value: "home" },
    { label: "shared", value: "shared" },
    { label: "private", value: "private" },
    { label: "favorited", value: "favorited" },
    { label: "saved", value: "saved" },
    { label: "self", value: "self" },
  ];

  const renderCategoryButtons = () => {
    return categoryButtons.map((btn) => (
      <button
        key={btn.value}
        type="button"
        className={`btn btn-sm btn-outline even:btn-primary odd:btn-secondary ${category === btn.value && "btn-active"
          }`}
        onClick={() => setCategory(btn.value)}>
        {btn.label}
      </button>
    ));
  };

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
        <div className="border border-black w-full rounded-md p-2 mb-3">
          <div className=" flex justify-between items-center">{renderCategoryButtons()}</div>
        </div>
        <div className="absolute z-10 flex justify-center items-center">
          {isLoading && <LoadingCard isLoading={isLoading} context="Loading notes data" />}
          {isError && <ErrorCard isError={isError} context="Error notes data" error={error!} />}
        </div>
        {/* <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 min-h-screen relative mb-3">
          {notes?.data.map((note, index) => (
            <NoteCard {...note} key={index} />
          ))}
        </div> */}
        <div>
          {users.length > 0 && (
            JSON.stringify(users, null, 2)
          )}
        </div>
        <div className="flex justify-center items-center">
          {/* <button
            onClick={handlePrevPage}
            disabled={!notes?.paginationState?.hasPrevPage}
            className={` bg-cyan-600 text-cyan-950 text-lg p-1 font-semibold rounded-l-full hover:text-white ${!notes?.paginationState?.hasPrevPage && "text-cyan-950 hover:text-red-500"
              }`}>
            prev
          </button> */}
          <select
            value={limit}
            onChange={handleLimitChange}
            className=" px-2 py-1 bg-inherit text-lg focus:outline-none focus:ring-0 border border-black border-dashed">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          {/* <button
            onClick={handleNextPage}
            disabled={!notes?.paginationState?.hasNextPage}
            className={` bg-cyan-600 text-cyan-950 text-lg p-1 font-semibold rounded-r-full hover:text-white ${!notes?.paginationState?.hasNextPage && "text-cyan-950 hover:text-red-500"
              }`}>
            next
          </button> */}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
