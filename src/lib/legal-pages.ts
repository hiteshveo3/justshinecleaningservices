export type LegalPage = {
  slug: string;
  title: string;
  description: string;
  effectiveDate?: string;
  sections: {
    title: string;
    body?: string;
    bullets?: string[];
  }[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "terms",
    title: "Terms and Conditions",
    description: "Terms and conditions for professional cleaning services in Abu Dhabi.",
    effectiveDate: "January 1, 2025",
    sections: [
      {
        title: "Service Description",
        body: "Just Shine Cleaning Services provides professional cleaning services including home cleaning, deep cleaning, villa cleaning, carpet cleaning, sofa and upholstery cleaning, office cleaning, window cleaning, pest control, move-in and move-out cleaning, restaurant cleaning, and showroom cleaning.",
        bullets: ["Services are performed by trained professionals.", "Professional-grade equipment and eco-friendly products are used.", "Final scope is confirmed before each visit."],
      },
      {
        title: "Booking and Payment",
        body: "Services can be booked by WhatsApp, phone, email, or website form. A quote is provided based on service type, property details, and requested schedule.",
        bullets: ["Payment is due upon service completion unless pre-arranged.", "Payment methods may include cash, card, and bank transfer.", "Deposits may be required for large projects or advance bookings."],
      },
      {
        title: "Cancellation and Rescheduling",
        bullets: ["Free cancellation up to 24 hours before scheduled service.", "Cancellations within 24 hours may be charged at 50% of the service fee.", "No-shows may be charged at the full service rate.", "Free rescheduling is available with 24+ hours notice."],
      },
      {
        title: "Service Terms",
        body: "All cleaning services include only the areas specified in the quote. Additional services requested on-site are charged separately.",
        bullets: ["Client must provide safe access to the property.", "Client is responsible for securing valuables.", "Pets must be secured or removed from active cleaning areas.", "Client can request specific product types where available."],
      },
      {
        title: "Satisfaction Guarantee",
        body: "If you are not satisfied with service quality, Just Shine Cleaning Services can re-clean affected areas when concerns are reported within 48 hours of the original service.",
      },
      {
        title: "Liability and Insurance",
        body: "Just Shine Cleaning Services handles reported accidental damage concerns through its internal review process. Damage claims must be reported promptly with documentation.",
        bullets: ["We are not responsible for pre-existing damage.", "We are not responsible for damage caused by structural defects.", "Highly valuable items should be locked away or removed before service."],
      },
      {
        title: "Privacy and Data Protection",
        body: "Client information collected during booking is protected and used only for service delivery, communication, legal compliance, and support.",
      },
      {
        title: "Dispute Resolution",
        body: "Any disputes arising from these terms are governed by UAE law and subject to Abu Dhabi courts' jurisdiction.",
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How Just Shine Cleaning Services collects, uses, and protects customer information.",
    effectiveDate: "January 1, 2025",
    sections: [
      {
        title: "Information We Collect",
        bullets: ["Name, email, phone number, service address, and property details.", "Service preferences, special requests, feedback, reviews, and communication history.", "Website visit data such as pages visited, browser type, IP address, and device information."],
      },
      {
        title: "How We Use Your Information",
        bullets: ["Process bookings and provide cleaning services.", "Send confirmations, reminders, and service updates.", "Respond to inquiries, complaints, and support requests.", "Improve services based on customer feedback.", "Send promotional offers only where consent is given."],
      },
      {
        title: "Data Protection",
        body: "We use secure processes, limited staff access, and regular updates to protect customer information.",
      },
      {
        title: "Information Sharing",
        body: "We do not sell customer information. Data may be shared only with payment processors, insurance providers for claims, law enforcement where legally required, or service teams who need details to complete your booking.",
      },
      {
        title: "Cookies and Tracking",
        body: "Our website may use cookies for preferences, analytics, marketing, and session tracking. You can disable cookies in your browser settings, though some features may not work properly.",
      },
      {
        title: "Your Rights",
        bullets: ["Request access to your personal data.", "Request correction of inaccurate information.", "Opt out of promotional communication.", "Request deletion where legally allowed."],
      },
    ],
  },
  {
    slug: "refund-policy",
    title: "Refund Policy",
    description: "Refund and satisfaction guarantee policy for Just Shine Cleaning Services.",
    sections: [
      {
        title: "Satisfaction Guarantee",
        bullets: ["If you are unsatisfied with a completed service, we will re-clean affected areas at no charge.", "Issues must be reported within 48 hours.", "A full refund may be considered if the issue remains unresolved after re-cleaning."],
      },
      {
        title: "Cancelled Services",
        bullets: ["100% refund if cancelled 24+ hours before the appointment.", "Late cancellations may receive a 50% refund.", "Rescheduled services can receive credit toward the new date."],
      },
      {
        title: "Refund Process",
        body: "Submit the refund request with booking details, photos where relevant, and a short explanation. Approved refunds are processed within 5-7 business days to the original payment method where possible.",
      },
    ],
  },
  {
    slug: "sla",
    title: "Service Level Agreement",
    description: "Service standards, response times, and quality commitments.",
    sections: [
      {
        title: "Punctuality",
        bullets: ["95% on-time arrival target within 15 minutes of scheduled time.", "Customers are notified if a team is running late.", "Same-day bookings are offered when teams are available."],
      },
      {
        title: "Quality Standards",
        bullets: ["Professional-grade cleaning standards on every service.", "Re-clean guarantee if agreed standards are not met.", "Supervised work for larger or recurring bookings."],
      },
      {
        title: "Response Times",
        bullets: ["WhatsApp: within 30 minutes where possible.", "Phone: immediate during active support hours.", "Email: within 2 hours."],
      },
      {
        title: "Support and Availability",
        bullets: ["WhatsApp and form inquiries can be sent anytime.", "Customer service is handled during active business hours.", "Urgent service may be available with surcharge and schedule confirmation."],
      },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Policy",
    description: "Website and service accessibility commitments for Just Shine Cleaning Services customers.",
    sections: [
      {
        title: "Website Accessibility",
        bullets: ["WCAG 2.1 AA compliance target.", "Mobile-responsive design.", "Text alternatives for images.", "Keyboard navigation and screen reader compatibility where possible."],
      },
      {
        title: "Service Accessibility",
        bullets: ["Flexible scheduling for elderly or disabled customers.", "Text-based WhatsApp support available.", "Teams can receive access instructions in advance.", "Customers can share mobility or access needs before the visit."],
      },
      {
        title: "Feedback",
        body: "Report accessibility issues to info@justshinecleaningservices.com or WhatsApp +971 55 223 2850.",
      },
    ],
  },
  {
    slug: "sustainability",
    title: "Sustainability Policy",
    description: "Eco-friendly cleaning practices and sustainability commitments.",
    sections: [
      {
        title: "Eco-Friendly Products",
        bullets: ["Biodegradable cleaning solutions where suitable.", "Non-toxic, family-safe product options.", "Eco-conscious product selection for homes, offices, and villas."],
      },
      {
        title: "Waste Reduction",
        bullets: ["Minimize single-use plastics.", "Use reusable microfiber cloths where possible.", "Dispose of waste materials responsibly."],
      },
      {
        title: "Water Conservation",
        bullets: ["Efficient equipment reduces unnecessary water use.", "Responsible water management during cleaning.", "Low-waste methods used where practical."],
      },
      {
        title: "Employee Education",
        body: "Our team receives guidance on green practices, responsible product use, and environmental care during service delivery.",
      },
    ],
  },
  {
    slug: "anti-discrimination",
    title: "Anti-Discrimination Policy",
    description: "Equal service and respectful conduct policy.",
    sections: [
      {
        title: "Equal Service",
        body: "Just Shine Cleaning Services provides services without discrimination based on race, ethnicity, national origin, religion, gender, gender identity, sexual orientation, age, disability, marital status, family status, or economic status.",
      },
      {
        title: "Staff Training",
        bullets: ["Respectful behavior is required.", "Anti-discrimination standards are communicated to staff.", "Violations are reviewed and addressed promptly."],
      },
      {
        title: "Complaint Process",
        body: "Customers can report discrimination concerns to management by phone, WhatsApp, or email. Complaints are handled confidentially and investigated promptly.",
      },
    ],
  },
  {
    slug: "disclaimer",
    title: "Website Disclaimer",
    description: "Website information, service availability, and liability disclaimer.",
    sections: [
      {
        title: "Information Accuracy",
        body: "Website information is provided in good faith and may change without notice. It should not be treated as legal, financial, or technical advice.",
      },
      {
        title: "Service Availability",
        bullets: ["Services are subject to team availability.", "Coverage areas may change.", "Just Shine Cleaning Services reserves the right to refuse service where safety, access, or scope is unsuitable."],
      },
      {
        title: "Liability",
        body: "Website use is at the user's risk. We are not liable for temporary downtime, third-party links, lost profits, or unauthorized access outside our reasonable control.",
      },
      {
        title: "External Links",
        body: "External links are provided for reference only and do not imply endorsement. We are not responsible for third-party website content.",
      },
    ],
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "How cookies and tracking technologies may be used on the Just Shine Cleaning Services website.",
    sections: [
      {
        title: "What Are Cookies?",
        body: "Cookies are small text files stored on your device. They help websites remember preferences, support functionality, and improve user experience.",
      },
      {
        title: "Types of Cookies",
        bullets: ["Essential cookies for site functionality.", "Performance cookies for analytics and improvements.", "Functional cookies for user preferences.", "Marketing cookies for personalized ads where enabled."],
      },
      {
        title: "Your Choices",
        bullets: ["Disable cookies in browser settings.", "Opt out of analytics where available.", "Manage marketing preferences through relevant third-party platforms."],
      },
      {
        title: "Third-Party Cookies",
        body: "Third-party tools such as Google Analytics or Meta/Facebook tracking may set cookies if enabled. Review their privacy policies for more details.",
      },
    ],
  },
];

export function getLegalPage(slug: string) {
  return legalPages.find((page) => page.slug === slug);
}
