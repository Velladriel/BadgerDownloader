import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from "@chakra-ui/react"
import {useState} from "react";
import {BASE_URL} from "@/App.jsx";
import {Toaster} from "@/components/ui/toaster";
import {useDownloadMutation} from "@/hooks/useDownloads.js";

const Searchfield = () => {

  //const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    "url": "",
    "format": "mp4"
  });

  const { mutate: startDownload, isLoading: isLoading } = useDownloadMutation();


  const handleDownload = (e) => {
    e.preventDefault();
    startDownload(inputs, {
      onSuccess: () => {
        setInputs({ url: "", format: "mp4" });
      },
    });
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  return (

      <form onSubmit={handleDownload}>c
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Download Video</Fieldset.Legend>
        <Fieldset.HelperText>
          Enter Youtube Search/URL, X/Tiktok Video or Instagram Reel URL below:
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>URL</Field.Label>
          <Input name="url" value={inputs.url} onChange={handleInputChange}/>
        </Field.Root>

        <Field.Root>
          <Field.Label>Format</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="format" value={inputs.format} onChange={handleInputChange
            }>
              <For each={['mp4', 'mp3', 'opus', 'vorbis', 'wav', 'm4a', 'flv', 'webm', 'ogg', 'mkv']}>
                {(item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </Fieldset.Content>


      <Button type="submit" alignSelf="flex-start" loading={isLoading}>
        Download!
      </Button>
      <Toaster/>
    </Fieldset.Root>
        </form>
  )
}

export default Searchfield