import React from 'react';
import './Privacy.css';

const sections: { title: string; id: string }[] = [
  { title: 'What data do we collect?', id: 'data-we-collect' },
  { title: 'How do we collect your data?', id: 'how-we-collect' },
  { title: 'How will we use your data?', id: 'how-we-use' },
  { title: 'How do we store your data?', id: 'data-storage' },
  { title: 'What are your data protection rights?', id: 'your-rights' },
  { title: 'What are cookies?', id: 'cookies' },
  { title: 'How do we use cookies?', id: 'cookies-use' },
  { title: 'What types of cookies do we use?', id: 'cookie-types' },
  { title: 'How to manage your cookies', id: 'manage-cookies' },
  { title: 'Privacy policies of other websites', id: 'other-websites' },
  { title: 'Changes to our privacy policy', id: 'policy-changes' },
  { title: 'How to contact us', id: 'contact-us' },
];

const Privacy: React.FC = () => {
  return (
    <div className="privacy-container">
      {/* Sidebar navigation */}
      <aside className="privacy-sidebar">
        <h3>Section A: Our Collection, Use, and Disclosure of Personal Information</h3>
        <ul>
          {sections.slice(0, 5).map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ul>

        <h3>Section B: Cookies and Internet Advertising</h3>
        <ul>
          {sections.slice(5).map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.title}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="privacy-content">
      <button className="print-button" onClick={() => window.print()}>
      🖶 Print
      </button>
        <h1>CineNiche Privacy Policy</h1>

        <Section id="data-we-collect" title="What data do we collect?">
          <ul>
            <li><strong>Personal details:</strong> When you create your CineNiche account, we collect your contact information (such as your email address) and authentication information for your login (such as a password). Depending on how you subsequently set up your account and method of payment, and which features you use, we also collect one or more of the following: first and last name, phone number, postal address, and other identifiers you provide to us. If you subscribe to an ad supported subscription plan, we also collect gender and date of birth.</li>
            <li><strong>Payment details:</strong> We collect your payment details, and other information to process your payments, including your payment history, billing address, and gift cards you have redeemed.</li>
            <li><strong>CineNiche account/profile information:</strong> We collect information that is <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">associated with your CineNiche account</a> and/or CineNiche profiles on your account (such as profile name and icon, CineNiche game handle, ratings and feedback you provide for CineNiche content), "My List" (watch list of titles), "continue watching" information, account/profile settings, and choices in connection with your use of the CineNiche service. </li>
            <li><strong>Usage information:</strong> We collect information about your interaction with the CineNiche service (including playback events, such as play, pause, etc.), choices made when engaging with interactive titles, your <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">CineNiche game activity</a> (such as gameplay, game use and interaction information, and progress or saved game information), CineNiche viewing and gaming history, search queries on the CineNiche service, and other information about your use and interaction with the CineNiche service (such as app clicks, text input, time and duration of access, and camera/photo access for QR-code and similar functionality). </li>
            <li><strong>Advertising information:</strong>If you subscribe to an ad supported subscription plan, we collect information about the ads on CineNiche ("Advertisements," as defined in the <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">CineNiche Terms of Use)</a> that you view or interact with, device information (such as resettable device identifiers), IP addresses, and information provided by Advertising Companies (such as information about your likely interests they have collected or inferred from your visits to other websites and apps). We use this information to display Advertisements to you in the CineNiche service (including behavioral advertisements in accordance with your preferences).</li>
          </ul>
        </Section>

        <Section id="how-we-collect" title="How do we collect your data?">
          <ul>
            <li><strong>Device and network information:</strong> We collect information about your computer or other CineNiche capable devices you might use to access our service (such as smart TVs, mobile devices, set top boxes, gaming systems, and other streaming media devices), your network, and network devices. The information includes:</li>
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>device IDs or other unique identifiers, including for your network devices (such as your router), and devices that are CineNiche capable on your network;</li>
                <li>IP addresses (which can be used to tell us the general location of your device, such as your city, state/province, and postal code);</li>
                <li>device and <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">software characteristics</a> (such as type and configuration), referring source (for example, referrer URLs), standard web browser and mobile app log information, and connection information including type (such as wifi or cellular);</li>
                <li>performance data such as crash reports, timestamps, and debug log messages; and</li>
                <li>cookie data, resettable device identifiers, advertising identifiers and other unique identifiers (described below in the section "Cookies and Internet Advertising").</li>
              </ul>
          </ul>
        </Section>

        <Section id="how-we-use" title="How will we use your data?">
          <ul>
            <li><strong>Directly from you:</strong>When you register with the CineNiche service, update your CineNiche account or profile, correspond with us, or respond to our surveys, you may provide (and we will collect) the following categories of personal information: personal details, payment details, CineNiche account/profile information, and communications.</li>
            <li><strong>Automatically when you use our service:</strong> We automatically collect the following categories of personal information in connection with your use of the CineNiche service: CineNiche account/profile information, usage information, advertising information, device and network information, and communications.</li>
            <li><strong>From Partners whose products and services you use:</strong> We may collect the following categories of personal information about you from third parties whose services you use to access, pay for, or interact with the <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">CineNiche service</a> ("Partners"): personal details, payment details, usage information, and device and network information. The categories of personal information that Partners provide to us will vary depending on the nature of the Partner and your relationship with them. Our Partners may include your TV manufacturer, internet service provider, streaming media device provider, mobile phone carriers, or other companies who collect payment for the CineNiche service. For example, Partners may provide us:</li>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>personal details (such as your email address), device and network information (such as IP addresses, device IDs, or other unique identifiers), or other personal information in order to activate the CineNiche service, or present CineNiche content to you through portions of the Partner's user interface;</li>
                <li>IP addresses (which can be used to tell us the general location of your device, such as your city, state/province, and postal code);</li>
                <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">search queries and commands applicable to CineNiche</a> that you make through Partner devices or voice assistance platforms.</li>
              </ul>
          </ul>
          <p>We may send your data to credit reference agencies to prevent fraudulent purchases.</p>
        </Section>

        <Section id="data-storage" title="How do we store your data?">
          <ul>
            <li><strong>To provide our service</strong> including all features and functionalities, websites and apps, user interfaces, and content and software associated with the CineNiche service. This includes personalized recommendations for CineNiche content that we think will be of interest to you (learn more regarding recommendations for shows and movies: CineNiche.com/recommendations). This may also include personalizing the features and functionalities of the service (such as the way in which the recommendations are presented to you), and localizing CineNiche content relevant to your geography in compliance with our content partners' licensing terms. We use the following categories of personal information for this purpose: personal details, CineNiche account/profile information, usage information, device and network information, and communications.</li>
            <li><strong>To administer and operate our business </strong>including purposes such as processing payments and any gift cards you redeem, sending transactional communications to you (such as confirmation of subscription start date or information about changes to your account), determining your internet service provider to support network troubleshooting issues, responding to your inquiries and requests, and assisting you with operational requests such as password resets. We use the following categories of personal information for this purpose: personal details, payment details, CineNiche account/profile information, usage information, device and network information, and communications.</li>
            <li><strong>To research, analyze, and improve</strong> our services such as analyzing and understanding our audience to improve our services and optimize CineNiche content selection and service delivery. This may also include processing your personal information in connection with any surveys you participate in. We use the following categories of personal information for this purpose: personal details, payment details, CineNiche account/profile information, usage information, device and network information, and communications.</li>
          </ul>
        </Section>

        <Section id="your-rights" title="What are your data protection rights?">
          <ul>
            <li><strong>The right to access</strong> – Request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – Correct inaccurate or incomplete information.</li>
            <li><strong>The right to erasure</strong> – Request we erase your data under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – Restrict data use under certain conditions.</li>
            <li><strong>The right to object</strong> – Object to our processing of your data.</li>
            <li><strong>The right to data portability</strong> – Transfer your data to another organization or to you.</li>
          </ul>
          <p>
            Contact us at <a href="mailto:cia_foia@ucia.gov">support@cineniche.com</a> or call <a href="tel:5055034455">(505) 503-4455</a>.
          </p>
        </Section>

        <Section id="cookies" title="What are cookies?">
        <ul>
            <li><strong>CineNiche Marketing Providers</strong> when you interact with marketing campaigns promoting the CineNiche service or CineNiche content (such as our ads on third party services). Please see the "Cookies and Internet Advertising" section below for details.</li>
            <li><strong>Third-party sites and forums </strong>where we provide support for the CineNiche service (such as an online support forum for CineNiche customer support or for a particular CineNiche game).</li>
            <li><strong>Publicly available sources</strong> such as public posts on social media platforms (for example, where you have tagged CineNiche in a publicly-available social media post, or shared or liked content we have made available on social media) and other information available through public databases, in accordance with applicable laws.</li>
            <li><strong>Advertising Companies: </strong>If you subscribe to an ad supported subscription plan, we may collect advertising information about you from other sources, including (collectively referred to as "Advertising Companies"):</li>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>Advertisers that run Advertisements on CineNiche ("Advertisers") may provide us with unique identifiers (for example, cookies or resettable device identifiers), demographic information and other information (such as information about your likely interests they have collected or inferred based on your activities online) in order to deliver Advertisements;</li>
                <li>service providers that facilitate the sale, operations, and management of Advertisements ("Ad Service Providers");</li>
                <li>ad measurement companies that support CineNiche and Advertisers in understanding the effectiveness of Advertisements run on CineNiche ("Ad Measurement Companies"); and</li>
                <li>online and offline information providers to support Advertisements (for example, by providing your general location information based on your device's IP address, such as city, state, and postal code).</li>
              </ul>
          </ul>
          <p>
            For more info, visit{' '}
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">
              allaboutcookies.org
            </a>.
          </p>
        </Section>

        <Section id="cookies-use" title="How do we use cookies?">
          <ul>
            <li>We, our Service Providers, CineNiche Marketing Providers, and Advertising Companies use cookies, other similar technologies (such as pixel tags), and resettable device identifiers for various reasons. This section explains the types of technologies used, what they do, and your corresponding choices. To choose whether or not to receive cookies and similar technologies, please see the section below "How can I exercise choice regarding these technologies?"</li>
            <li>Cookies are small data files that are commonly stored on your device when you access websites and online services. The text in a cookie contains a string of numbers and letters that may uniquely identify a device and can contain other information as well. This allows the web server to recognize your browser each time it connects to that web server.</li>
            <li>We use other technologies such as browser storage and plugins (for example, HTML5, IndexedDB, and WebSQL). Like cookies, these other technologies may store small amounts of data on a device. Pixel tags often work in conjunction with cookies. In many cases, declining cookies will impair the effectiveness of pixel tags associated with those cookies.</li>
          </ul>
        </Section>

        <Section id="cookie-types" title="What types of cookies do we use?">
        <ul>
            <li>If you use a CineNiche app (such as the main CineNiche app, or a CineNiche game app) on a mobile device, tablet, or streaming media device, we may collect a resettable device identifier from your device. Resettable device identifiers can be used like cookies and are found on many mobile devices and tablets (for example, the "Identifier for Advertisers" on Apple iOS devices and the "Google Advertising ID" on Android devices), and certain streaming media devices. Like cookies, resettable device identifiers are used to make online advertising more relevant, and for analytics and optimization purposes.</li>
            <li>We use these types of technologies for various reasons, including to provide our service (for example, by making it easy to access our service by remembering you when you return); to administer and operate our business, to research, analyze and improve our services (for example, to improve site performance, monitor visitor traffic and actions on our site, and to test the effectiveness of our user interface); to send marketing and informational messages (for example, to deliver and tailor our marketing, and to understand interactions with our emails, marketing, and marketing on third party services); to operate our ad supported subscription plan; for safety, security and fraud prevention; and to comply with law and enforce our Terms of Use. These technologies enable CineNiche Marketing Providers to collect personal information (such as the pages you visit and device and network information) when you use our services, and CineNiche Marketing Providers may also collect information about your online activities over time across different websites.</li>
            <li>We use pixel tags in our emails to understand how members interact with our services. Our use of pixel tags helps us understand when links within messages are clicked, or the emails are opened.</li>
          </ul>
        </Section>

        <Section id="manage-cookies" title="How to manage your cookies">
        <ul>
            <li>For more information about cookies set through our service and to exercise choices regarding cookies, click here. We do not currently respond to web browser "do not track" signals.</li>
            <li>To exercise choice regarding CineNiche's use of resettable device identifiers (for marketing the CineNiche service or CineNiche content, or as used in connection with an ad supported subscription plan), please configure the appropriate setting on your device (usually found under "privacy" or "ads" in your device settings). If you choose not to allow this, you may still see marketing messages promoting CineNiche (and Advertisements if you subscribe to an ad supported subscription plan) on that device but it will not be selected based on the use of a resettable device identifier. Note that your choice regarding the resettable device identifier is specific to that device.</li>
          </ul>
        </Section>

        <Section id="other-websites" title="Privacy policies of other websites">
        <ul>
            <li><strong>Sharing Functionality in our Service</strong></li>
            <li>You can use sharing functionality available in our service to disclose your personal information in the following ways:</li>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                <li>certain portions of our service may give you options to share information by email, text message, and social or other sharing applications, using the clients and apps on your device; and</li>
                <li>social plugins and similar technologies that allow you to share information.</li>
              </ul>
            <li>Social plugins and social applications are operated by third-party social networks, and are subject to their terms of use and privacy policies. Similarly, some CineNiche game features may require use of a third party service, which is subject to that service's terms of use and privacy policy.</li>
        </ul>
        </Section>

        <Section id="policy-changes" title="Changes to our privacy policy">
        <li>Social plugins and social applications are operated by third-party social networks, and are subject to their terms of use and privacy policies. Similarly, some CineNiche game features may require use of a third party service, which is subject to that service's terms of use and privacy policy.</li>
        <li>The CineNiche service may use, be provided through features operated by third party platforms (such as the display of social media content, or the provision of voice controls), or contain links to sites operated by third parties. In addition, you may encounter third party applications that interact with the CineNiche service. These third parties have their own privacy policies.</li>
        </Section>

        <Section id="contact-us" title="How to contact us">
          <ul>
            <li>Email: <a href="mailto:comments@whitehouse.gov">support@cineniche.com</a></li>
            <li>Phone: <a href="tel:5055034455">(505) 503-4455</a></li>
            <li>Address: <a href="https://www.google.com/maps/search/?q=Twiggly+Wiggly+Road,+British+Columbia,+Canada" target="_blank" rel="noopener noreferrer">
              Twiggly Wiggly Road, British Columbia, Canada
            </a></li>
          </ul>
        </Section>
      </main>
    </div>
  );
};

// Section component remains unchanged
type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ id, title, children }) => (
  <section id={id} className="mb-5">
    <h2 className="h4 mb-3">{title}</h2>
    <div>{children}</div>
  </section>
);

export default Privacy;