import {Button, Container, HStack, Stack} from "@chakra-ui/react";
import Navbar from "@/components/Navbar.jsx";
import Searchfield from "@/components/Searchfield.jsx";



export const BASE_URL = "http://192.168.178.116:5000/api"

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
