/**
 * Generates a unique ticket code for ordering.
 * Format: DST + timestamp (in seconds) + last 3 digits of WhatsApp number
 * 
 * @param {string} whatsappNumber 
 * @returns {string} Unique ticket code
 */
export const generateTicketCode = (whatsappNumber) => {
  const prefix = 'DST';
  const timestamp = Math.floor(Date.now() / 1000).toString();
  
  // Clean phone number from non-digit characters
  const cleanNumber = whatsappNumber.replace(/\D/g, '');
  const lastThreeDigits = cleanNumber.slice(-3).padStart(3, '0');
  
  return `${prefix}${timestamp}${lastThreeDigits}`;
};

/**
 * Formats a number into Indonesian Rupiah currency.
 * 
 * @param {number} value 
 * @returns {string} Formatted currency string
 */
export const formatRupiah = (value) => {
  if (value === undefined || value === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

/**
 * Formats standard ISO dates to Indonesian user-friendly dates.
 * 
 * @param {string} dateString 
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};
