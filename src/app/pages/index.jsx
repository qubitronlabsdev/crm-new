import { Page } from "components/shared/Page";

export default function Home() {
  return (
    <Page title="Dashboard">
      <div className="transition-content w-full px-(--margin-x) py-5 lg:py-6">
        <div className="min-w-0">
          <h2 className="dark:text-dark-50 truncate text-xl font-medium tracking-wide text-gray-800">
            Travel CRM Dashboard
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome to your Travel CRM dashboard. Manage leads, quotations,
            bookings, and more.
          </p>
        </div>
      </div>
    </Page>
  );
}
