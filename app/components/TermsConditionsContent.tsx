const TermsConditionsContent = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    {/* Header */}
    <header className="mb-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Terms and Conditions</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Effective: <span className="font-medium">[Insert Date]</span>
      </p>
    </header>

    {/* Main Content */}
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 md:p-8">
      <section className="mb-8">
        <p className="mb-4 text-gray-900 dark:text-gray-100">
          Welcome to Gosiyuan. By accessing or using our website, you agree to comply with these Terms and Conditions, along with our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Privacy Policy</a>.
        </p>
      </section>

      <section id="definitions" className="terms-section mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Definitions</h2>
        <ul className="space-y-2 text-gray-900 dark:text-gray-100">
          <li>
            <span className="font-medium">"Gosiyuan," "we," or "us"</span> refers to our company, headquartered at 4C-12, 4C-13, Jia Nian Business Center, Building 204, Huaqiang North Shangbu Industrial District, Futian District, Shenzhen, China.
          </li>
          <li>
            <span className="font-medium">"You"</span> refers to the user or viewer of our website.
          </li>
        </ul>
      </section>

      <section id="use" className="terms-section mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. Website Use</h2>
        <ol className="space-y-4 text-gray-900 dark:text-gray-100 list-decimal list-inside">
          <li>Content is provided for general information only and may change without notice.</li>
          <li>We disclaim all warranties regarding accuracy, completeness, or suitability of information/materials. Your use is at your own risk.</li>
          <li>You are solely responsible for ensuring any products/services meet your requirements.</li>
        </ol>
      </section>

      <section id="intellectual-property" className="terms-section mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. Intellectual Property</h2>
        <ol className="space-y-4 text-gray-900 dark:text-gray-100 list-decimal list-inside">
          <li>All content (designs, graphics, text) is owned/licensed by Gosiyuan. Reproduction is prohibited without prior written consent.</li>
          <li>Third-party trademarks are acknowledged where applicable.</li>
          <li>Product images are illustrative only; actual designs may vary.</li>
        </ol>
      </section>

      <section id="prohibited" className="terms-section mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Prohibited Actions</h2>
        <ol className="space-y-4 text-gray-900 dark:text-gray-100 list-decimal list-inside">
          <li>Unauthorized use may result in legal action (civil claims or criminal charges).</li>
          <li>Linking to this site requires prior written approval.</li>
        </ol>
      </section>

      <section id="links" className="terms-section mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">5. Third-Party Links</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Occasional external links are provided for convenience. We do not endorse or assume responsibility for their content.
        </p>
      </section>

      <section id="jurisdiction" className="terms-section mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">6. Governing Law</h2>
        <p className="text-gray-900 dark:text-gray-100">
          These Terms are governed by the laws of the People's Republic of China. Any disputes will be resolved in the courts located in Shenzhen, China.
        </p>
      </section>

      <section id="updates" className="terms-section mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">7. Changes to Terms</h2>
        <p className="text-gray-900 dark:text-gray-100">
          We may update these Terms periodically. Continued use after changes constitutes acceptance.
        </p>
      </section>
    </div>

    {/* Contact Footer */}
    <footer className="mt-12 bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 text-center md:text-left">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h2>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center md:justify-start">
          <span className="mr-2 text-gray-700 dark:text-gray-300">📞</span>
          <a href="tel:+8615360539718" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            +86 15360 539-718
          </a>
        </div>
        <div className="flex items-center justify-center md:justify-start">
          <span className="mr-2 text-gray-700 dark:text-gray-300">📧</span>
          <a href="mailto:support@gosiyuan.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            support@gosiyuan.com
          </a>
        </div>
        <div className="flex items-center justify-center md:justify-start">
          <span className="mr-2 text-gray-700 dark:text-gray-300">🏢</span>
          <span className="text-gray-900 dark:text-gray-100">
            4C-12, 4C-13, Jia Nian Business Center, Building 204, Huaqiang North Shangbu Industrial District, Futian District, Shenzhen, China.
          </span>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        For questions about these Terms, email{" "}
        <a href="mailto:support@gosiyuan.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
          support@gosiyuan.com
        </a>.
      </p>
    </footer>
  </div>
);

export default TermsConditionsContent;