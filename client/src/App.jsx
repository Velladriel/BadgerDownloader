import {Button, Container, HStack, Stack} from "@chakra-ui/react";
import Navbar from "@/components/Navbar.jsx";
import Searchfield from "@/components/Searchfield.jsx";



export const BASE_URL = import.meta.env.VITE_API_BASE + "/api"

function App() {

  return (
      <Stack minH={"100vh"} alignItems="center">
          <Navbar>
              <Container maxW={"1200px"} my={4}>
              </Container>
          </Navbar>
          <Searchfield>
          </Searchfield>



      </Stack>



        )
}

export default App
