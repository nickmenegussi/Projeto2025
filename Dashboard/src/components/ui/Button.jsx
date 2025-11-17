import clsx from 'clsx'
export default function Button({ variant='solid', className, disabled, ...props }){
  const base = 'inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition'
  const styles = {
    solid: 'bg-brand-600 text-white hover:bg-brand-700',
    outline: 'border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700',
    ghost: 'hover:bg-gray-100 dark:hover:bg-gray-700'
  }
  return <button className={clsx(base, styles[variant], className)} {...props} disabled={disabled} />
}
