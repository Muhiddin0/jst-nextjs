import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Navigatsiya ikonkalari uchun
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationProps {
  current_page: number;
  total_pages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  current_page,
  total_pages,
  onPageChange,
  className,
}) => {
  const paginate = ({ current, max }: { current: number; max: number }) => {
    if (!current || !max) return null;

    let prev = current === 1 ? null : current - 1,
      next = current === max ? null : current + 1,
      items: (number | "…")[] = [1];

    if (current === 1 && max === 1) return { current, prev, next, items };
    if (current > 4) items.push("…");

    let r = 2,
      r1 = current - r,
      r2 = current + r;

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

    if (r2 + 1 < max) items.push("…");
    if (r2 < max) items.push(max);

    return { current, prev, next, items };
  };

  const isPreviousDisabled = current_page === 1;
  const isNextDisabled = current_page === total_pages;

  const handlePrevious = () => {
    if (!isPreviousDisabled) {
      onPageChange(current_page - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(current_page + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const paginationData = paginate({ current: current_page, max: total_pages });

  const renderPageNumbers = () => {
    return paginationData?.items.map((page, index) => {
      if (page === "…") {
        return (
          <span key={index} className="mx-1 text-gray-500">
            …
          </span>
        );
      }

      return (
        <Button
          key={index}
          size={"sm"}
          onClick={() => handlePageClick(page as number)}
          variant={page === current_page ? "default" : "outline"}
          className={`mx-1`}
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div
      className={cn(
        "mb-8 mt-4 flex flex-wrap items-center justify-center gap-2",
        className,
      )}
    >
      <Button
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        variant="outline"
        size={"sm"}
      >
        <ChevronLeft className="mr-2" />
        Oldingi
      </Button>

      {/* Sahifa raqamlarini render qilish */}
      <div className="flex space-x-1">{renderPageNumbers()}</div>

      <Button
        size={"sm"}
        onClick={handleNext}
        disabled={isNextDisabled}
        variant="outline"
      >
        Keyingi
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  );
};

export default Pagination;
