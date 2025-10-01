// Import Dependencies
import PropTypes from "prop-types";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { TbCoins, TbUser } from "react-icons/tb";
import { Link } from "react-router";

// Local Imports
import { Avatar, AvatarDot, Button } from "components/ui";

// ----------------------------------------------------------------------

const links = [
  {
    id: "1",
    title: "Profile",
    description: "Your profile Setting",
    to: "/settings/general",
    Icon: TbUser,
    color: "warning",
  },
  {
    id: "4",
    title: "Billing",
    description: "Your billing information",
    to: "/settings/billing",
    Icon: TbCoins,
    color: "error",
  },
  {
    id: "5",
    title: "Settings",
    description: "Webapp settings",
    to: "/settings/appearance",
    Icon: Cog6ToothIcon,
    color: "success",
  },
];

export function Profile({ compact = false }) {
  if (compact) {
    return (
      <Avatar
        size={8}
        src="/images/avatar/avatar-12.jpg"
        alt="Profile"
        indicator={
          <AvatarDot color="success" className="ltr:right-0 rtl:left-0" />
        }
        classNames={{
          root: "cursor-pointer",
        }}
      />
    );
  }

  return (
    <Popover className="relative w-full">
      <PopoverButton className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-800">
        <Avatar
          size={8}
          src="/images/avatar/avatar-12.jpg"
          alt="Profile"
          // indicator={
          //   <AvatarDot color="success" className="ltr:right-0 rtl:left-0" />
          // }
        />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Profile
        </span>
      </PopoverButton>
      <Transition
        enter="duration-200 ease-out"
        enterFrom="translate-x-2 opacity-0"
        enterTo="translate-x-0 opacity-100"
        leave="duration-200 ease-out"
        leaveFrom="translate-x-0 opacity-100"
        leaveTo="translate-x-2 opacity-0"
      >
        <PopoverPanel
          anchor={{ to: "right end", gap: 12 }}
          className="border-gray-150 shadow-soft dark:border-dark-600 dark:bg-dark-700 z-70 flex w-64 flex-col rounded-lg border bg-white transition dark:shadow-none"
        >
          {({ close }) => (
            <>
              <div className="dark:bg-dark-800 flex items-center gap-4 rounded-t-lg bg-gray-100 px-4 py-5">
                <Avatar
                  size={14}
                  src="/images/avatar/avatar-12.jpg"
                  alt="Profile"
                />
                <div>
                  <Link
                    className="hover:text-primary-600 focus:text-primary-600 dark:text-dark-100 dark:hover:text-primary-400 dark:focus:text-primary-400 text-base font-medium text-gray-700"
                    to="/settings/general"
                  >
                    Travis Fuller
                  </Link>

                  <p className="dark:text-dark-300 mt-0.5 text-xs text-gray-400">
                    Product Designer
                  </p>
                </div>
              </div>
              <div className="flex flex-col pt-2 pb-5">
                {links.map((link) => (
                  <Link
                    key={link.id}
                    to={link.to}
                    onClick={close}
                    className="group dark:hover:bg-dark-600 dark:focus:bg-dark-600 flex items-center gap-3 px-4 py-2 tracking-wide outline-hidden transition-all hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <Avatar
                      size={8}
                      initialColor={link.color}
                      classNames={{ display: "rounded-lg" }}
                    >
                      <link.Icon className="size-4.5" />
                    </Avatar>
                    <div>
                      <h2 className="group-hover:text-primary-600 group-focus:text-primary-600 dark:text-dark-100 dark:group-hover:text-primary-400 dark:group-focus:text-primary-400 font-medium text-gray-800 transition-colors">
                        {link.title}
                      </h2>
                      <div className="dark:text-dark-300 truncate text-xs text-gray-400">
                        {link.description}
                      </div>
                    </div>
                  </Link>
                ))}
                <div className="px-4 pt-4">
                  <Button className="w-full gap-2">
                    <ArrowLeftStartOnRectangleIcon className="size-4.5" />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            </>
          )}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

Profile.propTypes = {
  compact: PropTypes.bool,
};
