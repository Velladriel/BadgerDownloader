import React, { useState } from "react";
import {
  Box,
  Flex,
  Stack,
  Pagination,
  ButtonGroup,
  IconButton
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import DownloadCard from "@/components/DownloadCard.jsx";
import {useDownloads} from "@/hooks/useDownloads.js";

const PAGE_SIZE = 3;

const DownloadedStack = () => {
  const [page, setPage] = useState(1);

  const {data: downloads = [], isLoading, error} = useDownloads();

  downloads.sort((a, b) => b.datetime - a.datetime);


  const total = downloads.length
  const offset = (page - 1) * PAGE_SIZE;
  const visible = downloads.slice(offset, offset + PAGE_SIZE);



  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Box fontWeight="bold" fontSize="2xl">
          Recent downloads
        </Box>

        <Pagination.Root
          count={total}
          pageSize={PAGE_SIZE}
          page={page}
          onPageChange={(e) => setPage(e.page)}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton aria-label="Previous page">
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={({ value, isSelected, onClick }) => (
                <IconButton
                  key={value}
                  aria-label={`Go to page ${value}`}
                  onClick={onClick}
                  variant={isSelected ? "solid" : "ghost"}
                >
                  {value}
                </IconButton>
              )}
            />

            <Pagination.NextTrigger asChild>
              <IconButton aria-label="Next page">
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Flex>

      <Stack spacing={6}>
        {visible.map((d) => (
          <DownloadCard key={d.id} download={d}/>
        ))}
      </Stack>
    </Box>
  );
};

export default DownloadedStack;