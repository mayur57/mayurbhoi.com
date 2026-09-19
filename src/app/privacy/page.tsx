import { Metadata } from 'next'
import MainLayout from 'src/components/main-layout'
import Title from 'src/components/title'
import { absoluteUrl, ogImageUrl, SITE_NAME } from 'src/utils/site'

const description = 'Privacy statements about the website and other products by Mayur Bhoi'

export const metadata: Metadata = {
  title: 'Privacy Statements',
  description,
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Statements',
    description,
    url: absoluteUrl('/privacy'),
    type: 'website',
    images: [
      {
        url: ogImageUrl('Privacy Statements', { section: true }),
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
}

export default function PrivacyPolicy() {
  return (
    <MainLayout>
      <Title>privacy statements</Title>
      <div className='pt-6 prose-sm dark:prose-invert sm:prose'>
        <h2 className='font-medium tracking-tight pt-4'>Countless</h2>
        <p className='not-prose text-sm mt-1 mb-4'>
          This privacy policy applies to the countless extension (the &quot;Extension&quot;). The
          Extension is provided by Mayur Bhoi and is intended for use as is. By using the Extension,
          you consent to the collection, use, and sharing of your information as described in this
          privacy policy.
        </p>
        <strong className='not-prose font-medium tracking-tight'>
          What information is collected by the Extension?
        </strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          The Extension does not collect any personal information about you or the tweets you view
          while the Extension is enabled.
        </p>
        <strong className='not-prose font-medium tracking-tight'>
          How is the collected information used?
        </strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          As the Extension does not collect any information, there is no information to use.
        </p>
        <strong className='not-prose font-medium tracking-tight'>
          Is the collected information shared with third parties?
        </strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          As the Extension does not collect any information, there is no information to share with
          third parties.
        </p>
        <strong className='not-prose font-medium tracking-tight'>
          How is the collected information stored?
        </strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          As the Extension does not collect any information, there is no information to store.
        </p>
        <strong className='not-prose font-medium tracking-tight'>Your Choices</strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          You can choose to disable the Extension at any time by accessing the Extension settings in
          your Chrome browser and turning it off.
        </p>
        <strong className='not-prose font-medium tracking-tight'>
          Changes to this Privacy Policy
        </strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          We may update this privacy policy from time to time. We encourage you to review the
          privacy policy whenever you access the Extension to stay informed about our information
          practices and the choices available to you.
        </p>
        <strong className='not-prose font-medium tracking-tight'>Contact Me</strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          If you have any questions about this privacy policy, please reach out at{' '}
          <code className='bg-yellow-200 dark:bg-orange-400 dark:bg-opacity-30'>
            mayur072000 at [Google&apos;s Mailing Service] dot com
          </code>
          .
        </p>
        <hr />
        <h2 className='font-medium tracking-tight pt-4'>mayurbhoi.com</h2>
        <p className='not-prose text-sm mt-1 mb-8'>
          <u>This website does not collect any personal information about you.</u>
        </p>
        <strong className='not-prose font-medium tracking-tight'>
          Anonymous Analytics and Visitor Information
        </strong>
        <p className='not-prose text-sm mt-1 mb-8'>
          This website is hosted on Vercel, and Vercel Analytics is enabled to collect anonymous
          data about visitor interactions, such as the number of visits to each page. The data
          collected does not include any personally identifiable information. The analytics are used
          solely to understand how visitors engage with the website and to improve user experience.
          No information that can be used to identify individual visitors is tracked, stored, or
          shared with third parties.
        </p>
        <strong className='not-prose font-medium tracking-tight'>Location Record Disclaimer</strong>
        <p className='not-prose text-sm mt-1 mb-4'>
          This website utilizes an IP geolocation feature that records and displays the general
          location of the previous visitor to the current visitor. Please note that no personal
          information is collected or stored. The location data displayed is derived solely from the
          IP address of the visitor, which provides non-specific location details such as city and
          country. This is publically available information. The website does not collect or retain
          any additional identifiable information, nor does it store IP addresses beyond their
          location data. All location information is stored temporarily for the purpose of enhancing
          user experience and is not shared with other third parties either.
        </p>
      </div>
    </MainLayout>
  )
}
