export function interceptNextImage(options) {
  const { fallback, md, lg } = options;

  cy.log("Intercept the network requests preloaded image(s)");
  cy.intercept("GET", `/_next/image?url=${encodeURIComponent(fallback)}*`).as(
    "fallback-image"
  );
  cy.intercept("GET", `/_next/image?url=${encodeURIComponent(md)}*`).as(
    "md-image"
  );
  cy.intercept("GET", `/_next/image?url=${encodeURIComponent(lg)}*`).as(
    "lg-image"
  );
}

export function encodeLikeNext(url) {
  return url
    .split("&") // Split at `&` to handle parameters separately
    .map((part) => part.replace(/[^&=]/g, encodeURIComponent)) // Encode everything except `&` and `=`
    .join("&"); // Rejoin the parts
}

export function checkLinkPreload(options) {
  const { img, media, width1x, width2x } = options;

  cy.get(`link[rel="preload"][media="${media}"]`)
    .should("have.attr", "as", "image")
    .and("have.attr", "imagesrcset");

  cy.get(`link[rel="preload"][media="${media}"]`)
    .invoke("attr", "imagesrcset")
    .then((imagesrcset) => {
      const imagesrcsetDecoded = decodeURIComponent(imagesrcset);

      expect(imagesrcsetDecoded).to.include(`${img}&w=${width1x}`);
      expect(imagesrcsetDecoded).to.include(`${img}&w=${width2x}`);
    });
}
