
    const API_URL = "http://localhost:8081/api/1.0/ckeditor-gallery-upload";
    function uploadAdapter(loader) {
      return {
        upload: () => {
          return new Promise((resolve, reject) => {
            const body = new FormData();
            body.append("files", file);
            
            loader.file.then((file) => {
              fetch(`${API_URL}`, {
                method: "post",
                body: body
                // mode: "no-cors"
              })
                .then((res) => res.json())
                .then((res) => {
                  resolve({
                    default: res.data.url
                  });
                })
                .catch((err) => {
                  reject(err);
                });
            });
          });
        }
      };
    }
    function uploadPlugin(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return uploadAdapter(loader);
      };
    }

    export default{
        uploadPlugin
    }