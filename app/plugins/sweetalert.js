// plugins/swal.client.js
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default defineNuxtPlugin((nuxtApp) => {
  // Toast สั้นๆ มุมขวาบน
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 3000,
    showConfirmButton: false,
    customClass: { popup: "gb-swal-toast" },
  });

  // กล่องข้อความทั่วไป
  const showMsg = (obj = {}) => {
    const ok = !!obj.status;
    return Swal.fire({
      title: obj.title || (ok ? "Success!" : "Warning!"),
      html: obj.message || (ok ? "Success" : "Warning"),
      icon: obj.icon || (ok ? "success" : "warning"),
      confirmButtonText: obj.confirmText || (ok ? "OK" : "Close"),
      allowOutsideClick: false,
      customClass: {
        popup: "gb-swal",
        title: "gb-swal-title",
        confirmButton: "gb-swal-confirm",
      },
      buttonsStyling: false,
    });
  };

  // ข้อความแบบมีตัวจับเวลา
  const showTimerMsg = (obj = {}) => {
    const ok = obj.status === true;
    return Swal.fire({
      icon: obj.icon || (ok ? "success" : "info"),
      html: obj.html || (ok ? "Success!" : "Info"),
      showConfirmButton: false,
      timer: obj.timer || 1500,
      timerProgressBar: true,
      allowOutsideClick: false,
      customClass: { popup: "gb-swal" },
    });
  };

  const Confirm = (obj = {}) => {
    return Swal.fire({
      title: obj.title || "Are you sure?",
      html: obj.text  || "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: obj.confirmButtonText || "Yes, Confirm!",
      cancelButtonText: obj.cancelButtonText || "No, cancel!",
      allowOutsideClick: false,
      confirmButtonColor: obj.confirmButtonColor || "#000",
      reverseButtons: true,
      customClass: {
        popup: "gb-swal",
        confirmButton: "gb-swal-confirm-green",
        cancelButton: "gb-swal-cancel",
        actions: "swal2-actions",
      },
      buttonsStyling: true,
    });
  };


  // ยืนยันการลบ
  const confirmDel = (obj = {}) => {
    return Swal.fire({
      title: obj.title || "Are you sure?",
      html: obj.text || "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: obj.confirmButtonText || "Yes, delete it!",
      cancelButtonText: obj.cancelButtonText || "No, cancel!",
      allowOutsideClick: false,
      confirmButtonColor: "#EC0000",
      reverseButtons: true,
      customClass: {
        popup: "gb-swal",
        confirmButton: "gb-swal-confirm-danger",
        cancelButton: "gb-swal-cancel",
        actions: "swal2-actions",
      },
      buttonsStyling: false,
    });
  };

  // ยืนยันออกจากระบบ
  const confirmLogout = () =>
    confirmDel({
      title: "Do you want to sign out?",
      text: "Are you sure you want to sign out?",
      confirmButtonText: "Sign out",
      cancelButtonText: "Cancel",
      icon: "question",
    });

  // Provide
  nuxtApp.provide("swal", Swal);
  nuxtApp.provide("toast", toast);
  nuxtApp.provide("showMsg", showMsg);
  nuxtApp.provide("showTimerMsg", showTimerMsg);
  nuxtApp.provide("ConfirmDel", confirmDel);
  nuxtApp.provide("Confirm", Confirm);
  nuxtApp.provide("confirmLogout", confirmLogout);
});
