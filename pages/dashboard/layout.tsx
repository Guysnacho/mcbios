const tabs = [
  { name: "Conference Videos", href: "/dashboard/videos", current: true },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-gray-100">
      <main className="h-64">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200 pb-5 sm:pb-0">
            <div className="mt-3 sm:mt-4">
              {/* <div className="sm:hidden">
                <label htmlFor="current-tab" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="current-tab"
                  name="current-tab"
                  // @ts-expect-error Default tab can be null
                  defaultValue={tabs.find((tab) => tab.current).name}
                  className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div> */}
              <div className="hidden sm:block">
                <nav className="-mb-px flex space-x-8">
                  {/* {tabs.map((tab) => (
                    <a
                      key={tab.name}
                      href={tab.href}
                      aria-current={tab.current ? "page" : undefined}
                      className={classNames(
                        tab.current
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                        "whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
                      )}
                    >
                      {tab.name}
                    </a>
                  ))} */}
                  <h4>Welcome</h4>
                </nav>
              </div>
            </div>
          </div>
          {children}
        </div>
      </main>
    </div>
  );
}
