import { useColorMode, useColorModeValue } from "@/components/ui/color-mode.jsx";
import { Box, Button, Container, Flex, Text } from "@chakra-ui/react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"900px"}>
            <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
                <Flex
                    h={"16"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    >
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        gap={3}
                        display={{base: "none", sd: "flex"}}
                        >
                        <Text fontSize={"lg"}>Video Downloader</Text>

                    </Flex>

                    <Flex gap={3} alignItems={"center"}>
                        <Button onClick={toggleColorMode}>
                            {colorMode === "light" ? <IoMoon/> : <LuSun size={20}/>}
                        </Button>
                    </Flex>

                </Flex>
            </Box>
        </Container>
    );
}

export default Navbar;