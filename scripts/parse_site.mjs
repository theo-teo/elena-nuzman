async function parseSite() {
  const res = await fetch("http://www.elena-nuzman.com", {
    headers: { "User-Agent": "Mozilla/5.0" }
  });
  const html = await res.text();
  const allImages = [...new Set(html.match(/http:\/\/www\.elena-nuzman\.com\/sites\/default\/files\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi))];
  console.log("Total files found:", allImages.length);
  allImages.forEach(img => console.log(img));

  const links = [...new Set(html.match(/href="\/[^"]+"/gi))];
  console.log("Navigation links:", links.slice(0, 30));
}
parseSite();
