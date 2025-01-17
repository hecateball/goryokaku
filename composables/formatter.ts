/**
 * Create number formatter.
 */
export const useFormatter = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  })
  return { formatter }
}
