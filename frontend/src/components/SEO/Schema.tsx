export default function Schema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "name": "Ryan's Roofing",
    "description": "AI-powered roofing contractor serving Durham Region with precision roofing services and smart technology",
    "url": "https://ryansroofing.ca",
    "telephone": "+1-905-555-1234",
    "email": "info@ryansroofing.ca",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "ON",
      "addressCountry": "CA",
      "addressLocality": "Durham Region"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Oshawa"
      },
      {
        "@type": "City",
        "name": "Whitby"
      },
      {
        "@type": "City",
        "name": "Ajax"
      },
      {
        "@type": "City",
        "name": "Pickering"
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "16:00"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Roofing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roof Inspection",
            "description": "Comprehensive roof inspection with AI-powered diagnostics"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roof Repair",
            "description": "Professional roof repair services for all roof types"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Roof Replacement",
            "description": "Complete roof replacement with high-quality materials"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Emergency Roofing",
            "description": "24/7 emergency roofing services for urgent situations"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/ryansroofing",
      "https://www.instagram.com/ryansroofing"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
