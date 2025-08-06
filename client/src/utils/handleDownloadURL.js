import {BASE_URL} from "@/App.jsx";
import {toaster} from "@/components/ui/toaster.jsx";


export const handleURLSubmit = (inputs, setInputs) =>

    async (e) => {
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