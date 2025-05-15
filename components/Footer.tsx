import { PathMap } from "@/lib/utils";

// export const Footer = () => {
//   const keys = Object.keys(PathMap);

//   return (
//     <footer className="bg-gray-900 border-double border-t-4 border-indigo-600 mt-20">
//       <div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-12 lg:px-4">
//         <nav
//           aria-label="Footer"
//           className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12"
//         >
//           {keys.map((route) =>
//             route == "/conferences" ? (
//               <div key={route} className="pb-6 flex flex-col">
//                 <p className="text-md underline underline-offset-2 leading-6 text-white hover:text-gray-300 mb-3">
//                   CONFERENCES
//                 </p>
//                 {ConfYears.map((conference) => (
//                   <a
//                     key={conference.year}
//                     href={conference.url}
//                     target="_blank"
//                     className="text-sm leading-6 text-white hover:text-gray-300"
//                   >
//                     MCBIOS {conference.year}
//                   </a>
//                 ))}
//               </div>
//             ) : route == "/membership" ? (
//               <div key={route} className="pb-6 flex flex-col">
//                 <p className="text-md underline underline-offset-2 leading-6 text-white hover:text-gray-300 mb-3">
//                   MEMBERSHIP
//                 </p>
//                 <Link
//                   as={NextLink}
//                   href="/membership"
//                   target="_self"
//                   className="text-sm leading-6 text-white hover:text-gray-300"
//                 >
//                   Registration
//                 </Link>
//               </div>
//             ) : (
//               <div key={route} className="pb-6 flex flex-col">
//                 <Link
//                   as={NextLink}
//                   key={route}
//                   //@ts-ignore
//                   href={PathMap[route].path}
//                   color={path == route ? "primary" : "foreground"}
//                   aria-current="page"
//                   target="_self"
//                   className="text-md underline underline-offset-2 leading-6 text-white hover:text-gray-300"
//                 >
//                   {/*@ts-ignore*/}
//                   {PathMap[route].name}
//                 </Link>
//               </div>
//             )
//           )}
//         </nav>
//         <p className="mt-10 text-center text-xs leading-5 text-gray-100">
//           &copy; 2025 MCBIOS, All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// };
const social = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/midsouth-computational-biology-and-bioinformatics-society/",
    icon: (props) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"></path>
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/Guysnacho/mcbios",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export const Footer = () => {
  const keys = Object.values(PathMap);
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {keys.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="text-gray-400 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-16 flex justify-center gap-x-10">
          {social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-300 my-auto"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
        </div>
        <p className="mt-10 text-center text-sm/6 text-gray-400">
          &copy; 2025 MidSouth Computational Biology and Bioinformatics Society.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};
