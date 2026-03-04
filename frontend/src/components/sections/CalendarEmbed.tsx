import { useState } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'

interface CalendarEmbedProps {
  calLink?: string
  config?: {
    theme?: 'light' | 'dark' | 'auto'
    styles?: {
      branding?: {
        brandColor?: string
      }
    }
  }
}

export default function CalendarEmbed({ 
  calLink = 'ryansroofing/inspection',
  config = { theme: 'light' }
}: CalendarEmbedProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    (async function () {
      const cal = await getCalApi()
      cal('ui', {
        theme: config.theme || 'light',
        styles: {
          branding: {
            brandColor: '#D4AF37',
          },
        },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [config.theme])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center rounded-lg bg-brand-blue px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
      >
        <svg
          className="mr-2 h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        Schedule Online
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOpen(false)
            }
          }}
        >
          <div className="relative max-h-[90vh] w-full max-w-4xl overflow-auto rounded-xl bg-white shadow-2xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-colors hover:bg-gray-100 hover:text-gray-900"
              aria-label="Close"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            
            <div className="p-6">
              <Cal
                calLink={calLink}
                config={config}
                style={{ width: '100%', height: '600px', overflow: 'scroll' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
