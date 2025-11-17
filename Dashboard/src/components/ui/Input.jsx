import clsx from 'clsx'
export function Label({ children, htmlFor, className}){ return <label htmlFor={htmlFor} className={className}>{children}</label> }
export default function Input({ className, ...props }){
  return <input className={clsx('input', className)} {...props} />
}
// export default function SearchInput({ Icon, className, ...props }) {
//   return (
//     <>
//       <div className="flex max-w-md">
//         <div className="inline-flex px-3 items-center text-gray-900 bg-gray-200  border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
//           <SearchIcon size={20} />
//         </div>
//         <input className={className} {...props} />
//       </div>
//     </>
//   );
// }
