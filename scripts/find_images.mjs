async function findImages() {
  const urls = [
    "http://www.elena-nuzman.com",
    "http://www.elena-nuzman.com/fotos.html",
    "http://www.elena-nuzman.com/photos.html",
    "https://elena-nuzman.com"
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      const html = await res.text();
      console.log(u, "Status:", res.status, "Length:", html.length);
      const regex = /(https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)|[a-zA-Z0-9_\-\.\/]+\.(?:jpg|jpeg|png|webp))/gi;
      const matches = html.match(regex);
      if (matches) {
        console.log("Found in", u, ":", matches.slice(0, 15));
      }
    } catch (e) {
      console.log(u, "Error:", e.message);
    }
  }
}
findImages();
