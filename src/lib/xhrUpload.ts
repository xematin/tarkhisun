// Small XHR-based upload helper that reports upload progress (0-100).
// Used by dialogs that upload files so users can see per-request progress.
export interface XhrUploadResult {
  ok: boolean;
  status: number;
  data: unknown;
}

export function xhrUpload(
  url: string,
  formData: FormData,
  onProgress?: (pct: number) => void
): Promise<XhrUploadResult> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.withCredentials = true;

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const pct = Math.round((e.loaded / e.total) * 100);
        onProgress(Math.min(99, pct)); // cap at 99 until server responds
      }
    };

    xhr.onload = () => {
      let data: unknown = {};
      try { data = JSON.parse(xhr.responseText || "{}"); } catch { /* ignore */ }
      if (onProgress) onProgress(100);
      resolve({ ok: xhr.status >= 200 && xhr.status < 300, status: xhr.status, data });
    };
    xhr.onerror = () => reject(new Error("network_error"));
    xhr.onabort = () => reject(new Error("aborted"));

    xhr.send(formData);
  });
}
