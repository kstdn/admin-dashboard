import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'react-feather';
import styled from 'styled-components/macro';
import ButtonGroup from '../ButtonGroup';
import { IconButton } from '../IconButton';

const PaginatorButtonGroup = styled(ButtonGroup)`
  overflow: auto;
  user-select: none;
`;

const NavButton = styled(IconButton)`
  flex-grow: 0;
`;

const PageButton = styled(IconButton)`
  flex-shrink: 1;
`;

type Props = {
  currentPage: number;
  totalPages: number;
  maxDisplayedPages?: number;

  onGoToPage: (page: number) => void;
};

const getOffset = (currentPage: number, totalPages: number, displayedPagesCount: number) => {
  const half = Math.floor(displayedPagesCount / 2);
  return Math.min(Math.max(currentPage - half, 1), totalPages - displayedPagesCount + 1);
}

const Paginator = ({
  currentPage,
  totalPages,
  maxDisplayedPages = totalPages,
  onGoToPage,
}: Props) => {
  const displayedPagesCount = Math.min(totalPages, maxDisplayedPages);
  const pages = [...Array(displayedPagesCount).keys()].map(i => i + getOffset(currentPage, totalPages, displayedPagesCount));

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  return (
    <PaginatorButtonGroup>
      <NavButton disabled={!hasPrev} onClick={() => onGoToPage(1)}>
        <ChevronsLeft />
      </NavButton>
      <NavButton disabled={!hasPrev} onClick={() => onGoToPage(currentPage - 1)}>
        <ChevronLeft />
      </NavButton>
      {pages.map(p => (
        <PageButton
          forceActive={currentPage === p}
          onClick={() => onGoToPage(p)}
          key={p}
        >
          {p}
        </PageButton>
      ))}
      <NavButton disabled={!hasNext} onClick={() => onGoToPage(currentPage + 1)}>
        <ChevronRight />
      </NavButton>
      <NavButton disabled={!hasNext} onClick={() => onGoToPage(totalPages)}>
        <ChevronsRight />
      </NavButton>
    </PaginatorButtonGroup>
  );
};

export default Paginator;
