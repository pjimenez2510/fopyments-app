import { CreditCard, LucideIcon, Target } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export const getAllMenuList = (pathname: string) => {
  const allMenus: Group[] = [
    {
      groupLabel: "Módulos",
      menus: [
        {
          href: "/management/goals",
          label: "Metas",
          active: pathname.startsWith("/management/goals"),
          icon: Target,
          submenus: [],
        },
        {
          href: "/management/budgets",
          label: "Presupuestos",
          active: pathname.startsWith("/management/budgets"),
          icon: CreditCard,
          submenus: [],
        },
        {
          href: "/management/debts",
          label: "Deudas",
          active: pathname.startsWith("/management/debts"),
          icon: CreditCard,
          submenus: [],
        },
      ],
    },
  ];
  return allMenus;
};
