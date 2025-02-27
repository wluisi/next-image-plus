import {
  checkLinkPreload,
  encodeLikeNext,
  interceptNextImage,
} from "../../support/utils";

const FALLBACK_IMG = "https://picsum.photos/id/59/430/215";
const MD_IMG = "https://picsum.photos/id/59/860/430";
const LG_IMG = "https://picsum.photos/id/59/220/220";

// Breakpoints
const FALLBACK_BREAKPOINT = "(max-width: 430px)";
const MD_BREAKPOINT = "(min-width: 431px) and (max-width: 1023px)";
const LG_BREAKPOINT = "(min-width: 1024px)";

// Image density
const FALLBACK_WIDTH_1X = "640";
const FALLBACK_WIDTH_2X = "1080";

const MD_WIDTH_1X = "640";
const MD_WIDTH_2X = "1920";

const LG_WIDTH_1X = "640";

//
const BASE_URL = Cypress.config().baseUrl;

const SLUG = "/image/picture";

describe("Fallback: Picture component (pages)", () => {
  beforeEach(() => {
    cy.viewport(430, 932);
  });

  // You're testing a single image on the first card, and checking whether fallback, md, or lg verion was loaded ?
  // @todo how do you know this is testing the network preload request ?
  it("should make network request (preload) for fallback (mobile) picture image and not md or lg.", () => {
    interceptNextImage({
      fallback: FALLBACK_IMG,
      md: MD_IMG,
      lg: LG_IMG,
    });

    cy.visit(SLUG);

    cy.wait("@fallback-image").its("response.statusCode").should("eq", 200);
    // Ensure the other two images were NOT requested
    cy.get("@md-image.all").should("have.length", 0);
    cy.get("@lg-image.all").should("have.length", 0);
  });

  it("should have <link rel='preload'> in head with correct attrs for fallback (mobile) picture image", () => {
    cy.visit(SLUG);

    checkLinkPreload({
      img: FALLBACK_IMG,
      media: FALLBACK_BREAKPOINT,
      width1x: FALLBACK_WIDTH_1X,
      width2x: FALLBACK_WIDTH_2X,
    });
  });

  it("should have fallback (mobile) picture image src as the current src.", () => {
    cy.visit(SLUG);

    cy.get("#card-item__abcd-1234 picture img")
      .should("be.visible")
      .should(($img) => {
        const imgEl = $img[0] as HTMLImageElement;
        // Check the image is loaded.
        expect(imgEl.naturalWidth).to.be.greaterThan(0);
        // Check the actual loadded image is the current src.
        expect(imgEl.currentSrc).to.include(FALLBACK_IMG);
      });
  });

  it("should not have medium and large picture source images as the current src.", () => {
    cy.visit(SLUG);

    const mdImg = `${MD_IMG}&w=${MD_WIDTH_2X}&q=75`;
    const mdImgUrl = `${BASE_URL}/_next/image?url=${mdImg}`;

    const lgImg = encodeLikeNext(`${LG_IMG}&w=${LG_WIDTH_1X}&q=75`);
    const lgImgUrl = `${BASE_URL}/_next/image?url=${lgImg}`;

    cy.get("#card-item__abcd-1234 picture img")
      .should("be.visible")
      .should(($img) => {
        const imgEl = $img[0] as HTMLImageElement;
        // Check the image is loaded.
        expect(imgEl.naturalWidth).to.be.greaterThan(0);
        expect(imgEl.currentSrc).not.to.include(mdImgUrl);
        expect(imgEl.currentSrc).not.to.include(lgImgUrl);
      });
  });
});

