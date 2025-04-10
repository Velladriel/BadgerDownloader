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
import {Toaster, toaster} from "@/components/ui/toaster";

const Searchfield = () => {

  //const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    "url": "",
    "format": "mp4"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleURLSubmit = async (e) => {
    e.preventDefault();

    const downloadPromise = fetch(BASE_URL + "/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });

    // Use the promise toaster to show toast notifications based on promise state
    toaster.promise(downloadPromise, {
      loading: { title: "Downloading...", description: "Please wait" },
      success: { title: "Download complete!", description: "Your file is ready" },
      error: (error) => ({title: "Download failed", description: error || "Something went wrong"})


    });

    try {
      const res = await downloadPromise;
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error);
      }
      const blob = await res.blob();
      const contentDisposition = res.headers.get("Content-Disposition");
      let filename = "your_file." + inputs.format;
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match) filename = match[1];
      }
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setInputs({ url: "", format: "mp4" });
    }
  };

  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>Download Video</Fieldset.Legend>
        <Fieldset.HelperText>
          Enter Youtube Search/URL or Instagram Reel URL below:
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
            <NativeSelect.Field name="format" value={inputs.format} onChange={handleInputChange}>
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



      <Button type="submit" alignSelf="flex-start" onClick={handleURLSubmit}>
        Download!
      </Button>
      <Toaster/>
    </Fieldset.Root>
  )
}

export default Searchfield