"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { consumeCookieByKey } from "@/actions/cookies";

const RedirectToast = () => {
  // At the time of writing, the template.tsx file does not re-render reliably on every route change.
  // This is a known bug in Next.js. You can follow the issue here:
  // https://bit.ly/3Xjyp14
  // https://bit.ly/4f25Bkd
  // As a workaround, you can use the pathname in the RedirectToast component (again) to trigger its effect on every route change.
  // UPDATE: May not be a bug, but intended behavior.
  // See here: https://github.com/vercel/next.js/issues/60032#issuecomment-3584206945
  const pathname = usePathname();

  useEffect(() => {
    const showCookieToast = async () => {
      const message = await consumeCookieByKey("toast");

      if (message) {
        toast.success(message);
      }
    };

    showCookieToast();
  }, [pathname]);

  return null;
};

export { RedirectToast };
