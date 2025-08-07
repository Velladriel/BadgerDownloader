import {Box, Button, Container, HStack, Stack, Text} from "@chakra-ui/react";
import Navbar from "@/components/Navbar.jsx";
import Searchfield from "@/components/Searchfield.jsx";
import DownloadedStack from "@/components/DownloadedStack.jsx";

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

export const BASE_URL = import.meta.env.VITE_API_BASE + "/api"

const queryClient = new QueryClient();

function App() {



  return (

      <QueryClientProvider client={queryClient}>
          <Stack minH={"100vh"} alignItems="center">
              <Navbar>
                  <Container maxW={"1200px"} my={4} />
              </Navbar>
              <Searchfield />

              <Box padding="4" />

              <Container maxW={"900px"}>

              <DownloadedStack/>
              </Container>
          </Stack>
      </QueryClientProvider>

        )
}

export default App
