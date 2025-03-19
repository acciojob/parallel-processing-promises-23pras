const output = document.getElementById("output");
const loading = document.createElement("div");
const error = document.createElement("div");

// ✅ Create loading and error elements
loading.id = "loading";
loading.textContent = "Loading...";
error.id = "error";

// ✅ Function to download a single image
const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
};

// ✅ Function to download all images concurrently
const downloadImages = () => {
  output.innerHTML = ""; // Clear previous content
  error.innerHTML = ""; // Clear previous errors

  // ✅ Show loading spinner
  output.appendChild(loading);

  const images = [
    { url: "https://picsum.photos/id/237/200/300" },
    { url: "https://picsum.photos/id/238/200/300" },
    { url: "https://picsum.photos/id/239/200/300" },
  ];

  // ✅ Create promises for all images
  const promises = images.map((image) => downloadImage(image.url));

  Promise.all(promises)
    .then((results) => {
      // ✅ Remove loading spinner
      loading.remove();

      // ✅ Display all images on success
      results.forEach((img) => {
        output.appendChild(img);
      });
    })
    .catch((err) => {
      // ❌ Remove loading spinner and display error
      loading.remove();
      error.textContent = err;
      output.appendChild(error);
    });
};

// ✅ Button to trigger downloads
const btn = document.createElement("button");
btn.id = "download-images-button";
btn.textContent = "Download Images";
btn.onclick = downloadImages;

document.body.appendChild(btn);
