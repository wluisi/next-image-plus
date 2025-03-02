import * as React from "react";
import { ArrowRightIcon } from "./../Icons/ArrowRightIcon";
import { ArrowLeftIcon } from "./../Icons/ArrowLeftIcon";

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  currentPage: number;
  totalItems: number;
  pageCount: number;
  onChange?: (pageIndex: number) => void;
}

export function Pagination({
  currentPage,
  totalItems,
  pageCount,
  onChange,
}: PaginationProps) {
  const prevPageNumber = currentPage ? currentPage - 1 : 1;
  const nextPageNumber = currentPage ? currentPage + 1 : 2;

  const buttonClasses = "flex items-center justify-between";

  const prevClasses =
    currentPage <= 1
      ? // disabled
        `${buttonClasses} text-gray-400`
      : // enabled
        `${buttonClasses} text-black underline-offset-4 hover:underline`;

  const nextClasses =
    pageCount <= currentPage
      ? // disabled
        `${buttonClasses} text-gray-400`
      : // enabled
        `${buttonClasses} text-black underline-offset-4 hover:underline`;

  return (
    <nav aria-label="pagination" className="graphinery-ui__pagination">
      <ul className="list-none pl-0 flex justify-between">
        <li>
          <button
            type="button"
            className={prevClasses}
            onClick={() => {
              // @ts-expect-error - fix me later
              onChange(prevPageNumber);
            }}
            disabled={currentPage <= 1}
          >
            <span role="presentation">
              <ArrowLeftIcon className="h-5 w-5 pr-1" />
            </span>
            Prev Page
          </button>
        </li>
        <li>
          Page {currentPage} of {pageCount} ({totalItems} results)
        </li>
        <li>
          <button
            type="button"
            className={nextClasses}
            onClick={() => {
              // @ts-expect-error - fix me later
              onChange(nextPageNumber);
            }}
            disabled={pageCount <= currentPage}
          >
            Next Page
            <span role="presentation">
              <ArrowRightIcon className="h-5 w-5 pl-1" />
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
