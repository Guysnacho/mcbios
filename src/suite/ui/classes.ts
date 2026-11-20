/**
 * The only place the suite UI names styling classes. Today they are daisyUI
 * tokens, so the dialog follows the site theme; swapping the design system (or
 * the org's admin-chosen theme) means editing this file, not the components.
 */
export const ui = {
  backdrop: "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm",
  positioner: "fixed inset-0 z-[70] flex items-center justify-center p-4",
  panel:
    "bg-base-100 text-base-content w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-box border border-base-300 p-6 shadow-xl",
  title: "text-2xl font-bold",
  description: "text-base-content/80 mt-1",
  closeButton: "btn btn-ghost btn-sm btn-circle absolute right-3 top-3",
  field: "flex flex-col gap-1",
  label: "text-sm font-medium",
  input: "input input-bordered w-full",
  inputInvalid: "input-error",
  fieldError: "text-error text-sm",
  primary: "btn btn-primary w-full",
  link: "link link-primary text-sm",
  // Neutral surface + colored border: contrast comes from base-content on base-200 in every theme
  statusInfo: "alert bg-base-200 text-base-content border border-info text-sm",
  statusError: "alert bg-base-200 text-base-content border border-error text-sm",
  notice: "toast toast-end toast-bottom z-[80]",
  noticeBody: "alert bg-base-200 text-base-content border border-success shadow-lg",
  menuContent:
    "bg-base-100 border border-base-300 rounded-box shadow-lg p-2 min-w-56 z-[70] outline-none",
  menuItem:
    "flex items-center rounded-field px-3 py-2 text-sm cursor-pointer data-[highlighted]:bg-base-200 outline-none",
} as const;
