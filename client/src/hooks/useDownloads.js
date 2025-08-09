import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {BASE_URL} from "@/App.jsx";
import {toaster} from "@/components/ui/toaster.jsx";

async function fetchDownloads() {
    const res = await fetch(`${BASE_URL}/get_downloads`);
    const data = await res.json();
    if(!res.ok) {
        throw new Error(data.error);
    }
    return data;
}

export function useDownloads() {
  return useQuery({
    queryKey: ["downloads"],
    queryFn: fetchDownloads,
    staleTime: 60_000,
  });
}

export function useDeleteDownload() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id) =>
      fetch(`${BASE_URL}/downloads/${id}`, { method: "DELETE" }).then((res) => {
        if (!res.ok) throw new Error("Delete failed");
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["downloads"] });
    },
  });
}

export function useDownloadMutation() {
  const qc = useQueryClient();

  return useMutation({

    mutationFn: async ({ url, format }) => {
      const res = await fetch(`${BASE_URL}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, format }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Download failed");
      }


      const contentDisposition = res.headers.get("Content-Disposition") || "";
      const blob = await res.blob();


      let filename = `your_file.${format}`;
      const m = contentDisposition.match(/filename="(.+)"/);
      if (m) filename = m[1];

      return { blob, filename };
    },

    onMutate: () => {
      const toastId = toaster.loading({
        title: "Downloading…",
        description: "Please wait",
      })
      return { toastId }
    },

    onError: (err, _vars, context) => {
      if (context?.toastId) toaster.dismiss(context.toastId)
      toaster.error({ title: "Download failed", description: err.message })
    },

    onSuccess: ({ blob, filename }, _vars, context) => {

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      if (context?.toastId) toaster.dismiss(context.toastId)
      toaster.success({ title: "Download complete!"});


      qc.invalidateQueries(["downloads"]);
    },
  });
}
