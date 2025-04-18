import React from 'react';
import {Stack} from "@chakra-ui/react";
import DownloadCard from "@/components/DownloadCard.jsx";
import {DOWNLOADS} from "@/components/dummy/dummy.js"

const DownloadedStack = () => {
    return <Stack templateRows={{
        base: "1fr"
    }}>
        {DOWNLOADS.map((download) => (
            <DownloadCard key={download.id} download={download} />
        ))}
    </Stack>
};

export default DownloadedStack;