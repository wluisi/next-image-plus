import {
  checkLinkPreload,
  encodeLikeNext,
  interceptNextImage,
} from "../support/utils";

const FALLBACK_IMG = "https://picsum.photos/id/870/430/466";
const MD_IMG = "https://picsum.photos/id/870/768/512";
const LG_IMG = "https://picsum.photos/id/870/2560/800";

// Breakpoints
const FALLBACK_BREAKPOINT = "(max-width: 430px)";
const MD_BREAKPOINT = "(min-width: 768px) and (max-width: 1023px)";
const LG_BREAKPOINT = "(min-width: 1024px)";

// Image density
const FALLBACK_WIDTH_1X = "430";
const FALLBACK_WIDTH_2X = "860";
const MD_WIDTH_1X = "828";
const MD_WIDTH_2X = "1920";
const LG_WIDTH_1X = "3840";

//
const BASE_URL = Cypress.config().baseUrl;

const routerTypes = [
  {
    router: "app",
    slug: "/image-a/background",
  },
  {
    router: "pages",
    slug: "/image/background",
  },
];

routerTypes.forEach((routerType) => {
  const SLUG = routerType.slug;

  describe(`[ ${routerType.router} ] Fallback: next background image tests`, () => {
    beforeEach(() => {
      cy.viewport(430, 932);

      // Clear browser cache.
      // @see https://stackoverflow.com/a/72945339
      cy.wrap(
        Cypress.automation("remote:debugger:protocol", {
          command: "Network.clearBrowserCache",
        })
      );
    });

    it("should make network request (preload) for fallback (mobile) background image and not md or lg.", () => {
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

    it("should have <link rel='preload'> in head with correct attrs for fallback (mobile) image", () => {
      cy.visit(SLUG);

      checkLinkPreload({
        img: FALLBACK_IMG,
        media: FALLBACK_BREAKPOINT,
        width1x: FALLBACK_WIDTH_1X,
        width2x: FALLBACK_WIDTH_2X,
      });
    });

    // @todo add a no javascript test that the background image still loads.
    // @todo add tests for `md` and `lg` breakpoints

    it("should have fallback (mobile) background image as the computed style.", () => {
      cy.visit(SLUG);

      const fallbackImg = encodeLikeNext(
        `${FALLBACK_IMG}&w=${FALLBACK_WIDTH_2X}&q=75`
      );
      const fallbackImgUrl = `${BASE_URL}/_next/image?url=${fallbackImg}`;

      cy.get(".next-background-image").then(($element) => {
        // Check the computed style, to test if the css rules selected the correct background image.
        const computedStyle = window.getComputedStyle($element[0]);
        expect(computedStyle.backgroundImage).to.include(
          `url("${fallbackImgUrl}")`
        );
      });
    });

    it("should not have medium and large background images as the computed style.", () => {
      cy.visit(SLUG);

      const mdImg = `${MD_IMG}&w=${MD_WIDTH_2X}&q=75`;
      const mdImgUrl = `${BASE_URL}/_next/image?url=${mdImg}`;

      const lgImg = encodeLikeNext(`${LG_IMG}&w=${LG_WIDTH_1X}&q=75`);
      const lgImgUrl = `${BASE_URL}/_next/image?url=${lgImg}`;

      cy.get(".next-background-image").then(($element) => {
        // Check the computed style, to test if the css rules selected the correct background image.
        const computedStyle = window.getComputedStyle($element[0]);
        expect(computedStyle.backgroundImage).not.to.include(
          `url("${mdImgUrl}")`
        );
        expect(computedStyle.backgroundImage).not.to.include(
          `url("${lgImgUrl}")`
        );
      });
    });
  });

  describe(`[ ${routerType.router} ] md: next background image tests`, () => {
    beforeEach(() => {
      cy.viewport(768, 1024);

      // Clear browser cache.
      // @see https://stackoverflow.com/a/72945339
      cy.wrap(
        Cypress.automation("remote:debugger:protocol", {
          command: "Network.clearBrowserCache",
        })
      );
    });

    it("should make network request (preload) for md (tablet) background image and not fallback or lg.", () => {
      interceptNextImage({
        fallback: FALLBACK_IMG,
        md: MD_IMG,
        lg: LG_IMG,
      });

      cy.visit(SLUG);

      // @todo this fails now for some reason, can never find the network req for md-image ??
      cy.wait("@md-image").its("response.statusCode").should("eq", 200);
      // Ensure the other two images were NOT requested
      cy.get("@fallback-image.all").should("have.length", 0);
      cy.get("@lg-image.all").should("have.length", 0);
    });

    it("should have <link rel='preload'> in head with correct attrs for md (tablet) image", () => {
      cy.visit(SLUG);

      checkLinkPreload({
        img: MD_IMG,
        media: MD_BREAKPOINT,
        width1x: MD_WIDTH_1X,
        width2x: MD_WIDTH_2X,
      });
    });

    it("should have md (tablet) background image as the computed style.", () => {
      cy.visit(SLUG);

      const img = encodeLikeNext(`${MD_IMG}&w=${MD_WIDTH_2X}&q=75`);
      const imgUrl = `${BASE_URL}/_next/image?url=${img}`;

      cy.get(".next-background-image").then(($element) => {
        // Check the computed style, to test if the css rules selected the correct background image.
        const computedStyle = window.getComputedStyle($element[0]);
        expect(computedStyle.backgroundImage).to.include(`url("${imgUrl}")`);
      });
    });

    it("should not have fallback and large background images as the computed style.", () => {
      cy.visit(SLUG);

      const fallbackImg = `${FALLBACK_IMG}&w=${FALLBACK_WIDTH_2X}&q=75`;
      const fallbackImgUrl = `${BASE_URL}/_next/image?url=${fallbackImg}`;

      const lgImg = encodeLikeNext(`${LG_IMG}&w=${LG_WIDTH_1X}&q=75`);
      const lgImgUrl = `${BASE_URL}/_next/image?url=${lgImg}`;

      cy.get(".next-background-image").then(($element) => {
        // Check the computed style, to test if the css rules selected the correct background image.
        const computedStyle = window.getComputedStyle($element[0]);
        expect(computedStyle.backgroundImage).not.to.include(
          `url("${fallbackImgUrl}")`
        );
        expect(computedStyle.backgroundImage).not.to.include(
          `url("${lgImgUrl}")`
        );
      });
    });
  });

  describe(`[ ${routerType.router} ] lg: next background image tests`, () => {
    beforeEach(() => {
      cy.viewport(1024, 768);

      // Clear browser cache.
      // @see https://stackoverflow.com/a/72945339
      cy.wrap(
        Cypress.automation("remote:debugger:protocol", {
          command: "Network.clearBrowserCache",
        })
      );
    });

    it("should make network request (preload) for lg (desktop) background image and not fallback or md.", () => {
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

    it("should have <link rel='preload'> in head with correct attrs for lg (desktop) image", () => {
      cy.visit(SLUG);

      checkLinkPreload({
        img: LG_IMG,
        media: LG_BREAKPOINT,
        width1x: LG_WIDTH_1X,
        width2x: LG_WIDTH_1X,
      });
    });

    it("should have lg (desktop) background image as the computed style.", () => {
      cy.visit(SLUG);

      const img = encodeLikeNext(`${LG_IMG}&w=${LG_WIDTH_1X}&q=75`);
      const imgUrl = `${BASE_URL}/_next/image?url=${img}`;

      cy.get(".next-background-image").then(($element) => {
        // Check the computed style, to test if the css rules selected the correct background image.
        const computedStyle = window.getComputedStyle($element[0]);
        expect(computedStyle.backgroundImage).to.include(`url("${imgUrl}")`);
      });
    });

    it("should not have fallback and md background images as the computed style.", () => {
      cy.visit(SLUG);

      const fallbackImg = `${FALLBACK_IMG}&w=${FALLBACK_WIDTH_2X}&q=75`;
      const fallbackImgUrl = `${BASE_URL}/_next/image?url=${fallbackImg}`;

      const mdImg = encodeLikeNext(`${MD_IMG}&w=${MD_WIDTH_2X}&q=75`);
      const mdImgUrl = `${BASE_URL}/_next/image?url=${mdImg}`;

      cy.get(".next-background-image").then(($element) => {
        // Check the computed style, to test if the css rules selected the correct background image.
        const computedStyle = window.getComputedStyle($element[0]);
        expect(computedStyle.backgroundImage).not.to.include(
          `url("${fallbackImgUrl}")`
        );
        expect(computedStyle.backgroundImage).not.to.include(
          `url("${mdImgUrl}")`
        );
      });
    });
  });
});
