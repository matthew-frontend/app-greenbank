export default defineNuxtPlugin(() => {
  /**
   * แปลงรูปแบบวันที่จาก yyyy-mm-dd หรือ yyyy-mm-dd HH:MM:SS → dd/mm/yyyy
   * รองรับทั้ง Date object และ string
   */
  const formatDate = (dateInput) => {
    if (!dateInput) return '';

    let date;

    // ✅ ถ้าเป็น Date object อยู่แล้ว
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'string') {
      // ✅ ตัดเอาเฉพาะส่วนวันที่ออกจาก "yyyy-mm-dd hh:mm:ss"
      const clean = dateInput.trim().split(' ')[0];
      const [y, m, d] = clean.split('-');
      if (!y || !m || !d) return dateInput;
      return `${d}/${m}/${y}`;
    } else {
      return String(dateInput);
    }

    // ✅ กรณีเป็น Date object
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /**
   * แปลงกลับจาก dd/mm/yyyy → yyyy-mm-dd
   */
  const parseDate = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return `${y}-${m}-${d}`;
    }
    return dateStr;
  };

  return {
    provide: {
      formatDate,
      parseDate,
    },
  };
});