describe("md: Picture component (pages)", () => {
  beforeEach(() => {
    cy.viewport(768, 1024);
  });

  // You're testing a single image on the first card, and checking whether fallback, md, or lg verion was loaded ?
  // @todo how do you know this is testing the network preload request ?
  it("should make network request (preload) for md (tablet) picture image and not fallback or lg.", () => {
    interceptNextImage({
      fallback: FALLBACK_IMG,
      md: MD_IMG,
      lg: LG_IMG,
    });

    cy.visit(SLUG);

    cy.wait("@md-image").its("response.statusCode").should("eq", 200);
    // Ensure the other two images were NOT requested
    cy.get("@fallback-image.all").should("have.length", 0);
    cy.get("@lg-image.all").should("have.length", 0);
  });

  it("should have <link rel='preload'> in head with correct attrs for md (tablet) picture image", () => {
    cy.visit(SLUG);

    checkLinkPreload({
      img: MD_IMG,
      media: MD_BREAKPOINT,
      width1x: MD_WIDTH_1X,
      width2x: MD_WIDTH_2X,
    });
  });

  it("should have md (tablet) picture image src as the current src.", () => {
    cy.visit(SLUG);

    const mdImg = encodeLikeNext(`${MD_IMG}&w=${MD_WIDTH_2X}&q=75`);
    const mdImgUrl = `${BASE_URL}/_next/image?url=${mdImg}`;

    cy.get("#card-item__abcd-1234 picture img")
      .should("be.visible")
      .should(($img) => {
        const imgEl = $img[0] as HTMLImageElement;
        // Check the image is loaded.
        expect(imgEl.naturalWidth).to.be.greaterThan(0);
        // Check the actual loadded image is the current src.
        expect(imgEl.currentSrc).to.include(mdImgUrl);
      });
  });

  it("should not have fallback and large picture source images as the current src.", () => {
    cy.visit(SLUG);

    const fallbackImg = encodeLikeNext(
      `${FALLBACK_IMG}&w=${FALLBACK_WIDTH_1X}&q=75`
    );
    const fallbackImgUrl = `${BASE_URL}/_next/image?url=${fallbackImg}`;

    const lgImg = encodeLikeNext(`${LG_IMG}&w=${LG_WIDTH_1X}&q=75`);
    const lgImgUrl = `${BASE_URL}/_next/image?url=${lgImg}`;

    cy.get("#card-item__abcd-1234 picture img")
      .should("be.visible")
      .should(($img) => {
        const imgEl = $img[0] as HTMLImageElement;
        // Check the image is loaded.
        expect(imgEl.naturalWidth).to.be.greaterThan(0);
        expect(imgEl.currentSrc).not.to.include(fallbackImgUrl);
        expect(imgEl.currentSrc).not.to.include(lgImgUrl);
      });
  });
});

describe("lg: Picture component (pages)", () => {
  beforeEach(() => {
    cy.viewport(1024, 768);
  });

  // You're testing a single image on the first card, and checking whether fallback, md, or lg verion was loaded ?
  // @todo how do you know this is testing the network preload request ?
  it("should make network request (preload) for lg (desktop) picture image and not fallback or md.", () => {
    interceptNextImage({
      fallback: FALLBACK_IMG,
      md: MD_IMG,
      lg: LG_IMG,
    });

    cy.visit(SLUG);

    cy.wait("@lg-image").its("response.statusCode").should("eq", 200);
    // Ensure the other two images were NOT requested
    cy.get("@fallback-image.all").should("have.length", 0);
    cy.get("@md-image.all").should("have.length", 0);
  });

  it("should have <link rel='preload'> in head with correct attrs for lg (desktop) picture image", () => {
    cy.visit(SLUG);

    checkLinkPreload({
      img: LG_IMG,
      media: LG_BREAKPOINT,
      width1x: LG_WIDTH_1X,
      width2x: LG_WIDTH_1X,
    });
  });

  it("should have lg (desktop) picture image src as the current src.", () => {
    cy.visit(SLUG);

    const lgImg = encodeLikeNext(`${LG_IMG}&w=${LG_WIDTH_1X}&q=75`);
    const lgImgUrl = `${BASE_URL}/_next/image?url=${lgImg}`;

    cy.get("#card-item__abcd-1234 picture img")
      .should("be.visible")
      .should(($img) => {
        const imgEl = $img[0] as HTMLImageElement;
        // Check the image is loaded.
        expect(imgEl.naturalWidth).to.be.greaterThan(0);
        // Check the actual loadded image is the current src.
        expect(imgEl.currentSrc).to.include(lgImgUrl);
      });
  });

  it("should not have fallback and md picture source images as the current src.", () => {
    cy.visit(SLUG);

    const fallbackImg = encodeLikeNext(
      `${FALLBACK_IMG}&w=${FALLBACK_WIDTH_1X}&q=75`
    );
    const fallbackImgUrl = `${BASE_URL}/_next/image?url=${fallbackImg}`;

    const mdImg = encodeLikeNext(`${MD_IMG}&w=${MD_WIDTH_1X}&q=75`);
    const mdImgUrl = `${BASE_URL}/_next/image?url=${mdImg}`;

    cy.get("#card-item__abcd-1234 picture img")
      .should("be.visible")
      .should(($img) => {
        const imgEl = $img[0] as HTMLImageElement;
        // Check the image is loaded.
        expect(imgEl.naturalWidth).to.be.greaterThan(0);
        expect(imgEl.currentSrc).not.to.include(fallbackImgUrl);
        expect(imgEl.currentSrc).not.to.include(mdImgUrl);
      });
  });
});
