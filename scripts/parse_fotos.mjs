async function parseFotos() {
  const res = await fetch("http://www.elena-nuzman.com/fotos", {
    headers: { "User-Agent": "Mozilla/5.0" }
  });
  const html = await res.text();
  const imgs = [...new Set(html.match(/http:\/\/www\.elena-nuzman\.com\/sites\/default\/files\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi))];
  console.log("Images on /fotos:", imgs.length);
  imgs.forEach(i => console.log(i));
}
parseFotos();
