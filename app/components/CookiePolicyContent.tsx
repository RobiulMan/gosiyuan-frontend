const CookiePolicyContent = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    {/* Header */}
    <header className="mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Cookie Policy</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Last Updated: <span className="font-medium">2025</span>
      </p>
    </header>

    {/* Main Content */}
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
      {/* What Are Cookies */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">What Are Cookies?</h2>
        <p className="mb-4 text-gray-900 dark:text-gray-100">
          A "cookie" is a small data text file placed in your browser that allows <span className="font-semibold">Gosiyuan</span> to recognize you when you revisit our site (e.g., for customization). Cookies do not contain personal information, and we do not use them to collect such data. Third-party content providers (e.g., analytics services) may also use cookies.
        </p>
      </section>

      {/* Cookies We Collect */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Cookies We Collect</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cookie Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purpose</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-gray-900 dark:text-gray-100">_ga</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Google Analytics tracking</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap font-mono text-sm text-gray-900 dark:text-gray-100">favorites</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Stores user preferences</td>
              </tr>
              {/* Add any other cookies your site actually uses here */}
            </tbody>
          </table>
        </div>
      </section>

      {/* Internet Security Disclaimer */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Internet Security Disclaimer</h2>
        <div className="bg-yellow-50 dark:bg-yellow-900 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 mb-4">
          <p className="font-medium text-yellow-800 dark:text-yellow-200">Remember:</p>
          <p className="text-yellow-700 dark:text-yellow-100">
            While we protect your information, we cannot guarantee the security of data transmitted to Gosiyuan. You are responsible for maintaining password confidentiality. External sites linked from our platform have independent privacy policies, and we disclaim liability for their practices.
          </p>
        </div>
        <p className="text-gray-900 dark:text-gray-100">
          Contact third-party vendors directly for questions about their policies.
        </p>
      </section>
    </div>

    {/* Contact Footer */}
    <footer className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <span className="mr-2 text-gray-700 dark:text-gray-300">📞</span>
          <a href="tel:+8615360539718" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            +86 15360 539-718
          </a>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-700 dark:text-gray-300">📧</span>
          <a href="mailto:support@gosiyuan.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            support@gosiyuan.com
          </a>
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-gray-700 dark:text-gray-300">🏢</span>
          <span className="text-gray-900 dark:text-gray-100">
            4C-12, 4C-13, Jia Nian Business Center, Building 204, Huaqiang North Shangbu Industrial District, Futian District, Shenzhen, China.
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        For cookie-specific inquiries, email <a href="mailto:support@gosiyuan.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">support@gosiyuan.com</a>
      </p>
    </footer>
  </div>
);

export default CookiePolicyContent;