import React from 'react';
import {
    Button,
    Card,
    Dialog,
    DataList,
    Flex,
    For,
    Grid,
    Image,
    NativeSelect,
    Portal,
    Stack,
    CloseButton
} from "@chakra-ui/react";


function formatBytes(bytes, decimals=2) {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const secondsAgo = Math.floor((now-past)/1000)

    const units = [
        { name: "year", seconds: 31536000 },
        { name: "month", seconds: 2592000 },
        { name: "day", seconds: 86400 },
        { name: "hour", seconds: 3600 },
        { name: "minute", seconds: 60 },
        { name: "second", seconds: 1 },
    ];

  for (const unit of units) {
    const value = Math.floor(secondsAgo / unit.seconds);
    if (value > 0) {
      return `${value} ${unit.name}${value !== 1 ? "s" : ""} ago`;
    }
  }

  return "Just now";
}

const DownloadCard = ({download}) => (
    <Card.Root size="md">
        <Card.Header>
            {download.title}
        </Card.Header>
        <Card.Body>

            <Grid templateColumns="repeat(4, 1fr)" gap="6">
                <Flex gap={4}>
                    <Flex flex={"1"} gap={"4"} alignItems={"center"}>
                        <Image src={download.thumbnail_url}
                        aspectRatio={4 / 3} width="300px" height="150px"
                        fallbackSrc='https://via.placeholder.com/150'
                        />

                    </Flex>
                </Flex>

                <DataList.Root>
                    <DataList.Item>
                        <DataList.ItemLabel>Title</DataList.ItemLabel>
                        <DataList.ItemValue>{download.title}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Duration</DataList.ItemLabel>
                        <DataList.ItemValue>{download.duration}s</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Format</DataList.ItemLabel>
                        <DataList.ItemValue>{download.format}</DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>

                <DataList.Root>
                    <DataList.Item>
                        <DataList.ItemLabel>Size</DataList.ItemLabel>
                        <DataList.ItemValue>{formatBytes(download.size)}</DataList.ItemValue>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.ItemLabel>Download time</DataList.ItemLabel>
                        <DataList.ItemValue>{timeAgo(download.datetime)}</DataList.ItemValue>
                    </DataList.Item>
                </DataList.Root>

                <Flex direction="column" gap={4} justifySelf="end"  >
                    <NativeSelect.Root>
                        <NativeSelect.Field name="format"  value={download.format}>
                          <For each={['mp4', 'mp3', 'opus', 'vorbis', 'wav', 'm4a', 'flv', 'webm', 'ogg', 'mkv']}>
                            {(item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            )}
                          </For>
                        </NativeSelect.Field>
                        </NativeSelect.Root>

                    <Button>Download</Button>

                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                             <Button
                                 bg="red.500"
                                 _hover={{ bg: "red.600" }}
                                 color="white"
                             >Delete</Button>
                      </Dialog.Trigger>
                      <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                          <Dialog.Content>
                            <Dialog.Header>
                              <Dialog.Title>Confirmation</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                              <p>
                                Are you sure that the download entry should be deleted? It can't be restored.
                              </p>
                            </Dialog.Body>
                            <Dialog.Footer>
                              <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                              </Dialog.ActionTrigger>
                              <Button
                                 bg="red.500"
                                 _hover={{ bg: "red.600" }}
                                 color="white"
                              >Delete</Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                              <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                          </Dialog.Content>
                        </Dialog.Positioner>
                      </Portal>
                    </Dialog.Root>


                </Flex>
            </Grid>
        </Card.Body>
    </Card.Root>
);

export default DownloadCard;