import React from 'react';

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
  { title: 'How to contact the appropriate authorities', id: 'authorities' },
];

const Privacy: React.FC = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">CineNiche Privacy Policy</h1>

      <nav className="mb-5">
        <ul className="list-unstyled">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-primary text-decoration-none">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <Section id="data-we-collect" title="What data do we collect?">
        <ul>
          <li>Personal identification information (Name, email address, phone number, etc.)</li>
          <li>Movie preferences and reviews</li>
        </ul>
      </Section>

      <Section id="how-we-collect" title="How do we collect your data?">
        <ul>
          <li>Register online for any of our products or services.</li>
          <li>Use or view our website via your browser’s cookies.</li>
        </ul>
      </Section>

      <Section id="how-we-use" title="How will we use your data?">
        <ul>
          <li>Manage your account</li>
          <li>Recommend products based on your preferences</li>
          <li>[Add additional uses here]</li>
        </ul>
        <p>We may send your data to credit reference agencies to prevent fraudulent purchases.</p>
      </Section>

      <Section id="data-storage" title="How do we store your data?">
        <p>CineNiche securely stores your data with Azure and AWS.</p>
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
          Contact us at <a href="mailto:email@email.com">email@email.com</a> or call 123-456-7890.
        </p>
      </Section>

      <Section id="cookies" title="What are cookies?">
        <p>
          Cookies are text files placed on your computer to collect standard Internet log information and visitor behavior information.
        </p>
        <p>
          For more info, visit{' '}
          <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
            allaboutcookies.org
          </a>.
        </p>
      </Section>

      <Section id="cookies-use" title="How do we use cookies?">
        <ul>
          <li>Keep you signed in</li>
          <li>Understand how you use our website</li>
          <li>Recommend movies</li>
        </ul>
      </Section>

      <Section id="cookie-types" title="What types of cookies do we use?">
        <p>
          <strong>Functionality</strong> – Recognize you and remember your preferences like language and location.
          We use both first-party and third-party cookies.
        </p>
      </Section>

      <Section id="manage-cookies" title="How to manage your cookies">
        <p>You can set your browser to not accept cookies. However, some features may not work as a result.</p>
      </Section>

      <Section id="other-websites" title="Privacy policies of other websites">
        <p>This privacy policy applies only to our website. If you click to another site, read their privacy policy.</p>
      </Section>

      <Section id="policy-changes" title="Changes to our privacy policy">
        <p>We review our privacy policy regularly. Last updated on 7 April 2025.</p>
      </Section>

      <Section id="contact-us" title="How to contact us">
        <ul>
          <li>Email: <a href="mailto:email@cineniche.com">email@cineniche.com</a></li>
          <li>Phone: 123-454-7890</li>
          <li>Address: 1234 N Address Way, City, State</li>
        </ul>
      </Section>

      <Section id="authorities" title="How to contact the appropriate authorities">
        <p>[Insert contact info for a relevant data protection authority here.]</p>
      </Section>
    </div>
  );
};

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
