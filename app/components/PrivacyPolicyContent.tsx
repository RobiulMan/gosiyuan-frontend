const PrivacyPolicyContent = () => (
  <div className="container mx-auto px-4 py-12 max-w-4xl">
    {/* Header */}
    <header className="mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">Privacy Policy</h1>
      <p className="text-gray-600 dark:text-gray-300">
        Last Updated: <span className="font-medium">2025</span>
      </p>
    </header>

    {/* Intro */}
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6 mb-8">
      <p className="text-lg leading-relaxed text-gray-900 dark:text-gray-100">
        This Privacy Policy outlines the data processing practices of{" "}
        <span className="font-semibold">Gosiyuan</span>. All personal data collected will be handled in accordance with applicable data protection laws, including the{" "}
        <span className="font-medium">General Data Protection Regulation (GDPR)</span> and the{" "}
        <span className="font-medium">California Consumer Privacy Act (CCPA)</span>.
      </p>
    </div>

    {/* Sections */}
    <div className="space-y-8">
      {/* Section 1 */}
      <section id="controller" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">1. Controller Information</h2>
        <p className="mb-4 text-gray-900 dark:text-gray-100">
          Gosiyuan is the data controller. For inquiries regarding your personal data or this policy, contact us via:
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Call us</h3>
            <p className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              <a href="tel:+8615360539718">+86 15360 539-718</a>
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Write an email</h3>
            <p className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              <a href="mailto:support@gosiyuan.com">support@gosiyuan.com</a>
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Visit our office</h3>
            <p className="text-gray-900 dark:text-gray-100">
              4C-12, 4C-13, Jia Nian Business Center, Building 204, Huaqiang North Shangbu Industrial District, Futian District, Shenzhen, China.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section id="processing" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">2. Reasons for Processing Your Data</h2>
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Activity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Purpose</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Lawful Basis</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-gray-100">Website form submission</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Provide product/service information, newsletters</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Consent/Legitimate Interest</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-gray-100">Event registration</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Manage event attendance; send related updates</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Consent/Legitimate Interest</td>
              </tr>
              <tr>
                <td className="px-4 py-3 whitespace-nowrap text-gray-900 dark:text-gray-100">Customer inquiries</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Respond to requests; provide service details</td>
                <td className="px-4 py-3 text-gray-900 dark:text-gray-100">Consent/Contractual Necessity</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Legal Bases:</h3>
        <ul className="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-100">
          <li>
            <span className="font-medium">Consent:</span> Explicit permission for marketing (opt-in required).
          </li>
          <li>
            <span className="font-medium">Contract:</span> Processing necessary to fulfill agreements (e.g., purchases).
          </li>
          <li>
            <span className="font-medium">Legitimate Interest:</span> Non-intrusive communications (e.g., service updates).
          </li>
        </ul>
      </section>

      {/* Section 3 */}
      <section id="marketing" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">3. Marketing</h2>
        <p className="mb-4 text-gray-900 dark:text-gray-100">
          We may use your data to send product/service updates based on your preferences. You may{" "}
          <span className="font-medium">opt out</span> anytime:
        </p>
        <ul className="list-disc pl-5 space-y-2 mb-4 text-gray-900 dark:text-gray-100">
          <li>Click "unsubscribe" in emails.</li>
          <li>
            Email{" "}
            <a href="mailto:support@gosiyuan.com" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              support@gosiyuan.com
            </a>
            .
          </li>
        </ul>
        <p className="text-gray-900 dark:text-gray-100">
          <span className="font-medium">Third-Party Marketing:</span> We do not share data for external marketing.
        </p>
      </section>

      {/* Section 4 */}
      <section id="sharing" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">4. Data Sharing</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Subcontractors (e.g., email services, cloud providers) may process data under strict confidentiality agreements.
        </p>
      </section>

      {/* Section 5 */}
      <section id="transfers" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">5. International Transfers</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Data is stored within the EEA/US. If transferred outside, we ensure equivalent protections (e.g., EU Standard Contractual Clauses).
        </p>
      </section>

      {/* Section 6 */}
      <section id="retention" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">6. Data Retention</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-900 dark:text-gray-100">
          <li>
            <span className="font-medium">Transactional Data:</span> 7 years (legal/tax compliance).
          </li>
          <li>
            <span className="font-medium">Marketing Data:</span> Retained until consent withdrawal (then archived to suppress future contact).
          </li>
        </ul>
      </section>

      {/* Section 7 */}
      <section id="rights" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">7. Your Rights</h2>
        <p className="mb-4 text-gray-900 dark:text-gray-100">You may:</p>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✅</span>
            <span className="text-gray-900 dark:text-gray-100">Access, correct, or delete your data.</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✅</span>
            <span className="text-gray-900 dark:text-gray-100">Restrict processing or request portability.</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✅</span>
            <span className="text-gray-900 dark:text-gray-100">Object to marketing/profiling.</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✅</span>
            <span className="text-gray-900 dark:text-gray-100">Withdraw consent (where applicable).</span>
          </div>
        </div>
        <p className="mb-4 text-gray-900 dark:text-gray-100">
          To exercise rights, contact us with <span className="font-medium">two forms of ID</span> (e.g., driver's license + utility bill). We respond within{" "}
          <span className="font-medium">28 days</span>.
        </p>
      </section>

      {/* Section 8 */}
      <section id="complaints" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">8. Complaints</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Unresolved concerns may be escalated to the{" "}
          <a href="https://ico.org.uk/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ICO
          </a>{" "}
          (EU) or your local data protection authority.
        </p>
      </section>

      {/* Section 9 */}
      <section id="cookies" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">9. Cookies</h2>
        <p className="text-gray-900 dark:text-gray-100">
          See our{" "}
          <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
            Cookie Policy
          </a>{" "}
          for details on tracking technologies.
        </p>
      </section>

      {/* Section 10 */}
      <section id="third-party" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">10. Third-Party Links</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Our website may link to external sites. Review their policies separately, as we do not control their practices.
        </p>
      </section>

      {/* Section 11 */}
      <section id="updates" className="policy-section bg-white dark:bg-gray-900 rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">11. Policy Updates</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Changes will be posted here. Significant updates will be notified via email or website banners.
        </p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicyContent;