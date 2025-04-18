import {Box, Button, Container, HStack, Stack, Text} from "@chakra-ui/react";
import Navbar from "@/components/Navbar.jsx";
import Searchfield from "@/components/Searchfield.jsx";
import DownloadedStack from "@/components/DownloadedStack.jsx";



export const BASE_URL = import.meta.env.VITE_API_BASE + "/api"

function App() {

  return (
      <Stack minH={"100vh"} alignItems="center">
          <Navbar>
              <Container maxW={"1200px"} my={4} />
          </Navbar>
          <Searchfield />

          <Box padding="4" />

          <Container maxW={"900px"}>
              <Text
					fontSize={{ base: "2xl", md: "50" }}
					fontWeight={"bold"}
					letterSpacing={"2px"}
					textAlign={"left"}
					mb={8}
				> Last downloads: </Text>
          <DownloadedStack/>
          </Container>





      </Stack>



        )
}

export default App
