import React, { useState, useEffect } from "react";
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
import {BASE_URL} from "@/App.jsx";

const PAGE_SIZE = 3;

const DownloadedStack = () => {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [downloads, setDownloads] = useState([])

  useEffect(() => {
  const getDownloads = async () => {
    try {
      const res = await fetch(BASE_URL + "/get_downloads");


      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      const sortedData = data.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
      setDownloads(sortedData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };


  getDownloads()

  }, [setDownloads]);

  useEffect(() => {
    const offset = (page - 1) * PAGE_SIZE;
    setVisible(downloads.slice(offset, offset + PAGE_SIZE));
  }, [page, downloads]);

  const total = downloads.length;

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
          <DownloadCard key={d.id} download={d} setDownloads={setDownloads}/>
        ))}
      </Stack>
    </Box>
  );
};

export default DownloadedStack;