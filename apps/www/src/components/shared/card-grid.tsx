import * as React from "react";
import {
  ArrowRightIcon,
  Card,
  CardContent,
  CardFooter,
  CodeIcon,
  DesktopIcon,
  GearIcon,
  GithubIcon,
  GraphTreeIcon,
  Grid,
  GridItem,
  Heading,
  ImageIcon,
  LightningBoltIcon,
  RocketshipIcon,
} from "@graphinery/ui";

import Link from "next/link";

export interface CardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: {
    uri: string;
    text: string;
  };
}

export interface CardGridProps {
  id?: string;
  layout?: "column" | "row";
  title?: string;
  description?: string;
  items: CardProps[];
}

const iconMap: Record<string, React.JSX.Element> = {
  "arrow-right": <ArrowRightIcon className="h-8 w-8 mb-3" />,
  "lightning-bolt": <LightningBoltIcon className="h-8 w-8 mb-3" />,
  code: <CodeIcon className="h-8 w-8 mb-3" />,
  desktop: <DesktopIcon className="h-8 w-8 mb-3" />,
  gear: <GearIcon className="h-8 w-8 mb-3" />,
  github: <GithubIcon className="h-8 w-8 mb-3" />,
  image: <ImageIcon className="h-8 w-8 mb-3" />,
  rocketship: <RocketshipIcon className="h-8 w-8 mb-3" />,
  "graph-tree": (
    <GraphTreeIcon className="h-8 w-8 mb-3 stroke-1 stroke-black dark:stroke-zinc-100" />
  ),
};

export default function CardGrid({
  id,
  layout = "row",
  title,
  description,
  items,
}: CardGridProps) {
  const itemsCount = items.length;
  const gridCols =
    itemsCount === 4
      ? "md:grid md:grid-cols-2 md:gap-6"
      : "md:grid md:grid-cols-2 md:gap-6";

  const gridClassNames = layout === "column" ? gridCols : "md:grid";

  return (
    <div
      {...(id && {
        id: `card-grid-shared__${id}`,
      })}
      className="mb-20"
    >
      {title && <Heading level="h2">{title}</Heading>}
      {description && (
        <div className="mb-5">
          <p className="text-lg text-black/90 dark:text-zinc-100 mb-3">
            {description}
          </p>
        </div>
      )}
      <Grid as="ul" className={`list-none p-0 ${gridClassNames}`}>
        {items.map((item: CardProps) => {
          return (
            <GridItem key={item.id} as="li" className="md:flex">
              <Card>
                <CardContent>
                  {iconMap[item.icon]}
                  <Heading level="h3" className="text-lg mb-2">
                    {item.title}
                  </Heading>
                  {item.description && (
                    <div className="pb-5">
                      <p className="text-sm text-black/90 dark:text-zinc-100 mb-3">
                        {item.description}
                      </p>
                    </div>
                  )}
                </CardContent>
                {item.link && (
                  <CardFooter>
                    <Link
                      className="text-slate-800 dark:text-zinc-300 font-semibold text-sm hover:underline flex items-center"
                      href={item.link.uri}
                    >
                      {item.link.text}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-2 h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </CardFooter>
                )}
              </Card>
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}

// import * as React from "react";
// import {
//   ArrowRightIcon,
//   Card,
//   CodeIcon,
//   DesktopIcon,
//   GearIcon,
//   GithubIcon,
//   Grid,
//   GridItem,
//   Heading,
//   ImageIcon,
//   LightningBoltIcon,
//   RocketshipIcon,
// } from "@graphinery/ui";

// export interface CardProps {
//   id: string;
//   title: string;
//   description: string;
//   icon: string;
//   // link: {
//   //   uri: string;
//   // };
// }

// export interface CardGridProps {
//   id?: string;
//   layout?: "column" | "row";
//   title?: string;
//   description?: string;
//   items: CardProps[];
// }

// const iconMap: Record<string, React.JSX.Element> = {
//   "arrow-right": <ArrowRightIcon className="h-8 w-8 mb-3" />,
//   "lightning-bolt": <LightningBoltIcon className="h-8 w-8 mb-3" />,
//   code: <CodeIcon className="h-8 w-8 mb-3" />,
//   desktop: <DesktopIcon className="h-8 w-8 mb-3" />,
//   gear: <GearIcon className="h-8 w-8 mb-3" />,
//   github: <GithubIcon className="h-8 w-8 mb-3" />,
//   image: <ImageIcon className="h-8 w-8 mb-3" />,
//   rocketship: <RocketshipIcon className="h-8 w-8 mb-3" />,
// };

// export default function CardGrid({
//   id,
//   layout = "row",
//   title,
//   description,
//   items,
// }: CardGridProps) {
//   const itemsCount = items.length;
//   const gridCols =
//     itemsCount === 4
//       ? "md:grid md:grid-cols-2 md:gap-6"
//       : "md:grid md:grid-cols-3 md:gap-6";

//   const gridClassNames = layout === "column" ? gridCols : "md:grid";

//   return (
//     <div
//       {...(id && {
//         id: `card-grid-shared__${id}`,
//       })}
//       className="mb-20"
//     >
//       {title && <Heading level="h2">{title}</Heading>}
//       {description && (
//         <div className="mb-5">
//           <p className="text-lg text-black/90 mb-3">{description}</p>
//         </div>
//       )}
//       <Grid as="ul" className={`list-none p-0 ${gridClassNames}`}>
//         {items.map((item: CardProps) => {
//           return (
//             <GridItem key={item.id} as="li" className="md:flex">
//               <Card>
//                 <div className="p-5">
//                   {iconMap[item.icon]}
//                   <Heading level="h3" className="text-lg mb-2">
//                     {item.title}
//                   </Heading>
//                   {item.description && (
//                     <div className="pb-5">
//                       <p className="text-sm text-black/90 mb-3">
//                         {item.description}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </Card>
//             </GridItem>
//           );
//         })}
//       </Grid>
//     </div>
//   );
// }
